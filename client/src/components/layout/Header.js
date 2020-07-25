import React from "react";
import AdSearch from "../ads/AdSearch";
import headerBackground from "../../assets/img/header.jpg";
import headerImg from "../../assets/img/header-right.png";
import "./Header.scss";

const Header = () => {
  return (
    <div
      className="header"
      style={{ backgroundImage: `url(${headerBackground})` }}
    >
      <div className="header__overlay"></div>
      <div className="header__container">
        <div className="header__text-box">
          <h1 className="header__heading">
            The smarter way to buy a new or used car{" "}
          </h1>
          <p className="header__subheading">
            Great offers from all around the United Kingdom
          </p>
        </div>
        <div className="header__main">
          <div className="header__search">
            <AdSearch />
          </div>
          <div className="header__right">
            <img src={headerImg} alt="Audi Q5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
