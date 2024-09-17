import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../Utils/Auth';

const PrivateRoute = ({ element: Element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated() ? <Element /> : <Navigate to="/" />}
    />
  );
};

export default PrivateRoute;
