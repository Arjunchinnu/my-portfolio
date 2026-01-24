import React from "react";

const WtCanIDo = () => {
  return (
    <>
      <div className="row">
        <h2
          className="fs-2 pb-4"
          style={{ textDecoration: "underline  rgb(26, 88, 129)" }}
        >
          &nbsp;What can i do&nbsp;
        </h2>
        <ul className="wticando">
          <li>Create Stunning Website</li>
          <li>Leading My Team</li>
          <li>Co-Ordination in Team</li>
          <li>Accuracy in Time</li>
        </ul>
      </div>
      <div className="row personal-skills pb-5 pt-5">
        <h2
          className="pb-4"
          style={{ textDecoration: "underline  rgb(26, 88, 129)" }}
        >
          &nbsp;Personal Skills&nbsp;
        </h2>
        <div className="col ">
          <ul>
            <li>
              {" "}
              <p>Leadership</p>
            </li>
            <li>
              {" "}
              <p>Creativity</p>
            </li>
          </ul>
        </div>
        <div className="col">
          <li>
            {" "}
            <p>Quick Learner</p>
          </li>
          <li>
            {" "}
            <p>Team Worker</p>
          </li>
        </div>
      </div>
      <div className="row"></div>
    </>
  );
};

export default WtCanIDo;
