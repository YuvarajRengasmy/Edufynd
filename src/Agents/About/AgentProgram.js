import React, { useEffect, useState } from 'react';
import Header from "../Agents/AgentHeader";
import Footer from "../Agents/AgentFooter";
import banner from '../../styles/Assets/Student/EventBanner.png';
import { CiSearch } from 'react-icons/ci';
import { Chip } from '@mui/material';
import ListCountry from "../../SuperAdmin/Admins/country";
const AgentProgram = () => {
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
                <ListCountry />
              </div>
            </div>
          </div>
        </div>
        <div className='container-fluid mt-5'>
          <div>
            <div className='px-12 mx-6'>
              <div className='mt-5'>
                <h5 className='fw-bold'>Popular Programs</h5>
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
                <h5 className='fw-bold'>Upcoming Programs</h5>
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
export default AgentProgram;
