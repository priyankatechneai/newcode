// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import List from './pages/List';
import Stepperform from './pages/Stepperform';
import Product from './pages/sales/Listproduct';
import Addproduct from './pages/sales/Addproduct';
import { isAuthenticated, getRole } from './component/authService'

const PrivateRoute = ({ element, path, role }) => {
  const isAuthenticatedUser = isAuthenticated();
  const userRole = getRole();

  if (!isAuthenticatedUser) {
    // Redirect to login if not authenticated
    return <Navigate to="/" />;
  }

  if (role && role !== userRole) {
    // Redirect to login if the user's role doesn't match the required role
    return <Navigate to="/" />;
  }

  return element;
};

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/List"
              element={<PrivateRoute element={<List />} role="1" />}
            />
            <Route path="/Stepperform" element={<Stepperform />}role="1" />
            <Route
              path="/Product"
              element={<PrivateRoute element={<Product />} role="2" />}
            />
            <Route
              path="/Add-product"
              element={<PrivateRoute element={<Addproduct />} role="2" />}
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
