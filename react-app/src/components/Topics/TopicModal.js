// Modal.js
import React from 'react';

// const Modal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         {children}
//       </div>
//     </div>
//   );
// };


// Inside your Modal component file

const Modal = ({ isOpen, onClose, children }) => {
    const handleBackdropClick = (e) => {
      // Prevent any event inside the modal from propagating up to the backdrop
      e.stopPropagation();
    };
  
    const handleModalContentClick = (e) => {
      // Stop the event from propagating up to the backdrop
      e.stopPropagation();
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="modal-backdrop" onClick={handleBackdropClick}>
        <div className="modal-content" onClick={handleModalContentClick}>
          {children}
          {/* <button onClick={onClose}>Cancel</button> */}
        </div>
      </div>
    );
  };
  

export default Modal;
