import React, { useState } from 'react';
import './Dashboard.css';
import './Volunteers.css';

export default function Volunteers({ 
  currentUser,
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

  const [activePeopleTab, setActivePeopleTab] = useState('All');
  const [peopleSearch, setPeopleSearch] = useState('');

  const months = [
    'January 2026', 'February 2026', 'March 2026', 'April 2026',
    'May 2026', 'June 2026', 'July 2026', 'August 2026',
    'September 2026', 'October 2026', 'November 2026', 'December 2026'
  ];
  const [selectedMonth, setSelectedMonth] = useState('May 2026');
  const [scheduleRoleFilter, setScheduleRoleFilter] = useState('All roles');
  const [scheduleLocationFilter, setScheduleLocationFilter] = useState('All locations');

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [sidebarDate, setSidebarDate] = useState(new Date(2026, 4, 12));
  const [calendarView, setCalendarView] = useState(new Date(2026, 4, 1));

  const [assignModal, setAssignModal] = useState({ isOpen: false, rowIndex: null, dayIndex: null, time: '' });
  const [isAddPersonModalOpen, setIsAddPersonModalOpen] = useState(false);
  const [newPerson, setNewPerson] = useState({ name: '', role: 'General Support' });

  const [isCreateShiftModalOpen, setIsCreateShiftModalOpen] = useState(false);
  const [newShift, setNewShift] = useState({ period: 'Morning', dayIndex: '0' });

  const actualUser = currentUser?.user || currentUser || {};
  const fullName = actualUser.name || 'Jeffry Burger';
  const userRole = actualUser.role || 'Administrator';

  const getInitials = (name) => {
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name ? name.substring(0, 2).toUpperCase() : 'JB';
  };

  const [peopleList, setPeopleList] = useState([
    { id: 1, name: 'Sarah J.', role: 'Wildlife Carer', status: 'Available', time: '08:00-14:00', initials: 'SJ' },
    { id: 2, name: 'Liam P.', role: 'Driver', status: 'Working', time: 'Until 16:00', initials: 'LP' },
    { id: 3, name: 'Tahlia M.', role: 'Rehab Assistant', status: 'Available', time: 'After 12:00', initials: 'TM' },
    { id: 4, name: 'Dr. Keira B.', role: 'Vet Support', status: 'Away', time: '', initials: 'KB' },
    { id: 5, name: 'Maya K.', role: 'Visitor Coordinator', status: 'Working', time: 'Until 17:00', initials: 'MK' },
    { id: 6, name: 'James T.', role: 'General Support', status: 'Available', time: 'All day', initials: 'JT' }
  ]);

  const [scheduleData, setScheduleData] = useState([
    {
      period: 'Morning',
      time: '08:00-12:00',
      days: [
        { type: 'assigned', task: 'Wildlife Feeding', person: 'K. Schmidt', avatar: '/mock-profile.jpg' },
        { type: 'open' },
        { type: 'assigned', task: 'Wildlife Feeding', person: 'Sarah J.', avatar: '/mock-profile.jpg' },
        { type: 'assigned', task: 'Rehab Enclosure', person: 'Tahlia M.', avatar: '/mock-profile.jpg' },
        { type: 'open' },
        { type: 'assigned', task: 'Wildlife Feeding', person: 'Liam P.', avatar: '/mock-profile.jpg' },
        { type: 'open' }
      ]
    },
    {
      period: 'Afternoon',
      time: '12:00-16:00',
      days: [
        { type: 'assigned', task: 'Transport Run', person: 'Liam P.', avatar: '/mock-profile.jpg', extra: '1 / 2' },
        { type: 'assigned', task: 'Rehab Enclosure', person: 'Tahlia M.', avatar: '/mock-profile.jpg' },
        { type: 'open' },
        { type: 'assigned', task: 'Visitor Desk', person: 'Maya K.', avatar: '/mock-profile.jpg' },
        { type: 'assigned', task: 'Transport Run', person: 'Liam P.', avatar: '/mock-profile.jpg' },
        { type: 'open' },
        { type: 'assigned', task: 'Visitor Desk', person: 'Maya K.', avatar: '/mock-profile.jpg' }
      ]
    },
    {
      period: 'Evening',
      time: '16:00-20:00',
      days: [
        { type: 'open' },
        { type: 'assigned', task: 'Vet Support', person: 'Dr. Keira B.', avatar: '/mock-profile.jpg' },
        { type: 'open' },
        { type: 'assigned', task: 'Rehab Enclosure', person: 'Sarah J.', avatar: '/mock-profile.jpg' },
        { type: 'open' },
        { type: 'assigned', task: 'Vet Support', person: 'Dr. Keira B.', avatar: '/mock-profile.jpg' },
        { type: 'open' }
      ]
    }
  ]);

  const filteredPeople = peopleList.filter(person => {
    const matchesTab = activePeopleTab === 'All' || person.status === activePeopleTab;
    const matchesSearch = person.name.toLowerCase().includes(peopleSearch.toLowerCase()) || 
                          person.role.toLowerCase().includes(peopleSearch.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setScheduleData(prev => prev.map(row => {
      const shiftedDays = [...row.days.slice(1), row.days[0]]; 
      return { ...row, days: shiftedDays };
    }));
  };

  const handleAddPerson = () => {
    if (!newPerson.name) return;
    const newEntry = {
      id: Date.now(),
      name: newPerson.name,
      role: newPerson.role,
      status: 'Available',
      time: 'All day',
      initials: getInitials(newPerson.name)
    };
    setPeopleList([newEntry, ...peopleList]);
    setNewPerson({ name: '', role: 'General Support' });
    setIsAddPersonModalOpen(false);
  };

  const handleOpenAssignModal = (rowIndex, dayIndex, time) => {
    setAssignModal({ isOpen: true, rowIndex, dayIndex, time });
  };

  const handleAssignShift = (person) => {
    const newSchedule = [...scheduleData];
    newSchedule[assignModal.rowIndex].days[assignModal.dayIndex] = {
      type: 'assigned',
      task: person.role, 
      person: person.name,
      avatar: '/mock-profile.jpg' 
    };
    setScheduleData(newSchedule);
    setAssignModal({ isOpen: false, rowIndex: null, dayIndex: null, time: '' });
  };

  const handleCreateShift = () => {
    const periodIndex = scheduleData.findIndex(s => s.period === newShift.period);
    if (periodIndex !== -1) {
      const newSchedule = [...scheduleData];
      newSchedule[periodIndex].days[parseInt(newShift.dayIndex)] = { type: 'open' };
      setScheduleData(newSchedule);
    }
    setIsCreateShiftModalOpen(false);
    setNewShift({ period: 'Morning', dayIndex: '0' });
  };

  const nextMonth = (e) => { e.stopPropagation(); setCalendarView(new Date(calendarView.getFullYear(), calendarView.getMonth() + 1, 1)); };
  const prevMonth = (e) => { e.stopPropagation(); setCalendarView(new Date(calendarView.getFullYear(), calendarView.getMonth() - 1, 1)); };

  const handleDayClick = (day) => {
    setSidebarDate(new Date(calendarView.getFullYear(), calendarView.getMonth(), day));
    setIsCalendarOpen(false);
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
      if (
        sidebarDate.getDate() === i && 
        sidebarDate.getMonth() === month && 
        sidebarDate.getFullYear() === year
      ) {
        className += " range-start range-end";
      }

      days.push(<div key={`day-${i}`} className={className} onClick={() => handleDayClick(i)}>{i}</div>);
    }
    return days;
  };

  const formatSidebarDateDisplay = (date) => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${dayNames[date.getDay()]} ${date.getDate()}, ${monthNames[date.getMonth()]}`;
  };

  const monthIndex = months.indexOf(selectedMonth);
  const startDate = (monthIndex * 2 + 5) % 25 + 1; 
  const dynamicWeekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => `${day} ${startDate + i}`);

  const scheduledCount = scheduleData.reduce((acc, row) => acc + row.days.filter(d => d.type === 'assigned').length, 0);
  const openCount = scheduleData.reduce((acc, row) => acc + row.days.filter(d => d.type === 'open').length, 0);
  const availableCount = peopleList.filter(p => p.status === 'Available').length;

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
            <li className="active" onClick={onNavigateVolunteers} style={{ cursor: 'pointer' }}><span className="icon">👤</span> {isSidebarOpen && 'Volunteers'}</li>
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
            <p className="page-subtitle">Manage facility staffing, tasks and availability</p>
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
          <span onClick={onNavigateDashboard}>Dashboard</span> / <strong>Volunteers</strong>
        </div>

        <div className="vol-kpi-grid">
          <div className="vkpi-card border-green">
            <div className="vkpi-icon-circle green-circle">
              <span className="icon">◎</span>
            </div>
            <div className="vkpi-data">
              <h3>{scheduledCount}</h3>
              <p>Scheduled</p>
              <span>Shifts assigned this week</span>
            </div>
          </div>
          
          <div className="vkpi-card border-orange">
            <div className="vkpi-icon-circle orange-circle">
              <span className="icon">≡</span>
            </div>
            <div className="vkpi-data">
              <h3>{openCount}</h3>
              <p>Open Shifts</p>
              <span>Still need volunteers</span>
            </div>
          </div>

          <div className="vkpi-card border-blue">
            <div className="vkpi-icon-circle blue-circle">
              <span className="icon">👤</span>
            </div>
            <div className="vkpi-data">
              <h3>{availableCount}</h3>
              <p>Available</p>
              <span>People ready to assign</span>
            </div>
          </div>
        </div>

        <div className="vol-layout-split">
          
          <div className="schedule-main">
            <div className="schedule-toolbar">
              <select 
                className="select-dark"
                value={selectedMonth}
                onChange={handleMonthChange}
              >
                {months.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <select className="select-light">
                <option>Week</option>
                <option>Month</option>
              </select>
              <select 
                className="select-light"
                value={scheduleRoleFilter}
                onChange={(e) => setScheduleRoleFilter(e.target.value)}
              >
                <option value="All roles">All roles</option>
                <option value="Wildlife Carer">Wildlife Carer</option>
                <option value="Vet Support">Vet Support</option>
                <option value="Rehab Assistant">Rehab Assistant</option>
                <option value="Driver">Driver</option>
              </select>
              <select 
                className="select-light"
                value={scheduleLocationFilter}
                onChange={(e) => setScheduleLocationFilter(e.target.value)}
              >
                <option value="All locations">All locations</option>
                <option value="Main Clinic">Main Clinic</option>
                <option value="Rehab Enclosures">Rehab Enclosures</option>
                <option value="Transport">Transport</option>
              </select>
              <button className="btn-create-shift" onClick={() => setIsCreateShiftModalOpen(true)}>+ Create shift</button>
            </div>

            <div className="schedule-grid-container">
              <div className="schedule-header-row">
                <div className="time-col"></div>
                {dynamicWeekDays.map(day => (
                  <div className="day-col" key={day}>{day}</div>
                ))}
              </div>

              {scheduleData.map((row, rowIndex) => (
                <div className="schedule-data-row" key={rowIndex}>
                  <div className="time-col">
                    <strong>{row.period}</strong>
                    <span>{row.time}</span>
                  </div>
                  {row.days.map((day, dayIndex) => {
                    const isHiddenByFilter = scheduleRoleFilter !== 'All roles' && day.type === 'assigned' && day.task !== scheduleRoleFilter;
                    
                    return (
                      <div className="shift-cell" key={dayIndex} style={{ opacity: isHiddenByFilter ? 0.3 : 1 }}>
                        {day.type === 'assigned' ? (
                          <div className="shift-card assigned">
                            <div className="shift-card-header">
                              <span className="person-name">{day.person}</span>
                              <strong>{day.task}</strong>
                              <span>{row.time}</span>
                            </div>
                            <div className="shift-card-footer">
                              <div className="shift-avatar fallback-avatar">{getInitials(day.person)}</div>
                              {day.extra && <span className="shift-extra">{day.extra}</span>}
                            </div>
                          </div>
                        ) : (
                          <div className="shift-card open">
                            <div className="shift-card-header">
                              <span>Open shift</span>
                              <span>{row.time}</span>
                            </div>
                            <button className="btn-assign" onClick={() => handleOpenAssignModal(rowIndex, dayIndex, row.time)}>+ Assign</button>
                          </div>
                        )}
                      </div>
                    );
                  })}
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
              <button className="btn-add-person" onClick={() => setIsAddPersonModalOpen(true)}>⊕ Add Person</button>
            </div>

            <div className="date-picker-wrapper full-width">
              <div className="date-pseudo-input" onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
                <span>{formatSidebarDateDisplay(sidebarDate)}</span>
              </div>
              
              {isCalendarOpen && (
                <div className="calendar-popup full-width-popup">
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

            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search by name or role" 
                value={peopleSearch}
                onChange={(e) => setPeopleSearch(e.target.value)}
              />
            </div>

            <div className="people-tabs">
              {['All', 'Available', 'Working', 'Away'].map(tab => (
                <button 
                  key={tab} 
                  className={activePeopleTab === tab ? 'active' : ''}
                  onClick={() => setActivePeopleTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="people-list">
              {filteredPeople.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#666', fontSize: '0.85rem' }}>No personnel match your search.</div>
              ) : (
                filteredPeople.map((person) => (
                  <div className="person-row" key={person.id}>
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
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {isCreateShiftModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content interactive-modal">
            <h3>Create Open Shift</h3>
            <p className="modal-subtext" style={{ marginBottom: '1.5rem' }}>Add a new open slot to the schedule board for volunteers to pick up.</p>
            
            <div className="form-group" style={{ marginBottom: '1rem', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem' }}>Day of the Week</label>
              <select 
                className="modal-input"
                value={newShift.dayIndex}
                onChange={(e) => setNewShift({...newShift, dayIndex: e.target.value})}
              >
                {dynamicWeekDays.map((dayStr, idx) => (
                  <option key={idx} value={idx}>{dayStr}</option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem' }}>Time Period</label>
              <select 
                className="modal-input"
                value={newShift.period}
                onChange={(e) => setNewShift({...newShift, period: e.target.value})}
              >
                <option value="Morning">Morning (08:00 - 12:00)</option>
                <option value="Afternoon">Afternoon (12:00 - 16:00)</option>
                <option value="Evening">Evening (16:00 - 20:00)</option>
              </select>
            </div>

            <div className="modal-actions">
              <button className="btn-solid-green" onClick={handleCreateShift}>Add to Schedule</button>
              <button className="btn-outline" onClick={() => setIsCreateShiftModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {assignModal.isOpen && (
        <div className="modal-overlay">
          <div className="modal-content interactive-modal">
            <h3>Assign Volunteer</h3>
            <p className="modal-subtext" style={{ marginBottom: '1.5rem' }}>Select a person for the {assignModal.time} shift.</p>
            
            <div className="interactive-list">
              {peopleList.filter(p => p.status !== 'Away').map(person => (
                <div className="interactive-list-item" key={person.id} onClick={() => handleAssignShift(person)}>
                  <div className="person-initials">{person.initials}</div>
                  <div className="person-info">
                    <strong>{person.name}</strong>
                    <span>{person.role} • {person.status}</span>
                  </div>
                  <button className="btn-solid-green small-btn">Assign</button>
                </div>
              ))}
            </div>
            
            <div className="modal-actions" style={{ marginTop: '1.5rem' }}>
              <button className="btn-outline full-width" onClick={() => setAssignModal({ isOpen: false, rowIndex: null, dayIndex: null, time: '' })}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {isAddPersonModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content interactive-modal">
            <h3>Add New Person</h3>
            <p className="modal-subtext" style={{ marginBottom: '1.5rem' }}>Quickly add a volunteer to the roster.</p>
            
            <div className="form-group" style={{ marginBottom: '1rem', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem' }}>Full Name</label>
              <input 
                type="text" 
                className="modal-input" 
                placeholder="e.g. John Doe"
                value={newPerson.name}
                onChange={(e) => setNewPerson({...newPerson, name: e.target.value})}
              />
            </div>
            
            <div className="form-group" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem' }}>Primary Role</label>
              <select 
                className="modal-input"
                value={newPerson.role}
                onChange={(e) => setNewPerson({...newPerson, role: e.target.value})}
              >
                <option value="General Support">General Support</option>
                <option value="Wildlife Carer">Wildlife Carer</option>
                <option value="Rehab Assistant">Rehab Assistant</option>
                <option value="Vet Support">Vet Support</option>
                <option value="Driver">Driver</option>
              </select>
            </div>

            <div className="modal-actions">
              <button className="btn-solid-green" onClick={handleAddPerson}>Add Person</button>
              <button className="btn-outline" onClick={() => setIsAddPersonModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

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