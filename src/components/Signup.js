import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      setResponseMessage("Passwords do not match.");
      return; 
    }

    fetch("http://127.0.0.1:8000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response", data);  
        if (data.message === "User registered successfully!") {
          setResponseMessage("Registration successful! Redirecting to login page...");
          setTimeout(() => {
            navigate("/login"); 
          }, 2000);
        } else {
          setResponseMessage(data.message || "An error occurred. Please try again.");
        }
      })
      .catch((error) => {
        setResponseMessage("An error occurred: " + error.message);
      });
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-section signup-left">
        <img
          src="/unnamed.jpg"
          alt="Signup Illustration"
          className="signup-image"
        />
      </div>
      <div className="signup-section signup-right">
        <button
          className="signin-button"
          onClick={() => navigate("/login")}
        >
          Sign In
        </button>
        <div className="signup-form-container">
          <h2 className="form-heading">
            Explore & Experience<br />
            <span className="form-subheading">
              Get onto your most comfortable journey yet. All the way up.
            </span>
          </h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-row">
              <div className="form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                name="password_confirmation"
                placeholder="Confirm Password"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="signup-button">
              Get Started
            </button>
          </form>
          {/* Show response message */}
          <p className="response-message">{responseMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
