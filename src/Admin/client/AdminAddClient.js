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
import Sidebar from "../../compoents/AdminSidebar";
import { Link } from "react-router-dom";
import Select from "react-select";
import CountryRegion from "countryregionjs";

export const AdminAddClient = () => {
  const initialState = {
    typeOfClient: "",
    businessName: "",
    businessMailID: "",
    businessContactNo: "",
    website: "",
    country: "",
    state: "",
    lga: "",
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
  const [state, setState] = useState("");
  const [states, setStates] = useState([]);
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [lga, setLGA] = useState("");
  const [lgas, setLGAs] = useState([]);

  useEffect(() => {
    getAllClientDetails();
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
    const { name, value } = event.target;
    const updatedClient = { ...client, [name]: value };

    setClient(updatedClient);

    if (submitted) {
      const newError = handleValidation(updatedClient);
      setErrors(newError);
    }
  };

  const getCountryRegionInstance = () => {
    return new CountryRegion();
  };

  useEffect(() => {
    const getCountries = async () => {
      try {
        const countries = await getCountryRegionInstance().getCountries();
        setCountries(
          countries.map((country) => ({
            value: country.id,
            label: country.name,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };
    getCountries();
  }, []);

  useEffect(() => {
    const getStates = async () => {
      try {
        const states = await getCountryRegionInstance().getStates(country);
        setStates(
          states.map((userState) => ({
            value: userState?.id,
            label: userState?.name,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };
    if (country) {
      getStates();
    }
  }, [country]);

  useEffect(() => {
    const getLGAs = async () => {
      try {
        const lgas = await getCountryRegionInstance().getLGAs(country, state);
        setLGAs(
          lgas?.map((lga) => ({
            value: lga?.id,
            label: lga?.name,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };
    if (state) {
      getLGAs();
    }
  }, [country, state]);

  const handleCountryChange = (selectedOption) => {
    setCountry(selectedOption.value);

    setState("");
    setStates([]);
    setLGA("");
    setLGAs([]);
  };
  const handleStateChange = (selectedOptions) => {
    setState(selectedOptions.value);
    // setSelectedLGAs([]);
    setLGA("");
    setLGAs([]);
  };
  const handleLGAChange = (selectedOptions) => {
    setLGA(selectedOptions.value);
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
    const updatedClient = {
      ...client,
      country: countries.find((option) => option.value === country)?.label,
      state: states.find((option) => option.value === state)?.label,
      lga: lgas.find((option) => option.value === lga)?.label,
    };
    if (handleErrors(newError)) {
      saveClient(updatedClient)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/client");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    } else {
      toast.error("Please fill mandatory fields");
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "1.4783px solid rgba(11, 70, 84, 0.25)",
      borderRadius: "4.91319px",
      fontSize: "11px",
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
      <div>
        <Sidebar />

        <div
          className="content-wrapper "
          style={{ fontFamily: "Plus Jakarta Sans", fontSize: "13px" }}
        >
          <div className="content-header ">
            <div className="container ">
              <div className="row">
                <div className="col-xl-12 ">
                  <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
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
                                className="form-select form-select-lg rounded-2  "
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
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name="businessName"
                              onChange={handleInputs}
                              className="form-control  "
                              placeholder="Example John Doe"
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
                              Business Website
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control "
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
                              className="form-control "
                              placeholder="Example john123@gmail.com"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
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
                              Business Primary Number{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Example 123-456-7890 "
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
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
                              Business WhatsApp Number
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              placeholder="Example 123-456-7890"
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
                              Staff Name<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control "
                              placeholder="Example Jane Doe"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
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
                              Staff Email ID
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control "
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              placeholder="Example janedoe123@gmail.com"
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
                              Staff Contact Number
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="number"
                              className="form-control "
                              placeholder="Example 123-456-7890"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
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
                              Address Line1
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
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
                              className="form-control "
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
                              className="form-control "
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              placeholder="Example 600087"
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
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              {" "}
                              Country<span className="text-danger">*</span>
                            </label>

                            <Select
                              placeholder="Select  Country"
                              onChange={handleCountryChange}
                              options={countries}
                              name="country"
                              styles={customStyles}
                              value={countries.find(
                                (option) => option.value === country
                              )}
                              className="submain-one-form-body-subsection-select "
                            />
                            {errors.country.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              State<span className="text-danger">*</span>
                            </label>

                            <Select
                              placeholder="Select  State"
                              onChange={handleStateChange}
                              options={states}
                              name="state"
                              styles={customStyles}
                              value={states.find(
                                (option) => option.value === state
                              )}
                              className="submain-one-form-body-subsection-select"
                            />

                            {errors.state.required && (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            )}
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              City<span className="text-danger">*</span>
                            </label>

                            <Select
                              placeholder="Select  City"
                              value={lgas.find(
                                (option) => option.value === lga
                              )}
                              onChange={handleLGAChange}
                              options={lgas}
                              name="lga"
                              styles={customStyles}
                              className="submain-one-form-body-subsection-select"
                            />
                          </div>

                          <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                            <Link
                              style={{
                                backgroundColor: "#231F20",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              to="/client"
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
      </div>
    </>
  );
};
export default AdminAddClient;
