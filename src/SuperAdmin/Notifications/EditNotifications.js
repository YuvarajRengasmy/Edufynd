import React, { useEffect, useState } from "react";
import {
  isValidEmail,
  isValidPassword,
  isValidPhone,
} from "../../Utils/Validation";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updatedNotifications, getSingleNotifications } from "../../api/Notification/Notification";
import { getallStaff } from "../../api/staff";
import { getallAdmin } from "../../api/admin";
import { getallAgent } from "../../api/agent";
import { getallStudent } from "../../api/student";
import Select from "react-select";
import { Link,useLocation } from "react-router-dom";
import Sidebar from "../../compoents/sidebar";
import "react-quill/dist/quill.snow.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { RichTextEditor } from "@mantine/rte";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export const EditNotifications = () => {

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const initialState = {
    hostName:"",
    typeOfUser: "",
    userName: "",
    subject: "",
    content: "",
    uploadFile: [{ fileName: "", uploadImage: "" }],
  };

  const initialStateErrors = {
    hostName: {required: false,},
    typeOfUser: { required: false },
    userName: { required: false },
    subject: { required: false },
     content: { required: false },
     uploadFile: {required: false,},

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
    getNotificationList();
    getAdminList();
    getAgentList();
    getStudentList();
  }, []);


  const getNotificationList = () => {
    getSingleNotifications(id)
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
        setAdmin(res?.data?.result );
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
    if(data.hostName===""){
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

  
  const convertToBase64 = (e, name, index, listName) => {
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
 
  const handleListInputChange = (e, index, listName) => {
    const { name, value, files } = e.target;
    const updatedList = [...notification[listName]];
    if (files && files[0]) {
      convertToBase64(e, name, index, listName);
    } else {
      updatedList[index][name] = value;
      setnotification({ ...notification, [listName]: updatedList });
    }
  };
  const addEntry = (listName) => {
    const newEntry =
      listName === "uploadFile" ? { fileName: "", uploadImage: "" } : null;
    setnotification({ ...notification, [listName]: [...notification[listName], newEntry] });
  };
  const removeEntry = (index, listName) => {
    const updatedList = notification[listName].filter((_, i) => i !== index);
    setnotification({ ...notification, [listName]: updatedList });
  };
  const handleInputs = (event) => {
    const { name, value, files } = event.target;
    if (files && files[0]) {
      convertToBase64(event, name);
    } else{
      setnotification({ ...notification, [event?.target?.name]: event?.target?.value });
    }
    
    if (submitted) {
      const newError = handleValidation({...notification,
        [event.target.name]: event.target.value,});
      setErrors(newError);
    }
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
      updatedNotifications(updateNotifications)
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
          
          </div>

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
                          Edit Notifications Details
                        </h5>
                      </div>
                      <div className="card-body mt-5">
                        <div className="row g-3">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Host Name<span className="text-danger">*</span>
                          </label>
                          <Select
                            placeholder={notification.hostName}
                            onChange={(selectedOption) =>
                              setnotification({
                                ...notification,
                                hostName: selectedOption.value,
                              })
                            }
                            value={notification.hostName}
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
                          ) :notification.typeOfUser === "agent" ? (
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

                          <div className="row gy-2 ">
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Subject<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className={`form-control rounded-1 text-capitalize ${errors.subject.required ? 'is-invalid' :''}`}
                                onChange={handleInputs}
                                value={notification.subject}
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Example Meetings"
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

                            {notification.uploadFile.map((uploadImage, index) => (
                              <div key={index} className="mb-3">
                                <div className="d-flex gy-2 ">
                                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                    <label style={{ color: "#231F20" }}>File Name</label>
                                    <input
                                      type="text"
                                      name="fileName"
                                      value={uploadImage.fileName}
                                      onChange={(e) => handleListInputChange(e, index, "uploadFile")}
                                      className="form-control rounded-1"
                                      style={{ fontSize: "12px" }}
                                      placeholder="File Upload Title"
                                    />
                                  </div>
                                  
                                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                  <label
                        htmlFor="fileInputImage"
                        className="file-upload"
                        style={{ color: "#231F20", cursor: "pointer" }}
                      >
                                    <img
                                      className="img-fluid img-thumbnail mx-auto d-block"
                                      src={uploadImage.uploadImage ? uploadImage.uploadImage : "https://via.placeholder.com/128"}
                                      alt="uploaded-file"
                                      style={{ width: "14rem", height: "8rem" }}
                                    />
                                    <label
                          htmlFor="fileInputImage"
                          className="position-absolute fs-6 rounded-circle "
                          style={{
                            cursor: "pointer",
                            bottom: "15%",
                            left: "53.5%",
                            transform: "translate(-25%, -25%)",
                            color: "#0f2239",
                          }}
                        >
                          <i className="fas fa-camera"></i>|| <i className="fas fa-file"></i>
                        </label>
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
                        onChange={(e) => handleListInputChange(e, index, "uploadFile")}
                      />
                                  
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeEntry(index, "uploadFile")}
                                  className="btn mt-2"
                                >
                                  <i className="far fa-trash-alt text-danger me-1"></i>
                                </button>
                              </div>
                            ))}
                          
                            <button
                              type="button"
                              onClick={() => addEntry("uploadFile")}
                              className="btn text-white mt-2 col-sm-1 col-md-2 col-lg-2 col-xl-2"
                              style={{ backgroundColor: "#7267ef" }}
                            >
                              <i className="fas fa-plus-circle"></i>
                              &nbsp;&nbsp;Add
                            </button>
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
                                
                                }}
                                controls={[
                                  // Basic Text Formatting
                                  ['bold', 'italic', 'underline', 'strike'],
                          
                                  // Headings
                                  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                          
                                  // Lists and Indentation
                                  ['unorderedList', 'orderedList'],
                                  ['indent', 'outdent'],
                          
                                  // Media & Embeds
                                  ['link', 'image', 'video'],
                                  ['blockquote', 'codeBlock'],
                          
                                  // Text Alignment
                                  ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify'],
                          
                                  // Subscript and Superscript
                                  ['subscript', 'superscript'],
                          
                                  // Colors
                                  ['color', 'backgroundColor'],
                          
                                  // Advanced Embeds (These might need custom implementation)
                                  ['insertTable'],  // Note: You might need to manually handle this
                                  ['customHTML'],   // Note: This requires custom implementation
                          
                                  // Utility Functions
                                  ['clean'],
                                  ['code', 'redo', 'undo'],
                          
                                  // Font Options
                                  ['fontFamily', 'fontSize'],
                                ]}
                              /> */}
                              {errors.content.required && (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              )}
                            </div>
                          </div>

                       

                         

                          <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                            <Link
                            to='/list_notifications'
                              style={{
                                backgroundColor: "#231F20",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                            
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
    </>
  );
};
export default EditNotifications;
