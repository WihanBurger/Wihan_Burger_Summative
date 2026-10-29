import React, { useState, useEffect } from 'react';
import './Dashboard.css';

export default function Dashboard({
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
  const [timeFilter, setTimeFilter] = useState('30');
  
  const [wildlifeCases, setWildlifeCases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const userName = currentUser?.name || currentUser?.username || currentUser?.email || 'Wildlife Volunteer';
  const userRole = currentUser?.role || 'Staff Member';

  const getInitials = (name) => {
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name ? name.substring(0, 2).toUpperCase() : 'WV';
  };

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const token = localStorage.getItem('spottybird_token');
        const response = await fetch('http://127.0.0.1:5000/api/cases', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setWildlifeCases(data);
        setIsLoading(false);
      } catch (error) {
        setFetchError(error.message);
        setIsLoading(false);
      }
    };

    getDashboardData();
  }, []);

  const filteredCases = wildlifeCases.filter(c => {
    if (timeFilter === 'all') return true;
    const admittedDate = new Date(c.createdAt || c.dateAdmitted);
    const diffTime = Math.abs(new Date() - admittedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= parseInt(timeFilter);
  });

  const totalAdmissions = filteredCases.length;
  const criticalCases = filteredCases.filter(c => c.urgency === 'Critical' || c.urgency === 'High').length;
  const pendingCases = filteredCases.filter(c => c.state === 'pending').length;
  const inRehabCount = filteredCases.filter(c => c.status === 'Rehabilitation').length;

  const stages = { new: 0, assess: 0, inCare: 0, ready: 0, closed: 0 };
  const types = { mammals: 0, birds: 0, reptiles: 0, others: 0 };
  const breakdown = { released: 0, transferred: 0, inRehab: 0, other: 0 };

  filteredCases.forEach(c => {
    const status = (c.status || '').toLowerCase();
    const animal = (c.animal || '').toLowerCase();
    const state = (c.state || '').toLowerCase();

    if (state === 'pending') stages.new++;
    else if (status.includes('assess') || state === 'denied') stages.assess++;
    else if (status.includes('rehab')) stages.inCare++;
    else if (status.includes('ready')) stages.ready++;
    else if (status.includes('releas') || status.includes('clos')) stages.closed++;
    else stages.new++;

    if (animal.includes('mammal')) types.mammals++;
    else if (animal.includes('bird')) types.birds++;
    else if (animal.includes('reptile')) types.reptiles++;
    else types.others++;

    if (status.includes('releas')) breakdown.released++;
    else if (status.includes('transfer')) breakdown.transferred++;
    else if (status.includes('rehab')) breakdown.inRehab++;
    else breakdown.other++;
  });

  const maxStage = Math.max(stages.new, stages.assess, stages.inCare, stages.ready, stages.closed) || 1;
  const stageHeights = {
    new: (stages.new / maxStage) * 100,
    assess: (stages.assess / maxStage) * 100,
    inCare: (stages.inCare / maxStage) * 100,
    ready: (stages.ready / maxStage) * 100,
    closed: (stages.closed / maxStage) * 100,
  };

  const totalTypes = types.mammals + types.birds + types.reptiles + types.others || 1;
  const typePcts = {
    mammals: Math.round((types.mammals / totalTypes) * 100),
    birds: Math.round((types.birds / totalTypes) * 100),
    reptiles: Math.round((types.reptiles / totalTypes) * 100),
    others: Math.round((types.others / totalTypes) * 100),
  };

  const maxBreakdown = Math.max(breakdown.released, breakdown.transferred, breakdown.inRehab, breakdown.other) || 1;
  const bdWidths = {
    released: (breakdown.released / maxBreakdown) * 100,
    transferred: (breakdown.transferred / maxBreakdown) * 100,
    inRehab: (breakdown.inRehab / maxBreakdown) * 100,
    other: (breakdown.other / maxBreakdown) * 100,
  };

  const monthCounts = Array(6).fill(0);
  const monthLabels = [];
  const today = new Date();

  for (let i = 5; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    monthLabels.push(d.toLocaleString('default', { month: 'short' }));
  }

  filteredCases.forEach(c => {
    const d = new Date(c.createdAt || c.dateAdmitted || new Date());
    const monthDiff = (today.getFullYear() - d.getFullYear()) * 12 + (today.getMonth() - d.getMonth());
    if (monthDiff >= 0 && monthDiff < 6) {
      monthCounts[5 - monthDiff]++;
    }
  });

  const maxMonthVal = Math.max(...monthCounts, 5);

  const linePath = monthCounts.map((count, index) => {
    const x = index * 80;
    const y = 95 - ((count / maxMonthVal) * 90);
    return `${index === 0 ? 'M' : 'L'}${x},${y}`;
  }).join(' ');


  if (isLoading) {
    return <div className="page-transition loading-screen">Loading dashboard analytics...</div>;
  }

  return (
    <div className="dashboard-wrapper page-transition">
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
            <li className="active" onClick={onNavigateDashboard} style={{ cursor: 'pointer' }}><span className="icon">🏠</span> {isSidebarOpen && 'Dashboard'}</li>
            <li onClick={onNavigateCases} style={{ cursor: 'pointer' }}><span className="icon">📁</span> {isSidebarOpen && 'Cases'}</li>
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
            <h2 className="page-title">Analytics & Insights</h2>
            <p className="page-subtitle">Admissions, rehabilitation performance and case outcomes at a glance.</p>
            <div className="filters">
              <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="180">Last 6 Months</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>
          
          <div className="header-actions">
            <div className="notification-bell">
              🔔 <span className="badge">1</span>
            </div>

            <div className="profile-menu-pill" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
              <div className="profile-pill-avatar">{getInitials(userName)}</div>
              <div className="profile-pill-info">
                <strong>{userName}</strong>
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

        {fetchError && <div className="error-banner">Data Sync Error: {fetchError}</div>}

        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-icon new">📄</div>
            <div className="kpi-data">
              <p>Total Admissions</p>
              <h3>{totalAdmissions}</h3>
              <span className="trend positive">Live DB Connection</span>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon urgent">❗</div>
            <div className="kpi-data">
              <p>Urgent Cases</p>
              <h3>{criticalCases}</h3>
              <span className="trend neutral">Require Attention</span>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon pending">❓</div>
            <div className="kpi-data">
              <p>Info Pending</p>
              <h3>{pendingCases}</h3>
              <span className="trend warning">Needs Response</span>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon rehab">🛡️</div>
            <div className="kpi-data">
              <p>In Rehabilitation</p>
              <h3>{inRehabCount}</h3>
              <span className="trend positive">Active Care</span>
            </div>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h3>Cases by workflow stage</h3>
            <p className="chart-sub">Current distribution across the case lifecycle</p>
            <div className="chart-wrapper">
              <div className="y-axis">
                <span>{maxStage}</span>
                <span>{Math.round(maxStage * 0.66)}</span>
                <span>{Math.round(maxStage * 0.33)}</span>
                <span>0</span>
              </div>
              <div className="chart-content-column">
                <div className="chart-area grid-bg bar-chart">
                  <div className="bar-wrapper"><div className="bar-3d style-1" style={{height: `${stageHeights.new}%`}}></div></div>
                  <div className="bar-wrapper"><div className="bar-3d style-2" style={{height: `${stageHeights.assess}%`}}></div></div>
                  <div className="bar-wrapper"><div className="bar-3d style-3" style={{height: `${stageHeights.inCare}%`}}></div></div>
                  <div className="bar-wrapper"><div className="bar-3d style-4" style={{height: `${stageHeights.ready}%`}}></div></div>
                  <div className="bar-wrapper"><div className="bar-3d style-5" style={{height: `${stageHeights.closed}%`}}></div></div>
                </div>
                <div className="x-axis">
                  <span>New</span>
                  <span>Assess</span>
                  <span>In care</span>
                  <span>Ready</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="chart-card">
            <h3>Animal Types</h3>
            <p className="chart-sub">Total Percentage of animal types</p>
            <div className="donut-container">
              <div className="donut-3d">
                <div className="donut-hole">
                  <strong>{typePcts.mammals}%</strong>
                  <span>mammals</span>
                </div>
              </div>
              <div className="donut-legend">
                <div className="legend-item"><span className="dot dot-1"></span> Mammals <strong>{typePcts.mammals}%</strong></div>
                <div className="legend-item"><span className="dot dot-2"></span> Birds <strong>{typePcts.birds}%</strong></div>
                <div className="legend-item"><span className="dot dot-3"></span> Reptiles <strong>{typePcts.reptiles}%</strong></div>
                <div className="legend-item"><span className="dot dot-4"></span> Others <strong>{typePcts.others}%</strong></div>
              </div>
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-header-flex">
              <div>
                <h3>Admissions History</h3>
                <p className="chart-sub">Monthly dynamic movement over the last 6 months</p>
              </div>
            </div>
            <div className="chart-wrapper">
              <div className="y-axis">
                <span>{maxMonthVal}</span>
                <span>{Math.round(maxMonthVal * 0.66)}</span>
                <span>{Math.round(maxMonthVal * 0.33)}</span>
                <span>0</span>
              </div>
              <div className="chart-content-column">
                <div className="chart-area grid-bg line-chart">
                  <svg viewBox="0 0 400 100" className="svg-lines" preserveAspectRatio="none">
                    <defs>
                      <filter id="shadow">
                        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#102a1d" floodOpacity="0.4"/>
                      </filter>
                    </defs>
                    <path d={linePath} fill="none" stroke="#4a7c59" strokeWidth="4" filter="url(#shadow)" vectorEffect="non-scaling-stroke"/>
                  </svg>
                </div>
                <div className="x-axis">
                  {monthLabels.map(label => (
                    <span key={label}>{label}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="chart-card">
            <h3>Species breakdown</h3>
            <p className="chart-sub">Active cases by animal group</p>
            <div className="chart-area horizontal-bar-chart">
              <div className="h-bar-row">
                <span>Released</span>
                <div className="h-bar-track"><div className="h-bar-3d style-1" style={{width: `${bdWidths.released}%`}}></div></div>
                <strong>{breakdown.released}</strong>
              </div>
              <div className="h-bar-row">
                <span>Transferred</span>
                <div className="h-bar-track"><div className="h-bar-3d style-2" style={{width: `${bdWidths.transferred}%`}}></div></div>
                <strong>{breakdown.transferred}</strong>
              </div>
              <div className="h-bar-row">
                <span>In Rehab</span>
                <div className="h-bar-track"><div className="h-bar-3d style-3" style={{width: `${bdWidths.inRehab}%`}}></div></div>
                <strong>{breakdown.inRehab}</strong>
              </div>
              <div className="h-bar-row">
                <span>Other</span>
                <div className="h-bar-track"><div className="h-bar-3d style-4" style={{width: `${bdWidths.other}%`}}></div></div>
                <strong>{breakdown.other}</strong>
              </div>
            </div>
          </div>

        </div>
      </main>

      {isLogoutModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-avatar initials-only">
              {getInitials(userName)}
            </div>
            <h3>{userName}</h3>
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