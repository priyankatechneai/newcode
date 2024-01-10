import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import List from './pages/List';
import Stepperform from './pages/Stepperform';
import Product from './pages/sales/Listproduct';
import Addproduct from './pages/sales/Addproduct';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Login setAuthenticated={setAuthenticated} />} />
            <Route path="/List" element={authenticated ? <List /> : <Navigate to="/" />} />
            <Route path="/Stepperform" element={authenticated ? <Stepperform /> : <Navigate to="/" />} />
            <Route path="/Product" element={authenticated ? <Product /> : <Navigate to="/" />} />
            <Route path="/Add-product" element={authenticated ? <Addproduct /> : <Navigate to="/" />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
