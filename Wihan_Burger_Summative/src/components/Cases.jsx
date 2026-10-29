import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import './Cases.css';

export default function Cases({
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
  
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [calendarView, setCalendarView] = useState(new Date(2026, 4, 1));
  const [startDate, setStartDate] = useState(new Date(2026, 4, 12));
  const [endDate, setEndDate] = useState(new Date(2026, 4, 18));
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
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const token = localStorage.getItem('spottybird_token');
      const response = await fetch('http://127.0.0.1:5000/api/cases', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setCases(data);
    } catch (error) {
      console.error('Error fetching cases:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async (e, id) => {
    e.stopPropagation();
    updateCaseState(id, 'accepted', 'open', fullName);
  };

  const handleDeny = async (e, id) => {
    e.stopPropagation();
    updateCaseState(id, 'denied', 'refer', 'Unassigned');
  };

  const updateCaseState = async (id, newState, newReport, newAssignee) => {
    try {
      const token = localStorage.getItem('spottybird_token');
      setCases(cases.map(c =>
        c._id === id
          ? { ...c, state: newState, report: newReport, assignee: newAssignee, status: newState === 'accepted' ? 'Rehabilitation' : 'Assessment' }
          : c
      ));

      await fetch(`http://127.0.0.1:5000/api/cases/${id}/state`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          state: newState,
          report: newReport,
          assignee: newAssignee,
          status: newState === 'accepted' ? 'Rehabilitation' : 'Assessment'
        })
      });
    } catch (error) {
      console.error('Failed to update case:', error);
      fetchCases();
    }
  };

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
      if (endDate && thisDate.getTime() === endDate.getTime()) className += " range-end";
      if (startDate && endDate && thisDate > startDate && thisDate < endDate) className += " range";

      days.push(<div key={i} className={className} onClick={() => handleDayClick(i)}>{i}</div>);
    }
    return days;
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatButtonText = () => {
    if (startDate && endDate) return `${formatDate(startDate).slice(0, 6)} - ${formatDate(endDate).slice(0, 6)}`;
    if (startDate) return `${formatDate(startDate).slice(0, 6)} - Select End`;
    return "Select Date Range";
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'Just now';
    return new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
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
            <h2 className="page-title">Cases List</h2>
            <p className="page-subtitle">Case identification numbers, locations status and priorities all in one place</p>
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

        <div className="cases-container">
          <div className="filters-row">
            <select><option>Animal Type</option><option>Mammal</option><option>Reptile</option><option>Bird</option></select>
            <select><option>Location</option><option>Centurion</option><option>Midstream</option></select>
            <select><option>Medium</option><option>High</option><option>Critical</option></select>
            <select><option>Status</option><option>Accepted</option><option>Denied</option></select>
            <select><option>Assignee</option><option>{fullName}</option></select>
            
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
               {isLoading ? (
                 <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Loading facility cases...</div>
               ) : cases.length === 0 ? (
                 <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No active cases found in the database.</div>
               ) : (
                 cases.map((caseItem) => (
                   <div className="table-row clickable-row" key={caseItem._id} onClick={() => onNavigateCaseDetails(caseItem._id)}>
                     <div className="col-id fw-600">{caseItem.caseId}</div>
                     <div className="col-animal">{caseItem.animal}</div>
                     <div className="col-location">{caseItem.location}</div>
                     <div className="col-status">
                       <span className={`status-text ${caseItem.status?.toLowerCase().replace(' ', '-')}`}>
                         {caseItem.status}
                       </span>
                     </div>
                     <div className="col-priority">
                       {caseItem.urgency !== '-' && caseItem.urgency !== 'Unassigned' ? (
                         <span className={`priority-pill ${caseItem.urgency.toLowerCase()}`}>
                           {caseItem.urgency}
                         </span>
                       ) : '-'}
                     </div>
                     <div className="col-assignee">{caseItem.assignee}</div>
                     <div className="col-updated">{formatTime(caseItem.updatedAt)}</div>
                     
                     <div className="col-state" onClick={(e) => e.stopPropagation()}>
                       {caseItem.state === 'pending' && (
                         <div className="action-buttons">
                           <button className="btn-accept" onClick={(e) => handleAccept(e, caseItem._id)}>Accept</button>
                           <button className="btn-deny" onClick={(e) => handleDeny(e, caseItem._id)}>Deny</button>
                         </div>
                       )}
                     </div>
                     
                     <div className="col-report" onClick={(e) => e.stopPropagation()}>
                       <button className={`report-btn ${caseItem.report}`}>
                         {caseItem.report === 'pending' ? 'State Pending' : caseItem.report === 'open' ? 'Open Report' : 'Refer Case'}
                       </button>
                     </div>
                   </div>
                 ))
               )}
             </div>
          </div>
          
          <div className="pagination">
            <span>Showing {cases.length} Cases</span>
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