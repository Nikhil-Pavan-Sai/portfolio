import React, { useEffect } from "react";
import DownloadLink from "react-download-link";
import "./Resume.css";

function Resume({ resume, background }) {
  useEffect(() => {
    const resumeSection = document.querySelector(".resume");
    resumeSection.style.setProperty(
      "--about",
      `url("/img/${background?.resume}")`
    );
  }, [background]);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      () => {
        const screenPosition = window.innerHeight;
        const resumeBtn = document
          .querySelector(".resume__copy a")
          .getBoundingClientRect().bottom;

        if (resumeBtn < screenPosition) {
          document
            .querySelector(".resume__copy a")
            .classList.add("resumeBtn__appearEffect");
        }
      },
      []
    );
  });

  return (
    <div className="resume">
      <div className="resume__container">
        <h1 className="section__header">Check out my resume</h1>
        <div className="resume__copy">
          <DownloadLink
            style={{ color: "white" }}
            label="Grab a copy of my resume"
            filename={resume}
          />
        </div>
      </div>
    </div>
  );
}

export default Resume;
