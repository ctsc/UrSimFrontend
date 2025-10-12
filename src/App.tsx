import React, { useState, Suspense, lazy } from 'react';
import { SimpleLoader } from './components/SkeletonLoader';

// Lazy load components for better performance
const Homepage = lazy(() => import('./components/Homepage'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const LoginPage = lazy(() => import('./components/LoginPage'));
const RegisterPage = lazy(() => import('./components/RegisterPage'));

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
      <Suspense fallback={<SimpleLoader />}>
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
      </Suspense>
    </div>
  );
}

export default App;
