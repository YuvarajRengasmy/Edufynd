import React, { useState } from 'react';

const MyFormComponent = () => {
  const [inputs, setInputs] = useState({
    commissionValue: '',
    paymentType: '',
    paymentStatus: '',
    paymentValue1: '',
    paymentStatus1: '',
    paymentValue2: '',
    paymentStatus2: '',
    paymentValue3: '',
    paymentStatus3: '',
    // Other necessary inputs
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const status = [
    { statusName: 'Paid' },
    { statusName: 'Pending' },
    { statusName: 'Failed' }
  ];

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    const totalCommission = parseFloat(inputs.commissionValue || 0);
    const installment1 = parseFloat(inputs.paymentValue1 || 0);
    const installment2 = parseFloat(inputs.paymentValue2 || 0);
    const installment3 = parseFloat(inputs.paymentValue3 || 0);

    if (!inputs.commissionValue) {
      newErrors.commissionValue = { required: true };
      isValid = false;
    }

    if (inputs.paymentType === 'twoTime') {
      const totalTwoTime = installment1 + installment2;
      if (totalTwoTime !== totalCommission) {
        newErrors.paymentValue1 = 'Installment values must match the consulting fee';
        newErrors.paymentValue2 = 'Installment values must match the consulting fee';
        isValid = false;
      }
    }

    if (inputs.paymentType === 'multipleTime') {
      const totalMultipleTime = installment1 + installment2 + installment3;
      if (totalMultipleTime !== totalCommission) {
        newErrors.paymentValue1 = 'Installment values must match the consulting fee';
        newErrors.paymentValue2 = 'Installment values must match the consulting fee';
        newErrors.paymentValue3 = 'Installment values must match the consulting fee';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (validateForm()) {
      // Submit form if valid
      alert('Form is valid and submitted!');
    }
  };

  return (
    <div className="card-body">
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="intakeName" className="form-label">Consulting Fees</label>
          <input
            type="text"
            className="form-control"
            id="intakeName"
            name="commissionValue"
            value={inputs.commissionValue}
            onChange={handleInputs}
            placeholder='Enter commission value'
          />
          {submitted && errors.commissionValue?.required && (
            <span className="text-danger">Consulting Fees is required</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">Payment Mode</label>
          <select className='form-select' name='paymentType' value={inputs.paymentType} onChange={handleInputs}>
            <option>--Select Payment Mode--</option>
            <option value="oneTime">One Time</option>
            <option value="twoTime">Two Time</option>
            <option value="multipleTime">Multiple Time</option>
          </select>
        </div>

        {inputs.paymentType === "oneTime" && (
          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">Payment Status</label>
            <select className='form-select' name='paymentStatus' value={inputs.paymentStatus} onChange={handleInputs}>
              <option value={""}>Select Status</option>
              {status.map((data, index) => (
                <option key={index} value={data?.statusName}>{data?.statusName}</option>
              ))}
            </select>
          </div>
        )}

        {inputs.paymentType === "twoTime" && (
          <div>
            <div className="mb-3">
              <label htmlFor="startDate" className="form-label">Installment 1</label>
              <input
                type="text"
                className="form-control"
                id="startDate"
                name="paymentValue1"
                value={inputs.paymentValue1}
                onChange={handleInputs}
                placeholder='Enter payment value'
              />
              {submitted && errors.paymentValue1 && (
                <span className="text-danger">{errors.paymentValue1}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="startDate" className="form-label">Installment 2</label>
              <input
                type="text"
                className="form-control"
                id="startDate"
                name="paymentValue2"
                value={inputs.paymentValue2}
                onChange={handleInputs}
                placeholder='Enter payment value'
              />
              {submitted && errors.paymentValue2 && (
                <span className="text-danger">{errors.paymentValue2}</span>
              )}
            </div>
          </div>
        )}

        {inputs.paymentType === "multipleTime" && (
          <div>
            <div className="mb-3">
              <label htmlFor="startDate" className="form-label">Installment 1</label>
              <input
                type="text"
                className="form-control"
                id="startDate"
                name="installment1"
                value={inputs.installment1}
                onChange={handleInputs}
                placeholder='Enter payment value'
              />
              {submitted && errors.paymentValue1 && (
                <span className="text-danger">{errors.paymentValue1}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="startDate" className="form-label">Installment 2</label>
              <input
                type="text"
                className="form-control"
                id="startDate"
                name="installment2"
                value={inputs.installment2}
                onChange={handleInputs}
                placeholder='Enter payment value'
              />
              {submitted && errors.paymentValue2 && (
                <span className="text-danger">{errors.paymentValue2}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="startDate" className="form-label">Installment 3</label>
              <input
                type="text"
                className="form-control"
                id="startDate"
                name="paymentValue3"
                value={inputs.paymentValue3}
                onChange={handleInputs}
                placeholder='Enter payment value'
              />
              {submitted && errors.paymentValue3 && (
                <span className="text-danger">{errors.paymentValue3}</span>
              )}
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-primary float-end">
          {inputs.isEdit ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default MyFormComponent;
