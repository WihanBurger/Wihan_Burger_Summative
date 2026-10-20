import React, { useState } from 'react';
import './login.css';

export default function Login({ onLoginSuccess, onNavigateSignUp }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!credentials.email || !credentials.password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Invalid credentials');
        return;
      }

      localStorage.setItem('spottybird_token', data.token);
      localStorage.setItem('spottybird_currentUser', JSON.stringify(data.result));

      onLoginSuccess(data.result);
    } catch (err) {
      setError('Failed to connect to the server.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-sidebar" style={{ backgroundImage: "url('/forest-bg.jpg')" }}>
        <div className="sidebar-overlay"></div>
        
        <div className="sidebar-content brand">
          <img src="/logo.svg" alt="SpottyBird" className="logo" />
          <div className="brand-text">
            <h1>SpottyBird Wildlife</h1>
            <p>Rehabilitation Management System</p>
          </div>
        </div>

        <div className="sidebar-content middle">
          <h2>Welcome back to the sanctuary.</h2>
          <p>Access your dashboard to manage admissions, update rehabilitation cases, and schedule volunteer shifts.</p>
        </div>

        <div className="sidebar-content bottom">
          <span>© 2026 SpottyBird</span>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>

      <div className="login-main page-transition">
        <div className="top-action">
          <button className="return-link" onClick={onNavigateSignUp}>
            Create an account
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </button>
        </div>

        <div className="form-container">
          <h2 className="title">Log In</h2>
          <p className="subtitle">Enter your details to access your <strong>Dashboard</strong>.</p>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="warning-banner error-banner">
                <p><strong>Error:</strong> {error}</p>
              </div>
            )}

            <div className="form-group">
              <label className={error ? 'error-text' : ''}>Email Address</label>
              <div className="input-wrapper">
                <span className="icon">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                </span>
                <input 
                  type="email" 
                  name="email"
                  className={error ? 'input-error' : ''}
                  value={credentials.email}
                  onChange={handleChange}
                  placeholder="name@spottybird.org"
                />
              </div>
            </div>

            <div className="form-group">
              <label className={error ? 'error-text' : ''}>Password</label>
              <div className="input-wrapper">
                <span className="icon">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  className={error ? 'input-error' : ''}
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                <button 
                  type="button" 
                  className="icon-right"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" x2="22" y1="2" y2="22"></line></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
              </div>
              <div className="password-actions">
                <span></span>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>
            </div>

            <button type="submit" className="submit-btn">Log In to Dashboard</button>
            
            <div className="divider">
              <span>OR</span>
            </div>

            <button type="button" className="whatsapp-btn">
              <span>Log in with WhatsApp</span>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            </button>
          </form>

          <p className="footer-terms">
            By logging in, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}