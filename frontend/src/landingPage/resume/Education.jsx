import React from "react";

const Education = () => {
  return (
    <>
      <div className="row education">
        <h2
          className="fs-2 pb-5"
          style={{ textDecoration: "underline  rgb(26, 88, 129)" }}
        >
          &nbsp;Education&nbsp;
        </h2>
        <div>
          <div className="education-path">
            <div className="circle">2023</div>{" "}
            <p style={{ fontSize: "14px", marginLeft: "20px" }}>
              NAGARJUNA COLLEGE <br />
              <span style={{ fontSize: "11px" }}>chikkamarali, Banglore</span>
            </p>
          </div>
          <div className="line"></div>{" "}
          <div className="education-path">
            <div className="circle">2025</div>{" "}
            <p style={{ fontSize: "15px", marginLeft: "20px" }}>
              BLOOMS PU COLLEGE <br />
              <span style={{ fontSize: "11px" }}>
                chikkaballapura, Bagepalli
              </span>
            </p>
          </div>
          <div className="line"></div>
          <div className="education-path">
            <div className="circle">2023</div>{" "}
            <p style={{ fontSize: "15px", marginLeft: "20px" }}>
              ADARSHA VIDYALAYA <br />
              <span style={{ fontSize: "11px" }}>
                chikkaballapura, Bagepalli
              </span>
            </p>
          </div>
          <div className="line"></div>{" "}
          <div className="education-path">
            <div className="circle">2018</div>{" "}
            <p style={{ fontSize: "15px", marginLeft: "20px" }}>
              SRI PRAGATHI VIDYA SAMATHE <br />
              <span style={{ fontSize: "11px" }}>
                chikkaballapura, Bagepalli
              </span>
            </p>
          </div>
        </div>

        <div className="row pt-5">
          <h2
            className="pb-4"
            style={{ textDecoration: "underline  rgb(26, 88, 129)" }}
          >
            &nbsp;Summary&nbsp;
          </h2>
          <p style={{ fontSize: "14px", textAlign: "center" }}>
            BCA in Computer Science,
            <br />
            Narajuna College
          </p>
        </div>

        <p></p>
      </div>
    </>
  );
};

export default Education;
