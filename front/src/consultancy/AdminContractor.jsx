import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AdminContractor() {
  const [view, setView] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:4000/consultant/viewconstruct')
      .then((res) => res.json())
      .then((result) => setView(result));
  }, []);
  
  return (
    <div style={{
      padding: '32px',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px' 
      }}>
        <h2 style={{ 
          fontSize: '26px', 
          fontWeight: '700', 
          color: '#312e81',
          margin: 0
        }}>
          Constructors Added By Admin
        </h2>
        
        <button style={{
          padding: '10px 16px',
          backgroundColor: '#4f46e5',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#4338ca'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#4f46e5'}
        >
          Refresh Data
        </button>
      </div>
      
      {/* Table */}
      <div style={{ 
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            minWidth: '800px',
            fontSize: '14px'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f4f6' }}>
                {['#', 'Name', 'Address', 'License', 'Experience', 'Email'].map((header, i) => (
                  <th key={i} style={{
                    padding: '16px 24px',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    fontSize: '12px',
                    textAlign: 'left',
                    borderBottom: '2px solid #e5e7eb'
                  }}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {view.map((items, index) => (
                <tr key={index} style={{
                  borderBottom: '1px solid #e5e7eb',
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eef2ff'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f9fafb'}
                >
                  <td style={{ padding: '16px 24px', verticalAlign: 'middle' }}>{index + 1}</td>
                  <td style={{ padding: '16px 24px', verticalAlign: 'middle', fontWeight: '500' }}>{items.userid.name}</td>
                  <td style={{ padding: '16px 24px', verticalAlign: 'middle' }}>{items.userid.address}</td>
                  <td style={{ padding: '16px 24px', verticalAlign: 'middle' }}>
                    <span style={{
                      padding: '4px 8px',
                      backgroundColor: '#dcfce7',
                      color: '#166534',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {items.userid.license}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', verticalAlign: 'middle' }}>{items.userid.experience}</td>
                  <td style={{ padding: '16px 24px', verticalAlign: 'middle', color: '#2563eb' }}>{items.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Footer */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        marginTop: '16px',
        fontSize: '14px',
        color: '#6b7280'
      }}>
        <div>
          Total Constructors: <span style={{ fontWeight: '600' }}>{view.length}</span>
        </div>
        <div>
          Last Updated: <span style={{ fontWeight: '600' }}>{new Date().toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export default AdminContractor;





