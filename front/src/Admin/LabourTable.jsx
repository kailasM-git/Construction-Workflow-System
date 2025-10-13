
import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LabourTable() {
  const [labours, setLabours] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/consultant/labourregisterview')
      .then((res) => res.json())
      .then((result) => setLabours(result));
  }, []);

  const handleDelete = (delId) => {
    fetch('http://localhost:4000/consultant/labourdelete', {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ id: delId })
    })
      .then((res) => res.json())
      .then(() => {
        setLabours(prev => prev.filter(l => l._id !== delId));
      });
  };

  const handleStatusToggle = (labour) => {
    const newStatus = labour.labourStatus === 0 ? 1 : 0;

    fetch('http://localhost:4000/consultant/updatelabourstatus', {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ id: labour._id, labourStatus: newStatus })
    })
      .then((res) => res.json())
      .then(() => {
        setLabours(prev =>
          prev.map((l) =>
            l._id === labour._id ? { ...l, labourStatus: newStatus } : l
          )
        );
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
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1e40af' }}>Registered Labours</h2>
        <Link to='/labourreg'>
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
            + Add Labour
          </button>
        </Link>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9', textAlign: 'left' }}>
              {['#', 'Name', 'Type', 'Age', 'Gender', 'Mobile', 'Aadhaar', 'Email', 'Actions'].map((header, i) => (
                <th key={i} style={{ padding: '14px 20px', color: '#475569', fontSize: '13px', textTransform: 'uppercase', fontWeight: 600 }}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {labours.length > 0 ? labours.map((labour, index) => (
              <tr key={labour._id} style={{ borderTop: '1px solid #e2e8f0', transition: '0.2s' }}>
                <td style={{ padding: '14px 20px' }}>{index + 1}</td>
                <td style={{ padding: '14px 20px' }}>{labour.name}</td>
                <td style={{ padding: '14px 20px' }}>{labour.labourType}</td>
                <td style={{ padding: '14px 20px' }}>{labour.age}</td>
                <td style={{ padding: '14px 20px' }}>{labour.gender}</td>
                <td style={{ padding: '14px 20px' }}>{labour.mobileNo}</td>
                <td style={{ padding: '14px 20px' }}>{labour.aadhaarNumber}</td>
                <td style={{ padding: '14px 20px' }}>{labour.email}</td>
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      onClick={() => handleStatusToggle(labour)}
                      style={{
                        backgroundColor: labour.labourStatus === 0 ? '#10b981' : '#f87171',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        fontSize: '13px',
                        borderRadius: '999px',
                        cursor: 'pointer'
                      }}
                    >
                      {labour.labourStatus === 0 ? 'Assign' : 'Assigned'}
                    </button>
                    <button
                      onClick={() => handleDelete(labour._id)}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        color: '#dc2626'
                      }}
                      title="Delete Labour"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                  No labours found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
