import React, { useState } from 'react';
import './Login.css';

export default function SignUp({ onSignUpSuccess, onNavigateLogin }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('spottybird_token', data.token);
        
        const createdName = formData.name || data.user?.name || formData.email.split('@')[0];

        onSignUpSuccess({
          name: createdName,
          email: formData.email,
          role: "Volunteer"
        });
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      setError('Failed to connect to the backend server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper page-transition">
      <div 
        className="login-sidebar swap-in-left"
        style={{ 
          backgroundImage: "url('/login-bg.jpg')", 
          backgroundSize: 'cover', 
          backgroundPosition: '20% center', 
          backgroundRepeat: 'no-repeat',
          padding: '4rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative'
        }}
      >
        <div className="sidebar-overlay"></div>
        
        <div className="sidebar-content brand animate-fade-in-down" style={{ position: 'relative', zIndex: 2 }}>
          <img src="/logo.png" alt="SpottyBird" className="logo shadow-glow" />
          <div className="brand-text">
            <h1>SpottyBird</h1>
            <p>Wildlife Rehabilitation</p>
          </div>
        </div>

        <div className="sidebar-content middle animate-fade-in-right delay-1" style={{ position: 'relative', zIndex: 2 }}>
          <h2>Join the Cause.</h2>
          <p>Create an account to track admissions, monitor rehabilitation progress, and help release wildlife safely back into nature.</p>
        </div>

        <div className="sidebar-content bottom animate-fade-in-up delay-2" style={{ position: 'relative', zIndex: 2 }}>
          <span>Rescue</span> <span className="dot">•</span>
          <span>Rehabilitate</span> <span className="dot">•</span>
          <span>Release</span>
        </div>
      </div>

      <div className="login-main swap-in-right">
        <div className="top-action animate-fade-in-down">
          <button className="return-link" onClick={onNavigateLogin}>
            Already have an account? Log In ➔
          </button>
        </div>

        <div className="form-container animate-fade-in-up delay-1">
          <div className="flex-title">
            <h1 className="title">Create Account</h1>
          </div>
          <p className="subtitle">Register to join the <strong>SpottyBird</strong> volunteer and staff network.</p>
          
          {error && (
            <div className="warning-banner error-banner animate-shake">
              <span className="warning-icon">⚠️</span>
              <p>{error}</p>
            </div>
          )}

          <form className="login-form" onSubmit={handleSignUp}>
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrapper focus-anim">
                <span className="icon">👤</span>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  required 
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper focus-anim">
                <span className="icon">✉️</span>
                <input 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
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
                  type={showPassword ? "text" : "password"} 
                  value={formData.password} 
                  onChange={(e) => setFormData({...formData, password: e.target.value})} 
                  required 
                  placeholder="Create a strong password"
                />
                <button 
                  type="button" 
                  className="icon-right toggle-password" 
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Hide Password" : "Show Password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button type="submit" className="submit-btn hover-glow-btn" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
        </div>

        <div className="footer-terms animate-fade-in-up delay-2">
          <p>By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</p>
        </div>
      </div>
    </div>
  );
}