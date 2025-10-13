
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navebar() {
  const [auth, setAuth] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("yourstorage"));
    } catch (error) {
      return null;
    }
  });

  // Custom styles to keep navigation links black
  const navigationStyles = {
    navLink: {
      color: '#000000 !important',
      textDecoration: 'none',
      transition: 'none',
    },
    navLinkHover: {
      color: '#000000 !important',
    }
  };

  return (
    <div className="main-wrapper">
      {/* Custom CSS to override navigation link colors */}
      <style jsx>{`
        .navbar-nav li a,
        .navbar-nav li Link {
          color: #000000 !important;
          text-decoration: none !important;
          transition: none !important;
        }
        
        .navbar-nav li a:hover,
        .navbar-nav li a:focus,
        .navbar-nav li a:active,
        .navbar-nav li a:visited {
          color: #000000 !important;
        }
        
        .navbar-nav li Link:hover,
        .navbar-nav li Link:focus,
        .navbar-nav li Link:active,
        .navbar-nav li Link:visited {
          color: #000000 !important;
        }
        
        /* Override any scroll-based color changes */
        .header-style1.scrolled .navbar-nav li a,
        .header-style1.fixed .navbar-nav li a,
        .navbar-light .navbar-nav li a {
          color: #000000 !important;
        }
      `}</style>
      
      {/* start header section */}
      <header className="header-style1 menu_area-light">
        <div className="navbar-default">
          {/* start top search */}
          <div className="top-search bg-primary">
            <div className="container">
              <form
                className="search-form"
                action="search.html"
                method="GET"
                acceptCharset="utf-8"
              >
                <div className="input-group">
                  <span className="input-group-addon cursor-pointer">
                    <button
                      className="search-form_submit fas fa-search text-white"
                      type="submit"
                    ></button>
                  </span>
                  <input
                    type="text"
                    className="search-form_input form-control"
                    name="s"
                    autoComplete="off"
                    placeholder="Type & hit enter..."
                  />
                  <span className="input-group-addon close-search mt-1">
                    <i className="fas fa-times"></i>
                  </span>
                </div>
              </form>
            </div>
          </div>
          {/* end top search */}
          
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-lg-12">
                <div className="menu_area alt-font">
                  <nav className="navbar navbar-expand-lg navbar-light p-0">
                    <div className="navbar-header navbar-header-custom">
                      {/* start logo */}
                      <Link to="/" className="navbar">
                        <img
                          id="logo"
                          width={150}
                          height={150}
                          src="img/logos/logo-inner.png"
                          alt="logo"
                        />
                      </Link>
                      {/* end logo */}
                    </div>

                    <div className="navbar-toggler"></div>

                    {/* menu area */}
                    {auth == null ? (
                      <ul className="navbar-nav ml-auto" id="nav">
                        <li>
                          <Link to="/" style={navigationStyles.navLink}>Home</Link>
                        </li>
                        <li>
                          <Link to="/about" style={navigationStyles.navLink}>About Us</Link>
                        </li>
                        <li>
                          <Link to="/login" style={navigationStyles.navLink}>Login</Link>
                        </li>
                        <li>
                          <Link to="/admin2" style={navigationStyles.navLink}>Use-Register</Link>
                        </li>
                        <li>
                          <Link to="/admin1" style={navigationStyles.navLink}>Consult-Register</Link>
                        </li>
                      </ul>
                    ) : auth.userstatus === 2 ? (
                      <ul className="navbar-nav ml-auto" id="nav">
                        <li>
                          <Link to="/" style={navigationStyles.navLink}>Home</Link>
                        </li>
                        <li>
                          <Link to="/about" style={navigationStyles.navLink}>About Us</Link>
                        </li>
                        <li>
                          <Link to="/feedback" style={navigationStyles.navLink}>Feedback/Star Rating</Link>
                        </li>
                        <li>
                          <Link to="/contact" style={navigationStyles.navLink}>Contact Us</Link>
                        </li>
                      </ul>
                    ) : auth.userstatus === 3 ? (
                      <ul className="navbar-nav ml-auto" id="nav">
                                             <li>
                                               <Link to="/">Home</Link>
                                             </li>
                                             <li>
                                               <Link to="/about">About Us</Link>
                                             </li>
                                             <li>
                                               <Link to="/costEstimator">CostEstimator</Link>
                                             </li>
                                             <li>
                                               <Link to="/plans">Plans</Link>
                                               <ul>
                                                 <li>
                                                   <Link to="/plans">Register plan</Link>
                                                 </li>
                                                 <li>
                                                   <Link to="/viewplans">My Plans</Link>
                                                 </li>
                                                 <li>
                                                   <Link to="/paymentbyuser">payments</Link>
                                                 </li>
                                                 <li>
                                                   <Link to="/chat">Chats</Link>
                                                 </li>
                                                 <li>
                                                   <Link to="/reports">Reports</Link>
                                                 </li>
                                               </ul>
                                             </li>
                                             <li>
                                               <Link to="/profile">Profile</Link>
                                             </li>
                                             
                                           </ul>
                    ) : null}

                    {/* end menu area */}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* end header section */}
    </div>
  );
}

export default Navebar;