import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response", data);

        if (data.message === "Login successful!") {
          setResponseMessage("Login successful! Redirecting to welcome page...");
          setTimeout(() => {
            navigate("/welcome"); 
          }, 2000);
        } else {
          setResponseMessage(data.message || "Invalid login credentials.");
        }
      })
      .catch((error) => {
        setResponseMessage("An error occurred: " + error.message);
      });
  };

  return (
    <div className="login-wrapper">
      <div className="login-section login-left">
        <img
          src="/unnamed.jpg"
          alt="Login Illustration"
          className="login-image"
        />
      </div>
      <div className="login-section login-right">
        <div className="login-form-container">
          <h2 className="form-heading">
            Welcome Back! <br />
            <span className="form-subheading">
              Please log in to continue your journey.
            </span>
          </h2>
          <form onSubmit={handleSubmit} className="login-form">
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
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <p className="response-message">{responseMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
