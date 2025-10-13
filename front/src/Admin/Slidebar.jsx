import React, { useState } from 'react';

const Sidebar = ({ active, setActive }) => {
  const [openMenus, setOpenMenus] = useState({
    Email: false,
    Layouts: false,
  });

  const handleToggle = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const menuItems = [
    { label: 'Dashboard', icon: '🏠' },
    { label: 'Messages', icon: '✉️', badge: 3 },
    { label: 'Account', icon: '👤' },
    { label: 'Chart', icon: '📊' },
    { label: 'Calendar', icon: '🗓️' },
    { label: 'Reports', icon: '⚠️' }
  ];

  return (
    <div style={{
      width: '250px',
      background: 'linear-gradient(180deg, #3b82f6 0%, #6366f1 100%)',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '30px',
      paddingLeft: '15px',
      paddingRight: '15px',
      minHeight: '100vh',
      fontFamily: 'Inter, sans-serif',
      borderTopRightRadius: '20px'
    }}>
      {/* Logo */}
      <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '50px', paddingLeft: '10px' }}>
        YOUR LOGO
      </div>

      {/* Navigation */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {menuItems.map((item) => {
          const isActive = active === item.label;
          return (
            <li
              key={item.label}
              onClick={() => setActive(item.label)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '12px',
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                color: '#fff',
                fontWeight: isActive ? '600' : '500',
                marginBottom: '10px',
                cursor: 'pointer',
                transition: 'background 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <span style={{ fontSize: '15px' }}>{item.label}</span>
              </div>
              {item.badge && (
                <span style={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 600,
                  borderRadius: '999px',
                  padding: '2px 8px',
                  minWidth: '24px',
                  textAlign: 'center'
                }}>
                  {item.badge}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
