/*==================================================
/src/store/thunks.js

It contains all Thunk Creators and Thunks.
================================================== */
import * as ac from './actions/actionCreators';
const axios = require('axios');

// All Campuses
// Thunk Creators:
export const fetchAllCampusesThunk = () => async (dispatch) => {
  try {
    let res = await axios.get(`/api/campuses`);
    dispatch(ac.fetchAllCampuses(res.data));
  } catch (err) {
    console.error(err);
  }
};

// Add campus thunk
export const addCampusThunk = (campus) => async (dispatch) => {
  try {
    const response = await axios.post('/api/campuses', campus);
    dispatch(ac.addCampus(response.data));
    return response.data;
  } catch (err) {
    console.error('Error adding campus:', err);
  }
};

// Edit Campus Thunk
export const editCampusThunk = (campus) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/campuses/${campus.id}`, campus);
    dispatch(ac.editCampus(response.data)); // 
  } catch (error) {
    console.error('Error editing campus:', error);
  }
};

//Delete Campus Thunk
export const deleteCampusThunk = campusId => async dispatch => {
try{
await axios.delete(`/api/campuses/${campusId}`);
dispatch(ac.deleteCampus(campusId));
}
catch(err){
console.error(err);
}
};


// Single Campus
// THUNK CREATOR:
export const fetchCampusThunk = (id) => async (dispatch) => {  // The THUNK
  try {
    let res = await axios.get(`/api/campuses/${id}`);
    dispatch(ac.fetchCampus(res.data));
  } catch (err) {
    console.error(err);
  }
};

// All Students
// Thunk Creators:
export const fetchAllStudentsThunk = () => async (dispatch) => {
  try {
    let res = await axios.get(`/api/students`);
    dispatch(ac.fetchAllStudents(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const addStudentThunk = (student) => async (dispatch) => {
  try {
    let res = await axios.post(`/api/students`, student);
    dispatch(ac.addStudent(res.data));
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteStudentThunk = (studentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/students/${studentId}`);
    dispatch(ac.deleteStudent(studentId));
  } catch (err) {
    console.error(err);
  }
};

export const editStudentThunk = (student) => async (dispatch) => {
  try {
    let updatedStudent = await axios.put(`/api/students/${student.id}`, student);
    dispatch(ac.editStudent(updatedStudent));
  } catch (err) {
    console.error(err);
  }
};

export const fetchStudentThunk = (id) => async (dispatch) => {
  try {
    let res = await axios.get(`/api/students/${id}`);
    dispatch(ac.fetchStudent(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const deleteCampusStudentOnlyThunk = (student) => async (dispatch) => {
  try {
    let updatedStudent = await axios.put(`/api/students/${student.id}`, { ...student, campusId: null });
    dispatch(ac.editStudent(updatedStudent));
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
};