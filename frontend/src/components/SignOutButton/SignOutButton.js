import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal'; // Import the Modal component
import './SignOutButton.css'; // Import styles

const SignOutButton = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    // Navigate to the sign-in page
    navigate('/signin');
  };

  return (
    <>
      <button className="sign-out-btn" onClick={() => setModalOpen(true)}>
        Sign Out
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleSignOut}
        title="Confirm Sign Out"
        message="Do you really want to sign out?"
        confirmText="Yes"
        cancelText="No"
      />
    </>
  );
};

export default SignOutButton;
