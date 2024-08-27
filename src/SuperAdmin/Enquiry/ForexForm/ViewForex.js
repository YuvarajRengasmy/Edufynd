import React, { useState, useEffect } from "react";
import { getSingleForexEnquiry } from "../../../api/Enquiry/Forex";
import { useLocation } from "react-router-dom";
import Flags from "react-world-flags";
import Mastersidebar from "../../../compoents/sidebar";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { RichTextEditor } from "@mantine/rte";
export const ViewForex = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [forex, setForex] = useState(null);

  useEffect(() => {
    getForexDetails();
  }, []);

  const getForexDetails = () => {
    getSingleForexEnquiry(id)
      .then((res) => {
        setForex(res?.data?.result);
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
        <nav aria-label="breadcrumb">
  <ol className="breadcrumb justify-content-end">
    <li className="breadcrumb-item">
      <Link to='/DashBoard' target="_self" className="text-decoration-none">Dashboard</Link>
    </li>
    <li className="breadcrumb-item">
      <Link to='/ListForexForm' className="text-decoration-none">ListForexForm</Link>
    </li>
   {/* if edit is clicked the page should go to the edit page of that particular uiversity */}
      <li  className="breadcrumb-item">
        <Link to={{
          pathname: "/EditForexForm",
          search: `?id=${ forex?._id}`,
        }} className="text-decoration-none">EditForexForm</Link>
      </li>
  
  </ol>
</nav>
         
        </div>
        <div className="container">
            <div className="card  border-0">
              <div className="card-header  text-bg-primary ">
                <h6 className=" mb-0 p-2 fw-semibold">Forex Enquiry Profile</h6>
              </div>

              {forex ? (
                <div className="card-body">
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h5>Agent Information</h5>
                      <div className="list-group">
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-user-tie me-2 text-dark "></i>
                          <div>
                            <strong>Agent Name:</strong>
                            <p className="mb-0">
                              {forex.agentName || "Not Available"}
                            </p>
                          </div>
                        </div>
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-building me-2 text-dark "></i>
                          <div>
                            <strong>Business Name:</strong>
                            <p className="mb-0">
                              {forex.businessName || "Not Available"}
                            </p>
                          </div>
                        </div>
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-envelope me-2 text-dark "></i>
                          <div>
                            <strong>Agent Email ID:</strong>
                            <p className="mb-0">
                              {forex.agentEmail || "Not Available"}
                            </p>
                          </div>
                        </div>
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-phone me-2 text-dark "></i>
                          <div>
                            <strong>Agent Primary Number:</strong>
                            <p className="mb-0">
                             {forex.dial3 || "+"} {forex.agentPrimaryNumber || "Not Available"}
                            </p>
                          </div>
                        </div>
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fab fa-whatsapp me-2 text-success"></i>
                          <div>
                            <strong>Agent WhatsApp Number:</strong>
                            <p className="mb-0">
                            {forex.dial4 || "+"} {forex.agentWhatsAppNumber || "Not Available"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <h5>Student Information</h5>
                      <div className="list-group">
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-user me-2 text-dark "></i>
                          <div>
                            <strong>Name of the Student:</strong>
                            <p className="mb-0">
                              {forex.studentName || "Not Available"}
                            </p>
                          </div>
                        </div>
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-passport me-2 text-dark "></i>
                          <div>
                            <strong>Passport No:</strong>
                            <p className="mb-0">
                              {forex.passportNo || "Not Available"}
                            </p>
                          </div>
                        </div>
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-calendar-alt me-2 text-dark "></i>
                          <div>
                            <strong>Expiry Date:</strong>
                            <p className="mb-0">
                              {forex.expiryDate || "Not Available"}
                            </p>
                          </div>
                        </div>
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-envelope me-2 text-dark "></i>
                          <div>
                            <strong>Email ID:</strong>
                            <p className="mb-0">
                              {forex.email || "Not Available"}
                            </p>
                          </div>
                        </div>
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-phone me-2 text-dark "></i>
                          <div>
                            <strong>Primary Number:</strong>
                            <p className="mb-0">
                            {forex.dial1 || "+"} {forex.primaryNumber || "Not Available"}
                            </p>
                          </div>
                        </div>
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fab fa-whatsapp me-2 text-success"></i>
                          <div>
                            <strong>WhatsApp Number:</strong>
                            <p className="mb-0">
                            {forex.dial2 || "+"} {forex.whatsAppNumber || "Not Available"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h5>Transaction Details</h5>
                      <div className="list-group">
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-globe me-2 text-dark "></i>
                          <div>
                            <strong>Country:</strong>
                            <p className="mb-0">
                              {forex.country || "Not Available"}
                            </p>
                          </div>
                        </div>
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-dollar-sign me-2 text-dark "></i>
                          <div>
                            <strong>Currency:</strong>
                            <p className="mb-0">
                              <Flags
                                code={forex.flag}
                                className="me-2"
                                name="flag"
                                style={{ width: "30px", height: "20px" }}
                              />
                              {forex.currency || "Not Available"}
                            </p>
                          </div>
                        </div>
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-money-bill-wave-alt me-2 text-dark "></i>
                          <div>
                            <strong>Amount In Currency:</strong>
                            <p className="mb-0">
                              {forex.amountInCurrency || "Not Available"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <h5>Additional Details</h5>
                      <div className="list-group">
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-user-tag me-2 text-dark "></i>
                          <div>
                            <strong>Assigned To:</strong>
                            <p className="mb-0">
                              {forex.assignedTo || "Not Available"}
                            </p>
                          </div>
                        </div>
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-percent me-2 text-dark "></i>
                          <div>
                            <strong>Mark up:</strong>
                            <p className="mb-0">
                              {forex.markUp || "Not Available"}
                            </p>
                          </div>
                        </div>
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-calculator me-2 text-dark "></i>
                          <div>
                            <strong>Profit (Value*Mark up):</strong>
                            <p className="mb-0">
                              {forex.profit || "Not Available"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-4">
                  <p>Loading...</p>
                </div>
              )}
            </div>

            <div class="card mb-3">
                  <div class="card-header bg-primary text-white">
                   Agent Details
                  </div>
                  <div class="card-body ">
                  <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-graduation-cap"></i>Agent Name:
                      </div>
                      <div class="col-6">John doe</div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-graduation-cap"></i>Agent Business Name:
                      </div>
                      <div class="col-6">John doe</div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-graduation-cap"></i>Agent Primary Number:
                      </div>
                      <div class="col-6">John doe</div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-graduation-cap"></i>Agent Whatsapp Number:
                      </div>
                      <div class="col-6">John doe</div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-graduation-cap"></i>Agent Email:
                      </div>
                      <div class="col-6">John doe</div>
                    </div>

                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-graduation-cap"></i>Student Name:
                      </div>
                      <div class="col-6">John doe</div>
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
      </div>
    </>
  );
};

export default ViewForex;
