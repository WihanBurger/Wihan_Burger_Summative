import React, { useState } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import ProfileSettings from './components/ProfileSettings'
import Cases from './components/Cases'
import CaseDetails from './components/CaseDetails'
import Admissions from './components/Admissions'
import Rehabilitation from './components/Rehabilitation'
import AllRecords from './components/AllRecords'
import Volunteers from './components/Volunteers'

function App() {
  const [currentView, setCurrentView] = useState('login')

  if (currentView === 'login') {
    return <Login onLoginSuccess={() => setCurrentView('dashboard')} />
  }

  if (currentView === 'profile') {
    return <ProfileSettings 
      onBack={() => setCurrentView('dashboard')} 
      onLogout={() => setCurrentView('login')} 
      onNavigateDashboard={() => setCurrentView('dashboard')}
      onNavigateCases={() => setCurrentView('cases')}
      onNavigateAdmissions={() => setCurrentView('admissions')}
      onNavigateRehabilitation={() => setCurrentView('rehabilitation')}
      onNavigateAllRecords={() => setCurrentView('all_records')}
      onNavigateVolunteers={() => setCurrentView('volunteers')}
    />
  }

  if (currentView === 'cases') {
    return <Cases 
      onLogout={() => setCurrentView('login')} 
      onNavigateProfile={() => setCurrentView('profile')} 
      onNavigateDashboard={() => setCurrentView('dashboard')}
      onNavigateCaseDetails={() => setCurrentView('case_details')}
      onNavigateAdmissions={() => setCurrentView('admissions')}
      onNavigateRehabilitation={() => setCurrentView('rehabilitation')}
      onNavigateAllRecords={() => setCurrentView('all_records')}
      onNavigateVolunteers={() => setCurrentView('volunteers')}
    />
  }

  if (currentView === 'case_details') {
    return <CaseDetails 
      onBack={() => setCurrentView('cases')}
      onLogout={() => setCurrentView('login')} 
      onNavigateProfile={() => setCurrentView('profile')} 
      onNavigateDashboard={() => setCurrentView('dashboard')}
      onNavigateCases={() => setCurrentView('cases')}
      onNavigateAdmissions={() => setCurrentView('admissions')}
      onNavigateRehabilitation={() => setCurrentView('rehabilitation')}
      onNavigateAllRecords={() => setCurrentView('all_records')}
      onNavigateVolunteers={() => setCurrentView('volunteers')}
    />
  }
  
  if (currentView === 'admissions') {
    return <Admissions 
      onBack={() => setCurrentView('cases')}
      onLogout={() => setCurrentView('login')} 
      onNavigateProfile={() => setCurrentView('profile')} 
      onNavigateDashboard={() => setCurrentView('dashboard')}
      onNavigateCases={() => setCurrentView('cases')}
      onNavigateRehabilitation={() => setCurrentView('rehabilitation')}
      onNavigateAllRecords={() => setCurrentView('all_records')}
      onNavigateVolunteers={() => setCurrentView('volunteers')}
    />
  }

  if (currentView === 'rehabilitation') {
    return <Rehabilitation 
      onLogout={() => setCurrentView('login')} 
      onNavigateProfile={() => setCurrentView('profile')} 
      onNavigateDashboard={() => setCurrentView('dashboard')}
      onNavigateCases={() => setCurrentView('cases')}
      onNavigateAdmissions={() => setCurrentView('admissions')}
      onNavigateCaseDetails={() => setCurrentView('case_details')}
      onNavigateAllRecords={() => setCurrentView('all_records')}
      onNavigateVolunteers={() => setCurrentView('volunteers')}
    />
  }
  
  if (currentView === 'all_records') {
    return <AllRecords 
      onLogout={() => setCurrentView('login')} 
      onNavigateProfile={() => setCurrentView('profile')} 
      onNavigateDashboard={() => setCurrentView('dashboard')}
      onNavigateCases={() => setCurrentView('cases')}
      onNavigateAdmissions={() => setCurrentView('admissions')}
      onNavigateRehabilitation={() => setCurrentView('rehabilitation')}
      onNavigateCaseDetails={() => setCurrentView('case_details')}
      onNavigateVolunteers={() => setCurrentView('volunteers')}
    />
  }

  if (currentView === 'volunteers') {
    return <Volunteers 
      onLogout={() => setCurrentView('login')} 
      onNavigateProfile={() => setCurrentView('profile')} 
      onNavigateDashboard={() => setCurrentView('dashboard')}
      onNavigateCases={() => setCurrentView('cases')}
      onNavigateAdmissions={() => setCurrentView('admissions')}
      onNavigateRehabilitation={() => setCurrentView('rehabilitation')}
      onNavigateAllRecords={() => setCurrentView('all_records')}
      onNavigateCaseDetails={() => setCurrentView('case_details')}
    />
  }

  return <Dashboard 
    onLogout={() => setCurrentView('login')} 
    onNavigateProfile={() => setCurrentView('profile')} 
    onNavigateCases={() => setCurrentView('cases')}
    onNavigateAdmissions={() => setCurrentView('admissions')}
    onNavigateRehabilitation={() => setCurrentView('rehabilitation')}
    onNavigateAllRecords={() => setCurrentView('all_records')}
    onNavigateVolunteers={() => setCurrentView('volunteers')}
  />
}

export default App