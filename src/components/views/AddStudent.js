import React, { useState } from 'react';
import axios from 'axios';
import './AddorEditStudentForm.css';
import { useHistory } from 'react-router-dom';

const AddStudentForm = () => {
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    imageUrl: '',
    gpa: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!student.firstName) newErrors.firstName = 'First Name is required';
    if (!student.lastName) newErrors.lastName = 'Last Name is required';
    if (!student.email) newErrors.email = 'Email is required';
    if (!student.imageUrl) newErrors.imageUrl = 'Image URL is required'
    if (!student.gpa) newErrors.gpa = 'GPA is required'
    else if (!isValidHttpUrl(student.imageUrl)) {
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
    history.push('/students'); // Navigate to All Students view
  };

  const handleChange = (event) => {
    setStudent({ ...student, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      try {
        await axios.post('http://localhost:5001/api/students', student);
        // Handle success (e.g., redirect or display message)
      } catch (error) {
        console.error('Error adding student:', error);
        // Display error message
      }
    }
  };

  return (
    <div className="form-container">

      <button onClick={handleBack} className="back-button">Back to All Students</button>

      <h2>Add Student</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-field">
          <label>First Name:</label>
          <input
            name="firstName"
            value={student.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className={errors.firstName ? 'error' : ''}
          />{errors.firstName && <div className="error-message">{errors.firstName}</div>}
        </div>

        <div className="form-field">
          <label>Last Name:</label>
          <input
            name="lastName"
            value={student.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className={errors.lastName ? 'error' : ''}
          />{errors.lastName && <div className="error-message">{errors.lastName}</div>}
        </div>

        <div className="form-field">
          <label>Email:</label>
          <input
            name="email"
            value={student.email}
            onChange={handleChange}
            placeholder="Email"
            className={errors.email ? 'error' : ''}
          />{errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="form-field">
          <label>Image URL:</label>
          <input
            name="imageUrl"
            value={student.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className={errors.imageUrl ? 'error' : ''}
          />{errors.imageUrl && <div className="error-message">{errors.imageUrl}</div>}
        </div>

        <div className="form-field">
          <label>GPA:</label>
          <input
            name="gpa"
            value={student.gpa}
            onChange={handleChange}
            placeholder="GPA"
            className={errors.gpa ? 'error' : ''}
          />{errors.gpa && <div className="error-message">{errors.gpa}</div>}
        </div>

        <button type="submit" className="submit-button">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudentForm;
