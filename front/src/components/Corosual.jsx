import React, { useState, useEffect } from "react";

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      number: "01",
      title: "Streamline your construction process with ease!",
      heading: "Comprehensive construction management at your fingertips",
       backgroundImage: "img/banner/slide1.jpg",
      slideImage: "img/banner/slide-img-01.jpg"
    },
    {
      id: 2,
      number: "02", 
       title: "Streamline your construction process with ease!",
      heading: "Comprehensive construction management at your fingertips",
      backgroundImage: "img/banner/slide2.jpg",
      slideImage: "img/banner/slide-img-02.jpg"
    },
    {
      id: 3,
      number: "03",
       title: "Streamline your construction process with ease!",
      heading: "Comprehensive construction management at your fingertips",
      backgroundImage: "img/banner/slide3.jpg",
      slideImage: "img/banner/slide-img-03.jpg"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <style jsx>{`
        .carousel-container {
          position: relative;
          overflow: hidden;
          height: 100vh;
        }
        
        .carousel-wrapper {
          display: flex;
          transition: transform 0.5s ease-in-out;
          height: 100%;
          transform: translateX(-${currentSlide * 100}%);
        }
        
        .carousel-slide {
          min-width: 100%;
          position: relative;
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
        
        .carousel-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          align-items: center;
        }
        
        .carousel-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          z-index: 3;
          transition: background 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }
        
        .carousel-nav:hover {
          background: rgba(255, 255, 255, 0.4);
        }
        
        .carousel-nav.prev {
          left: 20px;
        }
        
        .carousel-nav.next {
          right: 20px;
        }
        
        .carousel-indicators {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 3;
        }
        
        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: background 0.3s ease;
        }
        
        .indicator.active {
          background: white;
        }
        
        .number {
          font-size: 4rem;
          font-weight: bold;
          color: rgba(255, 255, 255, 0.1);
          line-height: 1;
        }
        
        .h5 {
          font-size: 1.25rem;
        }
        
        .w-sm-85 {
          width: 85%;
        }
        
        @media (max-width: 576px) {
          .w-sm-85 {
            width: 85%;
          }
        }
      `}</style>
      
      <div className="main-wrapper">
        <div className="container-fluid full-screen top-position">
          <div className="row slider-fade1">
            <div className="carousel-container w-100">
              <div className="carousel-wrapper">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className="carousel-slide bg-img theme-overlay-dark"
                    style={{ backgroundImage: `url('${slide.backgroundImage}')` }}
                  >
                    <div className="container h-100">
                      <div className="carousel-content">
                        <div className="row align-items-center w-100">
                          <div className="col-md-8 overflow-hidden">
                            <span className="number d-block">{slide.number}</span>
                            <h3 className="mb-3 h5 text-white">
                              {slide.title}
                            </h3>
                            <h1 className="text-white mb-4 w-100 w-sm-85">
                              {slide.heading}
                            </h1>
                            <form className="form-inline ml-3">
                              {/* <input
                                className="form-control mr-sm-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                style={{
                                  border: "1px solid #ccc",
                                  borderRadius: "20px",
                                  padding: "5px 15px",
                                }}
                              /> */}
                              {/* <button
                                className="btn btn-outline-primary my-2 my-sm-0"
                                type="submit"
                                style={{ borderRadius: "20px" }}
                              >
                                Search
                              </button> */}
                            </form>
                          </div>
                          <div className="col-md-4 d-none d-md-block">
                            <div className="slider-pic text-right">
                              <img src={slide.slideImage} alt="..." />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation arrows */}
              <button className="carousel-nav prev" onClick={prevSlide}>
                &#8249;
              </button>
              <button className="carousel-nav next" onClick={nextSlide}>
                &#8250;
              </button>
              
              {/* Indicators */}
              <div className="carousel-indicators">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={`indicator ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Carousel;