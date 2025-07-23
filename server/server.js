const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

let todos = [];
let users = [{ id: 1, username: 'test', password: 'test' }];
let nextId = 1;

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

  if (user) return res.json({ success: true, token: 'fake-jwt-token' });
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

app.listen(4000, () => console.log('API running on http://localhost:4000'));
