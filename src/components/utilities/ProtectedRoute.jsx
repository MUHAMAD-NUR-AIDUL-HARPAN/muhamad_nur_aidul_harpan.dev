import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  // Check if admin token exists in localStorage
  const token = localStorage.getItem("adminToken");
  
  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the protected component (AdminPage)
  return children;
};

export default ProtectedRoute;
