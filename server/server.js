require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));

// Store todos per user and track next IDs per user
let userTodos = {}; // { userId: [todos] }
let userNextId = {}; // { userId: nextId }

// Store active sessions
let activeSessions = {}; // { token: { userId, username, createdAt } }

// Initialize users from environment variables
const initializeUsers = () => {
  const users = [];

  // Add default user from environment variables
  const defaultUsername = process.env.DEFAULT_USERNAME || 'test';
  const defaultPassword = process.env.DEFAULT_PASSWORD || 'test';

  users.push({
    id: 1,
    username: defaultUsername,
    password: defaultPassword,
  });

  // Add additional users if specified
  const additionalUsers = process.env.ADDITIONAL_USERS;
  if (additionalUsers && additionalUsers.trim()) {
    const userPairs = additionalUsers.split(',');
    userPairs.forEach((pair, index) => {
      const [username, password] = pair.split(':');
      if (username && password) {
        users.push({
          id: users.length + 1,
          username: username.trim(),
          password: password.trim(),
        });
      }
    });
  }

  return users;
};

let users = initializeUsers();

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.',
    });
  }

  // Check if token exists in active sessions
  const session = activeSessions[token];
  if (!session) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
    });
  }

  // Add user info to request
  req.user = session;
  next();
};

// Helper function to ensure user has todo storage initialized
const ensureUserTodoStorage = (userId) => {
  if (!userTodos[userId]) {
    userTodos[userId] = [];
    userNextId[userId] = 1;
  }
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Trim whitespace for security and consistency
  const trimmedUsername = username?.trim();
  const trimmedPassword = password?.trim();

  // Validate inputs
  if (!trimmedUsername || !trimmedPassword) {
    return res.status(400).json({
      success: false,
      message: 'Username and password cannot be empty or just whitespace',
    });
  }

  const user = users.find(
    (u) => u.username === trimmedUsername && u.password === trimmedPassword
  );

  if (user) {
    // Generate a session token
    const token = `session-${user.id}-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Store session
    activeSessions[token] = {
      userId: user.id,
      username: user.username,
      createdAt: Date.now(),
    };

    // Initialize user's todo storage if not exists
    ensureUserTodoStorage(user.id);

    return res.json({
      success: true,
      token,
      user: { id: user.id, username: user.username },
    });
  }

  res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// Logout endpoint to invalidate token
app.post('/logout', authenticateToken, (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token && activeSessions[token]) {
    delete activeSessions[token];
  }

  res.json({ success: true, message: 'Logged out successfully' });
});

// Get todos for the authenticated user
app.get('/todos', authenticateToken, (req, res) => {
  const userId = req.user.userId;
  ensureUserTodoStorage(userId);
  res.json(userTodos[userId]);
});

// Create a new todo for the authenticated user
app.post('/todos', authenticateToken, (req, res) => {
  const userId = req.user.userId;
  ensureUserTodoStorage(userId);

  const todo = {
    id: userNextId[userId]++,
    text: req.body.text,
  };

  userTodos[userId].push(todo);
  res.status(201).json(todo);
});

// Update a todo for the authenticated user
app.put('/todos/:id', authenticateToken, (req, res) => {
  const userId = req.user.userId;
  const todoId = +req.params.id;

  ensureUserTodoStorage(userId);

  const todo = userTodos[userId].find((t) => t.id === todoId);
  if (todo) {
    todo.text = req.body.text;
    return res.json(todo);
  }

  res.status(404).json({ success: false, message: 'Todo not found' });
});

// Delete a todo for the authenticated user
app.delete('/todos/:id', authenticateToken, (req, res) => {
  const userId = req.user.userId;
  const todoId = +req.params.id;

  ensureUserTodoStorage(userId);

  const initialLength = userTodos[userId].length;
  userTodos[userId] = userTodos[userId].filter((t) => t.id !== todoId);

  if (userTodos[userId].length < initialLength) {
    res.json({ deleted: true });
  } else {
    res.status(404).json({ success: false, message: 'Todo not found' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`👤 Default user: ${process.env.DEFAULT_USERNAME || 'test'}`);
  console.log(
    `🌐 CORS enabled for: ${process.env.CLIENT_URL || 'http://localhost:3000'}`
  );
});
