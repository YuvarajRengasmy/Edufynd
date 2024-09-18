import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { updatedCommission,getSingleCommission  } from "../../api/commission";
import { getallCurrency } from "../../api/currency";
import { getFilterYear } from "../../api/year";
import { getallTaxModule } from "../../api/universityModule/tax";
import { FaTrash } from "react-icons/fa";
import { getUniversitiesByCountry } from "../../api/university";
import Flags from "react-world-flags";
import Sidebar from "../../compoents/sidebar";
import BackButton from "../../compoents/backButton";
import axios from 'axios';
function AddCommission() {

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const initialState = {
    country: "",
    universityName: "",
    paymentMethod: "",
    commissionPaidOn: "",
    eligibility: "",
    tax: "",
    paymentType: "",
    currency: "",
    flag: "",
    clientName: "",
    years: [
      {
        year: "",
        courseTypes: [{ courseType: "", inTake: [{ inTake: "", value: "" }] }],
      },
    ],
  };

  const initialStateErrors = {
    country: { required: false },
    universityName: { required: false },
    paymentMethod: { required: false },
    commissionPaidOn: { required: false },
    eligibility: { required: false },
    tax: { required: false },
    paymentType: { required: false },
    years: { required: false },
    flag: { required: false },
    clientName: { required: false },
    currency: { required: false },
  };

  const [commission, setCommission] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const [countries, setCountries] = useState([]);
  const [tax, setTax] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [years, setYears] = useState([]);
  const [year, setYear] = useState([]);
  const pageSize = 5;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  const navigate = useNavigate();

  useEffect(() => {
    getAllCurrencyDetails();
    getAllTaxDetails();
    getAllYearDetails();
    getEditCommissionDetails();
  }, [pagination.from, pagination.to]);

  const getAllCurrencyDetails = () => {
    getallCurrency()
      .then((res) => {
        setCountries(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllYearDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };
    getFilterYear(data)
      .then((res) => {
        setYear(res?.data?.result?.yearList || []);
        setPagination({
          ...pagination,
          count: res?.data?.result?.yearCount || 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllTaxDetails = () => {
    getallTaxModule()
      .then((res) => {
        console.log(res);
        setTax(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getEditCommissionDetails = () => {
    getSingleCommission(id)
      .then((res) => {
        console.log(res?.data?.result);
        setCommission(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleValidation = (data) => {
    let error = initialStateErrors;
    if (!data.country) {
      error.country.required = true;
    }
    if (!data.universityName) {
      error.universityName.required = true;
    }
    if (!data.paymentMethod) {
      error.paymentMethod.required = true;
    }
    if (!data.eligibility) {
      error.eligibility.required = true;
    }
    if (!data.tax) {
      error.tax.required = true;
    }
    if (!data.paymentType) {
      error.paymentType.required = true;
    }
    if (!data.years) {
      error.years.required = true;
    }



    return error;
  };
 
  const handleYearChange = (yearIndex, fieldName, value) => {
    const updatedYears = [...commission.years];
    updatedYears[yearIndex][fieldName] = value;
    setCommission({ ...commission, years: updatedYears });
  };

  const handleCourseTypeChange = (
    yearIndex,
    courseTypeIndex,
    fieldName,
    value
  ) => {
    const updatedYears = [...commission.years];
    updatedYears[yearIndex].courseTypes[courseTypeIndex][fieldName] = value;
    setCommission({ ...commission, years: updatedYears });
  };

  const handleIntakeChange = (
    yearIndex,
    courseTypeIndex,
    intakeIndex,
    fieldName,
    value
  ) => {
    const updatedYears = [...commission.years];
    updatedYears[yearIndex].courseTypes[courseTypeIndex].inTake[
      intakeIndex
    ][fieldName] = value;
    setCommission({ ...commission, years: updatedYears });
  };

  const addYear = () => {
    setCommission((prevState) => ({
      ...prevState,
      years: [
        ...prevState.years,
        {
          year: "",
          courseTypes: [
            { courseType: "", inTake: [{ inTake: "", value: "" }] },
          ],
        },
      ],
    }));
  };
  const removeYear = (indexToRemove) => {
    setCommission((prevState) => ({
      ...prevState,
      years: prevState.years.filter((_, index) => index !== indexToRemove),
    }));
  };
  

  const addCourseType = (yearIndex) => {
    const updatedYears = [...commission.years];
    updatedYears[yearIndex].courseTypes.push({
      courseType: "",
      inTake: [{ inTake: "", value: "" }],
    });
    setCommission({ ...commission, years: updatedYears });
  };

  // const removeCourseType = (yearIndex, courseTypeIndex) => {
  //   const updatedYears = [...commission.years];
  //   updatedYears[yearIndex].courseTypes.splice(courseTypeIndex, 1);
  //   setCommission({ ...commission, years: updatedYears });
  // };

  const addIntake = (yearIndex, courseTypeIndex) => {
    const updatedYears = [...commission.years];
    updatedYears[yearIndex].courseTypes[courseTypeIndex].inTake.push({
      inTake: "",
      value: "",
    });
    setCommission({ ...commission, years: updatedYears });
  };


  const yearOptions = year.map((data) => ({
    value: data.year,
    label: data.year,
  }));

  const fetchCountryDetails = (selectedCountry) => {
    // Find the country details from the countries state
    const selectedCountryData = countries.find(
      (c) => c.country === selectedCountry
    );
  
    // If the country data exists, update the commission state with currency and flag
    if (selectedCountryData) {
      setCommission((prevState) => ({
        ...prevState,
        currency: selectedCountryData.currency,
        flag: selectedCountryData.flag,
      }));
    }
  };
  
  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    
    // Update the commission state with the selected country
    setCommission((prevState) => ({
      ...prevState,
      country: selectedCountry,
    }));
  
    // Fetch the universities for the selected country
    getUniversitiesByCountry(selectedCountry)
      .then((res) => {
        // Update the universities state with the fetched data
        setUniversities(res?.data?.result || []);
      })
      .catch((err) => {
        // Handle errors and reset the universities state
        console.error(`Error fetching universities for ${selectedCountry}:`, err);
        setUniversities([]);
      });
  
    // Update the commission state with country-specific details
    fetchCountryDetails(selectedCountry);
  };
  

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setCommission({ ...commission, [name]: value });

    if (name === "universityName") {
      const selectedUniversity = universities.find(
        (u) => u.universityName === value
      );
      if (selectedUniversity) {
        setCommission((prevState) => ({
          ...prevState,
          universityId: selectedUniversity._id,

          clientName: selectedUniversity.businessName,
          courseType: selectedUniversity.courseType,
        }));
        setYears((prevYears) =>
          prevYears.map((year) => ({
            ...year,
            courseTypes: [
              {
                courseType: selectedUniversity.courseType,
                intake: "",
                value: null,
              },
            ],
          }))
        );
      }
    }

    if (submitted) {
      const newError = handleValidation({ ...commission, [name]: value });
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

    // Validate the commission data
    const newError = handleValidation(commission);
    setErrors(newError);
    setSubmitted(true);

    // If there are no validation errors, proceed
    if (handleErrors(newError)) {
      // Prepare years data for submission
      const yearsData = commission.years.map((year) => ({
        year: year.year,
        courseTypes: year.courseTypes.map((courseType) => ({
          courseType: courseType.courseType,
          inTake: courseType.inTake.map((inTake) => ({
            inTake: inTake.inTake,
            value: inTake.value,
          })),
        })),
      }));

      // Prepare commission data including years
      const dataToSave = {
        ...commission,
        years: yearsData,
      };

      // Call API to save commission
      updatedCommission(dataToSave)
        .then((res) => {
          toast.success(res?.data?.message || "Commission saved successfully!");
          navigate("/list_commission");
        })
        .catch((err) => {
          toast.error(
            err?.response?.data?.message ||
              "An error occurred while saving the commission."
          );
        });
    }
  };


  /////



  const removeIntake = async (yearIndex, courseTypeIndex, intakeIndex) => {
    const year = commission.years[yearIndex].year;
    const courseType = commission.years[yearIndex].courseTypes[courseTypeIndex].courseType;
    const intake = commission.years[yearIndex].courseTypes[courseTypeIndex].inTake[intakeIndex];
  
    try {
      // Call the backend API to delete the intake
      await axios.post('http://localhost:4409/api/commission/deleteIntake', {
        commissionId: commission._id,
        year,
        courseType,
        intake: intake.inTake
      });
  
      // Update the local state after successful deletion
      const updatedYears = [...commission.years];
      updatedYears[yearIndex].courseTypes[courseTypeIndex].inTake.splice(intakeIndex, 1);
  
      // If no intakes are left in the courseType, you might want to remove the courseType
      if (updatedYears[yearIndex].courseTypes[courseTypeIndex].inTake.length === 0) {
        updatedYears[yearIndex].courseTypes.splice(courseTypeIndex, 1);
  
        // If no courseTypes are left in the year, you might want to remove the year
        if (updatedYears[yearIndex].courseTypes.length === 0) {
          updatedYears.splice(yearIndex, 1);
        }
      }
  
      setCommission({ ...commission, years: updatedYears });
    
      toast.success('Intake deleted successfully');
    } catch (error) {
      console.error('Error deleting Intake:', error);
      toast.error("Error deleting Intake");
    }
  };


const removeCourseType = async (yearIndex, courseTypeIndex) => {
  const year = commission.years[yearIndex].year;
  const courseType = commission.years[yearIndex].courseTypes[courseTypeIndex].courseType;

  try {
    // Call the backend API to delete the courseType
    await axios.post('http://localhost:4409/api/commission/deleteCourseType', {
      commissionId: commission._id,
      year,
      courseType
    });

    // Update the local state after successful deletion
    const updatedYears = [...commission.years];
    updatedYears[yearIndex].courseTypes.splice(courseTypeIndex, 1);

    // If no courseTypes are left in the year, you might want to remove the year
    if (updatedYears[yearIndex].courseTypes.length === 0) {
      updatedYears.splice(yearIndex, 1);
    }

    setCommission({ ...commission, years: updatedYears });
  
    toast.success('Course Type deleted successfully');
  } catch (error) {
    console.error('Error deleting Course Type:', error);

    toast.error("Error deleting Course Type");
  }
};



  return (
    <>
      <Sidebar />

      <div
        className="content-wrapper"
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "13px" }}
      >
        <div className="content-header">

        <BackButton/>
        
        </div>
        <div className="container-fluid">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-xl-12">
                  <div className="card border-0 rounded-1 shadow-sm p-3 position-relative">
                    <div
                      className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0"
                      style={{ background: "#fe5722", color: "#fff" }}
                    >
                      <h5 className="text-center text-capitalize p-1">
                        Edit Commission Details
                      </h5>
                    </div>
                    <div className="card-body mt-5">
                      <div className="row g-3">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Country<span className="text-danger">*</span>
                          </label>
                          <select
                           class={`form-select form-select-lg rounded-1 ${errors.country.required ? 'is-invalid' : ''}`}
                            name="country"
                            onChange={handleCountryChange}
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            value={commission.country?commission.country:"Not Available"}
                          >
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                              <option key={country._id} value={country.country}>
                                {country.country}
                              </option>
                            ))}
                          </select>
                          {errors.country.required ? (
                            <span className="text-danger form-text profile_error">
                              This field is required.
                            </span>
                          ) : null}
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            University<span className="text-danger">*</span>
                          </label>

                          <select
                            class={`form-select form-select-lg rounded-1 ${
                              errors.universityName.required ? "is-invalid" : ""
                            }`}
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "14px",
                            }}
                            name="universityName"
                            onChange={handleInputs}
                            value={commission.
                              universityName?commission.universityName:"Not Available"}
                          >
                            <option
                              className=" font-weight-light"
                              value= {commission.universityName
                                ? commission.universityName
                                : "Select University"}
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "14px",
                              }}
                            >
                              {commission.universityName
                                ? commission.universityName
                                : "Select University"}
                            </option>
                            {universities.map((uni) => (
                              <option key={uni._id} value={uni.universityName}>
                                {uni.universityName}
                              </option>
                            ))}
                          </select>
                          
                          {errors.universityName.required ? (
                            <span className="text-danger form-text profile_error">
                              This field is required.
                            </span>
                          ) : null}
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 visually-hidden ">
                          <label style={{ color: "#231F20" }}>
                            {" "}
                            University Id
                            <span className="text-danger">*</span>
                          </label>
                          <select
                            onChange={handleInputs}
                            value={commission?.universityId?commission?.universityId:"Not Available"}
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            className="form-select rounded-2 p-2 "
                            name="universityId"
                          >
                            <option
                              value={""}
                              disabled
                              hidden
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                            >
                              Select UniversityId
                            </option>
                            {universities.map((data, index) => (
                              <option
                                key={index}
                                value={data?.universityId}
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              >
                                {" "}
                                {data?.universityName}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Payment Method<span className="text-danger">*</span>
                          </label>
                          <select
                          class={`form-select form-select-lg rounded-1 ${errors.paymentMethod.required ? 'is-invalid' : ''}`}
                            name="paymentMethod"
                            onChange={handleInputs}
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            value={commission.paymentMethod}
                          >
                            <option value="">Select Payment Type</option>
                            <option value="Fixed">Fixed Amount</option>
                            <option value="Percentage">Percentage</option>
                          </select>
                          {errors.paymentMethod.required ? (
                            <span className="text-danger form-text profile_error">
                              This field is required.
                            </span>
                          ) : null}
                        </div>
                        <div className="row g-2">
                          {commission.paymentMethod === "Percentage" ? (
                            <div className="row g-2">
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label style={{ color: "#231F20" }}>
                                  Commission Paid On
                                  <span className="text-danger">*</span>
                                </label>
                                <select
                                  className="form-select form-select-lg rounded-2"
                                  name="commissionPaidOn"
                                  onChange={handleInputs}
                                  style={{
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                >
                                  <option value="">
                                    Select Commission Paid On
                                  </option>
                                  <option value="CourseFees">Net Fees</option>
                                  <option value="PaidFees">Paid Fees</option>
                                  <option value="PaidFees">Gross Fees</option>
                                </select>
                              </div>
                            </div>
                          ) : null}
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Eligibility<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            value={commission?.eligibility}
                            className={`form-control rounded-1 ${errors.eligibility.required ? 'is-invalid' : errors.eligibility.valid ? 'is-valid' : '' }`}
                            placeholder="Enter Eligibility"
                            name="eligibility"
                            onChange={handleInputs}
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                          />
                          {errors.eligibility.required && (
                            <span className="text-danger form-text profile_error">
                              This field is required.
                            </span>
                          )}
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Tax<span className="text-danger">*</span>
                          </label>
                          <select
                        class={`form-select form-select-lg rounded-1 ${errors.tax.required ? 'is-invalid' : ''}`}
                            name="tax"
                            onChange={handleInputs}
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                            value={commission?.tax}
                          >
                            <option value="">Select Tax</option>
                            {tax.map((data, index) => (
                              <option key={index} value={data?.tax}>
                                {" "}
                                {data?.tax}
                              </option>
                            ))}
                          </select>

                          {errors.tax.required ? (
                            <span className="text-danger form-text profile_error">
                              This field is required.
                            </span>
                          ) : null}
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 visually-hidden">
                          <label style={{ color: "#231F20" }}>
                            Client Name<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            value={commission?.clientName}
                            className={`form-control rounded-1 ${errors.clientName.required ? 'is-invalid' : errors.clientName.valid ? 'is-valid' : '' }`}
                            placeholder="Enter Client Name"
                            name="clientName"
                            onChange={handleInputs}
                          />
                          {errors.clientName.required ? (
                            <span className="text-danger form-text profile_error">
                              This field is required.
                            </span>
                          ) : null}
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12  visually-hidden">
                          <label style={{ color: "#231F20" }}>Currency</label>
                          <div sm="9" className="d-flex align-items-center">
                            {commission.flag && (
                              <Flags
                                code={commission.flag}
                                className="me-2"
                                style={{ width: "40px", height: "30px" }}
                                onChange={handleInputs}
                                name="flag"
                              />
                            )}
                            <input
                              className="form-control rounded-2"
                              type="text"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              onChange={handleInputs}
                              name="currency"
                              value={`${commission.currency}`}
                              readOnly
                            />
                          </div>
                          {errors.currency.required ? (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          ) : null}
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Payment Type<span className="text-danger">*</span>
                          </label>
                          <select
                           className={`form-control rounded-1 ${errors.paymentType.required ? 'is-invalid' : errors.paymentType.valid ? 'is-valid' : '' }`}
                            value={commission?.paymentType}
                            aria-label="Default select example"
                            name="paymentType"
                            onChange={handleInputs}
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                          >
                            <option value=""> Select Payment Type</option>
                            <option value="One_Time">One Time</option>
                            <option value="Semester"> Semester </option>
                          </select>
                          {errors.paymentType.required ? (
                            <span className="text-danger form-text profile_error">
                              This field is required.
                            </span>
                          ) : null}
                        </div>






                        {/* <div className="row g-3 mt-3">
                          <div className="col-12">
                          {commission.years.map((year, yearIndex) => (
                            <div className="row g-3">
            <div key={yearIndex}>
               <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
              <div className="form-group">
                <label>Year</label>
                <select
                  name="year"
                  className={`form-select rounded-1 ${errors.years.required ? "is-invalid" : ""
                    }`}
                  value={year.year}
                  onChange={(e) =>
                    handleYearChange(yearIndex, "year", e.target.value)
                  }
                >
                  <option value="">Select Year</option>
                  {yearOptions.map((yearOption) => (
                    <option key={yearOption.value} value={yearOption.value}>
                      {yearOption.label}
                    </option>
                  ))}
                </select>
                {errors.years.required && (
                  <div className="invalid-feedback">Year is required</div>
                )}
              </div>
              </div>
              {year.courseTypes.map((courseType, courseTypeIndex) => (
                 
                <div >
                
                  <div key={courseTypeIndex} className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <label>Course Type</label>
                   
                    <select
                      name="courseType"
                      className={`form-select rounded-1 ${errors.courseType?.required ? "is-invalid" : ""
                        }`}
                      value={courseType.courseType}
                      onChange={(e) =>
                        handleCourseTypeChange(
                          yearIndex,
                          courseTypeIndex,
                          "courseType",
                          e.target.value
                        )
                      }
                    >
                      <option value={courseType?.courseType}>{courseType?.courseType}</option>
                      {(
                                                  universities.find(
                                                    (uni) =>
                                                      uni.universityName ===
                                                      commission.universityName
                                                  )?.courseType || []
                                                ).map((type, idx) => (
                                                  <option
                                                    key={idx}
                                                    value={type}
                                                  >
                                                    {type}
                                                  </option>
                                                ))}
                    </select>
                    {errors.courseType?.required && (
                      <div className="invalid-feedback">
                        Course Type is required
                      </div>
                    )}
                  </div>
              

                  {courseType.inTake.map((intake, intakeIndex) => (
                    
                      <div className="row g-2">
                      <div  key={intakeIndex} className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label>Intake</label>
                     <select
                        name="inTake"
                        className={`form-control ${errors.inTake?.required ? "is-invalid" : ""
                          }`}
                        value={intake.inTake}
                        onChange={(e) =>
                          handleIntakeChange(
                            yearIndex,
                            courseTypeIndex,
                            intakeIndex,
                            "inTake",
                            e.target.value
                          )
                        }
                      >
                        <option value={intake.inTake}>{intake.inTake}</option>
                        {(
                                                  universities.find(
                                                    (uni) =>
                                                      uni.universityName ===
                                                      commission.universityName
                                                  )?.inTake || []
                                                ).map((type, idx) => (
                                                  <option
                                                    key={idx}
                                                    value={type}
                                                  >
                                                    {type}
                                                  </option>
                                                ))}
                      </select>
                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label>Value</label>
                      <input
                        type="text"
                        name="value"
                        className="form-control"
                        value={intake.value}
                        onChange={(e) =>
                          handleIntakeChange(
                            yearIndex,
                            courseTypeIndex,
                            intakeIndex,
                            "value",
                            e.target.value
                          )
                        }
                      />
                      </div>

                      <div className='d-inline text-end'>
                      <button
  type="button"
  className="btn rounded-1 btn-danger"
  onClick={() => removeIntake(yearIndex, courseTypeIndex, intakeIndex)}
>
  <FaTrash /> Remove Intake
</button>
                   
                      </div>
                    
                     
                      </div>
                     
                  ))}

<div className=' text-en my-1'>
<button
                    type="button"
                    className="btn rounded-1 btn-secondary"
                    onClick={() => addIntake(yearIndex, courseTypeIndex)}
                  >
                 <i class="fa fa-plus-circle" aria-hidden="true"></i>   Add Intake
                  </button>
</div>
<div className=' text-end my-1'>
<button
  type="button"
  className="btn rounded-1 btn-danger"
  onClick={() => removeCourseType(yearIndex, courseTypeIndex)}
>
  <FaTrash /> Remove Course
</button>
</div>
                 

                 
                </div>
               
              ))}
<div className=' text-start'>
<button
                type="button"
                className="btn rounded-1 btn-secondary"
                onClick={() => addCourseType(yearIndex)}
              >
               <i class="fa fa-plus-circle" aria-hidden="true"></i> Add Course 
              </button>
</div>
             
            </div>
            </div>
          ))}
                          </div>
                        </div>
                        <div className="row g-3 ">
                          <div className="add-customer-btns mb-40 d-flex justify-content-end ml-auto my-3">
                            <button
                              type="button"
                              className="btn rounded-1 px-4 py-2 text-uppercase fw-semibold  text-white "
                              style={{
                                backgroundColor: "#FE5722",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              onClick={addYear}
                            >
                              <i
                                class="fa fa-plus-circle me-2"
                                aria-hidden="true"
                              ></i>{" "}
                              Add Year
                            </button>

                          </div>
                          
                        </div>
                      </div> */}




{/* <div className="row g-3 mt-3">
    <div className="col-12">
      {commission.years.map((year, yearIndex) => (
        <div className="row g-3" key={yearIndex}>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
              <label>Year</label>
              <select
                name="year"
                className={`form-select rounded-1 ${errors.years.required ? "is-invalid" : ""}`}
                value={year.year}
                onChange={(e) => handleYearChange(yearIndex, "year", e.target.value)}
              >
                <option value="">Select Year</option>
                {yearOptions.map((yearOption) => (
                  <option key={yearOption.value} value={yearOption.value}>
                    {yearOption.label}
                  </option>
                ))}
              </select>
              {errors.years.required && (
                <div className="invalid-feedback">Year is required</div>
              )}
            </div>
          </div>
          {year.courseTypes.map((courseType, courseTypeIndex) => (
            <div key={courseTypeIndex}>
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                <label>Course Type</label>
                <select
                  name="courseType"
                  className={`form-select rounded-1 ${errors.courseType?.required ? "is-invalid" : ""}`}
                  value={courseType.courseType}
                  onChange={(e) => handleCourseTypeChange(yearIndex, courseTypeIndex, "courseType", e.target.value)}
                >
                  <option value={courseType?.courseType}>{courseType?.courseType}</option>
                  {(
                    universities.find(
                      (uni) => uni.universityName === commission.universityName
                    )?.courseType || []
                  ).map((type, idx) => (
                    <option key={idx} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.courseType?.required && (
                  <div className="invalid-feedback">Course Type is required</div>
                )}
              </div>

              {courseType.inTake.map((intake, intakeIndex) => (
                <div className="row g-2" key={intakeIndex}>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <label>Intake</label>
                    <select
                      name="inTake"
                      className={`form-control ${errors.inTake?.required ? "is-invalid" : ""}`}
                      value={intake.inTake}
                      onChange={(e) => handleIntakeChange(yearIndex, courseTypeIndex, intakeIndex, "inTake", e.target.value)}
                    >
                      <option value={intake.inTake}>{intake.inTake}</option>
                      {(
                        universities.find(
                          (uni) => uni.universityName === commission.universityName
                        )?.inTake || []
                      ).map((type, idx) => (
                        <option key={idx} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <label>Value</label>
                    <input
                      type="text"
                      name="value"
                      className="form-control"
                      value={intake.value}
                      onChange={(e) => handleIntakeChange(yearIndex, courseTypeIndex, intakeIndex, "value", e.target.value)}
                    />
                  </div>
                  <div className='d-inline text-end'>
                    <button
                      type="button"
                      className="btn rounded-1 btn-danger"
                      onClick={() => removeIntake(yearIndex, courseTypeIndex, intakeIndex)}
                    >
                      <FaTrash /> Remove Intake
                    </button>
                  </div>
                </div>
              ))}

              <div className='text-en my-1'>
                <button
                  type="button"
                  className="btn rounded-1 btn-secondary"
                  onClick={() => addIntake(yearIndex, courseTypeIndex)}
                >
                  <i className="fa fa-plus-circle" aria-hidden="true"></i> Add Intake
                </button>
              </div>
              <div className='text-end my-1'>
                <button
                  type="button"
                  className="btn rounded-1 btn-danger"
                  onClick={() => removeCourseType(yearIndex, courseTypeIndex)}
                >
                  <FaTrash /> Remove Course
                </button>
              </div>
            </div>
          ))}
          <div className='text-start'>
            <button
              type="button"
              className="btn rounded-1 btn-secondary"
              onClick={() => addCourseType(yearIndex)}
            >
              <i className="fa fa-plus-circle" aria-hidden="true"></i> Add Course
            </button>
          </div>
        </div>
      ))}
    </div>
    <div className="row g-3 ">
      <div className="add-customer-btns mb-40 d-flex justify-content-end ml-auto my-3">
        <button
          type="button"
          className="btn rounded-1 px-4 py-2 text-uppercase fw-semibold text-white"
          style={{
            backgroundColor: "#FE5722",
            fontFamily: "Plus Jakarta Sans",
            fontSize: "12px",
          }}
          onClick={addYear}
        >
          <i className="fa fa-plus-circle me-2" aria-hidden="true"></i> Add Year
        </button>
      </div>
    </div>
  </div> */}










                      <div className="row g-2">
                        <div className="add-customer-btns mb-40 d-flex justify-content-end ml-auto">
                          <Link
                            to="/list_commission"
                            style={{
                              backgroundColor: "#231F20",
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            className="btn rounded-1 btn-cancel border-0 fw-semibold text-uppercase text-white px-4 py-2 m-2"
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
                            className="btn rounded-1 btn-save border-0 fw-semibold text-uppercase  px-4 py-2 text-white m-2"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
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
}

export default AddCommission;
