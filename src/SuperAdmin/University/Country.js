import React, { useState, useEffect } from 'react';
import universities from './universities';

const UniversitySelector = () => {
  const [country, setCountry] = useState('');
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  
  const countries = [...new Set(universities.map(uni => uni.country))];

  useEffect(() => {
    if (country) {
      const filtered = universities.filter(uni => uni.country === country);
      setFilteredUniversities(filtered);
    } else {
      setFilteredUniversities([]);
    }
  }, [country]);

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleSubmit = () => {
    console.log('Selected country code:', country);
  };

  return (
    <div>
      <label>Select Country</label>
      <select onChange={handleCountryChange} value={country}>
        <option value="">Select a country</option>
        {countries.map((c, index) => (
          <option key={index} value={c}>{c}</option>
        ))}
      </select>

      <label>Universities</label>
      <ul>
        {filteredUniversities.map((uni, index) => (
          <li key={index}>{uni.name}</li>
        ))}
      </ul>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default UniversitySelector;
