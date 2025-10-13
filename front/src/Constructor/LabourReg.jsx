import React, { useState } from "react";
import { motion } from "framer-motion";

const LabourReg = () => {
  const [labourType, setLabourType] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const param = {
      labourType : labourType,
      name: name,
      address: address,
      age: age,
      gender: gender,
      mobileNo: mobileNo,
      aadhaarNumber: aadhaarNumber,
      email: email,
      password: password,
      labourStatus:0,
    };

    fetch('http://localhost:4000/consultant/userregister', {
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
        alert("Labour registered successfully!");
        setLabourType("");
        setName("");
        setAddress("");
        setAge("");
        setGender("");
        setMobileNo("");
        setAadhaarNumber("");
        setEmail("");
        setPassword("");
      });
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    border: "1px solid #d1d5db",
    marginBottom: "1rem",
  };

  const labelStyle = {
    fontWeight: "500",
    marginBottom: "0.25rem",
    display: "block",
  };

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    backgroundColor: "#f3f4f6",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    maxWidth: "32rem",
    width: "100%",
  };

  const buttonStyle = {
    width: "100%",
    backgroundColor: "#2563eb",
    color: "#fff",
    fontWeight: "600",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    marginTop: "1rem",
  };

  return (
    <div style={containerStyle}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={cardStyle}
      >
        <h2 style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "700", marginBottom: "1rem" }}>
          Labour Registration
        </h2>
        <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Type of Labour</label>
          <select
            style={inputStyle}
            value={labourType}
            onChange={(e) => setLabourType(e.target.value)}
            required
          >
            <option value="">Select Labour Type</option>
            <option value="Plumber">Plumber</option>
            <option value="Painter">Painter</option>
            <option value="Electrician">Electrician</option>
            <option value="Carpenter">Carpenter</option>
            <option value="Gardener">Gardener</option>
          </select>

          <label style={labelStyle}>Name</label>
          <input
            style={inputStyle}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label style={labelStyle}>Address</label>
          <input
            style={inputStyle}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <label style={labelStyle}>Age</label>
          <input
            type="number"
            style={inputStyle}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />

          <label style={labelStyle}>Gender</label>
          <select
            style={inputStyle}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label style={labelStyle}>Mobile Number</label>
          <input
            type="tel"
            pattern="[0-9]{10}"
            style={inputStyle}
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            required
          />

          <label style={labelStyle}>Aadhaar Number</label>
          <input
            type="text"
            pattern="\d{12}"
            maxLength="12"
            style={inputStyle}
            value={aadhaarNumber}
            onChange={(e) => setAadhaarNumber(e.target.value)}
            required
          />

          <label style={labelStyle}>Email</label>
          <input
            type="email"
            style={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label style={labelStyle}>Password</label>
          <input
            type="password"
            style={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" style={buttonStyle}>
            Register Labour
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LabourReg;
