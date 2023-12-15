import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import './AddOrEditCampusForm.css';

const EditCampus = () => {
  const [campus, setCampus] = useState({ name: '', address: '', description: '', imageUrl: '' });
  const [errors, setErrors] = useState({});
  const { id } = useParams(); // Get campus ID from URL
  const history = useHistory();

  useEffect(() => {
    // Fetch campus data when component mounts
    const fetchCampusData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/campuses/${id}`);
        setCampus(response.data);
      } catch (error) {
        console.error('Error fetching campus data:', error);
      }
    };

    fetchCampusData();
  }, [id]);

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
  
  const handleBack = () => {
    history.push('/campuses'); // Navigate to All Campuses view
  };

  const handleChange = (event) => {
    setCampus({ ...campus, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        await axios.put(`http://localhost:5001/api/campuses/${id}`, campus);
        history.push('/campuses'); // Redirect to campuses view after successful edit
      } catch (error) {
        console.error('Error updating campus:', error);
      }
    }
  };

  return (
    <div className="form-container">

      <button onClick={handleBack} className="back-button">Back to All Campuses</button>

      <h2>Edit Campus</h2>
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

        <button type="submit" className="submit-button">Update Campus</button>
      </form>
    </div>
  );
};

export default EditCampus;