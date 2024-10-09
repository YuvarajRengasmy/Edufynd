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

//     event.preventDefault();
//     const newErrorEducation = handleValidation(track);
//     setTrackErrors(newErrorEducation);
//     setSubmitted(true);
  
//     const selectedValues = selectedOptions.map((option) => option.value);
  
//     if (handleErrors(newErrorEducation)) {
//         if (id) {
//             const data = {
               
//                 status: {
//                     ...track,
//                     progress: 100,
//                     subCategory: selectedValues, // Set progress to 100% upon submission
//                 },
                
//             };

//             updateApplication(data)
//                 .then((res) => {
//                     toast.success("Successfully updated application status");
//                     getAllModuleDetails();
//                     if (modalRef.current) {
//                         modalRef.current.click(); // Close the modal
//                     }
//                 })
//                 .catch((err) => console.log(err));
//         }
//     }
// };

const handleTrackSubmit = (event) => {
  event.preventDefault();
    const newErrorEducation = handleValidation(track);
    setTrackErrors(newErrorEducation);
    setSubmitted(true);
    const selectedValues = selectedOptions.map((option) => option.value);

  if (handleErrors(newErrorEducation))  {
    const data = {
    
      status: {
        _id: editId,
        ...track,
        progress: 100,
        subCategory: selectedValues, // Set progress to 100% upon submission
    }, // If editing, include the ID in the data
    };

    if (isEditing) {
      updateApplication(data)
        .then((res) => {
          toast.success("Successfully updated application status");
          event.target.reset();
          setTrack(initialState);
         
          setSubmitted(false);
          getAllModuleDetails();
         
       
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  }
};

const getProgressColor = (progress) => {
  if (progress === 100) return "#4caf50"; // Green for complete
  if (progress > 50) return "#ffeb3b"; // Yellow for more than 50%
  return "#f44336"; // Red for less than or equal to 50%
};


  
 const makePayment = async()=>{
  const stripe = await loadStripe('pk_live_51OQ6F2A2rJSV7g6S1333dKPIqp5F7YahINaeS3w7fTFjiOcYneMtyXsE2QFiyGOkm9ruw6hNzZqiZSzUFGNdNVe10019LkXbRY')

  const body = {
    amount:tracks?.applicationFee * 100
  }
  const header = {
    'Content-Type': 'application/json'
  }
  const response = await fetch('https://api.edufynd.in/api/payment/create-checkout-session',{
    method: 'POST',
    headers:header,
    body: JSON.stringify(body) 
  })
  const session = await response.json()

  const result = stripe.redirectToCheckout({
    sessionId: session.id
  })

  if(result.error){
    console.log(result.error)
  }
}

   
const CategoriesOptions = track?.subCategory
? track.subCategory.map((subCategory) => ({
    value: subCategory,
    label: subCategory,
  }))
: [];

  return (
    <>
      <Sidebar />
      <div
        className="content-wrapper"
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
      >
        <div className="content-header text-end">

<BackButton/>

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
                            <i className="fas fa-star"></i>
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
            
    



              
              </div>
            </div>
          
          </div>
        
      </div>
    </>
  );
};

export default ViewApplication;
