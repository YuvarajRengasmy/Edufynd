import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  // Extract the previous page name from the URL or define it based on your routes
  const getPageName = () => {
    const path = location.pathname.split('/').filter(Boolean); // Get the path segments
    return path[path.length - 1] || "Previous Page"; // Use the last segment as the name or a default value
  };

  return (
    <button className='btn float-end'
      onClick={handleBack}
      style={{
     
        top: '10px',
        right: '10px',
        
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        zIndex: 1000,
      }}
    >
      Back to Previous Page
    </button>
  );
};

export default BackButton;
