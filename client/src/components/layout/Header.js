import React from "react";
import { GiSteeringWheel } from "react-icons/gi";
import headerImg from "../../assets/img/header-img.jpg";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="header-text">
        <h1 className="header-heading">
          The smarter way to buy a new or used car{" "}
        </h1>
        <p className="header-subtext">
          Great offers from all around the United Kingdom
        </p>
      </div>
    </div>
  );
};

export default Header;
