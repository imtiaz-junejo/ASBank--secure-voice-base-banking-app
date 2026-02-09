import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (err) {
      console.error('Error parsing user data:', err);
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h1>🎉 Welcome to Dashboard!</h1>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>

        <div className="user-info">
          <div className="info-item">
            <span className="label">Name:</span>
            <span className="value">{user.name}</span>
          </div>
          <div className="info-item">
            <span className="label">Email:</span>
            <span className="value">{user.email}</span>
          </div>
        </div>

        <div className="dashboard-content">
          <h2>Voice Authentication Successful!</h2>
          <p>
            You have successfully authenticated using your voice. 
            Your voice phrase has been verified and matched.
          </p>
          
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">🎤</span>
              <span>Voice-based authentication</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <span>Secure login system</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✨</span>
              <span>Easy to use interface</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
