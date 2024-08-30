import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { saveEvent } from "../../api/Notification/event";
import { getallStaff } from "../../api/staff";
import { getallAdmin } from "../../api/admin";
import { getallAgent } from "../../api/agent";
import { getallStudent } from "../../api/student";
import { getallUniversity } from "../../api/university";
import Sidebar from "../../compoents/sidebar";
import Select from "react-select";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const AddEvents = () => {
  const initialState = {
    typeOfUser: "",
    userName: "",
    hostName: "",
    content: "",
    eventTopic: "",
    universityName: "",
    date: "",
    time: "",
    venue: "",
    fileUpload: [{ id: 1, file: null }],
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
    getallStaff().then((res) => setStaff(res?.data?.result || []))
                .catch((err) => console.log(err));
  };

  const getAdminList = () => {
    getallAdmin().then((res) => setAdmin(res?.data?.result))
                 .catch((err) => console.log(err));
  };

  const getAllUniversityList = () => {
    getallUniversity().then((res) => setUniversity(res?.data?.result))
                      .catch((err) => console.log(err));
  };

  const getAgentList = () => {
    getallAgent().then((res) => setAgent(res?.data?.result || []))
                 .catch((err) => console.log(err));
  };

  const getStudentList = () => {
    getallStudent().then((res) => setStudent(res?.data?.result || []))
                   .catch((err) => console.log(err));
  };

  const addLabel = () => {
    setnotification(prev => ({
      ...prev,
      fileUpload: [...prev.fileUpload, { id: prev.fileUpload.length + 1, file: null }]
    }));
  };

  const handleValidation = (data) => {
    let error = initialStateErrors;

    if (!data.typeOfUser) error.typeOfUser.required = true;
    if (!data.userName) error.userName.required = true;
    if (!data.hostName) error.hostName.required = true;
    if (!data.eventTopic) error.eventTopic.required = true;
    if (!data.universityName) error.universityName.required = true;
    if (!data.date) error.date.required = true;
    if (!data.time) error.time.required = true;
    if (!data.venue) error.venue.required = true;

    return error;
  };

  const handleInputs = (event, index = null) => {
    const { name, value, files } = event.target;

    if (files && files.length > 0) {
      // Handle file input
      if (index !== null) {
        // Update file upload array
        const newFileUploads = [...notification.fileUpload];
        newFileUploads[index].file = files[0];
        setnotification({ ...notification, fileUpload: newFileUploads });
      } else {
        // Convert file to base64 for other file inputs
        convertToBase64(event, name);
      }
    } else {
      // Handle text input
      setnotification(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (submitted) {
      const newError = handleValidation({ ...notification, [name]: value });
      setErrors(newError);
    }
  };

  const convertToBase64 = (e, name) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setnotification(prev => ({
        ...prev,
        [name]: reader.result
      }));
    };
    reader.onerror = (error) => console.log("Error: ", error);
  };

  const handleSelectChange = (selectedOptions, action) => {
    const { name } = action;
    const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setnotification(prev => ({
      ...prev,
      [name]: values
    }));
  };

  const handleErrors = (obj) => {
    return Object.values(obj).some(prop => prop.required === true);
  };

  const handleRichTextChange = (event, editor) => {
    const data = editor.getData();
    setnotification(prev => ({
      ...prev,
      content: data
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(notification);
    setErrors(newError);
    setSubmitted(true);

    if (!handleErrors(newError)) {
      const formData = new FormData();
      for (const key in notification) {
        if (notification.hasOwnProperty(key)) {
          if (key === 'fileUpload') {
            notification.fileUpload.forEach((file, index) => {
              if (file.file) {
                formData.append(`fileUpload[${index}]`, file.file);
              }
            });
          } else {
            formData.append(key, notification[key]);
          }
        }
      }
      
      saveEvent(formData)
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

  const adminOptions = admin.map(data => ({ value: data.name, label: data.name }));
  const staffOptions = staff.map(data => ({ value: data.empName, label: data.empName }));
  const studentOptions = student.map(data => ({ value: data.name, label: data.name }));
  const agentOptions = agent.map(data => ({ value: data.agentName, label: data.agentName }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "1.4783px solid rgba(11, 70, 84, 0.25)",
      borderRadius: "4.91319px",
      fontSize: "11px"
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "#3B0051" : "#F2CCFF",
      ":hover": { color: "black" }
    })
  };

  return (
    <>
      <Sidebar />
      <div className="content-wrapper" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}>
        <div className="content-header">
          <div className="container-fluid">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-xl-12">
                  <div className="card border-0 rounded-0 shadow-sm p-3 position-relative">
                    <div className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0" style={{ background: "#fe5722", color: "#fff" }}>
                      <h5 className="text-center text-capitalize p-1">Add Events Details</h5>
                    </div>
                    <div className="card-body mt-5">
                      <div className="row g-3">
                        {/* Render form fields */}
                        {/* Example input field */}
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>Event Topic<span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className={`form-control ${errors.eventTopic.required ? "border-danger" : ""}`}
                            name="eventTopic"
                            value={notification.eventTopic}
                            onChange={handleInputs}
                          />
                          {errors.eventTopic.required && <div className="text-danger">Event Topic is required</div>}
                        </div>
                        
                        {/* Add other input fields similarly */}
                        
                        <div className="col-xl-12 mt-3">
                          <button type="button" className="btn btn-success" onClick={addLabel}>Add More Files</button>
                        </div>
                        
                        {notification.fileUpload.map((fileUpload, index) => (
                          <div key={fileUpload.id} className="col-xl-4 col-lg-6 col-md-6 col-sm-12 mt-2">
                            <label style={{ color: "#231F20" }}>File Upload</label>
                            <input
                              type="file"
                              className={`form-control ${errors.fileUpload.required ? "border-danger" : ""}`}
                              name={`fileUpload_${index}`}
                              onChange={(e) => handleInputs(e, index)}
                            />
                            {errors.fileUpload.required && <div className="text-danger">File Upload is required</div>}
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 text-center">
                        <button type="submit" className="btn btn-primary">Submit</button>
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