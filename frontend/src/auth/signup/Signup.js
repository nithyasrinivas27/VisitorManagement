import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "./Signup.css"; // Import the CSS file for styling
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Signup = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Security", // default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/signup`, formData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/signin");
      })
      .catch((error) => {
        console.error("Sign-up error", error);
        toast.warn(
          error.response.data.message || "Sign-up error. Please try again."
        );
      });
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
      <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="Company Logo" className="logo-signup" /> {/* Add your logo path */}
      <h2 className="title-signup">Streamlining Your Visitor Experience</h2>
        <form onSubmit={handleSubmit}>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            required
            className="signup-input-field" 
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="signup-input-field" 
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="signup-input-field" 
          />
          <select name="role" onChange={handleChange} className="select-field" >
            <option value="Security">Security</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
          </select>
          <button type="submit" className="submit-button">Sign Up</button>
        </form>
        <div className="signin-link">
          <p>Already registered? <Link to="/signin" className="signin-button">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
