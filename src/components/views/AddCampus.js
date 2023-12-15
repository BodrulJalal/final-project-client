import React, { useState } from 'react';
import axios from 'axios';
import './AddCampusForm.css';
import { useHistory } from 'react-router-dom';

const AddCampusForm = () => {
  const [campus, setCampus] = useState({
    name: '',
    address: '',
    description: '',
    imageUrl: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!campus.name) newErrors.name = 'Name is required';
    if (!campus.address) newErrors.address = 'Address is required';
    if (!campus.description) newErrors.description = 'Description is required';
    if (!campus.imageUrl) newErrors.imageUrl = 'Image URL is required'
    else if (!isValidHttpUrl(campus.imageUrl)) {
        newErrors.imageUrl = 'Invalid URL';
    };
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidHttpUrl = (string) => {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  };

  const history = useHistory(); // For navigation

  const handleBack = () => {
    history.push('/campuses'); // Navigate to All Campuses view
  };

  const handleChange = (event) => {
    setCampus({ ...campus, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      try {
        await axios.post('http://localhost:5001/api/campuses', campus);
        // Handle success (e.g., redirect or display message)
      } catch (error) {
        console.error('Error adding campus:', error);
        // Display error message
      }
    }
  };

  return (
    <div className="form-container">

      <button onClick={handleBack} className="back-button">Back to All Campuses</button>

      <h2>Add Campus</h2>
      <form onSubmit={handleSubmit} className="campus-form">
        <div className="form-field">
          <label>Name:</label>
          <input
            name="name"
            value={campus.name}
            onChange={handleChange}
            placeholder="Campus Name"
            className={errors.name ? 'error' : ''}
          />{errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="form-field">
          <label>Address:</label>
          <input
            name="address"
            value={campus.address}
            onChange={handleChange}
            placeholder="Address"
            className={errors.address ? 'error' : ''}
          />{errors.address && <div className="error-message">{errors.address}</div>}
        </div>

        <div className="form-field">
          <label>Description:</label>
          <textarea
            name="description"
            value={campus.description}
            onChange={handleChange}
            placeholder="Description"
            className={errors.address ? 'error' : ''}
          />{errors.description && <div className="error-message">{errors.description}</div>}
        </div>

        <div className="form-field">
          <label>Image URL:</label>
          <input
            name="imageUrl"
            value={campus.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className={errors.imageUrl ? 'error' : ''}
          />{errors.imageUrl && <div className="error-message">{errors.imageUrl}</div>}
        </div>

        <button type="submit" className="submit-button">Add Campus</button>
      </form>
    </div>
  );
};

export default AddCampusForm;