import React, { useState } from "react";
import axios from "axios";
import "./ImageUpload.css"; // Import your custom CSS file for styling
import Modal from "./modal";

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState("");

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();     

    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);

      try {
        const response = await axios.post("http://localhost:5000/predict_image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setApiResponse(response.data);
        console.log(response.data)
        setModalOpen(true);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="topcon">
      <div className="image-upload-container">
        <h1 className="heading">Image Upload</h1>
        <form className="upload-form" onSubmit={handleSubmit}>
          <div className="image-preview">
            {previewImage && <img src={previewImage} alt="Preview" />}
          </div>
          <label className="file-input-label">
            <span>Choose Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
          </label>
          <button type="submit" className="upload-button">
            Analyse
          </button>
        </form>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        responseText={apiResponse}
      />
    </div>
  );
};

export default ImageUpload;
