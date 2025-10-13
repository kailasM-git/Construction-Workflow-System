import React, { useState } from "react";
import { motion } from "framer-motion";

const SupplierReg = () => {
  const [supplierType, setSupplierType] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [businessRegNumber, setBusinessRegNumber] = useState("");
  const [dateOfAssociation, setDateOfAssociation] = useState("");
  const [contractorNo, setContractorNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
 let param= {
   supplierType:supplierType,
   supplierName:supplierName,
   businessRegNumber:`BUN-${businessRegNumber}`,
   dateOfAssociation:dateOfAssociation,
   contractorNo:contractorNo,
   email:email,
   password:password,
   userstatus:4,

   

   
 }

 fetch('http://localhost:4000/consultant/supplierregister',{
   method:"post",
   headers:{
     Accept:"application/json",
     'Content-Type':"application/json"
   },
   body:JSON.stringify(param)
 }).then((res)=>res.json()).then((result)=>{
   console.log(result);
   setSupplierType("")
   setSupplierName("")
   setBusinessRegNumber("")
   setDateOfAssociation("")
   setContractorNo("")
   setEmail("")
   setPassword("")
   alert("Supplier registered successfully!");
   
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
        <h2 style={headingStyle}>Supplier Registration</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label style={labelStyle}>Supplier Type</label>
            <input
              placeholder="Manufacturer / Vendor / Consultant"
              value={supplierType}
              onChange={(e) => setSupplierType(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Supplier Name</label>
            <input
              placeholder="ABC Supplies Ltd."
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Business Registration Number</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  padding: "0.5rem 0.75rem",
                  backgroundColor: "#e5e7eb",
                  border: "1px solid #d1d5db",
                  borderTopLeftRadius: "0.5rem",
                  borderBottomLeftRadius: "0.5rem",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                BUN-
              </span>
              <input
                type="text"
                placeholder="1234"
                value={businessRegNumber}
                onChange={(e) => setBusinessRegNumber(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  ...inputStyle,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  marginBottom: 0,
                }}
                maxLength={6}
                required
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Date of Association</label>
            <input
              type="date"
              value={dateOfAssociation}
              onChange={(e) => setDateOfAssociation(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Contractor Number</label>
            <input
              placeholder="C-10023"
              value={contractorNo}
              onChange={(e) => setContractorNo(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={inputStyle}
              required
            />
          </div>

          <button type="submit" style={buttonStyle}>
            Register Supplier
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SupplierReg;
