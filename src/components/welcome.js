import React from "react";
import { useNavigate } from "react-router-dom";
const Welcome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login"); 
  };

  return (
    <div className="welcome-container">
      <div className="welcome-left">
        <img
          src="/unnamed.jpg" 
          alt="Welcome Illustration"
          className="welcome-image"
        />
      </div>
      <div className="welcome-right">
        <h2 className="welcome-heading">Welcome to Your Journey!</h2>
        <p className="welcome-text">
          You've successfully logged in. Now you can explore all the features
          and begin your journey to success.
        </p>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Welcome;
