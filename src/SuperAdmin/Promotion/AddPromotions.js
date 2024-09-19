import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import { savePromotion } from "../../api/promotions";
import { getallStaff } from "../../api/staff";
import { getallAdmin } from "../../api/admin";
import { getallAgent } from "../../api/agent";
import { getallStudent } from "../../api/student";
import Sidebar from "../../compoents/sidebar";
import { Link } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export const AddPromotions = () => {
  const initialState = {
    hostName: "",
    typeOfUser: "",
    userName: "",
    subject: "",
    content: "",
    uploadImage: "",
    createdBy: "",
    fileUpload: [{ fileName: "", fileImage: "" }],
  };
  const initialStateErrors = {
    typeOfUser: { required: false },
    hostName: { required: false },
    userName: { required: false },
    subject: { required: false },
    content: { required: false },
    uploadImage: { required: false },
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
    if (data.hostName === "") {
      error.hostName.required = true;
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
    return error;
  };
  const convertToBase65 = (e, name, index, listName) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const updatedList = [...notification[listName]];
      updatedList[index][name] = reader.result;
      setnotification({ ...notification, [listName]: updatedList });
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
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
  const handleListInputChange = (e, index, listName) => {
    const { name, value, files } = e.target;
    const updatedList = [...notification[listName]];
    if (files && files[0]) {
      convertToBase65(e, name, index, listName);
    } else {
      updatedList[index][name] = value;
      setnotification({ ...notification, [listName]: updatedList });
    }
  };
  const handleInputs = (event) => {
    const { name, value, files } = event.target;
    if (files && files[0]) {
      convertToBase64(event, name);
    } else {
      setnotification({ ...notification, [event?.target?.name]: event?.target?.value });
    }
    if (submitted) {
      const newError = handleValidation({
        ...notification,
        [event.target.name]: event.target.value,
      });
      setErrors(newError);
    }
  };
  const addEntry = (listName) => {
    const newEntry = listName === "fileUpload"
      ? { fileName: "", fileImage: "" }
      : null;
    setnotification({ ...notification, [listName]: [...notification[listName], newEntry] });
  };
  const removeEntry = (index, listName) => {
    const updatedList = notification[listName].filter((_, i) => i !== index);
    setnotification({ ...notification, [listName]: updatedList });
  };
  const handleSelectChange = (selectedOptions, action) => {
    const { name } = action;
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setnotification((prevNotification) => ({ ...prevNotification, [name]: values }));
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
      savePromotion(updateNotifications)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/list_promotions");
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
                          Add Promotion Details
                        </h5>
                      </div>
                      <div className="card-body mt-5">
                        <div className="row g-3">
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <img
                              className="img-fluid  img-thumbnail rounded-circle mx-auto d-block "
                              src={
                                notification?.uploadImage
                                  ? notification?.uploadImage
                                  : "https://via.placeholder.com/128"
                              }
                              alt="student-image"
                              style={{ width: "8rem", height: "8rem" }}
                            />
                            <label
                              htmlFor="fileInputImage"
                              className="position-absolute fs-6  "
                              style={{
                                cursor: "pointer",
                                bottom: "5%",
                                left: "52.5%",
                                transform: "translate(50%, 50%)",
                                color: "#0f2239",
                              }}
                            >
                              <i className="fas fa-camera"></i>
                            </label>
                            <input
                              name="uploadImage"
                              id="fileInputImage"
                              type="file"
                              accept="image/*"
                              className="form-control border-0 text-dark bg-transparent"
                              style={{
                                display: "none",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              onChange={handleInputs}
                            />
                            {errors.uploadImage.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Host Name<span className="text-danger">*</span>
                            </label>
                            <Select
                              placeholder="Select Staff"
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
                              Type of Users{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <select
                              class={`form-select form-select-lg rounded-1 text-capitalize ${errors.typeOfUser.required ? 'is-invalid' : ''}`}
                              name="typeOfUser"
                              onChange={handleInputs}
                              aria-label="Default select example"
                              value={notification.typeOfUser}
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
                                value={
                                  notification?.userName
                                    ? notification?.userName.map((inTake) => ({
                                      value: inTake,
                                      label: inTake,
                                    }))
                                    : null
                                }
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
                                placeholder="Select Student"
                                onChange={handleSelectChange}
                                value={
                                  notification?.userName
                                    ? notification?.userName.map((inTake) => ({
                                      value: inTake,
                                      label: inTake,
                                    }))
                                    : null
                                }
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
                                value={
                                  notification?.userName
                                    ? notification?.userName.map((inTake) => ({
                                      value: inTake,
                                      label: inTake,
                                    }))
                                    : null
                                }
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
                                value={notification.userName}
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
                              Subject<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className={`form-control rounded-1 text-capitalize ${errors.subject.required ? 'is-invalid' : ''}`}
                              onChange={handleInputs}
                              value={notification.subject}
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              placeholder="Example Meeetings"
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
                          <div className="row gy-2 ">
                            <div className="col-xl-12 col-lg-6 col-md-6 col-sm-12">
                              <CKEditor
                                editor={ClassicEditor}
                                data={notification.content}  // Use 'data' instead of 'value'
                                config={{
                                  placeholder: 'Start writing your content here...',
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
                          </div>
                          {notification.fileUpload.map((fileUpload, index) => (
                            <div key={index} className="mb-3">
                              <div className="row gy-2 ">
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                  <label style={{ color: "#231F20" }}>File Name</label>
                                  <input
                                    type="text"
                                    name="fileName"
                                    value={fileUpload.fileName}
                                    onChange={(e) => handleListInputChange(e, index, "fileUpload")}
                                    className="form-control rounded-1 text-capitalize"
                                    style={{ fontSize: "12px" }}
                                    placeholder="Example Demo File"
                                    onKeyDown={(e) => {
                                      // Prevent non-letter characters
                                      if (/[^a-zA-Z\s]/.test(e.key)) {
                                        e.preventDefault();
                                      }
                                    }}
                                  />
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                  <label style={{ color: "#231F20" }}>File Document</label>
                                  <input
                                    type="file"
                                    name="fileImage"
                                    onChange={(e) => handleListInputChange(e, index, "fileUpload")}
                                    className="form-control rounded-1 "
                                    style={{ fontSize: "12px" }}
                                    placeholder="Upload File"
                                  />
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeEntry(index, "fileUpload")}
                                className="btn mt-2"
                              >
                                <i className="far fa-trash-alt text-danger me-1"></i>
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addEntry("fileUpload")}
                            className="btn btn-dark px-4 py-2 text-uppercase fw-semibold col-sm-1 rounded-1 border-0"
                            
                          >
                            <i className="fas fa-plus-circle"></i>&nbsp;&nbsp;Add
                          </button>
                          <div className="d-flex justify-content-end  ">
                            <Link
                              to="/list_promotions"
                              style={{
                                
                                fontSize: "12px",
                              }}
                              type="reset"
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
    </>
  )
}
export default AddPromotions