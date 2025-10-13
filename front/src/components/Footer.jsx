import React from 'react'

function Footer() {
  return (
    <div>
{/* 
<!-- start footer section --> */}
        <footer className="pt-6 pt-md-8 pt-lg-9">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 mb-2-5 mb-lg-0">
                        <div className="mb-1-6"><img src="img/logos/logo-footer.png" alt="..."/></div>
                        <ul className="contact-list">
                            <li>
                                <h6>Address</h6>
                                <p>691003 kailasamangalam kollam </p>
                            </li>
                            <li>
                                <h6>Phone</h6>
                                <p>9061971540<br/>
                                    {/* <span>Mon - Fri: </span> 9.00 AM to 6.00 PM */}
                                </p>
                            </li>
                            <li>
                                <h6>Email</h6>
                                <p>kailasmohanan2019@gmaill.com<br/> info@youremail.com</p>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-2-5 mb-lg-0">
                        <div className="pl-lg-2">
                            <h3 className="footer-title h5">Services</h3>
                            <ul className="footer-list">
                                <li><a href="#!">Floor Design</a></li>
                                <li><a href="#!">Interior Design</a></li>
                                <li><a href="#!">Make Overs</a></li>
                                <li><a href="#!">Architecture</a></li>
                                <li><a href="#!">Decorative Services</a></li>
                                <li><a href="#!">Landscap Design</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-2-5 mb-md-0">
                        <div className="pl-lg-3">
                            <h3 className="footer-title h5">Recent News</h3>
                            <div className="media mb-1-6">
                                <img className="mr-3" src="img/instagram/insta-01.jpg" alt="..."/>
                                <div className="media-body align-self-center">
                                    <h4 className="h6"><a href="#!" className="text-white">Renovation Design</a></h4>
                                    <span className="display-30 text-white">Sep 20, 2025</span>
                                </div>
                            </div>
                            <div className="media mb-1-6">
                                <img className="mr-3" src="img/instagram/insta-02.jpg" alt="..."/>
                                <div className="media-body align-self-center">
                                    <h4 className="h6"><a href="#!" className="text-white">Luxury Room Design</a></h4>
                                    <span className="display-30 text-white">Aug 18, 2020</span>
                                </div>
                            </div>
                            <div className="media">
                                <img className="mr-3" src="img/instagram/insta-03.jpg" alt="..."/>
                                <div className="media-body align-self-center">
                                    <h4 className="h6"><a href="#!" className="text-white">Furnishing Design</a></h4>
                                    <span className="display-30 text-white">Jul 15, 2025</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="pl-lg-3">
                            <div className="footer-carousel owl-carousel owl-theme">
                                <div className="single-item">
                                    <div>
                                        <img src="img/content/brochures-01.jpg" alt="..."/>
                                    </div>
                                    <div className="title-holder">
                                        <h4><a href="#!">Residential Design Brochure</a></h4>
                                        <a href="#!" className="read-more">read more<i className="fas fa-long-arrow-alt-right vertical-align-middle display-30 ml-2"></i></a>
                                    </div>
                                </div>
                                <div className="single-item">
                                    <div>
                                        <img src="img/content/brochures-02.jpg" alt="..."/>
                                    </div>
                                    <div className="title-holder">
                                        <h4><a href="#!">Floor Design Brochure</a></h4>
                                        <a href="#!" className="read-more">read more<i className="fas fa-long-arrow-alt-right vertical-align-middle display-30 ml-2"></i></a>
                                    </div>
                                </div>
                                <div className="single-item">
                                    <div>
                                        <img src="img/content/brochures-03.jpg" alt="..."/>
                                    </div>
                                    <div className="title-holder">
                                        <h4><a href="#!">Renovation Design Brochure</a></h4>
                                        <a href="#!" className="read-more">read more<i className="fas fa-long-arrow-alt-right vertical-align-middle display-30 ml-2"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bar  mt-6 mt-md-8 mt-lg-9">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-2 mb-md-0 text-left">
                            <p className="display-31 display-lg-30 mb-0 text-black">� 2025 Construction Powered by <a href="#!" target="_blank" className="white-hover">www.constructionworkflowautomatiom.com</a></p>
                        </div>
                        <div className="col-md-6 text-md-right">
                            <p className="text-black d-inline-block font-weight-600 mr-2 mb-0">We are on:</p>
                            <ul className="share-post">
                                <li>
                                    <a href="#!" className="white-hover"><i className="fab fa-facebook-f"></i></a>
                                </li>
                                <li>
                                    <a href="#!" className="white-hover"><i className="fab fa-twitter"></i></a>
                                </li>
                                <li>
                                    <a href="#!" className="white-hover"><i className="fab fa-youtube"></i></a>
                                </li>
                                <li>
                                    <a href="#!" className="white-hover"><i className="fab fa-linkedin-in"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        {/* <!-- end footer section --> */}
      
    </div>
  )
}

export default Footer
