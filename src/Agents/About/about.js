import React, { useState } from 'react';
import Header from "../Agents/AgentHeader";
import Footer from "../Agents/AgentFooter";
import { CiSearch } from 'react-icons/ci';

const AboutPage = () => {
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <div>
      <Header />
      <div>
        <div style={{ width: '100%', height: '400px', backgroundImage: `url(${"https://campusdirect.io/static/media/banner.b190f2c0.jpg"})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="mask" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', height: '400px' }}>
            <div className='text-center'>
              <div className='pt-4 text-light text-center ms-5'>
                <h4 className='mt-5 fw-bold'>Don't miss out!</h4>
                <h4 className='fw-bold '>Explore the vibrant events happening locally and globally.</h4>
              </div>
              <div className='mt-5 position-relative'>
                <span className="position-absolute start-25 text-center p-2 px-3 border-0" id="inputGroup-sizing-default"><CiSearch className="fs-5" /></span>
                <input
                  type="search"
                  placeholder="Search"
                  aria-describedby="button-addon3"
                  className="form-control-lg bg-light border-0 ps-5 w-50"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container-xxl py-5">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                <div className="service-item text-center pt-3">
                  <div className="p-4">
                    <i className="fa fa-3x fa-graduation-cap text-primary mb-4" />
                    <h5 className="mb-3">Skilled Instructors</h5>
                    <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                <div className="service-item text-center pt-3">
                  <div className="p-4">
                    <i className="fa fa-3x fa-globe text-primary mb-4" />
                    <h5 className="mb-3">Online Classes</h5>
                    <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                <div className="service-item text-center pt-3">
                  <div className="p-4">
                    <i className="fa fa-3x fa-home text-primary mb-4" />
                    <h5 className="mb-3">Home Projects</h5>
                    <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                <div className="service-item text-center pt-3">
                  <div className="p-4">
                    <i className="fa fa-3x fa-book-open text-primary mb-4" />
                    <h5 className="mb-3">Book Library</h5>
                    <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-xxl py-5">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s" style={{ minHeight: 400 }}>
                <div className="position-relative h-100">
                  <img className="img-fluid position-absolute w-100 h-100" src="https://themewagon.github.io/elearning/img/about.jpg" alt style={{ objectFit: 'cover' }} />
                </div>
              </div>
              <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
                <h1 className="mb-4">Welcome to eDUFYND</h1>
                <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
                <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                <div className="row gy-2 gx-4 mb-4">
                  <div className="col-sm-6">
                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2" />Skilled Instructors</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2" />Online Classes</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2" />International Certificate</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2" />Skilled Instructors</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2" />Online Classes</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2" />International Certificate</p>
                  </div>
                </div>
                <a className="btn btn-primary py-3 px-5 mt-2" href>Read More</a>
              </div>
            </div>
          </div>
        </div>
        <div className="container-xxl py-5">
          <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h1 className="mb-5">Expert Instructors</h1>
            </div>
            <div className="row g-4">
              <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                <div className="team-item bg-light">
                  <div className="overflow-hidden">
                    <img className="img-fluid" src="https://themewagon.github.io/elearning/img/team-1.jpg" alt />
                  </div>
                  <div className="position-relative d-flex justify-content-center" style={{ marginTop: '-23px' }}>
                    <div className="bg-light d-flex justify-content-center pt-2 px-1">
                      <a className="btn btn-sm-square btn-primary mx-1 " href><i className="fab fa-facebook-f" /></a>
                      <a className="btn btn-sm-square btn-primary mx-1" href><i className="fab fa-twitter" /></a>
                      <a className="btn btn-sm-square btn-primary mx-1" href><i className="fab fa-instagram" /></a>
                    </div>
                  </div>
                  <div className="text-center p-4">
                    <h5 className="mb-0">Instructor Name</h5>
                    <small>Designation</small>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                <div className="team-item bg-light">
                  <div className="overflow-hidden">
                    <img className="img-fluid" src="https://themewagon.github.io/elearning/img/team-1.jpg" alt />
                  </div>
                  <div className="position-relative d-flex justify-content-center" style={{ marginTop: '-23px' }}>
                    <div className="bg-light d-flex justify-content-center pt-2 px-1">
                      <a className="btn btn-sm-square btn-primary mx-1" href><i className="fab fa-facebook-f" /></a>
                      <a className="btn btn-sm-square btn-primary mx-1" href><i className="fab fa-twitter" /></a>
                      <a className="btn btn-sm-square btn-primary mx-1" href><i className="fab fa-instagram" /></a>
                    </div>
                  </div>
                  <div className="text-center p-4">
                    <h5 className="mb-0">Instructor Name</h5>
                    <small>Designation</small>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                <div className="team-item bg-light">
                  <div className="overflow-hidden">
                    <img className="img-fluid" src="https://themewagon.github.io/elearning/img/team-1.jpg" alt />
                  </div>
                  <div className="position-relative d-flex justify-content-center" style={{ marginTop: '-23px' }}>
                    <div className="bg-light d-flex justify-content-center pt-2 px-1">
                      <a className="btn btn-sm-square btn-primary mx-1" href><i className="fab fa-facebook-f" /></a>
                      <a className="btn btn-sm-square btn-primary mx-1" href><i className="fab fa-twitter" /></a>
                      <a className="btn btn-sm-square btn-primary mx-1" href><i className="fab fa-instagram" /></a>
                    </div>
                  </div>
                  <div className="text-center p-4">
                    <h5 className="mb-0">Instructor Name</h5>
                    <small>Designation</small>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                <div className="team-item bg-light">
                  <div className="overflow-hidden">
                    <img className="img-fluid" src="https://themewagon.github.io/elearning/img/team-1.jpg" alt />
                  </div>
                  <div className="position-relative d-flex justify-content-center" style={{ marginTop: '-23px' }}>
                    <div className="bg-light d-flex justify-content-center pt-2 px-1">
                      <a className="btn btn-sm-square btn-primary mx-1" href><i className="fab fa-facebook-f" /></a>
                      <a className="btn btn-sm-square btn-primary mx-1" href><i className="fab fa-twitter" /></a>
                      <a className="btn btn-sm-square btn-primary mx-1" href><i className="fab fa-instagram" /></a>
                    </div>
                  </div>
                  <div className="text-center p-4">
                    <h5 className="mb-0">Instructor Name</h5>
                    <small>Designation</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default AboutPage;
