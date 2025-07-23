require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));

let todos = [];
let nextId = 1;

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
    // In production, use proper JWT signing with the secret
    const token = process.env.JWT_SECRET
      ? `jwt-${Date.now()}`
      : 'fake-jwt-token';
    return res.json({ success: true, token });
  }

  res.status(401).json({ success: false, message: 'Invalid credentials' });
});

app.get('/todos', (req, res) => res.json(todos));

app.post('/todos', (req, res) => {
  const todo = { id: nextId++, text: req.body.text };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put('/todos/:id', (req, res) => {
  const t = todos.find((x) => x.id === +req.params.id);
  if (t) {
    t.text = req.body.text;
    return res.json(t);
  }
  res.status(404).end();
});

app.delete('/todos/:id', (req, res) => {
  todos = todos.filter((x) => x.id !== +req.params.id);
  res.json({ deleted: true });
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
