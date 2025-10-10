import React, { useState } from 'react';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'register' | 'dashboard'>('home');

  const handleLogin = () => {
    setCurrentView('login');
  };

  const handleSignUp = () => {
    setCurrentView('register');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleRegisterSuccess = () => {
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('home');
  };

  const handleSwitchToRegister = () => {
    setCurrentView('register');
  };

  const handleSwitchToLogin = () => {
    setCurrentView('login');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen">
      {currentView === 'home' && (
        <Homepage onLogin={handleLogin} onSignUp={handleSignUp} />
      )}
      {currentView === 'login' && (
        <LoginPage 
          onLogin={handleLoginSuccess} 
          onSwitchToRegister={handleSwitchToRegister}
        />
      )}
      {currentView === 'register' && (
        <RegisterPage 
          onRegister={handleRegisterSuccess} 
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
      {currentView === 'dashboard' && (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
