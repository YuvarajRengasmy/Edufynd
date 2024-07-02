import React, { useEffect, useState } from 'react';
import { isValidEmail, isValidPassword, isValidPhone } from '../../Utils/Validation';
import { toast } from 'react-toastify';
import { updateAdmin,getSingleAdmin } from '../../api/admin';
import { saveToken } from '../../Utils/storage';
import { isAuthenticated } from '../../Utils/Auth';
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { Link, useNavigate, useLocation } from "react-router-dom";


function EditAdmin() {


    const location = useLocation();
    const id = new URLSearchParams(location.search).get("id");
  
    const initialState = {
        name: "",
        mobileNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
        role:""
    }
    const initialStateErrors = {
        name: { required: false },
        email: { required: false, valid: false },
        mobileNumber: { required: false, valid: false },
        password: { required: false, valid: false },
        confirmPassword: { required: false, valid: false },
        role:{required:false}
    }
    const [inputs, setInputs] = useState(initialState)
    const [errors, setErrors] = useState(initialStateErrors)
    const [submitted, setSubmitted] = useState(false);
    const [admin, setAdmin] = useState('');


    const navigate = useNavigate()
    const handleValidation = (data) => {
        let error = initialStateErrors;
        if (data.name === "") {
            error.name.required = true;
        }

        if (data.email === "") {
            error.email.required = true;
        }
        if (data.password === "") {
            error.password.required = true;
        }
        if (data.confirmPassword === "") {
            error.confirmPassword.required = true;
        }
        if (data.mobileNumber === "") {
            error.mobileNumber.required = true;
        }
        if(data.role===""){
            error.role.required=true
        }
        if (!isValidPassword(data.password)) {
            error.password.valid = true;
        }
        if (!isValidPassword(data.confirmPassword)) {
            error.confirmPassword.valid = true;
        }
        if (!isValidEmail(data.email)) {
            error.email.valid = true;
        }
        if (!isValidPhone(data.mobileNumber)) {
            error.mobileNumber.valid = true;
        }
        return error
    }


    useEffect(() => {
        
        getAllClientDetails();
      }, []);
    
      const  getAllClientDetails = () => { 
        getSingleAdmin(id)
          .then((res) => {
            console.log(res);
            setAdmin(res?.data?.result);
          
          })
          .catch((err) => {
            console.log(err);
          });
      };

    const handleInputs = (event) => {
        setAdmin({ ...admin, [event?.target?.name]: event?.target?.value })
        if (submitted) {
            const newError = handleValidation({ ...admin, [event.target.name]: event.target.value })
            setErrors(newError)
        }
    }


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
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const newError = handleValidation(admin);
        setErrors(newError);
        setSubmitted(true);
        const allInputsValid = Object.values(newError);
        const valid = allInputsValid.every((x) => x.required === false);
        if (valid) {
            updateAdmin(admin)
            .then((res) => {
              toast.success(res?.data?.message);
              navigate("/AdminList");
            })
            .catch((err) => {
              toast.error(err?.response?.data?.message);
            });
        }
      };
    return (
        <div style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
            <div class="container-fluid">
                <nav class="navbar navbar-vertical navbar-expand-lg">
                    <Sidebar />
                   
                </nav>
                <nav className="navbar navbar-top navbar-expand">
                <Header />
                </nav>
           
            <div className="content-wrapper "style={{backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} >
                <div className="content-header">
                    <div className="content card card-body border-0 container-fluid">
                        <form onSubmit={handleSubmit} >
                            <div className="content-page-header">
                                <h5 className="text-bold" style={{ color: "#231F20" }}>
                                   Edit Admin
                                </h5>
                            <hr className="p-0" />
                            </div>
                            <div className="row mb-3">
                                <div className="col ">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            {" "}
                                            Admin Name<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            onChange={handleInputs}
                                            value={admin?.name}
                                           
                                            className="form-control "
                                            placeholder="Enter Admin name"
                                           

                                        />
                                        {errors.name.required ? (
                                            <div className="text-danger form-text">
                                                This field is required.
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="col ">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            Role<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            placeholder="Contact Number"
                                            name="role"
                                            value={admin?.role}
                                            onChange={handleInputs}
                                        />
                                   {errors.role.required ? <span className="text-danger form-text profile_error">
                                        This field is required.
                                    </span> : null}
                                    </div>
                                </div>
                                <div className="col ">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            Email<span className="text-danger">*</span>
                                        </label>
                                        <div className="d-flex gap-4">
                                            <input
                                                type="text"
                                                className="form-control "
                                                placeholder="Enter Email"
                                                name="email"
                                                value={admin?.email}
                                                onChange={handleInputs}
                                            />
                                            {errors.email.required ? (
                                                <div className="text-danger form-text">
                                                    This field is required.
                                                </div>
                                            ) : errors.email.valid ? (
                                                <div className="text-danger form-text">
                                                    Enter valid Email Id.
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                </div>
                                <div className='row mb-3'>
                                <div className="col ">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            Contact number<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control "
                                            placeholder="Contact Number"
                                            name="mobileNumber"
                                            value={admin?.mobileNumber}
                                            onChange={handleInputs}
                                        />
                                        {errors.mobileNumber.required ?

                                            <span className="text-danger form-text profile_error">

                                                This field is required.

                                            </span> : errors.mobileNumber.valid ?
                                                <span className="text-danger form-text profile_error">
                                                    Enter valid mobile number.
                                                </span> : null

                                        }
                                    </div>
                                </div>
                                <div className="col ">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            {" "}
                                            Password<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            placeholder="Enter Password"
                                            name="password"
                                            value={admin?.password}
                                            onChange={handleInputs}
                                        />
                                        {errors.password.required ? (
                                            <div className="text-danger form-text">
                                                This field is required.
                                            </div>
                                        ) : errors.password.valid ? (
                                            <div className="text-danger form-text">
                                                A minimum 8 characters password contains a <br />
                                                combination of {''}
                                                <strong>uppercase, lowercase, {''}</strong>
                                                <strong>special <br /> character{''}</strong> and <strong>number</strong>.
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="col ">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            Confirm Password <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            placeholder="Enter Confirm Password"
                                            name="confirmPassword"
                                            value={admin?.confirmPassword}
                                            onChange={handleInputs}
                                        />
                                        {errors.confirmPassword.required ? (
                                            <div className="text-danger form-text">
                                                This field is required.
                                            </div>
                                        ) : errors.confirmPassword.valid ? (
                                            <div className="text-danger form-text">
                                                A minimum 8 characters password contains a <br />
                                                combination of {''}
                                                <strong>uppercase, lowercase, {''}</strong>
                                                <strong>special <br /> character{''}</strong> and <strong>number</strong>.
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                               </div>
                                            <div className='row mb-3'>

                                <div className="add-customer-btns mb-40 d-flex justify-content-end w-30 ml-auto">
                                    <Link style={{ backgroundColor: "#231F20" }} to="/AdminList" className="btn btn-cancel d-inline border-0 text-white w-25  m-2">
                                        Cancel
                                    </Link>
                                    <button style={{ backgroundColor: "#FE5722" }} type="submit" className="btn btn-save d-inline border-0 text-white w-25 m-2">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}
export default EditAdmin;
