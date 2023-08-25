import React from 'react';
import './Modal.css'; // Import your custom CSS file for modal styling

const Modal = ({ isOpen, onClose, responseText }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>{responseText}</h2>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
