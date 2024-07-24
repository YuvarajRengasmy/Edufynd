import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { saveClient } from "../../api/client";
import { getallClientModule } from "../../api/universityModule/clientModule";
import Sidebar from "../../compoents/sidebar";
import Select from "react-select";
import CountryRegion from "countryregionjs";

function AddAgent() {
  const initialState = {
    country: "",
    campuses: [
      {
        state: "",
        lga: "",
        states: [],
        lgas: [],
      },
    ],
  };

  const initialStateErrors = {
    country: { required: false },
    campuses: [{}]
  };

  const [client, setClient] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [lgas, setLGAs] = useState([]);
  const [type, setType] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllClientDetails();
    fetchCountries();
  }, []);

  const getAllClientDetails = () => {
    getallClientModule()
      .then((res) => {
        setType(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCountries = async () => {
    try {
      const countries = await getCountryRegionInstance().getCountries();
      setCountries(countries.map(country => ({
        value: country.id,
        label: country.name
      })));
    } catch (error) {
      console.error(error);
    }
  };

  const getCountryRegionInstance = () => {
    return new CountryRegion();
  };

  const fetchStates = async (countryId) => {
    try {
      const states = await getCountryRegionInstance().getStates(countryId);
      const updatedStates = states.map(state => ({
        value: state.id,
        label: state.name
      }));
      setStates(updatedStates);
      setClient(prevState => ({
        ...prevState,
        campuses: prevState.campuses.map(campus => ({
          ...campus,
          states: updatedStates,
          lgas: [] // Clear LGAs when the state changes
        }))
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLGAs = async (countryId, stateId) => {
    try {
      const lgas = await getCountryRegionInstance().getLGAs(countryId, stateId);
      const updatedLGAs = lgas.map(lga => ({
        value: lga.id,
        label: lga.name
      }));
      setLGAs(updatedLGAs);
      setClient(prevState => ({
        ...prevState,
        campuses: prevState.campuses.map(campus => (
          campus.state === stateId
            ? { ...campus, lgas: updatedLGAs }
            : campus
        ))
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCountryChange = (selectedCountry) => {
    setClient(prevState => ({
      ...prevState,
      country: selectedCountry.value,
      campuses: prevState.campuses.map(campus => ({
        ...campus,
        state: "",
        lga: "",
        lgas: [],
      }))
    }));
    fetchStates(selectedCountry.value);
  };

  const handleStateChange = (selectedState, index) => {
    setClient(prevState => ({
      ...prevState,
      campuses: prevState.campuses.map((campus, i) => (
        i === index
          ? { ...campus, state: selectedState.value, lga: "", lgas: [] }
          : campus
      ))
    }));
    fetchLGAs(client.country, selectedState.value);
  };

  const handleLGAChange = (selectedLGA, index) => {
    setClient(prevState => ({
      ...prevState,
      campuses: prevState.campuses.map((campus, i) => (
        i === index
          ? { ...campus, lga: selectedLGA.value }
          : campus
      ))
    }));
  };

  const addCampus = () => {
    setClient(prevState => ({
      ...prevState,
      campuses: [
        ...prevState.campuses,
        {
          state: "",
          lga: "",
          states: states, // Add states to new campus
          lgas: [],
        }
      ]
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Validate form
    const newError = handleValidation(client);
    setErrors(newError);
    setSubmitted(true);
  
    // Check for validation errors
    if (handleErrors(newError)) {
      // Prepare and format client data for saving
      const updatedClient = {
        ...client,
        country: countries.find(option => option.value === client.country)?.label || client.country,
        campuses: client.campuses.map(campus => ({
          ...campus,
          state: states.find(option => option.value === campus.state)?.label || campus.state,
          lga: lgas.find(option => option.value === campus.lga)?.label || campus.lga,
        }))
      };
  
      // Save client data
      saveClient(updatedClient)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/client");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    } else {
      toast.error("Please fill all mandatory fields.");
    }
  };
  
  const handleValidation = (data) => {
    let error = initialStateErrors;
    if (!data.country) {
      error.country.required = true;
    }
    data.campuses.forEach((campus, index) => {
      if (!campus.state) {
        error.campuses[index].state = { required: true };
      }
      if (!campus.lga) {
        error.campuses[index].lga = { required: true };
      }
    });
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

  return (
    <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
      <div className="container-fluid">
        <nav className="navbar navbar-vertical navbar-expand-lg">
          <Sidebar />
        </nav>
        <div className="content-wrapper" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "13px" }}>
          <div className="content-header">
            <div className="content container-fluid">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <label style={{ color: "#231F20" }}>
                      Country<span className="text-danger">*</span>
                    </label>
                    <Select
                      placeholder="Select Country"
                      onChange={handleCountryChange}
                      options={countries}
                      value={countries.find(option => option.value === client.country)}
                      styles={customStyles}
                      className="submain-one-form-body-subsection-select"
                    />
                    {errors.country.required && (
                      <div className="text-danger form-text">
                        This field is required.
                      </div>
                    )}
                  </div>
                </div>
                {client.campuses.map((campus, index) => (
                  <div className="row" key={index}>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label style={{ color: "#231F20" }}>
                        State<span className="text-danger">*</span>
                      </label>
                      <Select
                        placeholder="Select State"
                        onChange={(option) => handleStateChange(option, index)}
                        options={campus.states || []}
                        value={campus.states.find(option => option.value === campus.state)}
                        styles={customStyles}
                        className="submain-one-form-body-subsection-select"
                      />
                      {errors.campuses[index]?.state?.required && (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      )}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label style={{ color: "#231F20" }}>
                        City<span className="text-danger">*</span>
                      </label>
                      <Select
                        placeholder="Select City"
                        onChange={(option) => handleLGAChange(option, index)}
                        options={campus.lgas || []}
                        value={campus.lgas.find(option => option.value === campus.lga)}
                        styles={customStyles}
                        className="submain-one-form-body-subsection-select"
                      />
                      {errors.campuses[index]?.lga?.required && (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div className="add-customer-btns mb-40 d-flex justify-content-end ml-auto">
                  <button
                    type="button"
                    style={{
                      backgroundColor: "#231F20",
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: "12px",
                    }}
                    className="btn btn-cancel border-0 fw-semibold text-uppercase text-white px-4 py-2 m-2"
                    onClick={addCampus}
                  >
                    Add Campus
                  </button>
                  <button
                    style={{
                      backgroundColor: "#FE5722",
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: "12px",
                    }}
                    type="submit"
                    className="btn btn-save border-0 fw-semibold text-uppercase text-white px-4 py-2 m-2"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAgent;
