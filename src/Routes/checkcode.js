import React, { useState } from 'react';

const FormComponent = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [customInputValue, setCustomInputValue] = useState('');

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);

    // Reset custom input value when changing options
    setCustomInputValue('');
  };

  const handleCustomInputChange = (e) => {
    setCustomInputValue(e.target.value);
  };

  return (
    <div className="col-lg-6">
      <div className="form-group">
        <label style={{ color: '#231F20' }}>
          Campus Name<span className="text-danger">*</span>
        </label>
        <select
          className="form-control"
          name="campus"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="">Select 1</option>
          <option value="categories">Categories</option>
          <option value="other">Other Campus</option>
        </select>
      </div>

      {/* Render custom input based on selected option */}
      {selectedOption === 'categories' && (
        <div className="form-group">
          <label style={{ color: '#231F20' }}>Enter Category</label>
          <input
            type="text"
            className="form-control"
            value={customInputValue}
            onChange={handleCustomInputChange}
          />
        </div>
      )}

      {selectedOption === 'other' && (
        <div className="form-group">
          <label style={{ color: '#231F20' }}>Enter Other Campus</label>
          <input
            type="text"
            className="form-control"
            value={customInputValue}
            onChange={handleCustomInputChange}
          />
        </div>
      )}
    </div>
  );
};

export default FormComponent;
