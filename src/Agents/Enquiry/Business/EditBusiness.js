import { useEffect, useState } from "react";
import { isValidEmail, isValidPhone } from "../../../Utils/Validation";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  updateStudnetEnquiry,
  getSingleStudnetEnquiry,
} from "../../../api/Enquiry/student";
import Mastersidebar from "../../../compoents/AgentSidebar";
import { Student } from "../../../api/endpoints";
export const EditBusiness = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const initialState = {
    source: "",
    name: "",
    dob: "",
    passportNo: "",
    qualification: "",
    whatsAppNumber: "",
    primaryNumber: "",
    email: "",
    cgpa: "",
    yearPassed: "",
    desiredCountry: "",
    desiredCourse: "",
    doYouNeedSupportForLoan: "",
    assignedTo: "",
  };
  const initialStateErrors = {
    source: { required: false },
    name: { required: false },
    dob: { required: false },
    passportNo: { required: false },
    qualification: { required: false },
    whatsAppNumber: { required: false },
    primaryNumber: { required: false },
    email: { required: false },
    cgpa: { required: false },
    yearPassed: { required: false },
    desiredCountry: { required: false },
    desiredCourse: { required: false },
    doYouNeedSupportForLoan: { required: false },
    assignedTo: { required: false },
  };
  const [student, setStudent] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getStudentDetails();
  }, []);
  const getStudentDetails = () => {
    getSingleStudnetEnquiry(id)
      .then((res) => {
        setStudent(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleValidation = (data) => {
    let error = initialStateErrors;
    if (data.source === "") {
      error.source.required = true;
    }
    if (data.name === "") {
      error.name.required = true;
    }
    if (data.dob === "") {
      error.dob.required = true;
    }
    if (data.passportNo === "") {
      error.passportNo.required = true;
    }
    if (data.qualification === "") {
      error.qualification.required = true;
    }
    if (data.whatsAppNumber === "") {
      error.whatsAppNumber.required = true;
    }
    if (data.primaryNumber === "") {
      error.primaryNumber.required = true;
    }
    if (data.email === "") {
      error.email.required = true;
    }
    if (data.cgpa === "") {
      error.cgpa.required = true;
    }
    if (data.yearPassed === "") {
      error.yearPassed.required = true;
    }
    if (data.desiredCountry === "") {
      error.desiredCountry.required = true;
    }
    if (data.desiredCourse === "") {
      error.desiredCourse.required = true;
    }
    if (data.doYouNeedSupportForLoan === "") {
      error.doYouNeedSupportForLoan.required = true;
    }
    if (data.assignedTo === "") {
      error.assignedTo.required = true;
    }
    if (!isValidEmail(data.email)) {
      error.email.valid = true;
    }
    if (!isValidPhone(data.primaryNumber)) {
      error.primaryNumber.valid = true;
    }
    if (!isValidPhone(data.whatsAppNumber)) {
      error.whatsAppNumber.valid = true;
    }
    return error;
  };
  const handleInputs = (event) => {
    setStudent({ ...student, [event?.target?.name]: event?.target?.value });
    if (submitted) {
      const newError = handleValidation({
        ...student,
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
    const newError = handleValidation(student);
    setErrors(newError);
    setSubmitted(true);
    if (handleErrors(newError)) {
      updateStudnetEnquiry(student)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/agent_list_business_enquiry");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    } else {
      toast.error("Please Fill  Mandatory Fields");
    }
  };
  return (
    <>
      <Mastersidebar />
      <div className="content-wrapper" style={{ fontSize: "14px" }}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
              <div
                className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0"
                style={{ background: "#fe5722", color: "#fff" }}
              >
                <h5 className="text-center text-capitalize p-1">
                  {" "}
                  Edit BusinessEnquiry Details
                </h5>
              </div>
              <div className="card-body mt-5">
                <form className="p-1" onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputEmail4">
                        Source
                      </label>
                      <select
                        onChange={handleInputs}
                        value={student?.source}
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "14px",
                        }}
                        className={`form-select form-select-lg rounded-1 text-capitalize ${
                          errors.source.required ? "is-invalid" : ""
                        } `}
                        name="source"
                      >
                        <option value="">Select Source</option>
                        <option value="walkin">Walk In</option>
                        <option value="direct">Direct</option>
                        <option value="others">Others</option>
                      </select>
                      {errors.source.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputEmail4">
                        Student Name
                      </label>
                      <input
                        className={`form-control rounded-1 text-capitalize ${
                          errors.name.required ? "is-invalid" : ""
                        }`}
                        value={student?.name}
                        type="text"
                        id="inputEmail4"
                        name="name"
                        onChange={handleInputs}
                        placeholder="Example John Doe"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "14px",
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
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputPassword4">
                        DOB
                      </label>
                      <input
                        className={`form-control rounded-1 text-uppercase ${
                          errors.dob.required ? "is-invalid" : ""
                        }`}
                        value={student?.dob}
                        onChange={handleInputs}
                        id="inputPassword4"
                        type="date"
                        placeholder="DOB"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "14px",
                        }}
                        name="dob"
                      />
                      {errors.dob.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputPassword4">
                        Email ID
                      </label>
                      <input
                        className={`form-control rounded-1 text-lowercase ${
                          errors.email.required ? "is-invalid" : ""
                        }`}
                        value={Student?.email}
                        onChange={handleInputs}
                        id="inputPassword4"
                        text="text"
                        placeholder="Example johndoe123@gmail.com"
                        name="email"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "14px",
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
                      ) : errors.email.valid ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputAddress">
                        Passport No
                      </label>
                      <input
                        className={`form-control rounded-1 text-uppercase ${
                          errors.passportNo.required ? "is-invalid" : ""
                        }`}
                        value={student?.passportNo}
                        onChange={handleInputs}
                        name="passportNo"
                        id="inputAddress"
                        type="text"
                        placeholder="Example ME12398754"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "14px",
                        }}
                        onKeyDown={(e) => {
                          // Prevent default behavior for disallowed keys
                          if (
                            !/^[a-zA-Z0-9]$/.test(e.key) &&
                            ![
                              "Backspace",
                              "Delete",
                              "ArrowLeft",
                              "ArrowRight",
                            ].includes(e.key)
                          ) {
                            e.preventDefault();
                          }
                        }}
                      />
                      {errors.passportNo.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputEmail4">
                        Contact Number
                      </label>
                      <input
                        className={`form-control rounded-1 ${
                          errors.primaryNumber.required ? "is-invalid" : ""
                        }`}
                        value={student?.primaryNumber}
                        onChange={handleInputs}
                        id="inputEmail4"
                        type="text"
                        name="primaryNumber"
                        placeholder="Example +91 95672-67583"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "14px",
                        }}
                        onKeyDown={(e) => {
                          if (
                            !/^[0-9]$/i.test(e.key) &&
                            ![
                              "Backspace",
                              "Delete",
                              "ArrowLeft",
                              "ArrowRight",
                            ].includes(e.key)
                          ) {
                            e.preventDefault();
                          }
                        }}
                      />
                      {errors.primaryNumber.required ? (
                        <span className="text-danger form-text profile_error">
                          This field is required.
                        </span>
                      ) : errors.primaryNumber.valid ? (
                        <span className="text-danger form-text profile_error">
                          This field is required.
                        </span>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputAddress">
                        CGPA{" "}
                      </label>
                      <input
                        className={`form-control rounded-1 ${
                          errors.cgpa.required ? "is-invalid" : ""
                        }`}
                        onChange={handleInputs}
                        value={student?.cgpa}
                        name="cgpa"
                        id="inputAddress"
                        type="text"
                        placeholder="Example 98"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "14px",
                        }}
                        onKeyDown={(e) => {
                          if (
                            !/^[0-9]$/i.test(e.key) &&
                            ![
                              "Backspace",
                              "Delete",
                              "ArrowLeft",
                              "ArrowRight",
                            ].includes(e.key)
                          ) {
                            e.preventDefault();
                          }
                        }}
                      />
                      {errors.cgpa.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputAddress">
                        {" "}
                        Year passed
                      </label>
                      <input
                        className={`form-control rounded-1 ${
                          errors.yearPassed.required ? "is-invalid" : ""
                        }`}
                        id="inputAddress"
                        value={student?.yearPassed}
                        onChange={handleInputs}
                        name="yearPassed"
                        type="text"
                        placeholder="Example 2024"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "14px",
                        }}
                        onKeyDown={(e) => {
                          if (
                            !/^[0-9]$/i.test(e.key) &&
                            ![
                              "Backspace",
                              "Delete",
                              "ArrowLeft",
                              "ArrowRight",
                            ].includes(e.key)
                          ) {
                            e.preventDefault();
                          }
                        }}
                      />
                      {errors.yearPassed.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputEmail4">
                        Desired Country
                      </label>
                      <input
                        className={`form-control rounded-1 text-capitalize ${
                          errors.desiredCountry.required ? "is-invalid" : ""
                        }`}
                        id="inputEmail4"
                        value={student?.desiredCountry}
                        onChange={handleInputs}
                        name="desiredCountry"
                        type="text"
                        placeholder="Example United Kingdom"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "14px",
                        }}
                        onKeyDown={(e) => {
                          // Prevent non-letter characters
                          if (/[^a-zA-Z\s]/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                      {errors.desiredCountry.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputPassword4">
                        Desired Course
                      </label>
                      <input
                        className={`form-control rounded-1 text-capitalize ${
                          errors.desiredCourse.required ? "is-invalid" : ""
                        }`}
                        id="inputPassword4"
                        value={student?.desiredCourse}
                        onChange={handleInputs}
                        type="text"
                        name="desiredCourse"
                        placeholder="Example Game Design"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "14px",
                        }}
                        onKeyDown={(e) => {
                          // Prevent non-letter characters
                          if (/[^a-zA-Z\s]/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                      {errors.desiredCourse.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputAddress">
                        Do you need support for loan?{" "}
                      </label>
                      <select
                        className={`form-select form-select-lg rounded-1 text-capitalize ${
                          errors.doYouNeedSupportForLoan.required
                            ? "is-invalid"
                            : ""
                        }`}
                        name="doYouNeedSupportForLoan"
                        value={student?.doYouNeedSupportForLoan}
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                        onChange={handleInputs}
                      >
                        <option value=""> Select Loan support </option>
                        <option value="yes"> Yes </option>
                        <option value="no">No </option>
                      </select>
                      {errors.doYouNeedSupportForLoan.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputEmail4">
                        WhatsApp Number
                      </label>
                      <input
                        className={`form-control rounded-1 ${
                          errors.whatsAppNumber.required ? "is-invalid" : ""
                        }`}
                        id="inputEmail4"
                        value={student?.whatsAppNumber}
                        onChange={handleInputs}
                        type="text"
                        name="whatsAppNumber"
                        placeholder="Example +91 95672-67583"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "14px",
                        }}
                        onKeyDown={(e) => {
                          if (
                            !/^[0-9]$/i.test(e.key) &&
                            ![
                              "Backspace",
                              "Delete",
                              "ArrowLeft",
                              "ArrowRight",
                            ].includes(e.key)
                          ) {
                            e.preventDefault();
                          }
                        }}
                      />
                      {errors.whatsAppNumber.required ? (
                        <span className="text-danger form-text profile_error">
                          This field is required.
                        </span>
                      ) : errors.whatsAppNumber.valid ? (
                        <span className="text-danger form-text profile_error">
                          This field is required.
                        </span>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputPassword4">
                        Qualification
                      </label>
                      <input
                        className={`form-control rounded-1 text-capitalize ${
                          errors.qualification.required ? "is-invalid" : ""
                        }`}
                        value={student?.qualification}
                        id="inputPassword4"
                        onChange={handleInputs}
                        type="text"
                        name="qualification"
                        placeholder="Example BE"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "14px",
                        }}
                        onKeyDown={(e) => {
                          // Prevent non-letter characters
                          if (/[^a-zA-Z\s]/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                      {errors.qualification.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputEmail4">
                        {" "}
                        Assigned To
                      </label>
                      <input
                        className={`form-control rounded-1 text-capitalize ${
                          errors.assignedTo.required ? "is-invalid" : ""
                        }`}
                        value={student?.assignedTo}
                        id="inputEmail4"
                        onChange={handleInputs}
                        type="text"
                        name="assignedTo"
                        placeholder="Example Jake Doe"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "14px",
                        }}
                        onKeyDown={(e) => {
                          // Prevent non-letter characters
                          if (/[^a-zA-Z\s]/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                      {errors.assignedTo.required ? (
                        <span className="text-danger form-text profile_error">
                          This field is required.
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="d-flex flex-row align-item-center justify-content-end ">
                      <Link
                        style={{
                          backgroundColor: "#231F20",
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "14px",
                        }}
                        to="/agent_list_business_enquiry"
                        className="btn btn-cancel border-0 text-uppercase fw-semibold px-4 py-2  text-white m-2"
                      >
                        Cancel
                      </Link>
                      <button
                        style={{
                          backgroundColor: "#FE5722",
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "14px",
                        }}
                        type="submit"
                        className="btn btn-save border-0 text-uppercase fw-semibold px-4 py-2 text-white m-2"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditBusiness;
