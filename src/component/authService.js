// authService.js

const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");
    return !!token;
  };
  
  const getRole = () => {
    return localStorage.getItem("userRoleId");
  };
  
  export { isAuthenticated, getRole };
  