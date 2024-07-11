import React, { useState } from 'react';

const YourComponent = () => {
  const [campuses, setCampuses] = useState([]);

  const addCampus = () => {
    const newCampus = {
      intake: '',
      courseFee: '',
      duration: ''
    };
    setCampuses([...campuses, newCampus]);
  };

  const handleInputChange = (index, fieldName, value) => {
    const updatedCampuses = [...campuses];
    updatedCampuses[index][fieldName] = value;
    setCampuses(updatedCampuses);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div>
            <button
              type="button"
              onClick={addCampus}
              style={{ marginTop: '1.8rem', backgroundColor: '#9265cc' }}
              className="btn text-white"
            >
              Add Campus
            </button>
          </div>
        </div>

        {campuses.map((campus, index) => (
          <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
            <div style={{ marginTop: '1rem' }}>
              <label>Campus:</label>
              <input
                type="text"
                value={campus.campus}
                onChange={(e) => handleInputChange(index, 'intake', e.target.value)}
                className="form-control"
              />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <label>Intake:</label>
              <input
                type="text"
                value={campus.intake}
                onChange={(e) => handleInputChange(index, 'intake', e.target.value)}
                className="form-control"
              />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <label>Course Fee:</label>
              <input
                type="text"
                value={campus.courseFee}
                onChange={(e) => handleInputChange(index, 'courseFee', e.target.value)}
                className="form-control"
              />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <label>Duration:</label>
              <input
                type="text"
                value={campus.duration}
                onChange={(e) => handleInputChange(index, 'duration', e.target.value)}
                className="form-control"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourComponent;
