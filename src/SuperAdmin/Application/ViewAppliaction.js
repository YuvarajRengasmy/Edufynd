import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../compoents/sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { updateApplication, getSingleApplication } from "../../api/applicatin";
import { getAllStatus, getFilterStatus } from "../../api/status";
import { toast } from "react-toastify";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
export const ViewApplication = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const modalRef = useRef(null);

  const initialState = {
    newStatus: "",
    commentBox: "",
    document: "",
  };

  const initialStateErrors = {
    newStatus: { required: false },
    commentBox: { required: false },
    document: { required: false },
  };

  const [track, setTrack] = useState(initialState);
  const [trackErrors, setTrackErrors] = useState(initialStateErrors);
  const [status, setStatus] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: 10,
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getAllModuleDetails();
      getApplicationDetails();
      getAgentList();
    }
  }, [id]);

  const getAgentList = () => {
    getSingleApplication(id)
      .then((res) => {
        console.log("yuvi", res);
        setTrack(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getApplicationDetails = () => {
    getSingleApplication(id)
      .then((res) => {
        
        if (res.data.result?.status) {
          setTrack({
            newStatus: res.data.result || "",
            commentBox: res.data.result || "",
            document: res.data.result || "",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const getAllModuleDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };
    getFilterStatus(data)
      .then((res) => {
        setStatus(res?.data?.result?.statusList || []);
        setPagination({
          ...pagination,
          count: res?.data?.result?.statusCount || 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleValidation = (data) => {
    let error = { ...initialStateErrors };
    if (!data.newStatus) {
      error.newStatus.required = true;
    }
    if (!data.commentBox) {
      error.commentBox.required = true;
    }
    return error;
  };
  const convertToBase64 = (e, name) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setTrack((prevUniversity) => ({
        ...prevUniversity,
        [name]: reader.result,
      }));
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };
  const handleTrack = (event) => {
    const { name, value, files } = event.target;
    if (files && files[0]) {
      convertToBase64(event, name);
    } else {
      setTrack((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
    if (submitted) {
      const newError = handleValidation({...track,
        [event.target.name]: event.target.value,});
      setTrackErrors(newError);
    }
  };
  

  const handleEditModule = (item) => {
    setTrack({
      newStatus: item.statusName,
      commentBox: "",
      document:"" // Initialize commentBox as empty or with a value if needed
    });
    setIsEditing(true);
    setEditId(item._id);
    setSubmitted(false);
    setTrackErrors(initialStateErrors);
  };

  const handleErrors = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const prop = obj[key];
        if (prop.required === true || prop.valid === true) {
          return false;
        }
      }
    }
    return true;
  };

  const handleTrackSubmit = (event) => {
    event.preventDefault();
    const newErrorEducation = handleValidation(track);
    setTrackErrors(newErrorEducation);
    setSubmitted(true);
    if (handleErrors(newErrorEducation)) {
      if (id) {
        const data = {
          _id: id,
          status: track,
        };
        updateApplication(data)
          .then((res) => {
            toast.success("Successfully updated application status");
            getAllModuleDetails();
            if (modalRef.current) {
              modalRef.current.click(); // Close the modal
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const getProgress = (statusIndex) => {
    const completedCount = status.slice(0, 2).length; // Assume first two statuses are completed
    const totalCount = status.length;
    const percentage = (completedCount / totalCount) * 100;
    return percentage;
  };

  return (
    <>
      <Sidebar />
      <div
        className="content-wrapper"
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
      >
        <div className="content-header">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
              <div className="card border-0">
              <div className="card-header bg-primary text-white">
                      <h5 className="mb-0">Personal Information</h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <p>
                            <i className="fas fa-user me-2"></i>
                            <strong>Name</strong> Jameslee
                          </p>
                          <p>
                            <i className="fas fa-envelope me-2"></i>
                            <strong>Email</strong> jameslee123@gmail.com
                          </p>
                          <p>
                            <i className="fas fa-mobile-alt me-2"></i>
                            <strong>Contact Number</strong> +123456789
                          </p>
                          <p>
                            <i className="fas fa-globe me-2"></i>
                            <strong>Country</strong> America
                          </p>
                          <p>
                            <i className="fas fa-flag me-2"></i>
                            <strong>Intake</strong> Falls
                          </p>
                          
                        </div>
                        
                      </div>
                    </div>
                </div>
                <div className="card border-0 shadow-sm p-2">
                  <div className="card-body">
                    <div className="d-flex flex-row flex-wrap justify-content-around align-items-center">
                      {status.map((item, index) => (
                        <div
                          className="position-relative m-2"
                          key={index}
                          style={{ flex: "1 1 auto", maxWidth: "18%" }}
                        >
                          <div className="position-relative">
                            <div className="progress" role="progressbar" aria-label="Progress" aria-valuenow={getProgress(index)} aria-valuemin="0" aria-valuemax="100" style={{ height: "7px" }}>
                              <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${getProgress(index)}%` }}></div>
                            </div>
                            <button
                              type="button"
                              className="position-absolute text-bold top-0 translate-middle btn btn-sm btn-primary rounded-pill"
                              data-bs-toggle="modal"
                              data-bs-target={`#modal-${index}`}
                              style={{ width: "3rem", height: "3rem", left: '0', fontSize: '10px', color: '#FFF' }}
                              onClick={() => handleEditModule(item)}
                            >
                              </button>
                              <div
                                className="progress-bar progress-bar-striped progress-bar-animated"
                                style={{ width: `${getProgress(index)}%` }}
                              ></div>
                            </div>
                            <OverlayTrigger
                              placement="bottom"
                              overlay={<Tooltip>{item.duration}</Tooltip>}
                            >
                              <button
                                type="button"
                                className="position-absolute text-bold  top-0 translate-middle btn btn-sm btn-primary rounded-pill"
                                data-bs-toggle="modal"
                                data-bs-target={`#modal-${index}`}
                                style={{
                                  width: "3rem",
                                  height: "3rem",
                                  left: "0",
                                  fontSize: "10px",
                                  color: "#FFF",
                                }}
                                onClick={() => handleEditModule(item)}
                              >
                                {item.statusName}
                              </button>
                            </OverlayTrigger>

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
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Application Status</h1>
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
                                        <span className="input-group-text" id="basic-addon1">
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
                                        {submitted && trackErrors.newStatus.required && <p className="text-danger">Status is required</p>}
                                      </div>
                                      <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">
                                          <i className="fa fa-comments nav-icon text-dark"></i>
                                        </span>
                                        <input
                                          type="text"
                                          name="commentBox"
                                          value={track.commentBox}
                                          onChange={handleTrack}
                                          className="form-control"
                                          placeholder="Enter Comment...."
                                          aria-label="CommentBox"
                                          aria-describedby="basic-addon1"
                                          style={{ fontSize: "12px" }}
                                        />
                                        {submitted && trackErrors.commentBox.required && <p className="text-danger">Comment is required</p>}
                                      </div>
                                      <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">
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
                                          style={{ fontSize: '12px', backgroundColor: '#231f20', color: '#fff' }}
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

                <div className="alert alert-primary mb-3"  >
                    <h6>Notes</h6>
                  </div>
                <div className="card border-0 vh-100 overflow-auto">
                  
                  <div className="card-body ">
                    <div className="row justify-content-end">
                    <div className="col-sm-1 align-items-center justify-content-center">

                    <div class="application-profile border-0 ">
  <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" class="card-img-top rounded-circle border-0 " alt="..." style={{width:'4rem',height:'4rem'}}/>
  <div class="card-body">
    <p class="card-text" style={{fontSize:'10px'}}>{track?.name}</p>
  </div>
</div>
                    </div>
  
                      <div className="col-sm-6">
                        <div className="card border-0" >
                          <div className="card-header text-bg-primary">
                            <h6 className="h6">
                              Application Withdrawn - Intake Passed December
                              23rd 2023, 19:09
                            </h6>
                          </div>
                          <div className="card-body">
                       
                          <h1>
                            <b>Application Withdrawn</b>
                          </h1>
                          {track?.status && track.status.map((item, index) => (
  <div key={index}>
    <h4>Status: {item?.newStatus}</h4>
    <p> {item?.commentBox}</p>
    <img src={item?.document?item?.document:"https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"} class="card-img-top rounded-circle border-0 " alt="..." style={{width:'4rem',height:'4rem'}}/>
    <div class="card-body">
      <p class="card-text" style={{fontSize:'10px'}}>{item?.name}</p>
    </div>
    <p>{item?.createdBy}</p>
  </div>
))}
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

export default ViewApplication;
