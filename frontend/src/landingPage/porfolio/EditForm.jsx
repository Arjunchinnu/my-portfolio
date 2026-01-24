import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditForm = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  let projectId = id;

  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    technoUsed: "",
    projectUrl: "",
    image: null,
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/edit/${projectId}`);
        const project = res.data.data;
        setFormData({
          projectName: project.projectName,
          projectDescription: project.projectDescription,
          technoUsed: project.technoUsed,
          projectUrl: project.projectUrl,
          image: project.image,
        });
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };
    fetchProject();
  }, [projectId]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("projectName", formData.projectName);
    data.append("projectDescription", formData.projectDescription);
    data.append("technoUsed", formData.technoUsed);
    data.append("projectUrl", formData.projectUrl);
    data.append("image", formData.image);

    try {
      await axios.put(`http://localhost:5000/edit/${projectId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/#portfolio");
      window.location.reload();
    } catch (err) {
      console.error("Error updating project:", err);
    }
  };

  return (
    <section id="form" className="container p-5">
      <h1 className="p-5">Edit Project</h1>
      <div className="row">
        <div className="col-9 d-flex justify-content-end mw-50">
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/#portfolio");
            }}
          >
            Back
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-row upload-form">
          <div className="col-md-5 mb-3">
            <label className="mb-2">Project Name :</label>
            <input
              type="text"
              className="form-control"
              name="projectName"
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
              value={formData.technoUsed}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-5 mb-3">
            <label className="mb-2">Upload new image (optional):</label>
            <input
              type="file"
              className="form-control"
              name="image"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-5 mb-3">
            <label className="mb-2">Project Url :</label>
            <input
              type="text"
              className="form-control"
              name="projectUrl"
              value={formData.projectUrl}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="text-center mt-3">
          <button className="btn btn-success" type="submit">
            Update Project
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditForm;
