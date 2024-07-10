import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const YourComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addSpecialization = () => {
    if (inputValue.trim() !== '') {
      setSelectedSpecializations([
        ...selectedSpecializations,
        { specialization: inputValue, values: ['', '', ''] }
      ]);
      setInputValue('');
      setSubmitted(false);
    } else {
      setSubmitted(true);
    }
  };

  const removeSpecialization = (index) => {
    const updatedSpecializations = [...selectedSpecializations];
    updatedSpecializations.splice(index, 1);
    setSelectedSpecializations(updatedSpecializations);
  };

  const handleValueChange = (index, valueIndex, event) => {
    const updatedSpecializations = [...selectedSpecializations];
    updatedSpecializations[index].values[valueIndex] = event.target.value;
    setSelectedSpecializations(updatedSpecializations);
  };

  return (
    <div>
      <div className="d-flex">
        <div className="col-lg-6 col-md-12">
          <label style={{ color: '#9265cc' }}>
            Specialization<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            onChange={handleInputChange}
            value={inputValue}
            className="form-control"
            placeholder="Enter Specialization"
            name="specialization"
          />
          {selectedSpecializations.length === 0 && submitted && (
            <span className="text-danger form-text">This field is required.</span>
          )}
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6">
          <div>
            <button
              type="button"
              onClick={addSpecialization}
              style={{
                marginTop: '1.8rem',
                backgroundColor: '#9265cc',
              }}
              className="btn text-white"
            >
              Add Specialization
            </button>
          </div>
        </div>
      </div>

      {selectedSpecializations.map((specialization, index) => (
        <div key={index} className="mt-3">
          <h4>{specialization.specialization}</h4>
          <div className="d-flex flex-wrap">
            {specialization.values.map((value, valueIndex) => (
              <div key={valueIndex} className="mr-3 mb-3">
                <input
                  type="text"
                  value={value}
                  onChange={(event) => handleValueChange(index, valueIndex, event)}
                  className="form-control"
                  placeholder={`Value ${valueIndex + 1}`}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => removeSpecialization(index)}
            className="btn btn-sm btn-danger mt-2"
          >
            Remove Specialization
          </button>
        </div>
      ))}
    </div>
  );
};

export default YourComponent;
