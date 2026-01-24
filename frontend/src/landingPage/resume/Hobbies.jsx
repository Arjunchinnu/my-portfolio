import React from "react";
import { FaChess } from "react-icons/fa";
import { RiBookShelfLine } from "react-icons/ri";

const Hobbies = () => {
  return (
    <>
      <h2
        className="fs-2 pb-4 pt-5"
        style={{ textDecoration: "underline  rgb(26, 88, 129)" }}
      >
       &nbsp;Hobbies&nbsp;
      </h2>
      <div className="row text-center">
        <div className="col">
          <p>
            <i
              class="fa-solid fa-chess"
              style={{ fontSize: "2rem", paddingBottom: "1rem" }}
            ></i>
            <br />
            chess
          </p>
          <p>
            <i
              class="fa-solid fa-book-open"
              style={{ fontSize: "2rem", paddingBottom: "1rem" }}
            ></i>
            <br />
            reading
          </p>
        </div>
        <div className="col">
          <p>
            <i
              class="fa-solid fa-plane-departure"
              style={{ fontSize: "2rem", paddingBottom: "1rem" }}
            ></i>{" "}
            <br />
            travel
          </p>
          <p>
            <i
              class="fa-solid fa-utensils"
              style={{ fontSize: "2rem", paddingBottom: "1rem" }}
            ></i>
            <br />
            cooking
          </p>
        </div>
      </div>
    </>
  );
};

export default Hobbies;
