import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getallCountryModule } from "../../api/universityModule/country";
import { getallCountryList, getStatesByCountry, getCitiesByState, getCountryByCountry } from "../../api/country";
// Define MAX_CAMPUS_FIELDS as per your requirement
const MAX_CAMPUS_FIELDS = 3;

const MyComponent = () => {
  const [university, setUniversity] = useState({
    country: "",
    campus: [{ country: "", state: "", cities: "" }],
  });
  const [countries, setCountries] = useState([]);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  useEffect(() => {
 
    // getAllCountryDetails();
    getAllCurrencyDetails();
   
   
  }, []);
  // Ensure data fetching functions are defined
  // const getAllCountryDetails = () => {
  //   getallCountryList()
  //     .then((res) => {
  //       setCountries(res?.data?.result || []);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const getAllCurrencyDetails = () => {
    getallCountryModule()
      .then((res) => {
        setCountries(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCountryChange = async (selectedOption, index) => {
    if (index < 0 || index >= university.campus.length) {
      console.error("Index out of range");
      return;
    }

    const updatedCampus = [...university.campus];
    updatedCampus[index].country = selectedOption.value;
    updatedCampus[index].state = ""; // Reset state
    updatedCampus[index].cities = ""; // Reset city
    setUniversity(prevUniversity => ({
      ...prevUniversity,
      campus: updatedCampus
    }));

    try {
      // Fetch states for the selected country
      const response = await  getCountryByCountry(selectedOption.value);
      const result = response.data.result;
      setStates(result.states || []);
      setCities([]); // Clear cities since state is reset
    } catch (err) {
      console.error("Error fetching states:", err);
    }
  };

  const handleStateChange = async (selectedOption, index) => {
    if (index < 0 || index >= university.campus.length) {
      console.error("Index out of range");
      return;
    }

    const updatedCampus = [...university.campus];
    updatedCampus[index].state = selectedOption.value;
    updatedCampus[index].cities = ""; // Reset city
    setUniversity(prevUniversity => ({
      ...prevUniversity,
      campus: updatedCampus
    }));

    try {
      // Fetch cities for the selected state
      const response = await getCitiesByState(selectedOption.value);
      const result = response.data.result;
      setCities(result.cities || []);
    } catch (err) {
      console.error("Error fetching cities:", err);
    }
  };

  const handleCityChange = (selectedOption, index) => {
    if (index < 0 || index >= university.campus.length) {
      console.error("Index out of range");
      return;
    }

    const updatedCampus = [...university.campus];
    updatedCampus[index].cities = selectedOption.value;
    setUniversity(prevUniversity => ({
      ...prevUniversity,
      campus: updatedCampus
    }));
  };

  const addCampusFields = () => {
    if (university.campus.length < MAX_CAMPUS_FIELDS) {
      setUniversity(prevUniversity => ({
        ...prevUniversity,
        campus: [
          ...prevUniversity.campus,
          { country: "", state: "", cities: "" }
        ]
      }));
    } else {
      alert("Maximum of 3 campus fields can be added.");
    }
  };

  // Mock data for Select options
  const countryOptions = countries.map(country => ({ value: country.name, label: country.name }));

  const stateOptions = states.map(state => ({ value: state.name, label: state.name }));
  const cityOptions = cities.map(city => ({ value: city, label: city }));

  return (
    <div>
      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
        <label style={{ color: "#231F20" }}>
          Country<span className="text-danger">*</span>
        </label>
        <Select
          placeholder="Select Country"
          name="country"
          options={countryOptions}
          value={countryOptions.find(option => option.value === university.country)}
          onChange={(selectedOption) => handleCountryChange(selectedOption, 0)} // Adjust index if needed
          className="submain-one-form-body-subsection-select"
        />
      </div>

      {university.campus.map((campusField, index) => (
        <div className="row g-3" key={index}>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label style={{ color: "#231F20" }}>
              State<span className="text-danger">*</span>
            </label>
            <Select
              placeholder="Select State"
              name="state"
              options={stateOptions}
              value={stateOptions.find(option => option.value === campusField.state)}
              onChange={(selectedOption) => handleStateChange(selectedOption, index)}
              className="submain-one-form-body-subsection-select"
            />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label style={{ color: "#231F20" }}>
              City<span className="text-danger">*</span>
            </label>
            <Select
              placeholder="Select City"
              name="cities"
              options={cityOptions}
              value={cityOptions.find(option => option.value === campusField.cities)}
              onChange={(selectedOption) => handleCityChange(selectedOption, index)}
              className="submain-one-form-body-subsection-select"
            />
          </div>
        </div>
      ))}

      <button onClick={addCampusFields}>Add Campus</button>
    </div>
  );
};

export default MyComponent;
