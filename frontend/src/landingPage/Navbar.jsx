import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("user");
  const [isSticky, setIsSticky] = useState(false);

  // 🔥 FIXED AUTH CHECK - Uses localStorage + Authorization header
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("jwt");
        const storedRole = localStorage.getItem("role");

        // Set initial state from localStorage
        if (token && storedRole) {
          setIsLoggedIn(true);
          setUserRole(storedRole);
        }

        // Verify with backend
        const res = await axios.get(
          "https://my-portfolio-backend-e8l7.onrender.com/auth/check",
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
            timeout: 15000,
          },
        );

        console.log("✅ Auth response:", res.data);
        setIsLoggedIn(res.data.authenticated);
        setUserRole(res.data.role);
      } catch (err) {
        console.error(
          "❌ Auth check failed:",
          err.response?.data || err.message,
        );
        // Keep localStorage state as fallback
        const token = localStorage.getItem("jwt");
        const role = localStorage.getItem("role") || "user";
        setIsLoggedIn(!!token);
        setUserRole(role);
      }
    };

    checkAuth();
  }, []);

  // 🔥 FIXED LOGOUT - Clears localStorage
  const logout = () => {
    // Clear localStorage
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");

    // Reset state
    setIsLoggedIn(false);
    setUserRole("user");

    // Optional backend cleanup
    axios
      .post(
        "https://my-portfolio-backend-e8l7.onrender.com/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        },
      )
      .catch(() => {}); // Ignore errors

    window.location.href = "/";
  };

  // Sticky scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg ${isSticky ? "sticky" : ""}`}>
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link active" href="#home">
              Home
            </a>
            <a className="nav-link" href="#about">
              About
            </a>
            <a className="nav-link" href="#resume">
              Resume
            </a>
            <a className="nav-link" href="#portfolio">
              Portfolio
            </a>

            {isLoggedIn ? (
              <>
                {userRole === "admin" && (
                  <a className="nav-link" href="#form">
                    Add Project
                  </a>
                )}
                <button
                  onClick={logout}
                  className="nav-link btn"
                  style={{
                    color: "black",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link className="nav-link" to="/user/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
