import React, { useEffect, useState } from "react";
import {
  isValidEmail,
  isValidName,
  isValidPhone,
  isValidWebsite,
  isValidPinCode,
} from "../../Utils/Validation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { saveClient } from "../../api/client";
import { getallClientModule } from "../../api/universityModule/clientModule";
import Sidebar from "../../compoents/sidebar";
import { Link } from "react-router-dom";
import Select from "react-select";
import CountryRegion from "countryregionjs";
import { getallCode } from "../../api/settings/dailcode";
import { getallCountryList } from "../../api/country";

function AddAgent() {
  const initialState = {
    typeOfClient: "",
    businessName: "",
    businessMailID: "",
    businessContactNo: "",
    website: "",
    country: "",
    state: "",
    lga: "",
    dial1: "",
    dial2: "",
    dial3: "",
    addressLine1: "",
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
    dial1: { required: false },
    dial2: { required: false },
    dial3: { required: false },
    country: { required: false },
    state: { required: false },
    lga: { required: false },
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
  const [countriesData, setCountriesData] = useState([]); // Holds country data
  const [states, setStates] = useState([]); // Holds state data
  const [cities, setCities] = useState([]); // Holds city data
  const [selectedCountry, setSelectedCountry] = useState(""); // Selected country
  const [selectedState, setSelectedState] = useState(""); // Selected state
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCountryName, setSelectedCountryName] = useState('');
  const [copyToWhatsApp, setCopyToWhatsApp] = useState(false);
  const [dail1, setDail1] = useState(null);
  const [dail2, setDail2] = useState(null);
  const [dail3, setDail3] = useState(null);
  const [dail4, setDail4] = useState(null);

  // Added state for checkbox
  // Add state for dial code

  const [dial, setDial] = useState([]);

  useEffect(() => {
    getAllClientDetails();
    getallCodeList();
    getAllCountryDetails();
  }, []);

  const getAllCountryDetails = () => {
    getallCountryList()
      .then((res) => {
        setCountriesData(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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

  const navigate = useNavigate();

  const handleValidation = (data) => {
    let error = initialStateErrors;

    if (data.typeOfClient === "") error.typeOfClient.required = true;
    if (data.businessName === "") error.businessName.required = true;
    if (data.businessMailID === "") error.businessMailID.required = true;
    if (data.businessContactNo === "") error.businessContactNo.required = true;
    if (data.website === "") error.website.required = true;
    if (data.addressLine1 === "") error.addressLine1.required = true;
    if (data.name === "") error.name.required = true;
    if (data.contactNo === "") error.contactNo.required = true;
    if (data.emailID === "") error.emailID.required = true;
    if (data.addressLine2 === "") error.addressLine2.required = true;
    if (data.addressLine3 === "") error.addressLine3.required = true;
    if (data.whatsAppNumber === "") error.whatsAppNumber.required = true;
    if (!isValidEmail(data.emailID)) error.emailID.valid = true;
    if (!isValidPhone(data.contactNo)) error.contactNo.valid = true;
    if (!isValidEmail(data.businessMailID)) error.businessMailID.valid = true;
    if (!isValidPhone(data.businessContactNo))
      error.businessContactNo.valid = true;
    if (!isValidPhone(data.whatsAppNumber)) error.whatsAppNumber.valid = true;
    if (!isValidWebsite(data.website)) error.website.valid = true;
    if (!isValidName(data.businessName)) error.businessName.valid = true;
    if (!isValidName(data.name)) error.name.valid = true;
    if (!isValidPinCode(data.addressLine3)) error.addressLine3.valid = true;

    return error;
  };





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
    const { name, value } = event.target;
    const updatedClient = { ...client, [name]: value };

    if (name === "businessContactNo") {
      if (copyToWhatsApp) {
        updatedClient.whatsAppNumber = value; // Use selectedDialCode for WhatsApp number
      }
    }

    setClient(updatedClient);

    if (submitted) {
      const newError = handleValidation(updatedClient);
      setErrors(newError);
    }
  };



  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId);

    // Find the selected country in the countriesData
    const selectedCountryData = countriesData.find(country => country._id === countryId);

    if (selectedCountryData) {
      setStates(selectedCountryData.state); // Set the states for selected country
      setCities([]); // Clear city data if country changes
      setSelectedState('');
      setSelectedCountryName(selectedCountryData.name); // Reset selected state
    }
  };

  // Handle state selection
  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);

    // Find the selected state in the states data
    const selectedStateData = states.find(state => state.name === stateName);

    if (selectedStateData) {
      setCities(selectedStateData.cities);
      setSelectedCity(''); // Set cities for selected state
    }
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);

  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setCopyToWhatsApp(isChecked);
    if (isChecked) {
      setClient((prevClient) => ({
        ...prevClient,
        whatsAppNumber: `${prevClient.businessContactNo}`,
      }));
    } else {
      setClient((prevClient) => ({
        ...prevClient,
        whatsAppNumber: "",
      }));
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

  const handleDail1 = (selectedOptions) => {
    setDail1(selectedOptions);
  };
  const handleDail2 = (selectedOptions) => {
    setDail2(selectedOptions);
  };
  const handleDail3 = (selectedOptions) => {
    setDail3(selectedOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(client);
    setErrors(newError);
    setSubmitted(true);
    const updatedClient = {
      ...client,
      country: selectedCountryName,
      state: selectedState,
      lga: selectedCity,
      dial1: dail1?.value,
      dial2: dail2?.value,
      dial3: dail3?.value,
    };
    if (handleErrors(newError)) {
      saveClient(updatedClient)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/list_client");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    } else {
      toast.error("Please fill mandatory fields");
    }
  };

  const dialOptions = dial.map((data) => ({
    value: data.dialCode,
    label: `${data.dialCode} - ${data.name}`,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "1 solid rgba(11, 70, 84, 0.25)",
      borderRadius: "4px",
      fontSize: "12px",
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
      <Sidebar />

      <div
        className="content-wrapper "
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "13px" }}
      >
        <div className="content-header ">
          <div className="container-fluid ">
            <div className="row">
              <div className="col-xl-12 ">
                <div className="card  border-0 rounded-1 shadow-sm p-3 position-relative">
                  <div
                    className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0"
                    style={{ background: "#fe5722", color: "#fff" }}
                  >
                    <h6 className="text-center text-capitalize p-1">
                      {" "}
                      Add Client Details
                    </h6>
                  </div>
                  <div className="card-body mt-5">
                    <form onSubmit={handleSubmit}>
                      <div className="row g-3">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Type of Client{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <div className="">
                            <select
                              onChange={handleInputs}
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              className={`form-select form-select-lg rounded-1`}
                              name="typeOfClient"
                            >
                              <option value={""}>Select Client Type</option>
                              {type.map((data, index) => (
                                <option key={index} value={data?.typeOfClient}>
                                  {" "}
                                  {data?.typeOfClient}
                                </option>
                              ))}
                            </select>
                            {errors.typeOfClient.required && (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Business Name
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            name="businessName"
                            onChange={handleInputs}
                            className={`form-control rounded-1 text-capitalize ${errors.businessName.required ? "is-invalid" : errors.businessName.valid ? "is-valid" : ""
                              }`}
                            placeholder="Example John Doe"
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
                          {errors.businessName.required && (
                            <div className="text-danger form-text profile_error">
                              This field is required.
                            </div>
                          )}
                        </div>



                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Business Website
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control rounded-1 text-lowercase ${
                              errors.website.required? "is-invalid": errors.website.valid? "is-valid" : ""
                            }`}
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example www.edufynd.com"
                            name="website"
                            onChange={handleInputs}
                          />
                          {errors.website.required && (
                            <span className="text-danger form-text profile_error">
                              This field is required.
                            </span>
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
                            className={`form-control rounded-1 text-lowercase ${errors.businessMailID.required
                                ? "is-invalid"
                                : errors.businessMailID.valid
                                  ? "is-valid"
                                  : ""
                              }`}
                            placeholder="Example john123@gmail.com"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            name="businessMailID"
                            onChange={handleInputs}
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

                          {errors.businessMailID.required && (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          )}
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Business Primary Number
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
                                    maxWidth: "140px",
                                  }),
                                }}
                              />
                              <input
                                type="text"
                                aria-label="Text input with dropdown button"
                                className={`form-control  ${errors.businessContactNo.required
                                    ? "is-invalid"
                                    : errors.businessContactNo.valid
                                      ? "is-valid"
                                      : ""
                                  }`}
                                placeholder="Example 123-456-7890"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                  maxHeight: "100px",
                                }}
                                name="businessContactNo"
                                value={client.businessContactNo}
                                onChange={handleInputs}
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
                            </div>

                            <div className="form-check ms-3 ">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="copyToWhatsApp"
                                checked={copyToWhatsApp}
                                onChange={handleCheckboxChange}
                              />
                            </div>
                          </div>
                          {errors.businessContactNo.required && (
                            <span className="text-danger form-text profile_error">
                              This field is required.
                            </span>
                          )}
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Business WhatsApp Number
                            <span className="text-danger">*</span>
                          </label>
                          <div className="input-group mb-3">
                            <Select
                              value={dail2}
                              options={dialOptions}
                              placeholder="code"
                              name="dial2"
                              onChange={handleDail2}
                              styles={{
                                container: (base) => ({
                                  ...base,
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                  maxWidth: "140px",
                                }),
                              }}
                            />

                            <input
                              type="text"
                              className={`form-control rounded-1 ${errors.whatsAppNumber.required
                                  ? "is-invalid"
                                  : errors.whatsAppNumber.valid
                                    ? "is-valid"
                                    : ""
                                }`}
                              placeholder="Example 123-456-7890"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name="whatsAppNumber"
                              value={client.whatsAppNumber}
                              onChange={handleInputs}
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
                          </div>
                          {errors.whatsAppNumber.required && (
                            <span className="text-danger form-text profile_error">
                              This field is required.
                            </span>
                          )}
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Staff Name<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control rounded-1 text-capitalize ${errors.name.required
                                ? "is-invalid"
                                : errors.name.valid
                                  ? "is-valid"
                                  : ""
                              }`}
                            placeholder="Example Jane Doe"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            name="name"
                            onChange={handleInputs}
                            onKeyDown={(e) => {
                              // Prevent non-letter characters
                              if (/[^a-zA-Z\s]/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                          {errors.name.required && (
                            <div className="text-danger form-text profile_error">
                              This field is required.
                            </div>
                          )}
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Staff Email ID
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control rounded-1 text-lowercase  ${errors.emailID.required
                                ? "is-invalid"
                                : errors.emailID.valid
                                  ? "is-valid"
                                  : ""
                              }`}
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example janedoe123@gmail.com"
                            name="emailID"
                            onChange={handleInputs}
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
                          {errors.emailID.required && (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          )}
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Staff ContactNo
                            <span className="text-danger">*</span>
                          </label>
                          <div className="input-group mb-3">
                            <Select
                              value={dail3}
                              options={dialOptions}
                              placeholder="code"
                              name="dial3"
                              onChange={handleDail3}
                              styles={{
                                container: (base) => ({
                                  ...base,
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                  maxWidth: "140px",
                                }),
                              }}
                            />

                            <input
                              type="text"
                              className={`form-control rounded-1 ${errors.contactNo.required
                                  ? "is-invalid"
                                  : errors.contactNo.valid
                                    ? "is-valid"
                                    : ""
                                }`}
                              placeholder="Example 123-456-7890"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name="contactNo"
                              value={client.contactNo}
                              onChange={handleInputs}
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
                          </div>
                          {errors.contactNo.required && (
                            <span className="text-danger form-text profile_error">
                              This field is required.
                            </span>
                          )}
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Address Line1
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control rounded-1 text-capitalize ${errors.addressLine1.required ? "is-invalid" : ""
                              }`}
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example 17/3A2, Gandhi St,"
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
                            className={`form-control rounded-1 text-capitalize${errors.addressLine2.required ? "is-invalid" : ""
                              }`}
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example Alwartirunagar, Chennai "
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
                            Pincode<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control rounded-1 text-capitalize ${errors.addressLine3.required
                                ? "is-invalid"
                                : errors.addressLine3.valid
                                  ? "is-valid"
                                  : ""
                              }`}
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example 600087"
                            name="addressLine3"
                            onChange={handleInputs}
                          />
                          {errors.addressLine3.required && (
                            <span className="text-danger form-text profile_error">
                              This field is required.
                            </span>
                          )}
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            {" "}
                            Country<span className="text-danger">*</span>
                          </label>
                          <select
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            className={`form-select form-select-lg rounded-1`}
                            value={selectedCountry}
                            onChange={handleCountryChange}
                          >
                            <option value="">Select a country</option>
                            {countriesData.map((country) => (
                              <option key={country._id} value={country._id}>
                                {country.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            State<span className="text-danger">*</span>
                          </label>
                          <select
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            className={`form-select form-select-lg rounded-1`}
                            value={selectedState}
                            onChange={handleStateChange}
                            disabled={!selectedCountry}
                          >
                            <option value="">Select a state</option>
                            {states.map((state) => (
                              <option key={state.name} value={state.name}>
                                {state.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            City<span className="text-danger">*</span>
                          </label>

                          <select
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            className={`form-select form-select-lg rounded-1`}
                            value={selectedCity} onChange={handleCityChange} disabled={!selectedState}
                          >
                            <option value="">Select a city</option>
                            {cities.map((city, index) => (
                              <option key={index} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                          <Link
                            style={{
                              backgroundColor: "#231F20",
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            to="/list_client"
                            className="btn btn-cancel border-0 fw-semibold text-uppercase text-white px-4 py-2  m-2"
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
                            className="btn btn-save border-0 fw-semibold text-uppercase text-white px-4 py-2 m-2"
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
