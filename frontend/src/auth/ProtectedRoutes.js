import React from 'react';
import { Navigate } from 'react-router-dom';  // Use Navigate instead of Redirect
import { jwtDecode } from 'jwt-decode';  // Use named import

const ProtectedRoutes = ({ component: Component, allowedRoles, ...rest }) => {
  const token = localStorage.getItem('token');
  let user = null;

  if (token) {
    user = jwtDecode(token);  // Decode the JWT token to get the user info (including role)
  }
  // Check if user is authenticated and their role is allowed to access the route
  if (!token || (allowedRoles && !allowedRoles.includes(user?.role))) {
    return <Navigate to="/signin" />;  
  }

  return <Component {...rest} />;
};

export default ProtectedRoutes;
