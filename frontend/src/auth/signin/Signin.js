import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer, toast } from 'react-toastify';
import './Signin.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Signin = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/signin`, formData)
      .then(response => {
        localStorage.setItem('token', response.data.token);
      navigate('/')

      })
      .catch(error => {
        console.error('Sign-in error', error);
        toast.warn( error.response.data.message || 'Sign-in error. Please try again.');
      });
  };

  return (
    <div className="signin-wrapper"> {/* Updated wrapper class */}
      <div className="signin-container">
        <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="Company Logo" className="logo" /> {/* Add your logo path */}
        <h2 className="title">Streamlining Your Visitor Experience</h2>
        <form onSubmit={handleSubmit} className="signin-form">
          <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="input-field" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="input-field" />
          <button type="submit" className="submit-button">Sign In</button>
        </form>
        <div className="signup-link">
          <p>Not registered? <Link to="/signup" className="signup-button">Sign Up</Link></p>
        </div>
      </div>
    </div>

  );
};

export default Signin;
