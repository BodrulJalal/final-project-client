import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import './AddOrEditStudentForm.css';

const EditStudent = () => {
  const [student, setStudent] = useState({ firstName: '', lastName: '', email: '', imageUrl: '', gpa: '' });
  const [errors, setErrors] = useState({});
  const { id } = useParams(); // Get student ID from URL
  const history = useHistory();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/students/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!student.firstName) newErrors.name = 'First Name is required';
    if (!student.lastName) newErrors.lastName = 'Last Name is required';
    if (!student.email) newErrors.email = 'Email is required';
    if (!student.imageUrl) newErrors.imageUrl = 'Image URL is required';
    if (!student.gpa) newErrors.gpa = 'GPA is required';
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

  const handleBack = () => {
    history.push('/students'); // Navigate to All Students view
  };

  const handleChange = (event) => {
    setStudent({ ...student, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        await axios.put(`http://localhost:5001/api/students/${id}`, students);
        history.push('/students'); // Redirect to students view 
      } catch (error) {
        console.error('Error updating students:', error);
      }
    }
  };

  return (
    <div className="form-container">
    <button onClick={handleBack} className="back-button">
      Back to All Students
    </button>
  
    <h2>Edit Student</h2>
    <form onSubmit={handleSubmit} className="student-form">
      <div className="form-field">
        <label>First Name:</label>
        <input
          name="firstName"
          value={student.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className={errors.firstName ? 'error' : ''}
        />
        {errors.firstName && <div className="error-message">{errors.firstName}</div>}
      </div>
  
      <div className="form-field">
        <label>Last Name:</label>
        <input
          name="lastName"
          value={student.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className={errors.lastName ? 'error' : ''}
        />
        {errors.lastName && <div className="error-message">{errors.lastName}</div>}
      </div>
  
      <div className="form-field">
        <label>Email:</label>
        <input
          name="email"
          value={student.email}
          onChange={handleChange}
          placeholder="Email"
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>
  
      <div className="form-field">
        <label>Image URL:</label>
        <input
          name="imageUrl"
          value={student.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className={errors.imageUrl ? 'error' : ''}
        />
        {errors.imageUrl && <div className="error-message">{errors.imageUrl}</div>}
      </div>
  
      <div className="form-field">
        <label>GPA:</label>
        <input
          name="gpa"
          value={student.gpa}
          onChange={handleChange}
          placeholder="GPA"
          className={errors.gpa ? 'error' : ''}
        />
        {errors.gpa && <div className="error-message">{errors.gpa}</div>}
      </div>
  
      <button type="submit" className="submit-button">
        Update Student
      </button>
    </form>
  </div>
  
  );
};

export default EditStudent;