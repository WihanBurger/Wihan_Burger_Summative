import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import './Rehabilitation.css';

export default function Rehabilitation({ 
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
  const [rehabCases, setRehabCases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarView, setCalendarView] = useState(new Date()); 
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectionStep, setSelectionStep] = useState('start');

  const actualUser = currentUser?.user || currentUser || {};
  const fullName = actualUser.name || 'Jeffry Burger';
  const userRole = actualUser.role || 'Administrator';

  const getInitials = (name) => {
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name ? name.substring(0, 2).toUpperCase() : 'JB';
  };

  useEffect(() => {
    fetchRehabCases();
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 6);
    setStartDate(start);
    setEndDate(end);
  }, []);

  const fetchRehabCases = async () => {
    try {
      const token = localStorage.getItem('spottybird_token');
      const response = await fetch('http://127.0.0.1:5000/api/cases', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      const activeRehab = data.filter(c => c.status === 'Rehabilitation' || c.state === 'accepted');
      setRehabCases(activeRehab);
    } catch (error) {
      console.error('Error fetching rehab cases:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const criticalCount = rehabCases.filter(c => c.urgency === 'Critical' || c.urgency === 'High').length;
  const inCareCount = rehabCases.length;
  const nextMonth = (e) => { e.stopPropagation(); setCalendarView(new Date(calendarView.getFullYear(), calendarView.getMonth() + 1, 1)); };
  const prevMonth = (e) => { e.stopPropagation(); setCalendarView(new Date(calendarView.getFullYear(), calendarView.getMonth() - 1, 1)); };

  const handleDayClick = (day) => {
    const clickedDate = new Date(calendarView.getFullYear(), calendarView.getMonth(), day);
    if (selectionStep === 'start') {
      setStartDate(clickedDate);
      setEndDate(null);
      setSelectionStep('end');
    } else {
      if (clickedDate < startDate) {
        setStartDate(clickedDate);
        setEndDate(null);
      } else {
        setEndDate(clickedDate);
        setSelectionStep('start');
        setTimeout(() => setIsCalendarOpen(false), 200); 
      }
    }
  };

  const renderCalendarDays = () => {
    const year = calendarView.getFullYear();
    const month = calendarView.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    let days = [];
    for (let i = firstDayIndex; i > 0; i--) {
      days.push(<div key={`prev-${i}`} className="day prev-month">{daysInPrevMonth - i + 1}</div>);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const thisDate = new Date(year, month, i);
      let className = "day";
      if (thisDate.getDay() === 0) className += " sun";
      if (startDate && thisDate.getTime() === startDate.getTime()) className += " range-start";
      if (endDate && thisDate.getTime() === endDate.getTime()) className += " range-end sun-range";
      if (startDate && endDate && thisDate > startDate && thisDate < endDate) className += " range";

      days.push(<div key={i} className={className} onClick={() => handleDayClick(i)}>{i}</div>);
    }
    return days;
  };

  const formatButtonText = () => {
    const formatStr = (d) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    if (startDate && endDate) return `${formatStr(startDate).slice(0,6)} - ${formatStr(endDate).slice(0,6)}`;
    if (startDate) return `${formatStr(startDate).slice(0,6)} - Select End`;
    return "Select Date Range";
  };

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
            <li onClick={onNavigateCases} style={{ cursor: 'pointer' }}><span className="icon">📁</span> {isSidebarOpen && 'Cases'}</li>
            <li onClick={onNavigateAdmissions} style={{ cursor: 'pointer' }}><span className="icon">🏥</span> {isSidebarOpen && 'Admissions'}</li>
            <li className="active" onClick={onNavigateRehabilitation} style={{ cursor: 'pointer' }}><span className="icon">🌿</span> {isSidebarOpen && 'Rehabilitation'}</li>
            <li onClick={onNavigateAllRecords} style={{ cursor: 'pointer' }}><span className="icon">📄</span> {isSidebarOpen && 'All Records'}</li>
            <li onClick={onNavigateVolunteers} style={{ cursor: 'pointer' }}><span className="icon">👤</span> {isSidebarOpen && 'Volunteers'}</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <div>
            <h2 className="page-title">Rehabilitation</h2>
            <p className="page-subtitle">Manage animal recovery, enclosures and release schedules.</p>
          </div>
          
          <div className="header-actions">
             <div className="date-picker-wrapper">
               <div className="date-picker-btn" onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
                <span>📅 {formatButtonText()}</span>
                <span>{isCalendarOpen ? '⌃' : '⌄'}</span>
              </div>
              
              {isCalendarOpen && (
                <div className="calendar-popup">
                  <div className="calendar-header">
                    <span>{calendarView.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</span>
                    <div className="calendar-nav">
                      <button onClick={prevMonth}>&lt;</button>
                      <button onClick={nextMonth}>&gt;</button>
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
                    {renderCalendarDays()}
                  </div>
                </div>
              )}
            </div>
            
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
          <span onClick={onNavigateDashboard}>Dashboard</span> / <strong>Rehabilitation</strong>
        </div>

        <div className="rehab-kpi-grid">
          <div className="rkpi-card border-green">
            <div className="rkpi-icon-circle green-circle"><span className="icon">🚐</span></div>
            <div className="rkpi-data">
              <p>In Care</p>
              <h3>{inCareCount}</h3>
              <span className="rkpi-trend trend-blue">• Active Rehabilitation</span>
            </div>
          </div>
          
          <div className="rkpi-card border-red">
            <div className="rkpi-icon-circle red-circle"><span className="icon">📄</span></div>
            <div className="rkpi-data">
              <p>Critical Priority</p>
              <h3>{criticalCount}</h3>
              <span className="rkpi-trend trend-red">Requires attention</span>
            </div>
          </div>

          <div className="rkpi-card border-orange">
            <div className="rkpi-icon-circle orange-circle"><span className="icon">🦜</span></div>
            <div className="rkpi-data">
              <p>Ready for Release</p>
              <h3>0</h3>
              <span className="rkpi-trend trend-orange">Pending vet clearance</span>
            </div>
          </div>

          <div className="rkpi-card border-yellow">
            <div className="rkpi-icon-circle yellow-circle"><span className="icon">❓</span></div>
            <div className="rkpi-data">
              <p>Info Pending</p>
              <h3>0</h3>
              <span className="rkpi-trend trend-yellow">All systems nominal</span>
            </div>
          </div>
        </div>

        <div className="rehab-table-container">
          <div className="table-header-row">
            <h3>Active Rehabilitation Cases</h3>
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="Search active rehab cases..." />
            </div>
          </div>

          <div className="rehab-table-wrapper">
             <div className="rtable-header">
               <div className="rcol-animal">Animal</div>
               <div className="rcol-assigned">Assigned</div>
               <div className="rcol-enclosure">Enclosure</div>
               <div className="rcol-release">Release Date</div>
               <div className="rcol-status">Urgency</div>
               <div className="rcol-days">Days in Care</div>
               <div className="rcol-actions">Actions</div>
             </div>

             <div className="rtable-body">
               {isLoading ? (
                 <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Loading rehabilitation records...</div>
               ) : rehabCases.length === 0 ? (
                 <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No active cases in rehabilitation.</div>
               ) : (
                 rehabCases.map((item) => (
                   <div className="rtable-row" key={item._id}>
                     <div className="rcol-animal">
                       <img src={item.img || '/bird-mock.jpg'} alt={item.species} className="animal-thumb" />
                       <div className="animal-info">
                         <strong>{item.species || item.animal}</strong>
                         <span>{item.caseId}</span>
                       </div>
                     </div>
                     <div className="rcol-assigned fw-600">{item.assignee}</div>
                     <div className="rcol-enclosure fw-600">Pending Assignment</div>
                     <div className="rcol-release fw-600 text-gray">TBD</div>
                     <div className="rcol-status fw-600">
                       <span className={`priority-pill ${item.urgency?.toLowerCase()}`}>{item.urgency}</span>
                     </div>
                     <div className="rcol-days fw-600">{item.daysInCare || 0}</div>
                     <div className="rcol-actions">
                       <button className="rehab-action-btn" onClick={(e) => { e.stopPropagation(); onNavigateCaseDetails(item._id); }}>
                         <span className="icon">📊</span>
                         Open<br/>Case Details
                       </button>
                     </div>
                   </div>
                 ))
               )}
             </div>
          </div>
          
          <div className="pagination">
            <span>Showing {rehabCases.length} Active Cases</span>
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