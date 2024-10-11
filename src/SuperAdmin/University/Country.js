import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Roadmap = () => {
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center">

        {/* First Circle */}
        <div className="position-relative text-center" style={{ width: "150px" }}>
          <div className="circle bg-primary text-white d-flex justify-content-center align-items-center rounded-circle">
            2020
          </div>
          <div className="mt-3">
            <h5>Your Text Here</h5>
            <p className="text-muted">This slide is 100% editable. Adapt it to your needs and capture your audience's attention.</p>
          </div>
        </div>

        {/* SVG Line */}
        {/* <div style={{ position: 'relative', flex: "1 1 auto", maxWidth: "100%" }}>
          <svg width="100%" height="100" viewBox="0 0 400 100">
            <path
              d="M 0 50 Q 100 0 200 50 T 400 50"
              fill="transparent"
              stroke="black"
              strokeWidth="8"
            />
          </svg>
        </div> */}

        {/* Second Circle */}
        <div className="position-relative text-center" style={{ width: "150px" }}>
          <div className="circle bg-danger text-white d-flex justify-content-center align-items-center rounded-circle">
            2015
          </div>
          <div className="mt-3">
            <h5>Your Text Here</h5>
            <p className="text-muted">This slide is 100% editable. Adapt it to your needs and capture your audience's attention.</p>
          </div>
        </div>

        {/* SVG Line */}
        <div style={{ position: 'relative', flex: "1 1 auto", maxWidth: "100%" }}>
          <svg width="100%" height="100" viewBox="0 0 400 100">
            <path
              d="M 0 50 Q 100 0 200 50 T 400 50"
              fill="transparent"
              stroke="black"
              strokeWidth="8"
            />
          </svg>
        </div>

        {/* Third Circle */}
        <div className="position-relative text-center" style={{ width: "150px" }}>
          <div className="circle bg-success text-white d-flex justify-content-center align-items-center rounded-circle">
            2005
          </div>
          <div className="mt-3">
            <h5>Your Text Here</h5>
            <p className="text-muted">This slide is 100% editable. Adapt it to your needs and capture your audience's attention.</p>
          </div>
        </div>

        {/* SVG Line */}
        <div style={{ position: 'relative', flex: "1 1 auto", maxWidth: "100%" }}>
          <svg width="100%" height="100" viewBox="0 0 400 100">
            <path
              d="M 0 50 Q 100 0 200 50 T 400 50"
              fill="transparent"
              stroke="black"
              strokeWidth="8"
            />
          </svg>
        </div>

        {/* Fourth Circle */}
        <div className="position-relative text-center" style={{ width: "150px" }}>
          <div className="circle bg-warning text-white d-flex justify-content-center align-items-center rounded-circle">
            2000
          </div>
          <div className="mt-3">
            <h5>Your Text Here</h5>
            <p className="text-muted">This slide is 100% editable. Adapt it to your needs and capture your audience's attention.</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Roadmap;
