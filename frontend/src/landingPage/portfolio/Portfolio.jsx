import "./portfolio.css";
// import axios from "axios";
import { motion } from "framer-motion";

import UDoperations from "./UDoperations";
import { Routes, Route } from "react-router-dom";
import "./portfolio.css";

const Portfolio = ({ data, setData }) => {
  // useEffect(() => {
  //   const el = document.getElementById("portfolio");
  //   if (el) {
  //     el.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, []);

  return (
    <>
      <section id="portfolio" className="container mt-5">
        <h2
          style={{
            color: "white",
            textDecoration: "underline  rgb(26, 88, 129)",
          }}
          className="fs-2 p-5 text-center"
        >
          &nbsp;My Portfolio&nbsp;
        </h2>

        <div className="row">
          <div className="col portfolio-box">
            {data.map((item, idx) => (
              <motion.div
                whileHover={{ scale: 1.2 }}
                style={{ cursor: "pointer" }}
                className="project-box"
                key={idx}
              >
                <div className="img-div">
                  <a href={item.projectUrl}>
                    <img src={item.image} alt={item.projectName} />
                  </a>
                  <UDoperations
                    id={item._id}
                    onDelete={(deletedId) => {
                      console.log("removing state", deletedId);
                      setData((prevData) =>
                        prevData.filter((p) => p._id !== deletedId),
                      );
                    }}
                  />
                </div>
                <div className="project-box-text p-2">
                  <ul className="project-list">
                    <li>Name : {item.projectName}</li>
                    <li>Description : {item.projectDescription}</li>
                    <li>Techno's : {item.technoUsed}</li>
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
