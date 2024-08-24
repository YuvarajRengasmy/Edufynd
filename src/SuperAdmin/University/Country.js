import React, { useEffect, useState } from "react";
import {
  isValidEmail,
  isValidPassword,
  isValidPhone,
} from "../../Utils/Validation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { saveNotifications } from "../../api/Notification/Notification";
import { getallStaff } from "../../api/staff";
import { getallAdmin } from "../../api/admin";
import { getallAgent } from "../../api/agent";
import { getallStudent } from "../../api/student";
import Select from "react-select";
import Sidebar from "../../compoents/sidebar";
import "react-quill/dist/quill.snow.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { RichTextEditor } from "@mantine/rte";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker"; // Add this line
import 'react-datepicker/dist/react-datepicker.css';

export const AddNotifications = () => {
  const initialState = {
    typeOfUser: "",
    userName: "",
    subject: "",
    content: "",
    uploadImage: "",
    createdBy: "",
    scheduledTime: null, // Add this line
  };

  const initialStateErrors = {
    typeOfUser: { required: false },
    userName: { required: false },
    subject: { required: false },
    content: { required: false },
    uploadImage: { required: false },
    scheduledTime: { required: false }, // Add this line
  };

  const [notification, setNotification] = useState(initialState);
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

  const handleValidation = (data) => {
    let error = initialStateErrors;

    if (data.typeOfUser === "") {
      error.typeOfUser.required = true;
    }

    if (data.userName.length === 0) {
      error.userName.required = true;
    }

    if (data.subject === "") {
      error.subject.required = true;
    }

    if (data.content === "") {
      error.content.required = true;
    }

    if (data.uploadImage === "") {
      error.uploadImage.required = true;
    }

    if (!data.scheduledTime) {
      error.scheduledTime.required = true;
    }

    return error;
  };

  const convertToBase64 = (e, name) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setNotification((notification) => ({
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
      setNotification({
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

  const handleSelectChange = (selectedOptions, action) => {
    const { name } = action;
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setNotification((prevNotification) => ({
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
    setNotification((prevNotification) => ({
      ...prevNotification,
      content: value,
    }));
  };

  const handleScheduledTimeChange = (date) => {
    setNotification((prevNotification) => ({
      ...prevNotification,
      scheduledTime: date,
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
      saveNotifications(updateNotifications)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/list_notifications");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    } else {
      toast.error("Please fill mandatory fields");
    }
  };

  const adminOptions = admin.map((data) => ({
    value: data.name,
    label: data.name,
  }));

  const staffOptions = staff.map((data) => ({
    value: data.empName,
    label: data.empName,
  }));

  const studentOptions = student.map((data) => ({
    value: data.name,
    label: data.name,
  }));

  const agentOptions = agent.map((data) => ({
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
      <div>
        <Sidebar />

        <div
          className="content-wrapper "
          style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
        >
          <div className="content-header ">
            <div className="container-fluid">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-xl-12 ">
                    <div className="card border-0 rounded-0 shadow-sm p-3 position-relative">
                      <div
                        className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0"
                        style={{ background: "#fe5722", color: "#fff" }}
                      >
                        <h5 className="text-center text-capitalize p-1">
                          Add Notifications Details
                        </h5>
                      </div>
                      <div className="card-body mt-5">
                        <div className="row g-3">
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Type of Users{" "}
                              <span className="text-danger">*</span>
                            </label>

                            <select
                              className="form-select form-select-lg"
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
                            {errors?.typeOfUser?.required && (
                              <span className="text-danger font-monospace ps-2">
                                User Type is Required
                              </span>
                            )}
                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              User Name <span className="text-danger">*</span>
                            </label>

                            <Select
                              isMulti
                              options={
                                notification?.typeOfUser === "staff"
                                  ? staffOptions
                                  : notification?.typeOfUser === "student"
                                  ? studentOptions
                                  : notification?.typeOfUser === "admin"
                                  ? adminOptions
                                  : agentOptions
                              }
                              onChange={handleSelectChange}
                              name="userName"
                              styles={customStyles}
                            />
                            {errors?.userName?.required && (
                              <span className="text-danger font-monospace ps-2">
                                User Name is Required
                              </span>
                            )}
                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Subject <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              name="subject"
                              onChange={handleInputs}
                              placeholder="Enter Notification Subject"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                            />
                            {errors?.subject?.required && (
                              <span className="text-danger font-monospace ps-2">
                                Subject is Required
                              </span>
                            )}
                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Schedule Time <span className="text-danger">*</span>
                            </label>
                            <DatePicker
        selected={notification.scheduledTime}
        onChange={handleScheduledTimeChange}
        showTimeSelect
        dateFormat="Pp"
        className="form-control form-control-md custom-date-picker"
        name="scheduledTime"
        type="date"
        style={{
          fontFamily: "Plus Jakarta Sans",
          fontSize: "12px",
        }}
      />
                            {errors?.scheduledTime?.required && (
                              <span className="text-danger font-monospace ps-2">
                                Scheduled Time is Required
                              </span>
                            )}
                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Upload Image <span className="text-danger">*</span>
                            </label>

                            <input
                              type="file"
                              className="form-control form-control-lg"
                              onChange={handleInputs}
                              name="uploadImage"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                            />
                            {errors?.uploadImage?.required && (
                              <span className="text-danger font-monospace ps-2">
                                Upload Image is Required
                              </span>
                            )}
                          </div>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Content <span className="text-danger">*</span>
                            </label>
                            <RichTextEditor
                              value={notification.content}
                              onChange={handleRichTextChange}
                              controls={[
                                ["bold", "italic", "underline", "link"],
                                ["unorderedList", "h1", "h2", "h3"],
                                ["sup", "sub"],
                                ["alignLeft", "alignCenter", "alignRight"],
                              ]}
                            />
                            {errors?.content?.required && (
                              <span className="text-danger font-monospace ps-2">
                                Content is Required
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="d-flex justify-content-between mt-3">
                          <button
                            type="submit"
                            className="btn btn-success"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                              color: "#fff",
                            }}
                          >
                            Save
                          </button>
                          <Link
                            to="/list_notifications"
                            className="btn btn-primary"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                          >
                            Back
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddNotifications;