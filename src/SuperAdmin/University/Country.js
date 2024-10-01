import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../compoents/sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { updateApplication, getSingleApplication } from "../../api/applicatin";
import { getFilterStatus } from "../../api/status";
import { getFilterApplicationStatus } from "../../api/universityModule/ApplicationStatus";
import { toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { RichTextEditor } from "@mantine/rte";
// import BackButton from "../../components/backButton";

export const ViewApplication = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const modalRef = useRef(null);

  const initialState = {
    newStatus: "",
    commentBox: "",
    document: "",
    duration: "",
  };

  const initialStateErrors = {
    newStatus: { required: false },
    commentBox: { required: false },
    document: { required: false },
    duration: { required: false },
  };

  const [track, setTrack] = useState(initialState);
  const [tracks, setTracks] = useState([]);
  const [application, setApplication] = useState([]);
  const [trackErrors, setTrackErrors] = useState(initialStateErrors);
  const [status, setStatus] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentStep, setCurrentStep] = useState(0); // Track the current step
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getAllModuleDetails();
      getApplicationDetails();
    }
  }, [id]);

  const getApplicationDetails = () => {
    getSingleApplication(id)
      .then((res) => {
        if (res.data.result?.status) {
          setTrack({
            newStatus: res.data.result.status || "",
            commentBox: "",
            document: "",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const getAllModuleDetails = () => {
    getFilterApplicationStatus({ limit: 10, page: 1 })
      .then((res) => {
        setStatus(res?.data?.result?.statusList || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRichTextChange = (value) => {
    setTrack((prevTrack) => ({
      ...prevTrack,
      commentBox: value,
    }));
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

  const handleTrack = (event) => {
    const { name, value } = event.target;
    setTrack((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditModule = (item, index) => {
    setTrack({
      newStatus: item.statusName,
      duration: item.duration,
      commentBox: "",
      document: "",
    });
    setIsEditing(true);
    setEditId(item._id);
    setCurrentStep(index); // Set the current step to control visibility
  };

  const handleTrackSubmit = (event) => {
    event.preventDefault();
    const newErrorEducation = handleValidation(track);
    setTrackErrors(newErrorEducation);
    
    if (!newErrorEducation.newStatus.required && !newErrorEducation.commentBox.required) {
      if (id) {
        const data = {
          _id: id,
          status: track,
        };
        updateApplication(data)
          .then((res) => {
            toast.success("Successfully updated application status");
            getAllModuleDetails();
            setCurrentStep((prevStep) => prevStep + 1); // Move to the next step
            if (modalRef.current) {
              modalRef.current.click(); // Close the modal
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const getProgressColor = (progress) => {
    if (progress === 0) return "#e0e0e0"; // Gray for 0 progress
    if (progress < 50) return "#ff9800"; // Orange for <50%
    if (progress < 100) return "#ffc107"; // Yellow for <100%
    return "#4caf50"; // Green for 100%
  };

  return (
    <>
      <Sidebar />
      <div className="content-wrapper">
        {/* <div className="content-header text-end">
          <BackButton />
        </div> */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div className="card border-0 rounded-1 shadow-sm p-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
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
                        </div>

                        <OverlayTrigger
                          placement="bottom"
                          overlay={<Tooltip>{item.duration} Days</Tooltip>}
                        >
                          <button
                            type="button"
                            className="position-absolute text-bold top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center btn btn-link text-dark text-decoration-none"
                            disabled={currentStep !== index} // Disable if not the current step
                            data-bs-toggle="modal"
                            data-bs-target="#edits-status"
                            onClick={() => handleEditModule(item, index)}
                          >
                            {item.statusName}
                            {item.progress === 100 && (
                              <FaCheckCircle
                                className="ms-2"
                                style={{ color: "#4caf50" }}
                              />
                            )}
                          </button>
                        </OverlayTrigger>
                      </div>
                    ))}
                  </div>

                  {/* Modal */}
                  <div
                    className="modal fade"
                    id="edits-status"
                    tabIndex="-1"
                    aria-labelledby="edits-statusLabel"
                    aria-hidden="true"
                    ref={modalRef}
                  >
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content">
                        <form onSubmit={handleTrackSubmit}>
                          <div className="modal-header">
                            <h5 className="modal-title" id="edits-statusLabel">
                              {isEditing
                                ? `Edit Status: ${track.newStatus}`
                                : "Add New Status"}
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>

                          <div className="modal-body">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Status Comment
                                  </label>
                                  <RichTextEditor
                                    value={track.commentBox}
                                    onChange={handleRichTextChange}
                                    placeholder="Enter comment"
                                  />
                                  {trackErrors.commentBox.required && (
                                    <span className="text-danger">
                                      Comment is required
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="submit"
                              className="btn btn-primary"
                            >
                              Save changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  {/* End Modal */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewApplication ;