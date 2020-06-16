import React, { useContext, useState, useRef, useEffect } from "react";
import { GiSteeringWheel } from "react-icons/gi";
import { GoPlus } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AdContext from "../../context/ad/adContext";
import styled from "styled-components";
import { Nav, Navbar, NavDropdown, Dropdown, Button } from "react-bootstrap";

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
      <Nav.Link
        as={Link}
        className="navbar-link navbar-link--primary"
        to="/editing"
      >
        <Button variant="primary">
          <GoPlus style={{ marginBottom: "-2px", marginRight: "4px" }} /> Post
          an ad
        </Button>
      </Nav.Link>
      <Nav.Link as={Link} to="/myads" className="navbar-link">
        My adverts
      </Nav.Link>

      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          <FaUserCircle />
          {user && user.name.toUpperCase()}
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdown-menu-right">
          <Dropdown.Item href="#/action-1">Account settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
  const guestLinks = (
    <>
      <Nav.Link as={Link} to="/register">
        <Button variant="light">Demo User</Button>
      </Nav.Link>
      <Nav.Link as={Link} to="/register">
        <Button variant="light"> Sign Up</Button>
      </Nav.Link>
      <Nav.Link as={Link} to="/login">
        <Button variant="primary"> Log In</Button>
      </Nav.Link>
    </>
  );
  return (
    <>
      <Navbar expand="lg ">
        <Navbar.Brand>
          <Nav.Link as={Link} className="navbar-home" to="/">
            <h2>
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
            </h2>
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto ">
            {isAuthenticated ? authLinks : guestLinks}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavigationBar;
