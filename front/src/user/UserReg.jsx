import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, MapPin, Phone } from "lucide-react";
import Navebar from "./Navebar";

export default function UserReg() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!address.trim()) newErrors.address = "Address is required.";
    if (!/^\d{10}$/.test(phonenumber)) newErrors.phonenumber = "Phone must be 10 digits.";
    if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email format.";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const param = {
      name,
      address,
      phonenumber,
      email,
      password,
      userstatus: 3,
    };

    fetch("http://localhost:4000/consultant/userregister", {
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
        setPhonenumber("");
        setEmail("");
        setPassword("");
        setErrors({});
        alert("Registration successful");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const styles = {
    page: {
      minHeight: "50vh",
      background: "linear-gradient(to bottom right, #cfe9ff, #a1c4fd)",
      backgroundImage: "url('img/newimage/img1.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    },
    card: {
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      borderRadius: "20px",
      padding: "30px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      maxWidth: "400px",
      width: "100%",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#1e40af",
      textAlign: "center",
      marginBottom: "24px",
    },
    label: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#374151",
      marginBottom: "6px",
      display: "block",
    },
    inputGroup: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#f3f4f6",
      borderRadius: "10px",
      padding: "10px 12px",
      marginBottom: "4px",
    },
    input: {
      backgroundColor: "transparent",
      border: "none",
      outline: "none",
      width: "100%",
      paddingLeft: "8px",
      fontSize: "14px",
      color: "#111827",
    },
    error: {
      fontSize: "12px",
      color: "#dc2626",
      marginBottom: "10px",
      paddingLeft: "4px",
    },
    button: {
      width: "100%",
      backgroundColor: "#2563eb",
      color: "white",
      fontWeight: "600",
      padding: "10px",
      borderRadius: "12px",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      marginTop: "12px",
    },
  };

  return (
    <>
      <Navebar />
      <div style={styles.page}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={styles.card}
        >
          <h2 style={styles.title}>Create Your Account</h2>
          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Name</label>
            <div style={styles.inputGroup}>
              <User size={18} color="#6b7280" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
                placeholder="John Doe"
              />
            </div>
            {errors.name && <div style={styles.error}>{errors.name}</div>}

            <label style={styles.label}>Address</label>
            <div style={styles.inputGroup}>
              <MapPin size={18} color="#6b7280" />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={styles.input}
                placeholder="123 Main Street"
              />
            </div>
            {errors.address && <div style={styles.error}>{errors.address}</div>}

            <label style={styles.label}>Phone</label>
            <div style={styles.inputGroup}>
              <Phone size={18} color="#6b7280" />
              <input
                type="tel"
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
                style={styles.input}
                placeholder="9876543210"
                maxLength="10"
              />
            </div>
            {errors.phonenumber && <div style={styles.error}>{errors.phonenumber}</div>}

            <label style={styles.label}>Email</label>
            <div style={styles.inputGroup}>
              <Mail size={18} color="#6b7280" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <div style={styles.error}>{errors.email}</div>}

            <label style={styles.label}>Password</label>
            <div style={styles.inputGroup}>
              <Lock size={18} color="#6b7280" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                placeholder="••••••••"
              />
            </div>
            {errors.password && <div style={styles.error}>{errors.password}</div>}

            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              style={styles.button}
            >
              Register
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
}
