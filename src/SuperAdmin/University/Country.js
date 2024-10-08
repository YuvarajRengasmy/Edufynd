import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../compoents/sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { updateApplication, getSingleApplication } from "../../api/applicatin";
import { getFilterStatus } from "../../api/status";
import { getFilterApplicationStatus } from "../../api/universityModule/ApplicationStatus";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { RichTextEditor } from "@mantine/rte";
import BackButton from "../../compoents/backButton";
import Select from "react-select";

export const ViewApplication = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const modalRef = useRef(null);

  const initialState = {
    newStatus: "",
    commentBox: "",
    document: "",
    duration: "",
    progress: "",
    subCategory: [],
  };

  const initialStateErrors = {
    newStatus: { required: false },
    commentBox: { required: false },
    document: { required: false },
    duration: { required: false },
    progress: { required: false },
    subCategory: { required: false },
  };

  const [track, setTrack] = useState(initialState);
  const [tracks, setTracks] = useState([]);
  const [application, setApplication] = useState([]);
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
  const [subCategories, setSubCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getAllModuleDetails();
      getApplicationDetails();
      getAllApplicationsModuleDetails();
      getAgentList();
    }
  }, [id]);

  const getAgentList = () => {
    getSingleApplication(id)
      .then((res) => {
        setTracks(res?.data?.result || []);
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
            newStatus: res.data.result.status || "",
            commentBox: res.data.result.comment || "",
            document: res.data.result.document || "",
            subCategory: res.data.result.subCategory || [],
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const getAllApplicationsModuleDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };
    getFilterApplicationStatus(data)
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

  const getAllModuleDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };
    getFilterStatus(data)
      .then((res) => {
        setApplication(res?.data?.result?.statusList || []);
        setPagination({
          ...pagination,
          count: res?.data?.result?.statusCount || 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRichTextChange = (value) => {
    setTrack((prevUniversity) => ({
      ...prevUniversity,
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
        [name]: value,
      }));
    }

    if (submitted) {
      const newError = handleValidation({
        ...track,
        [event.target.name]: event.target.value,
      });
      setTrackErrors(newError);
    }
  };

  const handleEditModule = (item) => {
    setTrack({
      newStatus: item.statusName,
      duration: item.duration,
      subCategory: item.subCategory || [],
      commentBox: "",
      document: "", // Initialize commentBox as empty or with a value if needed
    });
    setIsEditing(true);
    setEditId(item._id);
    setSubmitted(false);
    setTrackErrors(initialStateErrors);
    setSubCategories(item.subCategory || []); // Fetch subcategories when editing
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

  const handleSelectChange = (selectedOptions, action) => {
    const { name } = action;
    const values = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    setTrack((prevUniversity) => ({ ...prevUniversity, [name]: values }));
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
          status: {
            ...track,
            progress: 100, // Set progress to 100% upon submission
          },
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

  const getProgressColor = (progress) => {
    if (progress === 0) return "#e0e0e0"; // Gray for 0 progress
    if (progress < 50) return "#ff9800"; // Orange for <50%
    if (progress < 100) return "#ffc107"; // Yellow for <100%
    return "#4caf50"; // Green for 100%
  };

  return (
    <>
      <Sidebar />
      <div
        className="content-wrapper"
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
      >
        <div className="content-header text-end">
          <BackButton />
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div className="container-fluid">
                <div className="row">
                  <div className="col">
                    <div className="card border-0 rounded-1 shadow-sm p-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          {status
                            .sort((a, b) => a.position - b.position) // Sort by position
                            .map((item, index) => (
                              <div
                                className="position-relative m-2"
                                key={index}
                                style={{ flex: "1 1 auto", maxWidth: "10%" }}
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
                                        backgroundColor: getProgressColor(
                                          item.progress
                                        ),
                                      }}
                                    ></div>
                                  </div>

                                  <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip>{item.position}</Tooltip>}
                                  >
                                    <button
                                      type="button"
                                      className="position-absolute top-0 start-0 translate-middle btn btn-light text-secondary border-0 rounded-circle"
                                      onClick={() => handleEditModule(item)}
                                      style={{
                                        width: "2.5rem",
                                        height: "2.5rem",
                                        zIndex: "1",
                                      }}
                                      disabled={item.progress === 100}
                                    >
                                      <i className="fa fa-pencil"></i>
                                    </button>
                                  </OverlayTrigger>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal fade" id="editModal" tabIndex="-1">
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">
                          Edit Application Status
                        </h5>
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
                          {/* Status Input */}
                          <div className="input-group col-6 mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              <i className="fa fa-tasks nav-icon text-dark"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Status"
                              name="newStatus"
                              value={track.newStatus}
                              onChange={handleTrack}
                            />
                            {trackErrors.newStatus.required && (
                              <span className="text-danger">
                                Status is required
                              </span>
                            )}
                          </div>

                          {/* Duration Input */}
                          <div className="input-group col-6 mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              <i className="fa fa-hourglass-start nav-icon text-dark"></i>
                            </span>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Duration"
                              name="duration"
                              value={track.duration}
                              onChange={handleTrack}
                            />
                            {trackErrors.duration.required && (
                              <span className="text-danger">
                                Duration is required
                              </span>
                            )}
                          </div>

                          {/* Sub Category Input */}
                          <div className="input-group col-6 mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              <i className="fa fa-tasks nav-icon text-dark"></i>
                            </span>
                            <Select
                              isMulti
                              options={subCategories.map((subCat) => ({
                                label: subCat.name,
                                value: subCat._id,
                              }))}
                              name="subCategory"
                              onChange={handleSelectChange}
                              styles={{
                                container: (base) => ({
                                  ...base,
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                  zIndex: "2",
                                }),
                              }}
                              placeholder="Select Sub Category"
                            />
                          </div>

                          {/* Comment Input */}
                          <RichTextEditor
                            value={track.commentBox}
                            onChange={handleRichTextChange}
                          />
                          {trackErrors.commentBox.required && (
                            <span className="text-danger">
                              Comment is required
                            </span>
                          )}

                          {/* Document Input */}
                          <div className="input-group col-6 mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              <i className="fa fa-file nav-icon text-dark"></i>
                            </span>
                            <input
                              type="file"
                              className="form-control"
                              name="document"
                              onChange={handleTrack}
                            />
                          </div>

                          {/* Submit Button */}
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={submitted && !handleErrors(trackErrors)}
                          >
                            {submitted ? (
                              <FaSpinner className="fa-spin" />
                            ) : (
                              "Save Changes"
                            )}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pagination */}
                <div className="row mt-5">
                  <div className="col-md-12 d-flex justify-content-end">
                    <Button
                      variant="outline-secondary"
                      disabled={pagination.from === 0}
                      onClick={() =>
                        setPagination((prev) => ({
                          ...prev,
                          from: prev.from - 10,
                          to: prev.to - 10,
                        }))
                      }
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline-secondary"
                      disabled={
                        pagination.to >= pagination.count ||
                        pagination.to - pagination.from < 10
                      }
                      onClick={() =>
                        setPagination((prev) => ({
                          ...prev,
                          from: prev.from + 10,
                          to: prev.to + 10,
                        }))
                      }
                      className="ms-2"
                    >
                      Next
                    </Button>
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
