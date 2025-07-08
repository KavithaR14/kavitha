import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loginpage.css';

function Loginpage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // First check if the response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Server returned ${response.status}: ${text}`);
      }

const data = await response.json();

if (!response.ok) {
  throw new Error(data.message || 'Login failed');
}

// ✅ Corrected storing
localStorage.setItem('token', data.token);
localStorage.setItem('user', JSON.stringify(data.user));

localStorage.setItem('authToken', data.token);
localStorage.setItem('username', data.user.username);
localStorage.setItem('role', data.user.role);

// Store student-specific data if role is student
if (data.user.role === 'student') {
  localStorage.setItem('studentClass', data.user.class || '');
  localStorage.setItem('studentSection', data.user.section || '');
}

navigate('/sidebar');

    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-page-background"></div>
      <div className="login-page-container">
        <div className="login-card">
          <h2 className="login-title">Student Management Software</h2>
          <p className="login-subtitle">Login with your credentials</p>
          {error && <div className="login-error-message">{error}</div>}

          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span 
                className="password-toggle" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </span>
            </div>
            <button 
              type="submit" 
              className="login-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;