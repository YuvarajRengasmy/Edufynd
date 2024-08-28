import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { saveCommission } from "../../api/commission";
import { getallCurrency } from "../../api/currency";
import { getFilterYear } from "../../api/year";
import { getallTaxModule } from "../../api/universityModule/tax";
import { getUniversitiesByCountry } from "../../api/university";
import Sidebar from "../../compoents/sidebar";
import { FaTrash } from "react-icons/fa";

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
  };

  const [commission, setCommission] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const [countries, setCountries] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [tax,setTax] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCurrencyDetails();
    getAllTaxDetails();
    getAllYearDetails();
  }, []);

  const getAllCurrencyDetails = () => {
    getallCurrency()
      .then((res) => {
        setCountries(res?.data?.result || []);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getAllTaxDetails = () => {
    getallTaxModule()
      .then((res) => {
        setTax(res?.data?.result || []);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getAllYearDetails = () => {
    getFilterYear({ limit: 10, page: 1 })
      .then((res) => {
        setYearOptions(
          res?.data?.result?.yearList?.map((year) => ({
            value: year.year,
            label: year.year,
          })) || []
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
          inTake: selectedUniversity.inTake,
        }));
      }
    }

    if (submitted) {
      const newError = handleValidation({ ...commission, [name]: value });
      setErrors(newError);
    }
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

  const addCourseType = (yearIndex) => {
    const updatedYears = [...commission.years];
    updatedYears[yearIndex].courseTypes.push({
      courseType: "",
      inTake: [{ inTake: "", value: "" }],
    });
    setCommission({ ...commission, years: updatedYears });
  };

  const removeCourseType = (yearIndex, courseTypeIndex) => {
    const updatedYears = [...commission.years];
    updatedYears[yearIndex].courseTypes.splice(courseTypeIndex, 1);
    setCommission({ ...commission, years: updatedYears });
  };

  const addIntake = (yearIndex, courseTypeIndex) => {
    const updatedYears = [...commission.years];
    updatedYears[yearIndex].courseTypes[courseTypeIndex].inTake.push({
      inTake: "",
      value: "",
    });
    setCommission({ ...commission, years: updatedYears });
  };

  const removeIntake = (yearIndex, courseTypeIndex, intakeIndex) => {
    const updatedYears = [...commission.years];
    updatedYears[yearIndex].courseTypes[courseTypeIndex].inTake.splice(
      intakeIndex,
      1
    );
    setCommission({ ...commission, years: updatedYears });
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
    if (!data.years || data.years.length === 0) {
      error.years.required = true;
    }

    return error;
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
      saveCommission(dataToSave)
        .then((res) => {
          toast.success(res?.data?.message || "Commission saved successfully!");
          navigate("/commission");
        })
        .catch((err) => {
          toast.error(
            err?.response?.data?.message ||
              "An error occurred while saving the commission."
          );
        });
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="container mt-3 p-3">
        <h2>Add Commission</h2>
        <form onSubmit={handleSubmit}>
          {/* Country Select */}
          <div className="form-group">
            <label>Country</label>
            <select
              name="country"
              className={`form-control ${errors.country.required ? "is-invalid" : ""
                }`}
              value={commission.country}
              onChange={handleCountryChange}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.country} value={country.country}>
                  {country.country}
                </option>
              ))}
            </select>
            {errors.country.required && (
              <div className="invalid-feedback">Country is required</div>
            )}
          </div>

          {/* University Select */}
          <div className="form-group">
            <label>University Name</label>
            <select
              name="universityName"
              className={`form-control ${errors.universityName.required ? "is-invalid" : ""
                }`}
              value={commission.universityName}
              onChange={handleInputs}
            >
              <option value="">Select University</option>
              {universities.map((university) => (
                <option
                  key={university.universityName}
                  value={university.universityName}
                >
                  {university.universityName}
                </option>
              ))}
            </select>
            {errors.universityName.required && (
              <div className="invalid-feedback">
                University Name is required
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="form-group">
            <label>Payment Method</label>
            <input
              type="text"
              name="paymentMethod"
              className={`form-control ${errors.paymentMethod.required ? "is-invalid" : ""
                }`}
              value={commission.paymentMethod}
              onChange={handleInputs}
            />
            {errors.paymentMethod.required && (
              <div className="invalid-feedback">Payment Method is required</div>
            )}
          </div>

          {/* Commission Paid On */}
          <div className="form-group">
            <label>Commission Paid On</label>
            <input
              type="text"
              name="commissionPaidOn"
              className={`form-control ${errors.commissionPaidOn.required ? "is-invalid" : ""
                }`}
              value={commission.commissionPaidOn}
              onChange={handleInputs}
            />
            {errors.commissionPaidOn.required && (
              <div className="invalid-feedback">
                Commission Paid On is required
              </div>
            )}
          </div>

          {/* Eligibility */}
          <div className="form-group">
            <label>Eligibility</label>
            <input
              type="text"
              name="eligibility"
              className={`form-control ${errors.eligibility.required ? "is-invalid" : ""
                }`}
              value={commission.eligibility}
              onChange={handleInputs}
            />
            {errors.eligibility.required && (
              <div className="invalid-feedback">Eligibility is required</div>
            )}
          </div>

          {/* Tax */}
          <div className="form-group">
            <label>Tax</label>
            <select
              name="tax"
              className={`form-control ${errors.tax.required ? "is-invalid" : ""
                }`}
              value={commission.tax}
              onChange={handleInputs}
            >
              <option value="">Select Tax</option>
              {tax.map((taxItem) => (
                <option key={taxItem.tax} value={taxItem.tax}>
                  {taxItem.tax}
                </option>
              ))}
            </select>
            {errors.tax.required && (
              <div className="invalid-feedback">Tax is required</div>
            )}
          </div>

          {/* Payment Type */}
          <div className="form-group">
            <label>Payment Type</label>
            <input
              type="text"
              name="paymentType"
              className={`form-control ${errors.paymentType.required ? "is-invalid" : ""
                }`}
              value={commission.paymentType}
              onChange={handleInputs}
            />
            {errors.paymentType.required && (
              <div className="invalid-feedback">Payment Type is required</div>
            )}
          </div>

          {/* Years Section */}
          {commission.years.map((year, yearIndex) => (
            <div key={yearIndex}>
              <div className="form-group">
                <label>Year</label>
                <select
                  name="year"
                  className={`form-control ${errors.years.required ? "is-invalid" : ""
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

              {year.courseTypes.map((courseType, courseTypeIndex) => (
                <div key={courseTypeIndex}>
                  <div className="form-group">
                    <label>Course Type</label>
                   
                    <select
                      name="courseType"
                      className={`form-control ${errors.courseType?.required ? "is-invalid" : ""
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
                      <option value="">Select Course Type</option>
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
                    <div key={intakeIndex} className="form-group">
                      <label>Intake</label>
                     <select
                        name="inTake"
                        className={`form-control ${errors.intake?.required ? "is-invalid" : ""
                          }`}
                        value={intake.inTake}
                        onChange={(e) =>
                          handleIntakeChange(
                            yearIndex,
                            courseTypeIndex,
                            intakeIndex,
                            "intake",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Select Intake</option>
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

                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          removeIntake(yearIndex, courseTypeIndex, intakeIndex)
                        }
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => addIntake(yearIndex, courseTypeIndex)}
                  >
                    Add Intake
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() =>
                      removeCourseType(yearIndex, courseTypeIndex)
                    }
                  >
                    <FaTrash /> Remove Course Type
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => addCourseType(yearIndex)}
              >
                Add Course Type
              </button>
            </div>
          ))}

          <button type="button" className="btn btn-secondary" onClick={addYear}>
            Add Year
          </button>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCommission;
