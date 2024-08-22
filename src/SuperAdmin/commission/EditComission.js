import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { updatedCommission, getSingleCommission } from "../../api/commission";
import { getallCurrency } from "../../api/currency";
import { getFilterYear } from "../../api/year";
import { getallTaxModule } from "../../api/universityModule/tax";
import { FaTrash } from "react-icons/fa";
import { getUniversitiesByCountry } from "../../api/university";
import Flags from "react-world-flags";

import Sidebar from "../../compoents/sidebar";

function AddCommission() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const initialState = {
    country: "",
    universityName: "",
    paymentMethod: "",
    amount: null,
    percentage: null,
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
    amount: { required: false },
    percentage: { required: false },
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

    return error;
  };
  // const addYear = () => {
  //   const newYear = {
  //     year: "",
  //     courseTypes: [{ courseType: "", intake: "", value: null }],
  //   };
  //   setYears([...years, newYear]);
  // };

  const addYear = () => {
    const newYear = {
      year: "",
      courseTypes: [
        {
          courseType: "",
          inTake: "",
          value: "",
        },
      ],
    };
    setCommission((prevCommission) => ({
      ...prevCommission,
      years: [...(prevCommission.years || []), newYear],
    }));
  };

  // const addCourseType = (yearIndex) => {
  //   const updatedYears = [...years];
  //   updatedYears[yearIndex].courseTypes.push({
  //     courseType: "",
  //     intake: "",
  //     value: null,
  //   });
  //   setYears(updatedYears);
  // };

  const addCourseType = (yearIndex) => {
    const newCourseType = {
      courseType: "",
      inTake: "",
      value: "",
    };
    const updatedYears = [...commission.years];
    updatedYears[yearIndex].courseTypes.push(newCourseType);
    setCommission({
      ...commission,
      years: updatedYears,
    });
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

  // const handlePageChange = (event, page) => {
  //   const from = (page - 1) * pageSize;
  //   const to = (page - 1) * pageSize + pageSize;
  //   setPagination({ ...pagination, from: from, to: to });
  // };
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the commission data
    const newError = handleValidation(commission);
    setErrors(newError);
    setSubmitted(true);

    // Check if all inputs are valid
    const allInputsValid = Object.values(newError);
    const valid = allInputsValid.every((x) => x.required === false);

    if (valid) {
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
      updatedCommission(dataToSave)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/list_commission");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
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
                            className="form-select form-select-lg rounded-2"
                            name="country"
                            style={{ fontSize: "12px" }}
                            value={commission.country}
                            onChange={handleCountryChange}
                          >
                            <option value="" style={{ fontSize: "12px" }}>
                              Select Country
                            </option>
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
                            className="form-select form-select-lg rounded-2"
                            name="universityName"
                            value={commission.universityName}
                            onChange={handleInputs}
                            style={{ fontSize: "12px" }}
                          >
                            <option value="" style={{ fontSize: "12px" }}>
                              {commission.universityName}
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

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Payment Method
                            <span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-select form-select-lg rounded-2"
                            value={commission?.paymentMethod}
                            name="paymentMethod"
                            onChange={handleInputs}
                            style={{ fontSize: "12px" }}
                          >
                            <option value="" style={{ fontSize: "12px" }}>
                              Select Payment Type
                            </option>
                            <option value="Fixed" style={{ fontSize: "12px" }}>
                              Fixed Amount
                            </option>
                            <option
                              value="Percentage"
                              style={{ fontSize: "12px" }}
                            >
                              Percentage
                            </option>
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
                                  value={commission?.commissionPaidOn}
                                  style={{ fontSize: "12px" }}
                                >
                                  <option
                                    value="PaidFees"
                                    style={{ fontSize: "12px" }}
                                  >
                                    Select Commission Paid On
                                  </option>
                                  <option
                                    value="CourseFees"
                                    style={{ fontSize: "12px" }}
                                  >
                                    Course Fees
                                  </option>
                                  <option
                                    value="PaidFees"
                                    style={{ fontSize: "12px" }}
                                  >
                                    Paid Fees
                                  </option>
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
                            style={{ fontSize: "12px" }}
                          />
                          {errors.eligibility.required ? (
                            <span className="text-danger form-text profile_error">
                              This field is required.
                            </span>
                          ) : null}
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Tax<span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-select form-select-lg rounded-2  "
                            name="tax"
                            onChange={handleInputs}
                            value={commission?.tax}
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
                            style={{ fontSize: "12px" }}
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
                            style={{ fontSize: "12px" }}
                          >
                            <option value="" style={{ fontSize: "12px" }}>
                              {" "}
                              Select Payment Type
                            </option>
                            <option
                              value="One_Time"
                              style={{ fontSize: "12px" }}
                            >
                              One Time
                            </option>
                            <option
                              value="Semester"
                              style={{ fontSize: "12px" }}
                            >
                              {" "}
                              Semester{" "}
                            </option>
                          </select>
                          {errors.paymentType.required ? (
                            <span className="text-danger form-text profile_error">
                              This field is required.
                            </span>
                          ) : null}
                        </div>
                        <div className="row g-2">
                          <div className="add-customer-btns mb-40 d-flex justify-content-end ml-auto">
                            <button
                              type="button"
                              className="btn btn-sm text-uppercase fw-semibold px-4 py-2 text-white ml-2"
                              style={{
                                backgroundColor: "#FE5722",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              onClick={addYear}
                            >
                              <i
                                class="fa fa-plus-circle"
                                aria-hidden="true"
                              ></i>
                              &nbsp;&nbsp; Add Year
                            </button>
                          </div>
                        </div>
                        <div className="row g-3 mt-3">
                          <div className="col-12">
                            {commission?.years &&
                              commission?.years?.map((year, yearIndex) => (
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
                                        fontSize: "12px",
                                      }}
                                      value={year.year} // Changed this line
                                      onChange={(e) =>
                                        handleInputChange(
                                          yearIndex,
                                          null,
                                          "year",
                                          e.target.value
                                        )
                                      }
                                      name="year"
                                      className="form-select form-select-lg rounded-2 mb-3"
                                      placeholder="Enter Year"
                                    >
                                      <option
                                        value=""
                                        style={{ fontSize: "12px" }}
                                      >
                                        Select Year
                                      </option>
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
                                    {year?.courseTypes &&
                                      year?.courseTypes.map(
                                        (courseType, courseTypeIndex) => (
                                          <div
                                            className="row g-3"
                                            key={courseTypeIndex}
                                          >
                                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                              <label
                                                style={{ color: "#231F20" }}
                                              >
                                                Course Type
                                              </label>
                                              <select
                                                className="form-select form-select-lg rounded-2"
                                                style={{ fontSize: "12px" }}
                                                value={courseType.courseType}
                                                onChange={(e) =>
                                                  handleInputChange(
                                                    yearIndex,
                                                    courseTypeIndex,
                                                    "courseType",
                                                    e.target.value
                                                  )
                                                }
                                              >
                                                <option
                                                  value=""
                                                  style={{ fontSize: "12px" }}
                                                >
                                                  {courseType.courseType}
                                                </option>
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
                                            </div>
                                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                              <label
                                                style={{ color: "#231F20" }}
                                              >
                                                Intake
                                              </label>
                                              <select
                                                className="form-select form-select-lg rounded-2"
                                                style={{ fontSize: "12px" }}
                                                value={courseType.inTake}
                                                onChange={(e) =>
                                                  handleInputChange(
                                                    yearIndex,
                                                    courseTypeIndex,
                                                    "inTake",
                                                    e.target.value
                                                  )
                                                }
                                              >
                                                <option
                                                  value=""
                                                  style={{ fontSize: "12px" }}
                                                >
                                                  {courseType.inTake}
                                                </option>
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
                                              <label
                                                style={{ color: "#231F20" }}
                                              >
                                                Value
                                              </label>
                                              <input
                                                className="form-control rounded-2"
                                                type="text"
                                                name="value"
                                                style={{ fontSize: "12px" }}
                                                placeholder="Value"
                                                value={courseType.value}
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
                                            <div className="add-customer-btns mb-40 d-flex justify-content-end ml-auto">
                                              <button
                                                type="button"
                                                className="btn btn-sm btn-danger text-white ml-2 mb-3"
                                                onClick={() =>
                                                  removeCourseType(
                                                    yearIndex,
                                                    courseTypeIndex
                                                  )
                                                }
                                              >
                                                <i
                                                  class="fa fa-trash"
                                                  aria-hidden="true"
                                                ></i>
                                              </button>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    <div className="add-customer-btns mb-40 d-flex justify-content-end ml-auto">
                                      <button
                                        type="button"
                                        className="btn btn-sm text-uppercase fw-semibold px-4 py-2 text-white ml-2"
                                        onClick={() => addCourseType(yearIndex)}
                                        style={{
                                          backgroundColor: "#FE5722",
                                          fontFamily: "Plus Jakarta Sans",
                                          fontSize: "12px",
                                        }}
                                      >
                                        <i
                                          class="fa fa-plus-circle"
                                          aria-hidden="true"
                                        ></i>
                                        &nbsp;&nbsp; Add Course
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>

                      <div className="row g-2">
                        <div className="add-customer-btns mb-40 d-flex justify-content-end ml-auto">
                          <Link
                            to="/list_commission"
                            style={{
                              backgroundColor: "#231F20",
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "14px",
                            }}
                            className="btn btn-cancel border-0 fw-semibold text-uppercase text-white px-4 py-2 m-2"
                          >
                            Cancel
                          </Link>
                          <button
                            style={{
                              backgroundColor: "#FE5722",
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "14px",
                            }}
                            type="submit"
                            className="btn btn-save border-0 fw-semibold text-uppercase  px-4 py-2 text-white m-2"
                          >
                            Update
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
    </>
  );
}

export default AddCommission;
