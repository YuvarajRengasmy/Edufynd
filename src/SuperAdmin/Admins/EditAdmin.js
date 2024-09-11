import React, { useEffect, useState } from "react";
import {
  isValidEmail,
  isValidPassword,
  isValidPhone,
} from "../../Utils/Validation";
import { toast } from "react-toastify";
import CheckBox from "./privileges"
import { getSuperAdminId, saveToken } from "../../Utils/storage";
import { isAuthenticated } from "../../Utils/Auth";
import { editAdminBySuperAdmin, getSingleAdmin } from "../../api/admin";
import Sidebar from "../../compoents/sidebar";
import { Link, useNavigate, useLocation } from "react-router-dom";
function EditAgent() {

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const initialState = {
    name: "",
    mobileNumber: "",
    email: "",
    role: "",
  };
  const initialStateErrors = {
    name: { required: false },
    email: { required: false, valid: false },
    mobileNumber: { required: false, valid: false },
    role: { required: false },
  };
  const [inputs, setInputs] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getAllClientDetails();
  }, []);

  const getAllClientDetails = () => {
    getSingleAdmin(id)
      .then((res) => {
        console.log(res);
        setInputs(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const navigate = useNavigate();
  const handleValidation = (data) => {
    let error = initialStateErrors;
    if (data.name === "") {
      error.name.required = true;
    }

    if (data.email === "") {
      error.email.required = true;
    }
   
    if (data.mobileNumber === "") {
      error.mobileNumber.required = true;
    }
    if (data.role === "") {
      error.role.required = true;
    }
   
    if (!isValidEmail(data.email)) {
      error.email.valid = true;
    }
    if (!isValidPhone(data.mobileNumber)) {
      error.mobileNumber.valid = true;
    }
    return error;
  };

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event?.target?.name]: event?.target?.value });
    if (submitted) {
      const newError = handleValidation({
        ...inputs,
        [event.target.name]: event.target.value,
      });
      setErrors(newError);
    }
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


  
  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
    if (handleErrors(newError)) {

      editAdminBySuperAdmin(inputs)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/list_admin");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
    else {
      toast.error("Please Fill Staff Mandatory Fields");
    }
  };

  return (
    <>
      <Sidebar />

      <div
        className="content-wrapper "
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
      >
       
        <div className="content-header">
       <CheckBox/>
                 </div>
          <div className=" container-fluid ">
            <div className="row">
              <div className="col-xl-12">
                <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                  <div
                    className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0"
                    style={{ background: "#fe5722", color: "#fff" }}
                  >
                    <h6 className="text-center text-capitalize p-1">
                      {" "}
                      Edit Admin Details
                    </h6>
                  </div>
                  <div className="card-body mt-5">
                    <form onSubmit={handleSubmit}>
                      <div className="row  ">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
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
                              value={inputs.name}
                              placeholder="Enter Admin name"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                            />
                            {errors.name.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                          <div className="form-group">
                            <label style={{ color: "#231F20" }}>
                              Role<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control "
                              placeholder="Contact Number"
                              name="role"
                              value={inputs.role}
                              onChange={handleInputs}
                            />
                            {errors.role.required ? (
                              <span className="text-danger form-text profile_error">
                                This field is required.
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
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
                                value={inputs.email}
                                onChange={handleInputs}
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
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

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                          <div className="form-group">
                            <label style={{ color: "#231F20" }}>
                              Contact number
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="number"
                              className="form-control "
                              placeholder="Contact Number"
                              name="mobileNumber"
                              value={inputs.mobileNumber}
                              onChange={handleInputs}
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                            />
                            {errors.mobileNumber.required ? (
                              <span className="text-danger form-text profile_error">
                                This field is required.
                              </span>
                            ) : errors.mobileNumber.valid ? (
                              <span className="text-danger form-text profile_error">
                                Enter valid mobile number.
                              </span>
                            ) : null}
                          </div>
                        </div>
                        
                      </div>
                      <div className="row ">
                        <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                          <Link
                            style={{
                              backgroundColor: "#0f2239",
                              fontSize: "12px",
                            }}
                            to="/list_admin"
                            className="btn btn-cancel px-4 py-2 fw-semibold text-uppercase d-inline border-0 text-white  m-1"
                          >
                            Cancel
                          </Link>
                          <button
                            style={{
                              backgroundColor: "#FE5722",
                              fontSize: "12px",
                            }}
                            type="submit"
                            className="btn btn-save px-4 py-2 fw-semibold text-uppercase d-inline border-0 text-white m-1"
                          >
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
        </div>
     
    </>
  );
}
export default EditAgent;
