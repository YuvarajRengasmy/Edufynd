import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import Flags from 'react-world-flags';
import { toast } from 'react-toastify';
import { updatedProgram,getSingleProgram } from '../../api/Program';
import { getallUniversity } from '../../api/university';
import Sidebar from "../../compoents/sidebar";
import Select from 'react-select';




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
  const [selectedIntake, setSelectedIntake] = useState([]);
  const [selectedCourseType, setSelectedCourseType] = useState([]);
  const [selectedCampuses, setSelectedCampuses] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getAllUniversityList();
    getProgramDetails();
  }, [])

  const getAllUniversityList = () => {
    getallUniversity().then(res => {
      setUniversity(res?.data?.result)
    }).catch(err => { console.log(err) })
  }
 
const getProgramDetails = () => {
    getSingleProgram(id)
      .then((res) => {
        setProgram(res?.data?.result);
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
    if (data.universityId === "") {
      error.universityId.required = true;

    }
    if (data.country === "") {
      error.country.required = true;
    }
    // if (data.courseType === "") {
    //   error.courseType.required = true;
    // }
    if (data.programTitle === "") {
      error.programTitle.required = true;
    }
    // if (data.inTake === "") {
    //   error.inTake.required = true;
    // }
    if (data.applicationFee === "") {
      error.applicationFee.required = true;
    }
    if (data.currency === "") {
      error.currency.required = true;
    }
    // if (data.campus === "") {
    //   error.campus.required = true;
    // }

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


  // const handleSelectChange = (selectedOptions) => {
  //   setSelectedCampuses(selectedOptions);


  // };
  // const handleSelectCourseChange = (selectedOptions) => {
  //   setSelectedCourseType(selectedOptions)

  // };
  // const handleSelectIntake = (selectedOptions) => {
  //   setSelectedIntake(selectedOptions)

  // };
  const  handleSelectChange = (selectedOptions, action) => {
    const { name } = action;
    const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setProgram({ ...program, [name]: values });

  };
  const handleSelectCourseChange = (selectedOptions, action) => {
    const { name } = action;
    const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setProgram({ ...program, [name]: values });

  };

  const handleSelectIntake = (selectedOptions, action) => {
    const { name } = action;
    const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setProgram({ ...program, [name]: values });

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

  const campusOptions = program?.campus ? program.campus.map(campus => ({ value: campus, label: campus })) : []
  const courseTypeOptions = program?.courseType ? program.courseType.map(courseType => ({ value: courseType, label: courseType })) : []
  // const inTakeOptions = program?.inTake ? program.inTake.map(inTake => ({ value: inTake, label: inTake })) : []
  const inTakeOptions = [
    { value: 'summer', label: 'Summer' },
    { value: 'Winder', label: 'Winder' },
    { value: 'spring', label: 'spring' },
    { value: 'fall', label: 'fall' }

  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(program);
    setErrors(newError);
    setSubmitted(true);
    const allInputsValid = Object.values(newError);
    const valid = allInputsValid.every((x) => x.required === false);
    if (valid) {
      updatedProgram(program)
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
      <div class="container-fluid">
        <nav class="navbar navbar-vertical navbar-expand-lg">
          <Sidebar />

        </nav>
    
      <div className="content-wrapper me-5" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
        <div className="content-header ">
          <div className="content container-fluid">
            <form onSubmit={handleSubmit} >
              <div className='row'>
                <div className="col-xl-12 ">
                  <div className="card rounded-1 border-0 ">
                    <div className="card-header justify-content-between d-sm-flex d-block " style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                      <div className="card-title" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '16px' }}>
                        University Details :
                      </div>

                    </div>
                    <div className="card-body">

                    <div className="row gy-4">

                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                        <label style={{ color: "#231F20" }}>
                          {" "}
                          University Name<span className="text-danger">*</span>
                        </label>
                        <select onChange={handleInputs} value={program?.universityName ?? ""} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} className="form-select rounded-2 p-2 " name='universityName'>
                          <option value={""} disabled hidden style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} >Select University</option>
                          {university.map((data, index) =>
                            <option key={index} value={data?.universityName} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}> {data?.universityName}</option>)}
                        </select>
                        {errors.universityName.required ? (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        ) : null}

                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                        <label style={{ color: "#231F20" }}>
                          {" "}
                          University Id<span className="text-danger">*</span>
                        </label>
                        <select onChange={handleInputs} value={program?.universityName ?? ""} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} className="form-select rounded-2 p-2 " name='universityId'>
                          <option value={""} disabled hidden style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} >Select UniversityId</option>
                          {university.map((data, index) =>
                            <option key={index} value={data?.universityId} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}> {data?.universityName}</option>)}
                        </select>
                        {errors.universityId.required ? (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        ) : null}

                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                        <label style={{ color: "#231F20" }} >
                          {" "}
                          University Logo<span className="text-danger">*</span>
                        </label>
                        <select onChange={handleInputs} value={program?.universityName ?? ""} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} className="form-select rounded-2 p-2 " name='universityLogo'>
                          <option value={""} disabled hidden style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>University Logo</option>
                          {university.map((data, index) =>
                            <option key={index} value={data?.universityId} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}> {data?.universityName}</option>)}
                        </select>
                        {errors.universityId.required ? (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        ) : null}

                      </div>




                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                        <label style={{ color: "#231F20" }}>
                          Campus<span className="text-danger">*</span>
                        </label>


                        <Select
                          isMulti
                         
                          value={program?.campus ? program?.campus.map(campus => ({ value: campus, label: campus })) : null}
                          options={campusOptions}
                          placeholder="Select Campus"
                          name="campus"
                          onChange={ handleSelectChange}
                          styles={{ container: base => ({ ...base, fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }) }}
                        />


                        {errors.campus.required ? (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        ) : null}

                      </div>


                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                        <label style={{ color: "#231F20" }}>
                          InTake<span className="text-danger">*</span>
                        </label>

                        <Select
                          isMulti
                          // value={selectedIntake}
                          value={program?.inTake ? program?.inTake.map(inTake => ({ value: inTake, label: inTake })) : null}

                          options={inTakeOptions}
                          placeholder="Select InTake"
                          name="inTake"
                          onChange={handleSelectIntake}
                          styles={{ container: base => ({ ...base, fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }) }}
                        />
                        {errors.inTake.required ? (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        ) : null}

                      </div>

                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                        <label style={{ color: "#231F20" }}>
                          University Interview <span className="text-danger">*</span>
                        </label>
                        <select className="form-control" name="universityInterview" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} onChange={handleInputs}>
                          <option value="">{program?.universityInterview}</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>

                        {
                          errors.universityInterview.required ? <div className="text-danger form-text">This field is required.</div> : null
                        }

                      </div>


                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

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
                        > <option value={""} disabled hidden >{program?.country}</option>
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
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                        <label style={{ color: "#231F20" }}>
                          Currency
                        </label>
                        <div sm="9" className="d-flex align-items-center">
                          {program.flag && (
                            <Flags code={program.flag} value={program.flag} className="me-2" style={{ width: '30px', height: '20px' }} onChange={handleInputs} name='flag' />
                          )}
                          <input className='form-control'  placeholder='Autofetch currency' style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} type="text" onChange={handleInputs} name='currency' value={`${program.currency}`} readOnly />
                        </div>
                        {errors.currency.required ? (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        ) : null}

                      </div>
                      <div className="card-header justify-content-between d-sm-flex d-block " style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                        <div className="card-title" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '16px' }}>
                          Program Details :
                        </div>

                      </div>

                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                        <label style={{ color: "#231F20" }}>
                          {" "}
                          Program Title<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control "
                          value={program?.programTitle ?? ""}
                          placeholder="Enter Program Title "
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


                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                        <label style={{ color: "#231F20" }}>
                          Course Type<span className="text-danger">*</span>
                        </label>


                        <Select
                          isMulti
                          // value={selectedCourseType}
                          value={program?.courseType ? program?.courseType.map(courseType => ({ value: courseType, label: courseType })) : null}

                          options={courseTypeOptions}
                          placeholder="Select courseType"
                          name="courseType"
                          onChange={handleSelectCourseChange}
                          styles={{ container: base => ({ ...base, fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }) }}
                        />


                        {errors.courseType.required ? (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        ) : null}

                      </div>

                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                        <label style={{ color: "#231F20" }}>
                          Course Fees <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                          className="form-control"
                          value={program?.courseFee ?? ""}
                          placeholder="Enter courseFees"
                          name="courseFee"
                          onChange={handleInputs}
                        />
                        {
                          errors.courseFee.required ? <div className="text-danger form-text">This field is required.</div> : null
                        }

                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                        <label style={{ color: "#231F20" }}>
                          Duration <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                          className="form-control"
                          value={program?.duration ?? ""}
                          placeholder="Enter duration"
                          name="duration"
                          onChange={handleInputs}
                        />

                        {
                          errors.duration.required ? <div className="text-danger form-text">This field is required.</div> : null
                        }

                      </div>


                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">

                        <label style={{ color: "#231F20" }}>
                          {" "}
                          Application Fee<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control "
                          style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                          placeholder="Enter Application Fee"
                          value={program?.applicationFee ?? ""}
                          name="applicationFee"
                          onChange={handleInputs}
                        />
                        {errors.applicationFee.required ? (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        ) : null}

                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                        <label style={{ color: "#231F20" }}>
                          Discounted Value  <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                          className="form-control"
                          placeholder="Enter DiscountedValue"
                          value={program?.discountedValue ?? ""}
                          name="discountedValue"
                          onChange={handleInputs}
                        />
                        {
                          errors.discountedValue.required ? <div className="text-danger form-text">This field is required.</div> : null
                        }

                      </div>


                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                        <label style={{ color: "#231F20" }}>
                          Commission <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={program?.commission ?? ""}
                          placeholder="Enter a Comission"
                          style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                          name="commission"
                          onChange={handleInputs}
                        />
                        {
                          errors.commission.required ? <div className="text-danger form-text">This field is required.</div> : null
                        }

                      </div>


                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                        <label style={{ color: '#231F20' }} className="">
                          GRE_GMAT_requirement
                        </label>
                        <select className="form-control" name="greGmatRequirement" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} onChange={handleInputs}>
                          <option value="">{program?.greGmatRequirement ?? ""}</option>
                          <option value="categories">Yes</option>
                          <option value="no">No</option>
                        </select>
                        <br /><br />
                        {program.greGmatRequirement === 'categories' && (
                          <div className="row mb-6">
                            <label style={{ color: '#231F20' }} className="col-md-4 col-lg-3 col-form-label">
                              Score
                            </label>
                            <div className="col-md-8 col-lg-9">
                              <textarea
                                name="score"
                                className="form-control"
                                value={program?.score ?? ""}
                                placeholder='Enter score'
                                style={{ backgroundColor: '#fff', height: 100, fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                type="text"

                                onChange={handleInputs}

                              />
                            </div>
                          </div>
                        )}

                      </div>

                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                        <label style={{ color: '#231F20' }} className="">
                          English Language Test
                        </label>
                        <select className="form-control" name="englishlanguageTest" onChange={handleInputs} >
                          <option value="">{program?.englishlanguageTest ?? ""}</option>
                          <option value="categorie">Yes</option>
                          <option value="no">No</option>
                        </select>
                        <br /><br />
                        {program.englishlanguageTest === 'categorie' && (
                          <div className="row mb-6">
                            <label style={{ color: '#231F20',fontSize:'12px' }} className="col-md-4 col-lg-3 col-form-label">
                              TextBox
                            </label>
                            <div className="col-md-8 col-lg-9">
                              <textarea
                                name="textBox"
                                value={program?.textBox ?? ""}
                                placeholder='Enter textBox'
                                className="form-control"
                                type="text"
                                style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px', height: 100 }}

                                onChange={handleInputs}

                              />
                            </div>
                          </div>
                        )}

                      </div>





                      <div className="col-xl-12 col-lg-6 col-md-6 col-sm-12">

                        <label style={{ color: "#231F20" }}>
                          Admission Requirement <span className="text-danger">*</span>
                        </label>
                        <textarea
                          className="form-control"
                          placeholder="Enter Admission Requirements"
                          value={program?.academicRequirement ?? ""}
                          style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                          name="academicRequirement"
                          rows="5" // You can adjust the number of rows as needed
                          onChange={handleInputs}

                        ></textarea>

                      </div>

                      <div className="add-customer-btns mb-40 d-flex justify-content-end w-50 ml-auto">
                        <Link

                          to="/ListUniversity"
                          style={{ backgroundColor: '#231F20', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                          className="btn btn-cancel border-0 text-white w-50 m-2"
                        >
                          Cancel
                        </Link>
                        <button

                          style={{ backgroundColor: '#FE5722', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}

                          type="submit"
                          className="btn btn-save border-0 text-white w-50 m-2"
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
  );
}
export default Profile;
