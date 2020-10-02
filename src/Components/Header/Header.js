import React, { useEffect, useRef, useState } from "react";
import SmoothScroll from "../../utils/SmoothScroll.js";
import "./Header.css";

function Header({ logo, name }) {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const navLinksRef = useRef(null);
  const firstTimeUpdate = useRef(true);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsTop(window.scrollY < 30);
    });

    document.body.addEventListener(
      "click",
      (e) => {
        if (!e.target.classList.contains("hamburger")) {
          setIsHamburgerOpen(false);
        }
      },
      false
    );
  }, []);

  useEffect(() => {
    if (firstTimeUpdate.current) {
      firstTimeUpdate.current = false;
      return;
    }

    const navLinks = document.querySelector(".nav-links");
    if (isHamburgerOpen) {
      navLinks.classList.add("show__navLinks");
    } else {
      navLinks.classList.remove("show__navLinks");
    }
  }, [isHamburgerOpen]);

  return (
    <div
      className="header"
      style={
        isTop
          ? { backgroundColor: "transparent" }
          : { backgroundColor: "black" }
      }
    >
      <a href="/" className="logo">
        <img src={`${process.env.PUBLIC_URL}/${logo}`} alt="" />
        <h1>{name?.firstName}</h1>
      </a>
      <ul className="nav-links" ref={navLinksRef}>
        <li onClick={(e) => SmoothScroll(".about", 1000)}>About</li>
        <li>Skills</li>
        <li>Resume</li>
        <li>Works</li>
        <li>Contact</li>
      </ul>
      <div
        className="hamburger"
        onClick={(e) => setIsHamburgerOpen(!isHamburgerOpen)}
      >
        <div className="hamburger__top"></div>
        <div className="hamburger__middle"></div>
        <div className="hamburger__bottom"></div>
      </div>
    </div>
  );
}

export default Header;
