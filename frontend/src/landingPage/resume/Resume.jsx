import React from "react";
import "./resume.css";
import Skills from "./Skills";
import Languages from "./Languages";
import Education from "./Education";
import WtCanIDo from "./WtCanIDo";
import Hobbies from "./Hobbies";

const Resume = () => {
  return (
    <>
      <section id="resume" className="container pt-5">
        <div className="row">
          <div className="col p-5">
            <Skills />
            <Languages />
          </div>
          <div className="col  p-5">
            <Education />
          </div>
          <div className="col p-5">
            <WtCanIDo />
            <Hobbies />
          </div>
        </div>
      </section>
    </>
  );
};

export default Resume;
