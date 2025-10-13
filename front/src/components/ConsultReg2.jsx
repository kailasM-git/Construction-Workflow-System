// Register.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const ConsultReg2 = () => {
  
   const [name,setName]=useState("")
      const [address,setAddress]=useState("")
      const [email,setEmail]=useState("")
      const [password,setPassword]=useState("")
      const [license,setLicense]=useState("")
      const [experience,setExperience]=useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
        let param= {
          name:name,
          address:address,
          approvestatus:0,
          email:email,
          password:password,
          license:license,
          experience:experience,
          userstatus:1,

          // regtype:0
        }
    
        fetch('http://localhost:4000/consultant/register',{
          method:"post",
          headers:{
            Accept:"application/json",
            'Content-Type':"application/json"
          },
          body:JSON.stringify(param)
        }).then((res)=>res.json()).then((result)=>{
          console.log(result);
          setName("")
          setAddress("")
          setEmail("")
          setPassword("")
          setLicense("")
          setExperience("")
          
        })
      }

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
    padding: "1.5rem",
  };

  const cardStyle = {
    backgroundColor: "#ffffff",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    borderRadius: "1rem",
    padding: "2rem",
    width: "100%",
    maxWidth: "32rem",
  };

  const headingStyle = {
    fontSize: "1.875rem",
    fontWeight: "700",
    marginBottom: "1.5rem",
    textAlign: "center",
    color: "#1f2937",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "500",
    marginBottom: "0.25rem",
    color: "#374151",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    border: "1px solid #d1d5db",
    backgroundColor: "#ffffff",
    color: "#1f2937",
    outline: "none",
    transition: "border 0.3s, box-shadow 0.3s",
    marginBottom: "1rem",
  };

  const inputFocusStyle = {
    border: "1px solid #3B82F6",
    boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
  };

  const buttonStyle = {
    width: "100%",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    fontWeight: "600",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    border: "none",
    marginTop: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const handleFocus = (e) => {
    Object.assign(e.target.style, { ...inputStyle, ...inputFocusStyle });
  };

  const handleBlur = (e) => {
    Object.assign(e.target.style, inputStyle);
  };

  return (
    <div style={containerStyle}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={cardStyle}
      >
        <h2 style={headingStyle}>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label style={labelStyle}>Name</label>
            <input
              
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Address</label>
            <input
              
              placeholder="123 Main St, City"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Email</label>
            <input
             
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input
             
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>License</label>
            <input
              
              placeholder="AB12345678"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Experience (in years)</label>
            <input
             
              placeholder="5"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={inputStyle}
            />
          </div>

          <button type="submit" style={buttonStyle}>
            Register
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ConsultReg2;
