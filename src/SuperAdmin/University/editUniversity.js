import React, { useEffect, useState } from "react";
import {getallClient } from "../../api/client";
import Sidebar from "../../compoents/sidebar";
import Flags from 'react-world-flags';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { isValidEmail } from '../../Utils/Validation';
import { FaTrash } from "react-icons/fa";
import { updateUniversity, getSingleUniversity } from "../../api/university";
function Profile() {

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");


  const initialState = {
    banner: "",
    universityLogo: "",
    universityName: "",
    businessName: "",
    country: "",
    campus: "",
    ranking: "",
    averageFees: "",
    popularCategories: "",
    admissionRequirement: "",
    offerTAT: "",
    email: "",
    founded: "",
    institutionType: "",
    costOfLiving: "",
    grossTuition: "",
    applicationFees: "",
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
    universityLogo: { required: false },
    banner: { required: false },
    universityName: { required: false },
    businessName: { required: false },
    email: { required: false, valid: false },
    country: { required: false },
    campus: { required: false },
    ranking: { required: false },
    averageFees: { required: false },
    popularCategories: { required: false },
    admissionRequirement: { required: false },
    offerTAT: { required: false },
    founded: { required: false },
    institutionType: { required: false },
    costOfLiving: { required: false },
    grossTuition: { required: false },
    applicationFees: { required: false },
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
  const [client, setClient] = useState([]);
  const navigate = useNavigate();

  const countryToDetails = {
    "United States": { currency: "USD", flag: "us" },
    "Canada": { currency: "CAD", flag: "ca" },
    "United Kingdom": { currency: "GBP", flag: "gb" },
    "Australia": { currency: "AUD", flag: "au" },
    "India": { currency: "INR", flag: "in" },

  };
  useEffect(() => {
    getUniversityDetails();
    getClientList();
  }, []);
 

  const getClientList = () => {
    getallClient()
      .then((res) => {
        const value = res?.data?.result;
        setClient(value);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getUniversityDetails = () => {
    getSingleUniversity(id)
      .then((res) => {
        setUniversity(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleValidation = (data) => {
    let error = initialStateErrors;
    if (data.universityName === "") {
      error.universityName.required = true;
    }
    if (data.country === "") {
      error.country.required = true;
    }
    if (data.campus === "") {
      error.campus.required = true;
    }
    if (data.businessName === "") {
      error.businessName.required = true;
    } 
    if (data.ranking === "") {
      error.ranking.required = true;
    }
    if (data.averageFees === "") {
      error.averageFees.required = true;
    }
    if (data.popularCategories === "") {
      error.popularCategories.required = true;
    }
    if (data.offerTAT === "") {
      error.offerTAT.required = true;
    }
    if (data.email === "") {
      error.email.required = true;
    }
    if (data.founded === "") {
      error.founded.required = true;
    }
    if (data.institutionType === "") {
      error.institutionType.required = true;
    }
    if (data.costOfLiving === "") {
      error.costOfLiving.required = true;
    }
    if (data.grossTuition === "") {
      error.grossTuition.required = true;
    }
    if (data.applicationFees === "") {
      error.applicationFees.required = true;
    }
    if (!isValidEmail(data.email)) {
      error.email.valid = true;
    }

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

  // const handleInputs = (event) => {
  //   const { name, value } = event.target;

  //   setUniversity((prevUniversity) => {
  //     const updatedUniversity = { ...prevUniversity, [name]: value };


  //     if (name === "countryName") {
  //       const details = countryToDetails[value] || { currency: "", flag: "" };
  //       return { ...updatedUniversity, ...details };
  //     }

  //     return updatedUniversity;
  //   });
  //   if (submitted) {
  //     const newError = handleValidation({ ...university, [name]: value });
  //     setErrors(newError);
  //   }
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const newError = handleValidation(university);
  //   setErrors(newError);
  //   setSubmitted(true);
  //   const allInputsValid = Object.values(newError);
  //   const valid = allInputsValid.some((x) => x.required === true);
  //   if (!valid) {
  //     updateUniversity(university)
  //       .then((res) => {
  //         toast.success(res?.data?.message);
  //         navigate("/ListUniversity");
  //       })
  //       .catch((err) => {
  //         toast.error(err?.response?.data?.message);
  //       });
  //   }
  // };


  const [selectedCampus, setSelectedCampus] = useState([]);
  const [inputCampusValue, setInputCampusValue] = useState("");
  const [selectedPopularCategories, setSelectedPopularCategories] = useState([]);
  const [inputPopularCategoriesValue, setInputPopularCategoriesValue] = useState("");

  const handleInputs = (event) => {
    const { name, value } = event.target;

    setUniversity((university) => {
      const updatedUniversity = { ...university, [name]: value };

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

  const handleCampusInputs = (event) => {
    setInputCampusValue(event.target.value);
  };

  const addCampus = () => {
    const newCampus = inputCampusValue
      .split(",")
      .map((campus) => campus.trim());
    setSelectedCampus([...selectedCampus, ...newCampus]);
    setUniversity((university) => ({
      ...university,
      campus: [...university.campus, ...newCampus],
    }));
    setInputCampusValue("");
  };

  const removeCampus = (indexValue, event) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    const newCampus = selectedCampus.filter((_, i) => i !== indexValue);
    setSelectedCampus(newCampus);
    setUniversity((university) => ({
      ...university,
      campus: newCampus,
    }));
  };

  const handlePopularCategoriesInputs = (event) => {
    setInputPopularCategoriesValue(event.target.value);
  };

  const addPopularCategories = () => {
    const newPopularCategories = inputPopularCategoriesValue
      .split(",")
      .map((category) => category.trim());
    setSelectedPopularCategories([...selectedPopularCategories, ...newPopularCategories]);
    setInputPopularCategoriesValue("");
  };

  const removePopularCategories = (indexValue, event) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    const newPopularCategories = selectedPopularCategories.filter((_, i) => i !== indexValue);
    setSelectedPopularCategories(newPopularCategories);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newError = handleValidation(university);
    setErrors(newError);
    setSubmitted(true);

    const allInputsValid = Object.values(newError).every(error => error.required === false);

    if (allInputsValid) {
      updateUniversity({ ...university, selectedCampus, selectedPopularCategories })
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/ListUniversity");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    } else {
      toast.error("Please fix the validation errors before submitting.");
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans',fontSize: '14px' }}>
      <div class="">
        <div class="">
          <Sidebar />
          
        </div>
      </div>
      <div className="content-wrapper" style={{ backgroundColor: '#fff' }}>
        <div className="content-header ">
          <div className="content container-fluid w-75">
            <form onSubmit={handleSubmit}>
              <div className="content-page-header ">
                <h5 className="text-bold" >
                  EditUniversity
                </h5>
              </div>
              <div className="row">
            
                <div className="col-lg-12 col-md-6 col-sm-12">
                  <div className="upload-img form-group text-center">
                    <label style={{ color: "#231F20" }}>
                      University Logo<span className="text-danger">*</span>
                    </label>
                    <br />
                    <label htmlFor="fileInputImage" className="file-upload">
                      <img src={
                        university?.universityLogo ? university?.universityLogo :
                          "https://wallpapercave.com/wp/wp6837474.jpg"
                      } width="180" height="180" alt="Preview" style={{ objectFit: "cover" }} className="preview-image" />
                    </label>

                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      {" "}
                    Client Name<span className="text-danger">*</span>
                    </label>
                    <select onChange={handleInputs}  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} className="form-select rounded-2 p-2 " name='businessName'>
                      <option value={" "}  disabled hidden >{university?.businessName}</option>
                      {client.map((data, index) =>
                        <option key={index} value={data?.businessName}> {data?.businessName}</option>)}
                    </select>
                    {errors.businessName.required ? (
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
                      University Logo<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter University Logo Link"
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      name="universityLogo"
                      onChange={handleInputs}
                      value={university?.universityLogo}
                    />

                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      {" "}
                      Banner<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter banner Link"
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      name="banner"
                      onChange={handleInputs}
                      value={university?.banner}
                    />

                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      {" "}
                      University Name<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      value={university?.universityName}
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      onChange={handleInputs}
                      className="form-control "
                      placeholder="Enter name"
                      name="universityName"
                    />
                    {errors.universityName.required ? (
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
                      Email<span className="text-danger">*</span>
                    </label>
                    <input
                      value={university?.email}
                      type="text"
                      onChange={handleInputs}
                      className="form-control "
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      placeholder="Enter Email"
                      name="email"
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

                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      Country<span className="text-danger">*</span>
                    </label>
                    <input
                      value={university?.country}
                      onChange={handleInputs}
                      type="text"
                      className="form-control "
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      placeholder="Enter Country "
                      name="country"
                    />
                    {errors.country.required ? (
                      <div className="text-danger form-text">
                        This field is required.
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      Ranking
                    </label>
                    <input
                      type="text"
                      value={university?.ranking}
                      className="form-control "
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      placeholder="Enter Country "
                      name="ranking"
                      onChange={handleInputs}
                    />
                    {errors.ranking.required ? (
                      <div className="text-danger form-text">
                        This field is required.
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group ">

                    <label style={{ color: "#231F20" }}>
                      Campus
                    </label>
                    <div className="d-flex gap-2">
                      <select className="form-control"
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
                        <option value="">Select Campus</option>
                        {Array.isArray(university.campus) &&
                          university.campus.map((campus, index) => (
                            <option key={index} value={campus}>{campus}</option>
                          ))}
                      </select>
                      <input
                        className="form-control"
                        type="text"
                        value={inputCampusValue}
                        style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                        onChange={handleCampusInputs}
                        placeholder="Add Campus"
                      />
                      <button className="btn btn-primary" type="button" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} onClick={addCampus}>Add </button>
                    </div>


                    <ul>
                      {selectedCampus.map((campus, index) => (
                        <li key={index}>
                          {campus}
                          <button className="btn btn-danger" type="button" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} onClick={(event) => removeCampus(index, event)}> <FaTrash className="text-white" /></button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group ">

                    <label style={{ color: "#231F20" }}>
                    PopularCategories
                    </label>
                    <div className="d-flex gap-2">
                      <select className="form-control" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
                        <option value="">Select Categories</option>
                        {Array.isArray(university.popularCategories) &&
                          university.popularCategories.map((popularCategories, index) => (
                            <option key={index} value={popularCategories}>{popularCategories}</option>
                          ))}
                      </select>
                      <input
                        className="form-control"
                        type="text"
                        value={inputPopularCategoriesValue}
                        style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                        onChange={handlePopularCategoriesInputs}
                        placeholder="Add Categories"
                      />
                      <button className="btn btn-primary" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} type="button" onClick={addPopularCategories}>Add </button>
                    </div>


                    <ul>
                      {selectedPopularCategories.map((popularCategories, index) => (
                        <li key={index}>
                          {popularCategories}
                          <button className="btn btn-danger" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} type="button" onClick={(event) => removeCampus(index, event)}> <FaTrash className="text-white" /></button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      Application Fees<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Average Fees"
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      name="applicationFees"
                      value={university?.applicationFees}
                      onChange={handleInputs}
                    />
                    {
                      errors.applicationFees.required ? <div className="text-danger form-text">This field is required.</div> : null
                    }
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      Average Fees<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Average Fees"
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      name="averageFees"
                      value={university?.averageFees}
                      onChange={handleInputs}
                    />
                    {
                      errors.averageFees.required ? <div className="text-danger form-text">This field is required.</div> : null
                    }
                  </div>
                </div>
               
                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      {" "}
                      offerTAT<span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-control"
                      name="offerTAT"
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      onChange={handleInputs}

                    ><option >{university?.offerTAT}</option>
                      <option value={"24 hours"}>24Hours</option>
                      <option value={"One Week"}>One Week</option>
                      <option value={"One Month"}>One Month</option>
                      <option value={"Three Month"}>Three Month</option>
                      <option value={"Six Month"}>Six Month</option>
                    </select>
                    {errors.offerTAT.required ? (
                      <div className="text-danger form-text">
                        This field is required.
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      Founded <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      placeholder="Enter founded"
                      name="founded"
                      value={university?.founded}
                      onChange={handleInputs}
                    />
                    {
                      errors.founded.required ? <div className="text-danger form-text">This field is required.</div> : null
                    }
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      Institution Type <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-control"
                      name="institutionType"
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      onChange={handleInputs}
                    >
                      <option >{university?.institutionType}</option>
                      <option value={"Private"}>Private</option>
                      <option value={"Public"}>Public</option>
                      <option value={"Other"}>Other</option>
                    </select>
                    {
                      errors.institutionType.required ? <div className="text-danger form-text">This field is required.</div> : null
                    }
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      Cost Of living <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter cost of living"
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      name="costOfLiving"
                      value={university?.costOfLiving}
                      onChange={handleInputs}
                    />
                    {
                      errors.costOfLiving.required ? <div className="text-danger form-text">This field is required.</div> : null
                    }
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      Gross Tuition <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter cost of living"
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      name="grossTuition"
                      value={university?.grossTuition}
                      onChange={handleInputs}
                    />
                    {
                      errors.grossTuition.required ? <div className="text-danger form-text">This field is required.</div> : null
                    }
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ color: '#231F20' }} className="class-danger">
                      Payment Method
                    </label>
                    <select className="form-select" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} name="paymentMethod" value={university?.paymentMethod} onChange={handleInputs}>
                      <option value="">{university?.paymentMethod}</option>
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
                          value={university?.amount}
                          type="text"
                          style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px', height: 50 }}
                          placeholder='Enter Ammount'
                          
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
                          value={university?.percentage}
                          style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px', height: 50 }}
                          placeholder='Enter Percentage'
                        
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
                      value={university?.eligibilityForCommission}
                      className="form-control "
                      placeholder="Enter Eligibility for Commission"
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
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
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
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
                        <Flags code={university.flag} value={university.flag} className="me-2" style={{ width: '30px', height: '20px' }} onChange={handleInputs} name='flag' />
                      )}
                      <input className='form-control' type="text"   style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} onChange={handleInputs} name='currency' value={`${university.currency}`} readOnly />
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
                      value={university?.paymentTAT}
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
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
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <option value="">{university?.tax}</option>
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
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      onChange={handleInputs}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <option value={university?.commissionPaidOn}>{university?.commissionPaidOn}</option>
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
                <div className="col-lg-12">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      Admission Requirement <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      placeholder="Enter admission requirements"

                      rows="5" // You can adjust the number of rows as needed
                      onChange={handleInputs}
                      value={university?.admissionRequirement}
                      name="admissionRequirement"
                    ></textarea>
                  </div>
                </div>



                <div className="add-customer-btns mb-40 d-flex justify-content-end w-50 ml-auto">
                  <Link
                    style={{ backgroundColor: "#231F20",fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                    to="/ListUniversity"
                    className="btn btn-cancel border text-white w-50 m-2"
                  >
                    Cancel
                  </Link>
                  <button
                    
                    type="submit"
                    style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px',backgroundColor: "#FE5722" }}
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
export default Profile;
