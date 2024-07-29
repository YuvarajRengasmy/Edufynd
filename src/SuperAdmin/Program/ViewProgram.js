import React, { useState, useEffect } from "react";
import { getSingleProgram, getallProgram } from "../../api/Program";
import { Link, useLocation } from "react-router-dom";
import './Course.css'
import { RiSchoolLine, RiFileTextLine, RiCoinsFill } from 'react-icons/ri';
import Sidebar from '../../compoents/sidebar';
import Flags from 'react-world-flags';
import { Pagination } from "@mui/material";
import { University } from "../../api/endpoints";

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
        <>
              <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}>
                <div className="container-fluid">
                  
                        <div className='navbar navbar-vertical navbar-expand-lg'>
                            <Sidebar />
                        </div>
                        <div className="  content-wrapper">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="border-0 rounded-0 bg-transparent p-3">
                                            <div className="card border-0 rounded-0 mt-2">



                                            

                                            <div
  className="card rounded-0 border-0"
  style={{
    position: "relative",
    overflow: "hidden",
    height: "70vh",
    maxWidth: "100%", // Ensure card doesn't overflow its container
  }}
>
  <img
    src="https://iproedu.in/wp-content/uploads/2020/12/Study-abroad-consultancy.jpg"
    className="card-img img-fluid rounded-0 border-0"
    alt="university_bg_image"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      mixBlendMode: "multiply",
    }}
  />
  <div
    className="gradient-overlay"
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "200px",
      background:
        "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
      zIndex: 1,
    }}
  ></div>
  <div
    className="card-img-overlay align-self-end d-flex flex-column justify-content-end p-3"
    style={{ position: "absolute", zIndex: 2 }}
  >
    <div className="border-0 rounded-0 bg-transparent text-center text-md-start">
      <img
        src={program?.universityLogo || "https://t3.ftcdn.net/jpg/04/91/76/62/360_F_491766294_h4j7LbW2YgfbNHhq7F8GboIc1XyBSEY5.jpg"}
        className="img-fluid rounded-circle img-thumbnail"
        style={{ width: "9rem", height: "9rem" }}
        alt="University Logo"
      />
      <div className="card-body">
        <div className="py-3 my-2">
          <h5 className="h4 fw-bolder text-white d-flex align-items-end gap-2 text-capitalize">
            {program?.programTitle}
          </h5>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start">
          <p className="text-white fw-semibold mb-1" style={{ fontSize: "14px" }}>
            <span style={{ color: "#fe5722", fontSize: "14px" }}>
              <i className="fa fa-university nav-icon"></i>
            </span>{" "}
            {program?.universityName || "Not Available"}
          </p>

          <p className="text-white fw-semibold mb-1" style={{ fontSize: "14px" }}>
            <span style={{ color: "#fe5722", fontSize: "14px" }}>
              <i className="fa fa-globe nav-icon"></i>
            </span>{" "}
            {program?.country || "Not Available"}
          </p>
          
          <p className="text-white fw-semibold mb-1" style={{ fontSize: "14px" }}>
            <span style={{ color: "#fe5722", fontSize: "14px" }}>
              <i className="fa fa-book nav-icon"></i>
            </span>{" "}
            {program?.courseType || "Not Available"}
          </p>

          <p className="text-white mb-1 fw-semibold" style={{ fontSize: "14px" }}>
            <span style={{ color: "#fe5722", fontSize: "14px" }}>
              <i className="fa fa-percentage nav-icon"></i>
            </span>{" "}
            {program?.commission || "Not Available"}
          </p>
          
          <p className="text-white mb-1 fw-semibold" style={{ fontSize: "14px" }}>
            <span style={{ color: "#fe5722", fontSize: "14px" }}>
              <i className="fa fa-money-bill-wave nav-icon"></i>
            </span>{" "}
            {program?.finalValue || program?.applicationFee || "Not Available"}
          </p>

          <p className="text-white mb-1 fw-semibold" style={{ fontSize: "14px" }}>
            <span style={{ color: "#fe5722", fontSize: "14px" }}>
              <i className="fa fa-clock nav-icon"></i>
            </span>{" "}
            {program?.campuses?.[1]?.duration || "Not Available"}
          </p>

          <p className="text-white mb-1 fw-semibold" style={{ fontSize: "14px" }}>
            <span style={{ color: "#fe5722", fontSize: "14px" }}>
              <i className="fa fa-tags nav-icon"></i>
            </span>{" "}
            {program?.discountedValue || "Not Available"}hhhhhhhhhh
          </p>

        
        </div>
        <p className="text-center  float-end text-md-start ">
            <button
              className="btn btn-sm rounded-pill text-white text-Capitalize fw-semibold px-4 py-2"
              style={{ backgroundColor: "#fe5722", color: '#fff', fontSize: '12px' }}
            >
              <i className="fa fa-paper-plane nav-icon"></i> Apply Now
            </button>
          </p>
      </div>
    </div>
  </div>
