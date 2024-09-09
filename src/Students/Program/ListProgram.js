import React, { useEffect, useState } from 'react';
import Header from "../Home/HeaderHome";
import Footer from "../../compoents/Footer";
import banner from '../../styles/Assets/Student/EventBanner.png';
import { CiSearch } from 'react-icons/ci';
import { Chip } from '@mui/material';
import Flags from 'react-world-flags';
// import ListCountry from "../../SuperAdmin/Admins/country";
import {getAllProgramForWeb } from "../../api/Program";
import { Link , useNavigate} from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination, radioClasses, } from "@mui/material";
import { University } from '../../api/endpoints';
import Sidebar from '../../compoents/StudentSidebar';
const ListPrograms = () => {

  const [program, setProgram] = useState([]);
  const pageSize = 5;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  const navigate = useNavigate();

  useEffect(() => {
   
    getProgramList();
  }, []);

  
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
  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
  };
  return (
    <>
    <Sidebar/>
   
<div className='content-wrapper'style={{fontSize:'12px'}}>
   
      <div className='container-fluid'>
       
        
           
              <h6 className='fw-bold'>Popular Programs</h6>
             
              <div className='row '>
               
              {program.map((program,index) => (
                  <div key={index} className="col-12 col-lg-6 col-xl-4 mb-3">
                    <div className="card border-0 rounded-1 shadow-sm" >
                      <div className='d-flex'>
                      <img src={program?.universityLogo ||  'https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png'} className="card-img-top" alt="events" style={{ maxHeight: '100px',maxWidth: '100px', objectFit: 'cover' }} />
                      <h6 className='ms-3 mt-4'><span className="text-info fw-normal">
                                    {program.universityName}</span> </h6>
                      </div>
                      <div className="card-body">
                        <div className="d-flex">
                          <div className="col-4 text-center">
                            <p className=''>Course Fees <span className="text-info fw-normal">{program. courseFee}</span> </p>
                          </div>
                          <div className="col-6">
                            <p className="text-success fw-normal"><Link className='text-decoration-none' to={{
                                    pathname: "/view_program_university",
                                    search: `?id=${program?._id}`,
                                  }}>{program.programTitle}</Link></p>
                            <small>{program.country}</small>
                            <small className="d-block">{program.courseFees}</small>
                            <p><small><ioticketsharp className="me-1"> <pidotoutlinefill> Intake : <fastar className="text-primary fw-noemal"> {program?.inTake}</fastar></pidotoutlinefill></ioticketsharp></small></p>
                          </div>
                          <div className="col-0 text-center mt-4">
                            <Link to={{ pathname: "/view_program_university", search: `?id=${program?._id}` }} type="button" className="btn text-white border-0 rounded-1" style={{backgroundColor:"#FE5722"}}>Apply</Link>
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
           
            <div className='mt-5'>
              <h6 className='fw-bold'>ListProgram </h6>
             
              <div className='row mt-4'>
              {program.map((program,index) => (
                  <div key={index} className="col-12 col-lg-6 col-xl-4 mb-3">
                    <div className="card border-0 rounded-1 shadow-sm" >
                      <div className='d-flex'>
                      <img src={program?.universityLogo || 'https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png'} className="card-img-top" alt="events" style={{ maxHeight: '100px',maxWidth: '100px', objectFit: 'cover' }} />
                      <h6 className='ms-3 mt-4'><span className="text-info fw-normal">{program.universityName}</span> </h6>
                      </div>
                      <div className="card-body">
                        <div className="d-flex">
                          <div className="col-4 text-center">
                            <p>Course :<span className="text-info fw-normal">{program.courseType}</span> </p>
                          </div>
                          <div className="col-6">
                            <p className="text-success fw-normal"><Link className='text-decoration-none' to={{
                                    pathname: "/view_program_university",
                                    search: `?id=${program?._id}`,
                                  }}>{program.programTitle}</Link></p>
                            <small>{program.country}</small>
                            <small className="d-block">{program.courseFees}</small>
                            <p><small><ioticketsharp className="me-1"> <pidotoutlinefill> Intake : <fastar className="text-primary fw-normal"> {program?.inTake}</fastar></pidotoutlinefill></ioticketsharp></small></p>
                          </div>
                          <div className="col-0 text-center mt-4">
                            <Link to={{ pathname: "/view_program_university", search: `?id=${program?._id}` }} type="button" className="btn border-0 text-white rounded-1 " style={{backgroundColor:"#FE5722"}}>Apply</Link>
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
            <div className='mt-5'>
              <h6 className='fw-bold'>Upcoming Programs</h6>
             
              <div className='row mt-4'>
              {program.map((program,index) => (
                  <div key={index} className="col-12 col-lg-6 col-xl-4 mb-3">
                    <div className="card border-0 rounded-1 shadow-sm" >
                      <div className='d-flex'>
                      <img src={program?.universityLogo || 'https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png'} className="card-img-top" alt="events" style={{ maxHeight: '100px',maxWidth: '100px', objectFit: 'cover' }} />
                      <h6 className='ms-3 mt-4'><span className="text-info fw-normal">{program.universityName}</span> </h6>
                      </div>
                      <div className="card-body">
                        <div className="d-flex">
                          <div className="col-4 text-center">
                            <p>Course :<span className="text-info fw-normal">{program.courseType}</span> </p>
                          </div>
                          <div className="col-6">
                            <p className="text-success fw-bold"><Link className='text-decoration-none' to={{
                                    pathname: "/view_program_university",
                                    search: `?id=${program?._id}`,
                                  }}>{program.programTitle}</Link></p>
                            <small>{program.country}</small>
                            <small className="d-block">{program.courseFees}</small>
                            <p><small><ioticketsharp className="me-1"> <pidotoutlinefill> Intake : <fastar className="text-primary fw-normal"> {program?.inTake}</fastar></pidotoutlinefill></ioticketsharp></small></p>
                          </div>
                          <div className="col-0 text-center mt-4">
                            <Link to={{ pathname: "/view_program_university", search: `?id=${program?._id}` }} type="button" className="btn text-white border-0 rounded-1" style={{backgroundColor:"#FE5722"}}>Apply</Link>
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
export default ListPrograms;
