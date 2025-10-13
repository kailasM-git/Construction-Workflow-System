import React from 'react'

function Services() {
  return (
    <div className="main-wrapper">
      
      {/* <!-- start service section --> */}
        <section className="pb-0">
            <div className="container">
                <div className="section-heading">
                    <h2 className="display-20 display-md-18 display-lg-16">Services We Provide</h2>
                    <p className="w-95 w-md-80 w-lg-60 w-xl-55 mx-auto mb-0">Manage consultants, contractors, suppliers, and building plans—all in one platform. Speed up your project execution and ensure quality delivery with real-time coordination and control.</p>
                </div>
                <div className="row number-ordered">
                    <div className="col-xl-3 col-md-6 mb-1-6 mb-xl-0">
                        <div className="service-wrapper">
                            <div className="mb-1-6">
                                <i className="ti-paint-roller display-14 text-primary"></i>
                            </div>
                            <h3 className="h5 mb-3">
                                <a href="#!">Interior Design</a>
                            </h3>
                            <p>Everything starts with a free consultation and project discussion.</p>
                            <a href="#!" className="read-more">read more<i className="fas fa-long-arrow-alt-right align-middle ml-2"></i></a>
                            <div className="service-counter number-ordered-item"></div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 mb-1-6 mb-xl-0">
                        <div className="service-wrapper">
                            <div className="mb-1-6">
                                <i className="ti-check-box display-14 text-primary"></i>
                            </div>
                            <h3 className="h5 mb-3">
                                <a href="#!">Landscap Design</a>
                                </h3>
                                <p>Everything starts with a free consultation and project discussion.</p>
                                <a href="#!" className="read-more">read more<i className="fas fa-long-arrow-alt-right vertical-align-middle display-30 ml-2"></i></a>
                                <div className="service-counter number-ordered-item"></div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 mb-1-6 mb-md-0">
                        <div className="service-wrapper">
                            <div className="mb-1-6">
                                <i className="ti-layers display-14 text-primary"></i>
                            </div>
                            <h3 className="h5 mb-3">
                                <a href="#!">Architecture</a>
                                </h3>
                                <p>Everything starts with a free consultation and project discussion.</p>
                                <a href="#!" className="read-more">read more<i className="fas fa-long-arrow-alt-right vertical-align-middle display-30 ml-2"></i></a>
                                <div className="service-counter number-ordered-item"></div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <div className="service-wrapper">
                            <div className="mb-1-6">
                                <i className="ti-shine display-14 text-primary"></i>
                            </div>
                            <h3 className="h5 mb-3">
                                <a href="#!">Decorations</a>
                                </h3>
                                <p>Everything starts with a free consultation and project discussion.</p>
                                <a href="#!" className="read-more">read more<i className="fas fa-long-arrow-alt-right vertical-align-middle display-30 ml-2"></i></a>
                                <div className="service-counter number-ordered-item"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* <!-- end service section --> */}

    </div>
  )
}

export default Services
