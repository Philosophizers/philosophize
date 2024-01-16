// ConfirmationModal.js
import React from 'react';
import "./topic.css";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <p>{children}</p>
        <div className="modal-confirm-buttons">
          <button className="modal-confirm-button" onClick={onConfirm}>Yes</button>
          <button className="modal-cancel-button" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};
  
  export default ConfirmationModal;
  