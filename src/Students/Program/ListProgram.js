import React, { useEffect, useState } from 'react';
import Header from "../Home/HeaderHome";
import Footer from "../../compoents/Footer";
import banner from '../../styles/Assets/Student/EventBanner.png';
import { CiSearch } from 'react-icons/ci';
import { Chip } from '@mui/material';
import Flags from 'react-world-flags';
import ListCountry from "../../SuperAdmin/Admins/country";
import { getAllProgramForWeb } from "../../api/Program";
import { Link , useNavigate} from "react-router-dom";
const ListProgram = () => {

  const [program, setProgram] = useState([]);
 
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

  return (
    <>
    <Header/><br/><br/><br/>
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
               
              {program.map((program,index) => (
                  <div key={index} className="col-12 col-lg-6 col-xl-4 mb-3">
                    <div className="card border-0 rounded-2 shadow" style={{ width: '24rem',height:"12rem" }}>
                      <div className='d-flex'>
                      <img src={program?.universityLogo} className="card-img-top" alt="events" style={{ maxHeight: '100px',maxWidth: '100px', objectFit: 'cover' }} />
                      <h5 className='ms-3 mt-4'><span className="text-info fw-normal">{program.universityName}</span> </h5>
                      </div>
                      <div className="card-body">
                        <div className="d-flex">
                          <div className="col-4 text-center">
                            <h7>Course :<span className="text-info fw-normal">{program.courseType}</span> </h7>
                          </div><br /><br />
                          <div className="col-6">
                            <h6 className="text-success fw-normal">{program.programTitle}</h6>
                            <small>{program.country}</small>
                            <small className="d-block">{program.courseFees}</small>
                            <h6><small><ioticketsharp className="me-1"> <pidotoutlinefill> Intake : <fastar className="text-primary fw-2"> {program?.inTake}</fastar></pidotoutlinefill></ioticketsharp></small></h6>
                          </div>
                          <div className="col-0 text-center mt-4">
                            <Link to={{ pathname: "/ViewProgramUniversity", search: `?id=${program?._id}` }} type="button" className="btn text-white border-0 rounded-2" style={{backgroundColor:"#FE5722"}}>Apply</Link>
                          </div>
                        </div>
                      </div>
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
            <div className='mt-5'>
              <h5 className='fw-bold'>ListProgram </h5>
              <div className='d-flex gap-2 mt-3'>
                <Chip label="All" className='px-2 pointer' variant='filled' />
                <Chip label="Today" className='px-2' variant='filled' />
                <Chip label="Tomorrow" className='px-2' variant='filled' />
              </div>
              <div className='row mt-4'>
              {program.map((program,index) => (
                  <div key={index} className="col-12 col-lg-6 col-xl-4 mb-3">
                    <div className="card border-0 rounded-2 shadow" style={{ width: '24rem',height:"12rem" }}>
                      <div className='d-flex'>
                      <img src={program?.universityLogo} className="card-img-top" alt="events" style={{ maxHeight: '100px',maxWidth: '100px', objectFit: 'cover' }} />
                      <h5 className='ms-3 mt-4'><span className="text-info fw-normal">{program.universityName}</span> </h5>
                      </div>
                      <div className="card-body">
                        <div className="d-flex">
                          <div className="col-4 text-center">
                            <h7>Course :<span className="text-info fw-normal">{program.courseType}</span> </h7>
                          </div><br /><br />
                          <div className="col-6">
                            <h6 className="text-success fw-normal">{program.programTitle}</h6>
                            <small>{program.country}</small>
                            <small className="d-block">{program.courseFees}</small>
                            <h6><small><ioticketsharp className="me-1"> <pidotoutlinefill> Intake : <fastar className="text-primary fw-2"> {program?.inTake}</fastar></pidotoutlinefill></ioticketsharp></small></h6>
                          </div>
                          <div className="col-0 text-center mt-4">
                            <Link to={{ pathname: "/ViewProgramUniversity", search: `?id=${program?._id}` }} type="button" className="btn border-0 text-white rounded-2 " style={{backgroundColor:"#FE5722"}}>Apply</Link>
                          </div>
                        </div>
                      </div>
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
            <div className='mt-5'>
              <h5 className='fw-bold'>Upcoming Programs</h5>
              <div className='d-flex gap-2 mt-3'>
                <Chip label="All" className='px-2 pointer' variant='filled' />
                <Chip label="Today" className='px-2' variant='filled' />
                <Chip label="Tomorrow" className='px-2' variant='filled' />
              </div>
              <div className='row mt-4'>
              {program.map((program,index) => (
                  <div key={index} className="col-12 col-lg-6 col-xl-4 mb-3">
                    <div className="card border-0 rounded-2 shadow" style={{ width: '24rem',height:"12rem" }}>
                      <div className='d-flex'>
                      <img src={program?.universityLogo} className="card-img-top" alt="events" style={{ maxHeight: '100px',maxWidth: '100px', objectFit: 'cover' }} />
                      <h5 className='ms-3 mt-4'><span className="text-info fw-norma">{program.universityName}</span> </h5>
                      </div>
                      <div className="card-body">
                        <div className="d-flex">
                          <div className="col-4 text-center">
                            <h7>Course :<span className="text-info fw-normal">{program.courseType}</span> </h7>
                          </div><br /><br />
                          <div className="col-6">
                            <h6 className="text-success fw-bold">{program.programTitle}</h6>
                            <small>{program.country}</small>
                            <small className="d-block">{program.courseFees}</small>
                            <h6><small><ioticketsharp className="me-1"> <pidotoutlinefill> Intake : <fastar className="text-primary fw-2"> {program?.inTake}</fastar></pidotoutlinefill></ioticketsharp></small></h6>
                          </div>
                          <div className="col-0 text-center mt-4">
                            <Link to={{ pathname: "/ViewProgramUniversity", search: `?id=${program?._id}` }} type="button" className="btn text-white border-0 rounded-2" style={{backgroundColor:"#FE5722"}}>Apply</Link>
                          </div>
                        </div>
                      </div>
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
      </div>
      </div>
    <Footer/>
    </>
  )
};
export default ListProgram;
