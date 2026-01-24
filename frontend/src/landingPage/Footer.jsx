import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <>
      <footer className="footer container-fluid mt-5 p-5">
        <h2 className="fs-4">Contact Me</h2>
        <ul className="footer-list">
          <li>
            Email:{" "}
            <a href="mailto:arjunchinnu604@gmail.com">
              arjunchinnu604@gmail.com
            </a>
          </li>
          <li>Thank you</li>
        </ul>
      </footer>
    </>
  );
};

export default Footer;
