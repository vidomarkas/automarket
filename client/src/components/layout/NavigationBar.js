import React, { useContext, useState, useRef, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
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

  const dropdownRef = useRef();

  const onLogout = () => {
    logout();
    clearMyAds();
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
      <Link to="/mycars" className="navbar-link">
        My adverts
      </Link>
      <div onClick={handleDropdown} className="navbar__avatar">
        <FaUserCircle /> {user && user.name} <MdKeyboardArrowDown />
      </div>

      {dropdown && (
        <ul className="navbar__dropdown" ref={dropdownRef}>
          <li className="navbar__dropdown-item">
            <Link to="/profile">Account settings</Link>
          </li>
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
      <Link to="/demo" className="navbar__demo-link pulse">
        Demo User
      </Link>
      <Link
        to="/login"
        className="btn navbar-button-secondary navbar-button-left-margin"
      >
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
      <div className="navbar__container">
        <Link className="navbar__logo" to="/">
          <h2>
            {"///"}AutoMarket <span>&reg;</span>
          </h2>
        </Link>
        <ul className="navbar__menu-links">
          <li className="navbar__menu-link">
            <Link to="/featured">Featured Cars</Link>
          </li>

          <li className="navbar__menu-link">
            {" "}
            <Link to="/terms-and-conditions">T&Cs</Link>
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
