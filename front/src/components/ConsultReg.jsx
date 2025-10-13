
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";
import Navebar from "../user/Navebar";

const ConsultReg = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [license, setLicense] = useState("");
  const [experience, setExperience] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!address.trim()) newErrors.address = "Address is required.";
    if (!license.trim()) newErrors.license = "License number is required.";
    if (!experience || parseInt(experience) < 0)
      newErrors.experience = "Experience must be a non-negative number.";
    if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email format.";
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const param = {
      name,
      address,
      approvestatus: 0,
      email,
      password,
      license,
      experience,
      userstatus: 1,
    };

    fetch("http://localhost:4000/consultant/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setName("");
        setAddress("");
        setEmail("");
        setPassword("");
        setLicense("");
        setExperience("");
        setErrors({});
        alert("Consultant Registered Successfully!");
      })
      .catch((err) => console.error(err));
  };

  // Styles
  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    backgroundImage: "url('img/newimage/img2.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
  };

  const formStyle = {
    border: "none",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "550px",
    padding: "30px 40px",
    backgroundColor: "white",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
  };

  const inputStyle = {
    borderRadius: "8px",
  };

  const buttonStyle = {
    backgroundColor: "#c1d82f",
    color: "white",
    fontWeight: "500",
    padding: "12px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    border: "none",
  };

  const errorText = {
    fontSize: "13px",
    color: "#dc3545",
    marginTop: "4px",
    marginBottom: "8px",
  };

  return (
    <>
      <Navebar />
      <div style={containerStyle}>
        <div className="card shadow-lg animate__animated animate__fadeInDown" style={formStyle}>
          <h2 className="text-center mb-4" style={{ fontWeight: 600, color: "#1c1c1c" }}>
            Consultant Registration
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: 500 }}>
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                style={inputStyle}
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <div style={errorText}>{errors.name}</div>}
            </div>

            {/* Address */}
            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: 500 }}>
                Address
              </label>
              <input
                type="text"
                className="form-control"
                style={inputStyle}
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              {errors.address && <div style={errorText}>{errors.address}</div>}
            </div>

            {/* License No */}
            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: 500 }}>
                License No
              </label>
              <input
                type="text"
                className="form-control"
                style={inputStyle}
                placeholder="Enter your license number"
                value={license}
                onChange={(e) => setLicense(e.target.value)}
              />
              {errors.license && <div style={errorText}>{errors.license}</div>}
            </div>

            {/* Experience */}
            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: 500 }}>
                Experience (years)
              </label>
              <input
                type="number"
                className="form-control"
                style={inputStyle}
                placeholder="e.g. 5"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
              {errors.experience && <div style={errorText}>{errors.experience}</div>}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: 500 }}>
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                style={inputStyle}
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div style={errorText}>{errors.email}</div>}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="form-label" style={{ fontWeight: 500 }}>
                Password
              </label>
              <input
                type="password"
                className="form-control"
                style={inputStyle}
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <div style={errorText}>{errors.password}</div>}
            </div>

            {/* Button */}
            <div className="d-grid">
              <button type="submit" className="btn" style={buttonStyle}>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ConsultReg;

