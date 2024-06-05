import React, { useEffect, useState } from 'react';
import { isValidEmail, isValidPassword, isValidPhone } from '../../Utils/Validation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../../Utils/storage';
import { isAuthenticated } from '../../Utils/Auth';
import { saveAdmin } from '../../api/admin';
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { Link } from "react-router-dom";



function AddAgent() {


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
    const [type, setType] = useState('admin');


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

    const handleInputs = (event) => {
        setInputs({ ...inputs, [event?.target?.name]: event?.target?.value })
        if (submitted) {
            const newError = handleValidation({ ...inputs, [event.target.name]: event.target.value })
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
        const newError = handleValidation(inputs)
        setErrors(newError)
        setSubmitted(true)
        if (handleErrors(newError)) {
            if (inputs) {
                saveAdmin(inputs).then(res => {
                    let token = res?.data?.result?.token;
                    let loginType = res?.data?.result?.loginType
                    let adminId = res?.data?.result?.adminDetails?._id;
                    let data = {
                        token: token, loginType: loginType, adminId: adminId,
                    }
                    saveToken(data);
                    if (isAuthenticated()) {
                        navigate("/AdminList");
                    }
                    toast.success(res?.data?.message);
                })
                    .catch((err) => {
                        toast.error(err?.response?.data?.message);
                    });
            }


        }
    }

    return (
        <div>
            <div class="">
                <div class="">
                    <Sidebar />
                    <Header />
                </div>
            </div>
            <div className="content-wrapper me-5">
                <div className="content-header mt-3">
                    <div className="content container-fluid w-75">
                        <form onSubmit={handleSubmit}>
                            <div className="content-page-header">
                                <h5 className="text-bold" style={{ color: "#231F20" }}>
                                    Add Admin
                                </h5>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 ">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            {" "}
                                            Admin Name<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            onChange={handleInputs}
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
                                <div className="col-lg-6 ">
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
                                <div className="col-lg-6 ">
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
                                <div className="col-lg-6 ">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            ConformPassword <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            placeholder="Enter Confirm Password"
                                            name="confirmPassword"
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
                                <div className="col-lg-6 ">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            Contact number<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control "
                                            placeholder="Contact Number"
                                            name="mobileNumber"
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
                                <div className="col-lg-6 ">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            Role<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            placeholder="Contact Number"
                                            name="role"
                                            onChange={handleInputs}
                                        />
                                   {errors.role.required ? <span className="text-danger form-text profile_error">
                                        This field is required.
                                    </span> : null}
                                    </div>
                                </div>

                                <div className="add-customer-btns mb-40 d-flex justify-content-end w-30 ml-auto">
                                    <Link style={{ backgroundColor: "#231F20" }} to="/AdminList" className="btn btn-cancel border text-white w-50 m-2">
                                        Cancel
                                    </Link>
                                    <button style={{ backgroundColor: "#FE5722" }} type="submit" className="btn btn-save border text-white w-50 m-2">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AddAgent;
