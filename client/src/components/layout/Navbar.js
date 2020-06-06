import React, { useContext } from "react";
import { GiSteeringWheel } from "react-icons/gi";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AdContext from "../../context/ad/adContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const adContext = useContext(AdContext);
  const { isAuthenticated, logout, user } = authContext;
  const { clearMyAds } = adContext;

  const onLogout = () => {
    logout();
    clearMyAds();
  };

  const authLinks = (
    <>
      <li>
        <Link to="/">Main</Link>
      </li>
      <li>
        <Link to="/myads">My adverts</Link>
      </li>
      <li>
        <Link to="/editing">Post an ad</Link>
      </li>
      <li>{user && user.name}</li>
      <li>
        {" "}
        <a onClick={onLogout} href="#!">
          Logout
        </a>
      </li>
    </>
  );
  const guestLinks = (
    <>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Log in</Link>
      </li>
    </>
  );
  return (
    <div className="bg-primary navbar">
      <Link to="/">
        <div style={{ fontWeight: "bold", fontSize: "2rem" }}>
          Aut
          <GiSteeringWheel />
          <span style={{ color: "red" }}>market</span>
        </div>
      </Link>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

export default Navbar;
