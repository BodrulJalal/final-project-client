/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import './AddOrEditButton.css'

const AllCampusesView = (props) => {
  const { deleteCampus } = props;

  // If there is no campus, display a message.
  if (!props.allCampuses.length) {
    return (
      <div>
        <p>There are no campuses.</p>
        <Link to={`/addcampus`}>
          <button className="campus-add-button">Add New Campus</button>
        </Link>
      </div>
    );
  }

  // If there is at least one campus, render All Campuses view 
  return (
    <div>
      <h1 style={{ marginBottom: "1px" }}>All Campuses</h1>
      <span style={{ fontSize: "14px" }}>Total: <span style={{ color: "#00F" }}>{props.allCampuses.length}</span></span>

      {props.allCampuses.map((campus) => (
        <div key={campus.id}>
          <Link to={`/campus/${campus.id}`}>
            <h2>{campus.name}</h2>
          </Link>
          <Link to={`/editcampus/${campus.id}`}>
            <button className="campus-edit-button">Edit Campus</button>
          </Link>
          <h4>Campus ID: {campus.id}</h4>
          <p style={{ fontSize: "14px" }}>{campus.address}</p>
          <p style={{ fontSize: "14px" }}>{campus.description}</p>
          <button className="delete" onClick={() => deleteCampus(campus.id)}>Delete</button>
          <hr />
        </div>
      ))}
      <br />

      <Link to="/addcampus">
        <button className="campus-add-button">Add New Campus</button>
      </Link>

      <br /><br />
    </div>
  );
};

// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;
