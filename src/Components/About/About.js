import React, { useEffect } from "react";
import "./About.css";

function About({ profilePic, about }) {
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const screenPosition = window.innerHeight;
      const profilePhoto = document
        .querySelector(".about__profilePhoto")
        .getBoundingClientRect().top;

      if (profilePhoto < screenPosition) {
        document
          .querySelector(".about__profilePhoto")
          .classList.add("about__appearEffect");
      } else {
        document
          .querySelector(".about__profilePhoto")
          .classList.remove("about__appearEffect");
      }

      const description = document
        .querySelector(".about__description")
        .getBoundingClientRect().top;

      if (description < screenPosition) {
        document
          .querySelector(".about__description")
          .classList.add("about__appearEffect");
      } else {
        document
          .querySelector(".about__description")
          .classList.remove("about__appearEffect");
      }

      const hobbies = document
        .querySelector(".about__hobbies")
        .getBoundingClientRect().top;

      if (hobbies < screenPosition) {
        document
          .querySelector(".about__hobbies")
          .classList.add("about__appearEffect");
      } else {
        document
          .querySelector(".about__hobbies")
          .classList.remove("about__appearEffect");
      }
    });
  }, []);

  const descriptionAboutMe = () => {
    const about_me = about?.description.substring(
      about?.description.indexOf("My"),
      about?.description.indexOf("ZeMoSo")
    );
    const about_company = about?.description.substring(
      about?.description.indexOf("ZeMoSo"),
      about?.description.indexOf("Developing")
    );
    const about_rest = about?.description.substring(
      about?.description.indexOf("Developing"),
      about?.description.length
    );
    return (
      <div className="about__description">
        <p>
          {about_me}
          <a className="about__linkColor" href="https://www.zemosolabs.com/">
            {about_company}
          </a>
        </p>
        <p>{about_rest}</p>
      </div>
    );
  };

  return (
    <div className="about">
      <h1 className="section__header">A little bit about me</h1>
      <img
        className="about__profilePhoto"
        src={`${process.env.PUBLIC_URL}/img/${profilePic}`}
        alt=""
      />
      {descriptionAboutMe()}
      <p className="about__hobbies">{about?.hobbies}</p>
    </div>
  );
}

export default About;
