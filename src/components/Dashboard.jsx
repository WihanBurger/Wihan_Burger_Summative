import React, { useState } from 'react';
import './Dashboard.css';

export default function Dashboard({ onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

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
            <li className="active"><span className="icon">🏠</span> {isSidebarOpen && 'Dashboard'}</li>
            <li><span className="icon">📁</span> {isSidebarOpen && 'Cases'}</li>
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
            <h2 className="page-title">Analytics & Insights</h2>
            <p className="page-subtitle">Admissions, rehabilitation performance and case outcomes at a glance.</p>
            <div className="filters">
              <select><option>Last 30 Days</option></select>
              <select><option>All Locations</option></select>
            </div>
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
                  <button>View Profile Settings</button>
                  <button onClick={onLogout}>Log Out ⍈</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-icon new">📄</div>
            <div className="kpi-data">
              <p>New Reports</p>
              <h3>18</h3>
              <span className="trend positive">+6 from yesterday</span>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon urgent">❗</div>
            <div className="kpi-data">
              <p>Urgent</p>
              <h3>4</h3>
              <span className="trend neutral">Require Attention</span>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon pending">❓</div>
            <div className="kpi-data">
              <p>Info Pending</p>
              <h3>6</h3>
              <span className="trend warning">+6 Needs Response</span>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon rehab">🛡️</div>
            <div className="kpi-data">
              <p>In Rehabilitation</p>
              <h3>18</h3>
              <span className="trend positive">+5 this week</span>
            </div>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h3>Cases by workflow stage</h3>
            <p className="chart-sub">Current distribution across the case lifecycle</p>
            
            <div className="chart-wrapper">
              <div className="y-axis">
                <span>45</span>
                <span>30</span>
                <span>15</span>
                <span>0</span>
              </div>
              <div className="chart-content-column">
                <div className="chart-area grid-bg bar-chart">
                  <div className="bar-3d style-1" style={{height: '45%'}}></div>
                  <div className="bar-3d style-2" style={{height: '35%'}}></div>
                  <div className="bar-3d style-3" style={{height: '65%'}}></div>
                  <div className="bar-3d style-4" style={{height: '20%'}}></div>
                  <div className="bar-3d style-5" style={{height: '85%'}}></div>
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
                  <strong>68%</strong>
                  <span>released</span>
                </div>
              </div>
              <div className="donut-legend">
                <div className="legend-item"><span className="dot dot-1"></span> Mammals <strong>68%</strong></div>
                <div className="legend-item"><span className="dot dot-2"></span> Birds <strong>18%</strong></div>
                <div className="legend-item"><span className="dot dot-3"></span> Reptiles <strong>9%</strong></div>
                <div className="legend-item"><span className="dot dot-4"></span> Others <strong>5%</strong></div>
              </div>
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-header-flex">
              <div>
                <h3>Admissions vs releases</h3>
                <p className="chart-sub">Monthly movement over the last six months</p>
              </div>
              <div className="toggle-pills">
                <span className="active">Admissions</span>
                <span>Releases</span>
              </div>
            </div>
            
            <div className="chart-wrapper">
              <div className="y-axis">
                <span>60</span>
                <span>40</span>
                <span>20</span>
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
                    <path d="M0,80 L80,60 L160,70 L240,30 L320,50 L400,10" fill="none" stroke="#4a7c59" strokeWidth="4" filter="url(#shadow)"/>
                    <path d="M0,90 L80,75 L160,65 L240,55 L320,40 L400,10" fill="none" stroke="#8da93e" strokeWidth="4" filter="url(#shadow)"/>
                  </svg>
                </div>
                <div className="x-axis">
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
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
                <div className="h-bar-track"><div className="h-bar-3d style-1" style={{width: '82%'}}></div></div>
                <strong>82</strong>
              </div>
              <div className="h-bar-row">
                <span>Transferred</span>
                <div className="h-bar-track"><div className="h-bar-3d style-2" style={{width: '54%'}}></div></div>
                <strong>54</strong>
              </div>
              <div className="h-bar-row">
                <span>In Rehab</span>
                <div className="h-bar-track"><div className="h-bar-3d style-3" style={{width: '28%'}}></div></div>
                <strong>28</strong>
              </div>
              <div className="h-bar-row">
                <span>Other</span>
                <div className="h-bar-track"><div className="h-bar-3d style-4" style={{width: '20%'}}></div></div>
                <strong>20</strong>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}