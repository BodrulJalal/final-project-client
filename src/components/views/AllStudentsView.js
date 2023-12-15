/*==================================================
AllStudentsView.js

The Views component is responsible for rendering the web page with data provided by the corresponding Container component.
It constructs a React component to display the all students view page.
================================================== */
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import './AddOrEditButtonStudent.css';

const AllStudentsView = (props) => {
  const { students, deleteStudent } = props;

  // If there is no student, display a message
  if (!students.length) {
    return (
      <div>
        <p>There are no students.</p>
        <Link to="/addstudent">
          <button className="student-add-button">Add New Student</button>
        </Link>
      </div>
    );
  }

  // If there is at least one student, render All Students view
  return (
    <div>
      <h1>All Students</h1>

      {students.map((student) => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>
            <button onClick={() => deleteStudent(student.id)}>Delete</button>
            <hr />
          </div>
        );
      })}
      <br />
      <Link to="/addstudent">
        <button className="student-add-button">Add New Student</button>
      </Link>
      <br /><br />
    </div>
  );
};

// Validate data type of the props passed to component.
AllStudentsView.propTypes = {
  students: PropTypes.array.isRequired,
  deleteStudent: PropTypes.func.isRequired,
};

export default AllStudentsView;
