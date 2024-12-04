import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css"; // Import the CSS file for styling
import { jwtDecode } from "jwt-decode"; // Use named import
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "./Navbar/Navbar";
import VisitorTable from "./VisitorTable/VisitorTable";

const Dashboard = () => {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  let user = jwtDecode(token);

  useEffect(() => {
    if (user.role !== "Manager") {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/visitors`)
        .then((response) => {
          setVisitors(response.data);
          setLoading(false); // Set loading to false when data is fetched
        })
        .catch((error) => {
          console.error("Error fetching visitors:", error);
          setLoading(false); // Set loading to false even if there's an error
        });
    } else {
      // Fetch visitors for the logged-in manager
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/visitors/manager/${user.id}`)
        .then((response) => {
          setVisitors(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching visitors:", error);
        });
    }
  }, []);

  return (
    <>
      {" "}
      <Navbar />
      <div className="dashboard-container">
        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <VisitorTable visitors={visitors} />
        )}
      </div>
    </>
  );
};

export default Dashboard;
