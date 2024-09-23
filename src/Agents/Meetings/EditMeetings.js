import React, { useEffect, useState } from "react";
import {
  isValidEmail,
  isValidPassword,
  isValidPhone,
} from "../../Utils/Validation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  updatedMeeting,
  getSingleMeeting,
} from "../../api/Notification/meeting";
import { getallClientModule } from "../../api/universityModule/clientModule";
import Header from "../../compoents/header";
import Sidebar from "../../compoents/AgentSidebar";

import { getallStaff } from "../../api/staff";
import { getallAdmin } from "../../api/admin";
import { getallAgent } from "../../api/agent";
import { getallStudent } from "../../api/student";
import Select from "react-select";
import { Link, useLocation } from "react-router-dom";
import { RichTextEditor } from "@mantine/rte";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export const AddMeetings = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const initialState = {
    hostName: "",
    attendees: "",
    subject: "",
    content: "",
    date: "",
    time: "",
  };

  const initialStateErrors = {
    hostName: { required: false },
    attendees: { required: false },
    subject: { required: false },
    content: { required: false },
    date: { required: false },
    time: { required: false },
  };

  const [notification, setnotification] = useState(initialState);
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
    getMeetingList();
    getAgentList();
    getStudentList();
  }, []);

  const getMeetingList = () => {
    getSingleMeeting(id)
      .then((res) => {
        setnotification(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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

    if (data.hostName === "") {
      error.hostName.required = true;
    }
    if (data.attendees === "") {
      error.attendees.required = true;
    }
    if (data.subject === "") {
      error.subject.required = true;
    }
    if (data.content === "") {
      error.content.required = true;
    }
    if (data.date === "") {
      error.date.required = true;
    }
    if (data.time === "") {
      error.time.required = true;
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
      updatedMeeting(updateNotifications)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/agent_list_meetings");
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
      <div>
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
                    <div className="card  border-0 rounded-1 shadow-sm p-3 position-relative">
                      <div
                        className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0"
                        style={{ background: "#fe5722", color: "#fff" }}
                      >
                        <h5 className="text-center text-capitalize p-1">
                          {" "}
                          Edit Meeting Details
                        </h5>
                      </div>
                      <div className="card-body mt-5">
                        <div className="row g-3">
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Host Name<span className="text-danger">*</span>
                            </label>
                            <select
                              class="form-select form-select-lg rounded-1 text-capitalize"
                              aria-label="Default select example"
                            >
                              <option selected>Select User</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Type Of User{" "}
                              <span className="text-danger">*</span>
                            </label>

                            <select
                              class={`form-select form-select-lg rounded-1 text-capitalize ${
                                errors.hostName.required ? "is-invalid" : ""
                              }`}
                              name="hostName"
                              onChange={handleInputs}
                              aria-label="Default select example"
                              value={notification.hostName}
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
                            {errors.hostName.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                          {notification.hostName === "staff" ? (
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Staff List<span className="text-danger">*</span>
                              </label>
                              <Select
                                isMulti
                                placeholder="Select Staff"
                                onChange={handleSelectChange}
                                options={staffOptions}
                                value={
                                  notification?.attendees
                                    ? notification?.attendees.map((inTake) => ({
                                        value: inTake,
                                        label: inTake,
                                      }))
                                    : null
                                }
                                name="attendees"
                                styles={customStyles}
                                className="submain-one-form-body-subsection-select"
                              />
                              {errors.attendees.required ? (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              ) : null}
                            </div>
                          ) : notification.hostName === "student" ? (
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Student List
                                <span className="text-danger">*</span>
                              </label>
                              <Select
                                isMulti
                                placeholder="Select Student"
                                onChange={handleSelectChange}
                                options={studentOptions}
                                value={
                                  notification?.attendees
                                    ? notification?.attendees.map((inTake) => ({
                                        value: inTake,
                                        label: inTake,
                                      }))
                                    : null
                                }
                                name="attendees"
                                styles={customStyles}
                                className="submain-one-form-body-subsection-select"
                              />
                              {errors.attendees.required ? (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              ) : null}
                            </div>
                          ) : notification.hostName === "agent" ? (
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Agent List<span className="text-danger">*</span>
                              </label>
                              <Select
                                isMulti
                                placeholder="Select Agent"
                                onChange={handleSelectChange}
                                options={agentOptions}
                                value={
                                  notification?.attendees
                                    ? notification?.attendees.map((inTake) => ({
                                        value: inTake,
                                        label: inTake,
                                      }))
                                    : null
                                }
                                name="attendees "
                                styles={customStyles}
                                className="submain-one-form-body-subsection-select"
                              />
                              {errors.attendees.required ? (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              ) : null}
                            </div>
                          ) : notification.hostName === "admin" ? (
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Admin List<span className="text-danger">*</span>
                              </label>
                              <Select
                                isMulti
                                placeholder="Select Admin"
                                onChange={handleSelectChange}
                                options={adminOptions}
                                value={
                                  notification?.attendees
                                    ? notification?.attendees.map((inTake) => ({
                                        value: inTake,
                                        label: inTake,
                                      }))
                                    : null
                                }
                                name="attendees "
                                styles={customStyles}
                                className="submain-one-form-body-subsection-select"
                              />
                              {errors.attendees.required ? (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              ) : null}
                            </div>
                          ) : null}

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Subject<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className={`form-control rounded-1 text-capitalize  ${
                                errors.subject.required ? "is-invalid" : ""
                              }`}
                              onChange={handleInputs}
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              value={notification?.subject}
                              placeholder="Enter  Subject"
                              name="subject"
                              onKeyDown={(e) => {
                                // Prevent non-letter characters
                                if (/[^a-zA-Z\s]/.test(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                            />
                            {errors.subject.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Date<span className="text-danger">*</span>
                            </label>
                            <input
                              type="date"
                              className={`form-control rounded-1 text-uppercase ${
                                errors.date.required ? "is-invalid" : ""
                              }`}
                              value={
                                notification?.date
                                  ? notification?.date.slice(0, 10)
                                  : ""
                              }
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
                              className={`form-control rounded-1 text-uppercase ${
                                errors.time.required ? "is-invalid" : ""
                              }`}
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              value={notification?.time}
                              placeholder="Enter  Time"
                              name="time"
                              onChange={handleInputs}
                            />
                            {errors.time.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>

                          <div className="row gy-2 ">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Content<span className="text-danger">*</span>
                              </label>
                              <CKEditor
                                editor={ClassicEditor}
                                data={notification.content}
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
                                name="content"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                  zIndex: "0",
                                }}
                              />
                              {/* <RichTextEditor
                                placeholder="Start writing your content here..."
                                name="content"
                                onChange={handleRichTextChange}
                                value={notification.content}
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                  minHeight: "200px",
                                  overflowY: "auto",
                                }}
                              /> */}
                              {errors.content.required && (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="d-flex justify-content-end  ">
                            <Link
                              to="/agent_list_meetings"
                              style={{
                                fontSize: "12px",
                              }}
                              className="btn btn-dark rounded-1 border-0 fw-semibold text-uppercase text-white px-4 py-2  m-1"
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
                              className="btn btn-save rounded-1 border-0 fw-semibold text-uppercase text-white px-4 py-2 m-1"
                            >
                              Update
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
      </div>
    </>
  );
};
export default AddMeetings;
