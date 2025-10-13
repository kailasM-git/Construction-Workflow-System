import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import url from '../user/ImageUrl';
import Modal from 'react-modal';
import Navebar from './Navebar';
import axios from 'axios';
import Header from '../components/Header';

Modal.setAppElement('#root');

const UserCards = () => {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('yourstorage')));
  const [view, setView] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [estimates, setEstimates] = useState([]);
  const [consultplans, setConsultplans] = useState(null);

 // After fetching plans
useEffect(() => {
  fetch('http://localhost:4000/consultant/viemyplans', {
    method: 'POST',
    headers: {
      Accept: "application/json",
      'Content-Type': "application/json",
    },
    body: JSON.stringify({ uid: auth.userid }),
  })
    .then(res => res.json())
    .then(async (plans) => {
      // For each plan, fetch assigned estimate
      const updatedPlans = await Promise.all(plans.map(async (plan) => {
        const res = await fetch('http://localhost:4000/consultant/viewestimatebyuser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ planid: plan._id })
        });
        const estimates = await res.json();
        const assigned = estimates.find(e => e.status === 1);
        return {
          ...plan,
          hasAssignedEstimate: !!assigned,
          assignedEstimatePrice: assigned?.estimateprice || null,
          assignedConsultant: assigned?.consultid?.name || null
        };
      }));
      setView(updatedPlans);
    })
    .catch(err => console.error('Error fetching plans:', err));
}, [refresh, auth.userid]);

  useEffect(() => {
    fetch('http://localhost:4000/consultant/viemyplans', {
      method: 'POST',
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json",
      },
      body: JSON.stringify({ uid: auth.userid }),
    })
      .then(res => res.json())
      .then(setView)
      .catch(err => console.error('Error fetching plans:', err));
  }, [refresh]);

  const handleDelete = (id) => {
    fetch('http://localhost:4000/consultant/plandeletebyuser', {
      method: 'POST',
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ id }),
    }).then(res => res.json()).then(() => setRefresh(prev => prev + 1));
  };

  const openEstimateModal = (planid) => {
    setSelectedPlanId(planid);
    setModalIsOpen(true);
    fetch('http://localhost:4000/consultant/viewestimatebyuser', {
      method: 'POST',
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json",
      },
      body: JSON.stringify({ planid }),
    })
      .then(res => res.json())
      .then(setEstimates)
      .catch(err => console.error("Failed to fetch estimates", err));
  };

  const assignEstimate = (estimateid) => {
    fetch('http://localhost:4000/consultant/selectestimatebyuser', {
      method: 'POST',
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json",
      },
      body: JSON.stringify({ estimateid }),
    })
      .then(res => res.json())
      .then(() => {
        alert("Estimate assigned successfully");
        setEstimates(prev =>
          prev.map(est =>
            est._id === estimateid
              ? { ...est, status: 1 }
              : { ...est, status: 0 }
          )
        );
        setRefresh(prev => prev + 1);
      })
      .catch(err => console.error("Failed to assign", err));
  };

  const renderField = (label, value) => value ? (
    <div style={{ fontSize: '0.95rem', color: '#374151', margin: '0.2rem 0' }}>
      <strong>{label}:</strong> {value}
    </div>
  ) : null;

  const titleStyle = {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: '#1e40af',
    marginBottom: '0.75rem',
  };

  return (
    <>
    <Navebar/>
      {/* <Navebar /> */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem', padding: '2rem' }}>
        {view.map((user, index) => (
          <motion.div
            key={index}
            style={{
              backgroundColor: '#fff',
              borderRadius: '1rem',
              padding: '1.25rem',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column'
            }}
            whileHover={{ scale: 1.02 }}
          >
            <div>
              {user.name && <div style={titleStyle}>{user.name}</div>}

              <h5>{user.category}</h5>
              {renderField("Building Type", user.type)}
              {renderField("Building Name", user.buildingname)}
              {renderField("Estimate Cost", user.estimatecost)}
              {renderField("Estimate Time", user.estimatetime)}
              {renderField("Total Area", user.totalarea)}
              {renderField("Location", user.location)}
              {renderField("Additional Notes", user.additionalnotes)}

              {user.image && (
                <img
                  src={url + user.image}
                  width={200}
                  height={200}
                  alt="Building"
                  style={{ marginTop: '1rem', borderRadius: '0.5rem' }}
                />
              )}

              {user.landpaper && (
                <div style={{ marginTop: '1rem' }}>
                  <h6>Landpaper Document:</h6>
                  {user.landpaper.endsWith(".pdf") ? (
                    <a href={url + user.landpaper} target="_blank" rel="noopener noreferrer">View PDF</a>
                  ) : (
                    <img
                      src={url + user.landpaper}
                      width={200}
                      height={200}
                      alt="Landpaper"
                      style={{ marginTop: '0.5rem', borderRadius: '0.5rem' }}
                    />
                  )}
                </div>
              )}

              {renderField("Villa Type", user.vtype)}
              {renderField("Villa Name", user.villaname)}
              {renderField("Estimate Cost", user.vestimatecost)}
              {renderField("Estimate Time", user.vestimatetime)}
              {renderField("Total Area", user.vtotalarea)}
              {renderField("Location", user.vlocation)}
              {renderField("Requirements", user.requirements)}

              {user.vimage && (
                <img
                  src={url + user.vimage}
                  width={200}
                  height={200}
                  alt="Villa"
                  style={{ marginTop: '1rem', borderRadius: '0.5rem' }}
                />
              )}

              {renderField("Road Type", user.roadtype)}
              {renderField("Road Length", user.roadlength)}
              {renderField("Estimate Cost", user.roadestimatecost)}
              {renderField("Estimate Time", user.roadestimatetime)}
              {renderField("Location", user.roadlocation)}
              {renderField("Obstacles", user.obstacles)}

              {user.roadimage && (
                <img
                  src={url + user.roadimage}
                  width={200}
                  height={200}
                  alt="Road"
                  style={{ marginTop: '1rem', borderRadius: '0.5rem' }}
                />
              )}

              {user.landpapervilla && (
                <div style={{ marginTop: '1rem' }}>
                  <h6>Document:</h6>
                  {user.landpapervilla.endsWith(".pdf") ? (
                    <a href={url + user.landpapervilla} target="_blank" rel="noopener noreferrer">View PDF</a>
                  ) : (
                    <img
                      src={url + user.landpapervilla}
                      width={200}
                      height={200}
                      alt="Landpaper"
                      style={{ marginTop: '0.5rem', borderRadius: '0.5rem' }}
                    />
                  )}
                </div>
              )}

              {user.hasAssignedEstimate ? (
  <button
    style={{
      backgroundColor: '#16a34a',
      color: '#fff',
      padding: '0.4rem 0.8rem',
      borderRadius: '0.5rem',
      marginTop: '1rem',
      cursor: 'not-allowed'
    }}
    disabled
  >
    Assigned
  </button>
) : (
  <>
    <button
      style={{
        backgroundColor: '#dc2626',
        color: '#fff',
        padding: '0.4rem 0.8rem',
        borderRadius: '0.5rem',
        marginTop: '1rem'
      }}
      onClick={() => handleDelete(user._id)}
    >
      Delete
    </button>
    <button
      style={{
        backgroundColor: "#0ea5e9",
        color: '#fff',
        padding: '0.4rem 0.8rem',
        borderRadius: '0.5rem',
        marginTop: '0.5rem'
      }}
      onClick={() => openEstimateModal(user._id)}
    >
      View Estimated Prices
    </button>
  </>
)}
            </div>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} contentLabel="Estimate Modal"
        style={{
          content: {
            width: '50%', margin: 'auto', padding: '2rem', borderRadius: '1rem',
            background: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          }
        }}>
        <h2>Estimate Prices</h2>
        {estimates.length > 0 ? (
          estimates.map((est, idx) => {
            const someAssigned = estimates.some(e => e.status === 1);
            const isAssigned = est.status === 1;
            return (
              <div key={idx} style={{
                marginBottom: '1rem',
                borderBottom: '1px solid #ccc',
                paddingBottom: '1rem',
                backgroundColor: isAssigned ? '#DCFCE7' : 'transparent'
              }}>
                <p><strong>Consultant:</strong> {est.consultid?.name}</p>
                <p style={{
                  textDecoration: !isAssigned && someAssigned ? 'line-through' : 'none',
                  color: !isAssigned && someAssigned ? '#888' : '#000'
                }}>
                  <strong>Estimate Price:</strong> ₹{est.estimateprice}
                </p>
                {isAssigned ? (
                  <button disabled style={{
                    backgroundColor: '#16a34a',
                    color: '#fff',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '0.5rem',
                    cursor: 'not-allowed'
                  }}>
                    Assigned
                  </button>
                ) : !someAssigned ? (
                  <button style={{
                    backgroundColor: '#10b981',
                    color: '#fff',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '0.5rem'
                  }} onClick={() => assignEstimate(est._id)}>
                    Assign This Estimate
                  </button>
                ) : null}
              </div>
            );
          })
        ) : (
          <p>No estimates available for this plan.</p>
        )}
        <button onClick={() => setModalIsOpen(false)} style={{ marginTop: '1rem' }}>Close</button>
      </Modal>
    </>
  );
};

export default UserCards;
