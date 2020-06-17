import React from "react";
import headerImg from "../../assets/img/header-img.jpg";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="header__text">
        <ul className="header__tags">
          <li className="header__tag">Featured</li>
          <li className="header__tag">Best priced</li>
          <li className="header__tag">Most popular</li>
        </ul>
        <h1 className="header__heading">
          The smarter way to buy a new or used car{" "}
        </h1>
        <p className="header__subheading">
          Great offers from all around the United Kingdom
        </p>
      </div>
      <div
        className="header__image"
        style={{ backgroundImage: `url(${headerImg})` }}
      ></div>
    </div>
  );
};

export default Header;
