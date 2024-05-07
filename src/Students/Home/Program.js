import React, { useEffect, useState } from 'react';
import Header from "./HeaderHome";
import Footer from "../../compoents/Footer";
import banner from '../../styles/Assets/Student/EventBanner.png';
import { CiSearch } from 'react-icons/ci';
import { Chip } from '@mui/material';
const Program = () => {
  return (
    <>
      <Header /><br /><br /><br />
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
                <input type="search" placeholder="Search" aria-describedby="button-addon3"  className="form-control-lg bg-light border-0 ps-5 w-50"/>
              </div>
              <div>
                <div className="container-box rotated mt-5">
                  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#popupModal">
                    Enquiry
                  </button>
                </div>
                <div className="modal fade" id="popupModal" tabIndex={-1} aria-labelledby="popupModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title fw-bold" id="popupModalLabel">Enquiry Us</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                      </div>
                      <div className="modal-body">
                        <form id="contact_form" name="contact_form" method="post">
                          <div className="mb-3">
                            <label htmlFor="email_addr" className='form-label'>Email address</label>
                            <input type="email" required maxLength={50} className="form-control" id="email_addr" name="email" placeholder="Enter The Email" />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="name_input" className='form-label'>Name</label>
                            <input type="text" required maxLength={50} className="form-control" id="name_input" name="name" placeholder="Enter The Name" />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="phone_input" className='form-label'>Phone</label>
                            <input type="tel" required maxLength={50} className="form-control" id="phone_input" name="Phone" placeholder="Enter The Phone" />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="message" className='form-label'>Message</label>
                            <textarea className="form-control" id="message" name="message" rows={3} defaultValue={""} />
                          </div>
                          <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='container-fluid '>
          <div  >
            <div className="container-fluid py-5">
              <div className="container-xxl">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                  <h1 className="mb-5">Popular University</h1>
                </div>
                <div className="row g-4 justify-content-center">
                  <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="course-item bg-light">
                      <div className="position-relative overflow-hidden">
                        <img className="img-fluid" src="https://themewagon.github.io/elearning/img/course-1.jpg" alt />
                        <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                          <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end" style={{ borderRadius: '30px 0 0 30px' }}>Read More</a>
                          <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3" style={{ borderRadius: '0 30px 30px 0' }}>Join Now</a>
                        </div>
                      </div>
                      <div className="text-center p-4 pb-0">
                        <h3 className="mb-0">$25000.00</h3>
                        <div className="mb-3">
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small>(123)</small>
                        </div>
                        <h5 className="mb-4"> University of Oxford &amp;London</h5>
                      </div>
                      <div className="d-flex border-top">
                        <small className="flex-fill text-center border-end py-2"><i className="fa fa-user-tie text-primary me-2" />John Doe</small>
                        <small className="flex-fill text-center border-end py-2"><i className="fa fa-clock text-primary me-2" />Apr-July</small>
                        <small className="flex-fill text-center py-2"><i className="fa fa-user text-primary me-2" />300 Students</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="course-item bg-light">
                      <div className="position-relative overflow-hidden">
                        <img className="img-fluid" src="https://themewagon.github.io/elearning/img/course-1.jpg" alt />
                        <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                          <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end" style={{ borderRadius: '30px 0 0 30px' }}>Read More</a>
                          <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3" style={{ borderRadius: '0 30px 30px 0' }}>Join Now</a>
                        </div>
                      </div>
                      <div className="text-center p-4 pb-0">
                        <h3 className="mb-0">$25000.00</h3>
                        <div className="mb-3">
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small>(123)</small>
                        </div>
                        <h5 className="mb-4"> University of Oxford &amp;London</h5>
                      </div>
                      <div className="d-flex border-top">
                        <small className="flex-fill text-center border-end py-2"><i className="fa fa-user-tie text-primary me-2" />John Doe</small>
                        <small className="flex-fill text-center border-end py-2"><i className="fa fa-clock text-primary me-2" />Apr-July</small>
                        <small className="flex-fill text-center py-2"><i className="fa fa-user text-primary me-2" />300 Students</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="course-item bg-light">
                      <div className="position-relative overflow-hidden">
                        <img className="img-fluid" src="https://themewagon.github.io/elearning/img/course-1.jpg" alt />
                        <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                          <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end" style={{ borderRadius: '30px 0 0 30px' }}>Read More</a>
                          <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3" style={{ borderRadius: '0 30px 30px 0' }}>Join Now</a>
                        </div>
                      </div>
                      <div className="text-center p-4 pb-0">
                        <h3 className="mb-0">$25000.00</h3>
                        <div className="mb-3">
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small>(123)</small>
                        </div>
                        <h5 className="mb-4"> University of Oxford &amp;London</h5>
                      </div>
                      <div className="d-flex border-top">
                        <small className="flex-fill text-center border-end py-2"><i className="fa fa-user-tie text-primary me-2" />John Doe</small>
                        <small className="flex-fill text-center border-end py-2"><i className="fa fa-clock text-primary me-2" />Apr-July</small>
                        <small className="flex-fill text-center py-2"><i className="fa fa-user text-primary me-2" />300 Students</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="course-item bg-light">
                      <div className="position-relative overflow-hidden">
                        <img className="img-fluid" src="https://themewagon.github.io/elearning/img/course-1.jpg" alt />
                        <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                          <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end" style={{ borderRadius: '30px 0 0 30px' }}>Read More</a>
                          <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3" style={{ borderRadius: '0 30px 30px 0' }}>Join Now</a>
                        </div>
                      </div>
                      <div className="text-center p-4 pb-0">
                        <h3 className="mb-0">$25000.00</h3>
                        <div className="mb-3">
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small>(123)</small>
                        </div>
                        <h5 className="mb-4"> University of Oxford &amp;London</h5>
                      </div>
                      <div className="d-flex border-top">
                        <small className="flex-fill text-center border-end py-2"><i className="fa fa-user-tie text-primary me-2" />John Doe</small>
                        <small className="flex-fill text-center border-end py-2"><i className="fa fa-clock text-primary me-2" />Apr-July</small>
                        <small className="flex-fill text-center py-2"><i className="fa fa-user text-primary me-2" />300 Students</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="course-item bg-light">
                      <div className="position-relative overflow-hidden">
                        <img className="img-fluid" src="https://themewagon.github.io/elearning/img/course-1.jpg" alt />
                        <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                          <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end" style={{ borderRadius: '30px 0 0 30px' }}>Read More</a>
                          <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3" style={{ borderRadius: '0 30px 30px 0' }}>Join Now</a>
                        </div>
                      </div>
                      <div className="text-center p-4 pb-0">
                        <h3 className="mb-0">$25000.00</h3>
                        <div className="mb-3">
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small>(123)</small>
                        </div>
                        <h5 className="mb-4"> University of Oxford &amp;London</h5>
                      </div>
                      <div className="d-flex border-top">
                        <small className="flex-fill text-center border-end py-2"><i className="fa fa-user-tie text-primary me-2" />John Doe</small>
                        <small className="flex-fill text-center border-end py-2"><i className="fa fa-clock text-primary me-2" />Apr-July</small>
                        <small className="flex-fill text-center py-2"><i className="fa fa-user text-primary me-2" />300 Students</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="course-item bg-light">
                      <div className="position-relative overflow-hidden">
                        <img className="img-fluid" src="https://themewagon.github.io/elearning/img/course-1.jpg" alt />
                        <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                          <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end" style={{ borderRadius: '30px 0 0 30px' }}>Read More</a>
                          <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3" style={{ borderRadius: '0 30px 30px 0' }}>Join Now</a>
                        </div>
                      </div>
                      <div className="text-center p-4 pb-0">
                        <h3 className="mb-0">$25000.00</h3>
                        <div className="mb-3">
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small>(123)</small>
                        </div>
                        <h5 className="mb-4"> University of Oxford &amp;London</h5>
                      </div>
                      <div className="d-flex border-top">
                        <small className="flex-fill text-center border-end py-2"><i className="fa fa-user-tie text-primary me-2" />John Doe</small>
                        <small className="flex-fill text-center border-end py-2"><i className="fa fa-clock text-primary me-2" />Apr-July</small>
                        <small className="flex-fill text-center py-2"><i className="fa fa-user text-primary me-2" />300 Students</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="course-item bg-light">
                      <div className="position-relative overflow-hidden">
                        <img className="img-fluid" src="https://themewagon.github.io/elearning/img/course-1.jpg" alt />
                        <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                          <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end" style={{ borderRadius: '30px 0 0 30px' }}>Read More</a>
                          <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3" style={{ borderRadius: '0 30px 30px 0' }}>Join Now</a>
                        </div>
                      </div>
                      <div className="text-center p-4 pb-0">
                        <h3 className="mb-0">$25000.00</h3>
                        <div className="mb-3">
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small>(123)</small>
                        </div>
                        <h5 className="mb-4"> University of Oxford &amp;London</h5>
                      </div>
                      <div className="d-flex border-top">
                        <small className="flex-fill text-center border-end py-2"><i className="fa fa-user-tie text-primary me-2" />John Doe</small>
                        <small className="flex-fill text-center border-end py-2"><i className="fa fa-clock text-primary me-2" />Apr-July</small>
                        <small className="flex-fill text-center py-2"><i className="fa fa-user text-primary me-2" />300 Students</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="course-item bg-light">
                      <div className="position-relative overflow-hidden">
                        <img className="img-fluid" src="https://themewagon.github.io/elearning/img/course-1.jpg" alt />
                        <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                          <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end" style={{ borderRadius: '30px 0 0 30px' }}>Read More</a>
                          <a href="#" className="flex-shrink-0 btn btn-sm btn-primary px-3" style={{ borderRadius: '0 30px 30px 0' }}>Join Now</a>
                        </div>
                      </div>
                      <div className="text-center p-4 pb-0">
                        <h3 className="mb-0">$25000.00</h3>
                        <div className="mb-3">
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small className="fa fa-star text-primary" />
                          <small>(123)</small>
                        </div>
                        <h5 className="mb-4"> University of Oxford &amp;London</h5>
                      </div>
                      <div className="d-flex border-top">
                        <small className="flex-fill text-center border-end py-2"><i className="fa fa-user-tie text-primary me-2" />John Doe</small>
                        <small className="flex-fill text-center border-end py-2"><i className="fa fa-clock text-primary me-2" />Apr-July</small>
                        <small className="flex-fill text-center py-2"><i className="fa fa-user text-primary me-2" />300 Students</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='px-12 mx-6'>
              <div className='mt-5'>
                <h5 className='fw-bold'>ListProgram </h5>
                <div className='d-flex gap-2 mt-3'>
                  <Chip label="All" className='px-2 pointer' variant='filled' />
                  <Chip label="Today" className='px-2' variant='filled' />
                  <Chip label="Tomorrow" className='px-2' variant='filled' />
                </div>
                <div className='row mt-4'>
                  <div className="col-12 col-lg-6 col-xl-4 mb-3">
                    <div className="card" style={{ width: '100%' }}>
                      <img src={banner} className="card-img-top" alt="events" style={{ width: '100%', height: 150, objectFit: 'cover' }} />
                      <div className="card-body">
                        <div className="d-flex">
                          <div className="col-3 text-center">
                            <h5><span className="text-info fw-bold">23</span> <span className="fw-bold mx-auto">Python</span></h5>
                          </div><br /><br />
                          <div className="col-6">
                            <h6 className="m-0">Pes University</h6>
                            <small>USA</small>
                            <small className="d-block">$25000</small>
                            <h6><small><ioticketsharp className="me-1"> <pidotoutlinefill> Intake<fastar className="text-info"> Jun-Augest</fastar></pidotoutlinefill></ioticketsharp></small></h6>
                          </div>
                          <div className="col-0 text-center mt-4">
                            <button type="button" className="btn btn-primary">Apply</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 col-xl-4 mb-3">
                    <div className="card" style={{ width: '100%' }}>
                      <img src={banner} className="card-img-top" alt="events" style={{ width: '100%', height: 150, objectFit: 'cover' }} />
                      <div className="card-body">
                        <div className="d-flex">
                          <div className="col-3 text-center">
                            <h5><span className="text-info fw-bold">23</span> <span className="fw-bold mx-auto">Python</span></h5>
                          </div><br /><br />
                          <div className="col-6">
                            <h6 className="m-0">Pes University</h6>
                            <small>USA</small>
                            <small className="d-block">$25000</small>
                            <h6><small><ioticketsharp className="me-1"> <pidotoutlinefill> Intake<fastar className="text-info"> Jun-Augest</fastar></pidotoutlinefill></ioticketsharp></small></h6>
                          </div>
                          <div className="col-0 text-center mt-4">
                            <button type="button" className="btn btn-primary">Apply</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 col-xl-4 mb-3">
                    <div className="card" style={{ width: '100%' }}>
                      <img src={banner} className="card-img-top" alt="events" style={{ width: '100%', height: 150, objectFit: 'cover' }} />
                      <div className="card-body">
                        <div className="d-flex">
                          <div className="col-3 text-center">
                            <h5><span className="text-info fw-bold">23</span> <span className="fw-bold mx-auto">Python</span></h5>
                          </div><br /><br />
                          <div className="col-6">
                            <h6 className="m-0">Pes University</h6>
                            <small>USA</small>
                            <small className="d-block">$25000</small>
                            <h6><small><ioticketsharp className="me-1"> <pidotoutlinefill> Intake<fastar className="text-info"> Jun-Augest</fastar></pidotoutlinefill></ioticketsharp></small></h6>
                          </div>
                          <div className="col-0 text-center mt-4">
                            <button type="button" className="btn btn-primary">Apply</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 col-xl-4 mb-3">
                    <div className="card" style={{ width: '100%' }}>
                      <img src={banner} className="card-img-top" alt="events" style={{ width: '100%', height: 150, objectFit: 'cover' }} />
                      <div className="card-body">
                        <div className="d-flex">
                          <div className="col-3 text-center">
                            <h5><span className="text-info fw-bold">23</span> <span className="fw-bold mx-auto">Python</span></h5>
                          </div><br /><br />
                          <div className="col-6">
                            <h6 className="m-0">Pes University</h6>
                            <small>USA</small>
                            <small className="d-block">$25000</small>
                            <h6><small><ioticketsharp className="me-1"> <pidotoutlinefill> Intake<fastar className="text-info"> Jun-Augest</fastar></pidotoutlinefill></ioticketsharp></small></h6>
                          </div>
                          <div className="col-0 text-center mt-4">
                            <button type="button" className="btn btn-primary">Apply</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 col-xl-4 mb-3">
                    <div className="card" style={{ width: '100%' }}>
                      <img src={banner} className="card-img-top" alt="events" style={{ width: '100%', height: 150, objectFit: 'cover' }} />
                      <div className="card-body">
                        <div className="d-flex">
                          <div className="col-3 text-center">
                            <h5><span className="text-info fw-bold">23</span> <span className="fw-bold mx-auto">Python</span></h5>
                          </div><br /><br />
                          <div className="col-6">
                            <h6 className="m-0">Pes University</h6>
                            <small>USA</small>
                            <small className="d-block">$25000</small>
                            <h6><small><ioticketsharp className="me-1"> <pidotoutlinefill> Intake<fastar className="text-info"> Jun-Augest</fastar></pidotoutlinefill></ioticketsharp></small></h6>
                          </div>
                          <div className="col-0 text-center mt-4">
                            <button type="button" className="btn btn-primary">Apply</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 col-xl-4 mb-3">
                    <div className="card" style={{ width: '100%' }}>
                      <img src={banner} className="card-img-top" alt="events" style={{ width: '100%', height: 150, objectFit: 'cover' }} />
                      <div className="card-body">
                        <div className="d-flex">
                          <div className="col-3 text-center">
                            <h5><span className="text-info fw-bold">23</span> <span className="fw-bold mx-auto">Python</span></h5>
                          </div><br /><br />
                          <div className="col-6">
                            <h6 className="m-0">Pes University</h6>
                            <small>USA</small>
                            <small className="d-block">$25000</small>
                            <h6><small><ioticketsharp className="me-1"> <pidotoutlinefill> Intake<fastar className="text-info"> Jun-Augest</fastar></pidotoutlinefill></ioticketsharp></small></h6>
                          </div>
                          <div className="col-0 text-center mt-4">
                            <button type="button" className="btn btn-primary">Apply</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-8 d-grid  col-xl-12 mx-auto'>
                  <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-end">
                      <li class="page-item disabled">
                        <a class="page-link">Previous</a>
                      </li>
                      <li class="page-item"><a class="page-link" href="#">1</a></li>
                      <li class="page-item"><a class="page-link" href="#">2</a></li>
                      <li class="page-item"><a class="page-link" href="#">3</a></li>
                      <li class="page-item">
                        <a class="page-link" href="#">Next</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className='mt-5'>
                <h5 className='fw-bold'>Program </h5>
                <div className='d-flex gap-2 mt-3'>
                  <Chip label="All" className='px-2 pointer' variant='filled' />
                  <Chip label="Today" className='px-2' variant='filled' />
                  <Chip label="Tomorrow" className='px-2' variant='filled' />
                </div>
                <div className='row mt-4'>
                  <div className="col-12 col-lg-6 col-xl-4 mb-3">
                    <div className="card" style={{ width: '100%' }}>
                      <img src={banner} className="card-img-top" alt="events" style={{ width: '100%', height: 150, objectFit: 'cover' }} />
                      <div className="card-body">
                        <div className="d-flex">
                          <div className="col-3 text-center">
                            <h5><span className="text-info fw-bold">23</span> <span className="fw-bold mx-auto">Python</span></h5>
                          </div><br /><br />
                          <div className="col-6">
                            <h6 className="m-0">Pes University</h6>
                            <small>USA</small>
                            <small className="d-block">$25000</small>
                            <h6><small><ioticketsharp className="me-1"> <pidotoutlinefill> Intake<fastar className="text-info"> Jun-Augest</fastar></pidotoutlinefill></ioticketsharp></small></h6>
                          </div>
                          <div className="col-0 text-center mt-4">
                            <button type="button" className="btn btn-primary">Apply</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 col-xl-4 mb-3">
                    <div className="card" style={{ width: '100%' }}>
                      <img src={banner} className="card-img-top" alt="events" style={{ width: '100%', height: 150, objectFit: 'cover' }} />
                      <div className="card-body">
                        <div className="d-flex">
                          <div className="col-3 text-center">
                            <h5><span className="text-info fw-bold">23</span> <span className="fw-bold mx-auto">Python</span></h5>
                          </div><br /><br />
                          <div className="col-6">
                            <h6 className="m-0">Pes University</h6>
                            <small>USA</small>
                            <small className="d-block">$25000</small>
                            <h6><small><ioticketsharp className="me-1"> <pidotoutlinefill> Intake<fastar className="text-info"> Jun-Augest</fastar></pidotoutlinefill></ioticketsharp></small></h6>
                          </div>
                          <div className="col-0 text-center mt-4">
                            <button type="button" className="btn btn-primary">Apply</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 col-xl-4 mb-3">
                    <div className="card" style={{ width: '100%' }}>
                      <img src={banner} className="card-img-top" alt="events" style={{ width: '100%', height: 150, objectFit: 'cover' }} />
                      <div className="card-body">
                        <div className="d-flex">
                          <div className="col-3 text-center">
                            <h5><span className="text-info fw-bold">23</span> <span className="fw-bold mx-auto">Python</span></h5>
                          </div><br /><br />
                          <div className="col-6">
                            <h6 className="m-0">Pes University</h6>
                            <small>USA</small>
                            <small className="d-block">$25000</small>
                            <h6><small><ioticketsharp className="me-1"> <pidotoutlinefill> Intake<fastar className="text-info"> Jun-Augest</fastar></pidotoutlinefill></ioticketsharp></small></h6>
                          </div>
                          <div className="col-0 text-center mt-4">
                            <button type="button" className="btn btn-primary">Apply</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 col-xl-4 mb-3">
                    <div className="card" style={{ width: '100%' }}>
                      <img src={banner} className="card-img-top" alt="events" style={{ width: '100%', height: 150, objectFit: 'cover' }} />
                      <div className="card-body">
                        <div className="d-flex">
                          <div className="col-3 text-center">
                            <h5><span className="text-info fw-bold">23</span> <span className="fw-bold mx-auto">Python</span></h5>
                          </div><br /><br />
                          <div className="col-6">
                            <h6 className="m-0">Pes University</h6>
                            <small>USA</small>
                            <small className="d-block">$25000</small>
                            <h6><small><ioticketsharp className="me-1"> <pidotoutlinefill> Intake<fastar className="text-info"> Jun-Augest</fastar></pidotoutlinefill></ioticketsharp></small></h6>
                          </div>
                          <div className="col-0 text-center mt-4">
                            <button type="button" className="btn btn-primary">Apply</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 col-xl-4 mb-3">
                    <div className="card" style={{ width: '100%' }}>
                      <img src={banner} className="card-img-top" alt="events" style={{ width: '100%', height: 150, objectFit: 'cover' }} />
                      <div className="card-body">
                        <div className="d-flex">
                          <div className="col-3 text-center">
                            <h5><span className="text-info fw-bold">23</span> <span className="fw-bold mx-auto">Python</span></h5>
                          </div><br /><br />
                          <div className="col-6">
                            <h6 className="m-0">Pes University</h6>
                            <small>USA</small>
                            <small className="d-block">$25000</small>
                            <h6><small><ioticketsharp className="me-1"> <pidotoutlinefill> Intake<fastar className="text-info"> Jun-Augest</fastar></pidotoutlinefill></ioticketsharp></small></h6>
                          </div>
                          <div className="col-0 text-center mt-4">
                            <button type="button" className="btn btn-primary">Apply</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 col-xl-4 mb-3">
                    <div className="card" style={{ width: '100%' }}>
                      <img src={banner} className="card-img-top" alt="events" style={{ width: '100%', height: 150, objectFit: 'cover' }} />
                      <div className="card-body">
                        <div className="d-flex">
                          <div className="col-3 text-center">
                            <h5><span className="text-info fw-bold">23</span> <span className="fw-bold mx-auto">Python</span></h5>
                          </div><br /><br />
                          <div className="col-6">
                            <h6 className="m-0">Pes University</h6>
                            <small>USA</small>
                            <small className="d-block">$25000</small>
                            <h6><small><ioticketsharp className="me-1"> <pidotoutlinefill> Intake<fastar className="text-info"> Jun-Augest</fastar></pidotoutlinefill></ioticketsharp></small></h6>
                          </div>
                          <div className="col-0 text-center mt-4">
                            <button type="button" className="btn btn-primary">Apply</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-8 d-grid  col-xl-12 mx-auto'>
                  <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-end">
                      <li class="page-item disabled">
                        <a class="page-link">Previous</a>
                      </li>
                      <li class="page-item"><a class="page-link" href="#">1</a></li>
                      <li class="page-item"><a class="page-link" href="#">2</a></li>
                      <li class="page-item"><a class="page-link" href="#">3</a></li>
                      <li class="page-item">
                        <a class="page-link" href="#">Next</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
};
export default Program;
