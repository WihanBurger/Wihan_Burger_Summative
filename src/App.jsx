import React, { useState } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function App() {
  const [currentView, setCurrentView] = useState('login')

  if (currentView === 'login') {
    return <Login onLoginSuccess={() => setCurrentView('dashboard')} />
  }

  return <Dashboard onLogout={() => setCurrentView('login')} />
}

export default App