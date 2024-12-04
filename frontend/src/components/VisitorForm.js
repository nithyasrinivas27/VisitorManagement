// VisitorForm.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "./VisitorForm.css"; // Import your CSS styles

const VisitorForm = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    companyName:"",
    companyAddress:"",
    contactNumber:"",
    purpose: "",
    proofId: "",
    employeeId: "",
    photo: "",
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); // State for loader
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/employees`)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        toast.error("Failed to load employee data."); // Show error toast
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setFormData({ ...formData, photo: imageSrc });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.employeeId) {
      toast.warn("Please select an employee."); // Show warning toast
      return;
    }

    setLoading(true); // Start the loader

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/visitors`, formData)
      .then(() => {
        // setLoading(false); // Stop the loader
        toast.success("Visitor request submitted and email sent!", {
          onClose: () => navigate("/"), // Navigate to the dashboard after toast closes
        });
      })
      .catch((error) => {
        setLoading(false); // Stop the loader
        console.error(
          "Error submitting visitor request:",
          error.response?.data || error.message
        );
        toast.error(
          "Error: " + (error.response?.data.message || error.message)
        ); // Show error toast
      });
  };

  return (
    <>
      <div className="visitor-form-container">
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
        />{" "}
        {/* Toast container */}
        <h2 className="form-title">Add Visitor</h2>
        <form onSubmit={handleSubmit} className="visitor-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            type="text"
            name="companyAddress"
            placeholder="Company Address"
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            type="number"
            name="contactNumber"
            placeholder="Contact Number"
            onChange={handleChange}
            required
            className="form-input"
          />
          <textarea
            name="purpose"
            placeholder="Purpose"
            onChange={handleChange}
            required
            className="form-textarea"
          />
          <input
            type="text"
            name="proofId"
            placeholder="Proof ID"
            onChange={handleChange}
            required
            className="form-input"
          />
          <select
            name="employeeId"
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Person To Meet</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name} ({emp.email})
              </option>
            ))}
          </select>
          <div className="webcam-container">
            <Webcam
              audio={false}
              height={200}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={200}
              className="webcam"
            />
            <button
              type="button"
              onClick={handleCapture}
              className="capture-btn"
            >
              Capture Photo
            </button>
          </div>
          {capturedImage && (
            <img
              src={capturedImage}
              alt="Captured"
              className="captured-image"
            />
          )}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <div className="loader"></div> // Show loader during submission
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default VisitorForm;
