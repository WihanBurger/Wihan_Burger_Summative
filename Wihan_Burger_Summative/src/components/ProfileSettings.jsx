import React, { useState, useEffect, useRef } from 'react';
import './ProfileSettings.css';

export default function ProfileSettings({ 
  currentUser,
  onUpdateUser, 
  onBack, 
  onLogout, 
  onNavigateDashboard, 
  onNavigateCases,
  onNavigateAdmissions,
  onNavigateRehabilitation,
  onNavigateAllRecords,
  onNavigateVolunteers
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const [profileStatus, setProfileStatus] = useState({ type: '', message: '' });
  const [securityStatus, setSecurityStatus] = useState({ type: '', message: '' });
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const actualUser = currentUser?.user || currentUser || {};

  const fullName = actualUser.name || actualUser.username || 'Wildlife Volunteer';
  const nameParts = fullName.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  const userRole = actualUser.role || 'Staff Member';
  
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=4a7c59&color=fff&rounded=true&size=140`;
  const avatarUrl = selectedPhoto || defaultAvatar;

  const [personalInfo, setPersonalInfo] = useState({
    name: firstName,
    surname: lastName,
    email: actualUser.email || '',
    phone: actualUser.phone || '',
    position: userRole
  });

  const initialSecurityInfo = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  const [securityInfo, setSecurityInfo] = useState(initialSecurityInfo);

  useEffect(() => {
    setPersonalInfo({
      name: firstName,
      surname: lastName,
      email: actualUser.email || '',
      phone: actualUser.phone || '',
      position: userRole
    });
  }, [currentUser, firstName, lastName, actualUser.email, actualUser.phone, userRole]);

  const handlePersonalChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleSecurityChange = (e) => {
    setSecurityInfo({ ...securityInfo, [e.target.name]: e.target.value });
  };

  const handlePhotoClick = () => fileInputRef.current.click(); 

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedPhoto(URL.createObjectURL(file));
    }
  };

  const handleSavePersonalInfo = async () => {
    setIsSaving(true);
    setProfileStatus({ type: '', message: '' });
    
    try {
      const token = localStorage.getItem('spottybird_token');
      
      const response = await fetch('http://127.0.0.1:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(personalInfo)
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update profile');
      
      const newUserData = data.user ? data.user : data;
      const newToken = data.token ? data.token : token;
      
      localStorage.setItem('spottybird_token', newToken);
      
      if (onUpdateUser) {
        onUpdateUser(newUserData);
      }
      
      setProfileStatus({ type: 'success', message: 'Profile updated successfully!' });
      setTimeout(() => setProfileStatus({ type: '', message: '' }), 3000);
    } catch (error) {
      setProfileStatus({ type: 'error', message: error.message || 'Failed to update profile.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdatePassword = async () => {
    setSecurityStatus({ type: '', message: '' });

    if (!securityInfo.currentPassword || !securityInfo.newPassword) {
      return setSecurityStatus({ type: 'error', message: 'Please fill in all password fields.' });
    }
    if (securityInfo.newPassword !== securityInfo.confirmPassword) {
      return setSecurityStatus({ type: 'error', message: 'New passwords do not match.' });
    }

    setIsSaving(true);
    try {
      const token = localStorage.getItem('spottybird_token');
      const response = await fetch('http://127.0.0.1:5000/api/users/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: securityInfo.currentPassword,
          newPassword: securityInfo.newPassword
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update password');

      setSecurityStatus({ type: 'success', message: 'Password updated successfully!' });
      setSecurityInfo(initialSecurityInfo); 
      setTimeout(() => setSecurityStatus({ type: '', message: '' }), 3000);
    } catch (error) {
      setSecurityStatus({ type: 'error', message: error.message || 'Failed to update password.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearPersonalFields = () => {
    setPersonalInfo({
      name: firstName,
      surname: lastName,
      email: actualUser.email || '',
      phone: actualUser.phone || '',
      position: userRole
    });
    setProfileStatus({ type: '', message: '' });
  };

  return (
    <div className="profile-wrapper page-transition">
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
            <li onClick={onNavigateAdmissions} style={{ cursor: 'pointer' }}><span className="icon">🏥</span> {isSidebarOpen && 'Admissions'}</li>
            <li onClick={onNavigateRehabilitation} style={{ cursor: 'pointer' }}><span className="icon">🌿</span> {isSidebarOpen && 'Rehabilitation'}</li>
            <li onClick={onNavigateAllRecords} style={{ cursor: 'pointer' }}><span className="icon">📄</span> {isSidebarOpen && 'All Records'}</li>
            <li onClick={onNavigateVolunteers} style={{ cursor: 'pointer' }}><span className="icon">👤</span> {isSidebarOpen && 'Volunteers'}</li>
          </ul>
        </nav>
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
                <img src={avatarUrl} alt="Profile" className="large-avatar" />
                <button className="edit-avatar-btn" onClick={handlePhotoClick}>✏️</button>
              </div>
              <div className="photo-details">
                <p className="card-subtitle">Your profile photo will appear on your account and cases</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handlePhotoChange} 
                  accept="image/jpeg, image/png, image/jpg" 
                  style={{ display: 'none' }} 
                />
                <div className="photo-actions">
                  <button className="btn-green" onClick={handlePhotoClick}>📤 Upload Photo</button>
                  <button className="btn-gray">📷 Take Photo</button>
                  <button className="btn-outline-red" onClick={() => setSelectedPhoto(null)}>🗑️ Remove Photo</button>
                </div>
                <div className="format-info">
                  <span className="icon-img">🖼️</span>
                  <div>
                    <strong>Supported formats JPEG, PNG</strong>
                    <p>Maximum size: 10MB - Minimum size 5MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="settings-row">
            
            <div className="settings-card">
              <h3 className="card-title">Personal Information</h3>
              
              {profileStatus.message && (
                <div className={`status-banner ${profileStatus.type}`}>
                  {profileStatus.message}
                </div>
              )}
              
              <div className="form-row mt-3">
                <div className="input-group">
                  <label>Name</label>
                  <input type="text" name="name" value={personalInfo.name} onChange={handlePersonalChange} autoComplete="off" />
                </div>
                <div className="input-group">
                  <label>Surname</label>
                  <input type="text" name="surname" value={personalInfo.surname} onChange={handlePersonalChange} autoComplete="off" />
                </div>
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <input type="email" name="email" value={personalInfo.email} onChange={handlePersonalChange} autoComplete="email" />
              </div>

              <div className="input-group">
                <label>Phone Number</label>
                <input type="text" name="phone" placeholder="+27 00 000 0000" value={personalInfo.phone} onChange={handlePersonalChange} autoComplete="off" />
              </div>

              <div className="input-group">
                <label>Position</label>
                <input type="text" name="position" value={personalInfo.position} disabled style={{ backgroundColor: '#f9fafb', cursor: 'not-allowed' }} />
              </div>

              <div className="form-actions mt-auto">
                <button className="btn-green" onClick={handleSavePersonalInfo} disabled={isSaving}>
                  {isSaving ? 'Saving...' : '✔️ Save'}
                </button>
                <button className="btn-gray" onClick={handleClearPersonalFields} disabled={isSaving}>
                  🔄 Reset Fields
                </button>
              </div>
            </div>

            <div className="settings-card">
              <h3 className="card-title">Account Security</h3>
              <p className="card-subtitle">Change your password to keep your account secure</p>

              {securityStatus.message && (
                <div className={`status-banner ${securityStatus.type}`}>
                  {securityStatus.message}
                </div>
              )}

              <div className="input-group mt-3">
                <label>Current Password</label>
                <div className="password-input">
                  <input type="password" name="currentPassword" placeholder="Enter your current password" value={securityInfo.currentPassword} onChange={handleSecurityChange} autoComplete="new-password" />
                  <span>👁️</span>
                </div>
              </div>

              <div className="input-group">
                <label>New Password</label>
                <div className="password-input">
                  <input type="password" name="newPassword" placeholder="Enter a new password" value={securityInfo.newPassword} onChange={handleSecurityChange} autoComplete="new-password" />
                  <span>👁️</span>
                </div>
              </div>

              <div className="input-group">
                <label>Confirm New Password</label>
                <div className="password-input">
                  <input type="password" name="confirmPassword" placeholder="Confirm your new password" value={securityInfo.confirmPassword} onChange={handleSecurityChange} autoComplete="new-password" />
                  <span>👁️</span>
                </div>
              </div>

              <div className="form-actions mt-auto">
                <button className="btn-green" onClick={handleUpdatePassword} disabled={isSaving}>
                  {isSaving ? 'Updating...' : '✔️ Update Password'}
                </button>
                <button className="btn-gray" onClick={() => setSecurityInfo(initialSecurityInfo)} disabled={isSaving}>
                  🔄 Clear Fields
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      {isLogoutModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <img src={defaultAvatar} alt={fullName} className="modal-avatar" />
            <h3>{fullName}</h3>
            <p className="modal-role">{userRole}</p>
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