import React from 'react';
import './Modal.css'; // Import the CSS for styling

const Modal = ({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title || "Confirm Action"}</h2>
        <p>{message || "Are you sure?"}</p>
        <div className="modal-buttons">
          <button className="modal-confirm" onClick={onConfirm}>
            {confirmText || "Yes"}
          </button>
          <button className="modal-cancel" onClick={onClose}>
            {cancelText || "No"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
