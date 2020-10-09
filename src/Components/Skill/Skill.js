import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import "./Skill.css";

function Skill({ skill }) {
  return (
    <div key={skill.name} className="skill">
      <Tooltip title={skill}>
        <img
          src={`${process.env.PUBLIC_URL}/img/tech_skills/${skill.toLowerCase()}.svg`}
          alt=""
          className={`${skill}`}
        ></img>
      </Tooltip>
    </div>
  );
}

export default Skill;
