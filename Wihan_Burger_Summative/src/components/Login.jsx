import React, { useState } from 'react';
import './Login.css';

export default function Login({ onLoginSuccess, onNavigateSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('spottybird_token', data.token);
        
        const fallbackName = email.split('@')[0];
        const formattedName = data.user?.name || data.name || data.user?.username || fallbackName;
        const formattedRole = data.user?.role || data.role || "Rehabilitator";

        onLoginSuccess({
          name: formattedName,
          email: email,
          role: formattedRole
        });
      } else {
        setError(data.message || 'Invalid email or password.');
      }
    } catch (err) {
      setError('Failed to connect to the backend server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper page-transition">
      <div className="login-sidebar swap-in-left">
        <div className="sidebar-overlay"></div>
        
        <div className="sidebar-content brand animate-fade-in-down">
          <img src="/logo.svg" alt="SpottyBird" className="logo shadow-glow" />
          <div className="brand-text">
            <h1>SpottyBird</h1>
            <p>Wildlife Rehabilitation</p>
          </div>
        </div>

        <div className="sidebar-content middle animate-fade-in-right delay-1">
          <h2>Welcome Back.</h2>
          <p>Sign in to continue managing wildlife rehabilitation cases, updating animal records, and coordinating volunteer efforts.</p>
        </div>

        <div className="sidebar-content bottom animate-fade-in-up delay-2">
          <span>Rescue</span> <span className="dot">•</span>
          <span>Rehabilitate</span> <span className="dot">•</span>
          <span>Release</span>
        </div>
      </div>

      <div className="login-main swap-in-right">
        <div className="top-action animate-fade-in-down">
          <button className="return-link" onClick={onNavigateSignUp}>
            New here? Create an account
          </button>
        </div>

        <div className="form-container animate-fade-in-up delay-1">
          <div className="flex-title">
            <h1 className="title">Log In</h1>
          </div>
          <p className="subtitle">Enter your credentials to access the <strong>SpottyBird Dashboard</strong>.</p>
          
          {error && (
            <div className="warning-banner error-banner animate-shake">
              <span className="warning-icon">⚠️</span>
              <p>{error}</p>
            </div>
          )}

          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper focus-anim">
                <span className="icon">✉️</span>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper focus-anim">
                <span className="icon">🔒</span>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  placeholder="••••••••"
                />
              </div>
              <div className="password-actions">
                <span></span>
                <button type="button" className="error-action-btn hover-scale">Forgot Password?</button>
              </div>
            </div>

            <button type="submit" className="submit-btn hover-glow-btn" disabled={isLoading}>
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>

        <div className="footer-terms animate-fade-in-up delay-2">
          <p>By logging in, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</p>
        </div>
      </div>
    </div>
  );
}