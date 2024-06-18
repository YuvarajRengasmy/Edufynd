import React, { useEffect, useState } from 'react';
import Flags from 'react-world-flags';
import { toast } from 'react-toastify';
import { updatedProgram,getSingleProgram } from '../../api/Program';
import { getallUniversity } from '../../api/university';
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";



function Profile() {

    const location = useLocation();
    const id = new URLSearchParams(location.search).get("id");
    const initialState = {
    universityName: "",
    universityId: "",
    programTitle: "",
    inTake: "",
    country: "",
    courseType: "",
    applicationFee: "",
    currency: "",
    discountedValue: "",
    campus: "",
    courseFee: "",
    duration: "",
    englishlanguageTest: "",
    textBox: "",
    universityInterview: "",
    greGmatRequirement: "",
    score: "",
    academicRequirement: "",
    commission: "",
    universityLogo: ""
  }

  const initialStateErrors = {
    universityName: { required: false },
    universityId: { required: false },
    country: { required: false },
    programTitle: { required: false },
    inTake: { required: false },
    courseType: { required: false },
    applicationFee: { required: false },
    currency: { required: false },
    discountedValue: { required: false },
    campus: { required: false },
    courseFee: { required: false },
    duration: { required: false },
    englishlanguageTest: { required: false },
    textBox: { required: false },
    universityInterview: { required: false },
    greGmatRequirement: { required: false },
    score: { required: false },
    academicRequirement: { required: false },
    commission: { required: false },
    universityLogo: { required: false }


  }
  const [program, setProgram] = useState(initialState)
  const [errors, setErrors] = useState(initialStateErrors)
  const [submitted, setSubmitted] = useState(false);
  const [university, setUniversity] = useState([]);

  const [selectedCampus, setSelectedCampus] = useState([]);
  const [inputCampusValue, setInputCampusValue] = useState("");
  const [selectedIntake, setSelectedIntake] = useState([]);
  const [inputIntakeValue, setInputIntakeValue] = useState("");
  const [selectedCourseType, setSelectedCourseType] = useState([]);
  const [inputCourseTypeValue, setInputCourseTypeValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllUniversityList()
  }, [])

  const getAllUniversityList = () => {
    getallUniversity().then(res => {
      setUniversity(res?.data?.result)
    }).catch(err => { console.log(err) })
  }
  const handleValidation = (data) => {
    let error = initialStateErrors;
    if (data.universityName === "") {
      error.universityName.required = true;
    }
    if (data.universityId === "") {
      error.universityId.required = true;

    }
    if (data.country === "") {
      error.country.required = true;
    }
   
    if (data.programTitle === "") {
      error.programTitle.required = true;
    }
   
    if (data.applicationFee === "") {
      error.applicationFee.required = true;
    }
    if (data.currency === "") {
      error.currency.required = true;
    }
   

    if (data.courseFee === "") {
      error.courseFee.required = true;
    }
    if (data.duration === "") {
      error.duration.required = true;
    }
    if (data.universityInterview === "") {
      error.universityInterview.required = true;
    }
    if (data.commission === "") {
      error.commission.required = true;
    }
    if (data.universityLogo === "") {
      error.universityLogo.required = true;
    }
    return error
  }

  useEffect(() => {
    getProgramDetails();

  }, []);
