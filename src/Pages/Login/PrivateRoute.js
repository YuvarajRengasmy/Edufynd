import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../Utils/Auth'; // Assuming you have this function to check authentication

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

export default PrivateRoute;
