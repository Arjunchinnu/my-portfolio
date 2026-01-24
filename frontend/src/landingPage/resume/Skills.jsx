import React from "react";
import { SiExpress } from "react-icons/si";
import { TbBrandMongodb } from "react-icons/tb";
import { GrReactjs } from "react-icons/gr";
import { SiNodedotjs } from "react-icons/si";
import { IoLogoGithub } from "react-icons/io5";
import { LiaJava } from "react-icons/lia";

const Skills = () => {
  return (
    <>
      <div className="row skills">
        <h2 className="fs-2 pb-5" style={{textDecoration:"underline rgb(26, 88, 129)"}}>&nbsp;Skills&nbsp;</h2>
        
        {/* ✅ Replaced <p> with <div className="skill-item"> - same styling */}
        <div className="skill-item">
          <div className="skill-icon-box">
            <TbBrandMongodb size={20} />
          </div>
          MongoDB{" "}
          <input className="skill-range" type="range" value={90} disabled />
        </div>
        
        <div className="skill-item">
          <div className="skill-icon-box">
            <SiExpress size={20} />
          </div>
          Express js{" "}
          <input className="skill-range" type="range" value={95} disabled />
        </div>
        
        <div className="skill-item">
          <div className="skill-icon-box">
            <GrReactjs size={20} />
          </div>
          React js{" "}
          <input className="skill-range" type="range" value={95} disabled />
        </div>
        
        <div className="skill-item">
          <div className="skill-icon-box">
            <SiNodedotjs size={20} />
          </div>
          Node js{" "}
          <input className="skill-range" type="range" value={95} disabled />
        </div>
        
        <div className="skill-item">
          <div className="skill-icon-box">
            <IoLogoGithub size={20} />
          </div>
          Git&GitHub{" "}
          <input className="skill-range" type="range" value={80} disabled />
        </div>
        
        <div className="skill-item">
          <div className="skill-icon-box">
            <LiaJava size={20} />
          </div>
          java
          <input className="skill-range" type="range" value={70} disabled />
        </div>
      </div>
    </>
  );
};

export default Skills;
