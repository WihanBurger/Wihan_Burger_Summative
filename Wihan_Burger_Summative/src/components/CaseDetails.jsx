import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import './CaseDetails.css';

export default function CaseDetails({ 
  selectedCaseId,
  currentUser,
  onBack, 
  onLogout, 
  onNavigateProfile, 
  onNavigateDashboard, 
  onNavigateCases,
  onNavigateAdmissions,
  onNavigateRehabilitation,
  onNavigateAllRecords,
  onNavigateVolunteers
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const [caseData, setCaseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const actualUser = currentUser?.user || currentUser || {};
  const fullName = actualUser.name || 'Jeffry Burger';
  const userRole = actualUser.role || 'Administrator';

  const getInitials = (name) => {
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name ? name.substring(0, 2).toUpperCase() : 'JB';
  };

  useEffect(() => {
    if (selectedCaseId) {
      fetchCaseDetails();
    }
  }, [selectedCaseId]);

  const fetchCaseDetails = async () => {
    try {
      const token = localStorage.getItem('spottybird_token');
      const response = await fetch(`http://127.0.0.1:5000/api/cases/${selectedCaseId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setCaseData(data);
    } catch (error) {
      console.error('Error fetching case details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (isLoading) {
    return <div style={{ padding: '3rem', textAlign: 'center' }}>Loading Case Details...</div>;
  }

  if (!caseData) {
    return <div style={{ padding: '3rem', textAlign: 'center' }}>Case not found. Please go back and select a case.</div>;
  }

  return (
    <div className="dashboard-wrapper">
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'collapsed'}`}>
        <div className="sidebar-header">
          <div className="brand">
            <img src="/logo.png" alt="SpottyBird" className="logo" />
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
            <li className="active" onClick={onNavigateCases} style={{ cursor: 'pointer' }}><span className="icon">📁</span> {isSidebarOpen && 'Cases'}</li>
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
            <h2 className="page-title">Cases Details</h2>
            <div className="search-bar case-search">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="Search case number..." />
            </div>
          </div>
          
          <div className="header-actions">
            <div className="notification-bell">
              🔔 <span className="badge">2</span>
            </div>
            
            <div className="profile-menu-pill" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
              <div className="profile-pill-avatar">{getInitials(fullName)}</div>
              <div className="profile-pill-info">
                <strong>{fullName}</strong>
                <span>{userRole}</span>
              </div>
              <span className="profile-pill-arrow">⌄</span>

              {isProfileMenuOpen && (
                <div className="dropdown-panel">
                  <button onClick={onNavigateProfile}>View Profile Settings</button>
                  <button onClick={() => setIsLogoutModalOpen(true)}>Log Out ⍈</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <button className="back-link" onClick={onBack}>
          &lt; Back to Cases
        </button>

        <div className="case-details-container">
          <div className="top-case-card">
            <img src={caseData.img || "/bird-mock.jpg"} alt={caseData.species} className="case-main-img" />
            <div className="case-main-info">
              <div className="case-title-row">
                <h3>{caseData.caseId}</h3>
                <span className={`status-pill ${caseData.status?.toLowerCase().replace(' ', '-')}`}>{caseData.status}</span>
                <span className={`priority-pill ${caseData.urgency?.toLowerCase()}`}>{caseData.urgency}</span>
              </div>
              <p className="animal-name"><strong>{caseData.species}</strong><br/>{caseData.animal}</p>
              
              <div className="case-meta-grid">
                <div className="meta-item">
                  <span className="icon">📅</span>
                  <div>
                    <strong>Reported</strong>
                    <p>{formatDate(caseData.createdAt)}</p>
                  </div>
                </div>
                <div className="meta-item">
                  <span className="icon">📍</span>
                  <div>
                    <strong>Location</strong>
                    <p>{caseData.location}</p>
                  </div>
                </div>
                <div className="meta-item assignee">
                  <div className="assignee-avatar-fallback">
                    {caseData.assignee !== 'Unassigned' ? caseData.assignee.substring(0, 2).toUpperCase() : '?'}
                  </div>
                  <div>
                    <strong>Assigned to:</strong>
                    <p>{caseData.assignee}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="quick-actions-card">
              <h4>Quick Actions</h4>
              <div className="action-buttons-grid">
                <button className="action-btn outline"><span className="icon text-green">+</span> Admit Animal</button>
                <button className="action-btn outline"><span className="icon text-green">📄</span> New Referral</button>
                <button className="action-btn outline full-width">Edit Case Details</button>
              </div>
            </div>
          </div>

          <div className="case-tabs">
            <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>📋 Overview</button>
            <button className={`tab-btn ${activeTab === 'medical' ? 'active' : ''}`} onClick={() => setActiveTab('medical')}>🏥 Medical & Intake</button>
            <button className={`tab-btn ${activeTab === 'media' ? 'active' : ''}`} onClick={() => setActiveTab('media')}>💬 Media & Comms</button>
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="grid-2-col">
                <div className="info-card">
                  <h4>Case Details</h4>
                  <div className="details-grid">
                    <div className="detail-item"><strong>Animal Type</strong><p>{caseData.animal}</p></div>
                    <div className="detail-item"><strong>Days in Care</strong><p>{caseData.daysInCare}</p></div>
                    <div className="detail-item"><strong>Date / Time Logged</strong><p>{formatDateTime(caseData.createdAt)}</p></div>
                    <div className="detail-item"><strong>Found By</strong><p>{caseData.finderName || 'Public Report'}</p></div>
                    <div className="detail-item"><strong>Finder Phone</strong><p>{caseData.phone || 'N/A'}</p></div>
                    <div className="detail-item"><strong>Initial Condition</strong><p>{caseData.condition || 'Pending Assessment'}</p></div>
                    <div className="detail-item"><strong>Weight</strong><p>{caseData.weight ? `${caseData.weight} g` : '-'}</p></div>
                    <div className="detail-item"><strong>Temperature</strong><p>{caseData.temperature ? `${caseData.temperature} °C` : '-'}</p></div>
                    <div className="detail-item"><strong>State Tracker</strong><p style={{textTransform: 'capitalize'}}>{caseData.state}</p></div>
                    <div className="detail-item"><strong>Report Status</strong><p style={{textTransform: 'capitalize'}}>{caseData.report}</p></div>
                  </div>
                </div>
                <div className="info-card map-card">
                  <h4>Location</h4>
                  <div className="map-placeholder">
                    <div className="map-pin">📍</div>
                    <div className="map-overlay-text">
                      <strong>{caseData.location}</strong>
                      <p>Approximate registered area</p>
                    </div>
                    <a href={`https://maps.google.com/?q=${caseData.location}`} target="_blank" rel="noreferrer" className="view-map-link">View in Maps</a>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'medical' && (
              <div className="grid-3-col">
                <div className="info-card">
                  <h4>Incident Description</h4>
                  <p className="text-body">Data pending initial veterinary assessment. Animal currently logged as {caseData.status}.</p>
                </div>
                
                <div className="info-card">
                  <h4>Current Condition</h4>
                  <p className="text-body mb-4">Awaiting full triage report.</p>
                  <h4 className="mt-4">Vitals (if recorded)</h4>
                  <div className="vitals-row"><span>Temperature</span><strong>-</strong></div>
                  <div className="vitals-row"><span>Heart Rate</span><strong>-</strong></div>
                </div>

                <div className="info-card">
                  <h4>Actions Already Taken</h4>
                  <ul className="checklist completed">
                    <li><span className="check">✓</span> Logged into system</li>
                    <li><span className="check">✓</span> Urgency flagged as {caseData.urgency}</li>
                  </ul>
                  <h4 className="mt-4">Need to Do :</h4>
                  <ul className="checklist pending">
                    <li><span className="circle"></span> Complete initial triage</li>
                    <li><span className="circle"></span> Update exact weight and vitals</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="grid-2-col">
                <div className="info-card">
                  <h4>Photos and Attachments</h4>
                  <div className="photo-grid">
                    <img src={caseData.img || "/bird-mock.jpg"} alt="Attachment 1" />
                    <div className="more-photos">+</div>
                  </div>
                </div>
                <div className="info-card chat-card">
                  <div className="chat-header">
                    <h4>WhatsApp Thread</h4>
                    <a href="#">View full chat</a>
                  </div>
                  <div className="chat-window">
                    <div className="chat-bubble received">
                      <p>Case {caseData.caseId} opened on {formatDate(caseData.createdAt)}</p>
                    </div>
                  </div>
                  <div className="chat-input-area">
                    <input type="text" placeholder="Type a reply..." />
                    <button className="send-btn">➤</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {isLogoutModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-avatar initials-only" style={{ background: '#102a1d', color: 'white', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 1rem' }}>
              {getInitials(fullName)}
            </div>
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