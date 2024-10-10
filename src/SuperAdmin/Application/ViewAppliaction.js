import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../compoents/sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { updateApplication, statusApplication, getSingleApplication } from "../../api/applicatin";
import { loadStripe } from '@stripe/stripe-js';
import { getFilterStatus } from "../../api/status";
import { getFilterApplicationStatus } from "../../api/universityModule/ApplicationStatus";
import { toast } from "react-toastify";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"; import { duration } from "@mui/material";
import { formatDate } from "../../Utils/DateFormat";
import BackButton from "../../compoents/backButton";
import { savePaymentGetWay } from "../../api/invoice/payment";
import Select from "react-select";
import { getallUniversity } from "../../api/university";
import { getallProgram, } from "../../api/Program";

export const ViewApplication = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const modalRef = useRef(null);

  const initialState = {
    statusName: "",
    commentBox: "",
    document: "",
    duration: "",
    progress: "",
    subCategory: [],
    universityName: '',
    courseType: '',
    course: '',
    campus: '',
    inTake: '',
    courseFees:"",
  };

  const initialStateErrors = {
    statusName: { required: false },
    commentBox: { required: false },
    document: { required: false },
    duration: { required: false },
    progress: { required: false },
    subCategory: { required: false },
  };
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [track, setTrack] = useState(initialState);
  const [tracks, setTracks] = useState([]);
  const [application, setApplication] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [trackErrors, setTrackErrors] = useState(initialStateErrors);
  const [status, setStatus] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [statuses, setStatuses] = useState([]); // Store multiple statuses
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
      getAllApplicationsModuleDetails();
      getAgentList();
    }
  }, [id]);

  const getAgentList = () => {
    getSingleApplication(id)
      .then((res) => {
        console.log("yuvi", res);
        setTracks(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getApplicationDetails = () => {
    getSingleApplication(id)
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
      subCategory: item.subCategory || [],
      commentBox: "",
      document: "", // Initialize commentBox as empty or with a value if needed
    });
    setIsEditing(true);
    setEditId(item._id);
    setIsEditing(true);
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
  const handleSelectChange = (selected) => {
    setSelectedOptions(selected); // Update the selected options in the state
  };

  const handleTrackSubmit = (event) => {
    event.preventDefault();

    // Perform validation
    const newErrorEducation = handleValidation(track);
    setTrackErrors(newErrorEducation);
    setSubmitted(true);

    // If validation passes, proceed with submission
    if (handleErrors(newErrorEducation)) {
      const selectedValues = selectedOptions.map((option) => option.value); // Collect selected subcategory values

      // Structure the data as per backend requirements
      const data = {
        _id: id, // Assuming 'id' is the applicant's ID
        statusId: editId, // The statusId of the status being edited
        statusName: track.statusName, // From the track object (or any other input fields)
        progress: track.progress, // Set progress to 100% if applicable
        subCategory: selectedValues, // The selected subcategories
        completed: track.completed, // Pass the completed status (true/false)
        duration: track.duration, // Any other fields like duration, if needed
        position: track.position, // Add position if applicable

      };

      // Check if we're editing an existing status
      if (isEditing) {
        statusApplication(data)
          .then((res) => {
            toast.success("Successfully updated application status");
            event.target.reset();
            setTrack(initialState); // Reset track object to initial state after submission
            setSubmitted(false); // Reset form submission state
            getAllModuleDetails(); // Fetch the latest module details after submission
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message || "Failed to update status");
          });
      }
    }
  };



const getProgressColor = (progress) => {
  if (progress === 100) return "#4caf50"; // Green for complete
  if (progress > 50) return "#ffeb3b"; // Yellow for more than 50%
  return "#f44336"; // Red for less than or equal to 50%
};


  const CategoriesOptions = track?.subCategory
    ? track.subCategory.map((subCategory) => ({
      value: subCategory,
      label: subCategory,
    }))
    : [];


const [universities, setUniversities] = useState([]);
const [programs, setPrograms] = useState([]);
const [selectedCourseType, setSelectedCourseType] = useState('');
const [filteredUniversities, setFilteredUniversities] = useState([]);
const [selectedUniversity, setSelectedUniversity] = useState('');
const [filteredPrograms, setFilteredPrograms] = useState([]);
const [selectedProgram, setSelectedProgram] = useState(null);
const [selectedCampus, setSelectedCampus] = useState('');
const [selectedIntake,setSelectedIntake] = useState('');



// Fetch all universities and programs
useEffect(() => {
  getAllUniversityList();
  getAllProgramList();

}, []);



const getAllUniversityList = () => {
  getallUniversity()
    .then((res) => {
      setUniversities(res?.data?.result);
    })
    .catch((err) => {
      console.log(err);
    });
};

  const getAllProgramList = () => {
    getallProgram()
      .then((res) => {
        setPrograms(res?.data?.result?.programList || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

const handleCourseTypeChange = (event) => {
  const selectedCourseType = event.target.value;
  setSelectedCourseType(selectedCourseType);

  const filteredUniversities = universities.filter((university) =>
    programs.some((prog) => prog.universityName === university.universityName && prog.courseType === selectedCourseType)
  );
  setFilteredUniversities(filteredUniversities);
  setSelectedUniversity('');
  setFilteredPrograms([]);
  setSelectedProgram(null);
  setSelectedCampus('');
  setTrack({
    ...track,
    courseType: selectedCourseType,
    universityName: '',
    course: '',
    campus: '',
    inTake: '',
  });
};

const handleUniversityChange = (event) => {
  const selectedUniversityName = event.target.value;
  setSelectedUniversity(selectedUniversityName);

  const filteredPrograms = programs.filter(
    (prog) =>
      prog.universityName === selectedUniversityName && prog.courseType === selectedCourseType
  );
  setFilteredPrograms(filteredPrograms);
  setSelectedProgram(null);
  setSelectedCampus('');
  setTrack({
    ...track,
    universityName: selectedUniversityName,
    course: '',
    campus: '',
    inTake: '',
    courseFees:"",
  });
};

const handleProgramChange = (event) => {
  const selectedProgramTitle = event.target.value;
  const program = filteredPrograms.find((prog) => prog.programTitle === selectedProgramTitle);
  setSelectedProgram(program || null);
  setSelectedCampus('');
  setTrack({
    ...track,
    course: selectedProgramTitle,
    campus: '',
    inTake: '',
  });
};

const handleCampusChange = (event) => {
  const selectedCampus = event.target.value;
  setSelectedCampus(selectedCampus);

  const campusDetails = selectedProgram?.campuses?.find((campus) => campus.campus === selectedCampus);
  setTrack({
    ...track,
    campus: selectedCampus,
    inTake: campusDetails ? campusDetails.inTake : '',
    courseFees: campusDetails ? campusDetails.courseFees : '',

  });
};


const handleTrackSubmitted = (event) => {
  event.preventDefault();
  if (handleErrors(track)) {
    const data = {
      _id: id, // Assuming 'id' is the applicant's ID

      courseType: track.courseType, // From the track object (or any other input fields)
      universityName: track.universityName, // Set progress to 100% if applicable
    
      course: track.course, // Pass the completed status (true/false)
      campus: track.campus, // Any other fields like duration, if needed
      inTake: track.inTake, // Add position if applicable
      courseFees:track.courseFees,
      status: status,
    };
    updateApplication(data)
      .then((res) => {
        toast.success("Successfully updated application status");
        navigate("/list_application"); // Redirect to another page after successful update
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  }
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
                    <div className="card rounded-1 ">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-4 border-end border-5 border-primary">

                            <h5 className="card-name fw-semibold text-center">
                              {tracks?.name}
                            </h5>
                            <p className="card-text text-center fw-semibold mb-1">
                              {tracks?.email} {/* Student Code:{tracks?.studentCode || "N/A"} */}
                            </p>
                            <p className="card-text text-secondary text-center fw-semibold mb-3">
                              {tracks?.studentCode || "N/A"} || {tracks?.country}
                            </p>
                            <div className="text-center">
                              <button
                                aria-valuenow="75"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                className="btn btn-sm text-uppercase fw-semibold rounded-pill text-white px-4 py-1 position-relative"
                                style={{
                                  fontSize: "12px",
                                  backgroundColor: "#28A745",
                                  border: "none",
                                  overflow: "hidden",
                                }}
                              >
                                <div
                                  className="progress-bar progress-bar-striped progress-bar-animated"
                                  style={{ width: "75%", height: "100%" }}
                                ></div>
                              </div>
                            </div>
                            <span>View Profile</span>
                          </button>
                         
                          
                      <div className="text-center mt-2">
                      {tracks?.applicationFee > 0 && (
    <button className="btn text-white btn-sm justify-content-end"
            style={{ marginRight: "0.5rem", backgroundColor: "#FE5722",
                     fontFamily: "Plus Jakarta Sans",
                     fontSize: "12px", }} 
            onClick={makePayment} 
            value={tracks.applicationFee}>
        {tracks.applicationFee} Pay Now
    </button>
)}
                      </div>
                        </div>


                        
  





                      </div>
                      <div className="col-8">
                        <h5 className="card-program mb-2 fw-light">
                       <span className="text-primary fw-bold">{tracks?.course}</span>
                         
                        </h5>
                        <div className="mb-3 d-flex justify-content-between">
  <p className="card-text">{tracks?.universityName}</p>
  <div className="card p-2 rounded-1 border-primary border-2">
   
      <button
        className="btn btn-outline-dark text-uppercase fw-semibold px-3 py-1 text-center rounded-1"
        data-bs-toggle="modal"
        data-bs-target="#StatusModal" // Updated target to match the modal ID
      >
         <i className="fas fa-edit">Application</i>
      </button>
 
  </div>
</div>

<div
  className="modal fade" // Changed to "fade" for Bootstrap 5 compatibility
  id="StatusModal"
  tabIndex="-1"
  aria-labelledby="staticBackdropLabel" // Updated aria-labelledby to match the modal title
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">
          Edit Application
        </h1>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
      <form onSubmit={handleTrackSubmitted}>
      <div className="row">
        {/* Course Type */}
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
          <label className="form-label" style={{ color: "#231F20" }}>
            Course Type<span className="text-danger">*</span>
          </label>
          <select
            name="courseType"
            value={track.courseType}
            onChange={handleCourseTypeChange}
            className="form-select"
            style={{ fontSize: "12px" }}
          >
            <option value="">Select course type</option>
            {[...new Set(programs.map((prog) => prog.courseType))].map(
              (courseType, index) => (
                <option key={index} value={courseType}>
                  {courseType}
                </option>
              )
            )}
          </select>
        </div>

        {/* University Name */}
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
          <label className="form-label" style={{ color: "#231F20" }}>
            University Name<span className="text-danger">*</span>
          </label>
          <select
            name="universityName"
            value={track.universityName}
            onChange={handleUniversityChange}
            className="form-select"
            style={{ fontSize: "12px" }}
            disabled={!selectedCourseType}
          >
            <option value="">Select University</option>
            {filteredUniversities.map((uni) => (
              <option key={uni._id} value={uni.universityName}>
                {uni.universityName}
              </option>
            ))}
          </select>
        </div>

        {/* Program Title */}
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
          <label className="form-label" style={{ color: "#231F20" }}>
            Program Title<span className="text-danger">*</span>
          </label>
          <select
            name="course"
            value={track.course}
            onChange={handleProgramChange}
            className="form-select"
            style={{ fontSize: "12px" }}
            disabled={!selectedUniversity}
          >
            <option value="">Select program</option>
            {filteredPrograms.map((prog) => (
              <option key={prog._id} value={prog.programTitle}>
                {prog.programTitle}
              </option>
            ))}
          </select>
        </div>

        {/* Campus */}
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
          <label className="form-label" style={{ color: "#231F20" }}>
            Campus<span className="text-danger">*</span>
          </label>
          <select
            className="form-select font-weight-light"
            name="campus"
            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
            value={track.campus}
            onChange={handleCampusChange}
            disabled={!selectedProgram}
          >
            <option value="">Select Campus</option>
            {selectedProgram?.campuses?.map((campus, index) => (
              <option key={index} value={campus.campus}>
                {campus.campus}
              </option>
            ))}
          </select>
        </div>

        {/* Intake */}
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
          <label className="form-label" style={{ color: "#231F20" }}>
            Intake<span className="text-danger">*</span>
          </label>
          <select
            className="form-select font-weight-light"
            name="inTake"
            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
            value={track.inTake}
            onChange={(e) => setTrack({ ...track, inTake: e.target.value })}
            disabled={!selectedCampus}
          >
            <option value="">Select Intake</option>
            {[...new Set(
              selectedProgram?.campuses?.filter(campus => campus.campus === selectedCampus)
              .map(campus => campus.inTake)
            )].map((uniqueIntake, index) => (
              <option key={index} value={uniqueIntake}>
                {uniqueIntake}
              </option>
            ))}
          </select>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
          <label className="form-label" style={{ color: "#231F20" }}>
          courseFees<span className="text-danger">*</span>
          </label>
          <select
            className="form-select font-weight-light"
            name="courseFees"
            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
            value={track.courseFees}
            onChange={(e) => setTrack({ ...track, courseFees: e.target.value })}
            disabled={!selectedCampus}
          >
            <option value="">Select courseFees</option>
            {[...new Set(
              selectedProgram?.campuses?.filter(campus => campus.campus === selectedCampus)
              .map(campus => campus.courseFees)
            )].map((uniqueIntake, index) => (
              <option key={index} value={uniqueIntake}>
                {uniqueIntake}
              </option>
            ))}
          </select>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn px-4 py-2 text-uppercase fw-semibold"
            data-bs-dismiss="modal"
            style={{ fontSize: "12px", backgroundColor: "#231f20", color: "#fff" }}
          >
            Close
          </button>
          <button
            type="submit"
            className="btn px-4 py-2 text-uppercase fw-semibold"
            style={{ fontSize: "12px", backgroundColor: "#fe5722", color: "#fff" }}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
</div>


    </div>
  </div>
</div>

                        <div className="card bg-transparent rounded-2 mt-4">
                          <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex flex-column">
                                <p className="fw-semilight">Campus</p>
                                <p className="fw-semibold">{tracks?.campus}</p>
                              </div>
                              <div className="d-flex flex-column">
                                <p className="fw-semilight">Intake</p>
                                <p className="fw-semibold">{tracks?.inTake}</p>
                              </div>
                             
                              <div className="d-flex flex-column">
                                <p className="fw-semilight">Tuition Fee</p>
                                <p className="fw-semibold">{tracks?.courseFees}</p>
                              </div>
                              <div className="d-flex flex-column">
                                <p className="fw-semilight">Application Code</p>
                                <p className="fw-semibold">{tracks?.applicationCode}</p>
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

              
      
               
              <div className="container-fluid">
  <div className="row">
    <div className="col">
      <div className="card border-0 rounded-1 shadow-sm p-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-between align-items-center">
          {statuses
  .sort((a, b) => a.position - b.position) // Sort by position
  .map((item, index) => {
    // Check if the previous status is fully completed (progress = 100)
    const isPreviousCompleted = index === 0 || statuses[index - 1].progress === 100;

    return (
      <div
        className="position-relative m-2"
        key={item.id} // Use a unique identifier instead of index if possible
        style={{ flex: "1 1 auto", maxWidth: "10%" }}
      >
        <div className="position-relative">
          <div
            className="progress"
            role="progressbar"
            aria-label="Progress"
            aria-valuenow={item.progress} // Update here
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ height: "9px" }}
          >
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              style={{
                width: `${item.progress}%`, // Update here
                backgroundColor: getProgressColor(item.progress), // Update here
              }}
            ></div>
          </div>

          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>{item.position}</Tooltip>}
          >
            <button
              type="button"
              className={`position-absolute text-bold top-0 start-0 translate-middle-y btn btn-sm btn-primary rounded-pill ${!isPreviousCompleted ? 'disabled' : ''}`}
              data-bs-toggle={isPreviousCompleted ? "modal" : undefined} // Only enable modal if previous is complete
              data-bs-target={isPreviousCompleted ? `#modal-${item._id}` : undefined} // Use item.id for unique modal ID
              style={{
                width: "2rem",
                height: "2rem",
                left: "0",
                color: "#FFF",
              }}
              onClick={isPreviousCompleted ? () => handleEditModule(item) : undefined} // Only trigger edit if previous is complete
              disabled={!isPreviousCompleted} // Disable the button if previous is not completed
            >
              {item.position}
            </button>
          </OverlayTrigger>

          {/* Status Name */}
          <div className="d-flex justify-content-start align-items-center mt-3">
            {item.statusName}
          </div>
          <div className="d-flex justify-content-start align-items-center mt-3 d-none">
            {item.subCategory}
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

                    {/* Sub Category Input */}
                    <div className="col-sm-6 col-lg-12 col-sm-12 mb-3">
                      <Select
                        isMulti
                        options={CategoriesOptions}
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
                        value={track.commentBox}
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
                          handleRichTextChange(data);
                        }}
                        name="commentBox"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                          zIndex: "0",
                        }}
                      />
                      {submitted && trackErrors.commentBox.required && (
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
                                    <div
                                      className="progress-bar progress-bar-striped progress-bar-animated"
                                      style={{ width: "75%", height: "100%" }}
                                    ></div>
                                  </div>
                                </div>
                                <span>View Profile</span>
                              </button>


                              <div className="text-center mt-2">
                                {tracks?.applicationFee > 0 && (
                                  <button className="btn text-white btn-sm justify-content-end"
                                    style={{
                                      marginRight: "0.5rem", backgroundColor: "#FE5722",
                                      fontFamily: "Plus Jakarta Sans",
                                      fontSize: "12px",
                                    }}
                                    onClick={makePayment}
                                    value={tracks.applicationFee}>
                                    {tracks.applicationFee} Pay Now
                                  </button>
                                )}
                              </div>
                            </div>









                          </div>
                          <div className="col-8">
                            <h5 className="card-program mb-2 fw-light">
                              <span className="text-primary fw-bold">{tracks?.course}</span>

                            </h5>
                            <div className="mb-3 d-flex justify-content-between">
                              <p className="card-text">{tracks?.universityName}</p>
                              <div className="card p-2 rounded-1 border-primary border-2">

                                <button
                                  className="btn btn-outline-dark text-uppercase fw-semibold px-3 py-1 text-center rounded-1"
                                  data-bs-toggle="modal"
                                  data-bs-target="#StatusModal" // Updated target to match the modal ID
                                >
                                  <i className="fas fa-edit">Application</i>
                                </button>

                              </div>
                            </div>

                            <div
                              className="modal fade" // Changed to "fade" for Bootstrap 5 compatibility
                              id="StatusModal"
                              tabIndex="-1"
                              aria-labelledby="staticBackdropLabel" // Updated aria-labelledby to match the modal title
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                      Edit Application
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


                                      </div>
                                      <div className="input-group mb-3">

                                        <select
                                          name="universityName"
                                          value={track.universityName}
                                          onChange={handleTrack}
                                          className="form-select"
                                          style={{ fontSize: "12px" }}
                                          placeholder="Select University Name"
                                        >
                                          <option value="">Select University</option>
                                          {university.map((uni) => (
                                            <option
                                              key={uni._id}
                                              value={uni.universityName}
                                            >
                                              {uni.universityName}
                                            </option>
                                          ))}
                                        </select>

                                      </div>
                                      <div className="input-group mb-3">

                                        <select
                                          name="course"
                                          value={track.course}
                                          onChange={handleProgramChange}
                                          className="form-select"
                                          style={{ fontSize: "12px" }}
                                          placeholder="Select Program"
                                        >
                                          <option value="">Select course</option>
                                          {programs.map((uni) => (
                                            <option
                                              key={uni._id}
                                              value={uni.programTitle}
                                            >
                                              {uni.programTitle}
                                            </option>
                                          ))}
                                        </select>

                                      </div>
                                      <div className="input-group mb-3 ">

                                        <select
                                          className="form-select font-weight-light"
                                          name="campus"
                                          style={{
                                            fontFamily: "Plus Jakarta Sans",
                                            fontSize: "14px",
                                          }}
                                          value={track.campus}
                                          onChange={handleTrack}
                                        >
                                          <option value="">Select Campus</option>

                                          {[
                                            ...new Set(
                                              selectedProgram?.campuses?.map(
                                                (campus) => campus.campus
                                              )
                                            ),
                                          ].map((uniqueCampus, index) => (
                                            <option key={index} value={uniqueCampus}>
                                              {uniqueCampus}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                      <div className="input-group mb-3">
                                        <select
                                          className="form-select font-weight-light"
                                          name="inTake"
                                          style={{
                                            fontFamily: "Plus Jakarta Sans",
                                            fontSize: "14px",
                                          }}
                                          value={tracks.inTake}
                                          onChange={handleTrack}
                                        >
                                          <option value="">Select Intake</option>

                                          {[
                                            ...new Set(
                                              selectedProgram?.campuses?.map(
                                                (campus) => campus.inTake
                                              )
                                            ),
                                          ].map((uniqueCampus, index) => (
                                            <option key={index} value={uniqueCampus}>
                                              {uniqueCampus}
                                            </option>
                                          ))}
                                        </select>

                                      </div>
                                      <div className="input-group mb-3">
                                        <select
                                          className="form-select font-weight-light"
                                          name="inTake"
                                          style={{
                                            fontFamily: "Plus Jakarta Sans",
                                            fontSize: "14px",
                                          }}
                                          value={tracks.inTake}
                                          onChange={handleTrack}
                                        >
                                          <option value="">Select Intake</option>

                                          {[
                                            ...new Set(
                                              selectedProgram?.campuses?.map(
                                                (campus) => campus.inTake
                                              )
                                            ),
                                          ].map((uniqueCampus, index) => (
                                            <option key={index} value={uniqueCampus}>
                                              {uniqueCampus}
                                            </option>
                                          ))}
                                        </select>

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
                                        >
                                          Submit
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="card bg-transparent rounded-2 mt-4">
                              <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="d-flex flex-column">
                                    <p className="fw-semilight">Campus</p>
                                    <p className="fw-semibold">{tracks?.campus}</p>
                                  </div>
                                  <div className="d-flex flex-column">
                                    <p className="fw-semilight">Intake</p>
                                    <p className="fw-semibold">{tracks?.inTake}</p>
                                  </div>

                                  <div className="d-flex flex-column">
                                    <p className="fw-semilight">Tuition Fee</p>
                                    <p className="fw-semibold">{tracks?.courseFees}</p>
                                  </div>
                                  <div className="d-flex flex-column">
                                    <p className="fw-semilight">Application Code</p>
                                    <p className="fw-semibold">{tracks?.applicationCode}</p>
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
                                // Check if the previous status is fully completed (progress = 100)
                                const isPreviousCompleted = index === 0 || statuses[index - 1].progress === 100;

                                return (
                                  <div>
                                    <div>{new Date(item?.createdOn).toLocaleDateString('en-GB').replace(/\//g, '-')}</div>
                                    <div
                                      className="position-relative m-2"
                                      key={item.id} // Use a unique identifier instead of index if possible
                                      style={{ flex: "1 1 auto", maxWidth: "10%" }}
                                    >
                                      <div className="position-relative">

                                        <div
                                          className="progress"
                                          role="progressbar"
                                          aria-label="Progress"
                                          aria-valuenow={item.progress} // Update here
                                          aria-valuemin="0"
                                          aria-valuemax="100"
                                          style={{ height: "9px" }}
                                        >

                                          <div
                                            className="progress-bar progress-bar-striped progress-bar-animated"
                                            style={{
                                              width: `${item.progress}%`, // Update here
                                              backgroundColor: getProgressColor(item.progress), // Update here
                                            }}
                                          ></div>
                                        </div>

                                        <OverlayTrigger
                                          placement="bottom"
                                          overlay={<Tooltip>{item.position}</Tooltip>}
                                        >
                                          <button
                                            type="button"
                                            className={`position-absolute text-bold top-0 start-0 translate-middle-y btn btn-sm btn-primary rounded-pill ${!isPreviousCompleted ? 'disabled' : ''}`}
                                            data-bs-toggle={isPreviousCompleted ? "modal" : undefined} // Only enable modal if previous is complete
                                            data-bs-target={isPreviousCompleted ? `#modal-${item._id}` : undefined} // Use item.id for unique modal ID
                                            style={{
                                              width: "2rem",
                                              height: "2rem",
                                              left: "0",
                                              color: "#FFF",
                                            }}
                                            onClick={isPreviousCompleted ? () => handleEditModule(item) : undefined} // Only trigger edit if previous is complete
                                            disabled={!isPreviousCompleted} // Disable the button if previous is not completed
                                          >
                                            {item.position}
                                          </button>
                                        </OverlayTrigger>

                                        {/* Status Name */}
                                        <div className="d-flex justify-content-start align-items-center mt-3">
                                          {item.statusName}
                                        </div>
                                        <div className="d-flex justify-content-start align-items-center mt-3 ">
                                          {new Date(
                                            new Date(item?.createdOn).setDate(new Date(item?.createdOn).getDate() + Number(item?.duration))
                                          ).toLocaleDateString('en-GB').replace(/\//g, '-')}
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

                                                  {/* Sub Category Input */}
                                                  <div className="col-sm-6 col-lg-12 col-sm-12 mb-3">
                                                    <Select
                                                      isMulti
                                                      options={CategoriesOptions}
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
                                                      value={track.commentBox}
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
                                                        handleRichTextChange(data);
                                                      }}
                                                      name="commentBox"
                                                      style={{
                                                        fontFamily: "Plus Jakarta Sans",
                                                        fontSize: "12px",
                                                        zIndex: "0",
                                                      }}
                                                    />
                                                    {submitted && trackErrors.commentBox.required && (
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
                              <form onSubmit={handleTrackSubmit}>
                                <div className="input-group mb-3">
                                  <span
                                    className="input-group-text"
                                    id="basic-addon1"
                                  >
                                    <i className="fa fa-tasks nav-icon text-dark"></i>
                                  </span>
                                  <select
                                    name="statusName"
                                    value={track.statusName}
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
                                    trackErrors.statusName.required && (
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


                                  <CKEditor
                                    editor={ClassicEditor}
                                    value={track.commentBox}
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


                      <div className="collapse" id="taggingSection">
                        <div className="btn btns-m border-0 rounded-1 btn-danger float-end m-2" data-bs-toggle="collapse" data-bs-target="#taggingSection"><i className="fa fa-minus" aria-hidden="true"></i>&nbsp;Hide</div>
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

                              <CKEditor
                                editor={ClassicEditor}
                                value={track.commentBox}
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
                                            <button className="btn btn-sm btn-link text-white" type="button" data-bs-toggle="collapse" data-bs-target="#taggingSection">
                                              <i className="fa fa-reply" aria-hidden="true"></i>
                                            </button>
                                          </div>

                                        </div>
                                        <div className="card-body">

                                          <CKEditor
                                            editor={ClassicEditor}
                                            data={item?.commentBox}
                                            disabled={true}
                                            config={{
                                              toolbar: [],
                                            }}
                                          /><br /><br />
                                          Sincerely,<br />
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
              </div>




            </div>
          </div>

        </div>

      </div>
    </>
  );
};

export default ViewApplication;
