import React, { useState } from 'react';
import './Dashboard.css';
import './Rehabilitation.css';

export default function Rehabilitation({ onLogout, onNavigateProfile, onNavigateDashboard, onNavigateCases, onNavigateAdmissions, onNavigateCaseDetails }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const mockRehabCases = [
    { animal: 'Laughing Kookaburra', species: 'Dacelo novaeguineae', assignee: 'Sarah J.', enclosure: 'Aviary 2', release: 'Today. 10:00 AM', status: 'In Care', days: 12, img: '/bird-mock.jpg' },
    { animal: 'Eastern Rosella', species: 'Platycercus eximius', assignee: 'Sarah J.', enclosure: 'Aviary 25', release: 'Today. 08:00 AM', status: 'Critical', days: 2, img: '/bird-mock.jpg' },
    { animal: 'Brush-tailed Possum', species: 'Trichosurus vulpecula', assignee: 'Mia D.', enclosure: 'Cage 4', release: 'Today. 11:00 AM', status: 'Ready for realease', days: 5, img: '/possum-mock.jpg' },
    { animal: 'Echidna', species: 'Tachyglossus aculeatus', assignee: 'Dr. James F', enclosure: 'Cage 44', release: 'Today. 9:00 AM', status: 'Ready for realease', days: 8, img: '/echidna-mock.jpg' },
    { animal: 'Grey Butcherbird', species: 'Cracticus torquatus', assignee: 'Dr. Giet F', enclosure: 'Cage 45', release: 'Today. 10:00 AM', status: 'Critical', days: 33, img: '/bird-mock.jpg' }
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
            <li onClick={onNavigateCases} style={{ cursor: 'pointer' }}><span className="icon">📁</span> {isSidebarOpen && 'Cases'}</li>
            <li onClick={onNavigateAdmissions} style={{ cursor: 'pointer' }}><span className="icon">🏥</span> {isSidebarOpen && 'Admissions'}</li>
            <li className="active"><span className="icon">🌿</span> {isSidebarOpen && 'Rehabilitation'}</li>
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
            <h2 className="page-title">Rehabilitation</h2>
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

        <div className="breadcrumb">
          <span onClick={onNavigateDashboard}>Dashboard</span> / <strong>Rehabilitation</strong>
        </div>

        <div className="rehab-kpi-grid">
          <div className="rkpi-card border-green">
            <div className="rkpi-icon-circle green-circle">
              <span className="icon">🚐</span>
            </div>
            <div className="rkpi-data">
              <p>In Care</p>
              <h3>31</h3>
              <span className="rkpi-trend trend-blue">• Arriving Soon</span>
            </div>
          </div>
          
          <div className="rkpi-card border-red">
            <div className="rkpi-icon-circle red-circle">
              <span className="icon">📄</span>
            </div>
            <div className="rkpi-data">
              <p>Critical</p>
              <h3>5</h3>
              <span className="rkpi-trend trend-red">+6 from yesterday</span>
            </div>
          </div>

          <div className="rkpi-card border-orange">
            <div className="rkpi-icon-circle orange-circle">
              <span className="icon">🦜</span>
            </div>
            <div className="rkpi-data">
              <p>Ready fo Release</p>
              <h3>8</h3>
              <span className="rkpi-trend trend-orange">+3 Needs Response</span>
            </div>
          </div>

          <div className="rkpi-card border-yellow">
            <div className="rkpi-icon-circle yellow-circle">
              <span className="icon">❓</span>
            </div>
            <div className="rkpi-data">
              <p>Info Pending</p>
              <h3>6</h3>
              <span className="rkpi-trend trend-yellow">+3 Needs Response</span>
            </div>
          </div>
        </div>

        <div className="rehab-table-container">
          <div className="table-header-row">
            <h3>Rehabilitation Cases</h3>
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="Search this list..." />
            </div>
          </div>

          <div className="rehab-table-wrapper">
             <div className="rtable-header">
               <div className="rcol-animal">Animal</div>
               <div className="rcol-assigned">Assigned</div>
               <div className="rcol-enclosure">Enclosure</div>
               <div className="rcol-release">Release Date</div>
               <div className="rcol-status">Status</div>
               <div className="rcol-days">Days in Care</div>
               <div className="rcol-actions">Actions</div>
             </div>

             <div className="rtable-body">
               {mockRehabCases.map((item, index) => (
                 <div className="rtable-row" key={index}>
                   <div className="rcol-animal">
                     <img src={item.img} alt={item.animal} className="animal-thumb" onError={(e) => e.target.src='/mock-profile.jpg'} />
                     <div className="animal-info">
                       <strong>{item.animal}</strong>
                       <span>{item.species}</span>
                     </div>
                   </div>
                   <div className="rcol-assigned fw-600">{item.assignee}</div>
                   <div className="rcol-enclosure fw-600">{item.enclosure}</div>
                   <div className="rcol-release fw-600">{item.release}</div>
                   <div className="rcol-status fw-600">{item.status}</div>
                   <div className="rcol-days fw-600">{item.days}</div>
                   <div className="rcol-actions">
                     <button className="rehab-action-btn" onClick={onNavigateCaseDetails}>
                       <span className="icon">📊</span>
                       Open<br/>Case Details
                     </button>
                     <button className="rehab-action-btn">
                       <span className="icon">⊕</span>
                       Add to<br/>information
                     </button>
                   </div>
                 </div>
               ))}
             </div>
          </div>
          
          <div className="pagination">
            <span>Showing {mockRehabCases.length} of 28 Cases</span>
            <div className="page-controls">
              <button disabled>&lt;</button>
              <button className="active">1</button>
              <button>2</button>
              <button>3</button>
              <button>4</button>
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