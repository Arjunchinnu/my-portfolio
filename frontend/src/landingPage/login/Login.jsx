import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData(() => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://my-portfolio-backend-e8l7.onrender.com/user/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      localStorage.setItem("jwt", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      window.location.href = "/";
    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <section
      id="login"
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <form
        className="p-4 border rounded shadow position-relative"
        style={{ width: "100%", maxWidth: "400px" }}
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          className="btn btn-primary position-absolute top-0 start-0 mt-3 ms-3"
          onClick={() => {
            navigate("/");
          }}
          style={{ zIndex: 10 }}
        >
          ← Back
        </button>

        <h2 className="text-center mb-4 mt-5">Login</h2>

        {/* Rest of your form fields remain the same */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <div className="input-group">
            <div className="input-group-text">@</div>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="input-group">
            <div className="input-group-text">* </div>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: "rgb(69, 69, 129)", color: "white" }}
          >
            Login
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
