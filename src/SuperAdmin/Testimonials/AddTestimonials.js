import React, { useEffect, useState } from 'react';
import { isValidEmail, isValidPassword, isValidPhone } from '../../Utils/Validation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveTestimonial } from "../../api/Notification/Testimonial";
import { getallStaff } from "../../api/staff";
import { getallAdmin } from "../../api/admin";
import { getallAgent } from "../../api/agent";
import { getallStudent } from "../../api/student";
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { Link } from "react-router-dom";
import Select from "react-select";
import { RichTextEditor } from '@mantine/rte';


export const AddTestimonials = () => {
  const initialState = {
    typeOfUser: "",
    userName: "",
    courseOrUniversityName: "",
    location: "",
    content: "",
    uploadImage: "",
    counselorName:"",
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
      saveTestimonial(updateNotifications)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/ListTestimonials");
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
   
        <div >
          
                <Sidebar />
              
           
        
        <div className="content-wrapper " style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
            <div className="content-header ">
                <div className="content container-fluid ">
                    <form  onSubmit={handleSubmit}>
                        <div className="row">            
              <div className="col-xl-12 ">
              <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
            <div className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
            <h5 className='text-center text-capitalize p-1'> Add Testimonials Details</h5>
            </div>
            <div className="card-body mt-5">
                          <div className="row g-3">
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                            Type Of User{" "}
                              <span className="text-danger">*</span>
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
                          ) :notification.typeOfUser === "agent" ? (
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
                              Course/University<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control "
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Enter  Course/University"
                                name="courseOrUniversityName"
                                onChange={handleInputs}
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
                                className="form-control "
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Enter  Location"
                                name="location"
                                onChange={handleInputs}
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
                                className="form-control "
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Enter  Image upload"
                                name="uploadImage"
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
                              Counsellor Name  <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control "
                                name="counselorName"
                                onChange={handleInputs}
                                value={notification.counselorName}
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Enter   Counsellor Name "
                               
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
                            <RichTextEditor
           onChange={handleRichTextChange}
           value={notification.content}
          placeholder="Start writing your content here..."
          style={{
            fontFamily: "Plus Jakarta Sans",
            fontSize: "12px",
            minHeight: '200px', overflowY: 'auto'
           
          }}
        />
        {errors.content.required ? (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              ) : null}
       
                              
                            </div>             
                          
                           
                            

                            <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                            <Link
                               to="/ListTestimonials"
                                style={{
                                  backgroundColor: "#231F20",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                type='reset'
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
        </div>
    
    </>
  )
}
export default AddTestimonials