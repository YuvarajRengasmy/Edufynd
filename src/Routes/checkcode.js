import React, { useState } from 'react';
import Select from 'react-select';

const countriesData = [
  {
    name: "India",
    nationality: "India",
    code: "IN",
    is_default: false,
    status: "published",
    order: 0,
    state: [
      {
        name: "Andaman and Nicobar Islands",
        cities: ["Bamboo Flat", "Nicobar", "Port Blair", "South Andaman"]
      },
      {
        name: "Andhra Pradesh",
        cities: ["Amaravati", "Visakhapatnam", "Vijayawada"]
      }
      // ... other states
    ]
  }
  // ... other countries
];

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setSelectedState(null);
    setSelectedCity(null);
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setSelectedCity(null);
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const countryOptions = countriesData.map(country => ({
    value: country.name,
    label: country.name,
    states: country.state
  }));

  const stateOptions = selectedCountry
    ? selectedCountry.states.map(state => ({
        value: state.name,
        label: state.name,
        cities: state.cities
      }))
    : [];

  const cityOptions = selectedState
    ? selectedState.cities.map(city => ({
        value: city,
        label: city
      }))
    : [];

  return (
    <div>
      <label>Country:</label>
      <Select
        value={selectedCountry}
        onChange={handleCountryChange}
        options={countryOptions}
      />

      {selectedCountry && (
        <>
          <label>State:</label>
          <Select
            value={selectedState}
            onChange={handleStateChange}
            options={stateOptions}
          />
        </>
      )}

      {selectedState && (
        <>
          <label>City:</label>
          <Select
            value={selectedCity}
            onChange={handleCityChange}
            options={cityOptions}
          />
        </>
      )}
    </div>
  );
};

export default App;
