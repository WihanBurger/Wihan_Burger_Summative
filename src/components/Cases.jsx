import React, { useState } from 'react';
import './Dashboard.css';
import './Cases.css';

export default function Cases({ onLogout, onNavigateProfile, onNavigateDashboard, onNavigateCaseDetails }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const mockCases = [
    { id: 'SBRC-2025-0187', animal: 'Bird', location: 'Rooihuiskraal, Centurion', status: 'New Report', priority: '-', assignee: '-', time: 'Now', state: 'pending', report: 'pending' },
    { id: 'SBRC-2025-0186', animal: 'Brush-tailed Possum', location: 'Irene, Centurion', status: 'Info Missing', priority: '-', assignee: '-', time: '32 min ago', state: 'pending', report: 'pending' },
    { id: 'SBRC-2025-0185', animal: '-', location: 'Midstream Estate', status: 'Rehabilitation', priority: 'Medium', assignee: 'Tahlia M.', time: '11 min ago', state: 'accepted', report: 'open' },
    { id: 'SBRC-2025-0184', animal: 'Mammal', location: 'Eldoraigne, Centurion', status: 'New Report', priority: '-', assignee: '-', time: '1 hr ago', state: 'pending', report: 'pending' },
    { id: 'SBRC-2025-0183', animal: 'Echidna', location: 'Rooihuiskraal, Centurion', status: 'New Report', priority: 'High', assignee: 'Sarah J.', time: '15 min ago', state: 'accepted', report: 'open' },
    { id: 'SBRC-2025-0182', animal: 'Brush-tailed Possum', location: 'Irene, Centurion', status: 'Info Missing', priority: '-', assignee: 'Dr. Keira B.', time: '32 min ago', state: 'pending', report: 'pending' },
    { id: 'SBRC-2025-0181', animal: 'Other', location: 'Cape Town, Seapoint', status: 'Assessment', priority: 'Low', assignee: '-', time: '11 min ago', state: 'denied', report: 'refer' },
    { id: 'SBRC-2025-0180', animal: 'Tawny Frogmouth', location: 'Eldoraigne, Centurion', status: 'New Report', priority: '-', assignee: '-', time: '1 hr ago', state: 'pending', report: 'pending' },
    { id: 'SBRC-2025-0179', animal: 'Reptile', location: 'Cape Town, Durbaville', status: 'New Report', priority: '-', assignee: '-', time: '15 min ago', state: 'denied', report: 'refer' },
    { id: 'SBRC-2025-0178', animal: 'Eastern Rosella', location: 'Rooihuiskraal, Centurion', status: 'New Report', priority: 'High', assignee: '-', time: '3 days ago', state: 'pending', report: 'pending' }
  ];

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
            <li className="active"><span className="icon">📁</span> {isSidebarOpen && 'Cases'}</li>
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
            <h2 className="page-title">Cases List</h2>
            <p className="page-subtitle">Case identification numbers, locations status and priorities all in one place</p>
          </div>
          
          <div className="header-actions">
             <div className="date-picker-wrapper">
               <div className="date-picker-btn" onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
                <span>📅 12 May - 18 May, 2025</span>
                <span>{isCalendarOpen ? '⌃' : '⌄'}</span>
              </div>
              
              {isCalendarOpen && (
                <div className="calendar-popup">
                  <div className="calendar-header">
                    <span>May 2025</span>
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
                    
                    <div className="day prev-month">27</div>
                    <div className="day prev-month">28</div>
                    <div className="day prev-month">29</div>
                    <div className="day prev-month">30</div>
                    <div className="day">1</div>
                    <div className="day">2</div>
                    <div className="day">3</div>
                    
                    <div className="day sun">4</div>
                    <div className="day">5</div>
                    <div className="day">6</div>
                    <div className="day">7</div>
                    <div className="day">8</div>
                    <div className="day">9</div>
                    <div className="day">10</div>

                    <div className="day sun">11</div>
                    <div className="day range-start">12</div>
                    <div className="day range">13</div>
                    <div className="day range">14</div>
                    <div className="day range">15</div>
                    <div className="day range">16</div>
                    <div className="day range">17</div>
                    
                    <div className="day range-end sun-range">18</div>
                    <div className="day">19</div>
                    <div className="day">20</div>
                    <div className="day">21</div>
                    <div className="day">22</div>
                    <div className="day">23</div>
                    <div className="day">24</div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="notification-bell">
              🔔 <span className="badge">1</span>
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

        <div className="cases-container">
          <div className="filters-row">
            <select><option>Animal Type</option><option>Mammal</option><option>Reptile</option><option>Bird</option></select>
            <select><option>Location</option><option>Centurion</option><option>Midstream</option></select>
            <select><option>Urgency</option><option>High</option><option>Medium</option><option>Low</option></select>
            <select><option>Status</option><option>Accepted</option><option>Denied</option></select>
            <select><option>Assignee</option><option>Karien Schmidt</option></select>
            
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="Search this list..." />
            </div>
          </div>

          <div className="cases-table-wrapper">
             <div className="table-header">
               <div className="col-id">Case ID</div>
               <div className="col-animal">Animal</div>
               <div className="col-location">Location</div>
               <div className="col-status">Status</div>
               <div className="col-priority">Priority</div>
               <div className="col-assignee">Assigned To</div>
               <div className="col-updated">Updated</div>
               <div className="col-state">State</div>
               <div className="col-report">Report</div>
             </div>

             <div className="table-body">
               {mockCases.map((caseItem, index) => (
                 <div className="table-row clickable-row" key={index} onClick={onNavigateCaseDetails}>
                   <div className="col-id fw-600">{caseItem.id}</div>
                   <div className="col-animal">{caseItem.animal}</div>
                   <div className="col-location">{caseItem.location}</div>
                   <div className="col-status">
                     <span className={`status-pill ${caseItem.status.toLowerCase().replace(' ', '-')}`}>
                       {caseItem.status}
                     </span>
                   </div>
                   <div className="col-priority">
                     {caseItem.priority !== '-' && (
                       <span className={`priority-pill ${caseItem.priority.toLowerCase()}`}>
                         {caseItem.priority}
                       </span>
                     )}
                     {caseItem.priority === '-' && '-'}
                   </div>
                   <div className="col-assignee">{caseItem.assignee}</div>
                   <div className="col-updated">{caseItem.time}</div>
                   <div className="col-state" onClick={(e) => e.stopPropagation()}>
                     {caseItem.state === 'pending' && (
                       <div className="action-buttons">
                         <button className="btn-accept">Accept</button>
                         <button className="btn-deny">Deny</button>
                       </div>
                     )}
                     {caseItem.state === 'accepted' && <span className="state-pill accepted">Accepted</span>}
                     {caseItem.state === 'denied' && <span className="state-pill denied">Denied</span>}
                   </div>
                   <div className="col-report" onClick={(e) => e.stopPropagation()}>
                     <button className={`report-btn ${caseItem.report}`}>
                       {caseItem.report === 'pending' ? 'State Pending' : caseItem.report === 'open' ? 'Open Report' : 'Refer Case'}
                     </button>
                   </div>
                 </div>
               ))}
             </div>
          </div>
          
          <div className="pagination">
            <span>Showing 10 of 28 Cases</span>
            <div className="page-controls">
              <button disabled>&lt;</button>
              <button className="active">1</button>
              <button>2</button>
              <button>3</button>
              <button>...</button>
              <button>&gt;</button>
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