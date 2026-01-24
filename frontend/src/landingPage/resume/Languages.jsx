import React from "react";

const Languages = () => {
  return (
    <>
      <div className="container">
        <div className="row language ">
          <h2
            className="fs-2 pb-5 pt-5"
            style={{ textDecoration: "underline  rgb(26, 88, 129)" }}
          >
            &nbsp;Languages&nbsp;
          </h2>
          <p>
            English{" "}
            <input className="skill-range" type="range" value={100} disabled />
          </p>
          <p>
            Hindi{" "}
            <input className="skill-range" type="range" value={100} disabled />
          </p>
          <p>
            Kannda{" "}
            <input className="skill-range" type="range" value={100} disabled />
          </p>
          <p>
            Telugu{" "}
            <input className="skill-range" type="range" value={100} disabled />
          </p>
        </div>
      </div>
    </>
  );
};

export default Languages;
