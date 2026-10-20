import React, { useState } from 'react';
import './Dashboard.css';
import './AllRecords.css';

export default function AllRecords({ onLogout, onNavigateProfile, onNavigateDashboard, onNavigateCases, onNavigateAdmissions, onNavigateRehabilitation, onNavigateCaseDetails }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const mockRecords = [
    { id: 'SBRC-2025-0187', animal: 'Eastern Rosella', species: 'Platycercus eximius', loc1: 'Rooihuiskraal,', loc2: 'Centurion', outcome: 'Transferred', status: 'Pending', release: '-', updated: '15 min ago' },
    { id: 'SBRC-2025-0186', animal: 'Brush-tailed Possum', species: 'Trichosurus vulpecula', loc1: 'Irene,', loc2: 'Centurion', outcome: '-', status: 'Pending', release: '16 May 2025', updated: '32 min ago' },
    { id: 'SBRC-2025-0185', animal: 'Laughing Kookaburra', species: 'Dacelo novaeguineae', loc1: 'Midstream Estate', loc2: '', outcome: '-', status: 'Pending', release: '-', updated: '11 min ago' },
    { id: 'SBRC-2025-0184', animal: 'Tawny Frogmouth', species: 'Podargus strigoides', loc1: 'Eldoraigne,', loc2: 'Centurion', outcome: 'Released to wild', status: 'Contact Sent', release: '17 May 2025', updated: '1 hr ago' },
    { id: 'SBRC-2025-0187', animal: 'Echidna', species: 'Tachyglossus', loc1: 'Rooihuiskraal,', loc2: 'Centurion', outcome: '-', status: 'Confirmed', release: '-', updated: '15 min ago' },
    { id: 'SBRC-2025-0186', animal: 'Brush-tailed Possum', species: 'Trichosurus vulpecula', loc1: 'Irene,', loc2: 'Centurion', outcome: 'Specialist care', status: 'Closed', release: '15 May 2025', updated: '32 min ago' },
    { id: 'SBRC-2025-0185', animal: 'Laughing Kookaburra', species: 'Dacelo novaeguineae', loc1: 'Midstream Estate', loc2: '', outcome: '-', status: 'Confirmed', release: '13 May 2025', updated: '11 min ago' },
    { id: 'SBRC-2025-0187', animal: 'Eastern Rosella', species: 'Platycercus eximius', loc1: 'Rooihuiskraal,', loc2: 'Centurion', outcome: 'Euthanised', status: 'Pending', release: '-', updated: '15 min ago' },
    { id: 'SBRC-2025-0184', animal: 'Tawny Frogmouth', species: 'Podargus strigoides', loc1: 'Eldoraigne,', loc2: 'Centurion', outcome: 'Released to wild', status: 'Contact Sent', release: '17 May 2025', updated: '1 hr ago' }
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
            <li onClick={onNavigateRehabilitation} style={{ cursor: 'pointer' }}><span className="icon">🌿</span> {isSidebarOpen && 'Rehabilitation'}</li>
            <li className="active"><span className="icon">📄</span> {isSidebarOpen && 'All Records'}</li>
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
            <h2 className="page-title">All Records</h2>
            <p className="page-subtitle">Case identification numbers, locations status and priorities all in one place</p>
          </div>
          
          <div className="header-actions">
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
                <option>Eldoraigne</option>
                <option>Zwartkop</option>
                <option>Irene</option>
                <option>Midstream</option>
                <option>Hennopspark</option>
                <option>Rooihuiskraal</option>
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
                      <div className="day sun">10</div>

                      <div className="day sun">11</div>
                      <div className="day">12</div>
                      <div className="day">13</div>
                      <div className="day">14</div>
                      <div className="day range-start">15</div>
                      <div className="day">16</div>
                      <div className="day">17</div>
                      
                      <div className="day sun">18</div>
                      <div className="day">19</div>
                      <div className="day">20</div>
                      <div className="day">21</div>
                      <div className="day range-start">22</div>
                      <div className="day range">23</div>
                      <div className="day range-end">24</div>
                      
                      <div className="day sun">25</div>
                      <div className="day">26</div>
                      <div className="day">27</div>
                      <div className="day">28</div>
                      <div className="day">29</div>
                      <div className="day range-start">30</div>
                      <div className="day next-month">1</div>
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
               {mockRecords.map((item, index) => (
                 <div className="rectable-row" key={index} onClick={onNavigateCaseDetails}>
                   <div className="reccol-id fw-600">{item.id}</div>
                   <div className="reccol-animal double-line">
                     <strong>{item.animal}</strong>
                     <span>{item.species}</span>
                   </div>
                   <div className="reccol-location double-line">
                     <span>{item.loc1}</span>
                     <span>{item.loc2}</span>
                   </div>
                   <div className="reccol-outcome">{item.outcome}</div>
                   <div className="reccol-status">
                     <span className={`status-pill ${item.status.toLowerCase().replace(' ', '-')}`}>
                       {item.status}
                     </span>
                   </div>
                   <div className="reccol-release">{item.release}</div>
                   <div className="reccol-updated">{item.updated}</div>
                   <div className="reccol-arrow chevron">&gt;</div>
                 </div>
               ))}
             </div>
          </div>
          
          <div className="pagination">
            <span>Showing 9 of 28 Cases</span>
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