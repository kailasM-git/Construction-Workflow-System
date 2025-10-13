
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TablePage() {
  const [view, setView] = useState([]);


  
  useEffect(() => {
    fetch('http://localhost:4000/consultant/view')
      .then((res) => res.json())
      .then((result) => setView(result));
  }, []);
  
  const handleSubmit = (id) => {
    let param = { id: id, approvestatus: 1 };
    fetch('http://localhost:4000/consultant/approve', {
      method: "post",
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json"
      },
      body: JSON.stringify(param)
    }).then((res) => res.json()).then((result) => {
      console.log(result, "Approved");
    });
  };

  const handleSubmitrej = (id) => {
    let param = { id: id, approvestatus: 2 };
    fetch('http://localhost:4000/consultant/reject', {
      method: "post",
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json"
      },
      body: JSON.stringify(param)
    }).then((res) => res.json()).then((result) => {
      console.log(result, "Rejected");
    });
  };


  return (
    <div style={{
      padding: '30px',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 12px 32px rgba(0,0,0,0.05)',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Add Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1e40af' }}>Consultancy Approvals</h2>
        <Link to="/addconsult">
          <button style={{
            background: 'linear-gradient(to right, #667eea, #764ba2)',
            border: 'none',
            color: 'white',
            padding: '10px 18px',
            fontSize: '14px',
            fontWeight: 600,
            borderRadius: '999px',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            gap: '8px',
            boxShadow: '0 6px 20px rgba(118, 75, 162, 0.3)',
            transition: 'all 0.3s ease'
          }}>
            + Add Consultancy
          </button>
        </Link>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9', textAlign: 'left' }}>
              {['#', 'Name', 'Address', 'License', 'Experience', 'Email', 'Actions'].map((header, i) => (
                <th key={i} style={{ padding: '14px 20px', color: '#475569', fontSize: '13px', textTransform: 'uppercase', fontWeight: 600 }}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {view.map((items, index) => (
              <tr key={index} style={{ borderTop: '1px solid #e2e8f0', transition: '0.2s' }}>
                <td style={{ padding: '14px 20px' }}>{index + 1}</td>
                <td style={{ padding: '14px 20px' }}>{items.userid.name}</td>
                <td style={{ padding: '14px 20px' }}>{items.userid.address}</td>
                <td style={{ padding: '14px 20px' }}>{items.userid.license}</td>
                <td style={{ padding: '14px 20px' }}>{items.userid.experience}</td>
                <td style={{ padding: '14px 20px' }}>{items.email}</td>
                <td style={{ padding: '14px 20px' }}>
                  {items.userid.approvestatus === 0 ? (
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        style={{
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          fontSize: '13px',
                          borderRadius: '999px',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleSubmitrej(items.userid._id)}
                      >
                        Reject
                      </button>
                      <button
                        style={{
                          backgroundColor: '#3B82F6',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          fontSize: '13px',
                          borderRadius: '999px',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleSubmit(items.userid._id)}
                      >
                        Approve
                      </button>
                    </div>
                  ) : items.userid.approvestatus === 1 ? (
                    <span style={{
                      backgroundColor: '#10b981',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '999px',
                      fontSize: '13px'
                    }}>Approved</span>
                  ) : items.userid.approvestatus === 2 ? (
                    <span style={{
                      backgroundColor: '#f87171',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '999px',
                      fontSize: '13px'
                    }}>Rejected</span>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TablePage;











