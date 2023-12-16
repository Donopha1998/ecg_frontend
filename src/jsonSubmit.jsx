import React, { useState } from 'react';
import axios from 'axios';
import Modal from './modal'; // Import your Modal component
import './JsonSubmit.css'; // Import your custom CSS file for styling

const JsonSubmit = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [jsonValidationError, setJsonValidationError] = useState(false);

  const handleJsonChange = (event) => {
    setJsonInput(event.target.value);
    setJsonValidationError(false); // Reset the validation error
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const parsedJson = JSON.parse(jsonInput);

      // Proceed with the API request if JSON parsing is successful
      try {
        const response = await axios.post(
          "https://ecgcheck-production.up.railway.app/predict_data",
          parsedJson,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        response.data==0?setApiResponse('ABNORMAL'):setApiResponse('NORMAL');
        setModalOpen(true);
      } catch (error) {
        console.error('Error sending API request:', error);
      }
    } catch (error) {
      // Handle JSON validation error
      console.error('JSON validation error:', error);
      setJsonValidationError(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='center'>
      <div className="json-submit-container">
        <h1 className="heading">JSON Submit</h1>
        <form className="submit-form" onSubmit={handleSubmit}>
          <textarea
            value={jsonInput}
            onChange={handleJsonChange}
            className={`json-input ${jsonValidationError ? 'error' : ''}`}
            placeholder="Enter JSON here"
          />
          {jsonValidationError && <p className="error-message">Invalid JSON</p>}
          <button type="submit" className="submit-button">ANALYSE</button>
        </form>
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal} responseText={apiResponse} />
    </div>
  );
};

export default JsonSubmit;
