import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";

function PrivateRoute({ children }) {
  const { email } = useContext(AuthContext);
  const location = useLocation();

  // Check if user is authenticated via context or localStorage
  const isAuthenticated = email || localStorage.getItem("userEmail");

  if (isAuthenticated) {
    return children; // Render protected content
  }

  // Redirect to login with state info to redirect back after login
  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default PrivateRoute;
