import React from "react";
import { GiSteeringWheel } from "react-icons/gi";
import BannerImg from "../../assets/img/banner.jpg";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <div
        style={{ backgroundImage: `url(${BannerImg})` }}
        className="header-background"
      ></div>
      <div className="header-background-overlay"></div>
      <div className="header-container">
        <h1 className="header-heading">
          <span className="navbar-home">
            <span
              style={{
                color: "white",
                textShadow: "0px 2px 2px #c72b2b",
              }}
            >
              Aut
            </span>
            <GiSteeringWheel
              style={{
                color: "#c72b2b",
                marginBottom: "-4px",
                marginLeft: "1px",
              }}
            />
            <span
              style={{
                color: "#c72b2b",
                letterSpacing: "-1px",
                marginLeft: "1px",
              }}
            >
              market
            </span>
          </span>
          <br />
          Car Shopping Made Easy
        </h1>
      </div>
    </div>
  );
};

export default Header;
