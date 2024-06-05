import React, { useEffect, useState } from 'react';
import Header from "./HeaderHome";
import "../../styles/Student/university.css"
import { Link, useNavigate } from "react-router-dom";
import { getAllUniversityForWeb } from "../../api/university";
import { getAllProgramForWeb } from "../../api/Program";
import Footer from "../../compoents/Footer";
import banner from '../../styles/Assets/Student/EventBanner.png';
import { CiSearch } from 'react-icons/ci';
import { Chip } from '@mui/material';
import Flags from 'react-world-flags';
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination, radioClasses, } from "@mui/material";


const Program = () => {

  const [university, setUniversity] = useState([]);
  const [program, setProgram] = useState([]);
  const pageSize = 5;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
 
  const navigate = useNavigate();

  useEffect(() => {
    getUniversityList();
    getProgramList();
  }, []);

  const getUniversityList = () => {
    getAllUniversityForWeb()
      .then((res) => {
        const value = res?.data?.result;
        setUniversity(value);
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
  const getProgramList = () => {
    getAllProgramForWeb()
      .then((res) => {
        const value = res?.data?.result;
        setProgram(value);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Header /><br /><br /><br />
      <div>
        <div style={{ width: '100%', height: '400px', backgroundImage: `url(${"https://campusdirect.io/static/media/banner.b190f2c0.jpg"})`, backgroundSize: 'cover', backgroundPosition: 'center', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
          <div className="mask" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', height: '400px' }}>
            <div className='text-center'>
              <div className='pt-4 text-light text-center ms-5'>
                <h4 className='mt-5 '>Don't miss out!</h4>
                <h4 >Explore the vibrant events happening locally and globally.</h4>
              </div>
              <div className='mt-5 position-relative'>
                <span className="position-absolute start-25 text-center p-2 px-3 border-0" id="inputGroup-sizing-default"><CiSearch className="fs-5" /></span>
                <input type="search" placeholder="Search" aria-describedby="button-addon3"  className="form-control-lg bg-light border-0 rounded-2 ps-5 w-50"/>
              </div>
              <div>
                <div className="container-box rotated mt-5">
                  <button type="button" className="btn text-white border-0 rounded-2 fw-semibold text-uppercase" data-bs-toggle="modal" data-bs-target="#popupModal" style={{backgroundColor:"#fe5722"}}>
                    Enquiry <i className='fa fa-arrow-right'/>
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
                            <textarea className="form-control" id="message" name="message" placeholder='message' rows={3} defaultValue={""} />
                          </div>
                          <button type="submit" className="btn text-white fw-semibold text-uppercase" style={{backgroundColor:"#fe5722"}}>Submit <i className='fa fa-arrow-right'/></button>
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
          <div style={{ backgroundColor:' #fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}  >
            <div className="container-fluid py-5" >
              <div className="container-xxl">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                  <h1 className="mb-5" style={{ backgroundColor:' #fff', fontFamily: 'Plus Jakarta Sans', fontSize: '24px' }}>Popular University</h1>
                </div>
                <div className="row g-4 justify-content-center gy-5 ">
                  {university.map((university) => (
                  <div className="col-lg-3 col-md-6 wow fadeInUp border-radius-10  " data-wow-delay="0.1s">
                  <div className="course-item bg-white shadow" style={{width:'18rem',height:"24rem"}}>
                    <div className="position-relative overflow-hidden image-container">
                      <img
                        className="img-fluid fixed-size-image"
                        src={university?.banner?university?.banner : "https://wallpapercave.com/wp/wp6837474.jpg"}
                        alt=""
                      />
                      <div className="position-absolute top-50  start-50  translate-middle">
                            <img src= { university?.universityLogo?university?.universityLogo:"https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png"} alt="profileImage" style={{ width: '6rem', height: '6rem', objectFit: 'cover' }} />
                            </div>
                    </div>
                    <div className="text-center p-4 pb-0">
                      <h6 className="mb-2 text-success   text-center">{university.universityName}</h6>
                      <Link className="dropdown-item"></Link>
                     
                      <h6 className="mt-2 text-center">Average Fees :  <i className="fa fa-rupee fw-light text-primary me-2 gap-2" >   {university.grossTuition}</i></h6>
                    </div>
                    <hr className='border border-1 ' />
                    <div className="row ">
                      <small className="flex-fill text-center  ">Ranking    <i className="fa fa-star text-primary me-2 gap-2" > {university.ranking}</i></small>
                      <small className="flex-fill text-center  py-1 ">OfferTAT   <i className="fa fa-clock text-primary me-2 gap-2" > {university.offerTAT}</i></small>
                      <small className="flex-fill text-center py-1 ">University Type  <i className="fa fa-university text-primary me-2 gap-2" >  {university.institutionType}</i></small>
                      <br/>
                      <small className="flex-fill text-start py-2 mt-3"></small>
                    </div>
                    <div className="w-100 d-flex justify-content-center position-absolute top-100 start-50 translate-middle">
                        <Link
                          to={{ pathname: "/ViewpageUniversity", search: `?id=${university?._id}` }}
                          className="flex-shrink-0 btn text-white btn-sm px-3 border-end fw-semibold text-uppercase "
                          style={{ borderRadius: '10px 0 0 10px',backgroundColor:"#fe5722" }}
                        >
                          Read More
                        </Link>
                        <Link
                          to={{ pathname: "/ViewpageUniversity", search: `?id=${university?._id}` }}
                          className="flex-shrink-0 btn btn-sm text-white px-3 fw-semibold text-uppercase"
                          style={{ borderRadius: '0 10px 10px 0',backgroundColor:"#fe5722"  }}
                        >
                          Join Now
                        </Link>
                      </div>
                   
                  </div>
                </div>
                
                  ))}
                </div>
                <div className="float-right my-2">
                  <Pagination
                    count={Math.ceil(pagination.count / pageSize)}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                  />
                </div>
              </div>
            </div>
            <div className='px-12 mx-6'>
              <div className='mt-5'>
                <h5 className='fw-bold '>Program </h5>
                <div className='d-flex gap-2 mt-3'>
                  <Chip label="All" className='px-2 pointer' variant='filled' />
                  <Chip label="Today" className='px-2' variant='filled' />
                  <Chip label="Tomorrow" className='px-2' variant='filled' />
                </div>
                <div className='row mt-4'>
                  {program.map((program,index) => (
                  <div key={index} className="col-12 col-lg-6 col-md-6 col-xl-4 mb-3">
                    <div className="card border-0 rounded-2 shadow" style={{ width: '22rem',height:"12rem" }}>
                      <div className='d-flex'>
                      <img src={program?.universityLogo} className="card-img-top" alt="events" style={{ maxHeight: '100px',maxWidth: '100px', objectFit: 'cover' }} />
                      <h5 className='ms-3 mt-4'><span className="text-info fw-normal text-center">{program.universityName}</span> </h5>
                      </div>
                      <div className="card-body">
                        <div className="d-flex">
                          <div className="col-4 text-center">
                            <h7>Course Fee :<span className="text-info fw-bold">{program.courseFee}</span> </h7>
                          </div><br /><br />
                          <div className="col-6">
                            <h6 className="text-success fw-bold"><Link className='text-decoration-none' to={{
                                    pathname: "/ViewProgramUniversity",
                                    search: `?id=${program?._id}`,
                                  }}>{program.programTitle}</Link></h6>
                            <small>{program.country}</small>
                            <small className="d-block">{program.courseFees}</small>
                            <h6><small><ioticketsharp className="me-1"> <pidotoutlinefill> Intake : <fastar className="text-primary fw-2"> {program?.inTake}</fastar></pidotoutlinefill></ioticketsharp></small></h6>
                          </div>
                          <div className="col-0 text-center mt-4">
                            <Link to={{ pathname: "/ViewProgramUniversity", search: `?id=${program?._id}` }} type="button" className="btn text-white" style={{backgroundColor:"fe5722"}}>Apply</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                 
                </div>
                <div className="float-right my-2">
                  <Pagination
                    count={Math.ceil(pagination.count / pageSize)}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                  />
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
