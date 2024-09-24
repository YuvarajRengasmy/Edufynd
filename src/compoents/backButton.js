import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

 

  return (
    <>
    <div className='   text-end m-1' >
    <button className='btn btn-sm  btn-dark position-fixed  fw-semibold rounded-circle border-0   '
      onClick={handleBack}
      style={{
     
      bottom:'20px',
        right: '15px',
        
       
        cursor: 'pointer',
        zIndex: 1000,
      }}
    >
    <i class="fa fa-arrow-circle-left" aria-hidden="true"></i>
    </button>
    </div>
    </>
    
  );
};

export default BackButton;
