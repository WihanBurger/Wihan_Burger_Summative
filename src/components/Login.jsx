import React, { useState } from 'react';
import './Login.css';

export default function Login() {
  const [authState, setAuthState] = useState('idle');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@') || password.length < 6) {
      setAuthState('error');
    } else {
      setAuthState('success');
    }
  };

  return (
    <div className="login-wrapper">
      {/* LEFT COLUMN */}
      <div className="login-sidebar" style={{ backgroundImage: `url('/path-to-chameleon-image.jpg')` }}>
        <div className="sidebar-overlay"></div>
        
        <div className="sidebar-content top">
          <div className="brand">
            <img src="/logo.svg" alt="SpottyBird" className="logo" />
            <div className="brand-text">
              <h1>SpottyBird Wildlife</h1>
              <p>Rehabilitation</p>
            </div>
          </div>
        </div>

        <div className="sidebar-content middle">
          <h2>Every rescue makes a difference.</h2>
          <p>The secure platform for managing wildlife reports, admissions, rehabilitation, and conservation outcomes.</p>
        </div>

        <div className="sidebar-content bottom">
          <span>🛡️ Secure & Private</span>
          <span>☁️ Backed up daily</span>
          <span>🔒 Role-based access</span>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="login-main">
        <div className="top-action">
          <a href="#" className="return-link">🔗 Return to public site &gt;</a>
        </div>

        <div className="form-container">
          {authState !== 'success' ? (
            <>
              <h2 className="title">Welcome Back!</h2>
              <p className="subtitle">
                Log in to access the Spotty Bird portal.<br />
                <strong>Secure. Trusted. Built for conservation.</strong>
              </p>

              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label className={authState === 'error' ? 'error-text' : ''}>Email Address</label>
                  <div className="input-wrapper">
                    <span className="icon">📧</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={authState === 'error' ? "Incorrect Email Address" : "Enter your email"}
                      className={authState === 'error' ? 'input-error' : ''}
                    />
                  </div>
                  {authState === 'error' && (
                    <div className="error-action">
                      <button type="button">🔄 Try Again</button>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className={authState === 'error' ? 'error-text' : ''}>Password</label>
                  <div className="input-wrapper">
                    <span className="icon">🔒</span>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={authState === 'error' ? "Incorrect password" : "Enter your password"}
                      className={authState === 'error' ? 'input-error' : ''}
                    />
                    <button type="button" className="icon-right" onClick={() => setShowPassword(!showPassword)}>
                      👁️
                    </button>
                  </div>
                  <div className="password-actions">
                    {authState === 'error' ? (
                      <button type="button" className="error-action-btn">🔄 Try Again</button>
                    ) : (
                      <span></span>
                    )}
                    <a href="#" className="forgot-link">Forgot password?</a>
                  </div>
                </div>

                <div className={`warning-banner ${authState === 'error' ? 'error-banner' : ''}`}>
                  <span className="icon">🚨</span>
                  <div className="banner-text">
                    <strong>For staff, interns, admins, and volunteers only.</strong>
                    <p>Use your organization email to sign in.</p>
                  </div>
                </div>

                <button type="submit" className="submit-btn">🔒 Log In</button>
              </form>

              <div className="divider">
                <span>or</span>
              </div>

              <button className="whatsapp-btn">
                <span>💬 Found wildlife? Report on WhatsApp</span>
                <span>&gt;</span>
              </button>
            </>
          ) : (
            <>
              <h2 className="title success-title">Welcome Back!</h2>
              <p className="subtitle">
                You are now logged in to access the Spotty Bird portal.<br />
                <strong>Secure. Trusted. Built for conservation.</strong>
              </p>

              <div className="profile-card">
                <img src="/mock-profile.jpg" alt="Karien Schmidt" className="profile-img" />
                <div className="profile-info">
                  <h3>Karien Schmidt</h3>
                  <p>karienschmidt@gmail.com</p>
                </div>
              </div>

              <div className="success-actions">
                <p className="action-label">Continue to Spottybird Dashboard</p>
                <button className="continue-btn" onClick={() => alert('Proceed to dashboard...')}>
                  Continue
                </button>
                <button className="back-btn" onClick={() => {
                  setAuthState('idle');
                  setEmail('');
                  setPassword('');
                }}>
                  Go back to Login Page
                </button>
              </div>
            </>
          )}
        </div>

        <div className="footer-terms">
          🛡️ Your data is encrypted and protected.<br />
          By logging in, you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}