import React from "react";
import SocialMedia from "./SocialMedia";

const Hero = () => {
  return (
    <>
      <section id="home" className="hero">
        <div className="container">
          <div className="row ">
            <div className="hero-data col-6 pt-5 px-5 type-writer">
              <div className=" heading1">
                <h1
                  className="mt-5 pt-5 hero-small-name"
                  style={{ color: "white" }}
                >
                  Arjun
                </h1>
              </div>
              <div className="heading2">
                <h2 className="hero-main-name" style={{ color: "white" }}>
                  Krishna Murthy
                </h2>
              </div>
              <div className="heading3">
                <h3 className="hero-subtitle" style={{ color: "white" }}>
                  Web Developer
                </h3>
              </div>
            </div>
          </div>
          <div className="row mt-5 px-5 hero-btns">
            <div className="col-lg-1 resume-btn px-4">
              <a href="#resume">
                <button className="btn hero-btn btn-outline-light">
                  Resume
                </button>
              </a>
            </div>
            <div className="col-lg-1   portfolio-btn">
              <a href="#portfolio">
                <button className="btn hero-btn btn-outline-light">
                  portfolio
                </button>
              </a>
            </div>
          </div>
          <SocialMedia />
        </div>
      </section>
    </>
  );
};

export default Hero;
