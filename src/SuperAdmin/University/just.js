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
   
    years: [
      {
        id: 1,
        year: "",
        courseTypes: [{id:1, courseType: "",inTake:[{id:1,type:"",value:""}] }],
      },
    ],
  };

  const initialStateErrors = {
    country: { required: false },
    universityName: { required: false },
    
    years: { required: false },
    
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

        if (!courseType.summer) {
          courseTypeErrors.summer = "Intake is required.";
        }else if (isNaN(courseType.value) || Number(courseType.value) >= 35) {
            courseTypeErrors.value = "Value must be a number less than 35.";
          }

        if (courseType.winter === null || courseType.winter === "") {
          courseTypeErrors.winter = "Value is required.";
        } else if (isNaN(courseType.winter) || Number(courseType.winter) >= 35) {
          courseTypeErrors.winter = "Value must be a number less than 35.";
        }
        if (courseType.fall === null || courseType.fall === "") {
            courseTypeErrors.fall = "Value is required.";
          } else if (isNaN(courseType.fall) || Number(courseType.fall) >= 35) {
            courseTypeErrors.fall = "Value must be a number less than 35.";
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
      courseTypes: [{ courseType: "", summer: "", winter: "", fall: "",  }],
    };
    setYears([...years, newYear]);
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
                courseType: "",
                inTake: "",
                value: "",
                
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

                   

                          <div className="row g-3 mt-3">
                            <div className="col-12">
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
                                  <div>
                                    <div>
                                      {year?.courseTypes &&
                                        year?.courseTypes.map(
                                          (courseType, courseTypeIndex) => (
                                            <div
                                              className="row g-3"
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

                                                  <div className="row g-3">
                                                    {(
                                                      universities.find(
                                                        (uni) =>
                                                          uni.universityName ===
                                                          commission.universityName
                                                      )?.inTake || []
                                                    ).map((type, idx) => (
                                                      <div key={idx}>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
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
                                                      </div>
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
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="row g-3">
                            <div className="add-customer-btns mb-40 d-flex justify-content-start ml-auto">
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






// const handleSubmit = (event) => {
//     event.preventDefault();
  
//     // Validate the commission data
//     const newError = handleValidation(commission);
//     setErrors(newError);
//     setSubmitted(true);
    
//     if (handleErrors(newError)) {
//       // Check if years is defined and is an array
//       const yearsData = years.map((year, yearIndex) => ({
//        // Assuming IDs are generated based on the index
//         year: year.year || "", // Ensure year is a string
//         courseTypes: year.courseTypes.map((courseType, courseTypeIndex) => ({
//            // Assuming IDs are generated based on the index
//           courseType: courseType.courseType || "", // Ensure courseType is a string
//           inTake: courseType.inTake.map((inTake, inTakeIndex) => ({
//            // Assuming IDs are generated based on the index
//             type: inTake.type || "", // Ensure type is a string
//             value: inTake.value || "", // Ensure value is a string
//           })),
//         })),
//       }));
  
//       // Prepare commission data including years
//       const dataToSave = {
//         ...commission,
//         years: yearsData,
//       };
  
//       // Call API to save commission
//       saveCommission(dataToSave)
//         .then((res) => {
//           toast.success(res?.data?.message);
//           navigate("/ListCommission");
//         })
//         .catch((err) => {
//           toast.error(err?.response?.data?.message);
//         });
//     }
//   };
  
 