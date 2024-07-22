import React, { useEffect, useState } from "react";
import { getallCountryList, getStatesByCountry, getCitiesByState } from "../../api/country"; // Adjust the imports as necessary
import { toast } from "react-toastify";
import { saveUniversity } from "../../api/university";
import { useNavigate, Link } from "react-router-dom";
import Select from "react-select";
import Sidebar from "../../compoents/sidebar";

function Profile() {
  const initialState = {
    country: "",
    state: "",
   
  };

  const initialStateErrors = {
    country: { required: false },
    state: { required: false },
   
  };

  const [university, setUniversity] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const [countries, setCountries] = useState([]);
  const [countryStateCity, setCountryStateCity] = useState([{ country: "", state: "" }]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]); // To store cities per state

  const navigate = useNavigate();

  useEffect(() => {
    getAllCountryDetails();
  }, []);

  const getAllCountryDetails = () => {
    getallCountryList()
      .then((res) => {
        setCountries(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCountryChange = (selectedOption, index) => {
    const updatedCountryStateCity = [...countryStateCity];
    updatedCountryStateCity[index].country = selectedOption.value;
    updatedCountryStateCity[index].state = ""; // Reset state
    updatedCountryStateCity[index].city = ""; // Reset city
    setCountryStateCity(updatedCountryStateCity);

    // Fetch states for the selected country
    getStatesByCountry(selectedOption.value)
      .then((res) => {
        setStates(res?.data?.result || []); // Ensure states is set to an array
      })
      .catch((err) => {
        console.log(err);
        setStates([]); // Clear states if there's an error
      });
  };

  const handleStateChange = (selectedOption, index) => {
    const updatedCountryStateCity = [...countryStateCity];
    updatedCountryStateCity[index].state = selectedOption.value;
    updatedCountryStateCity[index].city = ""; // Reset city
    setCountryStateCity(updatedCountryStateCity);

    // Fetch cities for the selected state
    getCitiesByState(selectedOption.value)
      .then((res) => {
        setCities(res?.data?.result || []); // Ensure states is set to an array
      })
      .catch((err) => {
        console.log(err);
        setCities([]); // Clear states if there's an error
      });
  };

  const handleCityChange = (selectedOption, index) => {
    const updatedCountryStateCity = [...countryStateCity];
    updatedCountryStateCity[index].city = selectedOption.value;
    setCountryStateCity(updatedCountryStateCity);
  };

  const addCountryStateCityFields = () => {
    setCountryStateCity([...countryStateCity, { country: "", state: "", city: "" }]);
  };

  const handleValidation = (values) => {
    const errors = {
      country: { required: false },
      state: { required: false }
      
    }

    values.forEach((value, index) => {
      if (!value.country) {
        errors.country.required = true;
      }
      if (!value.state) {
        errors.state.required = true;
      }
     
    });

    return errors;
  };

  const handleErrors = (errors) => {
    return !Object.values(errors).some((field) => field.required);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(countryStateCity);
    setErrors(newError);
    setSubmitted(true);
    if (handleErrors(newError)) {
      saveUniversity(countryStateCity)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/ListUniversity");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "1.4783px solid rgba(11, 70, 84, 0.25)",
      borderRadius: "4.91319px",
      fontSize: "11px",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "#3B0051" : "#F2CCFF",
      ":hover": {
        color: "black",
      },
    }),
  };

  const countryOptions = countries.map((country) => ({
    value: country.name,
    label: country.name,
  }));

  const stateOptions = (index) => {
    return states.state && states.state.map((state) => ({
      value: state.name,
      label: state.name,
    }));
  };

//   const cityOptions = (index) => {
//     return cities.state && cities.state.map((city) => ({
//       value: city.cities,
//       label: city.cities,
//     }));
//   };

  return (
    <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
      <div className="container-fluid">
        <nav className="navbar navbar-vertical navbar-expand-lg">
          <Sidebar />
        </nav>
      </div>
      <div className="content-wrapper" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "13px" }}>
        <div className="content-header">
          <div className="container-fluid">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-xl-12">
                  <div className="card rounded-0 shadow-sm border-0">
                    <div className="card-header rounded-0 bg-white">
                      <h5 style={{ fontVariant: "all-small-caps", fontWeight: "bold" }}>
                        Add University Details
                      </h5>
                    </div>
                    <div className="card-body p-4">
                      <div className="row g-3">
                        {countryStateCity.map((item, index) => (
                          <React.Fragment key={index}>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Country<span className="text-danger">*</span>
                              </label>
                              <Select
                                placeholder="Select Country"
                                name="country"
                                styles={customStyles}
                                options={countryOptions}
                                onChange={(selectedOption) =>
                                  handleCountryChange(selectedOption, index)
                                }
                                className="submain-one-form-body-subsection-select"
                              />
                              {errors.country.required && submitted && <span className="text-danger">Country is required</span>}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                State<span className="text-danger">*</span>
                              </label>
                              <Select
                                placeholder="Select State"
                                name="state"
                                styles={customStyles}
                                options={stateOptions(index)}
                                onChange={(selectedOption) =>
                                  handleStateChange(selectedOption, index)
                                }
                                className="submain-one-form-body-subsection-select"
                                isDisabled={!item.country}
                              />
                              {errors.state.required && submitted && <span className="text-danger">State is required</span>}
                            </div>
                            {/* <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                City<span className="text-danger">*</span>
                              </label>
                              <Select
                                placeholder="Select City"
                                name="city"
                                styles={customStyles}
                                options={cityOptions(index)}
                                onChange={(selectedOption) =>
                                  handleCityChange(selectedOption, index)
                                }
                                className="submain-one-form-body-subsection-select"
                                isDisabled={!item.state}
                              />
                              {errors.city.required && submitted && <span className="text-danger">City is required</span>}
                            </div> */}
                          </React.Fragment>
                        ))}
                        <div className="col-xl-12">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={addCountryStateCityFields}
                          >
                            Add Country
                          </button>
                        </div>
                        <div className="add-customer-btns mb-40 d-flex justify-content-end ml-auto">
                          <Link
                            style={{
                              backgroundColor: "#231F20",
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            to="/ListUniversity"
                            className="btn btn-cancel border-0 px-4 py-2 fw-semibold text-uppercase text-white m-1"
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
                            className="btn btn-save border-0 px-4 py-2 fw-semibold text-uppercase text-white m-1"
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
  );
}

export default Profile;
