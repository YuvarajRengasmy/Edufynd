import React, { useState, useEffect } from "react";
import { getSingleProgram, getallProgram } from "../../api/Program";
import { Link, useLocation } from "react-router-dom";
import './Course.css'
import { RiSchoolLine, RiFileTextLine, RiCoinsFill } from 'react-icons/ri';

import Flags from 'react-world-flags';
import { Pagination } from "@mui/material";

export const Course = () => {

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
        <div className="container ">
            <div className="row">
                <div className="col-12">
                <div className="card border-0 rounded-2 px-3 py-3 bg-secondary  ">

<div className="card-header rounded-top border-0   img-1 ">
    <div className="row g-5">
        <div className="col-md-4 d-flex justify-content-center align-items-start">
            <img
                src="https://t3.ftcdn.net/jpg/04/91/76/62/360_F_491766294_h4j7LbW2YgfbNHhq7F8GboIc1XyBSEY5.jpg"
                className="img-fluid rounded-circle" style={{ width: "150px", height: "150px" }}
                alt="Berry College Campus"
            />
        </div>
        <div className="col-md-8 d-flex justify-content-start  align-items-">
            <div className="px-1 py-2">
                <h5 className=" text-white">{program?.programTitle}</h5>
                <p className='text-white'>{program?.universityName}</p>
                <p className="text-white">{program?.country}</p>
                <button className="btn  rounded-pill text-white text-uppercase px-4 py-2" style={{backgroundColor:"#fe5722"}}>Apply Now</button>
            </div>
        </div>
    </div>




</div>
<div className="card-body bg-white rounded-bottom px-4">
    <div className="row mt-2 g-4">
        <div className="col-lg-6 ">
            <div className="d-flex flex-row align-items-start justify-content-between mt-3">
                <div className="h5 text-muted text-uppercase">Overview</div>
                <div className="h5 text-muted text-uppercase">Institutions</div>
                <div className="h5 text-muted text-uppercase">Campus</div>
            </div>
            <div className="h4 text-decoration-underline text-uppercase px-2 pt-4" style={{color:'#fe5722'}}>About the Course</div>
            <div className="text-lead" style={{ maxHeight: '300px', overflowY: "auto", scrollbarWidth: 'none' }}>
                <div className="card-body ">
                <p>{program?.academicRequirement} </p>
                </div>
              
               
            </div>
        </div>

        <div className="col-lg-6">
            <div className="alert alert-primary text-center " role="alert">
                A simple primary alert with an example link. 
            </div>
            <h4 className=" text-decoration-underline text-uppercase" style={{color:'#fe5722'}}>Info</h4>

            <div className="card  border-0  shadow mt-3">
                <div className="card-body">

                    <div className="row gy-3 py-2">
                        <div className="col-sm-6">
                            <div className="fs-6 fw-light text-lead text-capitalize">intake months</div>
                            {Array.isArray(program?.inTake) &&
                              program.inTake.map((inTake, index) => (
                            <div key={index} className="h6 fw-bold">{inTake}</div>
                        ))}
                            </div>
                        <div className="col-sm-6">
                            <div className="fs-6 fw-light text-lead text-capitalize">Delivery Currency</div>
                            <div className="h6 fw-bold"><Flags code={program?.flag} width={40} height={20} /> {program?.currency}</div>
                        </div>
                    </div>
                    <div className="row gy-3 py-2">
                        <div className="col-sm-6">
                            <div className="fs-6 fw-light text-lead text-capitalize">Qualification</div>
                            <div className="h6 fw-bold">Master's Degree</div>
                        </div>
                        <div className="col-sm-6 ">
                            <div className="fs-6 fw-light text-lead text-capitalize">Estimated Annual Course Fee</div>
                            <div className="h6 fw-bold">{program?.courseFee}</div>
                        </div>
                    </div>
                    <div className="row gy-3 py-2">
                        <div className="col-sm-6">
                            <div className="fs-6 fw-light text-lead text-capitalize">Duration</div>
                            <div className="h6 fw-bold">{program?.duration}</div>
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
            <div className="h4 ps-2 pb-3 text-decoration-underline text-uppercase " style={{color:'#fe5722'}}>English Language Requirements</div>
            <div className="col-lg-6 col-sm-6">
                
                <div className="card  border-0  shadow" >
                    <div className="card-body px-4 py-4" >
                        <table className="table table-hover table-responsive">
                            <tbody>
                                <tr>
                                    <td>UniversityInterview</td>
                                    <td>{program?.universityInterview}</td>
                                    <td><a href="#" className="btn btn-link" style={{color:'#fe5722'}}>Learn more</a></td>
                                </tr>
                                <tr>
                                    <td>Gre_Gmat_Requirement</td>
                                    <td>{program?.greGmatRequirement} {program?.score} </td>
                                    <td><a href="#" className="btn btn-link" style={{color:'#fe5722'}}>Learn more</a></td>
                                </tr>
                                <tr>
                                    <td>EnglishlanguageTest</td>
                                    <td>{program?.englishLanguageTest}</td>
                                    <td><a href="#" className="btn btn-link" style={{color:'#fe5722'}}>Learn more</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>



        <div className="row g-3">
            <div className="d-flex flex-row align-items-start justify-content-between">
            <div className="h4 text-decoration-underline text-uppercase " style={{color:'#fe5722'}}>Other Courses You May Be Interested In</div>
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
            {input?.map((data, index) => (

            <div key={index} className="col-lg-4">
                <div className="card mb-3  border-0  shadow">
                    <div className="row g-0 align-items-center justify-content-center">
                        <div className="col-md-4">
                            <img
                                src={data?.universityLogo?data?.universityLogo:"https://img.freepik.com/premium-vector/university-campus-logo_1447-1790.jpg"}
                                className="img-fluid rounded-circle"
                                alt="Course Image"
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{data?.universityName}</h5>
                                <p className="card-text">CourseName :- {data?.programTitle}</p>
                                <p className="card-text">Duration :- {data?.duration}</p>
                                <button className="btn  rounded-pill text-white text-uppercase px-4 py-2" style={{backgroundColor:"#fe5722"}}>Apply Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             ))}

           
        </div>



    </div>
</div>
</div>
                </div>
            </div>

        </div>

    );
};

export default Course;
