

import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import List from "./pages/List";
import Stepperform from "./pages/Stepperform";
import Product from "./pages/sales/Listproduct";
import Addproduct from "./pages/sales/Addproduct";

function App() {
  const [authenticated, setAuthenticated] = useState(
    () => localStorage.getItem("authToken") !== null
  );
  const [roleId, setRoleId] = useState(localStorage.getItem("userRoleId"));

  const handleLogin = (roleId) => {
    setAuthenticated(true);
    setRoleId(roleId);
    localStorage.setItem("authToken", "yourAuthToken"); // Replace with actual token
    localStorage.setItem("userRoleId", roleId);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setRoleId(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRoleId");
  };

  useEffect(() => {
    // Check if the user is authenticated
    const authToken = localStorage.getItem("authToken");
    const userRoleId = localStorage.getItem("userRoleId");

    if (authToken) {
      setAuthenticated(true);
      setRoleId(userRoleId);
    }
  }, []); // Only runs on mount

  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Login
                  setAuthenticated={handleLogin}
                  setRoleId={setRoleId}
                  handleLogout={handleLogout}
                />
              }
            />
            <Route
              path="/List"
              element={
                authenticated && roleId === "1" ? (
                  <List />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/Stepperform"
              element={
                authenticated && roleId === "1" ? (
                  <Stepperform />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/Product"
              element={
                authenticated && roleId !== "1" ? (
                  <Product />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/Add-product"
              element={
                authenticated && roleId !== "1" ? (
                  <Addproduct />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;

