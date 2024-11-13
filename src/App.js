import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import MahasiswaForm from './components/MahasiswaForm'; // Impor MahasiswaForm

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={!isLoggedIn ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/register" 
            element={!isLoggedIn ? <RegisterPage /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/dashboard" 
            element={isLoggedIn ? <DashboardPage onLogout={handleLogout} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/mahasiswa" 
            element={isLoggedIn ? <MahasiswaForm /> : <Navigate to="/login" />} // Tambahkan rute untuk MahasiswaForm
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;