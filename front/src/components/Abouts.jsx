import React from 'react'
import Header from './Header'
import Navebar from '../user/Navebar'
import Corosual from './Corosual'
function Abouts() {
  return (
    <>
      <style jsx>{`
        .main-wrapper {
          width: 100%;
          position: relative;
        }
        
        .full-screen {
          min-height: 100vh;
        }
        
        .top-position {
          position: relative;
          top: 0;
        }
        
        .slider-fade1 {
          position: relative;
        }
        
        .owl-carousel {
          position: relative;
          width: 100%;
        }
        
        .item {
          position: relative;
          min-height: 100vh;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        
        .theme-overlay-dark::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1;
        }
        
        .h-100 {
          height: 100%;
        }
        
        .w-100 {
          width: 100%;
        }
        
        .d-table {
          display: table;
        }
        
        .d-table-cell {
          display: table-cell;
        }
        
        .align-middle {
          vertical-align: middle;
        }
        
        .caption {
          position: relative;
          z-index: 2;
        }
        
        .overflow-hidden {
          overflow: hidden;
        }
        
        .number {
          font-size: 4rem;
          font-weight: bold;
          color: rgba(255, 255, 255, 0.3);
          line-height: 1;
        }
        
        .d-block {
          display: block;
        }
        
        .mb-3 {
          margin-bottom: 1rem;
        }
        
        .h5 {
          font-size: 1.25rem;
        }
        
        .text-white {
          color: white;
        }
        
        .mb-4 {
          margin-bottom: 1.5rem;
        }
        
        .w-sm-85 {
          width: 85%;
        }
        
        .butn {
          display: inline-block;
          padding: 12px 30px;
          background: linear-gradient(45deg, #ff6b6b, #ee5a52);
          color: white;
          text-decoration: none;
          border-radius: 5px;
          transition: all 0.3s ease;
          font-weight: 500;
        }
        
        .butn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
          color: white;
          text-decoration: none;
        }
        
        .d-none {
          display: none;
        }
        
        .d-md-block {
          display: block;
        }
        
        .slider-pic {
          text-align: right;
        }
        
        .slider-pic img {
          max-width: 100%;
          height: auto;
          border-radius: 10px;
        }
        
        .mb-6 {
          margin-bottom: 3rem;
        }
        
        .mb-lg-0 {
          margin-bottom: 0;
        }
        
        .text-primary {
          color: #ff6b6b;
        }
        
        .text-uppercase {
          text-transform: uppercase;
        }
        
        .h6 {
          font-size: 1rem;
        }
        
        .mb-2 {
          margin-bottom: 0.5rem;
        }
        
        .display-18 {
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1.2;
        }
        
        .display-md-16 {
          font-size: 3rem;
        }
        
        .display-lg-14 {
          font-size: 3.5rem;
        }
        
        .mb-1-6 {
          margin-bottom: 1.6rem;
        }
        
        .display-29 {
          font-size: 1.1rem;
          line-height: 1.6;
        }
        
        .display-md-28 {
          font-size: 1.2rem;
        }
        
        .counter-box {
          position: relative;
          display: flex;
          align-items: center;
          margin-top: 2rem;
        }
        
        .counter-border {
          width: 4px;
          height: 80px;
          background: #ff6b6b;
          margin-right: 20px;
        }
        
        .counter-content {
          flex: 1;
        }
        
        .counter-number {
          font-size: 3rem;
          font-weight: bold;
          color: #ff6b6b;
          margin-bottom: 0;
        }
        
        .counter-info {
          font-size: 0.9rem;
          color: #666;
          line-height: 1.3;
        }
        
        .pl-lg-6 {
          padding-left: 3rem;
        }
        
        .pl-xl-12 {
          padding-left: 6rem;
        }
        
        .dots-image {
          position: relative;
        }
        
        .position-relative {
          position: relative;
        }
        
        .bg-img {
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        
        .text-center {
          text-align: center;
        }
        
        .py-10 {
          padding-top: 5rem;
          padding-bottom: 5rem;
        }
        
        .py-sm-14 {
          padding-top: 7rem;
          padding-bottom: 7rem;
        }
        
        .py-md-16 {
          padding-top: 8rem;
          padding-bottom: 8rem;
        }
        
        .py-lg-20 {
          padding-top: 10rem;
          padding-bottom: 10rem;
        }
        
        .rounded {
          border-radius: 10px;
        }
        
        .z-index-9 {
          z-index: 9;
        }
        
        .z-index-1 {
          z-index: 1;
        }
        
        .py-6 {
          padding-top: 3rem;
          padding-bottom: 3rem;
        }
        
        .popup-social-video {
          display: inline-block;
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          text-align: center;
          line-height: 80px;
          color: #ff6b6b;
          font-size: 1.5rem;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        
        .popup-social-video:hover {
          background: white;
          transform: scale(1.1);
          color: #ff6b6b;
          text-decoration: none;
        }
        
        .video_btn span {
          position: relative;
          left: 2px;
        }
        
        .dots {
          position: absolute;
          bottom: -50px;
          right: -50px;
          width: 100px;
          height: 100px;
          background-image: radial-gradient(circle, #ff6b6b 2px, transparent 2px);
          background-size: 20px 20px;
          opacity: 0.3;
          z-index: -1;
        }
        
        @media (max-width: 768px) {
          .d-md-block {
            display: none !important;
          }
          
          .display-18 {
            font-size: 2rem;
          }
          
          .pl-lg-6, .pl-xl-12 {
            padding-left: 0;
          }
          
          .w-sm-85 {
            width: 100%;
          }
          
          .counter-box {
            margin-top: 1rem;
          }
        }
        
        @media (min-width: 769px) {
          .d-none.d-md-block {
            display: block !important;
          }
        }
        
        @media (min-width: 992px) {
          .mb-lg-0 {
            margin-bottom: 0 !important;
          }
          
          .pl-lg-6 {
            padding-left: 3rem !important;
          }
        }
        
        @media (min-width: 1200px) {
          .pl-xl-12 {
            padding-left: 6rem !important;
          }
        }
      `}</style>
      
      <div className="main-wrapper">
        <Header/>
        
        <Corosual/>
        
        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mb-6 mb-lg-0">
                <h3 className="text-primary text-uppercase h6 mb-2">Working since 1992</h3>
                <h2 className="display-18 display-md-16 display-lg-14 mb-1-6">We are world best construction company</h2>
                <p className="display-29 display-md-28 mb-6">
                 Since 1992, we’ve been transforming construction management with expert consultancy, efficient planning, and trusted partnerships—serving both residential and commercial projects with excellence.
                </p>
                <div className="counter-box">
                  <div className="counter-border"></div>
                  <div className="counter-content">
                    <p className="counter-number mb-0 countup">28</p>
                    <span className="counter-info">
                      Years<br/>
                      Experience<br/>
                      Working
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="pl-lg-6 pl-xl-12 dots-image">
                  <div className="position-relative bg-img text-center py-10 py-sm-14 py-md-16 py-lg-20 rounded theme-overlay-dark z-index-9" style={{ backgroundImage: "url('img/content/about-01.jpg')" }}>
                    <div className="position-relative z-index-1 py-6">
                      <a className="popup-social-video video_btn" href="https://www.youtube.com/watch?v=x7gqoHNgO-g">
                        <span>
                          <i className="fas fa-play"></i>
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="dots"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Abouts








