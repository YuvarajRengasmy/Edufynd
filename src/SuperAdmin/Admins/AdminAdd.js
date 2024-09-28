import { useState, useEffect } from "react";
import { isValidEmail, isValidPhone } from "../../Utils/Validation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getSuperAdminId } from "../../Utils/storage";
import { createAdminBySuperAdmin } from "../../api/admin";
import Sidebar from "../../compoents/sidebar";
import { Link } from "react-router-dom";
import Select from "react-select";
import { getallCode } from "../../api/settings/dailcode";
function AddAgent() {
  const initialState = {
    name: "",
    mobileNumber: "",
    email: "",
    role: "",
    dial1:""
  };
  const initialStateErrors = {
    name: { required: false },
    email: { required: false, valid: false },
    mobileNumber: { required: false, valid: false },
    role: { required: false },
    dial1: { required: false },
  };
  const [inputs, setInputs] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [dial, setDial] = useState([]);
  const [dail1, setDail1] = useState([]);
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

  
  useEffect(() => {
    getallCodeList();
  }, []);

  const getallCodeList = () => {
    getallCode()
      .then((res) => {
        setDial(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
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
  const handleDail1 = (selectedOption) => {
    setDail1(selectedOption);  // This will store the selected dial code object
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
      createAdminBySuperAdmin({
        ...inputs,
        role: "admin",
        dial1:dail1.value,
        superAdminId: getSuperAdminId(),
      })
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/list_admin");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    } else {
      toast.error("Please Fill Staff Mandatory Fields");
    }
  };

  const dialOptions = dial.map((data) => ({
    value: data.dialCode,
    label: `${data.dialCode} - ${data.name}`,
  }));
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
                <div className="card  border-0 rounded-1 shadow-sm p-3 position-relative">
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
                              className={`form-control text-capitalize rounded-1 ${
                                errors.name.required ? "is-invalid" : ""
                              }`}
                              placeholder="Example John doe"
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
                              className={`form-control text-capitalize rounded-1 ${
                                errors.role.required ? "is-invalid" : ""
                              }`}
                              placeholder="Example Manager"
                              name="role"
                              onChange={handleInputs}
                              onKeyDown={(e) => {
                                // Prevent non-letter characters
                                if (/[^a-zA-Z\s]/.test(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                            />
                            {errors.role.required ? (
                              <div className="text-danger form-text profile_error">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                          <div className="form-group">
                            <label style={{ color: "#231F20" }}>
                              Email<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className={`form-control text-lowercase rounded-1 ${
                                errors.email.required ? "is-invalid" : ""
                              }`}
                              placeholder="Example john123@gmail.com"
                              name="email"
                              onChange={handleInputs}
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              onKeyDown={(e) => {
                                // Prevent default behavior for disallowed keys
                                if (
                                  !/^[a-zA-Z0-9@._-]*$/.test(e.key) &&
                                  ![
                                    "Backspace",
                                    "Delete",
                                    "ArrowLeft",
                                    "ArrowRight",
                                    "ArrowUp",
                                    "ArrowDown",
                                    "Tab",
                                    "Enter",
                                    "Shift",
                                    "Control",
                                    "Alt",
                                    "Meta",
                                  ].includes(e.key)
                                ) {
                                  e.preventDefault();
                                }
                              }}
                            />
                            {errors.email.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                          <div className="form-group">
                            <label style={{ color: "#231F20" }}>
                              Contact number
                              <span className="text-danger">*</span>
                            </label>
                            <div className="d-flex align-items-end">


<div className="input-group mb-3">
                            <Select
                              value={dail1}
                              options={dialOptions}
                              placeholder="code"
                              name="dial1"
                              onChange={handleDail1}
                              styles={{
                                container: (base) => ({
                                  ...base,
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                  maxWidth: '140px'
                                }),
                              }}
                            />
                             <input
      type="text"
       aria-label="Text input with dropdown button"
      className={`form-control  ${
        errors.mobileNumber.required ? 'is-invalid' : errors.mobileNumber.valid ? 'is-valid' : ''
      }`}
      placeholder="Example 123-456-7890"
      style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px",maxHeight: '100px' }}
      name="mobileNumber"
      value={inputs.mobileNumber}
      onChange={handleInputs}
      onKeyDown={(e) => {
        if (!/^[0-9]$/i.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
          e.preventDefault();
        }
      }}
    />
                          
                            {errors.mobileNumber.required ? (
                              <span className="text-danger form-text profile_error">
                                This field is required.
                              </span>
                            ) : null}
                          </div>
                          </div>
                          </div>
                        </div>
                      </div>
                      <div className=" d-flex justify-content-end  ">
                        <Link
                          style={{
                            backgroundColor: "#0f2239",
                            fontSize: "12px",
                          }}
                          to="/list_admin"
                          className="btn  px-4 py-2 fw-semibold text-uppercase rounded-1  border-0 text-white  m-1"
                        >
                          Cancel
                        </Link>
                        <button
                          style={{
                            backgroundColor: "#FE5722",
                            fontSize: "12px",
                          }}
                          type="submit"
                          className="btn  px-4 py-2 fw-semibold text-uppercase rounded-1 border-0 text-white m-1"
                        >
                          Submit
                        </button>
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
