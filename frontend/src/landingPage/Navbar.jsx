import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

axios.defaults.withCredentials = true;

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("user");
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // SIMPLE AUTH CHECK
  // const checkAuth = async () => {
  //   try {
  //     const res = await axios.get(
  //       "https://my-portfolio-backend-e8l7.onrender.com/auth/check",
  //       {
  //         withCredentials: true,
  //       },
  //     );
  //     console.log("Auth:", res.data);
  //     setIsLoggedIn(res.data.authenticated);
  //     setUserRole(res.data.role);
  //   } catch (err) {
  //     console.error("Auth check failed:", err);
  //     setIsLoggedIn(false);
  //     setUserRole("user");
  //   }
  // };
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "https://my-portfolio-backend-e8l7.onrender.com/auth/check",
          {
            withCredentials: true,
            timeout: 15000, // 15 seconds for Render wake-up
          },
        );
        console.log("Auth:", res.data);
        setIsLoggedIn(res.data.authenticated);
        setUserRole(res.data.role);
      } catch (err) {
        if (err.code === "ECONNABORTED") {
          console.log("Backend sleeping, retrying...");
          setTimeout(checkAuth, 5000); // Retry in 5s
        } else {
          console.log("Not logged in");
          setIsLoggedIn(false);
          setUserRole("user");
        }
      }
    };

    checkAuth();
  }, []);

  const logout = () => {
    axios
      .post(
        "https://my-portfolio-backend-e8l7.onrender.com/logout",
        {},
        {
          withCredentials: true,
        },
      )
      .then(() => {
        window.location.href = "/";
      });
  };

  useEffect(() => {
    console.log("🔄 RENDER ->", { isLoggedIn, userRole });
  }, [isLoggedIn, userRole]);

  // Check auth when component loads
  // useEffect(() => {
  //   checkAuth();
  // }, []);

  // Sticky scroll
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
