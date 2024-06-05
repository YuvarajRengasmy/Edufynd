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
import Flags from 'react-world-flags';
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
                      src={university?.universityLogo ? university?.universityLogo : "https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png"}
                      className="img-fluid rounded-circle" style={{ width: "150px", height: "150px" }}
                      alt="Berry College Campus"
                    />
                  </div>
                  <div className="col-md-8 d-flex justify-content-start  align-items-">
                    <div className="px-1 py-2">

                      <p className='text-white'>{university?.universityName}</p>
                      <p className="text-white">{university?.country}</p>
                      <div className='card shadow border-1 rounded p-2 mt-2 mb-2'>
                        <span className='text-secondary fw-bolder d-flex align-items-center justify-content-center gap-2 text-uppercase'>UniverSity Rank: <span><RiCoinsFill className='text-warning fs-5' /> {university?.ranking}</span> </span>
                      </div>

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
                      <li class="nav-item" role="presentation"><a class="nav-link" id="profile-tab" data-bs-toggle="tab" href="#tab-populatCourse" role="tab" aria-controls="tab-profile" aria-selected="false" tabindex="-1">popularCategories</a></li>

                    </ul>
                    <div class="tab-content mt-3" id="myTabContent" style={{ height: "350px", overflowY: "auto", scrollbarWidth: 'none' }}>
                      <div class="tab-pane fade active show" id="tab-home" role="tabpanel" aria-labelledby="home-tab">

                        <p>{university?.admissionRequirement} </p>
                      </div>
                      <div class="tab-pane fade" id="tab-profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div className='row'>
                          <div className=' border-0 pt-3 px-4'>
                            <div className='row'>
                              {Array.isArray(university?.campus) &&
                                university.campus.map((campus, index) => (
                                  <div key={index} className='col-sm-4'>
                                    <div className="card border-0 rounded-3 shadow " style={{ width: '8rem', height: "11rem" }}>
                                      <img src={university?.universityLogo ? university?.universityLogo : "https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png"} class="card-img-top " style={{ width: '8rem', height: "7rem" }} alt="img" />
                                      <div className="card-body">
                                        <p className="card-text text-center">{campus}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}

                            </div>


                          </div>
                        </div>
                      </div>
                      <div class="tab-pane fade" id="tab-populatCourse" role="tabpanel" aria-labelledby="profile-tab">
                        <div className='row'>
                          <div className=' border-0 pt-3 px-4'>
                            <div className='row'>
                              {Array.isArray(university?.popularCategories) &&
                                university.popularCategories.map((popularCategories, index) => (
                                  <div key={index} className='card shadow border-1 rounded p-2 mt-2 mb-2'>
                                    <span className='text-secondary fw-bolder d-flex align-items-center justify-content-center gap-2 text-uppercase'>  {popularCategories}</span>
                                  </div>
                                ))}

                            </div>


                          </div>
                        </div>
                      </div>

                    </div>



                  </div>


                  <div className="col-lg-6">
                    <div className="alert alert-primary text-center " role="alert">
                      A simple primary alert with an UniverSity Details.
                    </div>
                    <h4 className=" h6 text-decoration-underline text-uppercase" style={{ color: '#fe5722' }}>Info</h4>

                    <div className="card  border-0  shadow mt-3">
                      <div className="card-body">

                        <div className="row gy-3 py-2">
                          <div className="col-sm-6">
                            <div className="fs-6 fw-light text-lead text-capitalize">OfferTAT</div>
                            <div className="h6 fw-bold">{university?.offerTAT}</div>
                          </div>
                          <div className="col-sm-6">
                            <div className="fs-6 fw-light text-lead text-capitalize">Delivery Currency</div>
                            <div className="h6 fw-bold"><Flags code={university?.flag} width={40} height={20} /> {university?.currency}</div>
                          </div>
                        </div>
                        <div className="row gy-3 py-2">
                          <div className="col-sm-6">
                            <div className="fs-6 fw-light text-lead text-capitalize">AverageFees</div>
                            <div className="h6 fw-bold">{university?.averageFees}</div>
                          </div>
                          <div className="col-sm-6">
                            <div className="fs-6 fw-light text-lead text-capitalize">ApplicationFees</div>
                            <div className="h6 fw-bold">{university?.applicationFees}</div>
                          </div>
                         
                        </div>
                        <div className="row gy-3 py-2">
                        <div className="col-sm-6  ">
                            <div className="fs-6 fw-light text-lead text-capitalize">Founded</div>
                            <div className="h6 fw-bold">{university?.founded}</div>
                          </div>
                          <div className="col-sm-6">
                            <div className="fs-6 fw-light text-lead text-capitalize">InstitutionType</div>
                            <div className="h6 fw-bold">{university?.institutionType}</div>
                          </div>
                         
                        </div>
                        <div className="row gy-3 py-2">
                          <div className="col-sm-6">
                            <div className="fs-6 fw-light text-lead text-capitalize">Cost Of Living</div>
                            <div className="h6 fw-bold">{university?.costOfLiving}</div>
                          </div>
                          <div className="col-sm-6">
                            <div className="fs-6 fw-light text-lead text-capitalize">GrossTuition</div>
                            <div className="h6 fw-bold">{university?.grossTuition}</div>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div className="card  border-0  shadow mt-3">
                      <div className="card-body">

                        <div className="row gy-3 py-2">
                          <div className="col-sm-6">
                            <div className="fs-6 fw-light text-lead text-capitalize">paymentMethod</div>
                            <div className="h6 fw-bold">{university?.paymentMethod}</div>
                          </div>
                          <div className="col-sm-6">
                            <div className="fs-6 fw-light text-lead text-capitalize">amount/percentage</div>
                            <div className="h6 fw-bold">{university?.amount?university?.amount:university?.percentage?university?.percentage:"null"} </div>
                          </div>
                        </div>
                        <div className="row gy-3 py-2">
                          <div className="col-sm-6">
                            <div className="fs-6 fw-light text-lead text-capitalize">EligibilityForCommission</div>
                            <div className="h6 fw-bold">{university?.eligibilityForCommission}</div>
                          </div>
                          <div className="col-sm-6">
                            <div className="fs-6 fw-light text-lead text-capitalize">PaymentTAT</div>
                            <div className="h6 fw-bold">{university?.paymentTAT}</div>
                          </div>
                         
                        </div>
                        <div className="row gy-3 py-2">
                          <div className="col-sm-6">
                            <div className="fs-6 fw-light text-lead text-capitalize">Tax</div>
                            <div className="h6 fw-bold">{university?.tax}</div>
                          </div>
                          <div className="col-sm-6">
                            <div className="fs-6 fw-light text-lead text-capitalize">CommissionPaidOn</div>
                            <div className="h6 fw-bold">{university?.commissionPaidOn}</div>
                          </div>
                         
                        </div>
                        
                      </div>
                    </div>
                  </div>







                  <div className="row g-3">
                                        <div className="d-flex flex-row align-items-start justify-content-between">
                                            <div className="h4 text-decoration-underline text-uppercase " style={{ color: '#fe5722' }}>Other Courses You May Be Interested In</div>


                                        </div>
                                        {program?.map((data, index) => (

                                            <div key={index} className="col-lg-4">
                                                <div className="card mb-3  border-0  shadow" style={{ width: '18rem', height: '15rem' }}>
                                                    <div className="row g-0 align-items-center justify-content-center">
                                                        <div className="col-md-4">
                                                            <img
                                                                src={data?.universityLogo ? data?.universityLogo : "https://img.freepik.com/premium-vector/university-campus-logo_1447-1790.jpg"}
                                                                className="img-fluid rounded-pill"
                                                                alt="Course Image"
                                                                style={{ width: '7rem', height: '5rem' }}
                                                            />
                                                        </div>
                                                        <div className="col-md-8">
                                                            <div className="card-body">
                                                                <h5 className="card-title">{data?.universityName}</h5>
                                                                <p className="card-text">CourseName :- {data?.programTitle}</p>
                                                                <p className="card-text">Duration :- {data?.duration}</p>
                                                                <button className="btn  rounded-pill text-white text-uppercase px-4 py-2" style={{ backgroundColor: "#fe5722" }}>Apply Now</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}


                                    </div>
                                    <nav aria-label="Page navigation example justify-content-end">
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
              </div>
            </div>
          </div>
        </div>

      </div>

    </>
  )
}
export default UserProfile