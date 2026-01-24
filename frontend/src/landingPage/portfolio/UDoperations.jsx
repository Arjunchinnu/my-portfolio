import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./portfolio.css";

const UDoperations = ({ id, onDelete }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("user");

  useEffect(() => {
    const role = Cookies.get("role");

    if (role) {
      setIsLoggedIn(true);
      setUserRole(role);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`https://my-portfolio-backend-e8l7.onrender.com/delete/${id}`);

        if (onDelete) {
          onDelete(id);
        }
      } catch (err) {
        console.error("Error deleting project:", err);
        alert("Failed to delete project. Please try again.");
      }
    }
  };

  return (
    <>
      {isLoggedIn && userRole === "admin" && (
        <div className="UPbtn">
          <Link to={`/edit/${id}`}>
            <button type="button" className="btn edit-btn">
              Edit
            </button>
          </Link>
          <button type="button" className="btn del-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default UDoperations;
