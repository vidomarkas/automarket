import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { GiHamburgerMenu } from "react-icons/gi";
import { IconContext } from "react-icons";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../../actions/authActions";
import { clearMyAds } from "../../../actions/adActions";
import { getSavedAds } from "../../../actions/userActions";

const NavBar = ({
  logout,
  clearMyAds,
  getSavedAds,
  user: { savedAds, loading },
  auth: { user, isAuthenticated },
}) => {
  const [savedAdsNumber, setSavedAdsNumber] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [openMobileNav, setOpenMobileNav] = useState(false);

  const dropdownRef = useRef();
  const mobileMenuRef = useRef();

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

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
    if (isAuthenticated) {
      getSavedAds();
    }
  }, [isAuthenticated, getSavedAds]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown, openMobileNav]);

  useEffect(() => {
    if (!loading && savedAds && isAuthenticated) {
      setSavedAdsNumber(savedAds.length);
    }
  }, [isAuthenticated, loading, savedAds]);

  useEffect(() => {
    if (!isAuthenticated) {
      setSavedAdsNumber(null);
    }
  }, [isAuthenticated]);

  const authLinks = (
    <>
      <Link to="/editing" className="btn btn-primary navbar__link">
        <GoPlus style={{ marginBottom: "-2px", marginRight: "4px" }} /> Post an
        ad
      </Link>
      <Link to="/mycars" className="navbar__link navbar-button-margin">
        My adverts
      </Link>
      <Link to="/saved" className="navbar__link navbar-button-margin">
        Saved adverts
        {savedAdsNumber > 0 ? (
          <span className="navbar__link--badge">{savedAdsNumber}</span>
        ) : null}
      </Link>
      <div
        onClick={() => setDropdown(!dropdown)}
        className="navbar__avatar navbar__link"
      >
        <FaUserCircle /> {user && user.name} <MdKeyboardArrowDown />
      </div>

      {dropdown && (
        <ul className="navbar__dropdown" ref={dropdownRef}>
          <li className="navbar__dropdown-item">
            <Link to="/profile" onClick={() => setDropdown(!dropdown)}>
              User profile
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
            <IconContext.Provider
              value={openMobileNav ? { color: "#fff" } : { color: "#9ea1a5" }}
            >
              <div>
                <GiHamburgerMenu
                  onClick={() => setOpenMobileNav(!openMobileNav)}
                />
              </div>
            </IconContext.Provider>
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
                    <Link to="/saved" className="navbar__mobile__menu__item">
                      Saved adverts
                    </Link>

                    <Link
                      to="/profile"
                      onClick={handleDropdown}
                      className="navbar__mobile__menu__item"
                    >
                      User profile
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

NavBar.propTypes = {
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  clearMyAds: PropTypes.func.isRequired,
  getSavedAds: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, clearMyAds, getSavedAds })(
  NavBar
);
