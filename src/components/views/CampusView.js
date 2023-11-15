/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Divider } from "@material-ui/core";
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteCampus, deleteStudent} = props;
  
  // Render a single Campus view with list of its students
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <h1 style={{marginBottom:"1px"}}>{campus.name}</h1>
      <span style={{fontSize:"14px"}}>Enrolled: <span style={{color:"#00F"}}>{campus.students.length}</span></span>
      <p style={{marginBottom:"10px",marginTop:"10px"}}>{campus.address}</p>
      <p style={{marginTop:"10px"}}>{campus.description}</p>

      <div style={{ display: 'flex', gap: '10px' }}> 
        <Link to={`/editcampus/${campus.id}`}><button>Edit</button></Link>
        <Link to={`/campuses`}>
        <button className="delete" onClick={()=>deleteCampus(campus.id)}>Delete</button>
        </Link>
      </div>
      
      <div style={{marginTop:"10px"}}></div>
      <Link to={`/newstudent`}><button>Add students to {campus.name}</button></Link>      
      <div style={{marginBottom:"12px"}}></div>

      <Divider/>

      {campus.students.length === 0 ? (
        <p>No students</p>
      ) : (
      campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id} style={{marginBottom:"12px"}}>
            <Link to={`/student/${student.id}`}>
              <span style={{fontSize:"15pt", marginRight:"10px"}}>{name}</span>
            </Link>
            <Link to={`/students`}>
            <button className="delete" onClick={() => deleteStudent(student.id)}>Delete Student</button>
            </Link>             
          </div>
        );
      })
      )}

      <Divider/>

      <img src={campus.imageUrl} alt="Campus Pic" style={{ width: '500px', height: 'auto' }}/>
    </div>
  );
};

export default CampusView;
