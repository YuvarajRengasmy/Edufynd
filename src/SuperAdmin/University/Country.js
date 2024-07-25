import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { saveCommission } from "../../api/commission";
import { getallCurrency } from "../../api/currency";
import { getFilterYear } from "../../api/year";
import { getallTaxModule } from "../../api/universityModule/tax";
import { FaTrash } from "react-icons/fa";
import { getUniversitiesByCountry } from "../../api/university";
import Flags from "react-world-flags";

import Sidebar from "../../compoents/sidebar";
import { Link } from "react-router-dom";

function AddCommission() {
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
        id: 1,
        year: "",
        courseTypes: [{ courseType: "", inTake: "", value: null }],
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

  const validateYears = (years) => {
    const errors = [];
    for (let i = 0; i < years.length; i++) {
      const year = years[i];
      const yearErrors = {};

      if (!year.year) {
        yearErrors.year = "Year is required.";
      }

      yearErrors.courseTypes = [];
      for (let j = 0; j < year.courseTypes.length; j++) {
        const courseType = year.courseTypes[j];
        const courseTypeErrors = {};

        if (!courseType.courseType) {
          courseTypeErrors.courseType = "Course Type is required.";
        }

        if (!courseType.inTake) {
          courseTypeErrors.inTake = "Intake is required.";
        }

        if (courseType.value === null || courseType.value === "") {
          courseTypeErrors.value = "Value is required.";
        } else if (isNaN(courseType.value) || Number(courseType.value) >= 35) {
          courseTypeErrors.value = "Value must be a number less than 35.";
        }

        yearErrors.courseTypes[j] = courseTypeErrors;
      }

      errors[i] = yearErrors;
    }
    return errors;
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

    const yearValidationErrors = validateYears(data.years);
    if (
      yearValidationErrors.some(
        (yearError) => Object.keys(yearError).length > 0
      )
    ) {
      errors.years = {
        required: false,
        valid: true,
        message: "Please fix the errors in the year fields.",
      };
      errors.yearErrors = yearValidationErrors;
    }

    return error;
  };
  const addYear = () => {
    const newYear = {
      year: "",
      courseTypes: [{ courseType: "", intake: "", value: null }],
    };
    setYears([...years, newYear]);
  };

  const addCourseType = (yearIndex) => {
    const updatedYears = [...years];
    updatedYears[yearIndex].courseTypes.push({
      courseType: "",
      intake: "",
      value: null,
    });
    setYears(updatedYears);
  };

  const removeCourseType = (yearIndex, courseTypeIndex) => {
    const updatedYears = [...commission.years];
    updatedYears[yearIndex].courseTypes.splice(courseTypeIndex, 1);
    setCommission({
      ...commission,
      years: updatedYears,
    });
  };
  const handleInputChange = (yearIndex, courseTypeIndex, fieldName, value) => {
    const updatedYears = [...years];
    if (courseTypeIndex !== null) {
      updatedYears[yearIndex].courseTypes[courseTypeIndex][fieldName] = value;
    } else {
      updatedYears[yearIndex][fieldName] = value;
    }
    setYears(updatedYears);
  };
  const yearOptions = year.map((data) => ({
    value: data.year,
    label: data.year,
  }));

  const fetchCountryDetails = (selectedCountry) => {
    const selectedCountryData = countries.find(
      (c) => c.country === selectedCountry
    );
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
    setCommission({ ...commission, country: selectedCountry });

    getUniversitiesByCountry(selectedCountry)
      .then((res) => {
        setUniversities(res?.data?.result || []);
      })
      .catch((err) => {
        console.error(
          `Error fetching universities for ${selectedCountry}:`,
          err
        );
        setUniversities([]);
      });

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
    if (handleErrors(newError)) {
      // Prepare years data for submission
      const yearsData = years.map((year) => ({
        year: year.year,
        courseTypes: year.courseTypes.map((courseType) => ({
          courseType: courseType.courseType,
          inTake: courseType.inTake,
          value: courseType.value,
        })),
      }));

      // Prepare commission data including years
      const dataToSave = {
        ...commission,
        years: yearsData,
      };

      // Call API to save commission
      saveCommission(dataToSave)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/ListCommission");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  return (
    <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
      <div className="container-fluid">
        <nav className="navbar navbar-vertical navbar-expand-lg">
          <Sidebar />
        </nav>

        <div
          className="content-wrapper"
          style={{ fontFamily: "Plus Jakarta Sans", fontSize: "13px" }}
        >
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
                          Add Commission Details
                        </h5>
                      </div>
                      <div className="card-body mt-5">
                        <div className="row g-3">
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Country<span className="text-danger">*</span>
                            </label>
                            <select
                              className="form-select  form-select-lg  rounded-2"
                              name="country"
                              value={commission.country}
                              onChange={handleCountryChange}
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                            >
                              <option value="">Select Country</option>
                              {countries.map((country) => (
                                <option
                                  key={country._id}
                                  value={country.country}
                                >
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
                              className="form-select form-select-lg rounded-2"
                              name="universityName"
                              value={commission.universityName}
                              onChange={handleInputs}
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                            >
                              <option value="">Select University</option>
                              {universities.map((uni) => (
                                <option
                                  key={uni._id}
                                  value={uni.universityName}
                                >
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

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Payment Method
                              <span className="text-danger">*</span>
                            </label>
                            <select
                              className="form-select form-select-lg rounded-2"
                              name="paymentMethod"
                              onChange={handleInputs}
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
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
                              className="form-control rounded-2"
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
                              className="form-select form-select-lg rounded-2 rounded-2 p-2 "
                              name="tax"
                              onChange={handleInputs}
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
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
                              className="form-control rounded-2"
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
                              className="form-select form-select-lg rounded-2"
                              value={commission?.paymentType}
                              aria-label="Default select example"
                              name="paymentType"
                              onChange={handleInputs}
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                            >
                              <option value=""> select Payment Type</option>
                              <option value="One_Time">One Time</option>
                              <option value="Semester"> Semester </option>
                            </select>
                            {errors.paymentType.required ? (
                              <span className="text-danger form-text profile_error">
                                This field is required.
                              </span>
                            ) : null}
                          </div>
                          <div className="row g-3">
                            <div className="add-customer-btns mb-40 d-flex justify-content-end ml-auto ">
                              <button
                                type="button"
                                className="btn px-4 py-2 text-uppercase fw-semibold  text-white "
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

                          <div className="row g-3 ">
                           
                              {years.map((year, yearIndex) => (
                                <div
                                  key={yearIndex}
                                  className="year-section mb-3"
                                >
                                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                    <label style={{ color: "#231F20" }}>
                                      Year
                                    </label>
                                    <select
                                      style={{
                                        backgroundColor: "#fff",
                                        fontFamily: "Plus Jakarta Sans",
                                        fontSize: "14px",
                                      }}
                                      value={year?.year}
                                      onChange={(e) =>
                                        handleInputChange(
                                          yearIndex,
                                          null,
                                          "year",
                                          e.target.value
                                        )
                                      }
                                      name="year"
                                      className="form-select form-select-lg rounded-2 mb-3 "
                                      placeholder="Enter Year"
                                    >
                                      <option value="">Select Year</option>
                                      {yearOptions.map((option) => (
                                        <option
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </option>
                                      ))}
                                    </select>
                                  </div>


                                  
                                 
                                    <div className="row mb-3">
                                      {year?.courseTypes &&
                                        year?.courseTypes.map(
                                          (courseType, courseTypeIndex) => (
                                            <div
                                              className=""
                                              key={courseTypeIndex}
                                            >
                                              {(
                                                universities.find(
                                                  (uni) =>
                                                    uni.universityName ===
                                                    commission.universityName
                                                )?.courseType || []
                                              ).map((type, idx) => (
                                                <div key={idx}>
                                                  <label>
                                                    CourseType:{type}
                                                  </label>

                                                  <div className="row row-cols-3 mb-3 ">
                                                    
                                                    {(
                                                      universities.find(
                                                        (uni) =>
                                                          uni.universityName ===
                                                          commission.universityName
                                                      )?.inTake || []
                                                    ).map((type, idx) => (
                                                      <span key={idx}>
                                                        <div className="col-xl-12  ">
                                                          <label
                                                            style={{
                                                              color: "#231F20",
                                                            }}
                                                          >
                                                            {type}
                                                          </label>
                                                          <input
                                                            className="form-control rounded-2"
                                                            type="text"
                                                            name="value"
                                                            placeholder="Enter Value"
                                                            value={
                                                              courseType.value
                                                            }
                                                            style={{
                                                              fontFamily:
                                                                "Plus Jakarta Sans",
                                                              fontSize: "12px",
                                                            }}
                                                            onChange={(e) =>
                                                              handleInputChange(
                                                                yearIndex,
                                                                courseTypeIndex,
                                                                "value",
                                                                e.target.value
                                                              )
                                                            }
                                                          />
                                                        </div>
                                                      </span>
                                                    ))}
                                                  </div>
                                                </div>
                                              ))}

                                              {/* </select> */}

                                              <div className="add-customer-btns mb-40 d-flex justify-content-end ml-auto"></div>
                                            </div>
                                          )
                                        )}
                                    </div>
                                 
                                </div>
                              ))}
                            
                          </div>




                        
                        </div>

                        <div className="row g-2">
                          <div className="add-customer-btns mb-40 d-flex justify-content-end ml-auto">
                            <Link
                              type="reset"
                              style={{
                                backgroundColor: "#231F20",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              className="btn btn-cancel border-0 fw-semibold text-uppercase text-white px-4 py-2 m-2"
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
                              className="btn btn-save border-0 fw-semibold text-uppercase  px-4 py-2 text-white m-2"
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

export default AddCommission;
