import React from 'react'
import Header from './Header'
import Services from './Services'
import Projectsection from './Projectsection'
import Team from './Team'
import Testimo from './Testimo'
import Blog from './Blog'
import Partner from './Partner'
import Abouts from './Abouts'
import Footer from './Footer'
import Process from './Process'


function Slideshow() {
  return (
    
    <div className="main-wrapper">
        {/* <!-- start header section --> */}
   
      <Header/>
      {/* <!-- start slideshow section --> */}
        <div className="container-fluid full-screen top-position">
            <div className="row slider-fade1">
                <div className="owl-carousel owl-theme w-100">
                    <div className="item bg-img theme-overlay-dark" data-overlay-dark="5" style={{ backgroundImage: "url('img/banner/slide1.jpg')" }}>
                        <div className="container h-100">
                            <div className="d-table h-100 w-100">
                                <div className="d-table-cell align-middle caption">
                                    <div className="row align-items-center">
                                        <div className="col-md-8 overflow-hidden">
                                            <span className="number d-block">01</span>
                                            <h3 className="mb-3 h5">The best interior design ever!</h3>
                                            <h1 className="text-white mb-4 w-100 w-sm-85">Best interior services in interior industry</h1>
                                            
                                        </div>
                                        <div className="col-md-4 d-none d-md-block">
                                            <div className="slider-pic text-right">
                                                <img src="img/banner/slide-img-01.jpg" alt="..." />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item bg-img theme-overlay-dark" data-overlay-dark="5" style={{ backgroundImage: "url('img/banner/slide2.jpg')" }}>
                        <div className="container h-100">
                            <div className="d-table h-100 w-100">
                                <div className="d-table-cell align-middle caption">
                                    <div className="row align-items-center">
                                        <div className="col-md-8 overflow-hidden">
                                            <span className="number d-block">02</span>
                                            <h3 className="mb-3 h5">The best interior design ever!</h3>
                                            <h1 className="text-white mb-4 w-100 w-sm-85">Creative mind is key to more innovative</h1>

                                        </div>
                                        <div className="col-md-4 d-none d-md-block">
                                            <div className="slider-pic text-right">
                                                <img src="img/banner/slide-img-02.jpg" alt="..." />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item bg-img theme-overlay-dark" data-overlay-dark="5" style={{ backgroundImage: "url('img/banner/slide3.jpg')" }}>
                        <div className="container h-100">
                            <div className="d-table h-100 w-100">
                                <div className="d-table-cell align-middle caption">
                                    <div className="row align-items-center">
                                        <div className="col-md-8 overflow-hidden">
                                            <span className="number d-block">03</span>
                                            <h3 className="mb-3 h5">The best interior design ever!</h3>
                                            <h1 className="text-white mb-4 w-100 w-sm-85">Perfect synergy of classic and modern</h1>
                                            
                                          

                                        </div>
                                        <div className="col-md-4 d-none d-md-block">
                                            <div className="slider-pic text-right">
                                                <img src="img/banner/slide-img-03.jpg" alt="..." />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- end slideshow section --> */}
        <Services/>
        <Projectsection/>
        <Process/>
        <Team/> 
        <Testimo/>
        <Blog/> 
        <Partner/>
    
        <Abouts/>
        
            
        <Footer/>
        {/* <!-- end footer section --> */}       
        


    </div>
  )
}

export default Slideshow
