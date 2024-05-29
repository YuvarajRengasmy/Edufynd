import React, { useEffect, useState } from 'react';
import {getallClient } from "../../api/client";
import { isValidEmail } from '../../Utils/Validation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {getSuperAdminId } from '../../Utils/storage';
import { saveUniversity } from '../../api/university';
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";



function Profile() {

  const initialState = {
    businessName: "",
    banner: "",
    universityLogo: "",
    universityName: "",
    country: "",
    campus: "",
    ranking: "",
    averageFees: "",
    popularCategories: "",
    admissionRequirement: "",
    offerTAT: "", 
    email:"",
    founded: "",
    institutionType: "",
    costOfLiving : "",
    grossTuition: "",
    applicationFees: "",
    

  }

  const initialStateErrors = {
    businessName: { required: false },
    universityLogo: { required: false },
    banner: { required: false },
    universityName: { required: false },
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
    costOfLiving : { required: false },
    grossTuition: { required: false },
    applicationFees: { required: false },
 
  }
  const [university, setUniversity] = useState(initialState)
  const [errors, setErrors] = useState(initialStateErrors)
  const [submitted, setSubmitted] = useState(false);
  const [client, setClient] = useState([]);
  const navigate = useNavigate();

  const handleValidation = (data) => {
    let error = initialStateErrors;
    if (data.universityName === "") {
      error.universityName.required = true;
    }
    if (data.businessName === "") {
      error.businessName.required = true;
    }
    if (data.country === "") {
      error.country.required = true;
    }
    if (data.campus === "") {
      error.campus.required = true;
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
    return error
  }

  useEffect(() => {
   
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
  const handleInputs = (event) => {
    setUniversity({ ...university, [event?.target?.name]: event?.target?.value })
  
    if (submitted) {
      const newError = handleValidation({ ...university, [event.target.name]: event.target.value })
      setErrors(newError)
    }
  }

  
  const [selectedCampus, setSelectedCampus] = useState([]);
  const [inputCampusValue, setInputCampusValue] = useState("");

  const handlecampusInputs = (event) => {
    setInputCampusValue({
      ...inputCampusValue,
      campus: event.target.value,
    });
  };

  const addCampus = () => {
    const newCampus = inputCampusValue.campus
      .split(",")
      .map((serv) => serv.trim());
    setSelectedCampus([...selectedCampus, ...newCampus]);
    setInputCampusValue({ ...inputCampusValue, campus: ""});
  };

  const removeCampus = (indexValue, event) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    const newCampus = selectedCampus.filter((_, i) => i !== indexValue);
    setSelectedCampus(newCampus);
  };
  const [selectedPopularCategories, setSelectedPopularCategories] = useState([]);
  const [inputPopularCategoriesValue, setInputPopularCategoriesValue] = useState("");

  const handlePopularCategoriesInputs = (event) => {
    setInputPopularCategoriesValue({
      ...inputPopularCategoriesValue,
      popularCategories: event.target.value,
    });
  };

  const addPopularCategories = () => {
    const newPopularCategories = inputPopularCategoriesValue.popularCategories
      .split(",")
      .map((serv) => serv.trim());
    setSelectedPopularCategories([...selectedPopularCategories, ...newPopularCategories]);
    setInputPopularCategoriesValue({ ...inputPopularCategoriesValue, popularCategories: ""});
  };

  const removePopularCategories = (indexValue, event) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    const newpoPularCategories = selectedPopularCategories.filter((_, i) => i !== indexValue);
    setSelectedPopularCategories(newpoPularCategories);
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = handleValidation(university);

    if ((isValid)&&selectedCampus.length > 0 ) {
      try {
        const data = {
          universityName: university?.universityName,
          businessName: university?.businessName,
          banner: university?.banner,
          universityLogo: university?.universityLogo,
          country: university?.country,
          popularCategories: selectedPopularCategories,
          campus: selectedCampus,
          
          ranking: university?.ranking,
          averageFees: university?.averageFees,
          
          admissionRequirement: university?.admissionRequirement,
          offerTAT: university?.offerTAT,
          email:university?.email,
          founded: university?.founded,
          institutionType: university?.institutionType,
          costOfLiving : university?.costOfLiving,
          grossTuition: university?.grossTuition,
          applicationFees: university?.applicationFees
        };

        const res = await saveUniversity(data);
        toast.success(res?.data?.message);
        navigate("/Comission");
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || "An error occurred");
      }
    } else {
      console.log("Validation failed");
    }
  };

 

  return (
    <div style={{backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}> 
      <div class="">
        <div class="">
          <Sidebar />
          
        </div>
      </div>
      <div className="content-wrapper" style={{backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '13px' }}>
        <div className="content-header ">
          <div className="content container-fluid w-75">
            <form onSubmit={handleSubmit} >
              <div className="content-page-header">
                <h5 className="text-bold" style={{ color: "#231F20" }}>
                  Add University
                </h5>
              </div>
              <div className="row mt-5">
                {/* <div className="col-lg-12 col-md-6 col-sm-12">
                  <div className="upload-img form-group text-center">
                    <label style={{ color: "#231F20" }}>
                      University Logo<span className="text-danger">*</span>
                    </label>
                    <br />
                    <label htmlFor="fileInputImage" className="file-upload">
                      <img src="https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png" width="180" height="180" alt="Preview" style={{ objectFit: "cover" }} className="preview-image" />
                    </label>
                    <input
              
                      id="fileInputImage"
                      type="file"
                    
                      className="form-control"
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                  </div>
                </div> */}
                  <div className="col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      {" "}
                    Client Name<span className="text-danger">*</span>
                    </label>
                    <select onChange={handleInputs}  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} className="form-select rounded-2 p-2 " name='businessName'>
                      <option value={""} disabled hidden >Select Client</option>
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
                      name="banner"
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      onChange={handleInputs}
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
                      className="form-control "
                      placeholder="Enter name"
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      name="universityName"
                      onChange={handleInputs}
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
                      type="text"
                      className="form-control "
                      placeholder="Enter Email"
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      name="email"
                      onChange={handleInputs}
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
                      type="text"
                      className="form-control "
                      placeholder="Enter Country "
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      name="country"
                      onChange={handleInputs}
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
                      className="form-control "
                      placeholder="Enter Country "
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
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
                      onChange={handleInputs}
                    />
                    {
                      errors.applicationFees.required ? <div className="text-danger form-text">This field is required.</div> : null
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
                    > <option value={"24hours"}>24Hours</option>
                      <option value={"oneweek"}>One Week</option>
                      <option value={"onemonth"}>One Month</option>
                      <option value={"Threemonth"}>Three Month</option>
                      <option value={"sixmonth"}>Six Month</option>
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
                      Average Fees<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Average Fees"
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      name="averageFees"
                      onChange={handleInputs}
                    />
                    {
                      errors.averageFees.required ? <div className="text-danger form-text">This field is required.</div> : null
                    }
                  </div>
                </div>
               
                
                <div className="d-flex">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <label style={{ color: "#9265cc" }}>
                Campus<span className="text-danger">*</span>
                    </label>
                   
                    <select
                      className="form-control"
                      name="campus"
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      onChange={handlecampusInputs}
                    > <option value={""}>selected Campus</option>
                      <option value={"usa"} onClick={addCampus}>USA</option>
                      <option value={"us"} onClick={addCampus}>US</option>
                      <option value={"australia"} onClick={addCampus}>australia</option>
                    </select>
                   
                    {selectedCampus?.length === 0 && submitted && (
                      <span className="text-danger form-text">
                        This field is required.
                      </span>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div>
                      <button
                        type="button"
                        onClick={addCampus}
                        style={{
                          marginTop: "1.8rem",
                          backgroundColor: "#9265cc",
                          fontFamily: 'Plus Jakarta Sans', fontSize: '12px' 
                        }}
                       
                        className="btn text-white"
                      >
                        Add Campus
                      </button>
                    </div>
                  </div>
                </div>
                <div className="d-flex p-2 flex-wrap">
                  {selectedCampus.map((campusadd, index) => (
                    <div
                      className="border rounded btn text-white"
                      style={{ backgroundColor: "#9265cc", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      key={index}
                      
                    >
                      <span>{campusadd}</span>
                      <button
                        onClick={(event) => removeCampus(index, event)}
                        className="btn btn-sm"
                      >
                        <FaTrash className="text-white" />
                      </button>
                    </div>
                  ))}
                 
                </div>

                <div className="d-flex">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <label style={{ color: "#9265cc" }}>
                    PopularCategories<span className="text-danger">*</span>
                    </label>
                   
                    <select
                      className="form-control"
                      name="popularCategories"
                      onChange={handlePopularCategoriesInputs}
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                    > <option value={"ug"}>Select Category</option>
                    <option value={"ug"}>UG</option>
                      <option value={"pg"}>PG</option>
                      <option value={"phd"}>Phd</option>
                      <option value={"ug+pg"}>PG+UG</option>
                      <option value={"other"}>other</option>
                    </select>
                   
                    {selectedPopularCategories?.length === 0 && submitted && (
                      <span className="text-danger form-text">
                        This field is required.
                      </span>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div>
                      <button
                        type="button"
                        onClick={addPopularCategories}
                        style={{
                          marginTop: "1.8rem",
                          backgroundColor: "#9265cc",
                          fontFamily: 'Plus Jakarta Sans', fontSize: '12px' 
                        }}
                       
                        className="btn text-white"
                      >
                        Add Campus
                      </button>
                    </div>
                  </div>
                </div>
                <div className="d-flex p-2 flex-wrap">
                  {selectedPopularCategories.map((popularCategoriesadd, index) => (
                    <div
                      className="border rounded btn text-white"
                      style={{ backgroundColor: "#9265cc",fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      
                      key={index}
                    >
                      <span>{popularCategoriesadd}</span>
                      <button
                        onClick={(event) => removePopularCategories(index, event)}
                        className="btn btn-sm"
                      >
                        <FaTrash className="text-white" />
                      </button>
                    </div>
                  ))}
                 
                </div>

                
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                   Founded <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter founded"
                      name="founded"
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
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
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      name="institutionType"
                      onChange={handleInputs}
                    >
                      <option value={"private"}>Private</option>
                      <option value={"public"}>Public</option>
                      <option value={"other"}>Other</option>
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
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      placeholder="Enter cost of living"
                      name="costOfLiving"
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
                      onChange={handleInputs}
                    />
                    {
                      errors.grossTuition.required ? <div className="text-danger form-text">This field is required.</div> : null
                    }
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      Admission Requirement <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="Enter admission requirements"
                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      rows="5" // You can adjust the number of rows as needed
                      onChange={handleInputs}
                      name="admissionRequirement"
                    ></textarea>
                  </div>
                </div>

                <div className="add-customer-btns mb-40 d-flex justify-content-end w-50 ml-auto">
                  <Link
                    style={{ backgroundColor: "#231F20" ,fontFamily: 'Plus Jakarta Sans', fontSize: '12px'}}
                  
                    to="/ListUniversity"
                    className="btn btn-cancel border text-white w-50 m-2"
                  >
                    Cancel
                  </Link>
                  <button
                    style={{ backgroundColor: "#FE5722", fontFamily: 'Plus Jakarta Sans', fontSize: '12px'  }}
                 
                    type="submit"
                    className="btn btn-save border text-white w-50 m-2"
                  >
                   Save
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
