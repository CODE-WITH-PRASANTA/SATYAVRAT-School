import { Navigate, useLocation } from "react-router-dom";
import "./Protected.css";

const Protected = ({ children }) => {
  const location = useLocation();

  const isAdmin = localStorage.getItem("isAdmin");
  const isAuthenticated = isAdmin === "true";

  // ❌ Not logged in → redirect
  if (!isAuthenticated) {
    return (
      <div className="protected-container">
        <div className="protected-box">
          <h2>🔐 Access Denied</h2>
          <p>Please login to continue</p>
        </div>

        <Navigate
          to="/login"
          replace
          state={{ from: location }}
        />
      </div>
    );
  }

  return children;
};

export default Protected;