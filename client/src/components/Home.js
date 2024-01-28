import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ isAuthenticated, onLogout }) => {
  const handleLogout = () => {
    // Call the onLogout function passed as a prop
    onLogout();
  };

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      {isAuthenticated ? (
        <div>
          <p>You are logged in.</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Please log in to access the Home Page.</p>
      )}
    </div>
  );
};

export default Home;