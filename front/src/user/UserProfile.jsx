import React, { useEffect, useState } from 'react';
import Navebar from './Navebar';

export default function UserProfile() {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("yourstorage")));
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phonenumber: '',
    email: '',
  });

  useEffect(() => {
    if (auth?.userid) {
      fetch('http://localhost:4000/consultant/userprofiler', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userids: auth.userid }),
      })
        .then((res) => res.json())
        .then((result) => {
          setUserProfile(result);
          setFormData({
            name: result.name,
            address: result.address,
            phonenumber: result.phonenumber,
            email: result.email,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error('Fetch error:', error);
          setLoading(false);
        });
    } else {
      console.warn("No userid found in localStorage");
      setLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = () => {
    fetch('http://localhost:4000/consultant/updateprofile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid: auth.userid,
        ...formData
      }),
    })
      .then(res => res.json())
      .then(data => {
        setUserProfile(data);
        setEditMode(false);
      })
      .catch(err => {
        console.error('Update failed:', err);
      });
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <>
      <Navebar />
      <div className="container mt-5">
        <div className="card shadow p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="mb-1">Welcome, {userProfile.name}</h4>
              <p className="text-muted mb-0">{userProfile.email}</p>
            </div>
            <button className="btn btn-primary" onClick={() => setEditMode(!editMode)}>
              {editMode ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <div className="row g-3">
            {[
              { label: 'Full Name', name: 'name' },
              { label: 'Phone Number', name: 'phonenumber' },
              { label: 'Email', name: 'email' },
              { label: 'Address', name: 'address' },
            ].map((field, idx) => (
              <div className="col-md-6" key={idx}>
                <label className="form-label">{field.label}</label>
                {editMode ? (
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="form-control"
                  />
                ) : (
                  <div className="form-control-plaintext bg-light px-3 py-2 rounded">
                    {userProfile[field.name]}
                  </div>
                )}
              </div>
            ))}
          </div>

          {editMode && (
            <div className="text-end mt-4">
              <button className="btn btn-success" onClick={handleUpdate}>Save Changes</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
