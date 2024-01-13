// ConfirmationModal.js

const ConfirmationModal = ({ isOpen, onClose, onConfirm, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          <p>{children}</p>
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onClose}>No</button>
        </div>
      </div>
    );
  };
  
  export default ConfirmationModal;
  