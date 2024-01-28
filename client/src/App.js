import React, {useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrisonDilemmaGame from './components/PrisonDilemmaGame';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <PrisonDilemmaGame
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}  // Make sure to pass onLogout prop
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/register"
          element={<Register onRegister={() => setIsAuthenticated(true)} />}
        />
      </Routes>
    </Router>
  );
};

export default App;