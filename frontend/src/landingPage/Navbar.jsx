import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("user");
  const [isSticky, setIsSticky] = useState(false);

  // 🔥 CHECK LOCALSTORAGE IMMEDIATELY + Backend verification
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 1. IMMEDIATE localStorage check
        const token = localStorage.getItem("jwt");
        const storedRole = localStorage.getItem("role") || "user";

        console.log("🔍 Navbar localStorage:", {
          token: !!token,
          role: storedRole,
        });

        // 2. Set state immediately from localStorage
        if (token) {
          setIsLoggedIn(true);
          setUserRole(storedRole);
        }

        // 3. Verify token with backend
        if (token) {
          const res = await axios.get(
            "https://my-portfolio-backend-e8l7.onrender.com/auth/check",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              timeout: 10000,
            },
          );

          console.log("✅ Backend auth response:", res.data);
          setIsLoggedIn(res.data.authenticated);
          setUserRole(res.data.role);
        }
      } catch (err) {
        console.error(
          "❌ Auth check failed:",
          err.response?.data || err.message,
        );
        // Fallback to localStorage
        const token = localStorage.getItem("jwt");
        const role = localStorage.getItem("role") || "user";
        setIsLoggedIn(!!token);
        setUserRole(role);
      }
    };

    checkAuth();
  }, []); // Runs once on mount

  // 🔥 WATCH FOR LOCALSTORAGE CHANGES (login from other tabs)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "jwt" || e.key === "role") {
        const token = localStorage.getItem("jwt");
        const role = localStorage.getItem("role") || "user";

        console.log("🔄 Storage changed:", { token: !!token, role });

        setIsLoggedIn(!!token);
        setUserRole(role);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // 🔥 TOKEN VALIDATION INTERVAL (every 30s)
  useEffect(() => {
    if (!isLoggedIn) return;

    const interval = setInterval(async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          setIsLoggedIn(false);
          setUserRole("user");
          return;
        }

        const res = await axios.get(
          "https://my-portfolio-backend-e8l7.onrender.com/auth/check",
          {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 5000,
          },
        );

        if (!res.data.authenticated) {
          localStorage.removeItem("jwt");
          localStorage.removeItem("role");
          setIsLoggedIn(false);
          setUserRole("user");
        }
      } catch (err) {
        console.log("❌ Token expired, auto-logout");
        localStorage.removeItem("jwt");
        localStorage.removeItem("role");
        setIsLoggedIn(false);
        setUserRole("user");
      }
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  // 🔥 PERFECT LOGOUT
  const logout = () => {
    // Clear localStorage FIRST
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");

    // Reset state
    setIsLoggedIn(false);
    setUserRole("user");

    // Backend cleanup (fire and forget)
    const token = localStorage.getItem("jwt"); // Already cleared
    axios
      .post(
        "https://my-portfolio-backend-e8l7.onrender.com/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .catch(() => {}); // Ignore errors

    window.location.href = "/";
  };

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
