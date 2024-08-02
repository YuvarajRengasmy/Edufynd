import React, { useEffect, useState,useRef } from "react";
import Sidebar from "../../compoents/sidebar"; // Corrected import path
import { useNavigate, useLocation } from "react-router-dom";
import { trackApplication, getSingleApplication } from "../../api/applicatin"; // Corrected import path
import { getAllStatus, getFilterStatus } from "../../api/status"; // Corrected function name
import { toast } from "react-toastify";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa"; // Import status icons

export const ViewApplication = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const initialState = {
    newStatus: "",
  };

  const initialStateErrors = {
    newStatus: { required: false },
  };

  const [track, setTrack] = useState(initialState);
  const [trackErrors, setTrackErrors] = useState(initialStateErrors);
  const [status, setStatus] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Track if editing
  const [editId, setEditId] = useState(null); // Track the id of the item being edited
  const modalRef = useRef(null);

  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: 5,
  });
  const [submitted, setSubmitted] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null); // For handling the status being edited
  const [statusUpdate, setStatusUpdate] = useState(null); // To track the status of the submission
  const navigate = useNavigate();

  useEffect(() => {
    getAllModuleDetails();
    getApplicationDetails();
  }, [id]);

  const getApplicationDetails = () => {
    getSingleApplication(id)
      .then((res) => setTrack(res.data.result))
      .catch((err) => console.log(err));
  };

  const getAllModuleDetails = () => {
    const data = {
      limit: 5,
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
    return error;
  };

  const handleTrack = (e) => {
    const { name, value } = e.target;
    setTrack({ ...track, [name]: value });
  };
  const handleEditModule = (item) => {
    setTrack(item); // Set the form inputs to the data of the item being edited
    setIsEditing(true); // Set editing mode to true
    setEditId(item._id); // Set the ID of the item being edited
    setSubmitted(false); // Reset submitted state
    setTrackErrors(initialStateErrors); // Reset errors
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

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const newError = handleValidation(track);
    setTrackErrors(newError);
    const allInputsValid = Object.values(newError).every((x) => !x.required);
    if (allInputsValid) {
      const data = {
        ...track,
        _id: editId, // If editing, include the ID in the data
      };
    if (isEditing) {
      trackApplication(data)
        .then((res) => {
          toast.success(res?.data?.message);
         
          setTrack(initialState);
          setTrackErrors(initialStateErrors);
          setSubmitted(false);
          getApplicationDetails(); // Refetch application details
          getAllModuleDetails();
         
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
    }
  };

  // Get progress percentage based on status
  const getProgress = (statusIndex) => {
    const percentage = (statusIndex / status.length) * 100;
    return percentage;
  };

  return (
    <>
      <Sidebar />
      <div className="content-wrapper" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
        <div className="content-header">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="card border-0 shadow-sm p-2">
                  <div className="card-body">
                    <div className="d-flex flex-row flex-wrap justify-content-around align-items-center">
                      {status.map((item, index) => (
                        <div className="position-relative m-2" key={index} style={{ flex: "1 1 auto", maxWidth: "18%" }}>
                          <div className="position-relative">
                            <div className="progress" role="progressbar" aria-label="Progress" aria-valuenow={getProgress(index)} aria-valuemin="0" aria-valuemax="100" style={{ height: "7px" }}>
                              <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${getProgress(index)}%` }}></div>
                            </div>
                            <button
                              type="button"
                              className="position-absolute text-bold text-black top-0 translate-middle btn btn-sm btn-primary rounded-pill"
                              data-bs-toggle="modal"
                              data-bs-target={`#modal-${index}`}
                              style={{ width: "2rem", height: "2rem", left: '0' }}
                              // onClick={() => setSelectedStatus(item._id)}
                              onClick={() => handleEditModule(item)}
                            >
                              {item.statusName}
                            </button>

                            <div className="modal fade" id={`modal-${index}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Application Status</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <div className="modal-body">
                                    <form onSubmit={handleTrackSubmit}>
                                      <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1"><i className="fa fa-tasks nav-icon text-dark"></i></span>
                                        <input
                                          type="text"
                                          name="newStatus"
                                          value={track.newStatus}
                                          onChange={handleTrack}
                                          className="form-control"
                                          placeholder="Enter Status...."
                                          aria-label="Status"
                                          aria-describedby="basic-addon1"
                                          style={{ fontSize: '12px' }}
                                        />
                                      </div>
                                      <div className="modal-footer">
                                        <button type="button" className="btn px-4 py-2 text-uppercase fw-semibold" data-bs-dismiss="modal" style={{ fontSize: '12px', backgroundColor: '#231f20', color: '#fff' }}>Close</button>
                                        <button
                                          type="submit"
                                          className="btn px-4 py-2 text-uppercase fw-semibold"
                                          style={{ fontSize: '12px', backgroundColor: '#fe5722', color: '#fff' }}
                                        >
                                          Submit
                                        </button>
                                      </div>
                                    </form>
                                    {statusUpdate === 'success' && (
                                      <div className="text-center text-success">
                                        <FaCheckCircle size={24} />
                                        <p>Status updated successfully!</p>
                                      </div>
                                    )}
                                    {statusUpdate === 'fail' && (
                                      <div className="text-center text-danger">
                                        <FaTimesCircle size={24} />
                                        <p>Failed to update status.</p>
                                      </div>
                                    )}
                                    {statusUpdate === null && (
                                      <div className="text-center">
                                        <FaSpinner size={24} className="spinner" />
                                        <p>Updating...</p>
                                      </div>
                                    )}
                                  </div>
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
      </div>
    </>
  );
};

export default ViewApplication;
