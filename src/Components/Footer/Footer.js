import React from "react";
import "./Footer.css";

function Footer({ social }) {

  return (
    <div className="footer">
      <div className="social">
        {social?.map((item) => (
          <a
            key={item.name}
            href={item.url}
            rel="noopener noreferrer"
            target="blank"
            onMouseOver={(e) => (e.target.style.backgroundColor = item.color)}
            onMouseOut={(e) => (e.target.style.backgroundColor = "")}
            className={`link ${item.name}`}
          >
            <i className={`fab ${item.icon}`}></i>
          </a>
        ))}
      </div>
      <div className="copyrightInfo">
        <p>
          &#169; Copyright 2020 Nikhil Pavan Sai
        </p>
      </div>
    </div>
  );
}

export default Footer;
