import React, { useState } from 'react';
import './ProfileSettings.css';

export default function ProfileSettings({ onBack, onLogout, onNavigateDashboard, onNavigateCases }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const initialPersonalInfo = {
    name: 'Karien',
    surname: 'Schmidt',
    email: 'Karienschmidt@gmail.com',
    phone: '083 467 1003',
    position: 'Executive Director'
  };

  const initialSecurityInfo = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  const [personalInfo, setPersonalInfo] = useState(initialPersonalInfo);
  const [securityInfo, setSecurityInfo] = useState(initialSecurityInfo);

  const handlePersonalChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleSecurityChange = (e) => {
    setSecurityInfo({ ...securityInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-wrapper">
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'collapsed'}`}>
        <div className="sidebar-header">
          <div className="brand">
            <img src="/logo.svg" alt="SpottyBird" className="logo" />
            {isSidebarOpen && (
              <div className="brand-text">
                <h1>SpottyBird Wildlife</h1>
                <p>Rehabilitation</p>
              </div>
            )}
          </div>
          <button className="collapse-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li onClick={onNavigateDashboard} style={{ cursor: 'pointer' }}><span className="icon">🏠</span> {isSidebarOpen && 'Dashboard'}</li>
            <li onClick={onNavigateCases} style={{ cursor: 'pointer' }}><span className="icon">📁</span> {isSidebarOpen && 'Cases'}</li>
            <li><span className="icon">🏥</span> {isSidebarOpen && 'Admissions'}</li>
            <li><span className="icon">🌿</span> {isSidebarOpen && 'Rehabilitation'}</li>
            <li><span className="icon">📄</span> {isSidebarOpen && 'All Records'}</li>
            <li><span className="icon">👤</span> {isSidebarOpen && 'Volunteers'}</li>
          </ul>
        </nav>

        {isSidebarOpen && (
          <div className="sidebar-whatsapp">
            <div className="wa-icon">💬</div>
            <h4>WhatsApp Intake</h4>
            <button>Open WhatsApp ↗</button>
          </div>
        )}
      </aside>

      <main className="main-content">
        <header className="top-header">
          <div>
            <h2 className="page-title">Profile Settings</h2>
            <p className="page-subtitle">Manage your profile information, security and account preferences for a more personalised experience</p>
          </div>
          
          <div className="header-actions">
            <div className="notification-bell">
              🔔 <span className="badge">1</span>
            </div>
            <button className="btn-outline" onClick={() => setIsLogoutModalOpen(true)}>Log Out ⍈</button>
          </div>
        </header>

        <button className="back-link" onClick={onBack}>
          &lt; Back to Dashboard
        </button>

        <div className="settings-container">
          <div className="settings-card profile-photo-card">
            <h3 className="card-title">Profile Photo</h3>
            <div className="photo-section">
              <div className="avatar-wrapper">
                <img src="/mock-profile.jpg" alt="Profile" className="large-avatar" />
                <button className="edit-avatar-btn">✏️</button>
              </div>
              <div className="photo-details">
                <p className="card-subtitle">Your profile photo will appear on your account and orders</p>
                <div className="photo-actions">
                  <button className="btn-green">📤 Upload Photo</button>
                  <button className="btn-gray">📷 Take Photo</button>
                  <button className="btn-outline-red">🗑️ Delete Account</button>
                </div>
                <div className="format-info">
                  <span className="icon-img">🖼️</span>
                  <div>
                    <strong>Supported formats JPEG</strong>
                    <p>Maximum size: 10MB - Minimum size 5MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="settings-row">
            <div className="settings-card">
              <h3 className="card-title">Personal Information</h3>
              
              <div className="form-row">
                <div className="input-group">
                  <label>Name</label>
                  <input type="text" name="name" value={personalInfo.name} onChange={handlePersonalChange} />
                </div>
                <div className="input-group">
                  <label>Surname</label>
                  <input type="text" name="surname" value={personalInfo.surname} onChange={handlePersonalChange} />
                </div>
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <input type="email" name="email" value={personalInfo.email} onChange={handlePersonalChange} />
              </div>

              <div className="input-group">
                <label>Phone Number</label>
                <input type="text" name="phone" value={personalInfo.phone} onChange={handlePersonalChange} />
              </div>

              <div className="input-group">
                <label>Position</label>
                <input type="text" name="position" value={personalInfo.position} onChange={handlePersonalChange} />
              </div>

              <div className="form-actions">
                <button className="btn-green">✔️ Save</button>
                <button className="btn-gray" onClick={() => setPersonalInfo({name:'', surname:'', email:'', phone:'', position:''})}>🔄 Clear Fields</button>
              </div>
            </div>

            <div className="settings-card">
              <h3 className="card-title">Account Security</h3>
              <p className="card-subtitle">Change your password to keep your account secure</p>

              <div className="input-group">
                <label>Current Password</label>
                <div className="password-input">
                  <input type="password" name="currentPassword" placeholder="Enter your current password" value={securityInfo.currentPassword} onChange={handleSecurityChange} />
                  <span>👁️</span>
                </div>
              </div>

              <div className="input-group">
                <label>New Password</label>
                <div className="password-input">
                  <input type="password" name="newPassword" placeholder="Enter a new password" value={securityInfo.newPassword} onChange={handleSecurityChange} />
                  <span>👁️</span>
                </div>
              </div>

              <div className="input-group">
                <label>Confirm New Password</label>
                <div className="password-input">
                  <input type="password" name="confirmPassword" placeholder="Confirm your new password" value={securityInfo.confirmPassword} onChange={handleSecurityChange} />
                  <span>👁️</span>
                </div>
              </div>

              <div className="form-actions mt-auto">
                <button className="btn-green">✔️ Update Password</button>
                <button className="btn-gray" onClick={() => setSecurityInfo(initialSecurityInfo)}>🔄 Clear Fields</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {isLogoutModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <img src="/mock-profile.jpg" alt="Karien Schmidt" className="modal-avatar" />
            <h3>Karien Schmidt</h3>
            <p className="modal-role">Executive Director</p>
            <p className="modal-prompt">Are you sure you want to log out?</p>
            <p className="modal-subtext">Accepting it will take you back to the log in page.</p>
            <div className="modal-actions">
              <button className="btn-dark" onClick={onLogout}>Yes, log out</button>
              <button className="btn-outline" onClick={() => setIsLogoutModalOpen(false)}>No, go back.</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}