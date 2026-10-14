import React, { useState } from 'react';
import './Dashboard.css';
import './CaseDetails.css';

export default function CaseDetails({ onBack, onLogout, onNavigateProfile, onNavigateDashboard, onNavigateCases }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="dashboard-wrapper">
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
            <li className="active" onClick={onNavigateCases} style={{ cursor: 'pointer' }}><span className="icon">📁</span> {isSidebarOpen && 'Cases'}</li>
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
            
            <div className="profile-menu" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
              <img src="/mock-profile.jpg" alt="Karien" className="avatar" />
              <div className="profile-info">
                <strong>Karien Schmidt</strong>
                <span>Executive Director</span>
              </div>
              <span className="dropdown-arrow">﹀</span>

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
            <img src="/bird-mock.jpg" alt="Kookaburra" className="case-main-img" />
            <div className="case-main-info">
              <div className="case-title-row">
                <h3>SBRC-2025-0185</h3>
                <span className="status-pill rehabilitation">Rehabilitation</span>
                <span className="priority-pill low">Low</span>
              </div>
              <p className="animal-name"><strong>Laughing Kookaburra</strong><br/>Dacelo novaeguineae</p>
              
              <div className="case-meta-grid">
                <div className="meta-item">
                  <span className="icon">📅</span>
                  <div>
                    <strong>Reported</strong>
                    <p>12 May 2025</p>
                  </div>
                </div>
                <div className="meta-item">
                  <span className="icon">📍</span>
                  <div>
                    <strong>Location</strong>
                    <p>Open Window - Centurion</p>
                  </div>
                </div>
                <div className="meta-item assignee">
                  <img src="/mock-profile.jpg" alt="Assignee" className="assignee-avatar" />
                  <div>
                    <strong>Assigned to:</strong>
                    <p>Karien Schmidt</p>
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
                    <div className="detail-item"><strong>Animal Type</strong><p>Bird</p></div>
                    <div className="detail-item"><strong>Incident Type</strong><p>Grounded / Unable to fly</p></div>
                    <div className="detail-item"><strong>Age / Life Stage</strong><p>Juvenile (Fledgling)</p></div>
                    <div className="detail-item"><strong>Date / Time Found</strong><p>15 May 2025, 2:45 PM</p></div>
                    <div className="detail-item"><strong>Sex (if known)</strong><p>Unknown</p></div>
                    <div className="detail-item"><strong>Found By</strong><p>Emily Rogers</p></div>
                    <div className="detail-item"><strong>Weight (if known)</strong><p>-</p></div>
                    <div className="detail-item"><strong>Weather Conditions</strong><p>Overcast, 18°C</p></div>
                    <div className="detail-item"><strong>Microchip / ID</strong><p>-</p></div>
                    <div className="detail-item"><strong>Other Animals Involved</strong><p>No</p></div>
                  </div>
                </div>
                <div className="info-card map-card">
                  <h4>Location</h4>
                  <div className="map-placeholder">
                    <div className="map-pin">📍</div>
                    <div className="map-overlay-text">
                      <strong>Open Window - Centurion</strong>
                      <p>1297 John Vorster Dr, Southdowns, Centurion, 0062</p>
                    </div>
                    <a href="#" className="view-map-link">View in Maps</a>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'medical' && (
              <div className="grid-3-col">
                <div className="info-card">
                  <h4>Incident Description</h4>
                  <p className="text-body">Found a juvenile kookaburra on the ground near dense bushes. It didn't move when approached. Appears weak but alert. Unable to fly.</p>
                  <p className="text-body mt-4">Note: No visible injuries or bleeding.</p>
                </div>
                
                <div className="info-card">
                  <h4>Current Condition</h4>
                  <p className="text-body mb-4">Found a juvenile kookaburra on the ground near dense bushes. It didn't move when approached. Appears weak but alert. Unable to fly.</p>
                  <h4 className="mt-4">Vitals (if recorded)</h4>
                  <div className="vitals-row">
                    <span>Temperature</span>
                    <strong>38.2C</strong>
                  </div>
                  <div className="vitals-row">
                    <span>Heart Rate</span>
                    <strong>-</strong>
                  </div>
                </div>

                <div className="info-card">
                  <h4>Actions Already Taken</h4>
                  <ul className="checklist completed">
                    <li><span className="check">✓</span> Assessed on site</li>
                    <li><span className="check">✓</span> Placed in ventilated carrier</li>
                    <li><span className="check">✓</span> Kept in shaded area</li>
                    <li><span className="check">✓</span> Offered small amount of water</li>
                  </ul>

                  <h4 className="mt-4">Need to Do :</h4>
                  <ul className="checklist pending">
                    <li><span className="circle"></span> Need to do here</li>
                    <li><span className="circle"></span> Need to do here</li>
                    <li><span className="circle"></span> Need to do here</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="grid-2-col">
                <div className="info-card">
                  <h4>Photos and Attachments</h4>
                  <div className="photo-grid">
                    <img src="/bird-mock.jpg" alt="Attachment 1" />
                    <img src="/bird-mock.jpg" alt="Attachment 2" />
                    <div className="more-photos">+3</div>
                  </div>
                  <h4 className="mt-4">Export Images</h4>
                  <div className="export-box">
                    <span className="icon">🖼️</span>
                    <div className="export-text">
                      <strong>IMG_20250516_1442.jpg</strong>
                      <p>Maximum size: 10MB - Minimum size 5MB</p>
                    </div>
                    <span className="download-icon">📥</span>
                  </div>
                </div>

                <div className="info-card chat-card">
                  <div className="chat-header">
                    <h4>WhatsApp Thread</h4>
                    <a href="#">View full chat</a>
                  </div>
                  <div className="chat-window">
                    <div className="chat-bubble received">
                      <p>Hi, I found this kookaburra on the ground. It's not flying and seems weak.</p>
                      <span className="time">2:45 PM</span>
                    </div>
                    <div className="chat-bubble sent">
                      <p>Thanks Emily. Is it injured or bleeding anywhere?</p>
                      <span className="time">2:47 PM</span>
                    </div>
                    <div className="chat-bubble received">
                      <p>No visible injuries, just sitting on the ground near the bush.</p>
                      <span className="time">2:48 PM</span>
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