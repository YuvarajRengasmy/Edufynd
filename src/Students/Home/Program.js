import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { getAllUniversityForWeb } from "../../api/university";
import { getAllProgramForWeb } from "../../api/Program";
import { CiSearch } from 'react-icons/ci';
import { Chip } from '@mui/material';
import { Pagination } from "@mui/material";
import Sidebar from '../../compoents/StudentSidebar';


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
    
   <Sidebar/>
      <div className='content-wrapper' style={{fontSize:'12px'}}>
        {/* <div style={{ width: '100%', height: '400px', backgroundImage: `url(${"https://campusdirect.io/static/media/banner.b190f2c0.jpg"})`, backgroundSize: 'cover', backgroundPosition: 'center', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
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
        </div> */}
        <div className='container-fluid '>
         
        <div className="container-fluid">
  <div className="container-xxl">
    <div className="text-center">
      <h4 className="mb-4">Popular Universities</h4>
    </div>

    <div className="row g-4">
      {university.map((university) => (
        <div className="col-lg-4 col-md-6 col-sm-12" key={university._id}>
          <div className="card shadow-sm h-100 border-0">
            <div className="position-relative">
              <img
                className="card-img-top img-fluid"
                src={university?.banner || "https://wallpapercave.com/wp/wp6837474.jpg"}
                alt="University Banner"
              />
              <div className="position-absolute top-50 start-50 translate-middle">
                <img
                  src={university?.universityLogo || "https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png"}
                  alt="University Logo"
                  className="rounded-circle border border-white"
                  style={{ width: '5rem', height: '5rem', objectFit: 'cover' }}
                />
              </div>
            </div>

            <div className="card-body text-center ">
              <h6 className=" mb-2 text-dark fw-bold text-truncate">{university.universityName}</h6>
              <p className="text-muted mb-2 text-truncate">
                Average Fees: 
                <span className="text-primary ms-2">
                  <i className="fa fa-rupee-sign"></i> {university.grossTuition}
                </span>
              </p>

              <div className="row text-center mb-3">
                <div className="col-4 text-truncate">
                  <small>Ranking</small>
                  <div>
                    <i className="fa fa-star text-warning"></i> {university.ranking}
                  </div>
                </div>
                <div className="col-4 text-truncate">
                  <small>OfferTAT</small>
                  <div>
                    <i className="fa fa-clock text-info"></i> {university.offerTAT}
                  </div>
                </div>
                <div className="col-4 text-truncate">
                  <small>Type</small>
                  <div>
                    <i className="fa fa-university text-success"></i> {university.institutionType}
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center mt-3">
                <Link
                  to={`/view_page_university?id=${university._id}`}
                  className="btn btn-outline-primary me-2"
                  style={{ borderRadius: '10px 0 0 10px' }}
                >
                  Read More
                </Link>
                <Link
                  to={`/view_page_university?id=${university._id}`}
                  className="btn btn-primary"
                  style={{ borderRadius: '0 10px 10px 0' }}
                >
                  Join Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="d-flex justify-content-end my-3">
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


         
<div className='mt-2'>
  <h5 className='fw-bold'>Program</h5>

  <div className='row mt-4'>
    {program.map((program, index) => (
      <div key={index} className="col-12 col-lg-6 col-md-6 col-xl-4 mb-3">
        <div className="card border-0 rounded-1 shadow-sm h-100" style={{ width: '100%' }}>
          {/* University Logo and Name */}
          <div className='d-flex align-items-center p-3'>
            <img 
              src={program?.universityLogo || 'https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png'}
              className="img-fluid rounded"
              alt="University Logo"
              style={{ maxHeight: '80px', maxWidth: '80px', objectFit: 'cover' }} 
            />
            <h5 className='ms-3'>
              <span className="text-info fw-normal">{program.universityName}</span>
            </h5>
          </div>

          {/* Program Details */}
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              {/* Course Fee */}
              <div className="text-start">
                <p>Course Fee: 
                  <span className="text-info fw-normal ms-2">
                    {program.courseFee}
                  </span>
                </p>
              </div>

              {/* Program Title, Country, and Intake */}
              <div>
                <p className="text-success fw-bold">
                  <Link 
                    className='text-decoration-none' 
                    to={{ pathname: "/view_program_university", search: `?id=${program?._id}` }}
                  >
                    {program.programTitle}
                  </Link>
                </p>
                <small>{program.country}</small>
                <small className="d-block">{program.courseFees}</small>
                <p>
                  <small>
                    Intake: 
                    <span className="text-primary fw-normal"> {program?.inTake}</span>
                  </small>
                </p>
              </div>

              {/* Apply Button */}
              <div className="text-end mt-4">
                <Link 
                  to={{ pathname: "/view_program_university", search: `?id=${program?._id}` }} 
                  className="btn text-white" 
                  style={{ backgroundColor: "#fe5722" }}
                >
                  Apply
                </Link>
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
      
    </>
  )
};
export default Program;
