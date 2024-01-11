import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ element, requiredRole }) => {
  const authToken = localStorage.getItem('authToken');
  const userRoleId = localStorage.getItem('userRoleId');

  if (!authToken || !userRoleId || userRoleId !== requiredRole) {
    // Redirect to the login page if not authenticated or not the required role
    return <Navigate to="/" />;
  }

  // Allow access to the protected route
  return <Route element={element} />;
};

export default PrivateRoute;
