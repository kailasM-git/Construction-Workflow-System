import React from 'react'

function Process() {
  return (
    <div className="main-wrapper">
      
      {/* <!-- start process section --> */}
        <section className="pb-0">
            <div className="container">
                <div className="section-heading">
                    <h2 className="display-20 display-md-18 display-lg-16">Our Work Process</h2>
                    <p className="w-95 w-md-80 w-lg-60 w-xl-55 mx-auto mb-0">  Empowering seamless collaboration between consultants, contractors, and suppliers to deliver high-quality construction projects on time and within budget.</p>
                </div>
                <div className="row process-order">
                    <div className="col-lg-4 mb-1-9 mb-md-2-5 mb-lg-0">
                        <div className="process-wrapper process-down-arrow">
                            <div className="icon-box">
                                <i className="ti-blackboard"></i>
                            </div>
                            <div className="process-content">
                                <h4 className="h5 mb-3">Request a meeting</h4>
                                <p className="mb-0 w-95 mx-auto">We have a long and proud his story given to interioe and architecture</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-1-9 mb-md-2-5 mb-lg-0">
                        <div className="process-wrapper process-up-arrow">
                            <div className="icon-box">
                                <i className="ti-write"></i>
                            </div>
                            <div className="process-content">
                                <h4 className="h5 mb-3">Needs and planning</h4>
                                <p className="mb-0 w-95 mx-auto">We have a long and proud his story given to interioe and architecture</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="process-wrapper">
                            <div className="icon-box">
                                <i className="ti-home"></i>
                            </div>
                            <div className="process-content">
                                <h4 className="h5 mb-3">Let’s make it happen</h4>
                                <p className="mb-0 w-95 mx-auto">We have a long and proud his story given to interioe and architecture</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* <!-- end process section --> */}

    </div>
  )
}

export default Process
