// ApproveVisitor.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ApproveVisitor.css'; // Import the CSS file for animation styles

const ApproveVisitor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isApproving, setIsApproving] = useState(true); // State to handle the loading status
  const [message, setMessage] = useState('Approving Visitor...'); // State to handle dynamic message

  useEffect(() => {
    // Approve the visitor on page load
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/api/visitors/approve/${id}`)
      .then(() => {
        setIsApproving(false); // Set loading to false after approval
        setMessage('Visitor Approved!'); // Update the message
        setTimeout(() => {
          navigate('/'); // Navigate to home after a short delay
        }, 2000); // Adjust the timeout duration as needed
      })
      .catch((error) => {
        setMessage('Failed to approve visitor. Please try again.');
        setIsApproving(false);
      });
  }, [id, navigate]);

  return (
    <div className="approve-visitor-container">
      <div className="message">
        {isApproving ? (
          <div className="loader-container">
            <div className="loader"></div> {/* Animated Loader */}
            <p>{message}</p>
          </div>
        ) : (
          <p className="approved-message">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ApproveVisitor;
