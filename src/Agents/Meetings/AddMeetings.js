import { useEffect, useState } from "react";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { RichTextEditor } from "@mantine/rte";
import { toast } from "react-toastify";
import Sidebar from "../../compoents/AgentSidebar";
import { saveMeeting } from "../../api/Notification/meeting";
import { getallStaff } from "../../api/staff";
import { getallAdmin } from "../../api/admin";
import { getallAgent } from "../../api/agent";
import { getallStudent } from "../../api/student";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export const AddMeetings = () => {
  const initialState = {
    hostName: "",
    typeOfUser: "",
    attendees: [],
    subject: "",
    content: "",
    date: "",
    time: "",
  };
  const initialStateErrors = {
    hostName: { required: false },
    typeOfUser: { required: false },
    attendees: { required: false },
    subject: { required: false },
    content: { required: false },
    date: { required: false },
    time: { required: false },
  };
  const [notification, setNotification] = useState(initialState);
  const [staffs, setStaffs] = useState([]);
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
        setStaffs(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAdminList = () => {
    getallAdmin()
      .then((res) => {
        setAdmin(res?.data?.result || []);
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
    if (data.typeOfUser === "") {
      error.typeOfUser.required = true;
    }
    if (data.attendees.length === 0) {
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
  const handleInputs = (event) => {
    const { name, value } = event.target;
    setNotification({ ...notification, [name]: value });
    if (submitted) {
      const newError = handleValidation({
        ...notification,
        [name]: value,
      });
      setErrors(newError);
    }
  };
  const handleSelectChange = (selectedOption, action) => {
    const { name } = action;
    const value = selectedOption
      ? selectedOption.map((option) => option.value)
      : [];
    setNotification((prevNotification) => ({
      ...prevNotification,
      [name]: value,
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
  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(notification);
    setErrors(newError);
    setSubmitted(true);
    const updateNotifications = {
      ...notification,
    };
    if (handleErrors(newError)) {
      saveMeeting(updateNotifications)
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
  const adminOptions = admin.map((data) => ({
    value: data.name,
    label: data.name,
  }));
  const staffOptions = staffs.map((data) => ({
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
      border: "1px solid rgba(11, 70, 84, 0.25)",
      borderRadius: "4px",
      fontSize: "12px",
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
    <div>
      <Sidebar />
      <div
        className="content-wrapper"
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
      >
        <div className="content-header">
          <div className="container-fluid">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-xl-12">
                  <div className="card border-0 rounded-0 shadow-sm p-3 position-relative">
                    <div
                      className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0"
                      style={{ background: "#fe5722", color: "#fff" }}
                    >
                      <h5 className="text-center text-capitalize p-1">
                        Add Meeting Details
                      </h5>
                    </div>
                    <div className="card-body mt-5">
                      <div className="row g-3">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Host Name<span className="text-danger">*</span>
                          </label>
                          <Select
                            placeholder="Select Staff"
                            onChange={(selectedOption) =>
                              setNotification({
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
                            Type of user <span className="text-danger">*</span>
                          </label>
                          <select
                            className={`form-select form-select-lg rounded-1 text-capitalize ${
                              errors.typeOfUser.required ? "is-invalid" : ""
                            }`}
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
                        {notification.typeOfUser === "staff" && (
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Attendees<span className="text-danger">*</span>
                            </label>
                            <Select
                              options={staffOptions}
                              onChange={handleSelectChange}
                              name="attendees"
                              isMulti
                              placeholder="Select Staff"
                              styles={customStyles}
                              className="submain-one-form-body-subsection-select"
                            />
                            {errors.attendees.required && (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            )}
                          </div>
                        )}
                        {notification.typeOfUser === "student" && (
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Attendees<span className="text-danger">*</span>
                            </label>
                            <Select
                              options={studentOptions}
                              onChange={handleSelectChange}
                              name="attendees"
                              isMulti
                              placeholder="Select Student"
                              styles={customStyles}
                              className="submain-one-form-body-subsection-select"
                            />
                            {errors.attendees.required && (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            )}
                          </div>
                        )}
                        {notification.typeOfUser === "agent" && (
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Attendees<span className="text-danger">*</span>
                            </label>
                            <Select
                              options={agentOptions}
                              onChange={handleSelectChange}
                              name="attendees"
                              isMulti
                              placeholder="Select Agent"
                              styles={customStyles}
                              className="submain-one-form-body-subsection-select"
                            />
                            {errors.attendees.required && (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            )}
                          </div>
                        )}
                        {notification.typeOfUser === "admin" && (
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Attendees<span className="text-danger">*</span>
                            </label>
                            <Select
                              options={adminOptions}
                              onChange={handleSelectChange}
                              name="attendees"
                              isMulti
                              placeholder="Select Admin"
                              styles={customStyles}
                              className="submain-one-form-body-subsection-select"
                            />
                            {errors.attendees.required && (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            )}
                          </div>
                        )}
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Subject<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control rounded-1 text-capitalize  ${
                              errors.subject.required ? "is-invalid" : ""
                            }`}
                            name="subject"
                            value={notification.subject}
                            onChange={handleInputs}
                            placeholder="Example Meetings"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
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
                            name="date"
                            value={notification.date}
                            onChange={handleInputs}
                            placeholder="Enter meeting date"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                          />
                          {errors.date.required && (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          )}
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Time<span className="text-danger">*</span>
                          </label>
                          <input
                            type="time"
                            className={`form-control rounded-1 text-uppercase  ${
                              errors.time.required ? "is-invalid" : ""
                            }`}
                            name="time"
                            value={notification.time}
                            onChange={handleInputs}
                            placeholder="Enter meeting time"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                          />
                          {errors.time.required && (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          )}
                        </div>
                        <div className="col-12">
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
                            value={notification.content}
                            onChange={handleRichTextChange}
                            placeholder="Enter meeting content"
                          /> */}
                          {errors.content.required && (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          )}
                        </div>
                        <div className="d-flex justify-content-end">
                          <Link
                            to="/agent_list_meetings"
                            className="btn btn-dark rounded-1 border-0 fw-semibold text-uppercase text-white px-4 py-2  m-1"
                            style={{ fontSize: "12px" }}
                          >
                            Cancel
                          </Link>
                          <button
                            type="submit"
                            className="btn btn-save rounded-1 border-0 fw-semibold text-uppercase text-white px-4 py-2 m-1"
                            style={{
                              background: "#fe5722",
                              color: "#fff",
                              border: "none",
                            }}
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
    </div>
  );
};
export default AddMeetings;
