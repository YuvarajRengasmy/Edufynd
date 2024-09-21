import React, { useState, useEffect } from "react";
import { getSingleAccommodationEnquiry,getSingleLogUniversity } from "../../../api/Enquiry/accommodation";
import { useLocation } from "react-router-dom";
import Flags from "react-world-flags";
import Mastersidebar from "../../../compoents/sidebar";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { RichTextEditor } from "@mantine/rte";
export const ViewAccommodation = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [accommodation, setAccommodation] = useState(null);
  const [logs, setLogs] = useState([]);


  useEffect(() => {
    getAccommodationDetails();
    getUniversityLogs();
  }, []);

  const getUniversityLogs = () => {
    getSingleLogUniversity(id)
      .then((res) => {
        console.log("yuvi",res);
        setLogs(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAccommodationDetails = () => {
    getSingleAccommodationEnquiry(id)
      .then((res) => {
        console.log("res", res);
        setAccommodation(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Mastersidebar />

      <div className="content-wrapper" style={{ fontSize: "14px" }}>
      
        <div className="content-header">

        <nav aria-label="breadcrumb">
  <ol className="breadcrumb justify-content-end">
    <li className="breadcrumb-item">
      <Link to='/DashBoard' target="_self" className="text-decoration-none">Dashboard</Link>
    </li>
    <li className="breadcrumb-item">
      <Link to='/ListAccommodation' className="text-decoration-none">ListAccommodation</Link>
    </li>
   {/* if edit is clicked the page should go to the edit page of that particular uiversity */}
      <li  className="breadcrumb-item">
        <Link to={{
          pathname: "/EditAccommodation",
          search: `?id=${ accommodation?._id}`,
        }} className="text-decoration-none">EditAccommodation</Link>
      </li>
  
  </ol>
</nav>
         
        </div>
        <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                  <div
                    className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0"
                    style={{ background: "#fe5722", color: "#fff" }}
                  >
                    <h6 className="text-center text-capitalize p-1 h6">
                      View Accommodation Enquiry Details
                    </h6>
                  </div>

                  <div class="card-body">
                    <table
                      className="table table-hover table-bordered table-striped-columns mt-5"
                      style={{
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "14px",
                      }}
                    >
                      <tbody>
  {accommodation?.agentName ? (
    <>
      <tr>
        <td className="fw-bold">Source: Student/Agent</td>
        <td>{accommodation?.source || "Not Available"}</td>
      </tr>
     
      <tr>
        <td className="fw-bold">Agent Name</td>
        <td>{accommodation?.agentName || "Not Available"}</td>
      </tr>
      <tr>
        <td className="fw-bold">Agent Business Name</td>
        <td>{accommodation?.businessName || "Not Available"}</td>
      </tr>
      <tr>
        <td className="fw-bold">Agent Primary Number</td>
        <td>{accommodation?.dial3 + " " + accommodation?.agentPrimaryNumber || "Not Available"}</td>
      </tr>
      <tr>
        <td className="fw-bold">Agent WhatsApp Number</td>
        <td>{accommodation?.dial4 + " " +accommodation?.agentWhatsAppNumber || "Not Available"}</td>
      </tr>
      <tr>
        <td className="fw-bold">Agent Email ID</td>
        <td>{accommodation?.agentEmail || "Not Available"}</td>
      </tr>
    </>
  ) : (
    <>
      <tr>
        <td className="fw-bold">Name of the Student</td>
        <td>{accommodation?.studentName || "Not Available"}</td>
      </tr>
      
    </>
  )}
  {/* Common fields */}
  <tr>
        <td className="fw-bold">Name of the Student</td>
        <td>{accommodation?.name || "Not Available"}</td>
      </tr>
      <tr>
        <td className="fw-bold">Passport Number</td>
        <td>{accommodation?.passportNumber || "Not Available"}</td>
      </tr>
      <tr>
        <td className="fw-bold">Expiry Date</td>
        <td>{accommodation?.expiryDate || "Not Available"}</td>
      </tr>
      <tr>
        <td className="fw-bold">Student Email ID</td>
        <td>{accommodation?.email || "Not Available"}</td>
      </tr>
      <tr>
        <td className="fw-bold">Student Primary Number</td>
        <td>{accommodation?.dial1 + " " +accommodation?.primaryNumber || "Not Available"}</td>
      </tr>
      <tr>
        <td className="fw-bold">Student WhatsApp number</td>
        <td>{accommodation?.dial2 + " " +accommodation?.whatsAppNumber || "Not Available"}</td>
      </tr>
      <tr>
        <td className="fw-bold">University Name</td>
        <td>{accommodation?.universityName || "Not Available"}</td>
      </tr>
  <tr>
    <td className="fw-bold">Course</td>
    <td>{accommodation?.courseType || "Not Available"}</td>
  </tr>
  <tr>
    <td className="fw-bold">Accommodation Type</td>
    <td>{accommodation?.accommodationType || "Not Available"}</td>
  </tr>
  <tr>
    <td className="fw-bold">Country</td>
    <td>{accommodation?.country || "Not Available"}</td>
  </tr>
  <tr>
    <td className="fw-bold">State</td>
    <td>{accommodation?.state || "Not Available"}</td>
  </tr>
  <tr>
    <td className="fw-bold">City</td>
    <td>{accommodation?.lga || "Not Available"}</td>
  </tr>
  <tr>
    <td className="fw-bold">Assigned To (List Staff) Multiple Assign</td>
    <td>{accommodation?.assignedTo || "Not Available"}</td>
  </tr>
  <tr>
    <td className="fw-bold">Finalised By</td>
    <td>{accommodation?.final || "Not Available"}</td>
  </tr>
  
 
 
</tbody>

                    </table>
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
  <div className="row ">
    <div className="col-12 col-lg-7 col-auto">
      <ul className="list-unstyled">
        {logs.map((log, index) => (
           <li className="mb-4 position-relative" key={index}>
           <div className="row align-items-start g-0">

             <div className="col-1 d-flex justify-content-center align-items-center">
               <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center" style={{width: '2rem', height: '2rem'}}>
                 <i className="fas fa-check" />
               </div>
             </div>
             <div className="col-4 text-center">
               <p className="mb-1 fw-semibold text-muted">{new Date(log.createdOn).toLocaleString()}</p>
               <p className="mb-0 text-muted">Changed by:<strong>{log.userType || "Unknown User"}</strong></p>
             </div>

             <div className="col-12">
               {log.changes.map((change, changeIndex) => (
                 <div key={changeIndex} className="mb-3">
                   <div className="bg-success text-white rounded-3 p-2">
                     <h6 className="mb-1"><i className="fas fa-tag "> Label Name --</i> {change.field}</h6>
                     <p className="mb-0"> <i className="fa fa-database "> New Data --</i>  {change.newValue}</p>
                   </div>
                   <div className="bg-danger text-white rounded-3 p-2 mt-2">
                     <h6 className="mb-1"><i className="fas fa-tag "> Label Name --</i>{change.field}</h6>
                     <p className="mb-0"><i className="fa fa-database "> Old Data --</i>{change.oldValue}</p>
                   </div>
                 </div>
               ))}
             </div>
           </div>
           <div className="position-absolute top-0 start-0 translate-middle-x" style={{width: 2, height: '100%', backgroundColor: '#007bff'}} />
         </li>
        ))}
      </ul>
    </div>
  </div>
</div>

      </div>
    </>
  );
};
export default ViewAccommodation;
