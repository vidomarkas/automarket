import React from "react";
import { GiSteeringWheel } from "react-icons/gi";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-primary navbar">
      <div style={{ fontWeight: "bold", fontSize: "2rem" }}>
        Aut
        <GiSteeringWheel />
        <span style={{ color: "red" }}>market</span>
      </div>
      <ul>
        <li>
          <Link to="/">Main</Link>
        </li>
        <li>
          <Link to="/editing">Post an ad</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
