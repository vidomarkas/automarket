import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import { IconContext } from "react-icons";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer__social__background">
          <div className="footer__container">
            <div className="footer__social__content">
              <div>Get connected with us on social networks!</div>
              <IconContext.Provider
                value={{ color: "white", className: "footer__social__icon" }}
              >
                <div>
                  <FaFacebookF />
                  <FaTwitter />
                  <FaLinkedin />
                  <FaInstagram />
                </div>
              </IconContext.Provider>
            </div>
          </div>
        </div>

        <div className="footer__container">
          <div className="footer__logo">
            <Link className="navbar__logo" to="/">
              <h2>
                {"///"}AutoMarket <span>&reg;</span>
              </h2>
            </Link>
          </div>
          <div className="footer__main__content">
            <div className="footer__main__content__column">
              <h3>Get to know us</h3>
              <ul>
                <li>Our history</li>
                <li>Our mission</li>
                <li>Contact</li>
                <li>Jobs</li>
                <li>Press kit</li>
                <li>Blog</li>
              </ul>
            </div>
            <div className="footer__main__content__column">
              <h3>Available services</h3>
              <ul>
                <li>Why work with us?</li>
                <li>Start in our auctions</li>
                <li>Start to bid</li>
                <li>Download our mobile app</li>
                <li>Order transport</li>
                <li>Get export expertise</li>
              </ul>
            </div>
            <div className="footer__main__content__column">
              {" "}
              <h3>Products on sale</h3>
              <ul>
                <li>Passenger cars</li>
                <li>Vans and light trucks</li>
                <li>Damaged vehicles</li>
                <li>Margin vehicles</li>
              </ul>
            </div>
            <div className="footer__main__content__column">
              <h3>Let us help you</h3>
              <ul>
                <li>FAQ</li>
                <li>Getting back on track FAQ</li>
                <li>How can I bid?</li>
                <li>How can I buy?</li>
                <li>Customer service</li>
                <li>Closing days</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__copyright">© 2020 AutoMarket</div>
      </div>
    </>
  );
};

export default Footer;
