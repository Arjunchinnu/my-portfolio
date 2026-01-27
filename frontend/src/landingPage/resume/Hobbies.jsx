import React from "react";
import { FaChess } from "react-icons/fa";
import { RiBookShelfLine } from "react-icons/ri";

// const Hobbies = () => {
//   return (
//     <>
//       <h2
//         className="fs-2 pb-4 pt-5"
//         style={{ textDecoration: "underline  rgb(26, 88, 129)" }}
//       >
//         &nbsp;Hobbies&nbsp;
//       </h2>
//       <div className="row text-center">
//         <div className="col">
//           <p>
//             <i
//               class="fa-solid fa-chess"
//               style={{ fontSize: "2rem", paddingBottom: "1rem" }}
//             ></i>
//             <br />
//             chess
//           </p>
//           <p>
//             <i
//               class="fa-solid fa-book-open"
//               style={{ fontSize: "2rem", paddingBottom: "1rem" }}
//             ></i>
//             <br />
//             reading
//           </p>
//         </div>
//         <div className="col">
//           <p>
//             <i
//               class="fa-solid fa-plane-departure"
//               style={{ fontSize: "2rem", paddingBottom: "1rem" }}
//             ></i>{" "}
//             <br />
//             travel
//           </p>
//           <p>
//             <i
//               class="fa-solid fa-utensils"
//               style={{ fontSize: "2rem", paddingBottom: "1rem" }}
//             ></i>
//             <br />
//             cooking
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Hobbies;

const Hobbies = () => {
  return (
    <>
      <h2
        className="fs-3 fs-md-2 fs-lg-1 text-center pb-4 pt-5 mb-4"
        style={{ textDecoration: "underline rgb(26, 88, 129)" }}
      >
        Hobbies
      </h2>
      <div className="row g-3 g-md-4 text-center justify-content-center">
        <div className="col-6 col-md-3 p-2 p-md-3">
          <p className="mb-3">
            <i
              className="fa-solid fa-chess d-block fs-2 fs-md-1 mb-2"
              style={{ paddingBottom: "0.5rem" }}
            ></i>
            chess
          </p>
        </div>
        <div className="col-6 col-md-3 p-2 p-md-3">
          <p className="mb-3">
            <i
              className="fa-solid fa-book-open d-block fs-2 fs-md-1 mb-2"
              style={{ paddingBottom: "0.5rem" }}
            ></i>
            reading
          </p>
        </div>
        <div className="col-6 col-md-3 p-2 p-md-3">
          <p className="mb-3">
            <i
              className="fa-solid fa-plane-departure d-block fs-2 fs-md-1 mb-2"
              style={{ paddingBottom: "0.5rem" }}
            ></i>
            travel
          </p>
        </div>
        <div className="col-6 col-md-3 p-2 p-md-3">
          <p className="mb-3">
            <i
              className="fa-solid fa-utensils d-block fs-2 fs-md-1 mb-2"
              style={{ paddingBottom: "0.5rem" }}
            ></i>
            cooking
          </p>
        </div>
      </div>
    </>
  );
};

export default Hobbies;
