import React, { useContext, useState, useRef, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { GiHamburgerMenu } from "react-icons/gi";
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
  const [openMobileNav, setOpenMobileNav] = useState(false);

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const dropdownRef = useRef();
  const mobileMenuRef = useRef();

  const onLogout = () => {
    logout();
    clearMyAds();
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdown(false);
    }
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target)
    ) {
      setOpenMobileNav(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown, openMobileNav]);

  const authLinks = (
    <>
      <Link to="/editing" className="btn btn-primary navbar__link">
        <GoPlus style={{ marginBottom: "-2px", marginRight: "4px" }} /> Post an
        ad
      </Link>
      <Link to="/mycars" className="navbar__link navbar-button-margin">
        My adverts
      </Link>
      <div onClick={handleDropdown} className="navbar__avatar navbar__link">
        <FaUserCircle /> {user && user.name} <MdKeyboardArrowDown />
      </div>

      {dropdown && (
        <ul className="navbar__dropdown" ref={dropdownRef}>
          <li className="navbar__dropdown-item">
            <Link to="/profile" onClick={handleDropdown}>
              Account settings
            </Link>
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
    <div className="navbar__links">
      <Link to="/demo" className="navbar__demo-link pulse navbar__link">
        Demo User
      </Link>
      <Link
        to="/login"
        className="btn navbar-button-secondary navbar-button-margin navbar__link"
      >
        Log In
      </Link>
      <Link
        to="/register"
        className="btn btn-primary navbar-button-left-margin navbar__link"
      >
        Sign Up
      </Link>
    </div>
  );
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link className="navbar__logo" to="/">
          <h2>
            {"///"}AutoMarket <span>&reg;</span>
          </h2>
        </Link>

        <div className="navbar__links">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
        <div className="navbar__mobile" ref={mobileMenuRef}>
          {user ? (
            <div onClick={() => setOpenMobileNav(!openMobileNav)}>
              {" "}
              {user.name}
            </div>
          ) : (
            <GiHamburgerMenu onClick={() => setOpenMobileNav(!openMobileNav)} />
          )}

          {openMobileNav ? (
            <div
              className="navbar__mobile__menu shadow-md"
              onClick={() => setOpenMobileNav(false)}
            >
              <div className="navbar__mobile__menu__container">
                {isAuthenticated ? (
                  <>
                    <Link to="/editing" className="navbar__mobile__menu__item">
                      Post an ad
                    </Link>
                    <Link to="/mycars" className="navbar__mobile__menu__item">
                      My adverts
                    </Link>

                    <Link
                      to="/profile"
                      onClick={handleDropdown}
                      className="navbar__mobile__menu__item"
                    >
                      Account settings
                    </Link>
                    <button
                      className="btn btn-block btn-danger"
                      onClick={onLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/demo"
                      className="navbar__mobile__menu__item"
                      onClick={() => setOpenMobileNav(false)}
                    >
                      Demo User
                    </Link>
                    <Link
                      to="/login"
                      className="navbar__mobile__menu__item"
                      onClick={() => setOpenMobileNav(false)}
                    >
                      Log In
                    </Link>
                    <Link
                      to="/register"
                      className="navbar__mobile__menu__item"
                      onClick={() => setOpenMobileNav(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
