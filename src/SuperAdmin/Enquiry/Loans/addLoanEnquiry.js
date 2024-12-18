import React, { useEffect, useState } from "react";
import { isValidEmail, isValidPhone } from "../../../Utils/Validation";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { saveLoanEnquiry } from "../../../api/Enquiry/Loan";
import Mastersidebar from "../../../compoents/sidebar";
import Select from "react-select";
export const AddLoanEnquiry = () => {
  const initialState = {
    studentName: "",
    whatsAppNumber: "",
    primaryNumber: "",
    email: "",
    doYouHaveAValidOfferFromAnyUniversity: "",
    uploadOfferletter: "",
    loanAmountRequired: "",
    universityName: "",
    whatIsYourMonthlyIncome: "",
    passportNumber: "",
    uploadPassport: "",
    didYouApplyForLoanElsewhere: "",
    chooseTheBankYouPreviouslyApplied: "",
    statusOfPreviousApplication: "",
    coApplicantName: "",
    age: "",
    employmentStatus: "",
    incomeDetails: "",
    willyouSubmitYourCollateral: "",
  };
  const initialStateErrors = {
    studentName: { required: false },
    whatsAppNumber: { required: false, valid: false },
    primaryNumber: { required: false, valid: false },
    email: { required: false, valid: false },
    doYouHaveAValidOfferFromAnyUniversity: { required: false },
    uploadOfferletter: { required: false },
    loanAmountRequired: { required: false },
    universityName: { required: false },
    whatIsYourMonthlyIncome: { required: false },
    passportNumber: { required: false },
    uploadPassport: { required: false },
    didYouApplyForLoanElsewhere: { required: false },
    chooseTheBankYouPreviouslyApplied: { required: false },
    statusOfPreviousApplication: { required: false },
    coApplicantName: { required: false },
    age: { required: false },
    employmentStatus: { required: false },
    incomeDetails: { required: false },
    willyouSubmitYourCollateral: { required: false },
  };
  const [loan, setLoan] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleValidation = (data) => {
    let error = initialStateErrors;

    if (data.studentName === "") {
      error.studentName.required = true;
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
    if (data.doYouHaveAValidOfferFromAnyUniversity === "") {
      error.doYouHaveAValidOfferFromAnyUniversity.required = true;
    }

    if (data.loanAmountRequired === "") {
      error.loanAmountRequired.required = true;
    }

    if (data.whatIsYourMonthlyIncome === "") {
      error.whatIsYourMonthlyIncome.required = true;
    }
    if (data.passportNumber === "") {
      error.passportNumber.required = true;
    }
    if (data.uploadPassport === "") {
      error.uploadPassport.required = true;
    }

    if (data.coApplicantName === "") {
      error.coApplicantName.required = true;
    }
    if (data.age === "") {
      error.age.required = true;
    }
    if (data.employmentStatus === "") {
      error.employmentStatus.required = true;
    }
    if (data.incomeDetails === "") {
      error.incomeDetails.required = true;
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
    const { name, value, files } = event.target;
    if (files && files[0]) {
      convertToBase64(event, name);
    } else {
      setLoan({ ...loan, [event?.target?.name]: event?.target?.value });
    }
    if (submitted) {
      const newError = handleValidation({
        ...loan,
        [event.target.name]: event.target.value,
      });
      setErrors(newError);
    }
  };

  const convertToBase64 = (e, name) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setLoan((loan) => ({
        ...loan,
        [name]: reader.result,
      }));
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
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
    const newError = handleValidation(loan);
    setErrors(newError);
    setSubmitted(true);
    const allInputsValid = Object.values(newError);
    const valid = allInputsValid.every((x) => x.required === false);
    if (valid) {
      saveLoanEnquiry(loan)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/list_loan_enquiry");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }else {
      toast.error("Please Fill  Mandatory Fields");
    }
  };

  return (
    <>
      <Mastersidebar />

      <div className="content-wrapper" style={{ fontSize: "13px" }}>
        <div className="content-header">
          <form className="p-1" onSubmit={handleSubmit}>
            <div className="container-fluid">
              <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                <div
                  className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0"
                  style={{ background: "#fe5722", color: "#fff" }}
                >
                  <h6 className="text-center text-capitalize p-1">
                    {" "}
                    Add Loan Enquiry
                  </h6>
                </div>
                <div className="card-body mt-5">
                  <div className="row g-3">
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputStudentName">
                        Student Name
                      </label>

                      <input
                        className=
                        {`form-control rounded-1 ${errors.studentName.required ? 'is-invalid' : ''}`}
                        onChange={handleInputs}
                        name="studentName"
                        id="inputStudentName"
                        type="text"
                        placeholder="Enter Student Name"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.studentName.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputPrimaryNo">
                        Primary Number
                      </label>
                      <input
                        className=
                        {`form-control rounded-1 ${errors.primaryNumber.required ? 'is-invalid' : ''}`}
                        name="primaryNumber"
                        onChange={handleInputs}
                        id="inputPrimaryNo"
                        type="text"
                        placeholder="Enter Primary Number"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.primaryNumber.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : errors.primaryNumber.valid ? (
                        <div className="text-danger form-text">
                          Enter valid emergencyContactNo.
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputWhatsAppNumber">
                        WhatsApp Number
                      </label>
                      <input
                        className=
                        {`form-control rounded-1 ${errors.whatsAppNumber.required ? 'is-invalid' : ''}`}
                        name="whatsAppNumber"
                        onChange={handleInputs}
                        id="inputWhatsAppNumber"
                        type="text"
                        placeholder="Enter WhatsApp Number"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.whatsAppNumber.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : errors.whatsAppNumber.valid ? (
                        <div className="text-danger form-text">
                          Enter valid emergencyContactNo.
                        </div>
                      ) : null}
                    </div>

                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputEmail">
                        Email ID
                      </label>
                      <input
                        className=
                        {`form-control rounded-1 ${errors.email.required ? 'is-invalid' : ''}`}
                        name="email"
                        onChange={handleInputs}
                        id="inputEmail"
                        type="text"
                        placeholder="Enter Email ID"
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
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label
                        style={{ color: "#231F20" }}
                        className="class-danger"
                      >
                        DoYouHaveAValidOfferFromAnyUniversity
                      </label>
                      <select
                        style={{
                          backgroundColor: "#fff",
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "14px",
                        }}
                        className={`form-select form-select-lg rounded-1 ${errors.doYouHaveAValidOfferFromAnyUniversity.required ? 'is-invalid' : ''} `}
                        name="doYouHaveAValidOfferFromAnyUniversity"
                        onChange={handleInputs}
                      >
                        <option value="">Select Offer Type</option>
                        <option value="categorie1">Yes</option>
                        <option value="categorie2">No</option>
                      </select>
                      {errors.doYouHaveAValidOfferFromAnyUniversity.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                      <br />
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputloanamount">
                        Loan Amount Required
                      </label>
                      <input
                        className=

                        {`form-control rounded-1 ${errors.loanAmountRequired.required ? 'is-invalid' : ''}`}
                        id="inputloanamount"
                        type="text"
                        placeholder="Enter Loan Amount Required"
                        onChange={handleInputs}
                        name="loanAmountRequired"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.loanAmountRequired.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    {loan.doYouHaveAValidOfferFromAnyUniversity ===
                    "categorie1" ? (
                      <div className="row">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label
                            style={{ color: "#231F20" }}
                            className="class-danger"
                          >
                            Offerletter
                          </label>

                          <input
                            name="uploadOfferletter"
                            className="form-control"
                            type="file"
                            placeholder="Upload Offerletter"
                            style={{
                              height: 30,
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            onChange={handleInputs}
                          />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label
                            style={{ color: "#231F20" }}
                            className="class-danger"
                          >
                            University Name
                          </label>

                          <input
                            name="universityName"
                            className="form-control"
                            type="text"
                            placeholder="Enter University Name"
                            style={{
                              height: 30,
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            onChange={handleInputs}
                          />
                        </div>
                      </div>
                    ) : null}

                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputmonthlyincome">
                        What is your monthly income?
                      </label>
                      <input
                        className=
                        {`form-control rounded-1 ${errors.whatIsYourMonthlyIncome.required ? 'is-invalid' : ''}`}
                        id="inputmonthlyincome"
                        name="whatIsYourMonthlyIncome"
                        onChange={handleInputs}
                        type="text"
                        placeholder="Enter What is your monthly income?"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.whatIsYourMonthlyIncome.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputmonthlyincome">
                        Passport Number
                      </label>
                      <input
                        className=
{`form-control rounded-1 ${errors.passportNumber.required ? 'is-invalid' : ''}`}
                        id="inputmonthlyincome"
                        name="passportNumber"
                        onChange={handleInputs}
                        type="text"
                        placeholder="Enter The Passport Number"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.passportNumber.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>

                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputmonthlyincome">
                        Upload Passport
                      </label>
                      <input
                        className=
                        {`form-control rounded-1 ${errors.uploadPassport.required ? 'is-invalid' : ''}`}
                        id="inputmonthlyincome"
                        name="uploadPassport"
                        onChange={handleInputs}
                        type="file"
                        placeholder="Upload In Passport Copy"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.uploadPassport.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>

                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label
                        style={{ color: "#231F20" }}
                        className="class-danger"
                      >
                        DidYouApplyForLoanElsewhere
                      </label>
                      <select
                        style={{
                          backgroundColor: "#fff",
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "14px",
                        }}
                        className="form-select form-select-lg rounded-1"
                        name="didYouApplyForLoanElsewhere"
                        onChange={handleInputs}
                      >
                        <option value="">Select Offer Type</option>
                        <option value="categorie1">Yes</option>
                        <option value="No">No</option>
                      </select>
                      <br />
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputCo-ApplicantName">
                        {" "}
                        Co-Applicant Name
                      </label>
                      <input
                        className=
                        {`form-control rounded-1 ${errors.coApplicantName.required ? 'is-invalid' : ''}`}
                        id="inputCo-ApplicantName"
                        name="coApplicantName"
                        onChange={handleInputs}
                        type="text"
                        placeholder="Enter  Co-Applicant Name"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.coApplicantName.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputCo-Applicantage">
                        {" "}
                        Co-Applicant Age
                      </label>
                      <input
                        className=
                        {`form-control rounded-1 ${errors.age.required ? 'is-invalid' : ''}`}
                        id="inputCo-Applicantage"
                        onChange={handleInputs}
                        name="age"
                        type="text"
                        placeholder="Enter  Co-Applicant Age"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.age.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    {loan.didYouApplyForLoanElsewhere === "categorie1" ? (
                      <div className="row">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label
                            style={{ color: "#231F20" }}
                            className="class-danger"
                          >
                            Choose TheBankYou Previously Applied
                          </label>

                          <input
                            name="chooseTheBankYouPreviouslyApplied"
                            className="form-control"
                            type="text"
                            placeholder="Enter The ChooseTheBankYouPreviouslyApplied"
                            style={{
                              height: 40,
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            onChange={handleInputs}
                          />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label
                            style={{ color: "#231F20" }}
                            className="class-danger"
                          >
                            Status Of Previous Application
                          </label>

                          <input
                            name="statusOfPreviousApplication"
                            className="form-control"
                            type="text"
                            placeholder="Enter The statusOfPreviousApplication"
                            style={{
                              height: 40,
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            onChange={handleInputs}
                          />
                        </div>
                      </div>
                    ) : null}

                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label
                        className="form-label"
                        for="inputCo-Applicantstatus"
                      >
                        {" "}
                        Co-Applicant Employment Status
                      </label>
                      <input
                        className=
                        {`form-control rounded-1 ${errors.employmentStatus.required ? 'is-invalid' : ''}`}
                        id="inputCo-Applicantstatus"
                        type="text"
                        name="employmentStatus"
                        onChange={handleInputs}
                        placeholder="Enter  Co-Applicant Employment Status"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.employmentStatus.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label
                        className="form-label"
                        for="inputCo-Applicantdetails"
                      >
                        {" "}
                        Co-Applicant Income Details
                      </label>
                      <input
                        className={`form-control rounded-1 ${errors.incomeDetails.required ? 'is-invalid' : ''}`}
                        id="inputCo-Applicantdetails"
                        type="text"
                        name="incomeDetails"
                        onChange={handleInputs}
                        placeholder="Enter  Co-Applicant Income Details"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.incomeDetails.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputcollateral">
                        Will you submit your collateral if required
                      </label>
                      <select
                        className="form-select form-select-lg rounded-1"
                        name=" willyouSubmitYourCollateral"
                        onChange={handleInputs}
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                        id="inputcollateral"
                      >
                        <option value="">Select collateral</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                      <Link
                        to="/list_loan_enquiry"
                        style={{
                          backgroundColor: "#0f2239",
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "14px",
                        }}
                        className="btn btn-cancel border-0 fw-semibold text-uppercase px-4 py-2 text-white  m-2"
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
                        className="btn btn-save border-0 fw-semibold text-uppercase px-4 py-2 text-white  m-2"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddLoanEnquiry;
