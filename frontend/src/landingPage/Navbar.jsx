import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";

axios.defaults.withCredentials = true;

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("user");

  // const logout = async () => {
  //   try {
  //     await axios.post("/logout");
  //     console.log("✅ Logout successful");
  //   } catch (err) {
  //     console.error("Logout failed:", err);
  //   }

  //   Cookies.remove("role");
  //   window.location.href = "/";
  // };

  const logout = async () => {
    try {
      await axios.post(
        "/logout",
        {},
        {
          withCredentials: true,
        },
      );
    } catch (err) {
      console.log("login error", err);
    }
    window.location.href = "/";
  };

  // Check login status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "https://my-portfolio-backend-e8l7.onrender.com/auth/check",
          {
            withCredentials: true,
          },
        );
        console.log("✅ Auth status:", res.data);

        setIsLoggedIn(res.data.authenticated);
        setUserRole(res.data.role || "user");
      } catch (err) {
        console.log("❌ Not logged in", err);
        setIsLoggedIn(false);
        setUserRole("user");
      }
    };

    checkAuth();
  }, []);

  // Sticky navbar scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className={`navbar navbar-expand-lg ${isSticky ? "sticky" : ""}`}>
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse nav-items-div"
          id="navbarNavAltMarkup"
        >
          <div className={`navbar-nav ${isSticky ? "" : "sticky"}`}>
            <a className="nav-link active homelink" href="#home">
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
                  onClick={handleLogout}
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
