import React, { useContext, useState, useRef, useEffect } from "react";
import { GiSteeringWheel } from "react-icons/gi";
import { GoPlus } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";

import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AdContext from "../../context/ad/adContext";
import "./Navbar.scss";

const Navbar = () => {
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
      <Link className="navbar-link navbar-link--primary" to="/editing">
        <GoPlus style={{ marginBottom: "-2px", marginRight: "4px" }} />
        Post an ad
      </Link>
      <Link to="/myads" className="navbar-link">
        My adverts
      </Link>

      <div className="navbar-avatar navbar-link" onClick={handleDropdown}>
        <FaUserCircle
          size="1.5em"
          style={{ marginBottom: "2px", marginRight: "4px" }}
        />
        {user && user.name.toUpperCase()}
      </div>
      {dropdown && (
        <div className="navbar-dropdown">
          <ul>
            <li className="navbar-dropdown-item">Account settings</li>
            <li onClick={onLogout} className="navbar-dropdown-item">
              Logout
            </li>
          </ul>
        </div>
      )}
    </>
  );
  const guestLinks = (
    <>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </>
  );
  return (
    <div className="navbar">
      <div className="navbar-container" ref={container}>
        <Link className="navbar-home" to="/">
          <span style={{ color: "white" }}>Aut</span>

          <GiSteeringWheel
            style={{ color: "white", marginBottom: "-4px", marginLeft: "1px" }}
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
        </Link>

        <div className="navbar-links">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
