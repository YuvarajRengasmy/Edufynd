import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { saveTestimonial } from "../../api/Notification/Testimonial";
import { getallStaff } from "../../api/staff";
import { getallAdmin } from "../../api/admin";
import { getallAgent } from "../../api/agent";
import { getallStudent } from "../../api/student";
import Sidebar from "../../compoents/sidebar";
import { Link } from "react-router-dom";
import Select from "react-select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export const AddTestimonials = () => {
  const initialState = {
    typeOfUser: "",
    userName: "",
    courseOrUniversityName: "",
    location: "",
    content: "",
    uploadImage: "",
    counselorName: "",
  };
  const initialStateErrors = {
    typeOfUser: {
      required: false,
    },
    userName: {
      required: false,
    },
    courseOrUniversityName: {
      required: false,
    },
    location: {
      required: false,
    },
    content: {
      required: false,
    },
    uploadImage: {
      required: false,
    },
    counselorName: {
      required: false,
    },
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
    if (data.userName === "") {
      error.userName.required = true;
    }
    if (data.courseOrUniversityName === "") {
      error.courseOrUniversityName.required = true;
    }
    if (data.location === "") {
      error.location.required = true;
    }
    if (data.content === "") {
      error.content.required = true;
    }
    if (data.uploadImage === "") {
      error.uploadImage.required = true;
    }
    if (data.counselorName === "") {
      error.counselorName.required = true;
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
      saveTestimonial(updateNotifications)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/list_testimonials");
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
  return <>
    <div>
      <Sidebar />
      <div
        className="content-wrapper "
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
      >
        <div className="content-header ">
          <div className="content container-fluid ">
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
                        Add Testimonials Details
                      </h5>
                    </div>
                    <div className="card-body mt-5">
                      <div className="row g-3">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            UserName <span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-select form-select-lg rounded-1"
                            aria-label="Default select example"
                          >
                            <option selected>Select Staff</option>
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
                            className={`form-select form-select-lg rounded-1 ${
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
                        {notification.typeOfUser === "staff" ? (
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Staff List<span className="text-danger">*</span>
                            </label>
                            <Select
                              isMulti
                              placeholder="Select Staff"
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
                              Student List
                              <span className="text-danger">*</span>
                            </label>
                            <Select
                              isMulti
                              placeholder="Select Student"
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
                              Agent List<span className="text-danger">*</span>
                            </label>
                            <Select
                              isMulti
                              placeholder="Select Agent"
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
                              placeholder="Select Admin"
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
                            Course/University
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control rounded-1 text-capitalize ${
                              errors.courseOrUniversityName.required
                                ? "is-invalid"
                                : ""
                            }`}
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example  UG/Coventry"
                            name="courseOrUniversityName"
                            onChange={handleInputs}
                            onKeyDown={(e) => {
                              
                              if (/[^a-zA-Z\s]/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                          {errors.courseOrUniversityName.required ? (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          ) : null}
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Location<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control rounded-1 text-capitalize  ${
                              errors.location.required ? "is-invalid" : ""
                            }`}
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example United Kingdom"
                            name="location"
                            onChange={handleInputs}
                            onKeyDown={(e) => {
                              
                              if (/[^a-zA-Z\s]/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                          {errors.location.required ? (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          ) : null}
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Image upload
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            className={`form-control rounded-1 text-capitalize  ${
                              errors.uploadImage.required ? "is-invalid" : ""
                            }`}
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example demo.png"
                            name="uploadImage"
                            onChange={handleInputs}
                          />
                          {errors.uploadImage.required ? (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          ) : null}
                          <div className="text-end">
                            <button className="btn btn-dark px-4 py-2 text-uppercase fw-semibold rounded-1 border-0">
                              <i
                                class="fa fa-plus-circle"
                                aria-hidden="true"
                              ></i>{" "}
                              &nbsp;&nbsp;Add
                            </button>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Counsellor Name{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control rounded-1 text-capitalize ${
                              errors.counselorName.required
                                ? "is-invalid"
                                : ""
                            }`}
                            name="counselorName"
                            onChange={handleInputs}
                            value={notification.counselorName}
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example John Doe "
                            onKeyDown={(e) => {
                              
                              if (/[^a-zA-Z\s]/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                          {errors.counselorName.required ? (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          ) : null}
                        </div>
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
                          {errors.content.required ? (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          ) : null}
                        </div>
                        <div className=" d-flex justify-content-end ">
                          <Link
                            to="/list_testimonials"
                            style={{
                              backgroundColor: "#231F20",
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            className="btn rounded-1  border-0 fw-semibold text-uppercase text-white px-4 py-2  m-1"
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
                            className="btn  rounded-1 border-0 fw-semibold text-uppercase text-white px-4 py-2 m-1"
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
  </>;
};
export default AddTestimonials;