</div>

                                             

                                                <div className="card-body bg-white rounded-bottom ">
                                                    <div className="container">
                                                    <div className="row ">
                                                        <div className="col-md-8">
                                                            <ul className="nav nav-pills fs-9" id="myTab" role="tablist">
                                                                <li className="nav-item" role="presentation">
                                                                    <a className="nav-link active text-Capitalize" id="home-tab" data-bs-toggle="tab" href="#tab-home" role="tab" aria-controls="tab-home" aria-selected="true">Admission Requirement</a>
                                                                </li>
                                                                <li className="nav-item" role="presentation">
                                                                    <a className="nav-link text-Capitalize" id="profile-tab" data-bs-toggle="tab" href="#tab-profile" role="tab" aria-controls="tab-profile" aria-selected="false" tabIndex="-1">Campus</a>
                                                                </li>
                                                                <li className="nav-item" role="presentation">
                                                                    <a className="nav-link text-Capitalize" id="contact-tab" data-bs-toggle="tab" href="#tab-contact" role="tab" aria-controls="tab-contact" aria-selected="false" tabIndex="-1">Intake</a>
                                                                </li>
                                                                <li className="nav-item" role="presentation">
                                                                    <a className="nav-link text-Capitalize" id="elt-tab" data-bs-toggle="tab" href="#elt" role="tab" aria-controls="elt" aria-selected="false" tabIndex="-1">ELT</a>
                                                                </li>
                                                                <li className="nav-item" role="presentation">
                                                                    <a className="nav-link text-Capitalize" id="acadmic-tab" data-bs-toggle="tab" href="#acadmic" role="tab" aria-controls="acadmic" aria-selected="false" tabIndex="-1">Academic Requirements</a>
                                                                </li>
                                                            </ul>

                                                            <div className="tab-content mt-3" id="myTabContent" style={{ height: "350px", overflowY: "auto", scrollbarWidth: 'none' }}>
                                                                <div className="tab-pane fade show active" id="tab-home" role="tabpanel" aria-labelledby="home-tab">
                                                                    <p style={{ textAlign: 'justify' }}>{program?.academicRequirement}</p>
                                                                </div>
                                                                <div className="tab-pane fade" id="elt" role="tabpanel" aria-labelledby="elt-tab">
                                                                    <div className="container">
                                                                        <div className="row">
                                                                            <div className="col my-3">
                                                                            <table className="table table-hover tabble-borderd table-primary table-responsive-sm">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td>University Interview</td>
                                                                                        <td>{program?.universityInterview}</td>
                                                                                        <td><a href="#" className="btn btn-link btn-sm" style={{ color: '#fe5722',fontSize:'11px' }}>Learn more</a></td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>GRE/GMAT Requirement</td>
                                                                                        <td>{program?.greGmatRequirement} {program?.score}</td>
                                                                                        <td><a href="#" className="btn btn-link btn-sm" style={{ color: '#fe5722',fontSize:'11px' }}>Learn more</a></td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>English Language Test</td>
                                                                                        <td>{program?.englishLanguageTest}</td>
                                                                                        <td><a href="#" className="btn btn-link btn-sm" style={{ color: '#fe5722',fontSize:'11px' }}>Learn more</a></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                            </div>
                                                                            
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="tab-pane fade" id="acadmic" role="tabpanel" aria-labelledby="acadmic-tab">
                                                                    <div className="form-floating">
                                                                        <textarea className="form-control" id="floatingTextarea2" placeholder="Leave a comment here" style={{ height: "200px" }}></textarea>
                                                                        <label htmlFor="floatingTextarea2">Comments</label>
                                                                    </div>
                                                                </div>
                                                                <div className="tab-pane fade" id="tab-profile" role="tabpanel" aria-labelledby="profile-tab">
                                                                    <div className='row'>
                                                                        <div className='border-0 pt-3 px-4'>
                                                                            <div className='row'>
                                                                                {Array.isArray(program?.campuses) &&
                                                                                    program.campuses.map((campus, index) => (
                                                                                        <div key={index} className='col-sm-6 col-md-3 mb-3'>
                                                                                            <div className="card  border-0 border-start border-danger border-5" style={{ width: '100%', height: "auto" }}>
                                                                                                <img
                                                                                                    src={program.universityLogo ? program.universityLogo : "https://www.logodesignworks.com/wp-content/uploads/2022/04/international-university-logo-design-.jpg"}
                                                                                                    className="card-img-top img-fluid rounded-pill mx-auto d-block mt-2"
                                                                                                    style={{ width: '5rem', height: "5rem" }}
                                                                                                    alt="Campus"
                                                                                                />
                                                                                                <div className="card-body">
                                                                                                    <p className="card-text text-center">{campus.campus}</p>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="tab-pane fade" id="tab-contact" role="tabpanel" aria-labelledby="contact-tab">
                                                                    <div className='row'>
                                                                        <div className='border-0 pt-3 px-4'>
                                                                            <div className='row'>
                                                                                {Array.isArray(program?.campuses) &&
                                                                                    program.campuses.map((campus, index) => (
                                                                                        <div key={index} className='col-sm-6 col-md-4 mb-3'>
                                                                                            <div className="card border-0 rounded-3 shadow">
                                                                                                <div className="card-header bg-primary">
                                                                                                    <p className="text-center  text-uppercase fw-semibold">{campus?.inTake}</p>
                                                                                                </div>
                                                                                                <div className="card-body">
                                                                                                    <div className="d-flex flex-column align-items-start justify-content-evenly" style={{ fontSize: '12px' }}>
                                                                                                        <p className="card-text fw-semibold">Start Date -</p>
                                                                                                        <p className="card-text fw-semibold">End Date -</p>
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

                                                        <div className="col-md-4">
                            <div
                              className="alert alert-primary text-center fw-semibold border-0   text-Capitalize "
                              role="alert"
                            >
                              Intakes
                            </div>

                            <div className="card card-body">
                              <h5 className="text-capitalize text-center">
                                Program Intakes
                              </h5>

                              <div
                                className="accordion accordion-flush"
                                id="programIntakesAccordion"
                                style={{ fontSize: "12px" }}
                              >
                                <div className="accordion-item">
                                  <h2 className="accordion-header">
                                    <button
                                      className="accordion-button collapsed btn-sm"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapseOpen"
                                      aria-expanded="false"
                                      aria-controls="flush-collapseOpen"
                                    >
                                      Open
                                    </button>
                                  </h2>
                                  <div
                                    id="flush-collapseOpen"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#programIntakesAccordion"
                                  >
                                    <div className="accordion-body">
                                      <div className="row row-cols-2">
                                        <div className="col">
                                          <p className="fw-bold">Open Time</p>
                                        </div>
                                        <div className="col">
                                          <p className="fw-normal">
                                            27/07/2024
                                          </p>
                                        </div>
                                        <div className="col">
                                          <p className="fw-bold">Deadline</p>
                                        </div>
                                        <div className="col">
                                          <p className="fw-normal">
                                            27/07/2025
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="accordion-item">
                                  <h2 className="accordion-header">
                                    <button
                                      className="accordion-button collapsed btn-sm"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapseClosed"
                                      aria-expanded="false"
                                      aria-controls="flush-collapseClosed"
                                    >
                                      Closed
                                    </button>
                                  </h2>
                                  <div
                                    id="flush-collapseClosed"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#programIntakesAccordion"
                                  >
                                    <div className="accordion-body">
                                      <div className="row row-cols-2">
                                        <div className="col">
                                          <p className="fw-bold">Open Time</p>
                                        </div>
                                        <div className="col">
                                          <p className="fw-normal">
                                            27/07/2024
                                          </p>
                                        </div>
                                        <div className="col">
                                          <p className="fw-bold">Deadline</p>
                                        </div>
                                        <div className="col">
                                          <p className="fw-normal">
                                            27/07/2025
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="accordion-item">
                                  <h2 className="accordion-header">
                                    <button
                                      className="accordion-button collapsed btn-sm"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapseLikelyOpen"
                                      aria-expanded="false"
                                      aria-controls="flush-collapseLikelyOpen"
                                    >
                                      Likely Open
                                    </button>
                                  </h2>
                                  <div
                                    id="flush-collapseLikelyOpen"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#programIntakesAccordion"
                                  >
                                    <div className="accordion-body">
                                      <div className="row row-cols-2">
                                        <div className="col">
                                          <p className="fw-bold">Open Time</p>
                                        </div>
                                        <div className="col">
                                          <p className="fw-normal">
                                            27/07/2024
                                          </p>
                                        </div>
                                        <div className="col">
                                          <p className="fw-bold">Deadline</p>
                                        </div>
                                        <div className="col">
                                          <p className="fw-normal">
                                            27/07/2025
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                         
                          </div>

                                                        <div className="col-md-4">
                                                            <div className="alert alert-primary text-center border-0" role="alert">
                                                                Program Details
                                                            </div>

                                                            <div className="card ">
                                                                <div className="card-body">
                                                                    <div className="row gy-3 py-2">
                                                                        <div className="col-sm-6">
                                                                            <div className=" fw-light text-capitalize">Course Type</div>
                                                                            <div className="">{program?.courseType}</div>
                                                                        </div>
                                                                        <div className="col-sm-6 visually-hidden">
                                                                            <div className=" fw-light text-capitalize">Delivery Currency</div>
                                                                            <div className=" fw-bold"><Flags code={program?.flag} width={40} height={20} /> {program?.currency}</div>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <div className=" fw-light text-capitalize">Commission</div>
                                                                            <div className=" fw-bold">{program?.commission}</div>
                                                                         
                                                                        </div>
                                                                    </div>
                                                                    <div className="row gy-3 py-2">
                                                                        <div className="col-sm-6">
                                                                            <div className=" fw-light text-capitalize">Application Fee</div>
                                                                            <div className=" fw-bold">
                                                                                {program?.finalValue ? program?.finalValue : program?.applicationFee ? program?.applicationFee : "Not Available"}
                                                                                <del>{program?.applicationFee ? program?.applicationFee : "Not Available"}</del>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <div className=" fw-light text-capitalize">Annual Course Fee</div>
                                                                            <div className=" fw-bold">{program?.campuses?.length > 0 ? program?.campuses[1]?.courseFees : "Not Available"}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row gy-3 py-2">
                                                                        <div className="col-sm-6">
                                                                            <div className=" fw-light text-capitalize">Duration</div>
                                                                            <div className=" fw-bold">{program?.campuses?.length > 0 ? program?.campuses[1]?.duration : "Not Available"}</div>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <div className=" fw-light text-capitalize">Discounted Value</div>
                                                                            <div className=" fw-bold">{program?.discountedValue}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-12">
                                                            <div className="row g-3">
                                                                <div className="d-flex flex-row align-items-start justify-content-between mb-3">
                                                                    <div className=" text-decoration-underline text-Capitalize" style={{ color: '#fe5722' }}>
                                                                        Programs
                                                                    </div>
                                                                </div>
                                                                {input?.map((data, index) => (
                                                                    <div key={index} className="col-md-4 mb-3">
                                                                        <div className="card mb-3" style={{ width: '100%', height: 'auto' }}>
                                                                            <div className="row g-0 align-items-center justify-content-center">
                                                                                <div className="col-sm-4">
                                                                                    <img
                                                                                        src={data?.universityLogo ? data?.universityLogo : "https://img.freepik.com/premium-vector/university-campus-logo_1447-1790.jpg"}
                                                                                        className="img-fluid rounded-circle"
                                                                                        alt="Course Image"
                                                                                        style={{ width: '7rem', height: '7rem' }}
                                                                                    />
                                                                                </div>
                                                                                <div className="col-sm-8">
                                                                                    <div className="card-body">
                                                                                        <h5 className="card-title">{data?.universityName}</h5>
                                                                                        <p className="card-text">Course Name: {data?.programTitle}</p>
                                                                                        <p className="card-text">Duration: {data?.duration}</p>
                                                                                        <button
                                                                                            className="btn rounded-pill text-white fw-semibold btn-sm text-Capitalize px-4 py-2"
                                                                                            style={{ backgroundColor: "#fe5722",fontSize:'12px' }}
                                                                                        >
                                                                                            Apply Now
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}

                                                                <nav aria-label="Page navigation">
                                                                    <ul className="pagination justify-content-end">
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

export default Course;
