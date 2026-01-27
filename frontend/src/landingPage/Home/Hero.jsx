import React from "react";
import SocialMedia from "./SocialMedia";
import WebdevTitle from "./WebdevTitle";

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
                <h2 className="hero-subtitle fw-light display-6 display-md-5 display-sm-4 text-white">
                  <WebdevTitle />
                </h2>
              </div>
            </div>
          </div>
          <div className="row mt-5 px-5 hero-btns">
            <div className="col-6">
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-md-start">
                <a
                  href="#resume"
                  className="btn btn-outline-light hero-btn flex-fill flex-sm-auto col-5 col-md-2"
                  style={{ minWidth: "120px" }}
                >
                  Resume
                </a>
                <a
                  href="#portfolio"
                  className="btn btn-outline-light hero-btn flex-fill flex-sm-auto col-5 col-md-2"
                  style={{ minWidth: "120px" }}
                >
                  Portfolio
                </a>
              </div>
            </div>
          </div>
          <SocialMedia />
        </div>
      </section>
    </>
  );
};

export default Hero;
