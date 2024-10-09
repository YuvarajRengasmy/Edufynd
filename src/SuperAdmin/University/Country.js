import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../compoents/sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { updateApplication, getSingleApplication } from "../../api/applicatin";
import {loadStripe} from '@stripe/stripe-js'; 
import { getFilterStatus } from "../../api/status";
import {getFilterApplicationStatus} from "../../api/universityModule/ApplicationStatus";
import { toast } from "react-toastify";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";import { duration } from "@mui/material";
import { formatDate } from "../../Utils/DateFormat";
import BackButton from "../../compoents/backButton";
import {savePaymentGetWay } from "../../api/invoice/payment";
import Select from "react-select";

const ViewApplication = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const modalRef = useRef(null);

  const initialStatusState = {
    statusName: "",
    commentBox: "",
    document: "",
    duration: "",
    progress: "",
    subCategory: [],
  };

  const initialStatusErrors = {
    statusName: { required: false },
    commentBox: { required: false },
    document: { required: false },
    duration: { required: false },
    progress: { required: false },
    subCategory: { required: false },
  };

  const [statuses, setStatuses] = useState([]); // Store multiple statuses
  const [selectedStatus, setSelectedStatus] = useState(initialStatusState);
  const [statusErrors, setStatusErrors] = useState(initialStatusErrors);
  const [submitted, setSubmitted] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchApplicationDetails();
      fetchStatusOptions();
    }
  }, [id]);

  const fetchApplicationDetails = () => {
    getSingleApplication(id)
      .then((res) => {
        setStatuses(res?.data?.result?.status || []); // Assume statuses is an array in the response
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchStatusOptions = () => {
    getFilterStatus()
      .then((res) => {
        setSubCategories(res?.data?.result?.statusList || []);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleRichTextChange = (value) => {
    setSelectedStatus((prev) => ({ ...prev, commentBox: value }));
  };

  const handleValidation = (data) => {
    let errors = { ...initialStatusErrors };
    if (!data.statusName) errors.statusName.required = true;
    if (!data.commentBox) errors.commentBox.required = true;
    if (!data.duration) errors.duration.required = true;
    if (!data.progress) errors.progress.required = true;
    if (data.subCategory.length === 0) errors.subCategory.required = true;
    return errors;
  };

  const convertToBase64 = (e, name) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSelectedStatus((prev) => ({ ...prev, [name]: reader.result }));
    };
    reader.onerror = (error) => {
      console.error("Error: ", error);
    };
  };

  const handleStatusChange = (event) => {
    const { name, value, files } = event.target;
    if (files && files[0]) {
      convertToBase64(event, name);
    } else {
      setSelectedStatus((prev) => ({ ...prev, [name]: value }));
    }

    if (submitted) {
      const newErrors = handleValidation({ ...selectedStatus, [name]: value });
      setStatusErrors(newErrors);
    }
  };

  const handleEditStatus = (status) => {
    setSelectedStatus({
      statusName: status.statusName,
      duration: status.duration,
      progress: status.progress,
      subCategory: status.subCategory || [],
      commentBox: "",
      document: "",
    });
    setSubmitted(false);
  };

  const handleSelectChange = (selected) => {
    setSelectedStatus((prev) => ({ ...prev, subCategory: selected.map(option => option.value) }));
  };

  const handleStatusSubmit = (event) => {
    event.preventDefault();
    const newErrors = handleValidation(selectedStatus);
    setStatusErrors(newErrors);
    setSubmitted(true);

    if (!Object.values(newErrors).some(err => err.required)) {
      // Update the status of the selected status
      const updatedStatuses = statuses.map((status) => {
        if (status.statusName === selectedStatus.statusName) {
          return {
            ...status,
            ...selectedStatus,
          };
        }
        return status;
      });

      const data = {
        _id: id,
        statuses: updatedStatuses,
      };

      updateApplication(data)
        .then(() => {
          toast.success("Successfully updated application status");
          fetchApplicationDetails(); // Refresh application details
          if (modalRef.current) {
            modalRef.current.click(); // Close the modal
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const CategoriesOptions = subCategories.map((subCategory) => ({
    value: subCategory,
    label: subCategory,
  }));

  return (
    <>
      <Sidebar />
      <div className="content-wrapper">
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
                          {statuses.map((status, index) => (
                            <div key={index} className="position-relative m-2" style={{ flex: "1 1 auto", maxWidth: "10%" }}>
                              <div className="progress" role="progressbar" aria-valuenow={status.progress} aria-valuemin="0" aria-valuemax="100" style={{ height: "9px" }}>
                                <div className="progress-bar" style={{ width: `${status.progress}%`, backgroundColor: status.progress === 100 ? "#4caf50" : status.progress > 50 ? "#4caf50" : "#4caf50" }}></div>
                              </div>
                              <div className="d-flex justify-content-start align-items-center mt-3">
              {status.statusName}
            </div>
            <div className="d-flex justify-content-start align-items-center mt-3 d-none">
              {status.subCategory}
            </div>
                              <button
                                type="button"
                                className="position-absolute btn btn-primary rounded-pill"
                                data-bs-toggle="modal"
                                data-bs-target={`#modal-${index}`} // Use index for unique modal IDs
                                onClick={() => handleEditStatus(status)}
                                style={{ width: "2rem", height: "2rem", left: "0" }}
                              >
                                {status.position}
                              </button>

                              {/* Modal for Editing */}
                              <div className="modal fade" id={`modal-${index}`} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h1 className="modal-title" id="modalLabel">Edit Application Status</h1>
                                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={modalRef}></button>
                                    </div>
                                    <div className="modal-body">
                                      <form onSubmit={handleStatusSubmit}>
                                        <input type="text" name="statusName" value={selectedStatus.statusName} onChange={handleStatusChange} placeholder="Enter Status..." className="form-control mb-3" />
                                        {submitted && statusErrors.statusName.required && <p className="text-danger">Status is required</p>}

                                        <Select isMulti options={CategoriesOptions} name="subCategory" onChange={handleSelectChange} placeholder="Select Sub Category" className="mb-3" />
                                        
                                        <input type="text" name="duration" value={selectedStatus.duration} onChange={handleStatusChange} placeholder="Enter Duration..." className="form-control mb-3" />
                                        {submitted && statusErrors.duration.required && <p className="text-danger">Duration is required</p>}

                                        <CKEditor
                                          editor={ClassicEditor}
                                          value={selectedStatus.commentBox}
                                          onChange={(event, editor) => handleRichTextChange(editor.getData())}
                                          className="mb-3"
                                        />
                                        {submitted && statusErrors.commentBox.required && <p className="text-danger">Comment is required</p>}

                                        <input type="number" name="progress" value={selectedStatus.progress} onChange={handleStatusChange} placeholder="Enter Progress" className="form-control mb-3" />
                                        {submitted && statusErrors.progress.required && <p className="text-danger">Progress is required</p>}
                                        
                                        <input type="file" name="document" onChange={handleStatusChange} className="mb-3" />
                                        {submitted && statusErrors.document.required && <p className="text-danger">Document is required</p>}
                                        
                                        <button type="submit" className="btn btn-primary">Submit</button>
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
