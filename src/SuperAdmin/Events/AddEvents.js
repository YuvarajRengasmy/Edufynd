import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { saveEvent } from "../../api/Notification/event";
import { getallStaff } from "../../api/staff";
import { getallAdmin } from "../../api/admin";
import { getallAgent } from "../../api/agent";
import { getallStudent } from "../../api/student";
import { getallUniversity } from "../../api/university";
import Sidebar from "../../compoents/sidebar";
import { Link } from "react-router-dom";
import Select from "react-select";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export const AddEvents = () => {
  const initialState = {
    typeOfUser: "",
    userName: "",
    hostName: "",
    content:"",
    eventTopic: "",
    universityName: "",
    date: "",
    time: "",
    venue: "",
    fileUpload: [],
   
  };

  const initialStateErrors = {
    typeOfUser: { required: false },
    userName: { required: false },
    hostName: { required: false },
    content: { required: false },
    eventTopic: { required: false },
    universityName: { required: false },
    date: { required: false },
    time: { required: false },
    venue: { required: false },
    fileUpload: { required: false },
  };

  const [notification, setnotification] = useState(initialState);
  const [university, setUniversity] = useState([]);
  const [staff, setStaff] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [agent, setAgent] = useState([]);
  const [student, setStudent] = useState([]);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getStaffList();
    getAdminList();
    getAllUniversityList();
    getAgentList();
    getStudentList();
  }, []);
  const getStaffList = () => {
    getallStaff()
      .then((res) => {
        setStaff(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAdminList = () => {
    getallAdmin()
      .then((res) => {
        setAdmin(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllUniversityList = () => {
    getallUniversity()
      .then((res) => {
        setUniversity(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAgentList = () => {
    getallAgent()
      .then((res) => {
        setAgent(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getStudentList = () => {
    getallStudent()
      .then((res) => {
        setStudent(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const addEntry = (listName) => {
    const newEntry = listName === "fileUpload"
      ? { fileUpload:"" }
      : {  fileUpload:"" };
    setnotification({ ...notification, [listName]: [...notification[listName], newEntry] });
  };

  const removeEntry = (index, listName) => {
    const updatedList = notification[listName].filter((_, i) => i !== index);
    setnotification({ ...notification, [listName]: updatedList });
  };
 
  const handleValidation = (data) => {
    let error = initialStateErrors;

    if (data.typeOfUser === "") {
      error.typeOfUser.required = true;
    }

    if (data.userName === "") {
      error.userName.required = true;
    }
    if(data.hostName === "") {
      error.hostName.required = true;
    }

    if (data.eventTopic === "") {
      error.eventTopic.required = true;
    }
    if (data.universityName === "") {
      error.universityName.required = true;
    }
    if (data.date === "") {
      error.date.required = true;
    }
    if (data.time === "") {
      error.time.required = true;
    }
    if (data.venue === "") {
      error.venue.required = true;
    }

    return error;
  };

  const convertToBase64 = (e, name) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setnotification((notification) => ({
        ...notification,
        [name]: reader.result,
      }));
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };
  
  const handleInputs = (event) => {
    const { name, value, files } = event.target;
    if (files && files[0]) {
      convertToBase64(event, name);
    } else {
      setnotification({
        ...notification,
        [event?.target?.name]: event?.target?.value,
      });
    }

    if (submitted) {
      const newError = handleValidation({
        ...notification,
        [event.target.name]: event.target.value,
      });
      setErrors(newError);
    }
  };


  const handleListInputChange = (e, index, listName) => {
    const { name, value,files } = e.target;
    if (files && files[0]) {
      convertToBase64(e, name);
    } else {
      setnotification({
        ...notification,
        [listName]: notification[listName].map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        ),
      });
    }
  };
  const handleSelectChange = (selectedOptions, action) => {
    const { name } = action;
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setnotification((prevNotification) => ({
      ...prevNotification,
      [name]: values,
    }));
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

  const handleRichTextChange = (value) => {
    setnotification((prevnotification) => ({
      ...prevnotification,
      content: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(notification);
    setErrors(newError);
    setSubmitted(true);
    const updateNotifications = {
      ...notification,
    };
    if (handleErrors(newError)) {
      saveEvent(updateNotifications)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/list_events");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    } else {
      toast.error("Please fill mandatory fields");
    }
  };

  const adminOptions = admin.map((data, index) => ({
    value: data.name,
    label: data.name,
  }));

  const staffOptions = staff.map((data, index) => ({
    value: data.empName,
    label: data.empName,
  }));

  const studentOptions = student.map((data, index) => ({
    value: data.name,
    label: data.name,
  }));

  const agentOptions = agent.map((data, index) => ({
    value: data.agentName,
    label: data.agentName,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "1.4783px solid rgba(11, 70, 84, 0.25)",
      borderRadius: "4.91319px",
      fontSize: "11px",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "#3B0051" : "#F2CCFF",
      ":hover": {
        color: "black",
      },
    }),
  };

  

  return (
    <>
      <Sidebar />

      <div
        className="content-wrapper "
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
      >
        <div className="content-header ">
          <div className=" container-fluid ">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-xl-12 ">
                  <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                    <div
                      className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0"
                      style={{ background: "#fe5722", color: "#fff" }}
                    >
                      <h5 className="text-center text-capitalize p-1">
                        {" "}
                        Add Events Details
                      </h5>
                    </div>
                    <div className="card-body mt-5">
                      <div className="row g-3">
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Host Name<span className="text-danger">*</span>
                          </label>
                          <Select
                            placeholder="Select staff"
                            onChange={(selectedOption) =>
                              setnotification({
                                ...notification,
                                hostName: selectedOption.value,
                              })
                            }
                            options={staffOptions}
                            name="hostName"
                            styles={customStyles}
                            className="submain-one-form-body-subsection-select"
                          />
                          {errors.hostName.required && (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          )}
                        </div>
                     
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Type of Users <span className="text-danger">*</span>
                          </label>

                          <select
                            class="form-select form-select-lg"
                            name="typeOfUser"
                            onChange={handleInputs}
                            aria-label="Default select example"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                          >
                            <option selected>Select User</option>
                            <option value="staff">Staff</option>
                            <option value="student">Student</option>
                            <option value="agent">Agent</option>
                            <option value="admin">Admin</option>
                          </select>
                          {errors.typeOfUser.required ? (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          ) : null}
                        </div>
                        {notification.typeOfUser === "staff" ? (
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Admin List<span className="text-danger">*</span>
                            </label>
                            <Select
                              isMulti
                              placeholder="Select staff"
                              onChange={handleSelectChange}
                              options={staffOptions}
                              name="userName"
                              styles={customStyles}
                              className="submain-one-form-body-subsection-select"
                            />
                            {errors.userName.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                        ) : notification.typeOfUser === "student" ? (
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Student List<span className="text-danger">*</span>
                            </label>
                            <Select
                              isMulti
                              placeholder="Select Country"
                              onChange={handleSelectChange}
                              options={studentOptions}
                              name="userName"
                              styles={customStyles}
                              className="submain-one-form-body-subsection-select"
                            />
                            {errors.userName.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                        ) : notification.typeOfUser === "agent" ? (
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Admin List<span className="text-danger">*</span>
                            </label>
                            <Select
                              isMulti
                              placeholder="Select Country"
                              onChange={handleSelectChange}
                              options={agentOptions}
                              name="userName"
                              styles={customStyles}
                              className="submain-one-form-body-subsection-select"
                            />
                            {errors.userName.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                        ) : notification.typeOfUser === "admin" ? (
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Admin List<span className="text-danger">*</span>
                            </label>
                            <Select
                              isMulti
                              placeholder="Select Country"
                              onChange={handleSelectChange}
                              options={adminOptions}
                              name="userName"
                              styles={customStyles}
                              className="submain-one-form-body-subsection-select"
                            />
                            {errors.userName.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                        ) : null}
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Event Topic<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control "
                            onChange={handleInputs}
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Enter  eventTopic"
                            name="eventTopic"
                            value={notification.eventTopic}
                          />
                          {errors.eventTopic.required ? (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          ) : null}
                        </div>

                        <div className="row gy-2 ">
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              University<span className="text-danger">*</span>
                            </label>
                            <select
                              class="form-select form-select-lg"
                              aria-label="Default select example"
                              onChange={handleInputs}
                              name="universityName"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                            >
                              <option value="">Select University</option>
                              {university.map((uni, index) => (
                                <option key={index} value={uni.universityName}>
                                  {uni.universityName}
                                </option>
                              ))}
                            </select>
                            {errors.universityName.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Venue<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control "
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              onChange={handleInputs}
                              placeholder="Enter  Venue"
                              name="venue"
                            />
                            {errors.venue.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div className="row gy-2 ">
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Date<span className="text-danger">*</span>
                            </label>
                            <input
                              type="date"
                              className="form-control "
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              placeholder="Enter  Date"
                              name="date"
                              onChange={handleInputs}
                            />
                            {errors.date.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Time<span className="text-danger">*</span>
                            </label>
                            <input
                              type="time"
                              className="form-control "
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              placeholder="Enter  time"
                              name="time"
                              onChange={handleInputs}
                            />
                            {errors.time.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-6 col-md-6 col-sm-12">
                        <CKEditor
  editor={ClassicEditor}
  data={notification.content}  // Use 'data' instead of 'value'
  config={{
    placeholder: 'Start writing your content here...',
    toolbar: [ 'heading', '|', 'bold', 'italic', 'link' ]  // Adjust toolbar as needed
  }}
  onChange={(event, editor) => {
    const data = editor.getData();
    console.log({ data });
    handleRichTextChange(data);  // Call your handler here
  }}
  style={{
    fontFamily: "Plus Jakarta Sans",
    fontSize: "12px",
    zIndex: '0'
  }}
/>
                       
                        </div>
                    
                        {notification.fileUpload.map((allowance, index) => (
                            <div key={index} className="mb-3">
                              <div className="form-group">
                              <input
                                type="file"
                                name="fileUpload"
                                value={allowance.fileUpload}
                                onChange={(e) => handleListInputChange(e, index, "allowance")}
                                className="form-label rounded-1"
                                style={{ fontSize: "12px" }}
                                placeholder="Allowance title"
                              />
                             </div>
                              <button
                                type="button"
                                onClick={() => removeEntry(index, "allowance")}
                                className="btn mt-2"
                              >
                                <i className="far fa-trash-alt text-danger me-1"></i>
                              </button>
                            </div>
                          ))}

<button
                            type="button"
                            onClick={() => addEntry("allowance")}
                            className="btn btn-sm fw-semibold text-capitalize text-white float-end px-4 py-1"
                            style={{ backgroundColor: "#7267ef" }}
                          >
                            <i className="fas fa-plus-circle"></i>&nbsp;&nbsp;Add
                          </button>
                        <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                          <Link
                            to="/list_events"
                            style={{
                              backgroundColor: "#231F20",
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            type="reset"
                            className="btn btn-cancel border-0 fw-semibold text-uppercase text-white px-4 py-2  m-1"
                          >
                            Cancel
                          </Link>
                          <button
                            style={{
                              backgroundColor: "#FE5722",
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            type="submit"
                            className="btn btn-save border-0 fw-semibold text-uppercase text-white px-4 py-2 m-1"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddEvents;
