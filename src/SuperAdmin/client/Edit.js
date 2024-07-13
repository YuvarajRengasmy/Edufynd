import React, { useEffect, useState } from "react";
import {
  isValidEmail,
  isValidName,
  isValidPhone,
  isValidWebsite,
  isValidPinCode,
} from "../../Utils/Validation";
import { toast } from "react-toastify";
import { updateClient, getSingleClient } from "../../api/client";
import { getallClientModule } from "../../api/universityModule/clientModule";
import Sidebar from "../../compoents/sidebar";
import { Link, useNavigate, useLocation } from "react-router-dom";

function AddAgent() {

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const initialState = {
    typeOfClient: "",
    businessName: "",
    businessMailID: "",
    businessContactNo: "",
    website: "",
    addressLine1: "", // Street Address, City, State, Postal Code, Country
    addressLine2: "",
    addressLine3: "",
    name: "",
    contactNo: "",
    emailID: "",
    whatsAppNumber: "",
  };
  const initialStateErrors = {
    typeOfClient: { required: false },
    businessName: { required: false },
    businessMailID: { required: false, valid: false },
    businessContactNo: { required: false, valid: false },
    website: { required: false, valid: false },
    addressLine2: { required: false },
    addressLine3: { required: false },
    addressLine1: { required: false },
    name: { required: false },
    contactNo: { required: false, valid: false },
    emailID: { required: false, valid: false },
    whatsAppNumber: { required: false, valid: false },
  };
  const [client, setClient] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState([]);

  useEffect(() => {
    getAllClientDetails();
    getClientDetails();
  }, []);

  const getAllClientDetails = () => {
    getallClientModule()
      .then((res) => {
        console.log(res);
        setType(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
  const getClientDetails = () => {
    getSingleClient(id)
      .then((res) => {
        setClient(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const navigate = useNavigate();
  const handleValidation = (data) => {
    let error = initialStateErrors;

    if (data.typeOfClient === "") {
      error.typeOfClient.required = true;
    }

    if (data.businessName === "") {
      error.businessName.required = true;
    }

    if (data.businessMailID === "") {
      error.businessMailID.required = true;
    }
    if (data.businessContactNo === "") {
      error.businessContactNo.required = true;
    }
    if (data.website === "") {
      error.website.required = true;
    }
    if (data.addressLine1 === "") {
      error.addressLine1.required = true;
    }
    if (data.name === "") {
      error.name.required = true;
    }
    if (data.contactNo === "") {
      error.contactNo.required = true;
    }
    if (data.emailID === "") {
      error.emailID.required = true;
    }
    if (data.addressLine2 === "") {
      error.addressLine2.required = true;
    }
    if (data.addressLine3 === "") {
      error.addressLine3.required = true;
    }
    if (data.whatsAppNumber === "") {
      error.whatsAppNumber.required = true;
    }

    if (!isValidEmail(data.emailID)) {
      error.emailID.valid = true;
    }
    if (!isValidPhone(data.contactNo)) {
      error.contactNo.valid = true;
    }
    if (!isValidEmail(data.businessMailID)) {
      error.businessMailID.valid = true;
    }
    if (!isValidPhone(data.businessContactNo)) {
      error.businessContactNo.valid = true;
    }
    if (!isValidPhone(data.whatsAppNumber)) {
      error.whatsAppNumber.valid = true;
    }
    if (!isValidWebsite(data.website)) {
      error.website.valid = true;
    }
    if (!isValidName(data.businessName)) {
      error.businessName.valid = true;
    }
    if (!isValidName(data.name)) {
      error.name.valid = true;
    }
    if (!isValidPinCode(data.addressLine3)) {
      error.addressLine3.valid = true;
    }
    return error;
  };

  const handleInputs = (event) => {
    setClient({ ...client, [event?.target?.name]: event?.target?.value });
    if (submitted) {
      const newError = handleValidation({
        ...client,
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
    const newError = handleValidation(client);
    setErrors(newError);
    setSubmitted(true);

    if (handleErrors(newError)) {
        updateClient(client)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/client");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  return (
    <>
      <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
        <div class="container-fluid">
          <nav class="navbar navbar-vertical navbar-expand-lg">
            <Sidebar />
          </nav>

          <div
            className="content-wrapper "
            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
          >
            <div className="content-header ">
              <div className="content container-fluid ">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-xl-12 ">
                      <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                        <div
                          className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0"
                          style={{ background: "#fe5722", color: "#fff" }}
                        >
                          <h6 className="text-center text-capitalize p-1">
                            {" "}
                            Edit Client Details
                          </h6>
                        </div>
                        <div className="card-body mt-5">
                          <div className="row g-3">
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Type of Client{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <div className="">
                                <select
                                  onChange={handleInputs}
                                  value={client?.typeOfClient}
                                  style={{
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "11px",
                                  }}
                                  className="form-select  "
                                  name="typeOfClient"
                                >
                                  <option value={""}>Select Client Type</option>
                                  {type.map((data, index) => (
                                    <option
                                      key={index}
                                      value={data?.typeOfClient}
                                    >
                                      {" "}
                                      {data?.typeOfClient}
                                    </option>
                                  ))}
                                </select>
                                {errors.typeOfClient.required ? (
                                  <div className="text-danger form-text">
                                    This field is required.
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                {" "}
                                Business Name
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                value={client?.businessName}
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                                name="businessName"
                                onChange={handleInputs}
                                className="form-control form-control-sm  "
                                placeholder="Enter Business Name"
                              />
                              {errors.businessName.required && (
                                <span className="text-danger form-text profile_error">
                                  This field is required.
                                </span>
                              )}
                              {errors.businessName.valid && (
                                <div className="text-danger form-text">
                                  Name should contain only letters.
                                </div>
                              )}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Website<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                value={client?.website}
                                className="form-control form-control-sm "
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                                placeholder="Enter Website"
                                name="website"
                                onChange={handleInputs}
                              />
                              {errors.website.required && (
                                <span className="text-danger form-text profile_error">
                                  This field is required.
                                </span>
                              )}
                              {errors.website.valid && (
                                <div className="text-danger form-text">
                                  Enter a valid Website URL.
                                </div>
                              )}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                {" "}
                                Business Mail ID
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                value={client?.businessMailID}
                                className="form-control form-control-sm "
                                placeholder="Enter Business Mail ID"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                                name="businessMailID"
                                onChange={handleInputs}
                              />
                              {errors.businessMailID.required ? (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              ) : errors.businessMailID.valid ? (
                                <div className="text-danger form-text">
                                  Enter valid Email Id.
                                </div>
                              ) : null}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Business Contact No{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                value={client?.businessContactNo}
                                className="form-control form-control-sm"
                                placeholder="Enter Contact No "
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                                name="businessContactNo"
                                onChange={handleInputs}
                              />
                              {errors.businessContactNo.required ? (
                                <span className="text-danger form-text profile_error">
                                  This field is required.
                                </span>
                              ) : errors.businessContactNo.valid ? (
                                <span className="text-danger form-text profile_error">
                                  Enter valid mobile number.
                                </span>
                              ) : null}
                            </div>

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Staff Name<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                value={client?.name}
                                className="form-control form-control-sm "
                                placeholder="Enter Staff Name"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                                name="name"
                                onChange={handleInputs}
                              />
                              {errors.name.required && (
                                <span className="text-danger form-text profile_error">
                                  This field is required.
                                </span>
                              )}
                              {errors.name.valid && (
                                <div className="text-danger form-text">
                                  Name should contain only letters.
                                </div>
                              )}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Staff Contact No
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                value={client?.contactNo}
                                className="form-control  form-control-sm"
                                placeholder="Enter Staff Contact No"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                                name="contactNo"
                                onChange={handleInputs}
                              />
                              {errors.contactNo.required ? (
                                <span className="text-danger form-text profile_error">
                                  This field is required.
                                </span>
                              ) : errors.contactNo.valid ? (
                                <span className="text-danger form-text profile_error">
                                  Enter valid mobile number.
                                </span>
                              ) : null}
                            </div>

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Staff Email ID
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                value={client?.emailID}
                                className="form-control form-control-sm "
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                                placeholder="Enter Staff Email ID"
                                name="emailID"
                                onChange={handleInputs}
                              />
                              {errors.emailID.required ? (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              ) : errors.emailID.valid ? (
                                <div className="text-danger form-text">
                                  Enter valid Email Id.
                                </div>
                              ) : null}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                WhatsApp Number
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                value={client?.whatsAppNumber}
                                className="form-control form-control-sm"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                                placeholder="Enter WhatsApp Number"
                                name="whatsAppNumber"
                                onChange={handleInputs}
                              />
                              {errors.whatsAppNumber.required && (
                                <span className="text-danger form-text profile_error">
                                  This field is required.
                                </span>
                              )}
                              {errors.whatsAppNumber.valid && (
                                <div className="text-danger form-text">
                                  Enter a valid WhatsApp Number.
                                </div>
                              )}
                            </div>

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Address Line1
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                value={client?.addressLine1}
                                className="form-control form-control-sm"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                                placeholder="Enter No Area Street Name"
                                name="addressLine1"
                                onChange={handleInputs}
                              />
                              {errors.addressLine1.required ? (
                                <span className="text-danger form-text profile_error">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Address Line2
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                value={client?.addressLine2}
                                className="form-control form-control-sm "
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                                placeholder="Enter City State"
                                name="addressLine2"
                                onChange={handleInputs}
                              />
                              {errors.addressLine2.required ? (
                                <span className="text-danger form-text profile_error">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Pin<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                value={client?.addressLine3}
                                className="form-control form-control-sm "
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                                placeholder="Enter Country Pincode"
                                name="addressLine3"
                                onChange={handleInputs}
                              />
                              {errors.addressLine3.required ? (
                                <span className="text-danger form-text profile_error">
                                  This field is required.
                                </span>
                              ) : errors.addressLine3.valid ? (
                                <span className="text-danger form-text profile_error">
                                  Enter valid Pincode.
                                </span>
                              ) : null}
                            </div>

                            <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                              <Link
                                style={{
                                  backgroundColor: "#231F20",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                to="/client"
                                className="btn btn-cancel border-0 fw-semibold text-uppercase text-white px-3 py-1  m-2"
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
                                className="btn btn-save border-0 fw-semibold text-uppercase text-white px-3 py-1 m-2"
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
      </div>
    </>
  );
}
export default AddAgent;
