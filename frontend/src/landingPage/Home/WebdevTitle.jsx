import React, { useState, useEffect } from "react";

const HeroSubtitle = () => {
  const [text, setText] = useState("");
  const fullText = "Web Developer";
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let i = 0;
    let forward = true;

    const typerInterval = setInterval(
      () => {
        if (forward) {
          setText(fullText.slice(0, i + 1));
          i++;
          if (i === fullText.length) {
            setTimeout(() => {
              setIsDeleting(true);
              forward = false;
            }, 1500);
          }
        } else {
          setText(fullText.slice(0, i - 1));
          i--;
          if (i === 0) {
            setIsDeleting(false);
            forward = true;
            setLoopNum((loopNum) => loopNum + 1);
          }
        }
      },
      isDeleting ? 100 : 150,
    );

    return () => clearInterval(typerInterval);
  }, [isDeleting, loopNum]);

  return (
    <div className="heading3">
      <h2 className="hero-subtitle fw-light display-6 display-md-5 display-sm-4 text-white">
        {text}
        <span className="cursor">|</span>
      </h2>
    </div>
  );
};

export default HeroSubtitle;
