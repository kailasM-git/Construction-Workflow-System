import React, { useState } from 'react';
import Sidebar from './Slidebar'; // ensure correct spelling
import DashboardPage from './DashboaedPage';
import FormPage from './FormPage';
import ReviewsPage from './ReviewsPage';
import TablePage from './TablePage';

const Dashboard = () => {
  const [active, setActive] = useState('Dashboard');

  const renderContent = () => {
    switch (active) {
      case 'Dashboard':
        return <DashboardPage />;
      case 'Forms':
        return <FormPage />;
      case 'Reviews':
        return <ReviewsPage />;
      case 'Table':
        return <TablePage />;
      default:
        return <DashboardPage />;
    }
  };

  const handleLogout = () => {
    alert('Logged out');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar active={active} setActive={setActive} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
        {/* Navbar */}
        <div
          style={{
            height: '60px',
            backgroundColor: '#1e293b',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 30px',
            color: '#fff',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: 600 }}>🏗️ Construction Admin Panel</h2>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#ef4444',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease-in-out',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#dc2626')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#ef4444')}
          >
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div style={{ padding: '30px', flex: 1 }}>{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
