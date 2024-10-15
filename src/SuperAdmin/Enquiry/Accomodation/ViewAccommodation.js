import React, { useEffect, useState, useRef } from "react";
import {
  getSingleAccommodationEnquiry,
  getSingleLogUniversity,
  statusApplication,
  updateAccommodationStatus,
} from "../../../api/Enquiry/accommodation";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getFilterApplicationStatus } from "../../../api/StatusEnquiry/accomdation";
import { getFilterStatus } from "../../../api/status";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import Flags from "react-world-flags";
import Mastersidebar from "../../../compoents/sidebar";
import { Link } from "react-router-dom";
import { formatDate } from "../../../Utils/DateFormat";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { RichTextEditor } from "@mantine/rte";
export const ViewAccommodation = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [logs, setLogs] = useState([]);
  const modalRef = useRef(null);

  const initialState = {
    statusName: "",
    commentBox: "",
    reply: [{replyMessage: "", createdBy: ""}],
    uploadFile: [{fileName: "", uploadImage:""}],
    document: "",
    duration: "",
    progress: "",
  };


  const initialStateErrors = {
    statusName: { required: false },
    commentBox: { required: false },
    reply: { required: false },
    uploadFile: { required: false },
    document: { required: false },
    duration: { required: false },
    progress: { required: false },
  };

  const [accommodation, setaccommodation] = useState(initialState);
  const [accommodations, setaccommodations] = useState([]);
  const [application, setApplication] = useState([]);

  const [accommodationErrors, setaccommodationErrors] = useState(initialStateErrors);
  const [statused, setStatused] = useState([]);
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

  const getApplicationDetail = () => {
    getSingleAccommodationEnquiry(id)
      .then((res) => {
        setStatused(res?.data?.result?.status || []); // Assume statuses is an array in the response
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const getAccommodationDetails = () => {
    getSingleAccommodationEnquiry(id)
      .then((res) => {
        console.log("res", res);
        setaccommodation(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (id) {
      getAllModuleDetails();
     
      getApplicationDetail();
      getAccommodationDetails();
      getUniversityLogs();
      getAllApplicationsModuleDetails();
      getAgentList();
    }
  }, [id]);

  const handleRichTextChanges = (value) => {
    setaccommodation((prevaccommodation) => ({ ...prevaccommodation, reply: value }));
  };
  const convertToBase65 = (e, name, index, listName) => {
    const file = e.target.files[0];
    const reader = new FileReader();
     reader.readAsDataURL(file);
    reader.onload = () => {
      const updatedList = [...accommodation[listName]];
      updatedList[index][name] = reader.result;
      setaccommodation({ ...accommodation, [listName]: updatedList });
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };
  const handleListInputChange = (e, index, listName) => {
    const { name, value, files } = e.target;
    const updatedList = [...accommodation[listName]];
    if (files && files[0]) {
      convertToBase65(e, name, index, listName);
    } else {
      updatedList[index][name] = value;
      setaccommodation({ ...accommodation, [listName]: updatedList });
    }
  };

  const addEntry = (listName) => {
    const newEntry =
      listName === "uploadFile" ? { fileName: "", uploadImage: "" } : null;
    setaccommodation({ ...accommodation, [listName]: [...accommodation[listName], newEntry] });
  };

  const removeEntry = (index, listName) => {
    const updatedList = accommodation[listName].filter((_, i) => i !== index);
    setaccommodation({ ...accommodation, [listName]: updatedList });
  };

  const getAgentList = () => {
    getSingleAccommodationEnquiry(id)
      .then((res) => {
        console.log("yuvi", res);
        setaccommodations(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const getAllApplicationsModuleDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };
    getFilterApplicationStatus(data)
      .then((res) => {
        console.log("ggg", res)
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
    setaccommodation((prevUniversity) => ({
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
      setaccommodation((prevUniversity) => ({
        ...prevUniversity,
        [name]: reader.result,
      }));
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };
  const handleAccommodation = (event) => {
    const { name, value, files } = event.target;
    if (files && files[0]) {
      convertToBase64(event, name);
    } else {
      setaccommodation((prevState) => ({
        ...prevState,
        [name]: value,
      }));

    }

    if (submitted) {
      const newError = handleValidation({
        ...accommodation,
        [event.target.name]: event.target.value,
      });
      setaccommodationErrors(newError);
    }
  };



  const handleEditModule = (item) => {

    setaccommodation({
      statusName: item.statusName,
      duration: item.duration,
      progress: item.progress,
      uploadFile:item.uploadFile || [],
      reply: item.reply || [],     
      commentBox: "",
      document: "", // Initialize commentBox as empty or with a value if needed
    });
    setIsEditing(true);
    setEditId(item._id);
    setIsEditing(true);
    setSubmitted(false);
    setaccommodationErrors(initialStateErrors);
  
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
 

  const handleAccommodationSubmit = (event) => {
    event.preventDefault();

    // Perform validation
    const newErrorEducation = handleValidation(accommodation);
    setaccommodationErrors(newErrorEducation);
    setSubmitted(true);

    // If validation passes, proceed with submission
    if (handleErrors(newErrorEducation)) {
    

      // Structure the data as per backend requirements
      const data = {
        _id: id, // Assuming 'id' is the applicant's ID
        statusId: editId, // The statusId of the status being edited
        statusName: accommodation.statusName, // From the accommodation object (or any other input fields)
        progress: accommodation.progress, // Set progress to 100% if applicable
        completed: accommodation.completed,
        uploadFile: accommodation.uploadFile,
        reply: accommodation.reply, // Pass the completed status (true/false)
        duration: accommodation.duration, // Any other fields like duration, if needed
        position: accommodation.position, // Add position if applicable
        commentBox: accommodation.commentBox, // Add commentBox if applicable
        document: accommodation.document, // Add document if applicable
      };

      // Check if we're editing an existing status
      if (isEditing) {
        statusApplication(data)
          .then((res) => {
            toast.success("Successfully updated application status");
            getAgentList();
            getAllModuleDetails();
           
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message || "Failed to update status");
          });
      }
    }
  };

 
  const handleAccommodationSubmited = (event) => {
    event.preventDefault();

    // Here you could add any validation you require
    if (!accommodation.reply) {
      setaccommodationErrors((prev) => ({ ...prev, reply: { required: true } }));
      return;
    }

    const data = {
      _id: id,
      statusId: editId,
      uploadFile: accommodation.uploadFile,
      reply: Array.isArray(accommodation.reply)
        ? accommodation.reply.map(item => ({
            replyMessage: item.replyMessage || "",
            createdBy: item.createdBy || "Unknown",
          }))
        : [{ replyMessage: accommodation.reply || "", createdBy: "Unknown" }],
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
                <Link to="/ListAccommodation" className="text-decoration-none">
                  ListAccommodation
                </Link>
              </li>
              {/* if edit is clicked the page should go to the edit page of that particular uiversity */}
              <li className="breadcrumb-item">
                <Link
                  to={{
                    pathname: "/EditAccommodation",
                    search: `?id=${accommodation?._id}`,
                  }}
                  className="text-decoration-none"
                >
                  EditAccommodation
                </Link>
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
                            <td>
                              {accommodation?.agentName || "Not Available"}
                            </td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Agent Business Name</td>
                            <td>
                              {accommodation?.businessName || "Not Available"}
                            </td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Agent Primary Number</td>
                            <td>
                              {accommodation?.dial3 +
                                " " +
                                accommodation?.agentPrimaryNumber ||
                                "Not Available"}
                            </td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Agent WhatsApp Number</td>
                            <td>
                              {accommodation?.dial4 +
                                " " +
                                accommodation?.agentWhatsAppNumber ||
                                "Not Available"}
                            </td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Agent Email ID</td>
                            <td>
                              {accommodation?.agentEmail || "Not Available"}
                            </td>
                          </tr>
                        </>
                      ) : (
                        <>
                          <tr>
                            <td className="fw-bold">Name of the Student</td>
                            <td>
                              {accommodation?.studentName || "Not Available"}
                            </td>
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
                        <td>
                          {accommodation?.passportNumber || "Not Available"}
                        </td>
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
                        <td>
                          {accommodation?.dial1 +
                            " " +
                            accommodation?.primaryNumber || "Not Available"}
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Student WhatsApp number</td>
                        <td>
                          {accommodation?.dial2 +
                            " " +
                            accommodation?.whatsAppNumber || "Not Available"}
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-bold">University Name</td>
                        <td>
                          {accommodation?.universityName || "Not Available"}
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Course</td>
                        <td>{accommodation?.courseType || "Not Available"}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Accommodation Type</td>
                        <td>
                          {accommodation?.accommodationType || "Not Available"}
                        </td>
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
                        <td className="fw-bold">
                          Assigned To (List Staff) Multiple Assign
                        </td>
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
                              {/* <div>{new Date(accommodations?.createdOn).toLocaleDateString('en-GB').replace(/\//g, '-')}</div> */}
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex justify-content-between align-items-center">
                                  {statused
                                    .sort((a, b) => a.position - b.position) // Sort by position
                                    .map((item, index) => {
                                      const isExpanded = !!expandedRows[index];
                                      // Check if the previous status is fully completed (progress = 100)
                                      const isPreviousCompleted = index === 0 || statused[index - 1].progress === 100;

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
                                                      <form onSubmit={handleAccommodationSubmit}>
                                                        {/* Status Input */}
                                                        <div className="col-sm-6 col-lg-12 col-sm-12 mb-3">
                                                          <input
                                                            type="text"
                                                            name="statusName"
                                                            value={accommodation.statusName}
                                                            onChange={handleAccommodation}
                                                            className="form-control"
                                                            placeholder="Enter Status...."
                                                            aria-label="Status"
                                                            style={{ fontSize: "12px" }}
                                                          />
                                                          {submitted && accommodationErrors.statusName.required && (
                                                            <p className="text-danger">Status is required</p>
                                                          )}
                                                        </div>

                                                       

                                                        {/* Duration Input */}
                                                        <div className="col-sm-6 col-lg-12 col-sm-12 mb-3">
                                                          <input
                                                            type="text"
                                                            name="duration"
                                                            value={accommodation.duration}
                                                            onChange={handleAccommodation}
                                                            className="form-control"
                                                            placeholder="Enter Duration...."
                                                            aria-label="Duration"
                                                            style={{ fontSize: "12px" }}
                                                          />
                                                          {submitted && accommodationErrors.duration.required && (
                                                            <p className="text-danger">Duration is required</p>
                                                          )}
                                                        </div>

                                                        {/* Rich Text Editor */}
                                                     <div className="col-sm-6 col-lg-12 col-sm-12 mb-3">
  <CKEditor
    editor={ClassicEditor}
    data={accommodation.commentBox || ""} // Ensure it has a default value if undefined or null
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
  {submitted && accommodationErrors.commentBox?.required && (
    <p className="text-danger">Comment is required</p>
  )}
</div>


                                                        {/* Progress and File Upload Inputs */}
                                                        <div className="col-sm-6 col-lg-12 col-sm-12 mb-3">
                                                          <input
                                                            type="number"
                                                            className="form-control"
                                                            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                                                            value={accommodation.progress} // Assuming you have accommodation.progress defined
                                                            placeholder="Enter Progress"
                                                            name="progress"
                                                            onChange={handleAccommodation}
                                                          />
                                                        </div>
                                                        <div className="col-sm-6 col-lg-12 col-sm-12 mb-3">
                                                          <input
                                                            type="file"
                                                            className="form-control"
                                                            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                                                            placeholder="Enter File Upload"
                                                            name="document"
                                                            onChange={handleAccommodation}
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



                    <div className="container-fluid">
                      <div className="row">
                        <div className="col">
                          <div className="card card-body mb-3">
                            <h6 className="text-start">Notes</h6>
                            <div className="text-end">
                              <button className="btn btn-outline-dark text-uppercase fw-semibold px-3 py-1 text-center rounded-1" data-bs-toggle="modal"
                                data-bs-target="#StatusModal"

                                style={{ fontSize: '12px' }}>Add Status</button>
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
                                    <form onSubmit={handleAccommodationSubmit}>
                                      <div className="input-group mb-3">
                                        <span
                                          className="input-group-text"
                                          id="basic-addon1"
                                        >
                                          <i className="fa fa-tasks nav-icon text-dark"></i>
                                        </span>
                                        <select
                                          name="statusName"
                                          value={accommodation.statusName}
                                          onChange={handleAccommodation}
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
                                          accommodationErrors.statusName.required && (
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
                                          onChange={handleAccommodation}
                                          className="form-control"
                                          placeholder="Enter Status...."
                                          aria-label="Status"
                                          aria-describedby="basic-addon1"
                                          style={{ fontSize: "12px" }}
                                        />

                                      </div>
                                      <div className="input-group mb-3">


                                        <CKEditor
                                          editor={ClassicEditor}
                                          value={accommodation.commentBox}
                                          config={{
                                            placeholder:
                                              "Start writing your content here...",
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
                                            image: {
                                              toolbar: [
                                                "imageTextAlternative",
                                                "imageStyle:full",
                                                "imageStyle:side",
                                              ],
                                            },
                                            table: {
                                              contentToolbar: [
                                                "tableColumn",
                                                "tableRow",
                                                "mergeTableCells",
                                              ],
                                            },
                                          }}
                                          onChange={(event, editor) => {
                                            const data = editor.getData();
                                            console.log({ data });
                                            handleRichTextChange(data);
                                          }}
                                          name="commentBox"
                                          style={{
                                            fontFamily: "Plus Jakarta Sans",
                                            fontSize: "12px",
                                            zIndex: "0",
                                          }}
                                        />
                                        {submitted &&
                                          accommodationErrors.commentBox.required && (
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
                                          onChange={handleAccommodation}
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
                           
                            <div className="card-body p-4">
                              <img
                                src={accommodation?.photo || "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"}
                                className="card-img-top rounded-circle border-0"
                                alt="Profile"
                                style={{ width: "3rem", height: "3rem" }}
                              />  {accommodation?.createdBy}
                              <p>
                                Application Status -  {formatDate(accommodation?.createdOn)}
                              </p>

                              {accommodation?.status && (
                                <div>
                                  {accommodation.status.map((item, index) => (
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
                                  {accommodation?.status && (
                                <div>
                                  {accommodation.status.map((item, index) => (
                                        <div key={index} className="d-flex justify-content-end mb-4">
                                          <div className="profile-content">
                                            <img
                                              src={accommodation?.photo || "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"}
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
                                              <div className="row">
                   
                    
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

)}
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
      <div className="modal-body">
        <form onSubmit={handleAccommodationSubmited}>
          <div className="form-group mb-3">
            <label for="subject">Subject</label>
            {/* <CKEditor
              editor={ClassicEditor}
              data={track.reply}
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
                image: {
                  toolbar: ["imageTextAlternative", "imageStyle:full", "imageStyle:side"],
                },
                table: {
                  contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
                },
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                handleRichTextChanges(data);
              }}
              name="reply"
            /> */}
            <input className="form-control"
            name="replyMessage"
            onChange={(e) => handleRichTextChanges(e.target.value)}
            type="text" />
          </div>
          
          {accommodation.uploadFile.map((uploadImage, index) => (
                              <div key={index} className="mb-3">
                                <div className="d-flex gy-2 ">
                                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                    <label style={{ color: "#231F20" }}>
                                      File Name
                                    </label>
                                    <input
                                      type="text"
                                      name="fileName"
                                      value={uploadImage.fileName}
                                      onChange={(e) =>
                                        handleListInputChange(
                                          e,
                                          index,
                                          "uploadFile"
                                        )
                                      }
                                      className="form-control rounded-1"
                                      style={{ fontSize: "12px" }}
                                      placeholder="File Upload Title"
                                    />
                                  </div>
                                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                    <label style={{ color: "#231F20" }}>
                                      File Document
                                    </label>
                                    <input
                                      type="file"
                                      name="uploadImage"
                                      onChange={(e) =>
                                        handleListInputChange(
                                          e,
                                          index,
                                          "uploadFile"
                                        )
                                      }
                                      className="form-control rounded-1 "
                                      style={{ fontSize: "12px" }}
                                      placeholder="Upload File"
                                    />
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeEntry(index, "uploadFile")
                                  }
                                  className="btn mt-2"
                                >
                                  <i className="far fa-trash-alt text-danger me-1"></i>
                                </button>
                              </div>
                            ))}
          
          <button
                              type="button"
                              onClick={() => addEntry("uploadFile")}
                              className="btn text-white mt-2 col-sm-6"
                              style={{ backgroundColor: "#7267ef" }}
                            >
                              <i className="fas fa-plus-circle"></i>
                              &nbsp;&nbsp;Add
                            </button>
          <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary">Submit</button>
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
export default ViewAccommodation;
