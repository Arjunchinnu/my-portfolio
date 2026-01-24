import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button
        className="btn "
        style={{
          backgroundColor: "#056281",
          color: "white",
          padding: "0.8rem",
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        back to home
      </button>
    </div>
  );
};

export default PageNotFound;
