import React, { useState, useEffect } from "react";
import { getSingleProgram, getallProgram } from "../../api/Program";
import { Link, useLocation } from "react-router-dom";
import Header from "../Home/HeaderHome";
import Footer from "../../compoents/Footer";
import { RiSchoolLine, RiFileTextLine, RiBookmark3Fill, RiBuilding2Fill, RiCoinsFill } from 'react-icons/ri';
import { AiOutlineRead } from 'react-icons/ai'
import { LiaBookSolid } from 'react-icons/lia';
import Flags from 'react-world-flags';




const Experiences = () => {

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [program, setProgram] = useState();
  const [pagination, setPagination] = useState();
  const [input, setInput] = useState()

  useEffect(() => {
    getProgramDetails();
  }, []);
  useEffect(() => {
    getAllProgaramDetails();
  }, []);

  const getAllProgaramDetails = () => {
    const data = {
      limit: 10,
      // page: pagination.from,
    };

    getallProgram(data)
      .then((res) => {

        setInput(res?.data?.result);
        setPagination({ ...pagination, count: res?.data?.result?.adminCount });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProgramDetails = () => {
    getSingleProgram(id)
      .then((res) => {
        setProgram(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className='scroll-bar' style={{}}>
        <div className='container ' >

          <div className='container-fluid d-flex flex-column border-start border-end gap-2  bg-white mt-1'>
            <div className='row gap-lg-2 gap-md-2 gap-2 p-0 mt-5 d-flex justify-content-center'>
              <div className='container mt-1'>
                <div className='row'>
                  <div className='col-lg-4'>
                    <div className='container'>
                      <div className='card shadow border-0 p-3'>
                        <div className='card shadow border-1 rounded p-3 mt-2 mb-3'>
                          <span className='text-secondary fw-bolder d-flex align-items-center justify-content-center gap-2 text-uppercase'>Similar programs <span><RiCoinsFill className='text-warning fs-4' /> </span> </span>
                        </div>
                        <div>
                          {input?.map((data, index) => (
                            <div key={index} class="card single-job-items mb-3">
                              <div class="card-body job-items d-flex align-items-center">
                                <div class="company-img mr-3">
                                  <a href="#"><img src={"https://photos.applyboard.com/schools/000/000/154/logos/small/ILAC_LOGO_1.png?1574286109"} alt="Company Logo" width="100" height="50" class="img-fluid" /></a>
                                </div>
                                <div class="job-tittle job-tittle2">
                                  <a href="#">
                                    <h4 class="card-title">{data?.universityName}</h4>
                                  </a>
                                  <ul class="list-unstyled mb-0">
                                    <li>{data?.programTitle}</li>
                                    <li><i class="fas fa-map-marker-alt"></i>  {data?.campus}-{data?.country}</li>
                                    <li>{data?.courseFee}</li>
                                  </ul>
                                </div>
                              </div>
                              <div className="col-0 text-center mt-4">
                            <Link to={{ pathname: "/ViewProgramUniversity", search: `?id=${program?._id}` }} type="button" className="btn btn-primary">Apply</Link>
                          </div>
                            </div>
                          ))}


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
                  <div className='col-lg-8 scroll-hide' style={{ maxHeight: 'calc(100vh - 50px)', overflow: 'auto' }}>
                    <div className='container'>
                      <div className="mb-2 ">
                        <img src={'https://universitystudy.ca/wp-content/uploads/2022/08/Campus_UBC_Vancouver_Aerial.png'} className="card-img-top img-fluid rounded-top-2" alt="bannerImage" style={{ maxHeight: '6rem', objectFit: 'cover' }} />
                      </div>
                      <div class="card single-job-items ">
                        <div class="card-body job-items d-flex align-items-center">
                          <div class="company-img mr-3">
                            <a href="#"><img src={"https://photos.applyboard.com/schools/000/000/154/logos/small/ILAC_LOGO_1.png?1574286109"} alt="Company Logo" width="100" height="50" class="img-fluid" /></a>
                          </div>
                          <div class="job-tittle job-tittle2 ">
                            <a href="/">
                              <h3 class="card-title font-weight-bold fs-5">{program?.programTitle}   </h3>
                              <h3 class="card-title font-weight-bold fs-5"><i class="fas fa-map-marker-alt"></i>  {program?.universityName}</h3>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className='fw-bold mt-2'>  <RiSchoolLine /> :- About</h4>
                        <div className='container card my-2 px-4'>

                          <p>{program?.academicRequirement} </p>
                        </div>
                      </div>
                      <br />
                      <div>
                        <h4 className='fw-bold mt-2'> <RiFileTextLine color="purple" />  :-Program Features</h4>
                        <div className="card">
                          <div className="card-body">
                            <div className='card border-0 p-2 mt-3' style={{ backgroundColor: "#f1f1f4" }}>
                              <div className='card-body d-flex justify-content-between'>

                                <div className='justify-content-start'>
                                  <p className='text-secondary mt-2 fw-bold'>Intake:-  <span className='text-primary fs-5 text-end'>{program?.inTake}</span></p>
                                  <p className='text-secondary mt-2 fw-bold'> CourseType:- <span className='text-primary fs-5 text-end'>{program?.courseType} </span> </p>
                                  <p className='text-secondary mt-2 fw-bold'>  Application Fees:- <span className='text-primary fs-5 text-end'>{program?.applicationFee} </span> </p>
                                  <p className='text-secondary mt-2 fw-bold'>  Currency:- <span className='text-primary fs-5 text-end'>{program?.currency} </span ></p>
                                  <p className='text-secondary mt-2 fw-bold'>flag:- <span className='text-primary fs-5 text-end'><Flags code={program?.flag} width={40} height={20} /></span> </p>
                                </div>
                                <div className=''>
                                  <p className='text-secondary mt-2 fw-bold'>    CourseType:-  <span className='text-primary fs-5 text-end'>{program?.courseType}</span></p>
                                  <p className='text-secondary mt-2 fw-bold'> CourseType:- <span className='text-primary fs-5 text-end'>{program?.courseType} </span> </p>
                                  <p className='text-secondary mt-2 fw-bold'>  Application Fees:- <span className='text-primary fs-5 text-end'>{program?.applicationFee} </span> </p>
                                  <p className='text-secondary mt-2 fw-bold'>  Currency:- <span className='text-primary fs-5 text-end'>{program?.currency} </span ></p>
                                  <p className='text-secondary mt-2 fw-bold'>flag:- <span className='text-primary fs-5 text-end'><Flags code={program?.flag} width={40} height={20} /></span> </p>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>

                    </div>
                    <button type="button" className="btn btn-primary mt-3 btn-lg justify-content-center col-center">Apply Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};
export default Experiences;
