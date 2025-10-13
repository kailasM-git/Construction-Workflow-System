import { useState } from "react";
import Navebar from "../user/Navebar";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let param = {
      email: email,
      password: password,
    };

    fetch("http://localhost:4000/consultant/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result != null) {
          localStorage.setItem("yourstorage", JSON.stringify(result));
          window.location.href = "/";
        }
        console.log(result);
      })
      .catch((err) => console.error("Err:", err));
  };

  const styles = {
    wrapper: {
      minHeight: "90vh",
      backgroundImage: "url('img/blog/blog-05.jpg')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: '"Poppins-Regular", sans-serif',
    },
    inner: {
      padding: "20px",
      background: "#fff",
      maxWidth: "850px",
      width: "100%",
      display: "flex",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    },
    imageHolder: {
      width: "50%",
    },
    form: {
      width: "50%",
      paddingTop: "36px",
      paddingLeft: "45px",
      paddingRight: "45px",
    },
    heading: {
      textTransform: "uppercase",
      fontSize: "25px",
      fontFamily: '"Poppins-SemiBold", sans-serif',
      textAlign: "center",
      marginBottom: "28px",
    },
    formWrapper: {
      position: "relative",
      marginBottom: "25px",
    },
    input: {
      border: "1px solid #333",
      borderTop: "none",
      borderRight: "none",
      borderLeft: "none",
      display: "block",
      width: "100%",
      height: "30px",
      fontSize: "13px",
      fontFamily: '"Poppins-Regular", sans-serif',
      color: "#333",
      padding: "0",
      outline: "none",
    },
    icon: {
      position: "absolute",
      bottom: "9px",
      right: "0",
      fontSize: "16px",
      color: "#333",
    },
    button: {
      border: "none",
      width: "164px",
      height: "51px",
      margin: "auto",
      marginTop: "40px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0",
      background: "#333",
      fontSize: "15px",
      color: "#fff",
      transition: "0.3s",
    },
    buttonIcon: {
      marginLeft: "10px",
    },
  };

  return (
    <>
    <Navebar/>
    
    <div style={styles.wrapper}>
      <div style={styles.inner}>
        <div style={styles.imageHolder}>
          <img src="img/blog/blog-05.jpg" alt="" style={{ width: "100%" }} />
        </div>
        <form style={styles.form} onSubmit={handleSubmit}>
          <h3 style={styles.heading}>Login</h3>
          <div style={styles.formWrapper}>
            <input
              type="email"
              placeholder="Email Address"
              style={styles.input}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <i className="zmdi zmdi-email" style={styles.icon}></i>
          </div>
          <div style={styles.formWrapper}>
            <input
              type="password"
              placeholder="Password"
              style={styles.input}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <i className="zmdi zmdi-lock" style={styles.icon}></i>
          </div>
          <button type="submit" style={styles.button}>
            Login
            <i className="zmdi zmdi-arrow-right" style={styles.buttonIcon}></i>
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Register;
