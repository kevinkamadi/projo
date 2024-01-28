import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Login = ({ onLogin, isAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        onLogin(data.token);
        setRedirecting(true);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('An error occurred during login.');
    }
  };

  useEffect(() => {
    if (isAuthenticated && redirecting) {
      console.log('Redirecting to home page');
      // Trigger navigation to the home page
      navigate('/');
    }
  }, [isAuthenticated, redirecting, navigate]);

  return (
    <div className='setup'>
      <div className='watermark'>
        <div className="login-container">
          <form className="login-form" onSubmit={(e) => handleLogin(e)}>
            <h3>Login</h3>
            <label htmlFor="username">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter Username"
              id="username"
              name="username"
            />
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter Password"
              id="password"
              name="password"
            />
            <button type="submit">Log in</button>
          </form>
          <p>
            Don't have an account? <Link to="/register" className='link'>Register here</Link>
          </p>
          {message && <p className="error-message">{message}</p>}
          {redirecting && (
            <p className="success-message">Logging in. Redirecting to the home page...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;