import React from "react";
import AdSearch from "../ads/AdSearch";
import headerImg from "../../assets/img/header.jpg";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header" style={{ backgroundImage: `url(${headerImg})` }}>
      <div className="header__overlay"></div>
      <div className="header__container">
        <div className="header__right">
          <div className="header__text">
            <h1 className="header__heading">
              The smarter way to buy a new or used car{" "}
            </h1>
            <p className="header__subheading">
              Great offers from all around the United Kingdom
            </p>
            <ul className="header__tags">
              <li className="header__tag">Featured</li>
              <li className="header__tag">Best priced</li>
              <li className="header__tag">Most popular</li>
            </ul>
          </div>
        </div>
        <div className="header__left">
          <AdSearch />
        </div>
      </div>
    </div>
  );
};

export default Header;