const getProgramDetails = () => {
    getSingleProgram(id)
      .then((res) => {
        setProgram(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleInputs = (event) => {
    const { name, value } = event.target;

    setProgram((prevProgram) => {
      const updatedProgram = { ...prevProgram, [name]: value };

      if (name === "country") {
        const details = countryToDetails[value] || { currency: "", flag: "" };
        return { ...updatedProgram, ...details };
      }

      if (name === "universityName") {
        const selectedUniversity = university.find(u => u.universityName === value);
        if (selectedUniversity) {
          return {
            ...updatedProgram,
            universityId: selectedUniversity._id,
            universityLogo: selectedUniversity.universityLogo,
            campus: selectedUniversity.campus,
            courseType: selectedUniversity.popularCategories, // assuming 'popularCategories' is a single value
            country: selectedUniversity.country, // if country is a field in university data
          };
        }
      }


      return updatedProgram;
    });

    if (submitted) {
      const newError = handleValidation({ ...program, [name]: value });
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

  const handleCampusInputs = (e) => {
    setInputCampusValue(e.target.value);
  };

  const addCampus = () => {
    if (inputCampusValue && !selectedCampus.includes(inputCampusValue)) {
      setSelectedCampus([...selectedCampus, inputCampusValue]);
      setInputCampusValue('');
    }
  };

  const removeCampus = (index) => {
    setSelectedCampus(selectedCampus.filter((_, i) => i !== index));
  };
  const handleIntakeInputs = (e) => {
    setInputIntakeValue(e.target.value);
  };

  const addIntake = () => {
    if (inputIntakeValue && !selectedIntake.includes(inputIntakeValue)) {
      setSelectedIntake([...selectedIntake, inputIntakeValue]);
      setInputIntakeValue('');
    }
  };

  const removeIntake = (index) => {
    setSelectedIntake(selectedIntake.filter((_, i) => i !== index));
  };


  const handleCourseTypeInputs = (event) => {
    setInputCourseTypeValue(event.target.value);
  };

  const addCourseType = () => {
    if (inputCourseTypeValue && !selectedCourseType.includes(inputCourseTypeValue)) {
      setSelectedCourseType([...selectedCourseType, inputCourseTypeValue]);
      setInputCourseTypeValue("");
    }
  };

  const removeCourseType = (index) => {
    const newCourseTypeList = [...selectedCourseType];
    newCourseTypeList.splice(index, 1);
    setSelectedCourseType(newCourseTypeList);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(program);
    setErrors(newError);
    setSubmitted(true);
    const allInputsValid = Object.values(newError);
    const valid = allInputsValid.every((x) => x.required === false);
    if (valid) {
        updatedProgram({
        ...program,
        campus: selectedCampus,
        courseType: selectedCourseType,
      })
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/Programs");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };





  return (
    <div style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
      <div class="position-fixed">
        <div class="fixed-element">
          <Sidebar />
          <Header />
        </div>
      </div>
      <div className="content-wrapper" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
        <div className="content-header ">
          <div className="content container-fluid w-75">
            <form onSubmit={handleSubmit} >
              <div className="content-page-header">
                <h5 className="text-bold" style={{ color: "#231F20" }}>
                  Add Program
                </h5>
              </div>

              <div className="row mt-5">

                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      {" "}
                      University Name<span className="text-danger">*</span>
                    </label>
                    <select onChange={handleInputs} value={program?.universityName ?? ""} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} className="form-select rounded-2 p-2 " name='universityName'>
                      <option value={""} disabled hidden >Select University</option>
                      {university.map((data, index) =>
                        <option key={index} value={data?.universityName}> {data?.universityName}</option>)}
                    </select>
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
                      University Id<span className="text-danger">*</span>
                    </label>
                    <select onChange={handleInputs} value={program?.universityId ?? ""} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} className="form-select rounded-2 p-2 " name='universityId'>
                      <option value={""} disabled hidden >Select University</option>
                      {university.map((data, index) =>
                        <option key={index} value={data?.universityId}> {data?.universityName}</option>)}
                    </select>
                    {errors.universityId.required ? (
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
                    <select onChange={handleInputs} value={program?.universityLogo?? ""} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} className="form-select rounded-2 p-2 " name='universityLogo'>
                      <option value={""} disabled hidden >Select University</option>
                      {university.map((data, index) =>
                        <option key={index} value={data?.universityLogo}> {data?.universityName}</option>)}
                    </select>
                    {errors.universityLogo.required ? (
                      <div className="text-danger form-text">
                        This field is required.
                      </div>
                    ) : null}
                  </div>
                </div>


                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      Campus<span className="text-danger">*</span>
                    </label>
                    <div className="d-flex gap-2">
                      <select
                        className="form-control"
                        name="campus"
                        style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                     
                        value={program?.campus ?? ""}
                        onChange={handleCampusInputs}
                      >
                        <option value="">Select Campus</option>
                        {Array.isArray(program?.campus) &&
                          program.campus.map((campus, index) => (
                            <option key={index} value={campus}>
                              {campus}
                            </option>
                          ))}
                      </select>
                      <button
                        className="btn btn-primary"
                        type="button"
                        style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                        onClick={addCampus}
                      >
                        Add
                      </button>
                    </div>

                    <ul>
                      {selectedCampus.map((campus, index) => (
                        <li key={index}>
                          {campus}
                          <button
                            className="btn btn-danger"
                            type="button"
                            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                            onClick={() => removeCampus(index)}
                          >
                            <FaTrash className="text-white" />
                          </button>

                        </li>
                      ))}
                    </ul>
                    {errors.campus.required ? (
                      <div className="text-danger form-text">
                        This field is required.
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      courseType<span className="text-danger">*</span>
                    </label>
                    <div className="d-flex gap-2">
                      <select
                        className="form-control"
                        name="courseType"
                        style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                       value={program?.courseType ?? ""}
                        onChange={handleCourseTypeInputs}
                      >
                        <option value="">Select courseType</option>
                        {Array.isArray(program?.courseType) &&
                          program.courseType.map((courseType, index) => (
                            <option key={index} value={courseType}>
                              {courseType}
                            </option>
                          ))}
                      </select>
                      <button
                        className="btn btn-primary"
                        type="button"
                        style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                        onClick={addCourseType}
                      >
                        Add
                      </button>
                    </div>

                    <ul>
                      {selectedCourseType.map((courseType, index) => (
                        <li key={index}>
                          {courseType}
                          <button
                            className="btn btn-danger"
                            type="button"
                            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                            onClick={() => removeCourseType(index)}
                          >
                            <FaTrash className="text-white" />
                          </button>

                        </li>
                      ))}
                    </ul>
                    {errors.courseType.required ? (
                      <div className="text-danger form-text">
                        This field is required.
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                   InTake<span className="text-danger">*</span>
                    </label>
                    <div className="d-flex gap-2">
                      <select
                        className="form-control"
                        name="inTake"
                        style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                       value={program?.inTake ?? ""}
                        onChange={handleIntakeInputs}
                      >
                        <option value="">Select InTake</option>
                        <option value="summer">Summer</option>
                        <option value="winter">Winter</option>
                        <option value="spring">Spring</option>
                        <option value="fall">Fall</option>
                        {/* {Array.isArray(program?.inTake) &&
                          program.inTake.map((inTake, index) => (
                            <option key={index} value={inTake}>
                              {inTake}
                            </option>
                          ))} */}
                      </select>
                      <button
                        className="btn btn-primary"
                        type="button"
                        style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                        onClick={addIntake}
                      >
                        Add
                      </button>
                    </div>

                    <ul>
                      {selectedIntake.map((inTake, index) => (
                        <li key={index}>
                          {inTake}
                          <button
                            className="btn btn-danger"
                            type="button"
                            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                            onClick={() => removeIntake(index)}
                          >
                            <FaTrash className="text-white" />
                          </button>

                        </li>
                      ))}
                    </ul>
                    {errors.inTake.required ? (
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
                      Program Title<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Country "
                      value={program?.programTitle ?? ""}
                      style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      name="programTitle"
                      onChange={handleInputs}
                    />
                    {errors.programTitle.required ? (
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
                      style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      name="country"
                      value={program?.country ?? ""}
                      onChange={handleInputs}
                    > <option value={""} disabled hidden >Select University</option>
                      {Object.keys(countryToDetails).map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>

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
                      currency
                    </label>
                    <div sm="9" className="d-flex align-items-center">
                        {program.currency && <Flags code={program.currency} className="me-2" style={{ width: '30px', height: '20px' }} />}
                      {program.flag && (
                        <Flags code={program.flag} className="me-2" style={{ width: '30px', height: '20px' }} onChange={handleInputs} name='flag' />
                      )}
                      <input className='form-control' style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} type="text" onChange={handleInputs} name='currency' value={`${program.currency}`} readOnly />
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
                      ApplicationFee<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control "
                      value={program?.applicationFee ?? ""}
                      style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      placeholder="Enter Country "
                      name="applicationFee"
                      onChange={handleInputs}
                    />
                    {errors.applicationFee.required ? (
                      <div className="text-danger form-text">
                        This field is required.
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      DiscountedValue  <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      value={program?.discountedValue ?? ""}
                      style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      className="form-control"
                      placeholder="Enter state"
                      name="discountedValue"
                      onChange={handleInputs}
                    />
                    {
                      errors.discountedValue.required ? <div className="text-danger form-text">This field is required.</div> : null
                    }
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      CourseFees <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      value={program?.courseFee ?? ""}
                      style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      className="form-control"
                      placeholder="Enter courseFees"
                      name="courseFee"
                      onChange={handleInputs}
                    />
                    {
                      errors.courseFee.required ? <div className="text-danger form-text">This field is required.</div> : null
                    }
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      Duration <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      value={program?.duration ?? ""}
                      style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      className="form-control"
                      placeholder="Enter duration"
                      name="duration"
                      onChange={handleInputs}
                    />

                    {
                      errors.duration.required ? <div className="text-danger form-text">This field is required.</div> : null
                    }
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      universityInterview <span className="text-danger">*</span>
                    </label>
                    <select className="form-control" name="universityInterview" value={program?.universityInterview} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} onChange={handleInputs}>
                    <option value="">Select Interview Type</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>

                    {
                      errors.universityInterview.required ? <div className="text-danger form-text">This field is required.</div> : null
                    }
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ color: '#231F20' }} className="col-md-4 col-lg-3 col-form-label">
                      GRE_GMAT_requirement
                    </label>
                    <select className="form-control" value={program?.greGmatRequirement} name="greGmatRequirement" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} onChange={handleInputs}>
                    <option value="">Selected Type</option>
                      <option value="categories">Yes</option>
                      <option value="no">No</option>
                    </select>
                    <br /><br />
                    {program.greGmatRequirement === 'categories' && (
                      <div className="row mb-6">
                        <label style={{ color: '#231F20' }} className="col-md-4 col-lg-3 col-form-label">
                          score
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <textarea
                            name="score"
                            value={program?.score ?? ""}
                            className="form-control"
                            style={{ backgroundColor: '#fff', height: 100, fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                            type="text"

                            onChange={handleInputs}

                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ color: '#231F20' }} className="col-md-4 col-lg-3 col-form-label">
                      englishlanguageTest
                    </label>
                    <select className="form-control" value={program?.englishlanguageTest} name="englishlanguageTest" onChange={handleInputs} >
                    <option value="">Selected Type</option>
                      <option value="categorie">Yes</option>
                      <option value="no">No</option>
                    </select>
                    <br /><br />
                    {program.englishlanguageTest === 'categorie' && (
                      <div className="row mb-6">
                        <label style={{ color: '#231F20' }} className="col-md-4 col-lg-3 col-form-label">
                          textBox
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <textarea
                            name="textBox"
                            value={program?.textBox ?? ""}
                            className="form-control"
                            type="text"
                            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px', height: 100 }}

                            onChange={handleInputs}

                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>




                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      commission <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      value={program?.commission ?? ""}
                      className="form-control"
                      placeholder="Enter cost of living"
                      style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      name="commission"
                      onChange={handleInputs}
                    />
                    {
                      errors.commission.required ? <div className="text-danger form-text">This field is required.</div> : null
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
                      value={program?.admissionRequirement ?? ""}
                      placeholder="Enter admission requirements"
                      style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                      name="academicRequirement"
                      rows="5" // You can adjust the number of rows as needed
                      onChange={handleInputs}

                    ></textarea>
                  </div>
                </div>

                <div className="add-customer-btns mb-40 d-flex justify-content-end w-50 ml-auto">
                  <Link

                    to="/ListUniversity"
                    style={{ backgroundColor: '#231F20', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                    className="btn btn-cancel border text-white w-50 m-2"
                  >
                    Cancel
                  </Link>
                  <button

                    style={{ backgroundColor: '#FE5722', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}

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
export default Profile;
