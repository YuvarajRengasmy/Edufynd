import React, { useState, useEffect } from "react";
import { getSingleStudnetEnquiry } from "../../../api/Enquiry/student";
import { Link, useLocation } from "react-router-dom";
import { formatDate } from "../../../Utils/DateFormat";
import Mastersidebar from "../../../compoents/StaffSidebar";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { RichTextEditor } from "@mantine/rte";
export const StudentForm = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [student, setStudent] = useState();
  const pageSize = 5;

  useEffect(() => {
    getStudentDetails();
  }, []);

  const getStudentDetails = () => {
    getSingleStudnetEnquiry(id)
      .then((res) => {
        setStudent(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Mastersidebar />

      <div
        className="content-wrapper"
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
      >
        <div className="content-header">


     
          <div class="container">
            <div class="col-12 text-center">
              <h2>Student Enquiry Profile</h2>
              <p class="text-muted">Details of the student's enquiry</p>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="card mb-3">
                  <div class="card-header bg-primary text-white">
                    Personal Information
                  </div>
                  <div class="card-body">
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-id-badge"></i> Student Name:
                      </div>
                      <div class="col-6">{student?.name || "Not Available"}</div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-genderless"></i> Gender:
                      </div>
                      <div class="col-6"> {student?.gender || "Not Available"}</div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-calendar-alt"></i> Date of Birth:
                      </div>
                      <div class="col-6"> {formatDate(student?.dob) || "Not Available"}</div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-globe"></i> Citizenship:
                      </div>
                      <div class="col-6">{student?.citizenShip || "Not Available"}</div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-passport"></i> Passport No:
                      </div>
                      <div class="col-6">{student?.passportNo || "Not Available"}</div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-calendar-day"></i> Expiry Date:
                      </div>
                      <div class="col-6">
                        {" "}
                        {formatDate(student?.expiryDate) || "Not Available"}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card mb-3">
                  <div class="card-header bg-primary text-white">
                    Contact Information
                  </div>
                  <div class="card-body">
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-envelope"></i> Email ID:
                      </div>
                      <div class="col-6">{student?.email || "Not Available"}</div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-phone-alt"></i> Primary Number:
                      </div>
                      <div class="col-6"> {student?.dial1 + " " +student?.primaryNumber  || "Not Available"}</div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fab fa-whatsapp "></i> WhatsApp Number:
                      </div>
                      <div class="col-6"> {student?.dial2 + " " +student?.whatsAppNumber || "Not Available"}</div>
                    </div>
                  </div>
                </div>
               
                {student?.agentName ? (
                  <>
                  
                <div class="card mb-3">
                  <div class="card-header bg-primary text-white">
                   Agent Details
                  </div>
                  <div class="card-body ">
                  <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-graduation-cap"></i>Agent Name:
                      </div>
                      <div class="col-6">{student?.agentName || "Not Available"}</div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-graduation-cap"></i>Agent Business Name:
                      </div>
                      <div class="col-6">{student?.businessName || "Not Available"}</div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-graduation-cap"></i>Agent Primary Number:
                      </div>
                      <div class="col-6">{student?.dial1 + " " +student?.primaryNumber  || "Not Available"}</div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-graduation-cap"></i>Agent Whatsapp Number:
                      </div>
                      <div class="col-6">{student?.dial2 + " " +student?.whatsAppNumber || "Not Available"}</div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-graduation-cap"></i>Agent Email:
                      </div>
                      <div class="col-6">{student?.agentEmail || "Not Available"}</div>
                    </div>

                   
                    
                  </div>
                </div>
                 </>
                  ) : (
                    <>
                      <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-graduation-cap"></i>Student Name:
                      </div>
                      <div class="col-6">{student?.studentName || "Not Available"}</div>
                    </div>
                      
                    </>
                  )}

                <div class="card mb-3">
                  <div class="card-header bg-primary text-white">
                    Application Status
                  </div>
                  <div class="card-body text-end">
                    <Link
                      to={{
                        pathname: "/EnquiryStudent",
                        search: `?id=${student?._id}`,
                      }}
                      class="btn btn-sm px-4 py-2 fw-semibold text-uppercase"
                      style={{ backgroundColor: "#231f20", color: "#fff" }}
                    >
                      Apply
                    </Link>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="card mb-3">
                  <div class="card-header bg-primary text-white">
                    Educational Details
                  </div>
                  <div class="card-body">
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-graduation-cap"></i> Qualification:
                      </div>
                      <div class="col-6">{student?.qualification || "Not Available"}</div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-calendar-check"></i> Passed Year:
                      </div>
                      <div class="col-6">{student?.yearPassed || "Not Available"}</div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-percent"></i> CGPA:
                      </div>
                      <div class="col-6">{student?.cgpa || "Not Available"}</div>
                    </div>
                  </div>
                </div>

                <div class="card mb-3">
                  <div class="card-header bg-primary text-white">
                    Application Details
                  </div>
                  <div class="card-body">
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-globe-americas"></i> Desired Country:
                      </div>
                      <div class="col-6">{student?.desiredCountry || "Not Available"}</div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-university"></i> Desired University:
                      </div>
                      <div class="col-6">{student?.desiredUniversity || "Not Available"}</div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-book"></i> Desired Course:
                      </div>
                      <div class="col-6"> {student?.desiredCourse || "Not Available"}</div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-question-circle"></i> Do You Hold Any
                        Other Offer?:
                      </div>
                      <div class="col-6">{student?.doYouHoldAnyOtherOffer || "Not Available"}</div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-globe"></i> Country:
                      </div>
                      <div class="col-6">
                        {student?.country ? student?.country : "N/A" || "Not Available"}
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-university"></i> University:
                      </div>
                      <div class="col-6">
                        {student?.universityName ? student?.universityName : "N/A" || "Not Available"} 
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-book"></i> Program:
                      </div>
                      <div class="col-6">
                        {" "}
                        {student?.programName ? student?.programName : "N/A" || "Not Available"}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card mb-3">
                  <div class="card-header bg-primary text-white">
                    Additional Information
                  </div>
                  <div class="card-body">
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-user-tie"></i> Referee Name:
                      </div>
                      <div class="col-6">
                        {" "}
                        {student?.refereeName ? student?.refereeName : "N/A" || "Not Available"}
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-phone"></i> Referee Contact:
                      </div>
                      <div class="col-6">
                        {" "}
                       { student?.dial + " " +student?.refereeContactNo || "Not Available"}
                        
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-hand-holding-usd"></i> Request Loan
                        Support:
                      </div>
                      <div class="col-6">
                        {student?.doYouNeedSupportForLoan || "Not Available"}
                      </div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-chalkboard-teacher"></i> Register for
                        IELTS Class:
                      </div>
                      <div class="col-6"> {student?.registerForIELTSClass || "Not Available"}</div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-user"></i> Assigned To:
                      </div>
                      <div class="col-6"> {student?.assignedTo || "Not Available"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid">
  <div className="row">
    <div className="col">
    <div className="card border-0 rounded-1 shadow-sm p-3">
                  <div className="card-body">
                    <div className="d-flex   justify-content-between align-items-center">
                      
                        <div
                          className="position-relative m-2"
                         
                          style={{ flex: "1 1 auto", maxWidth: "18%" }}
                        >
                          <div className="position-relative">
                            <div
                              className="progress"
                              role="progressbar"
                              aria-label="Progress"
                              
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{ height: "9px" }}
                            >
                              <div
                                className="progress-bar progress-bar-striped progress-bar-animated"
                                style={{
                                  width: '3',
                                  backgroundColor:'#000' ,
                                }}
                              ></div>
                            </div>
                          
                            <div
                              className="progress-bar progress-bar-striped progress-bar-animated"
                              style={{
                                width: '3',
                                backgroundColor:'#000' ,
                              }}
                            ></div>
                          </div>
                          <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip>3 Days</Tooltip>}
                          >
                            <button
                              type="button"
                              className="position-absolute text-bold  top-0  start-0 translate-middle-y btn btn-sm btn-primary rounded-pill"
                              data-bs-toggle="modal"
                              data-bs-target='modal1'
                              style={{
                                width: "2rem",
                                height: "2rem",
                                left: "0",
                               
                                color: "#FFF",
                              }}
                              
                            >

                             
                            </button>
                          </OverlayTrigger>
                          <div className="d-flex justify-content-start align-items-center mt-3"> </div>
                         

                          <div
                            className="modal fade"
                            id='modal1'
                            tabIndex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog modal-dialog-centered">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h1
                                    className="modal-title fs-5"
                                    id="staticBackdropLabel"
                                  >
                                    Application Status
                                  </h1>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                   
                                  ></button>
                                </div>
                                <div className="modal-body">
                                  <form >
                                    <div className="input-group mb-3">
                                      <span
                                        className="input-group-text"
                                        id="basic-addon1"
                                      >
                                        <i className="fa fa-tasks nav-icon text-dark"></i>
                                      </span>
                                      <input
                                        type="text"
                                        name="newStatus"
                                       
                                        className="form-control"
                                        placeholder="Enter Status...."
                                        aria-label="Status"
                                        aria-describedby="basic-addon1"
                                        style={{ fontSize: "12px" }}
                                      />
                                      
                                    </div>
                                    <div className="input-group mb-3">
                                      <span
                                        className="input-group-text"
                                        id="basic-addon1"
                                      >
                                        <i className="fa fa-tasks nav-icon text-dark"></i>
                                      </span>
                                      <input
                                        type="text"
                                        name="duration"
                                       
                                        className="form-control"
                                        placeholder="Enter Status...."
                                        aria-label="Status"
                                        aria-describedby="basic-addon1"
                                        style={{ fontSize: "12px" }}
                                      />
                                      
                                    </div>
                                    <div className="input-group mb-3">
                                    
                                      <RichTextEditor
                                        placeholder="Start writing your content here..."
                                        name="commentBox"
                                       
                                        type="text"
                                        style={{
                                          fontFamily: "Plus Jakarta Sans",
                                          fontSize: "12px",
                                        
                                          zIndex: "0",
                                        }}
                                      />
                                      
                                    </div>

                                    <div className="input-group mb-3">
                                      <span
                                        className="input-group-text"
                                        id="basic-addon1"
                                      >
                                        <i className="fa fa-file nav-icon text-dark"></i>
                                      </span>
                                      <input
                                        type="number"
                                        className="form-control "
                                        style={{
                                          fontFamily: "Plus Jakarta Sans",
                                          fontSize: "12px",
                                        }}
                                        value={"80"}
                                        placeholder="Enter  Image upload"
                                        name="progress"
                                       
                                      />
                                    </div>
                                    <div className="input-group mb-3">
                                      <span
                                        className="input-group-text"
                                        id="basic-addon1"
                                      >
                                        <i className="fa fa-file nav-icon text-dark"></i>
                                      </span>
                                      <input
                                        type="file"
                                        className="form-control "
                                        style={{
                                          fontFamily: "Plus Jakarta Sans",
                                          fontSize: "12px",
                                        }}
                                        placeholder="Enter  Image upload"
                                        name="document"
                                        
                                      />
                                    </div>
                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn px-4 py-2 text-uppercase fw-semibold"
                                        data-bs-bs-dismiss="modal"
                                        style={{
                                          fontSize: "12px",
                                          backgroundColor: "#231f20",
                                          color: "#fff",
                                        }}
                                      >
                                        Close
                                      </button>
                                      <button
                                        type="submit"
                                        className="btn px-4 py-2 text-uppercase fw-semibold"
                                        style={{
                                          fontSize: "12px",
                                          backgroundColor: "#fe5722",
                                          color: "#fff",
                                        }}
                                        data-bs-dismiss="modal"
                                      >
                                        Submit
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                        </div>
                       
                     
                    </div>
                  </div>
                </div>
      </div>
      </div></div>              
               



<div className="container-fluid">
  <div className="row">
    <div className="col">
    <div className="card card-body mb-3">
                  <h6 className="text-start">Notes</h6>
                  <div className="text-end">
                    <button className="btn btn-outline-dark text-uppercase fw-semibold px-3 py-1 text-center rounded-1"   data-bs-toggle="modal"
                              data-bs-target="#StatusModal"
                             
                              style={{fontSize:'12px'}}>Add Status</button>
                  </div>

                  <div
                            className="modal fade"
                            id="StatusModal"
                            tabIndex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog modal-dialog-centered">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h1
                                    className="modal-title fs-5"
                                    id="staticBackdropLabel"
                                  >
                                    Application Status
                                  </h1>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                   
                                  ></button>
                                </div>
                                <div className="modal-body">
                                <form >
                                    <div className="input-group mb-3">
                                      <span
                                        className="input-group-text"
                                        id="basic-addon1"
                                      >
                                        <i className="fa fa-tasks nav-icon text-dark"></i>
                                      </span>
                                      <select
                                        name="newStatus"
                                        
                                        className="form-select"
                                        style={{ fontSize: "12px" }}
                                      >
                                        <option value="">Select Status</option>
                                      
                                      </select>
                                    
                                    </div>
                                    <div className="input-group mb-3 visually-hidden">
                                      <span
                                        className="input-group-text"
                                        id="basic-addon1"
                                      >
                                        <i className="fa fa-tasks nav-icon text-dark"></i>
                                      </span>
                                      <input
                                        type="text"
                                        name="duration"
                                        value="0"
                                       
                                        className="form-control"
                                        placeholder="Enter Status...."
                                        aria-label="Status"
                                        aria-describedby="basic-addon1"
                                        style={{ fontSize: "12px" }}
                                      />
                                    
                                    </div>
                                    <div className="input-group mb-3">
                                     
                                      <RichTextEditor
                                        placeholder="Start writing your content here..."
                                        name="commentBox"
                                        
                                        type="text"
                                        style={{
                                          fontFamily: "Plus Jakarta Sans",
                                          fontSize: "12px",
                                         
                                          zIndex: "0",
                                        }}
                                      />
                                     
                                    </div>
                                    <div className="input-group mb-3">
                                      <span
                                        className="input-group-text"
                                        id="basic-addon1"
                                      >
                                        <i className="fa fa-file nav-icon text-dark"></i>
                                      </span>
                                      <input
                                        type="file"
                                        className="form-control "
                                        style={{
                                          fontFamily: "Plus Jakarta Sans",
                                          fontSize: "12px",
                                        }}
                                        placeholder="Enter  Image upload"
                                        name="document"
                                        
                                      />
                                    </div>
                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn px-4 py-2 text-uppercase fw-semibold"
                                        data-bs-dismiss="modal"
                                        style={{
                                          fontSize: "12px",
                                          backgroundColor: "#231f20",
                                          color: "#fff",
                                        }}
                                      >
                                        Close
                                      </button>
                                      <button
                                        type="submit"
                                        
                                        className="btn px-4 py-2 text-uppercase fw-semibold"
                                        style={{
                                          fontSize: "12px",
                                          backgroundColor: "#fe5722",
                                          color: "#fff",
                                        }}
                                        // data-bs-bs-dismiss="modal"
                                      >
                                        Submit
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                </div>
    </div>
  </div>
</div>

<div className="container-fluid my-2">
  <div className="row flex-nowrap">
   
    <div className="col-md-4 col-sm-4 d-flex flex-column justify-content-between overflow-auto border-end">
      <div className="card border-0 rounded-1 shadow-sm vh-100 min-vh-100 overflow-auto">
        <div className="card-header bg-white border-0">
         
          <div className="text-center">
                          <button
                            aria-valuenow="75"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            className="btn btn-sm text-capitalize fw-semibold rounded-pill text-white  position-relative"
                            style={{
                              fontSize: "10px",
                              backgroundColor: "#7627ef",
                              border: "none",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              className="position-absolute top-50 start-50 translate-middle"
                              style={{
                                width: "100%",
                                height: "100%",
                                backgroundColor: "#ffffff",
                                opacity: 0.2,
                              }}
                            >
                              <div
                                className="progress position-relative"
                                style={{ height: "100%" }}
                              >
                                <div
                                  className="progress-bar progress-bar-striped progress-bar-animated"
                                  style={{ width: "75%", height: "100%" }}
                                ></div>
                              </div>
                            </div>
                            <span>Document</span>
                          </button>
                          <div className="text-center">
                            <small>(75%) Completed</small>
                          </div>
                        </div>
        </div>
        <div className="card-body p-4">
  <img
    src= "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
    className="card-img-top rounded-circle border-0"
    alt="Profile"
    style={{ width: "3rem", height: "3rem" }}
  />  
  <p>
    Application Status -  submitted
  </p>
  
  
    <div>
     
        <a
          href='#'
          target="_blank"
          
         
          className="d-flex gap-2 align-items-center mb-2 text-decoration-none"
        >
          <div className="me-2">
            
              <img
                src={""}
                className="card-img-top border-0 me-2"
                alt="Document"
                style={{ width: "10rem", height: "3rem" }}
              />
           
              <div
                className="card-img-top border-0 me-2 d-flex justify-content-center align-items-center"
                style={{ width: "10rem", height: "3rem", backgroundColor: "#f0f0f0" }}
              >
                
                <p className="mb-0" style={{ fontSize: "12px", color: "#888"}}>
                  No Document
                </p>
              </div>
          
            <p className="card-text mb-0" style={{ fontSize: "12px" }}>
            
            </p>
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-0 p-0">

<p classname='mb-0'><small>Sent</small></p>

<p classname='mb-0'><small>Time</small></p>
</div>
          </div>
          <i className="fa fa-eye" aria-hidden="true"></i>
        </a>
        
        
      
    
    </div>
    
 
</div>

      </div>
    </div>
    
    
    <div className="col-md-8 col-sm-8">
      <div className="card border-0 rounded-1 shadow-sm vh-100 min-vh-100 overflow-auto">
        <div className="card-header bg-white sticky-top">
          <h6 className="card-title">Application Track</h6>
        </div>
        
      
        <div className="collapse" id="taggingSection">
        <div className="btn btns-m border-0 rounded-1 btn-danger float-end m-2"  data-bs-toggle="collapse" data-bs-target="#taggingSection"><i className="fa fa-minus" aria-hidden="true"></i>&nbsp;Hide</div>
          <div className="card-body p-4 border rounded-1">
           
            <form>
              <div className="form-group mb-3">
                <label for="tagPerson">Tag Person</label>
                <input
                  type="text"
                  className="form-control rounded-1 text-muted"
                  id="tagPerson"
                  placeholder="Enter person's name"
                  style={{ fontSize: "12px" }}
                />
              </div>
              <div className="form-group mb-3">
                <label for="subject">Subject</label>
                <RichTextEditor
                  placeholder="Start writing your content here..."
                  name="content"
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: "12px"
                  }}
                  controls={[
                    ['bold', 'italic', 'underline', 'strike'],
                    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                    ['unorderedList', 'orderedList'],
                    ['indent', 'outdent'],
                    ['link', 'image', 'video'],
                    ['blockquote', 'codeBlock'],
                    ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify'],
                    ['subscript', 'superscript'],
                    ['color', 'backgroundColor']
                  ]}
                />
              </div>
              <button type="submit" className="btn btn-primary float-end border-0 rounded-1 ">Send</button>
            </form>
          </div>
        </div>
        
       
        <div className="card-body ">
          <div className="chat-messages">
            <div className="container-fluid">

              <div className="row">
            
                <div className="d-flex justify-content-end mb-4">
                  <div  className="profile-content">
                  <img
            src={"https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"}
            className="card-img-top rounded-circle border-0"
            alt="Profile"
            style={{ width: "4.5rem", height: "4.5rem" }}
          />
                  </div>
               
                  <div  className="col-10">
                    <div className="card ">
                      <div className="card-header text-bg-danger">
                      
                        <p className="mb-0">Application Decision:</p>
                        <div className="d-flex gap-2">
                        <p className="mb-0"></p>
                        <button className="btn btn-sm btn-link text-white" type="button" data-bs-toggle="collapse" data-bs-target="#taggingSection">
                        <i className="fa fa-reply" aria-hidden="true"></i>
                        </button>
                        </div>
                       
                      </div>
                      <div className="card-body">
                      <RichTextEditor
                                                
                                                readOnly
                                              /> <br/><br/>
                          Sincerely,<br/>
                          <br />
                        Edufynd

                      
                        <div className="d-flex flex-column align-items-end justify-content-end">
                          <p className="mb-0"><b>Duration</b>- Days</p>
                          <p className="mb-0"><b>Delayed</b>- Days</p>
                        </div>

                        <div className="d-flex flex-wrap justify-content-between align-items-center mb-0 p-0">

<p classname='mb-0'><small>Sent</small></p>

<p classname='mb-0'><small>Time</small></p>
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
<div className="container-fluid my-2">
  <div className="row ">
    <div className="col-12 col-lg-7 col-auto">
      <ul className="list-unstyled">
        
        <li className="mb-4 position-relative">
          <div className="row align-items-start g-0">

          <div className="col-1 d-flex justify-content-center align-items-center">
              <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center" style={{width: '2rem', height: '2rem'}}>
                <i className="fas fa-check" />
              </div>
            </div>
            <div className="col-4 text-center">
              <p className="mb-1 fw-semibold text-muted">23 August, 2023 10:30 AM</p>
              <p className="mb-0 text-muted">Changed by:<strong>John Doe</strong></p>
            </div>
           
          
           
            <div className="col-7">
            <div className="mb-3">
              
              <div className="bg-success text-white rounded-3 p-2">
                <h6 className="mb-1">New University Name</h6>
                <p className="mb-0">University Y</p>
              </div>
            </div>
              <div className="mb-3">
             
                <div className="bg-danger text-white rounded-3 p-2">
                  <h6 className="mb-1">Old University Name</h6>
                  <p className="mb-0">University X</p>
                </div>
              </div>
           
            </div>
          </div>
          <div className="position-absolute top-0 start-0 translate-middle-x" style={{width: 2, height: '100%', backgroundColor: '#007bff'}} />
        </li>
       
      </ul>
    </div>
  </div>
</div>
        </div>
      </div>
    </>
  );
};
export default StudentForm;
