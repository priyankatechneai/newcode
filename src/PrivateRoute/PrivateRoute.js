// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, requiredRole }) => {
  const isAuthenticated = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRoleId');

  if (!isAuthenticated || (requiredRole && userRole !== requiredRole)) {
    // Redirect to the login page if not authenticated or role mismatch
    return <Navigate to="/login" />;
  }

  // Render the component if authenticated and roles match
  return <Route element={element} />;
};

export default PrivateRoute;
