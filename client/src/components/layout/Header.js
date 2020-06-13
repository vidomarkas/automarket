import React from "react";

import BannerImg from "../../assets/img/banner.png";
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
          AutoMarket <br />
          Car Shopping Made Easy
        </h1>
      </div>
    </div>
  );
};

export default Header;
