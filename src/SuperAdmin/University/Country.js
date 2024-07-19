import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { updatedProgram, getSingleProgram } from "../../api/Program";
import { getallUniversity } from "../../api/university";
import { getallCurrency } from "../../api/currency";
import { getUniversitiesByCountry } from "../../api/university";
import { Link } from "react-router-dom";
import Select from "react-select";
import Sidebar from "../../compoents/sidebar";

function Profile() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const initialState = {
    universityName: "",
    universityId: "",
    programTitle: "",
    country: "",
    courseType: "",
    applicationFee: "",
    currency: "",
    discountedValue: "",
    englishlanguageTest: "",
    textBox: "",
    universityInterview: "",
    greGmatRequirement: "",
    score: "",
    academicRequirement: "",
    universityLogo: "",
    campuses: [{ id: 1, campus: "", inTake: "", duration: "", courseFees: "" }],
  };

  const initialStateErrors = {
    universityName: { required: false },
    universityId: { required: false },
    country: { required: false },
    programTitle: { required: false },
    courseType: { required: false },
    applicationFee: { required: false },
    currency: { required: false },
    discountedValue: { required: false },
    englishlanguageTest: { required: false },
    textBox: { required: false },
    universityInterview: { required: false },
    greGmatRequirement: { required: false },
    score: { required: false },
    academicRequirement: { required: false },
    universityLogo: { required: false },
  };
  const [program, setProgram] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [countries, setCountries] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [selectedCourseType, setSelectedCourseType] = useState([]);
  const [campuses, setCampuses] = useState([]);

  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getAllCurrencyDetails();
    getProgramDetails();
  }, []);

  const getProgramDetails = () => {
    getSingleProgram(id)
      .then((res) => {
        const fetchedProgram = res?.data?.result;
        setProgram(fetchedProgram);
        fetchCountryDetails(fetchedProgram.country);
        getUniversitiesByCountry(fetchedProgram.country).then((res) => {
          setUniversities(res?.data?.result || []);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllCurrencyDetails = () => {
    getallCurrency()
      .then((res) => {
        setCountries(res?.data?.result);
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
    if (data.programTitle === "") {
      error.programTitle.required = true;
    }
    if (data.applicationFee === "") {
      error.applicationFee.required = true;
    }
    if (data.currency === "") {
      error.currency.required = true;
    }
    if (data.universityInterview === "") {
      error.universityInterview.required = true;
    }
    if (data.universityLogo === "") {
      error.universityLogo.required = true;
    }
    return error;
  };

  const addCampus = () => {
    setProgram({
      ...program,
      campuses: [
        ...program.campuses,
        {
          campus: "",
          inTake: "",
          courseFees: "",
          duration: "",
          englishlanguageTest: "",
          textBox: "",
        },
      ],
    });
  };

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setProgram({ ...program, country: selectedCountry });

    getUniversitiesByCountry(selectedCountry)
      .then((res) => {
        setUniversities(res?.data?.result || []);
      })
      .catch((err) => {
        console.error(`Error fetching universities for ${selectedCountry}:`, err);
        setUniversities([]);
      });

    fetchCountryDetails(selectedCountry);
  };

  const fetchCountryDetails = (selectedCountry) => {
    const selectedCountryData = countries.find((c) => c.country === selectedCountry);
    if (selectedCountryData) {
      setProgram((prevState) => ({
        ...prevState,
        currency: selectedCountryData.currency,
        flag: selectedCountryData.flag,
      }));
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedCampuses = [...program.campuses];
    updatedCampuses[index][field] = value;
    setProgram({ ...program, campuses: updatedCampuses });
  };

  const handleInputs = (event) => {
    const { name, value } = event.target;

    setProgram((prevProgram) => {
      const updatedProgram = { ...prevProgram, [name]: value };

      if (name === "universityName") {
        const selectedUniversity = universities.find((u) => u.universityName === value);
        if (selectedUniversity) {
          return {
            ...updatedProgram,
            universityId: selectedUniversity._id,
            universityName: selectedUniversity.universityName,
            universityLogo: selectedUniversity.universityLogo,
            state: selectedUniversity.state,
            lga: selectedUniversity.lga,
            courseType: selectedUniversity.courseType,
            country: selectedUniversity.country,
            inTake: selectedUniversity.inTake,
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

  const handleSelectCourseChange = (selectedOptions) => {
    setSelectedCourseType(selectedOptions);
  };

  const campusOptions = program?.state
    ? program.state.map((state) => ({ value: state, label: state }))
    : [];
  const lgaOptions = program?.lga && program.lga.length > 0
    ? program.lga.map((lga) => ({ value: lga, label: lga }))
    : [];
  const optionsToRender = lgaOptions.length > 0 ? lgaOptions : campusOptions;
  const inTakeOptions = program?.inTake
    ? program.inTake.map((inTake) => ({ value: inTake, label: inTake }))
    : [];
        const courseTypeOptions = program?.courseType ? program.courseType.map(courseType => ({ value: courseType, label: courseType })) : [];


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
    const newError = handleValidation(program);
    setErrors(newError);
    setSubmitted(true);
    if (handleErrors(newError)) {
      updatedProgram({
        ...program,
        campuses: campuses,
        courseType: selectedCourseType?.label,
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
    <>
    <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
      <div className="container-fluid">
        <nav className="navbar navbar-vertical navbar-expand-lg">
          <Sidebar />
        </nav>

        <div className="content-wrapper" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
          <div className="content-header">
            <div className="content container-fluid">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-xl-12">
                    <div className="card border-0 rounded-0 shadow-sm p-3 position-relative">
                      <div
                        className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0"
                        style={{ background: "#fe5722", color: "#fff" }}
                      >
                        <h5 className="text-center text-capitalize p-1">
                          Add Program Details
                        </h5>
                      </div>
                      <div className="card-body mt-5">
                        <div className="row g-3">
                          <div className="col-xl-3">
                            <div className="form-group">
                              <label htmlFor="universityName">University Name <span className="text-danger">*</span></label>
                              <select
                                name="universityName"
                                id="universityName"
                                className="form-select form-select-sm"
                                value={program.universityName}
                                onChange={handleInputs}
                              >
                                <option value="" disabled>
                                  Select University
                                </option>
                                {universities?.map((uni) => (
                                  <option key={uni._id} value={uni.universityName}>
                                    {uni.universityName}
                                  </option>
                                ))}
                              </select>
                              {errors.universityName.required && (
                                <span className="text-danger">University Name is required</span>
                              )}
                            </div>
                          </div>
                          <div className="col-xl-3">
                            <div className="form-group">
                              <label htmlFor="country">Country <span className="text-danger">*</span></label>
                              <select
                                name="country"
                                id="country"
                                className="form-select form-select-sm"
                                value={program.country}
                                onChange={handleCountryChange}
                              >
                                <option value="" disabled>
                                  Select Country
                                </option>
                                {countries?.map((country) => (
                                  <option key={country._id} value={country.country}>
                                    {country.country}
                                  </option>
                                ))}
                              </select>
                              {errors.country.required && (
                                <span className="text-danger">Country is required</span>
                              )}
                            </div>
                          </div>
                          <div className="col-xl-3">
                            <div className="form-group">
                              <label htmlFor="currency">Currency</label>
                              <input
                                type="text"
                                name="currency"
                                id="currency"
                                className="form-control form-control-sm"
                                value={program.currency}
                                onChange={handleInputs}
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="col-xl-3">
                            <div className="form-group">
                              <label htmlFor="flag">Flag</label>
                              <input
                                type="text"
                                name="flag"
                                id="flag"
                                className="form-control form-control-sm"
                                value={program.flag}
                                onChange={handleInputs}
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="col-xl-3">
                            <div className="form-group">
                              <label htmlFor="programTitle">Program Title <span className="text-danger">*</span></label>
                              <input
                                type="text"
                                name="programTitle"
                                id="programTitle"
                                className="form-control form-control-sm"
                                value={program.programTitle}
                                onChange={handleInputs}
                              />
                              {errors.programTitle.required && (
                                <span className="text-danger">Program Title is required</span>
                              )}
                            </div>
                          </div>
                          <div className="col-xl-3">
                            <div className="form-group">
                              <label htmlFor="applicationFee">Application Fee <span className="text-danger">*</span></label>
                              <input
                                type="number"
                                name="applicationFee"
                                id="applicationFee"
                                className="form-control form-control-sm"
                                value={program.applicationFee}
                                onChange={handleInputs}
                              />
                              {errors.applicationFee.required && (
                                <span className="text-danger">Application Fee is required</span>
                              )}
                            </div>
                          </div>
                          <div className="col-xl-3">
                            <div className="form-group">
                              <label htmlFor="discountedValue">Discounted Value</label>
                              <input
                                type="number"
                                name="discountedValue"
                                id="discountedValue"
                                className="form-control form-control-sm"
                                value={program.discountedValue}
                                onChange={handleInputs}
                              />
                            </div>
                          </div>
                          <div className="col-xl-3">
                            <div className="form-group">
                              <label htmlFor="courseType">Course Type</label>
                              <Select
                                name="courseType"
                                id="courseType"
                                options={selectedCourseType}
                                isMulti
                                onChange={handleSelectCourseChange}
                              />
                            </div>
                          </div>
                          <div className="col-xl-3">
                            <div className="form-group">
                              <label htmlFor="englishlanguageTest">English Language Test</label>
                              <input
                                type="text"
                                name="englishlanguageTest"
                                id="englishlanguageTest"
                                className="form-control form-control-sm"
                                value={program.englishlanguageTest}
                                onChange={handleInputs}
                              />
                            </div>
                          </div>
                          <div className="col-xl-3">
                            <div className="form-group">
                              <label htmlFor="textBox">Text Box</label>
                              <input
                                type="text"
                                name="textBox"
                                id="textBox"
                                className="form-control form-control-sm"
                                value={program.textBox}
                                onChange={handleInputs}
                              />
                            </div>
                          </div>
                          <div className="col-xl-3">
                            <div className="form-group">
                              <label htmlFor="universityInterview">University Interview <span className="text-danger">*</span></label>
                              <input
                                type="text"
                                name="universityInterview"
                                id="universityInterview"
                                className="form-control form-control-sm"
                                value={program.universityInterview}
                                onChange={handleInputs}
                              />
                              {errors.universityInterview.required && (
                                <span className="text-danger">University Interview is required</span>
                              )}
                            </div>
                          </div>
                          <div className="col-xl-3">
                            <div className="form-group">
                              <label htmlFor="greGmatRequirement">GRE/GMAT Requirement</label>
                              <input
                                type="text"
                                name="greGmatRequirement"
                                id="greGmatRequirement"
                                className="form-control form-control-sm"
                                value={program.greGmatRequirement}
                                onChange={handleInputs}
                              />
                            </div>
                          </div>
                          <div className="col-xl-3">
                            <div className="form-group">
                              <label htmlFor="score">Score</label>
                              <input
                                type="number"
                                name="score"
                                id="score"
                                className="form-control form-control-sm"
                                value={program.score}
                                onChange={handleInputs}
                              />
                            </div>
                          </div>
                          <div className="col-xl-3">
                            <div className="form-group">
                              <label htmlFor="academicRequirement">Academic Requirement</label>
                              <input
                                type="text"
                                name="academicRequirement"
                                id="academicRequirement"
                                className="form-control form-control-sm"
                                value={program.academicRequirement}
                                onChange={handleInputs}
                              />
                            </div>
                          </div>
                          <div className="col-xl-3">
                            <div className="form-group">
                              <label htmlFor="universityLogo">University Logo <span className="text-danger">*</span></label>
                              <input
                                type="text"
                                name="universityLogo"
                                id="universityLogo"
                                className="form-control form-control-sm"
                                value={program.universityLogo}
                                onChange={handleInputs}
                              />
                              {errors.universityLogo.required && (
                                <span className="text-danger">University Logo is required</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-12">
                            <button
                              type="button"
                              className="btn btn-sm btn-success mt-2"
                              onClick={addCampus}
                            >
                              Add Campus
                            </button>
                          </div>
                        </div>
                        {program.campuses.map((campus, index) => (
                          <div className="row mt-3" key={index}>
                            <div className="col-xl-3">
                              <div className="form-group">
                                <label htmlFor={`campus${index}`}>Campus</label>
                                <input
                                  type="text"
                                  name="campus"
                                  id={`campus${index}`}
                                  className="form-control form-control-sm"
                                  value={campus.campus}
                                  onChange={(e) => handleInputChange(index, "campus", e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-xl-3">
                              <div className="form-group">
                                <label htmlFor={`inTake${index}`}>Intake</label>
                                <input
                                  type="text"
                                  name="inTake"
                                  id={`inTake${index}`}
                                  className="form-control form-control-sm"
                                  value={campus.inTake}
                                  onChange={(e) => handleInputChange(index, "inTake", e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-xl-3">
                              <div className="form-group">
                                <label htmlFor={`courseFees${index}`}>Course Fees</label>
                                <input
                                  type="text"
                                  name="courseFees"
                                  id={`courseFees${index}`}
                                  className="form-control form-control-sm"
                                  value={campus.courseFees}
                                  onChange={(e) => handleInputChange(index, "courseFees", e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-xl-3">
                              <div className="form-group">
                                <label htmlFor={`duration${index}`}>Duration</label>
                                <input
                                  type="text"
                                  name="duration"
                                  id={`duration${index}`}
                                  className="form-control form-control-sm"
                                  value={campus.duration}
                                  onChange={(e) => handleInputChange(index, "duration", e.target.value)}
                                />
                              </div>
                            </div>
                            {/* <div className="col-xl-12">
                              <button
                                type="button"
                                className="btn btn-sm btn-danger mt-2"
                                onClick={() => removeCampus(index)}
                              >
                                Remove Campus
                              </button>
                            </div> */}
                          </div>
                        ))}
                      </div>
                      <button type="submit" className="btn btn-sm btn-primary mt-3">
                        Save
                      </button>
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
export default Profile;


    
