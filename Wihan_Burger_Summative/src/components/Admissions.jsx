import React, { useState } from 'react';
import './Dashboard.css';
import './Admissions.css';

export default function Admissions({ 
  currentUser, 
  onBack, 
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
  
  const [condition, setCondition] = useState('Stable');
  const [actions, setActions] = useState(['Assessed on site', 'Ventilated carrier', 'Kept shaded', 'Water offered']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    animal: 'Bird',
    species: '',
    location: '',
    urgency: 'Medium',
    assignee: 'Unassigned',
    finderName: '',
    phone: '',
    temperature: '',
    weight: ''
  });

  const actualUser = currentUser?.user || currentUser || {};
  const fullName = actualUser.name || 'Jeffry Burger';
  const userRole = actualUser.role || 'Administrator';

  const getInitials = (name) => {
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name ? name.substring(0, 2).toUpperCase() : 'JB';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleAction = (action) => {
    if (actions.includes(action)) {
      setActions(actions.filter(a => a !== action));
    } else {
      setActions([...actions, action]);
    }
  };

  const handleAdmitAnimal = async () => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('spottybird_token');
      
      const randomId = Math.floor(1000 + Math.random() * 9000);
      
      const payload = {
        caseId: `SBRC-2026-${randomId}`,
        animal: formData.animal,
        species: formData.species || 'Unknown Species',
        location: formData.location || 'Unknown Location',
        status: 'New Report',
        urgency: formData.urgency,
        assignee: formData.assignee,
        finderName: formData.finderName || 'Public Report',
        phone: formData.phone || 'N/A',
        weight: formData.weight || '',
        temperature: formData.temperature || '',
        condition: condition,
        daysInCare: 0,
        state: 'pending',
        report: 'pending'
      };

      const response = await fetch('http://127.0.0.1:5000/api/cases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        onNavigateCases();
      } else {
        console.error("Failed to save case.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
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
            <li className="active" onClick={onNavigateAdmissions} style={{ cursor: 'pointer' }}><span className="icon">🏥</span> {isSidebarOpen && 'Admissions'}</li>
            <li onClick={onNavigateRehabilitation} style={{ cursor: 'pointer' }}><span className="icon">🌿</span> {isSidebarOpen && 'Rehabilitation'}</li>
            <li onClick={onNavigateAllRecords} style={{ cursor: 'pointer' }}><span className="icon">📄</span> {isSidebarOpen && 'All Records'}</li>
            <li onClick={onNavigateVolunteers} style={{ cursor: 'pointer' }}><span className="icon">👤</span> {isSidebarOpen && 'Volunteers'}</li>
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

        <button className="back-link" onClick={onBack}>
          &lt; Back to Cases
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
                    <input type="text" name="finderName" value={formData.finderName} onChange={handleInputChange} placeholder="e.g. Sarah J." />
                  </div>
                  <div className="input-group">
                    <label>Phone *</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="e.g. 076 779 0706" />
                  </div>
                </div>

                <div className="input-group">
                  <label>Location found *</label>
                  <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g. Midstream Estate" />
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

                <div className="form-row-2 attachment-row">
                  <div className="upload-box">
                    <span className="upload-icon">+</span>
                    <div>
                      <strong>Upload photos or files</strong>
                      <p>JPG or PNG • Max 10 MB each</p>
                    </div>
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
                    <select name="animal" value={formData.animal} onChange={handleInputChange}>
                      <option value="Bird">Bird</option>
                      <option value="Mammal">Mammal</option>
                      <option value="Reptile">Reptile</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Species *</label>
                    <input type="text" name="species" value={formData.species} onChange={handleInputChange} placeholder="e.g. Laughing Kookaburra" />
                  </div>
                </div>
              </div>

              <div className="form-card">
                <div className="card-header">
                  <h4>Clinical Intake & Current Condition</h4>
                  <p>Record condition, vitals and initial care requirements.</p>
                </div>

                <div className="form-row-2">
                  <div className="input-group">
                    <label>Weight (g)</label>
                    <input type="text" name="weight" value={formData.weight} onChange={handleInputChange} placeholder="e.g. 326" />
                  </div>
                  <div className="input-group">
                    <label>Temperature (°C)</label>
                    <input type="text" name="temperature" value={formData.temperature} onChange={handleInputChange} placeholder="e.g. 38.2" />
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
                  <label>Priority *</label>
                  <select name="urgency" value={formData.urgency} onChange={handleInputChange}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="form-card">
                <div className="card-header">
                  <h4>Assignment & Permission</h4>
                  <p>Set ownership and permissions.</p>
                </div>

                <div className="form-row-2">
                  <div className="input-group">
                    <label>Assigned to *</label>
                    <select name="assignee" value={formData.assignee} onChange={handleInputChange}>
                      <option value="Unassigned">Unassigned</option>
                      <option value={fullName}>{fullName}</option>
                      <option value="Karien Schmidt">Karien Schmidt</option>
                      <option value="Tahlia M.">Tahlia M.</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Case status *</label>
                    <select disabled><option>New admission</option></select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-bottom-actions">
            <button className="btn-outline-action" onClick={() => setFormData({ animal: 'Bird', species: '', location: '', urgency: 'Medium', assignee: 'Unassigned', finderName: '', phone: '', temperature: '', weight: '' })}>Clear Form</button>
            <button className="btn-outline-action">Save Draft</button>
            <button className="btn-solid-green large" onClick={handleAdmitAnimal} disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Admit Animal'}
            </button>
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