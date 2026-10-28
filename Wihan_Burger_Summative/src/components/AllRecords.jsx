import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import './AllRecords.css';

export default function AllRecords({ 
  currentUser, 
  onLogout, 
  onNavigateProfile, 
  onNavigateDashboard, 
  onNavigateCases, 
  onNavigateAdmissions, 
  onNavigateRehabilitation, 
  onNavigateAllRecords,
  onNavigateVolunteers,
  onNavigateCaseDetails 
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [records, setRecords] = useState([]);
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
    fetchAllRecords();
  }, []);

  const fetchAllRecords = async () => {
    try {
      const token = localStorage.getItem('spottybird_token');
      const response = await fetch('http://127.0.0.1:5000/api/cases', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'Just now';
    return new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  const getStatusDisplay = (state, status) => {
    if (state === 'accepted') return { text: 'Confirmed', class: 'confirmed' };
    if (state === 'denied') return { text: 'Closed', class: 'closed' };
    return { text: 'Pending', class: 'pending' };
  };

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
            <li onClick={onNavigateDashboard} style={{ cursor: 'pointer' }}>
              <span className="icon">🏠</span> {isSidebarOpen && 'Dashboard'}
            </li>
            <li onClick={onNavigateCases} style={{ cursor: 'pointer' }}>
              <span className="icon">📁</span> {isSidebarOpen && 'Cases'}
            </li>
            <li onClick={onNavigateAdmissions} style={{ cursor: 'pointer' }}>
              <span className="icon">🏥</span> {isSidebarOpen && 'Admissions'}
            </li>
            <li onClick={onNavigateRehabilitation} style={{ cursor: 'pointer' }}>
              <span className="icon">🌿</span> {isSidebarOpen && 'Rehabilitation'}
            </li>
            <li className="active" onClick={onNavigateAllRecords} style={{ cursor: 'pointer' }}>
              <span className="icon">📄</span> {isSidebarOpen && 'All Records'}
            </li>
            <li onClick={onNavigateVolunteers} style={{ cursor: 'pointer' }}>
              <span className="icon">👤</span> {isSidebarOpen && 'Volunteers'}
            </li>
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
            <h2 className="page-title">All Records</h2>
            <p className="page-subtitle">Case identification numbers, locations status and priorities all in one place</p>
          </div>
          
          <div className="header-actions">
            <div className="notification-bell">
              🔔 <span className="badge">1</span>
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

        <div className="breadcrumb">
          <span onClick={onNavigateDashboard}>Dashboard</span> / <strong>All Records</strong>
        </div>

        <div className="records-container">
          
          <div className="records-filters-section">
            <div className="filters-grid">
              <select className="filter-select">
                <option>Animal Type</option>
                <option>Mammal</option>
                <option>Reptile</option>
                <option>Bird</option>
                <option>Other</option>
              </select>
              
              <select className="filter-select">
                <option>Location</option>
                <option>Centurion</option>
                <option>Midstream</option>
              </select>
              
              <select className="filter-select">
                <option>Urgency</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              
              <select className="filter-select">
                <option>Status</option>
                <option>Accepted</option>
                <option>Denied</option>
                <option>Referred</option>
              </select>
              
              <div className="date-picker-wrapper">
                <div className="filter-select date-pseudo-select" onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
                  <span>Release Date</span>
                  <span className="arrow-down">﹀</span>
                </div>
                
                {isCalendarOpen && (
                  <div className="calendar-popup custom-right">
                    <div className="calendar-header">
                      <span>May 2026</span>
                      <div className="calendar-nav">
                        <button>&lt;</button>
                        <button>&gt;</button>
                      </div>
                    </div>
                    <div className="calendar-grid">
                      <div className="day-name sun">Sun</div>
                      <div className="day-name">Mon</div>
                      <div className="day-name">Tue</div>
                      <div className="day-name">Wed</div>
                      <div className="day-name">Thu</div>
                      <div className="day-name">Fri</div>
                      <div className="day-name">Sat</div>
                      {/* Placeholder dates for styling */}
                      <div className="day prev-month">26</div>
                      <div className="day prev-month">27</div>
                      <div className="day prev-month">28</div>
                      <div className="day prev-month">29</div>
                      <div className="day prev-month">30</div>
                      <div className="day">1</div>
                      <div className="day">2</div>
                      <div className="day sun">3</div>
                      <div className="day">4</div>
                      <div className="day">5</div>
                      <div className="day">6</div>
                      <div className="day">7</div>
                      <div className="day">8</div>
                      <div className="day">9</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="search-bar-row">
              <div className="search-bar">
                <span className="search-icon">🔍</span>
                <input type="text" placeholder="Search this list..." />
              </div>
            </div>
          </div>

          <div className="records-table-wrapper">
             <div className="rectable-header">
               <div className="reccol-id">Case ID</div>
               <div className="reccol-animal">Animal</div>
               <div className="reccol-location">Location</div>
               <div className="reccol-outcome">Outcome</div>
               <div className="reccol-status">Status</div>
               <div className="reccol-release">Release Date</div>
               <div className="reccol-updated">Updated</div>
               <div className="reccol-arrow"></div>
             </div>

             <div className="rectable-body">
               {isLoading ? (
                 <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Loading facility records...</div>
               ) : records.length === 0 ? (
                 <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No historical records found.</div>
               ) : (
                 records.map((item) => {
                   const displayInfo = getStatusDisplay(item.state, item.status);
                   return (
                     <div className="rectable-row clickable-row" key={item._id} onClick={() => onNavigateCaseDetails(item._id)}>
                       <div className="reccol-id fw-600">{item.caseId}</div>
                       <div className="reccol-animal double-line">
                         <strong>{item.animal}</strong>
                         <span>{item.species}</span>
                       </div>
                       <div className="reccol-location double-line">
                         <span>{item.location}</span>
                       </div>
                       <div className="reccol-outcome">
                         {item.status === 'Rehabilitation' ? 'In Care' : '-'}
                       </div>
                       <div className="reccol-status">
                         <span className={`status-pill ${displayInfo.class}`}>
                           {displayInfo.text}
                         </span>
                       </div>
                       <div className="reccol-release">-</div>
                       <div className="reccol-updated">{formatTime(item.updatedAt)}</div>
                       <div className="reccol-arrow chevron">&gt;</div>
                     </div>
                   );
                 })
               )}
             </div>
          </div>
          
          <div className="pagination">
            <span>Showing {records.length} Total Cases</span>
            <div className="page-controls">
              <button disabled>&lt;</button>
              <button className="active">1</button>
              <button disabled>&gt;</button>
            </div>
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