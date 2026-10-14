import React, { useState } from 'react';
import './Dashboard.css';
import './Volunteers.css';

export default function Volunteers({ onLogout, onNavigateProfile, onNavigateDashboard, onNavigateCases, onNavigateAdmissions, onNavigateRehabilitation, onNavigateAllRecords }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const scheduleData = [
    {
      period: 'Morning',
      time: '08:00-12:00',
      days: [
        { type: 'assigned', task: 'Wildlife Feeding', person: 'K. Schmidt', avatar: '/mock-profile.jpg' },
        { type: 'open' },
        { type: 'assigned', task: 'Wildlife Feeding', person: 'K. Schmidt', avatar: '/mock-profile.jpg' },
        { type: 'assigned', task: 'Rehab Enclosure', person: 'K. Schmidt', avatar: '/mock-profile.jpg' },
        { type: 'open' },
        { type: 'assigned', task: 'Wildlife Feeding', person: 'K. Schmidt', avatar: '/mock-profile.jpg' },
        { type: 'open' }
      ]
    },
    {
      period: 'Afternoon',
      time: '12:00-16:00',
      days: [
        { type: 'assigned', task: 'Transport Run', person: 'K. Schmidt', avatar: '/mock-profile.jpg', extra: '1 / 2' },
        { type: 'assigned', task: 'Rehab Enclosure', person: 'K. Schmidt', avatar: '/mock-profile.jpg' },
        { type: 'open' },
        { type: 'assigned', task: 'Visitor Desk', person: 'K. Schmidt', avatar: '/mock-profile.jpg' },
        { type: 'assigned', task: 'Transport Run', person: 'K. Schmidt', avatar: '/mock-profile.jpg' },
        { type: 'open' },
        { type: 'assigned', task: 'Visitor Desk', person: 'K. Schmidt', avatar: '/mock-profile.jpg' }
      ]
    },
    {
      period: 'Evening',
      time: '16:00-20:00',
      days: [
        { type: 'open' },
        { type: 'assigned', task: 'Vet Support', person: 'K. Schmidt', avatar: '/mock-profile.jpg' },
        { type: 'open' },
        { type: 'assigned', task: 'Rehab Enclosure', person: 'K. Schmidt', avatar: '/mock-profile.jpg' },
        { type: 'open' },
        { type: 'assigned', task: 'Vet Support', person: 'K. Schmidt', avatar: '/mock-profile.jpg' },
        { type: 'open' }
      ]
    }
  ];

  const peopleData = [
    { name: 'Sarah J.', role: 'Wildlife Carer', status: 'Available', time: '08:00-14:00', initials: 'SJ' },
    { name: 'Liam P.', role: 'Driver', status: 'Working', time: 'Until 16:00', initials: 'LP' },
    { name: 'Tahlia M.', role: 'Rehab Assistant', status: 'Available', time: 'After 12:00', initials: 'TM' },
    { name: 'Dr. Keira B.', role: 'Vet Support', status: 'Away', time: '', initials: 'KB' },
    { name: 'Maya K.', role: 'Visitor Coordinator', status: 'Working', time: 'Until 17:00', initials: 'MK' },
    { name: 'James T.', role: 'General Support', status: 'Available', time: 'All day', initials: 'JT' }
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
            <li onClick={onNavigateAllRecords} style={{ cursor: 'pointer' }}><span className="icon">📄</span> {isSidebarOpen && 'All Records'}</li>
            <li className="active"><span className="icon">👤</span> {isSidebarOpen && 'Volunteers'}</li>
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
            <h2 className="page-title">Volunteers & Schedule</h2>
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
          <span onClick={onNavigateDashboard}>Dashboard</span> / <strong>Volunteers</strong>
        </div>

        <div className="vol-kpi-grid">
          <div className="vkpi-card border-green">
            <div className="vkpi-icon-circle green-circle">
              <span className="icon">◎</span>
            </div>
            <div className="vkpi-data">
              <h3>32</h3>
              <p>Scheduled</p>
              <span>People assigned this week</span>
            </div>
          </div>
          
          <div className="vkpi-card border-orange">
            <div className="vkpi-icon-circle orange-circle">
              <span className="icon">≡</span>
            </div>
            <div className="vkpi-data">
              <h3>8</h3>
              <p>Open Shifts</p>
              <span>Still need volunteers</span>
            </div>
          </div>

          <div className="vkpi-card border-blue">
            <div className="vkpi-icon-circle blue-circle">
              <span className="icon">👤</span>
            </div>
            <div className="vkpi-data">
              <h3>14</h3>
              <p>Available today</p>
              <span>Need to Assign</span>
            </div>
          </div>
        </div>

        <div className="vol-layout-split">
          
          <div className="schedule-main">
            <div className="schedule-toolbar">
              <select className="select-dark"><option>July 2025</option></select>
              <select className="select-light"><option>Week</option></select>
              <select className="select-light"><option>All roles</option></select>
              <select className="select-light"><option>All locations</option></select>
              <button className="btn-create-shift">+ Create shift</button>
            </div>

            <div className="schedule-grid-container">
              <div className="schedule-header-row">
                <div className="time-col"></div>
                <div className="day-col">Mon 12</div>
                <div className="day-col">Tue 13</div>
                <div className="day-col">Wed 14</div>
                <div className="day-col">Thu 15</div>
                <div className="day-col">Fri 16</div>
                <div className="day-col">Sat 17</div>
                <div className="day-col">Sun 18</div>
              </div>

              {scheduleData.map((row, rowIndex) => (
                <div className="schedule-data-row" key={rowIndex}>
                  <div className="time-col">
                    <strong>{row.period}</strong>
                    <span>{row.time}</span>
                  </div>
                  {row.days.map((day, dayIndex) => (
                    <div className="shift-cell" key={dayIndex}>
                      {day.type === 'assigned' ? (
                        <div className="shift-card assigned">
                          <div className="shift-card-header">
                            <span className="person-name">{day.person}</span>
                            <strong>{day.task}</strong>
                            <span>{row.time}</span>
                          </div>
                          <div className="shift-card-footer">
                            <img src={day.avatar} alt={day.person} className="shift-avatar" />
                            {day.extra && <span className="shift-extra">{day.extra}</span>}
                          </div>
                        </div>
                      ) : (
                        <div className="shift-card open">
                          <div className="shift-card-header">
                            <span>Open shift</span>
                            <span>{row.time}</span>
                          </div>
                          <button className="btn-assign">+ Assign</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="schedule-legend">
              <span className="legend-item"><span className="legend-box green"></span> Assigned</span>
              <span className="legend-item"><span className="legend-box dashed"></span> Open shift</span>
            </div>
          </div>

          <div className="people-sidebar">
            <div className="people-header">
              <h3>People</h3>
              <button className="btn-add-person">⊕ Add Person</button>
            </div>

            <div className="date-picker-wrapper full-width">
              <div className="date-pseudo-input" onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
                <span>Tuesday, 13 May</span>
              </div>
              
              {isCalendarOpen && (
                <div className="calendar-popup full-width-popup">
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

            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="Search People" />
            </div>

            <div className="people-tabs">
              <button className="active">All</button>
              <button>Available</button>
              <button>Working</button>
              <button>Away</button>
            </div>

            <div className="people-list">
              {peopleData.map((person, index) => (
                <div className="person-row" key={index}>
                  <div className="person-initials">{person.initials}</div>
                  <div className="person-info">
                    <strong>{person.name}</strong>
                    <span>{person.role}</span>
                  </div>
                  <div className="person-status">
                    <span className={`status-badge ${person.status.toLowerCase()}`}>{person.status}</span>
                    <span className="status-time">{person.time}</span>
                  </div>
                  <div className="person-chevron">&gt;</div>
                </div>
              ))}
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