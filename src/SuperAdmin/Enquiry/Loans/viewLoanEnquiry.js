import React, { useState, useEffect, useRef } from "react";
import {
  getSingleLoanEnquiry,
  getSingleLogUniversity,
  statusApplication,
  updateLoanEnquiry,
} from "../../../api/Enquiry/Loan";
import { getFilterApplicationStatus } from "../../../api/universityModule/ApplicationStatus";
import { getFilterStatus } from "../../../api/status";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { formatDate } from "../../../Utils/DateFormat";
import Mastersidebar from "../../../compoents/sidebar";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { RichTextEditor } from "@mantine/rte";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const ViewLoanEnquiry = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [loan, setLoan] = useState(null);
  const [logs, setLogs] = useState([]);
  const modalRef = useRef(null);

  // Reference for the hidden anchor

  useEffect(() => {
    getLoanDetails();
    getUniversityLogs();
  }, []);

  const getUniversityLogs = () => {
    getSingleLogUniversity(id)
      .then((res) => {
        console.log("yuvi", res);
        setLogs(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getLoanDetails = () => {
    getSingleLoanEnquiry(id)
      .then((res) => {
        setLoan(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const initialState = {
    statusName: "",
    commentBox: "",
    document: "",
    duration: "",
    progress: "",
  };

  const initialStateErrors = {
    statusName: { required: false },
    commentBox: { required: false },
    document: { required: false },
    duration: { required: false },
    progress: { required: false },
  };

  const [track, setTrack] = useState(initialState);
  const [tracks, setTracks] = useState([]);
  const [application, setApplication] = useState([]);
  const [status, setStatus] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [trackErrors, setTrackErrors] = useState(initialStateErrors);
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
      getApplicationDetail();
      getUniversityLogs();
      getAllApplicationsModuleDetails();
      getAgentList();
    }
  }, [id]);

  const handleRichTextChanges = (value) => {
    setTrack((prevTrack) => ({ ...prevTrack, reply: value }));
  };
  const convertToBase65 = (e, name, index, listName) => {
    const file = e.target.files[0];
    const reader = new FileReader();
     reader.readAsDataURL(file);
    reader.onload = () => {
      const updatedList = [...track[listName]];
      updatedList[index][name] = reader.result;
      setTrack({ ...track, [listName]: updatedList });
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };
  const handleListInputChange = (e, index, listName) => {
    const { name, value, files } = e.target;
    const updatedList = [...track[listName]];
    if (files && files[0]) {
      convertToBase65(e, name, index, listName);
    } else {
      updatedList[index][name] = value;
      setTrack({ ...track, [listName]: updatedList });
    }
  };

  const addEntry = (listName) => {
    const newEntry =
      listName === "uploadFile" ? { fileName: "", uploadImage: "" } : null;
    setTrack({ ...track, [listName]: [...track[listName], newEntry] });
  };

  const removeEntry = (index, listName) => {
    const updatedList = track[listName].filter((_, i) => i !== index);
    setTrack({ ...track, [listName]: updatedList });
  };

  const getAgentList = () => {
    getSingleLoanEnquiry(id)
      .then((res) => {
        console.log("yuvi", res);
        setTracks(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getApplicationDetails = () => {
    getSingleLoanEnquiry(id)
      .then((res) => {
        if (res.data.result?.status) {
          setTrack({
            statusName: res.data.result || "",
            commentBox: res.data.result || "",
            document: res.data.result || "",
          });
        }
      })
      .catch((err) => console.log(err));
  };


  const getApplicationDetail = () => {
    getSingleLoanEnquiry(id)
      .then((res) => {
        setStatuses(res?.data?.result?.status || []); // Assume statuses is an array in the response
      })
      .catch((err) => {
        console.error(err);
      });
  };


  const getAllApplicationsModuleDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };
    getFilterApplicationStatus(data)
      .then((res) => {
        console.log("ggg", res);
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
    if (!data.statusName) {
      error.statusName.required = true;
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
      statusName: item.statusName,
      duration: item.duration,
      progress: item.progress,
      uploadFile:item.uploadFile || [],
      reply: item.reply || [],     
      commentBox: "",
      document: "",
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

    // Check for validation errors
    if (handleErrors(newErrorEducation)) {
      if (id) {
        const data = {
          _id: id,
          status: {
            ...track,
            progress: 100, // Set progress to 100% upon submission
          },
        };

        statusApplication(data)
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

  const handleTrackSubmited = (event) => {
    event.preventDefault();

    // Here you could add any validation you require
    if (!track.reply) {
      setTrackErrors((prev) => ({ ...prev, reply: { required: true } }));
      return;
    }

    
   
    const data = {
      _id: id,
      statusId: editId,
      uploadFile: track.uploadFile,
      reply: Array.isArray(track.reply)
        ? track.reply.map(item => ({
            replyMessage: item.replyMessage || "",
            createdBy: item.createdBy || "Unknown",
          }))
        : [{ replyMessage: track.reply || "", createdBy: "Unknown" }],
    };

    statusApplication(data)
      .then((res) => {
        toast.success("Successfully updated reply application status");
        getAgentList();
       
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Failed to update status");
      });
    
  };
  const getProgressColor = (progress) => {
    if (progress === 100) return "#FFFF00"; // Green for complete
    if (progress > 50) return "#0000FF"; // Yellow for more than 50%
    return "#808080"; // Red for less than or equal to 50%
  };

  const getProgressText = (progress) => {
    if (progress === 100) return "#A52A2A"; // Green for complete
    if (progress > 50) return "#0000FF"; // Yellow for more than 50%
    return "#878089"; // Red for less than or equal to 50%
  };

  const getProgressButton = (progress) => {
    if (progress === 100) return "#808000"; // Green for complete
    if (progress > 50) return "#0000FF"; // Yellow for more than 50%
    return "#A52A2A"; // Red for less than or equal to 50%
  };


  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const getDisplayText = (text, expanded) => {
    if (!text) return ""; // Ensure text is defined
    const words = text.split(" ");
    return expanded
      ? text
      : words.slice(0, 2).join(" ") + (words.length > 2 ? "..." : "");
  };

  const getStrokeDashoffset = (progress) => {
    const circumference = 2 * Math.PI * 45; // Circumference of the circle
    return circumference - (progress / 100) * circumference;
  };

  return (
    <>
      <Mastersidebar />

      <div className="content-wrapper" style={{ fontSize: "14px" }}>
        <div className="content-header">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-end">
              <li className="breadcrumb-item">
                <Link
                  to="/DashBoard"
                  target="_self"
                  className="text-decoration-none"
                >
                  Dashboard
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/ListLoanEnquiry" className="text-decoration-none">
                  ListLoanEnquiry
                </Link>
              </li>
              {/* if edit is clicked the page should go to the edit page of that particular uiversity */}
              <li className="breadcrumb-item">
                <Link
                  to={{
                    pathname: "/EditLoanEnquiry",
                    search: `?id=${loan?._id}`,
                  }}
                  className="text-decoration-none"
                >
                  EditLoanEnquiry
                </Link>
              </li>
            </ol>
          </nav>
        </div>
        <div className="container-fluid">
          <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
            <div
              className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0"
              style={{ background: "#fe5722", color: "#fff" }}
            >
              <h5 className="text-center text-capitalize p-1">
                View Loan Enquiry Details
              </h5>
            </div>

            <div className="card-body ">
              <table
                className="table table-hover table-bordered table-striped-columns mt-5"
                style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
              >
                <tbody>
                  <tr>
                    <td className="fw-bold">Student Name</td>
                    <td>{loan?.studentName || "Not Available"}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Primary Number</td>
                    <td>{loan?.primaryNumber || "Not Available"}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">WhatsApp Number</td>
                    <td>{loan?.whatsAppNumber || "Not Available"}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Email ID</td>
                    <td>{loan?.email || "Not Available"}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">
                      Do you have a valid offer from any university?
                    </td>
                    <td>
                      {loan?.doYouHaveAValidOfferFromAnyUniversity ||
                        "Not Available"}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Loan Amount Required</td>
                    <td>{loan?.loanAmountRequired || "Not Available"}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">What is your monthly income?</td>
                    <td>{loan?.whatIsYourMonthlyIncome || "Not Available"}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Passport Number</td>
                    <td>{loan?.passportNumber || "Not Available"}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">
                      Did you apply for loan elsewhere?
                    </td>
                    <td>
                      {loan?.didYouApplyForLoanElsewhere || "Not Available"}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Co-applicant Name</td>
                    <td>{loan?.coApplicantName || "Not Available"}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Co-applicant Age</td>
                    <td>{loan?.age || "Not Available"}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Co-applicant Status</td>
                    <td>{loan?.employmentStatus || "Not Available"}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Co-applicant Income</td>
                    <td>{loan?.incomeDetails || "Not Available"}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">
                      Will you submit your collateral if required?
                    </td>
                    <td>
                      {loan?.willyouSubmitYourCollateral || "Not Available"}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Passport Document</td>
                    <td>
                      {loan?.uploadPassport ? (
                        <div>
                          <a
                            href={loan.uploadPassport}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm mx-2"
                            style={{
                              background: "#fe5722",
                              color: "#fff",
                              fontSize: "12px",
                            }}
                          >
                            <i class="fa fa-eye" aria-hidden="true"></i>{" "}
                            Passport
                          </a>
                          <a
                            href={loan.uploadPassport}
                            download
                            rel="noopener noreferrer"
                            className="btn btn-sm mx-2"
                            style={{
                              background: "#fe5722",
                              color: "#fff",
                              fontSize: "12px",
                            }}
                          >
                            <i class="fa fa-download" aria-hidden="true"></i>{" "}
                            Passport
                          </a>
                        </div>
                      ) : (
                        "No document available"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Offer Letter</td>
                    <td>
                      {loan?.uploadOfferletter ? (
                        <div>
                          {/* View Offer Letter */}
                          <a
                            href={loan.uploadOfferletter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm mx-2"
                            style={{
                              background: "#fe5722",
                              color: "#fff",
                              fontSize: "12px",
                            }}
                          >
                            <i className="fa fa-eye" aria-hidden="true"></i>{" "}
                            Offer Letter
                          </a>

                          {/* Download Offer Letter */}
                          <a
                            href={loan.uploadOfferletter}
                            download
                            className="btn btn-sm mx-2"
                            style={{
                              background: "#fe5722",
                              color: "#fff",
                              fontSize: "12px",
                            }}
                          >
                            <i
                              className="fa fa-download"
                              aria-hidden="true"
                            ></i>{" "}
                            Offer Letter
                          </a>
                        </div>
                      ) : (
                        "No document available"
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="container-fluid">
                      <div className="row">
                        <div className="col">
                          <div className="card border-0 rounded-1 shadow-sm p-3">
                            <div className="card-body">
                              {/* <div>{new Date(tracks?.createdOn).toLocaleDateString('en-GB').replace(/\//g, '-')}</div> */}
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex justify-content-between align-items-center">
                                  {statuses
                                    .sort((a, b) => a.position - b.position) // Sort by position
                                    .map((item, index) => {
                                      const isExpanded = !!expandedRows[index];
                                      // Check if the previous status is fully completed (progress = 100)
                                      const isPreviousCompleted = index === 0 || statuses[index - 1].progress === 100;

                                      return (

                                        <div>
                                          <div><p className="fw-semibold" style={{ color: getProgressText(item.progress) }}>{new Date(item?.estimateDate).toLocaleDateString('en-GB').replace(/\//g, '-')}</p></div>

                                          <div
                                            className="position-relative m-2 mb-3"
                                            key={item.id} // Use a unique identifier instead of index if possible
                                            style={{ flex: "1 1 auto", maxWidth: "100%" }}
                                          >
                                            <div className="position-relative">

                                              {/* Progress Circle */}
                                              <div style={{ width: "80%", textAlign: "center", marginBottom: "10px", position: 'relative' }}>
  {/* Circular Progress Bar */}
  <svg width="100" height="100" style={{ position: 'relative', zIndex: '1' }}>
    <circle
      cx="50"
      cy="50"
      r="45"
      stroke="#e0e0e0"
      strokeWidth="10"
      fill="none"
    />{item.duration}
    <circle
      cx="50"
      cy="50"
      r="45"
      stroke={getProgressColor(item.progress)}
      strokeWidth="10"
      fill="none"
      strokeDasharray="283" // 2 * Math.PI * 45
      strokeDashoffset={getStrokeDashoffset(item.progress)}
      style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
    />
  </svg>

  {/* Button dynamically positioned on the circumference */}
  <OverlayTrigger
    placement="bottom"
    overlay={<Tooltip>{item.duration}</Tooltip>}
  >
    <button
      type="button"
      className={`position-absolute text-bold btn btn-sm rounded-circle ${!isPreviousCompleted ? 'disabled' : ''}`}
      data-bs-toggle={isPreviousCompleted ? "modal" : undefined}
      data-bs-target={isPreviousCompleted ? `#modal-${item._id}` : undefined}
      style={{
        width: "40px",
        height: "40px",
        backgroundColor: getProgressButton(item.progress),
        color: "#FFFFFF",
        border: 'none',
        cursor: isPreviousCompleted ? 'pointer' : 'not-allowed',
        // Dynamically move button along the circumference, starting from the bottom (0%) to the top (100%)
        left: `${50 + 45 * Math.cos(2 * Math.PI * (item.progress / 100) + Math.PI)}%`, // Adjusted x position
        top: `${50 + 45 * Math.sin(2 * Math.PI * (item.progress / 100) + Math.PI)}%`,  // Adjusted y position
        transform: 'translate(-50%, -50%)', // Center the button relative to its position
        zIndex: '2', // Ensure the button stays above the SVG
      }}
      onClick={isPreviousCompleted ? () => handleEditModule(item) : undefined}
      disabled={!isPreviousCompleted}
    >
      
      <span style={{ color: 'white' }}>
  { 
    typeof item.progress === 'number' 
      ? (item.progress === 100 ? '✔️' : `${item.progress}%`) 
      : '❌'
  }
</span>
    </button>
  </OverlayTrigger>

</div>







                                              <div className="d-flex justify-content-start align-items-center mt-3"
                                                onMouseEnter={() => toggleRow(index)}
                                                onMouseLeave={() => toggleRow(index)}
                                                title={item.statusName}>

                                                {getDisplayText(item.statusName, isExpanded)}
                                              </div>

                                              {/* Modal for Editing */}
                                              <div
                                                className="modal fade"
                                                id={`modal-${item._id}`} // Use item.id for unique modal ID
                                                tabIndex="-1"
                                                aria-labelledby="exampleModalLabel"
                                                aria-hidden="true"
                                              >
                                                <div className="modal-dialog modal-dialog-centered">
                                                  <div className="modal-content">
                                                    <div className="modal-header">
                                                      <h1 className="modal-title fs-5" id="staticBackdropLabel">
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
                                                      {/* Form for Editing */}
                                                      <form onSubmit={handleTrackSubmit}>
                                                        {/* Status Input */}
                                                        <div className="col-sm-6 col-lg-12 col-sm-12 mb-3">
                                                          <input
                                                            type="text"
                                                            name="statusName"
                                                            value={track.statusName}
                                                            onChange={handleTrack}
                                                            className="form-control"
                                                            placeholder="Enter Status...."
                                                            aria-label="Status"
                                                            style={{ fontSize: "12px" }}
                                                          />
                                                          {submitted && trackErrors.statusName.required && (
                                                            <p className="text-danger">Status is required</p>
                                                          )}
                                                        </div>

                                                       

                                                        {/* Duration Input */}
                                                        <div className="col-sm-6 col-lg-12 col-sm-12 mb-3">
                                                          <input
                                                            type="text"
                                                            name="duration"
                                                            value={track.duration}
                                                            onChange={handleTrack}
                                                            className="form-control"
                                                            placeholder="Enter Duration...."
                                                            aria-label="Duration"
                                                            style={{ fontSize: "12px" }}
                                                          />
                                                          {submitted && trackErrors.duration.required && (
                                                            <p className="text-danger">Duration is required</p>
                                                          )}
                                                        </div>

                                                   {/* Rich Text Editor */}
                                                   <div className="col-sm-6 col-lg-12 col-sm-12 mb-3">
  <CKEditor
    editor={ClassicEditor}
    value={track.commentBox || ""} // Ensure it has a default value if undefined or null
    config={{
      placeholder: "Start writing your content here...",
      toolbar: [
        "heading",
        "|",
        "bold",
        "italic",
        "link",
        "bulletedList",
        "numberedList",
        "blockQuote",
        "|",
        "insertTable",
        "mediaEmbed",
        "imageUpload",
        "|",
        "undo",
        "redo",
      ],
    }}
    onChange={(event, editor) => {
      const data = editor.getData();
      handleRichTextChange(data); // Call the handler when the content changes
    }}
    name="commentBox"
    style={{
      fontFamily: "Plus Jakarta Sans",
      fontSize: "12px",
      zIndex: "0",
    }}
  />
  {submitted && trackErrors.commentBox?.required && (
    <p className="text-danger">Comment is required</p>
  )}
</div>

                                                        {/* Progress and File Upload Inputs */}
                                                        <div className="col-sm-6 col-lg-12 col-sm-12 mb-3">
                                                          <input
                                                            type="number"
                                                            className="form-control"
                                                            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                                                            value={track.progress} // Assuming you have track.progress defined
                                                            placeholder="Enter Progress"
                                                            name="progress"
                                                            onChange={handleTrack}
                                                          />
                                                        </div>
                                                        <div className="col-sm-6 col-lg-12 col-sm-12 mb-3">
                                                          <input
                                                            type="file"
                                                            className="form-control"
                                                            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                                                            placeholder="Enter File Upload"
                                                            name="document"
                                                            onChange={handleTrack}
                                                          />
                                                        </div>

                                                        {/* Modal Footer */}
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
                                                          >
                                                            Save changes
                                                          </button>
                                                        </div>
                                                      </form>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>


                                          <div className="d-flex justify-content-start align-items-center mt-3 ">
                                            {item.modifiedOn ? new Date(item?.modifiedOn).toLocaleDateString('en-GB').replace(/\//g, '-') : new Date(item?.createdOn).toLocaleDateString('en-GB').replace(/\//g, '-')}
                                          </div>
                                        </div>
                                      );
                                    })}


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

                                            <p className="mb-0" style={{ fontSize: "12px", color: "#888" }}>
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
                            <div className="card-body ">
                              <div className="chat-messages">
                                <div className="container-fluid">

                                  <div className="row">
                                    {statuses.map((item, index) => (
                                        <div key={index} className="d-flex justify-content-end mb-4">
                                          <div className="profile-content">
                                            <img
                                              src={tracks?.photo || "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"}
                                              className="card-img-top rounded-circle border-0"
                                              alt="Profile"
                                              style={{ width: "4.5rem", height: "4.5rem" }}
                                            />
                                          </div>

                                          <div className="col-10">
                                            <div className="card ">
                                              <div className="card-header text-bg-danger">

                                                <p className="mb-0">Application Decision:{item?.statusName}</p>
                                                <div className="d-flex gap-2">
                                                  <p className="mb-0">{formatDate(item?.createdOn)}</p>
                                                  <button
    className="btn btn-sm btn-link text-white fw-semibold px-3 py-1 text-center rounded-1"
    data-bs-toggle="modal"
    data-bs-target="#StatusModal35"
    onClick={() => handleEditModule(item)} // Updated target to match the modal ID
  >
     <i className="fa fa-reply" aria-hidden="true"></i>
  </button>
                                                  
                                                </div>

                                              </div>
                                           
                                              <div className="card-body">

  <div className="d-flex flex-row justify-content-start mb-4">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="avatar 1" style={{width: 45, height: '100%'}} />
              <div className="col-8 p-3 ms-3" style={{borderRadius: 15, backgroundColor: 'rgba(57, 192, 237,.2)'}}>
              <CKEditor
        editor={ClassicEditor}
        data={item?.commentBox}
        disabled={true}
        config={{
          toolbar: [],
        }}
      /></div><br />
   
      {item?.createdBy}
      
              
            </div>
            <div className="d-flex flex-row justify-content-end mb-4">
              {Array.isArray(item?.reply) &&
              item.reply.map((data, index) => (
                <div key={index} className="col-8 p-3 me-3 border bg-body-tertiary" style={{borderRadius: 15}}>
              <CKEditor
        editor={ClassicEditor}
        data={data.replyMessage}
        disabled={true}
        config={{
          toolbar: [],
        }}
      /><br />
              </div>
              ))
              }
      <br />
      {item?.createdBy}
    
             
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp" alt="avatar 1" style={{width: 45, height: '100%'}} />
            </div>

  <br />

  {/* Footer with Duration and Delayed Info */}
  <div className="d-flex flex-column align-items-end justify-content-end">
    <p className="mb-0">
      <b>Duration</b> - {item?.duration} Days
    </p>
    <p className="mb-0">
      <b>Delayed</b> - {item?.delay} Days
    </p>
  </div>

  {/* Sent Info and Time */}
  <div className="d-flex flex-wrap justify-content-between align-items-center mb-0 p-0">
    <p className="mb-0">
      <small>Sent</small>
    </p>
    <p className="mb-0">
      <small>Time: {formatDate(item?.createdOn)}</small>
    </p>
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
                            <div
  className="modal fade"
  id="StatusModal35"
  tabIndex="-1"
  aria-labelledby="staticBackdropLabel21"
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel21">
          Reply Message
        </h1>

        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
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
                        <div
                          className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
                          style={{ width: "2rem", height: "2rem" }}
                        >
                          <i className="fas fa-check" />
                        </div>
                      </div>
                      <div className="col-4 text-center">
                        <p className="mb-1 fw-semibold text-muted">
                          {new Date(log.createdOn).toLocaleString()}
                        </p>
                        <p className="mb-0 text-muted">
                          Changed by:
                          <strong>{log.userType || "Unknown User"}</strong>
                        </p>
                      </div>

                      <div className="col-12">
                        {log.changes.map((change, changeIndex) => (
                          <div key={changeIndex} className="mb-3">
                            <div className="bg-success text-white rounded-3 p-2">
                              <h6 className="mb-1">
                                <i className="fas fa-tag "> Label Name --</i>{" "}
                                {change.field}
                              </h6>
                              <p className="mb-0">
                                {" "}
                                <i className="fa fa-database ">
                                  {" "}
                                  New Data --
                                </i>{" "}
                                {change.newValue}
                              </p>
                            </div>
                            <div className="bg-danger text-white rounded-3 p-2 mt-2">
                              <h6 className="mb-1">
                                <i className="fas fa-tag "> Label Name --</i>
                                {change.field}
                              </h6>
                              <p className="mb-0">
                                <i className="fa fa-database "> Old Data --</i>
                                {change.oldValue}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      className="position-absolute top-0 start-0 translate-middle-x"
                      style={{
                        width: 2,
                        height: "100%",
                        backgroundColor: "#007bff",
                      }}
                    />
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

export default ViewLoanEnquiry;
