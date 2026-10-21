import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard'
import ProfileSettings from './components/ProfileSettings'
import Cases from './components/Cases'
import CaseDetails from './components/CaseDetails'
import Admissions from './components/Admissions'
import Rehabilitation from './components/Rehabilitation'
import AllRecords from './components/AllRecords'
import Volunteers from './components/Volunteers'

function App() {
  const [currentView, setCurrentView] = useState('signup')
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('spottybird_currentUser')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setCurrentUser(parsedUser)
        setCurrentView('dashboard')
      } catch (e) {
        console.error("Error loading session:", e)
        localStorage.removeItem('spottybird_currentUser')
      }
    }
  }, [])

  const handleAuthSuccess = (userData) => {
    localStorage.setItem('spottybird_currentUser', JSON.stringify(userData))
    setCurrentUser(userData)
    setCurrentView('dashboard')
  }

  const handleLogout = () => {
    localStorage.removeItem('spottybird_currentUser')
    localStorage.removeItem('spottybird_token')
    setCurrentUser(null)
    setCurrentView('login')
  }

  if (currentView === 'signup') {
    return <SignUp 
      onSignUpSuccess={handleAuthSuccess} 
      onNavigateLogin={() => setCurrentView('login')} 
    />
  }

  if (currentView === 'login') {
    return <Login 
      onLoginSuccess={handleAuthSuccess} 
      onNavigateSignUp={() => setCurrentView('signup')} 
    />
  }

  if (currentView === 'dashboard') {
    return <Dashboard 
      currentUser={currentUser}
      onLogout={handleLogout} 
      onNavigateProfile={() => setCurrentView('profile')} 
      onNavigateCases={() => setCurrentView('cases')}
      onNavigateAdmissions={() => setCurrentView('admissions')}
      onNavigateRehabilitation={() => setCurrentView('rehabilitation')}
      onNavigateAllRecords={() => setCurrentView('all_records')}
      onNavigateVolunteers={() => setCurrentView('volunteers')}
    />
  }

  if (currentView === 'profile') {
    return <ProfileSettings 
      currentUser={currentUser}
      onBack={() => setCurrentView('dashboard')} 
      onLogout={handleLogout} 
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
      currentUser={currentUser}
      onLogout={handleLogout} 
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
      currentUser={currentUser}
      onBack={() => setCurrentView('cases')}
      onLogout={handleLogout} 
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
      currentUser={currentUser}
      onBack={() => setCurrentView('cases')}
      onLogout={handleLogout} 
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
      currentUser={currentUser}
      onLogout={handleLogout} 
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
      currentUser={currentUser}
      onLogout={handleLogout} 
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
      currentUser={currentUser}
      onLogout={handleLogout} 
      onNavigateProfile={() => setCurrentView('profile')} 
      onNavigateDashboard={() => setCurrentView('dashboard')}
      onNavigateCases={() => setCurrentView('cases')}
      onNavigateAdmissions={() => setCurrentView('admissions')}
      onNavigateRehabilitation={() => setCurrentView('rehabilitation')}
      onNavigateAllRecords={() => setCurrentView('all_records')}
      onNavigateCaseDetails={() => setCurrentView('case_details')}
    />
  }

  return null
}

export default App