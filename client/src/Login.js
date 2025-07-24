import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle username input with real-time trimming
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    // Allow spaces while typing, but trim on blur for better UX
    setUsername(value);
  };

  // Handle password input with real-time trimming
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    // Allow spaces while typing, but trim on blur for better UX
    setPassword(value);
  };

  // Trim username when user leaves the field
  const handleUsernameBlur = () => {
    setUsername(username.trim());
  };

  // Trim password when user leaves the field
  const handlePasswordBlur = () => {
    setPassword(password.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Trim whitespace from inputs for security and UX
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    // Validate that username and password are not empty after trimming
    if (!trimmedUsername || !trimmedPassword) {
      setError('Username and password cannot be empty or just whitespace');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: trimmedUsername,
          password: trimmedPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('authToken', data.token);
        onLogin(data.token);
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Sign in to access your todos</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type='text'
              value={username}
              onChange={handleUsernameChange}
              onBlur={handleUsernameBlur}
              style={styles.input}
              placeholder='Enter your username'
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type='password'
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              style={styles.input}
              placeholder='Enter your password'
              required
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button
            type='submit'
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {}),
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={styles.demoInfo}>
          <p style={styles.demoText}>Demo credentials:</p>
          <p style={styles.demoCredentials}>Username: test | Password: test</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  loginBox: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '0.5rem',
    color: '#333',
    fontSize: '1.8rem',
    fontWeight: '600',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#666',
    fontSize: '0.9rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#333',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '2px solid #e1e5e9',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    marginTop: '0.5rem',
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  error: {
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: '1rem',
    padding: '0.5rem',
    background: '#fdf2f2',
    border: '1px solid #fecaca',
    borderRadius: '6px',
    fontSize: '0.9rem',
  },
  demoInfo: {
    marginTop: '1.5rem',
    padding: '1rem',
    background: '#f8f9fa',
    borderRadius: '8px',
    textAlign: 'center',
  },
  demoText: {
    margin: '0 0 0.25rem 0',
    color: '#666',
    fontSize: '0.85rem',
    fontWeight: '500',
  },
  demoCredentials: {
    margin: 0,
    color: '#333',
    fontSize: '0.85rem',
    fontFamily: 'monospace',
  },
};

export default Login;
