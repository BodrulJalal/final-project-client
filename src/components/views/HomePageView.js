/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
import { Link } from "react-router-dom";
const HomePageView = () => {
  // Render Home page view
  return (
    <div >
      <h1>Home Page</h1>
      <div>
      {/* Button to navigate to All Campuses View */}
      <Link to={'/campuses'}>
        <button>Go to All Campuses</button>
      </Link>   
      </div>
      <p></p>
      <div>
      {/* Button to navigate to All Students View */}
      <Link to={'/students'}>
        <button>Go to All Students</button>
      </Link>
      </div>
    </div>

  );    
}

export default HomePageView;