import React, { useState } from "react";
import {
  isValidEmail,
  isValidPassword,
  isValidPhone,
} from "../../Utils/Validation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getSuperAdminId, saveToken } from "../../Utils/storage";
import { isAuthenticated } from "../../Utils/Auth";
import { createAdminBySuperAdmin } from "../../api/admin";
import Sidebar from "../../compoents/AdminSidebar";
import { Link } from "react-router-dom";

function AddAgent() {
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
  // const [type, setType] = useState('admin');

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


  //   event.preventDefault();
  //   const newError = handleValidation(inputs);
  //   setErrors(newError);
  //   setSubmitted(true);
  //   if (handleErrors(newError)) {
  //     if (inputs) {
  //       createAdminBySuperAdmin(inputs)
  //         .then((res) => {
  //           let token = res?.data?.result?.token;
  //           let loginType = res?.data?.result?.loginType;
  //           let adminId = res?.data?.result?.adminDetails?._id;
  //           let data = {
  //             token: token,
  //             loginType: loginType,
  //             adminId: adminId,
  //           };
  //           saveToken(data);
  //           if (isAuthenticated()) {
  //             navigate("/list_admin");
  //           }
  //           toast.success(res?.data?.message);
  //         })
  //         .catch((err) => {
  //           toast.error(err?.response?.data?.message);
  //         });
  //     }
  //   }
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
    if (handleErrors(newError)) {

      createAdminBySuperAdmin({ ...inputs, role: "admin" ,
        superAdminId: getSuperAdminId()
      })
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
        <div className="content-header ">
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
                      Add Admin Details
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
      </div>
    </>
  );
}
export default AddAgent;
