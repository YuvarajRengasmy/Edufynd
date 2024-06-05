import { CiLinkedin } from 'react-icons/ci'
import { RiCoinsFill } from 'react-icons/ri'
import { SiGnuprivacyguard } from 'react-icons/si'
import { Link, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { RiProjectorFill, RiMapPin2Line, RiSchoolLine, RiFileTextLine } from 'react-icons/ri';
import banner from '../../styles/Assets/Student/EventBanner.png';
import { getSingleUniversity, UniversityProgram } from "../../api/university";
import { getallProgram, getUniversityProgram } from "../../api/Program";
import { CiSearch } from 'react-icons/ci';
import { Chip } from '@mui/material';

import { Input } from 'reactstrap'
import Sidebar from '../../compoents/sidebar';
const UserProfile = () => {
  const location = useLocation();
  const universityId = new URLSearchParams(location.search).get("id");
  const [university, setUniversity] = useState();
  const [program, setProgram] = useState([]);
  const pageSize = 5;
  const [filter, setFilter] = useState(false);
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  useEffect(() => {
    getUniversityDetails();
    filter ? filterProgramList() : getAllProgram();
  }, [universityId, pagination.from, pagination.to]);

  const getUniversityDetails = () => {
    getSingleUniversity(universityId)
      .then((res) => {
        setUniversity(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllProgram = () => {
    const data = {
      limit: pageSize,
      page: pagination.from,
      universityId: universityId
    };

    getallProgram(data)
      .then((res) => {
        console.log(res);
        setProgram(res?.data?.result?.programList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.programCount,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterProgramList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
      universityName: university?.universityName,
      universityId: university?._id,
      limit: 10,
      page: pagination.from,
    };
    getUniversityProgram(data)
      .then((res) => {
        setProgram(res?.data?.result?.programList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.programCount,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <div className='col-lg-2'>
            <Sidebar />
          </div>
          <div className="col-lg-10">
            <div className="card border-0 rounded-2 mt-3  ">

              <div className="card-header rounded-top border-0   img-1 ">
                <div className="row g-3 mt-2">
                  <div className="col-md-4 d-flex justify-content-center align-items-start">
                    <img
                      src={university?.universityLogo?university?.universityLogo:"https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png"}
                      className="img-fluid rounded-circle" style={{ width: "150px", height: "150px" }}
                      alt="Berry College Campus"
                    />
                  </div>
                  <div className="col-md-8 d-flex justify-content-start  align-items-">
                    <div className="px-1 py-2">

                      <p className='text-white'>University of North Alabama - EduCo</p>
                      <p className="text-white">Alabama, United States</p>
                      <button className="btn  rounded-pill text-white text-uppercase px-4 py-2" style={{ backgroundColor: "#fe5722" }}>See All Courses</button>
                    </div>
                  </div>
                </div>




              </div>
              <div className="card-body bg-white rounded-bottom px-4">
                <div className="row mt-2 g-4">
                  <div className="col-lg-6">

                    <ul class="nav nav-underline fs-9" id="myTab" role="tablist">
                      <li class="nav-item" role="presentation"><a class="nav-link active " id="home-tab" data-bs-toggle="tab" href="#tab-home" role="tab" aria-controls="tab-home" aria-selected="true">Overview</a></li>
                      <li class="nav-item" role="presentation"><a class="nav-link" id="profile-tab" data-bs-toggle="tab" href="#tab-profile" role="tab" aria-controls="tab-profile" aria-selected="false" tabindex="-1">Campus</a></li>

                    </ul>
                    <div class="tab-content mt-3" id="myTabContent" style={{ height: "350px", overflowY: "auto", scrollbarWidth: 'none' }}>
                      <div class="tab-pane fade active show" id="tab-home" role="tabpanel" aria-labelledby="home-tab">
                        <p>The Chepauk campus of the university houses the administrative buildings, the historic Senate House, central library, clock tower, centenary auditorium, and several departments under arts, humanities and social science streams. The Department of Mathematics of the university is operated as the Ramanujan Institute for Advanced Study in Mathematics located close to the Chepauk campus.</p>
                      </div>
                      <div class="tab-pane fade" id="tab-profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div className='row'>
                          <div className=' border-0 pt-3 px-4'>
                            <div className='row'>
                              <div className='col-sm-4'>
                                <div className="card border-0 rounded-3  shadow " style={{ width: '8rem', height: "11rem" }}>
                                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS38o7kpcUznfQ3uhLAt0VBK-eXUbki7vRj1Q&s" class="card-img-top rounded-circle" alt="img" />
                                  <div className="card-body">
                                    <p className="card-text text-center">University</p>
                                  </div>
                                </div>
                              </div>
                              <div className='col-sm-4'>
                                <div className="card border-0 rounded-3   shadow" style={{ width: '8rem', height: "11rem" }}>
                                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS38o7kpcUznfQ3uhLAt0VBK-eXUbki7vRj1Q&s" class="card-img-top rounded-circle" alt="img" />
                                  <div className="card-body">
                                    <p className="card-text text-center">University</p>
                                  </div>
                                </div>
                              </div>
                              <div className='col-sm-4'>
                                <div className="card border-0 rounded-3 shadow" style={{ width: '8rem', height: "11rem" }}>
                                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS38o7kpcUznfQ3uhLAt0VBK-eXUbki7vRj1Q&s" class="card-img-top rounded-circle" alt="img" />
                                  <div className="card-body">
                                    <p className="card-text text-center">University</p>
                                  </div>
                                </div>
                              </div>
                              <div className='col-sm-4'>
                                <div className="card border-0 rounded-3  shadow " style={{ width: '8rem', height: "11rem" }}>
                                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS38o7kpcUznfQ3uhLAt0VBK-eXUbki7vRj1Q&s" class="card-img-top rounded-circle" alt="img" />
                                  <div className="card-body">
                                    <p className="card-text text-center">University</p>
                                  </div>
                                </div>
                              </div>
                              <div className='col-sm-4'>
                                <div className="card border-0 rounded-3  shadow " style={{ width: '8rem', height: "11rem" }}>
                                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS38o7kpcUznfQ3uhLAt0VBK-eXUbki7vRj1Q&s" class="card-img-top rounded-circle" alt="img" />
                                  <div className="card-body">
                                    <p className="card-text text-center">University </p>
                                  </div>
                                </div>
                              </div>
                              <div className='col-sm-4'>
                                <div className="card border-0 rounded-3  shadow " style={{ width: '8rem', height: "11rem" }}>
                                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS38o7kpcUznfQ3uhLAt0VBK-eXUbki7vRj1Q&s" class="card-img-top rounded-circle" alt="img" />
                                  <div className="card-body">
                                    <p className="card-text text-center">University </p>
                                  </div>
                                </div>
                              </div>
                            </div>


                          </div>
                        </div>
                      </div>

                    </div>



                  </div>


                  <div className="col-lg-6">
                    <div className="alert alert-primary text-center " role="alert">
                      A simple primary alert with an example link.
                    </div>
                    <h4 className=" h6 text-decoration-underline text-uppercase" style={{ color: '#fe5722' }}>Info</h4>

                    <div className="card  border-0  shadow mt-3">
                      <div className="card-body">

                        <div className="row gy-3 py-2">
                          <div className="col-sm-6">
                            <div className="fs-6 fw-light text-lead text-capitalize">intake months</div>
                            <div className="h6 fw-bold">January, June, August</div>
                          </div>
                          <div className="col-sm-6">
                            <div className="fs-6 fw-light text-lead text-capitalize">Delivery Locations</div>
                            <div className="h6 fw-bold">United States</div>
                          </div>
                        </div>
                        <div className="row gy-3 py-2">
                          <div className="col-sm-6">
                            <div className="fs-6 fw-light text-lead text-capitalize">Qualification</div>
                            <div className="h6 fw-bold">Master's Degree</div>
                          </div>
                          <div className="col-sm-6 ">
                            <div className="fs-6 fw-light text-lead text-capitalize">Estimated Annual Course Fee</div>
                            <div className="h6 fw-bold">USD 15,750</div>
                          </div>
                        </div>
                        <div className="row gy-3 py-2">
                          <div className="col-sm-6">
                            <div className="fs-6 fw-light text-lead text-capitalize">Duration</div>
                            <div className="h6 fw-bold">18 Months</div>
                          </div>
                          <div className="col-sm-6">
                            <div className="fs-6 fw-light text-lead text-capitalize">Post-study Visa</div>
                            <div className="h6 fw-bold">N/A</div>
                          </div>
                        </div>
                        <div className="row gy-3 py-2">
                          <div className="col-sm-6">
                            <div className="fs-6 fw-light text-lead text-capitalize">CRICOS</div>
                            <div className="h6 fw-bold">N/A</div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>







                  <div className="row g-3">
                    <div className="d-flex flex-row align-items-start justify-content-between">
                      <div className="h4 text-decoration-underline text-uppercase " style={{ color: '#fe5722' }}>Other Courses You May Be Interested In</div>
                      <nav aria-label="Page navigation example">
                        <ul className="pagination">
                          <li className="page-item">
                            <a className="page-link" href="#" aria-label="Previous">
                              <span aria-hidden="true">&laquo;</span>
                            </a>
                          </li>
                          <li className="page-item"><a className="page-link" href="#">1</a></li>
                          <li className="page-item"><a className="page-link" href="#">2</a></li>

                          <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next">
                              <span aria-hidden="true">&raquo;</span>
                            </a>
                          </li>
                        </ul>
                      </nav>

                    </div>


                    <div className="col-lg-4">
                      <div className="card mb-3  border-0  shadow" >
                        <div className="row g-0 align-items-center justify-content-center">
                          <div className="col-md-4">
                            <img
                              src="https://img.freepik.com/premium-vector/university-campus-logo_1447-1790.jpg"
                              className="img-fluid rounded-circle"
                              alt="Course Image"
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="card-body">
                              <h5 className="card-title">Master of Education</h5>
                              <p className="card-text">1 year</p>
                              <button className="btn  rounded-pill text-white text-uppercase px-4 py-2" style={{ backgroundColor: "#fe5722" }}>Apply Now</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="card mb-3  border-0  shadow">
                        <div className="row g-0 align-items-center justify-content-center">
                          <div className="col-md-4 ">
                            <img
                              src="https://i.pinimg.com/736x/5f/7a/ff/5f7aff7fcf3ebcfaf8038b480a5b51c8.jpg"
                              className="img-fluid rounded-circle"
                              alt="Course Image"
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="card-body">
                              <h5 className="card-title">Master of Education</h5>
                              <p className="card-text">1 year</p>
                              <button className="btn  rounded-pill text-white text-uppercase px-4 py-2" style={{ backgroundColor: "#fe5722" }}>Apply Now</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="card mb-3  border-0  shadow">
                        <div className="row g-0 align-items-center justify-content-center">
                          <div className="col-md-4">
                            <img
                              src="https://static.vecteezy.com/system/resources/previews/023/360/153/original/university-college-school-badge-logo-design-image-education-badge-logo-design-university-high-school-emblem-vector.jpg"
                              className="img-fluid rounded-circle"
                              alt="Course Image"
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="card-body">
                              <h5 className="card-title">Master of Education</h5>
                              <p className="card-text">1 year</p>
                              <button className="btn  rounded-pill text-white text-uppercase px-4 py-2" style={{ backgroundColor: "#fe5722" }}>Apply Now</button>
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
        </div>

      </div>

    </>
  )
}
export default UserProfile