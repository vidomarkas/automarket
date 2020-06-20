import React, { useContext, useState, useRef, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";

import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AdContext from "../../context/ad/adContext";
import "./Navbar.scss";

const NavigationBar = () => {
  const authContext = useContext(AuthContext);
  const adContext = useContext(AdContext);
  const { isAuthenticated, logout, user } = authContext;
  const { clearMyAds } = adContext;

  const [dropdown, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const container = useRef();

  const onLogout = () => {
    logout();
    clearMyAds();
  };
  const handleClickOutside = (event) => {
    if (container.current && !container.current.contains(event.target)) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown]);

  const authLinks = (
    <>
      <Link to="/editing" className="btn btn-primary">
        <GoPlus style={{ marginBottom: "-2px", marginRight: "4px" }} /> Post an
        ad
      </Link>
      <Link to="/myads" className="navbar-link">
        My adverts
      </Link>
      <div onClick={handleDropdown} className="navbar__avatar">
        <FaUserCircle /> {user && user.name} <MdKeyboardArrowDown />
      </div>

      {dropdown && (
        <ul className="navbar__dropdown">
          {/* <li className="navbar__dropdown-item">
            <button>Account settings</button>{" "}
          </li> */}
          <li className="navbar__dropdown-item">
            <button className="btn btn-block btn-danger" onClick={onLogout}>
              Logout
            </button>
          </li>
        </ul>
      )}
    </>
  );
  const guestLinks = (
    <>
      <Link to="/demo" className="navbar__demo-link">
        Demo User
      </Link>
      <Link to="/login" className="btn btn-secondary navbar-button-left-margin">
        Log In
      </Link>
      <Link
        to="/register"
        className="btn btn-primary navbar-button-left-margin"
      >
        Sign Up
      </Link>
    </>
  );
  return (
    <nav className="navbar">
      <div className="navbar__container" ref={container}>
        <Link className="navbar__logo" to="/">
          <h2>
            {
              // eslint-disable-next-line
            }
            ///AutoMarket <span>&reg;</span>
          </h2>
        </Link>
        <ul className="navbar__menu-links">
          <li className="navbar__menu-link">
            <Link to="/featured">Featured</Link>
          </li>
          <li className="navbar__menu-link">
            {" "}
            <Link to="/detailed-search">Detailed Search</Link>
          </li>
          <li className="navbar__menu-link">
            {" "}
            <Link to="/help">Help</Link>
          </li>
          <li className="navbar__menu-link">
            {" "}
            <Link to="/news">News</Link>
          </li>
        </ul>

        <div className="navbar__user-links">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
