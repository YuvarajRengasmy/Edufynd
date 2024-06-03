import React, { useState, useEffect } from "react";
import { getSingleProgram, getallProgram } from "../../api/Program";
import { Link, useLocation } from "react-router-dom";

import { RiSchoolLine, RiFileTextLine, RiCoinsFill } from 'react-icons/ri';

import Flags from 'react-world-flags';
import { Pagination } from "@mui/material";




const Experiences = () => {

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [program, setProgram] = useState();
  const pageSize = 5;
  const [input, setInput] = useState()
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  useEffect(() => {
    getProgramDetails();
  }, []);
  useEffect(() => {
    getAllProgaramDetails();
  }, [pagination.from, pagination.to]);

  const getAllProgaramDetails = () => {
    const data = {
      limit: pageSize,

      page: pagination.from / pageSize + 1,

    };

    getallProgram(data)
      .then((res) => {

        setInput(res?.data?.result?.programList);
        setPagination({ ...pagination, count: res?.data?.result?.programCount });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
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
      <div style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
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
                                    <h4 class="card-title" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>{data?.universityName}</h4>
                                  </a>
                                  <ul class="list-unstyled mb-0">
                                    <li>{data?.programTitle}</li>
                                    <li style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}><i class="fas fa-map-marker-alt" ></i>  {data?.campus}-{data?.country}</li>
                                    <li style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>{data?.courseFee}</li>
                                  </ul>
                                </div>
                              </div>
                              <div class="card-footer items-link items-link2 d-flex justify-content-center">
                                <Link className="btn text-white" style={{ backgroundColor: "#FE5722", fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} to={{ pathname: "/ViewProgram", search: `?id=${data?._id}`, }}>View Program</Link>
                              </div>
                            </div>
                          ))}


                        </div>
                        <div className="float-right my-2">
                          <Pagination
                            count={Math.ceil(pagination.count / pageSize)}
                            onChange={handlePageChange}
                            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}
                            variant="outlined"
                            shape="rounded"
                            color="primary"
                          />
                        </div>

                      </div>
                    </div>
                  </div>
                  <div className='col-lg-8 scroll-hide' style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} >
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
                              <h3 class="card-title font-weight-bold " style={{ fontFamily: 'Plus Jakarta Sans' }}>{program?.programTitle}   </h3>
                              <h3 class="card-title font-weight-bold"><i class="fas fa-map-marker-alt"></i>  {program?.universityName}</h3>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className='fw-bold mt-2' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '18px' }}>  <RiSchoolLine /> :- About</h4>
                        <div className='container card my-2 px-4'>

                          <p>{program?.academicRequirement} </p>
                        </div>
                      </div>
                      <div className="container mt-3">
                        <h2 className="mb-1" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '18px' }}>Campus</h2>

                        <div className="row">
                          {Array.isArray(program?.campus) &&
                            program.campus.map((campus, index) => (
                              <div key={index} className="col-md-2 mt-2" >
                                <div className="card text-center">
                                  <div className="card-body">

                                    <i className="fas fa-university" />

                                    <p className="text-muted" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>{campus}</p>
                                  </div>
                                </div>
                              </div>
                            ))}

                        </div>

                      </div>
                      <div className="container mt-3">
                        <div className="position-relative p-3" >
                          <div className="position-absolute" style={{ top: '-1.5rem', left: '-1rem', transform: 'rotate(0deg)', color: 'black', padding: '.5rem 1.5rem', fontFamily: 'Plus Jakarta Sans', fontSize: '18px' }}>
                            Course Type
                          </div>
                          <div className="row">
                            {Array.isArray(program?.courseType) &&
                              program.courseType.map((courseType, index) => (
                                <div key={index} className="col-md-2 mt-3" >
                                  <div className="card text-center">
                                    <div className="card-body" style={{ background: "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",  }}>
                                      <p className="text-white" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}> {courseType}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>

                      </div>


                      <br />
                      <div>
                        <h4 className='fw-bold mt-2' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '18px' }}> <RiFileTextLine color="purple" />  :-Program Features</h4>
                        <div className="card">
                          <div className="card-body">
                            <div className='card border-0 p-2 mt-3' style={{ backgroundColor: "#f1f1f4", fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                              <div className='card-body d-flex justify-content-between'>

                                <div className='justify-content-start'>
                                  <p className='text-secondary mt-2 fw-bold'>Duration:-  <span className='text-primary fs-5 text-end'>{program?.duration}</span></p>
                                  <p className='text-secondary mt-2 fw-bold'>CourseFee:- <span className='text-primary fs-5 text-end'>{program?.courseFee} </span> </p>
                                  <p className='text-secondary mt-2 fw-bold'>  Application Fees:- <span className='text-primary fs-5 text-end'>{program?.applicationFee} </span> </p>
                                  <p className='text-secondary mt-2 fw-bold'>  Currency:- <span className='text-primary fs-5 text-end'>{program?.currency} </span ></p>
                                  <p className='text-secondary mt-2 fw-bold'>Flag:- <span className='text-primary fs-5 text-end'><Flags code={program?.flag} width={40} height={20} /></span> </p>
                                </div>
                                <div className=''>
                                <p className='text-secondary mt-2 fw-bold'> Commission:- <span className='text-primary fs-5 text-end'>{program?.commission} </span ></p>
                                  <p className='text-secondary mt-2 fw-bold'>   UniversityInterview:-  <span className='text-primary fs-5 text-end'>{program?.universityInterview}</span></p>
                                  <p className='text-secondary mt-2 fw-bold'> Gre_Gmat_Requirement:- <span className='text-primary fs-5 text-end'>{program?.greGmatRequirement}{program?.score} </span> </p>
                                  <p className='text-secondary mt-2 fw-bold'> EnglishlanguageTest <span className='text-primary fs-5 text-end'>{program?.englishLanguageTest} {program?.textBox}</span> </p>

                                </div>
                              </div>
                            </div>
                           

                          </div>
                        </div>
                      </div>

                    </div>
                    <button type="button" style={{ backgroundColor: "#FE5722", fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} className="btn text-white mt-3 btn-lg justify-content-center col-center">Apply Now</button>

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
