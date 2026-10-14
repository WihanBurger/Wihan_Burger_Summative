import React, { useState } from 'react';
import './Dashboard.css';
import './Admissions.css';

export default function Admissions({ onBack, onLogout, onNavigateProfile, onNavigateDashboard, onNavigateCases }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  const [condition, setCondition] = useState('Stable');
  const [actions, setActions] = useState(['Assessed on site', 'Ventilated carrier', 'Kept shaded', 'Water offered']);

  const toggleAction = (action) => {
    if (actions.includes(action)) {
      setActions(actions.filter(a => a !== action));
    } else {
      setActions([...actions, action]);
    }
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
            <li onClick={onNavigateDashboard} style={{ cursor: 'pointer' }}><span className="icon">🏠</span> {isSidebarOpen && 'Dashboard'}</li>
            <li onClick={onNavigateCases} style={{ cursor: 'pointer' }}><span className="icon">📁</span> {isSidebarOpen && 'Cases'}</li>
            <li className="active"><span className="icon">🏥</span> {isSidebarOpen && 'Admissions'}</li>
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
            <h2 className="page-title">Admission</h2>
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

        <button className="back-link" onClick={onBack}>
          &lt; Back to Case
        </button>

        <div className="admissions-container">
          
          <div className="drafts-banner">
            <div>
              <h3>Saved admission drafts</h3>
              <p>Continue incomplete case records without re-entering information.</p>
              <div className="draft-meta">
                <span className="draft-pill">3 Drafts</span>
                <span>Last drafted today at 14:02 - SBRC-2025-1036</span>
              </div>
            </div>
            <button className="btn-solid-green">View Drafts</button>
          </div>

          <div className="intake-header-card">
            <div className="intake-title">
              <h3>New Case Intake</h3>
              <p>Complete the required details before admitting the animal. Required fields are marked with *.</p>
            </div>
            <div className="progress-steps">
              <span className="step active">✓ 1 Intake source</span>
              <span className="step active">✓ 2 Case details</span>
              <span className="step">3 Clinical intake</span>
              <span className="step">4 Release planning</span>
            </div>
          </div>

          <div className="form-columns">
            <div className="form-column">
              <div className="form-card">
                <div className="card-header">
                  <h4>Finder & Report Details</h4>
                  <p>Who reported or found the animal and how the case entered the system.</p>
                </div>
                
                <div className="form-row-2">
                  <div className="input-group">
                    <label>Finder name *</label>
                    <input type="text" defaultValue="Sarah J." />
                  </div>
                  <div className="input-group">
                    <label>Phone *</label>
                    <input type="text" defaultValue="076 779 0706" />
                  </div>
                </div>

                <div className="input-group">
                  <label>Email address</label>
                  <input type="email" defaultValue="sarah.j@example.com" />
                </div>

                <div className="form-row-2">
                  <div className="input-group">
                    <label>Position</label>
                    <input type="text" defaultValue="Emily Rogers" />
                  </div>
                  <div className="input-group">
                    <label>Reported date & time *</label>
                    <input type="text" defaultValue="16 May 2025, 14:45" />
                  </div>
                </div>
              </div>

              <div className="form-card">
                <div className="card-header">
                  <h4>Care Actions, Tasks & Attachments</h4>
                  <p>Document completed interventions and outstanding care requirements.</p>
                </div>

                <div className="input-group">
                  <label>Actions already taken</label>
                  <div className="pill-group">
                    {['Assessed on site', 'Ventilated carrier', 'Kept shaded', 'Water offered'].map(act => (
                      <span 
                        key={act} 
                        className={`selectable-pill check-pill ${actions.includes(act) ? 'active' : ''}`}
                        onClick={() => toggleAction(act)}
                      >
                        {actions.includes(act) && <span className="check-icon">✓</span>}
                        {act}
                      </span>
                    ))}
                    <span className="selectable-pill">+ Add</span>
                  </div>
                </div>

                <div className="input-group">
                  <label>Need to do / care tasks</label>
                  <input type="text" placeholder="Add treatment, observation, transport or follow-up tasks. Each item can be assigned and checked off." />
                </div>

                <div className="form-row-2 attachment-row">
                  <div className="upload-box">
                    <span className="upload-icon">+</span>
                    <div>
                      <strong>Upload photos or files</strong>
                      <p>JPG or PNG • Max 10 MB each</p>
                    </div>
                  </div>
                  <div className="whatsapp-link-box">
                    <strong>WhatsApp intake thread</strong>
                    <p>Link the original report conversation or add an internal note.</p>
                    <a href="#">Open / link thread ➔</a>
                  </div>
                </div>
              </div>

              <div className="form-card">
                <div className="card-header">
                  <h4>Release date planning</h4>
                  <p>Schedule the expected release or review date. This can be updated later.</p>
                </div>
                
                <div className="form-row-3">
                  <div className="input-group">
                    <label>Planned release date</label>
                    <select><option>24 May 2025</option></select>
                  </div>
                  <div className="input-group">
                    <label>Review time</label>
                    <input type="text" defaultValue="09:00" />
                  </div>
                  <div className="input-group">
                    <label>Release location</label>
                    <select><option>Select location</option></select>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-column">
              <div className="form-card">
                <div className="card-header">
                  <h4>Case Classification</h4>
                  <p>Core animal identifiers and operational case status.</p>
                </div>

                <div className="form-row-2">
                  <div className="input-group">
                    <label>Animal type *</label>
                    <select><option>Select animal type</option></select>
                  </div>
                  <div className="input-group">
                    <label>Species *</label>
                    <select><option>Select species</option></select>
                  </div>
                </div>

                <div className="input-group">
                  <label>Scientific name</label>
                  <input type="text" defaultValue="Dacelo novaeguineae" />
                </div>

                <div className="form-row-3">
                  <div className="input-group">
                    <label>Age / life stage *</label>
                    <select><option>Select life stage</option></select>
                  </div>
                  <div className="input-group">
                    <label>Sex (if known)</label>
                    <select><option>Select sex</option></select>
                  </div>
                  <div className="input-group">
                    <label>Microchip / ID</label>
                    <input type="text" placeholder="Enter identifier" />
                  </div>
                </div>
              </div>

              <div className="form-card">
                <div className="card-header">
                  <h4>Clinical Intake & Current Condition</h4>
                  <p>Record condition, vitals and initial care requirements.</p>
                </div>

                <div className="form-row-4">
                  <div className="input-group">
                    <label>Weight</label>
                    <input type="text" defaultValue="326" />
                  </div>
                  <div className="input-group">
                    <label>Unit</label>
                    <select><option>g</option></select>
                  </div>
                  <div className="input-group">
                    <label>Temperature</label>
                    <input type="text" defaultValue="38.2 °C" />
                  </div>
                  <div className="input-group">
                    <label>Heart rate</label>
                    <input type="text" placeholder="Enter bpm" />
                  </div>
                </div>

                <div className="input-group">
                  <label>Condition on arrival</label>
                  <div className="pill-group">
                    {['Stable', 'Minor injuries', 'Moderate', 'Critical', 'Deceased'].map(cond => (
                      <span 
                        key={cond} 
                        className={`selectable-pill ${condition === cond ? 'active-green' : ''}`}
                        onClick={() => setCondition(cond)}
                      >
                        {cond}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="input-group">
                  <label>Current condition *</label>
                  <input type="text" placeholder="Describe responsiveness, mobility, breathing, visible injuries and suspected shock." />
                </div>

                <div className="form-row-3">
                  <div className="input-group">
                    <label>Enclosure</label>
                    <select><option>Select enclosure</option></select>
                  </div>
                  <div className="input-group">
                    <label>Box / carrier</label>
                    <select><option>Select carrier</option></select>
                  </div>
                  <div className="input-group">
                    <label>Priority *</label>
                    <select><option>Select urgency</option></select>
                  </div>
                </div>
              </div>

              <div className="form-card">
                <div className="card-header">
                  <h4>Assignment, Consent & Release Planning</h4>
                  <p>Set ownership, permissions and the next operational step.</p>
                </div>

                <div className="form-row-3">
                  <div className="input-group">
                    <label>Assigned to *</label>
                    <select><option>Select staff member</option></select>
                  </div>
                  <div className="input-group">
                    <label>Case status *</label>
                    <select><option>New admission</option></select>
                  </div>
                  <div className="input-group">
                    <label>Access level *</label>
                    <select><option>View / edit rights</option></select>
                  </div>
                </div>

                <div className="form-row-3">
                  <div className="input-group">
                    <label>Referral required</label>
                    <select><option>Select yes / no</option></select>
                  </div>
                  <div className="input-group">
                    <label>Consent to contact finder</label>
                    <select><option>Select consent</option></select>
                  </div>
                  <div className="input-group">
                    <label>Release / outcome</label>
                    <select><option>Pending assessment</option></select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-bottom-actions">
            <button className="btn-outline-action">Clear Form</button>
            <button className="btn-outline-action">Save Draft</button>
            <button className="btn-solid-green large">Admit Animal</button>
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