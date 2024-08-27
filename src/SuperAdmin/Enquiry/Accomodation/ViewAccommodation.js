import React, { useState, useEffect } from "react";
import { getSingleAccommodationEnquiry } from "../../../api/Enquiry/accommodation";
import { useLocation } from "react-router-dom";
import Flags from "react-world-flags";
import Mastersidebar from "../../../compoents/sidebar";
import { Link } from "react-router-dom";
export const ViewAccommodation = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [accommodation, setAccommodation] = useState(null);

  useEffect(() => {
    getAccommodationDetails();
  }, []);

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
                        <tr>
                          <td className="fw-bold">Source: Student/Agent </td>
                          <td>{accommodation?.source || "Not Available"}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Agent ID </td>
                          <td>{accommodation?.agentId || "Not Available"}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Agent Name </td>
                          <td>{accommodation?.agentName || "Not Available"}</td>
                        </tr>{" "}
                        <tr>
                          <td className="fw-bold">AgentBusiness Name </td>
                          <td>{accommodation?.businessName || "Not Available"}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Agent Primary Number</td>
                          <td>{accommodation?.agentPrimaryNumber || "Not Available"}</td>
                        </tr>{" "}
                        <tr>
                          <td className="fw-bold">Agent WhatsApp Number </td>
                          <td>{accommodation?.agentWhatsAppNumber || "Not Available"}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Agent Email ID </td>
                          <td>{accommodation?.agentEmail || "Not Available"}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Name of the Student </td>
                          <td>{accommodation?.studentName || "Not Available"}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Passport Number </td>
                          <td>{accommodation?.passportNumber || "Not Available"}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Expiry Date </td>
                          <td>Expiry Date</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Student Email ID </td>
                          <td>{accommodation?.email || "Not Available"}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Student Primary Number </td>
                          <td>{accommodation?.primaryNumber || "Not Available"}</td>
                        </tr>{" "}
                        <tr>
                          <td className="fw-bold">Student WhatsApp number </td>
                          <td>{accommodation?.whatsAppNumber || "Not Available"}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">University Name </td>
                          <td>{accommodation?.universityName || "Not Available"}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Course</td>
                          <td>Course</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Accommodation Type </td>
                          <td>Accommodation Type</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Country </td>
                          <td>Country</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">State </td>
                          <td>State</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">City </td>
                          <td>City</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Accommodation Type </td>
                          <td>Accommodation Type</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">
                            Assigned To (List Staff) Multiple Assign
                          </td>
                          <td>{accommodation?.assignedTo || "Not Available"}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Finalised By</td>
                          <td>Finalised By</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Location</td>
                          <td>Location</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">
                            Holding Offer from the University (Yes/No){" "}
                          </td>
                          <td>
                            {accommodation?.holdingOfferFromTheUniversity || "Not Available"}
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-bold">
                            Location where accommodation is required{" "}
                          </td>
                          <td>
                            {
                              accommodation?.locationWhereAccommodationIsRequired || "Not Available"
                            }
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
              </div>
            </div>
          </div>

          {/* <div className="container-fluid">
  <div className="row">
    <div className="col">
    <div className="card border-0 rounded-1 shadow-sm p-3">
                  <div className="card-body">
                    <div className="d-flex   justify-content-between align-items-center">
                      {status.map((item, index) => (
                        <div
                          className="position-relative m-2"
                          key={index}
                          style={{ flex: "1 1 auto", maxWidth: "18%" }}
                        >
                          <div className="position-relative">
                            <div
                              className="progress"
                              role="progressbar"
                              aria-label="Progress"
                              aria-valuenow={item.progress}
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{ height: "9px" }}
                            >
                              <div
                                className="progress-bar progress-bar-striped progress-bar-animated"
                                style={{
                                  width: `${item.progress}%`,
                                  backgroundColor: getProgressColor(item.progress),
                                }}
                              ></div>
                            </div>
                          
                            <div
                              className="progress-bar progress-bar-striped progress-bar-animated"
                              style={{
                                width: `${item.progress}%`,
                                backgroundColor: getProgressColor(item.progress),
                              }}
                            ></div>
                          </div>
                          <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip>{item.duration} Days</Tooltip>}
                          >
                            <button
                              type="button"
                              className="position-absolute text-bold  top-0  start-0 translate-middle-y btn btn-sm btn-primary rounded-pill"
                              data-bs-toggle="modal"
                              data-bs-target={`#modal-${index}`}
                              style={{
                                width: "2rem",
                                height: "2rem",
                                left: "0",
                               
                                color: "#FFF",
                              }}
                              onClick={() => handleEditModule(item)}
                            >
{item.duration} 
                             
                            </button>
                          </OverlayTrigger>
                          <div className="d-flex justify-content-start align-items-center mt-3"> {item.statusName}</div>
                         

                          <div
                            className="modal fade"
                            id={`modal-${index}`}
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
                                    ref={modalRef}
                                  ></button>
                                </div>
                                <div className="modal-body">
                                  <form onSubmit={handleTrackSubmit}>
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
                                        value={track.newStatus}
                                        onChange={handleTrack}
                                        className="form-control"
                                        placeholder="Enter Status...."
                                        aria-label="Status"
                                        aria-describedby="basic-addon1"
                                        style={{ fontSize: "12px" }}
                                      />
                                      {submitted &&
                                        trackErrors.newStatus.required && (
                                          <p className="text-danger">
                                            Status is required
                                          </p>
                                        )}
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
                                        value={track.duration}
                                        onChange={handleTrack}
                                        className="form-control"
                                        placeholder="Enter Status...."
                                        aria-label="Status"
                                        aria-describedby="basic-addon1"
                                        style={{ fontSize: "12px" }}
                                      />
                                      {submitted &&
                                        trackErrors.duration.required && (
                                          <p className="text-danger">
                                            Status is required
                                          </p>
                                        )}
                                    </div>
                                    <div className="input-group mb-3">
                                    
                                      <RichTextEditor
                                        placeholder="Start writing your content here..."
                                        name="commentBox"
                                        onChange={handleRichTextChange}
                                        value={track.commentBox}
                                        type="text"
                                        style={{
                                          fontFamily: "Plus Jakarta Sans",
                                          fontSize: "12px",
                                        
                                          zIndex: "0",
                                        }}
                                      />
                                      {submitted &&
                                        trackErrors.commentBox.required && (
                                          <p className="text-danger">
                                            Comment is required
                                          </p>
                                        )}
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
                                        onChange={handleTrack}
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
                                        onChange={handleTrack}
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
                       
                      ))}
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
                                <form onSubmit={handleTrackSubmit}>
                                    <div className="input-group mb-3">
                                      <span
                                        className="input-group-text"
                                        id="basic-addon1"
                                      >
                                        <i className="fa fa-tasks nav-icon text-dark"></i>
                                      </span>
                                      <select
                                        name="newStatus"
                                        value={track.newStatus}
                                        onChange={handleTrack}
                                        className="form-select"
                                        style={{ fontSize: "12px" }}
                                      >
                                        <option value="">Select Status</option>
                                        {
                                          application.map((status) => (
                                            <option
                                              key={status._id}
                                              value={status.statusName}
                                            >
                                              {status.statusName}
                                            </option>
                                          ))}
                                      </select>
                                      {submitted &&
                                        trackErrors.newStatus.required && (
                                          <p className="text-danger">
                                            Status is required
                                          </p>
                                        )}
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
                                        onChange={handleTrack}
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
                                        onChange={handleRichTextChange}
                                        value={track.commentBox}
                                        type="text"
                                        style={{
                                          fontFamily: "Plus Jakarta Sans",
                                          fontSize: "12px",
                                         
                                          zIndex: "0",
                                        }}
                                      />
                                      {submitted &&
                                        trackErrors.commentBox.required && (
                                          <p className="text-danger">
                                            Comment is required
                                          </p>
                                        )}
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
                                        onChange={handleTrack}
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
                                        data-bs-dismiss="modal"
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

<div className="container-fluid-fluid my-2">
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
    src={tracks?.photo || "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"}
    className="card-img-top rounded-circle border-0"
    alt="Profile"
    style={{ width: "3rem", height: "3rem" }}
  />  {tracks?.createdBy}
  <p>
    Application Status -  {formatDate(tracks?.createdOn)}
  </p>
  
  {tracks?.status && (
    <div>
      {tracks.status.map((item, index) => (
        <a
          href={item?.document || "#"}
          target="_blank"
          
          key={index}
          className="d-flex gap-2 align-items-center mb-2 text-decoration-none"
        >
          <div className="me-2">
            {item?.document ? (
              <img
                src={item?.document}
                className="card-img-top border-0 me-2"
                alt="Document"
                style={{ width: "10rem", height: "3rem" }}
              />
            ) : (
              <div
                className="card-img-top border-0 me-2 d-flex justify-content-center align-items-center"
                style={{ width: "10rem", height: "3rem", backgroundColor: "#f0f0f0" }}
              >
                
                <p className="mb-0" style={{ fontSize: "12px", color: "#888"}}>
                  No Document
                </p>
              </div>
            )}
            <p className="card-text mb-0" style={{ fontSize: "12px" }}>
              {item?.name}
            </p>
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-0 p-0">

<p classname='mb-0'><small>Sent</small></p>

<p classname='mb-0'><small>Time</small></p>
</div>
          </div>
          <i className="fa fa-eye" aria-hidden="true"></i>
        </a>
        
        
      ))}
    
    </div>
    
  )}
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
              {tracks?.status &&
                                        tracks.status.map((item, index) => (
                <div key={index} className="d-flex justify-content-end mb-4">
                  <div  className="profile-content">
                  <img
            src={tracks?.photo || "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"}
            className="card-img-top rounded-circle border-0"
            alt="Profile"
            style={{ width: "4.5rem", height: "4.5rem" }}
          />
                  </div>
               
                  <div  className="col-10">
                    <div className="card ">
                      <div className="card-header text-bg-danger">
                      
                        <p className="mb-0">Application Decision:{item?.newStatus}</p>
                        <div className="d-flex gap-2">
                        <p className="mb-0">{formatDate(item?.createdOn)}</p>
                        <button className="btn btn-sm btn-link text-white" type="button" data-bs-toggle="collapse" data-bs-target="#taggingSection">
                        <i className="fa fa-reply" aria-hidden="true"></i>
                        </button>
                        </div>
                       
                      </div>
                      <div className="card-body">
                      <RichTextEditor
                                                value={item?.commentBox}
                                                readOnly
                                              /> <br/><br/>
                          Sincerely,<br/>
                          {item?.createdBy}<br />
                        Edufynd

                      
                        <div className="d-flex flex-column align-items-end justify-content-end">
                          <p className="mb-0"><b>Duration</b>- {item?.duration}Days</p>
                          <p className="mb-0"><b>Delayed</b>- {item?.delay}Days</p>
                        </div>

                        <div className="d-flex flex-wrap justify-content-between align-items-center mb-0 p-0">

<p classname='mb-0'><small>Sent</small></p>

<p classname='mb-0'><small>Time</small></p>
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
</div> */}
      </div>
    </>
  );
};
export default ViewAccommodation;
