import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AddConstructor() {

  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('yourstorage')))
  const [view, setView] = useState([]);

  const[refresh, setRefresh]= useState(0)

  useEffect(() => {
    let ids = { cid: auth.userid };
    console.log(ids, "aps");
  
    fetch('http://localhost:4000/consultant/viewconstructor', {
      method: 'POST',
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json",
      },
      body: JSON.stringify(ids),
    })
    .then((res) => res.json())
    .then((result) => {
      console.log("Response from backend:", result); // Log result to check data structure
      setView(result);
    })
    .catch((err) => console.log('Error'));
  }, [refresh]);
  

  const handleDelete=(delid)=>{
    let idss={
      id:delid
    }

    fetch('http://localhost:4000/consultant/deleteconstructor',{
      method:"post",
      headers:{
        Accept:"application/json",
        'Content-Type':"application/json"
      },
      body:JSON.stringify(idss)
    }).then((res)=>res.json()).then((result)=>{
      console.log(result);
      setRefresh(prev=>prev+1)
     
    })
  }


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
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1e40af' }}>Constructor Approvals</h2>
        <Link to="/addconstructorform">
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
            + Add Constructor
          </button>
        </Link>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9', textAlign: 'left' }}>
              {['#', 'Name', 'Address', 'License', 'Email',  'Actions'].map((header, i) => (
                <th key={i} style={{
                  padding: '14px 20px',
                  color: '#475569',
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  fontWeight: 600
                }}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {view.map((items, index) => (
              <tr key={index} style={{
                borderTop: '1px solid #e2e8f0',
                backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb'
              }}>
                <td style={{ padding: '14px 20px' }}>{index + 1}</td>
                <td style={{ padding: '14px 20px' }}>{items.name}</td>
                <td style={{ padding: '14px 20px' }}>{items.address}</td>
                <td style={{ padding: '14px 20px' }}>{items.license}</td>
                <td style={{ padding: '14px 20px' }}>{items.email}</td>
                {/* <td style={{ padding: '14px 20px' }}>{items.cid?.email || '-'}</td> Display email */}
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {/* <button
                      style={{
                        backgroundColor: '#3B82F6',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        fontSize: '13px',
                        borderRadius: '999px',
                        cursor: 'pointer'
                      }}
                      // onClick={() => handleEdit(items.userid._id)}
                    >
                      Edit
                    </button> */}
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
                      onClick={() => handleDelete(items._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddConstructor;
