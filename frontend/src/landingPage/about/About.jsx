import React from "react";
import "./about.css";
const About = () => {
  return (
    <>
      <section id="about" className="about-section">
        <div className="container mt-5 pb-5">
          <div className="row about-row ">
            <h1 className="pt-4 px-5 about-name">&nbsp;ABOUT&nbsp;</h1>

            <h2 className=" pt-0 pb-5 about-email">arjunchinnu604@gmail.com</h2>
            <div className=" col-lg-6 col-md-12 col-sm-12 ">
              <img
                src="https://res.cloudinary.com/dvhbz7c92/image/upload/v1769247481/arjunimg_uwcjs6.png"
                alt=""
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>

            <div className="col-lg-6 col-md-12 mt-5 about-para-section">
              <p className="para-in-about mt-5">
                I'm <strong>Arjun</strong>, a MERN stack developer passionate
                about building secure, scalable, and user-friendly web
                applications. <br />
                <br />I work with{" "}
                <strong>MongoDB, Express.js, React.js, and Node.js</strong>, and
                enjoy creating clean, responsive designs with modern UI/UX
                practices.
                <br />
                <br />
                I'm eager to take on <strong>
                  freelance projects
                </strong> and <strong>internship opportunities</strong> where I
                can apply my skills, learn from real-world challenges, and
                deliver impactful solutions.
              </p>

              <div className="row">
                <div className="location-container col-4 ">
                  <h4 className="location-in-about text-center">
                    India,Karnataka
                  </h4>
                  <h5 className="location-in-pincode text-center">
                    <span className="pincode-deco">&nbsp;&nbsp;&nbsp;</span>
                    &nbsp;561207&nbsp;
                    <span className="pincode-deco">&nbsp;&nbsp;&nbsp;</span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
