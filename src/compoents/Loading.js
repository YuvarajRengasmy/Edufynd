// Loading.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Loading = () => {
  const spinnerStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#007bff', // Bootstrap primary color
    animation: 'bouncing 0.6s infinite alternate',
    position: 'relative',
    top: '0',
  };

  const loadingContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const loadingTextStyle = {
    marginTop: '1rem',
    textAlign: 'center',
  };

  return (
    <div style={loadingContainerStyle}>
      <div style={spinnerStyle}></div>
      <div style={loadingTextStyle}>
        <h5>Loading...</h5>
      
      </div>

      <style>
        {`
          @keyframes bouncing {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-20px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
