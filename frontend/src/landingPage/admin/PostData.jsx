import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import "./PostData.css";

const PostData = ({ onProjectAdded }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("user");

  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    technoUsed: "",
    projectUrl: "",
    image: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const role = localStorage.getItem("role");
    if (token && role === "admin") {
      setIsLoggedIn(true);
      setUserRole("admin");
    }
  }, []);

  // handle input changes
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    //  Build FormData once here
    const data = new FormData();
    data.append("projectName", formData.projectName);
    data.append("projectDescription", formData.projectDescription);
    data.append("technoUsed", formData.technoUsed);
    data.append("projectUrl", formData.projectUrl);
    data.append("image", formData.image);

    await axios.post(
      "https://my-portfolio-backend-e8l7.onrender.com/postProject",
      data,
    );

    setFormData({
      projectName: "",
      projectDescription: "",
      technoUsed: "",
      projectUrl: "",
      image: null,
    });

    window.location.href = "/#portfolio";

    if (onProjectAdded) onProjectAdded();

    document
      .getElementById("portfolio")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const token = localStorage.getItem("jwt");
  //   const data = new FormData();
  //   // ... append data
  //   await axios.post("https://my-portfolio-backend-e8l7.onrender.com/postProject", data, {  // ✅ Fix 3
  //     headers: { Authorization: `Bearer ${token}` }
  //   });
  //   // ... rest unchanged
  // };
  //   const afterSubmit = () => {};

  return (
    <>
      {isLoggedIn && (
        <section id="form" className="container p-5">
          <h1 className="p-5">Enter Details of project</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-row upload-form">
              <div className="col-md-5 mb-3">
                <label className="mb-2">Project Name :</label>
                <input
                  type="text"
                  className="form-control"
                  name="projectName"
                  placeholder="Project Name"
                  value={formData.projectName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-5 mb-3">
                <label className="mb-2">Project Description :</label>
                <input
                  type="text"
                  className="form-control"
                  name="projectDescription"
                  placeholder="Project Description"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-5 mb-3">
                <label className="mb-2">Technologies used :</label>
                <input
                  type="text"
                  className="form-control"
                  name="technoUsed"
                  placeholder="Tech used"
                  value={formData.technoUsed}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-5 mb-3">
                <label className="mb-2">Upload image :</label>
                <input
                  type="file"
                  className="form-control"
                  name="image"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-5 mb-3">
                <label className="mb-2">Project Url :</label>
                <input
                  type="text"
                  className="form-control"
                  name="projectUrl"
                  placeholder="Project Url"
                  value={formData.projectUrl}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="text-center mt-3">
              <button
                className="btn btn-success"
                type="submit"
                onClick={afterSubmit}
              >
                Submit form
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default PostData;
