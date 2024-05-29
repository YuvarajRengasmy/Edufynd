import React, { useEffect, useState } from 'react';
import Flags from 'react-world-flags';
import { isValidEmail } from '../../Utils/Validation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveUniversity } from '../../api/university';
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { Link } from "react-router-dom";
import { Select } from '@mui/material';



function AddComission() {

  const initialState = {
    paymentMethod: "",
    amount: "",
    percentage: "",
    eligibilityForCommission: "",
    currency: "",
    paymentTAT: "",
    tax: "",
    commissionPaidOn: "",
    countryName: "",
    flag: "",

  }

  const initialStateErrors = {

    paymentMethod: { required: false },
    amount: { required: false },
    percentage: { required: false },
    eligibilityForCommission: { required: false },
    currency: { required: false },
    paymentTAT: { required: false },
    tax: { required: false },
    commissionPaidOn: { required: false },
    countryName: { required: false },
    flag: { required: false },

  }
  const [university, setUniversity] = useState(initialState)
  const [errors, setErrors] = useState(initialStateErrors)
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleValidation = (data) => {
    let error = initialStateErrors;

    if (data.paymentMethod === "") {
      error.paymentMethod.required = true;
    }
    if (data.eligibilityForCommission === "") {
      error.eligibilityForCommission.required = true;
    }

    if (data.countryName === "") {
      error.countryName.required = true;
    }
    if (data.flag === "") {
      error.flag.required = true;
    }
    if (data.currency === "") {
      error.currency.required = true;
    }

    if (data.paymentTAT === "") {
      error.paymentTAT.required = true;
    }

    if (data.tax === "") {
      error.tax.required = true;
    }

    if (data.commissionPaidOn === "") {
      error.commissionPaidOn.required = true;
    }

    return error
  }

  const handleInputs = (event) => {
    const { name, value } = event.target;

    setUniversity((prevUniversity) => {
      const updatedUniversity = { ...prevUniversity, [name]: value };


      if (name === "countryName") {
        const details = countryToDetails[value] || { currency: "", flag: "" };
        return { ...updatedUniversity, ...details };
      }

      return updatedUniversity;
    });
    if (submitted) {
      const newError = handleValidation({ ...university, [name]: value });
      setErrors(newError);
    }
  };

  const countryToDetails = {
    "United States": { currency: "USD", flag: "us" },
    "Canada": { currency: "CAD", flag: "ca" },
    "United Kingdom": { currency: "GBP", flag: "gb" },
    "Australia": { currency: "AUD", flag: "au" },
    "India": { currency: "INR", flag: "in" },

  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = handleValidation(university);

    if (isValid) {
      try {
        const data = {
          paymentMethod: university?.paymentMethod,
          amount: university?.amount,
          percentage: university?.percentage,
          eligibilityForCommission: university?.eligibilityForCommission,
          currency: university?.currency,
          paymentTAT: university?.paymentTAT,
          tax: university?.tax,
          commissionPaidOn: university?.commissionPaidOn
        };

        const res = await saveUniversity(data);
        toast.success(res?.data?.message);
        navigate("/ListUniversity");
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || "An error occurred");
      }
    } else {
      console.log("Validation failed");
    }
  };


  return (
    <div>
      <div class="position-fixed">
        <div class="">
          <Sidebar />
          <Header />
        </div>
      </div>
      <div className="content-wrapper">
        <div className="content-header mt-3">
          <div className="content container-fluid w-75">
            <form onSubmit={handleSubmit} >
              <div className="content-page-header">
                <h5 className="text-bold" style={{ color: "#231F20" }}>
                  Add Comission
                </h5>
              </div>
              <div className="row">




                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ color: '#231F20' }} className="class-danger">
                      Payment Method
                    </label>
                    <select className="form-select" name="paymentMethod" onChange={handleInputs}>
                      <option value="">Select Payment Type</option>
                      <option value="categorie1">Fixed</option>
                      <option value="categorie2">Percentage</option>
                    </select>
                    <br />
                    {university.paymentMethod === 'categorie1' ? (
                      <div className="form-group">
                        <label style={{ color: '#231F20' }} className="class-danger">Ammount</label>

                        <input
                          name="amount"
                          className="form-control"
                          type="text"
                          placeholder='Enter Ammount'
                          style={{ height: 50 }}
                          onChange={handleInputs}
                        />

                      </div>
                    ) : university.paymentMethod === 'categorie2' ? (
                      <div className="form-group">
                        <label style={{ color: '#231F20' }} className="class-danger">Percentage</label>

                        <input
                          name="percentage"
                          className="form-control"
                          type="text"
                          placeholder='Enter Percentage'
                          style={{ height: 50 }}
                          onChange={handleInputs}
                        />

                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      {" "}
                      Eligibility for Commission<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Eligibility for Commission"
                      name="eligibilityForCommission"
                      onChange={handleInputs}
                    />
                    {errors.eligibilityForCommission.required ? (
                      <div className="text-danger form-text">
                        This field is required.
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      {" "}
                      Country<span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select rounded-2 p-2 "
                      name="countryName"
                      value={university?.countryName ?? ""}
                      onChange={handleInputs}
                    > <option value={""} disabled hidden >Select Country</option>
                      {Object.keys(countryToDetails).map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>

                    {errors.countryName.required ? (
                      <div className="text-danger form-text">
                        This field is required.
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      currency
                    </label>
                    <div sm="9" className="d-flex align-items-center">
                      {university.flag && (
                        <Flags code={university.flag} className="me-2" style={{ width: '30px', height: '20px' }} onChange={handleInputs} name='flag' />
                      )}
                      <input className='form-control' type="text" onChange={handleInputs} name='currency' value={`${university.currency}`} readOnly />
                    </div>
                    {errors.currency.required ? (
                      <div className="text-danger form-text">
                        This field is required.
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      {" "}
                      Payment TAT<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter paymentTAT Link"
                      name="paymentTAT"
                      onChange={handleInputs}
                    />

                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      {" "}
                      Tax<span className="text-danger">*</span>
                    </label>
                    <select
                      className='form-select rounded-2 p-2 '
                      name="tax"
                      onChange={handleInputs}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <option value="">Select Tax</option>
                      <option value="inclusive">Inclusive</option>
                      <option value="exclusive">Exclusive</option>
                    </select>
                    {errors.tax.required ? (
                      <div className="text-danger form-text">
                        This field is required.
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      {" "}
                      commissionPaidOn<span className="text-danger">*</span>
                    </label>
                    <select
                      className='form-select rounded-2 p-2 '
                      name="commissionPaidOn"
                      onChange={handleInputs}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <option value="">Select Commission</option>
                      <option value="courseFees">Course Fees</option>
                      <option value="paidFees">Paid Fees</option>
                    </select>
                    {errors.commissionPaidOn.required ? (
                      <div className="text-danger form-text">
                        This field is required.
                      </div>
                    ) : null}
                  </div>
                </div>



                <div className="add-customer-btns mb-40 d-flex justify-content-end w-50 ml-auto">
                  <Link
                    style={{ backgroundColor: "#231F20" }}
                    to="/ListUniversity"
                    className="btn btn-cancel border text-white w-50 m-2"
                  >
                    Cancel
                  </Link>
                  <button
                    style={{ backgroundColor: "#FE5722" }}
                    type="submit"
                    className="btn btn-save border text-white w-50 m-2"
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
  );
}
export default AddComission;
