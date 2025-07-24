import React, { useState, useEffect, useCallback } from 'react';
import Login from './Login';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Define fetchTodos before useEffect that uses it
  const fetchTodos = useCallback(() => {
    if (!authToken) {
      console.warn('No auth token available for fetching todos');
      return;
    }

    fetch('http://localhost:4000/todos', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        // Ensure data is an array
        if (Array.isArray(data)) {
          setTodos(data);
        } else {
          console.error('Expected array but got:', data);
          setTodos([]);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch todos:', err);
        setTodos([]); // Ensure todos is always an array
      });
  }, [authToken]);

  // Check for existing auth token on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch todos when authenticated and token is available
  useEffect(() => {
    if (isAuthenticated && authToken) {
      fetchTodos();
    }
  }, [isAuthenticated, authToken, fetchTodos]);

  const handleLogin = (token) => {
    setAuthToken(token);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      // Call server logout endpoint to invalidate session
      await fetch('http://localhost:4000/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } catch (err) {
      console.warn('Failed to logout on server:', err);
    } finally {
      // Clear client-side state regardless of server response
      localStorage.removeItem('authToken');
      setAuthToken(null);
      setIsAuthenticated(false);
      setTodos([]);
      setText('');
      setEditingId(null);
      setEditText('');
    }
  };

  const addTodo = () => {
    if (!text.trim()) return;

    fetch('http://localhost:4000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ text: text.trim() }),
    })
      .then((res) => res.json())
      .then((newTodo) => {
        setTodos([...todos, newTodo]);
        setText('');
      })
      .catch((err) => console.error('Failed to add todo:', err));
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:4000/todos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((err) => console.error('Failed to delete todo:', err));
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const saveEdit = (id) => {
    if (!editText.trim()) return;

    fetch(`http://localhost:4000/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ text: editText.trim() }),
    })
      .then((res) => res.json())
      .then((updatedTodo) => {
        setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
        setEditingId(null);
        setEditText('');
      })
      .catch((err) => console.error('Failed to update todo:', err));
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // Show todo app if authenticated
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>My Todo List</h2>
        <div style={styles.headerActions}>
          <span style={styles.todoCount}>
            {todos.length} {todos.length === 1 ? 'todo' : 'todos'}
          </span>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.inputContainer}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Add a new todo...'
          style={styles.input}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button
          onClick={addTodo}
          style={styles.addButton}
          disabled={!text.trim()}
        >
          Add Todo
        </button>
      </div>

      <div style={styles.todoContainer}>
        {todos.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📝</div>
            <h3 style={styles.emptyTitle}>No todos yet!</h3>
            <p style={styles.emptyText}>
              Add your first todo above to get started.
            </p>
          </div>
        ) : (
          <ul style={styles.todoList}>
            {todos.map((todo) => (
              <li key={todo.id} style={styles.todoItem}>
                {editingId === todo.id ? (
                  <div style={styles.editContainer}>
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      style={styles.editInput}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') saveEdit(todo.id);
                        if (e.key === 'Escape') cancelEdit();
                      }}
                      autoFocus
                    />
                    <div style={styles.editActions}>
                      <button
                        onClick={() => saveEdit(todo.id)}
                        style={styles.saveButton}
                        disabled={!editText.trim()}
                      >
                        ✓ Save
                      </button>
                      <button onClick={cancelEdit} style={styles.cancelButton}>
                        ✕ Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={styles.todoContent}>
                    <span style={styles.todoText}>{todo.text}</span>
                    <div style={styles.todoActions}>
                      <button
                        onClick={() => startEdit(todo)}
                        style={styles.editButton}
                        title='Edit todo'
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        style={styles.deleteButton}
                        title='Delete todo'
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    minHeight: '70vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '2px solid #f0f0f0',
  },
  title: {
    margin: 0,
    color: '#333',
    fontSize: '1.8rem',
    fontWeight: '700',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  todoCount: {
    color: '#666',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  logoutButton: {
    padding: '0.5rem 1rem',
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'background 0.2s',
  },
  inputContainer: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '2rem',
  },
  input: {
    flex: 1,
    padding: '0.875rem',
    border: '2px solid #e1e5e9',
    borderRadius: '10px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  addButton: {
    padding: '0.875rem 1.5rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'transform 0.2s, opacity 0.2s',
    whiteSpace: 'nowrap',
  },
  todoContainer: {
    minHeight: '300px',
  },
  todoList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  todoItem: {
    marginBottom: '0.75rem',
    background: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '10px',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  todoContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
  },
  todoText: {
    fontSize: '1rem',
    color: '#333',
    flex: 1,
    marginRight: '1rem',
    lineHeight: '1.4',
  },
  todoActions: {
    display: 'flex',
    gap: '0.5rem',
  },
  editButton: {
    padding: '0.4rem 0.8rem',
    background: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '500',
    transition: 'background 0.2s',
  },
  deleteButton: {
    padding: '0.4rem 0.8rem',
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '500',
    transition: 'background 0.2s',
  },
  editContainer: {
    padding: '1rem',
  },
  editInput: {
    width: '100%',
    padding: '0.75rem',
    border: '2px solid #3498db',
    borderRadius: '8px',
    fontSize: '1rem',
    outline: 'none',
    marginBottom: '0.75rem',
    boxSizing: 'border-box',
  },
  editActions: {
    display: 'flex',
    gap: '0.5rem',
  },
  saveButton: {
    padding: '0.5rem 1rem',
    background: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'background 0.2s',
  },
  cancelButton: {
    padding: '0.5rem 1rem',
    background: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'background 0.2s',
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    color: '#666',
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '1rem',
  },
  emptyTitle: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#333',
  },
  emptyText: {
    margin: 0,
    fontSize: '1rem',
    lineHeight: '1.5',
  },
};

export default App;
