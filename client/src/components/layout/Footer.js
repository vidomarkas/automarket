import React from "react";

const Footer = () => {
  return (
    <>
      <div
        style={{
          color: "#fefefe",
          display: "flex",
          justifyContent: "space-around",
          padding: "4rem",
          fontSize: "1.4rem",
          background: "rgba(0, 0, 0, 0.801)",
        }}
      >
        <div>
          <h3 style={{ color: "#108be9" }}>Get to know us</h3>
          <ul>
            <li>Our history</li>
            <li>Our mission</li>
            <li>Contact</li>
            <li>Jobs</li>
            <li>Press kit</li>
            <li>Blog</li>
          </ul>
        </div>
        <div>
          <h3 style={{ color: "#108be9" }}>Available services</h3>
          <ul>
            <li>Why work with us?</li>
            <li>Start in our auctions</li>
            <li>Start to bid</li>
            <li>Download our mobile app</li>
            <li>Order transport</li>
            <li>Get export expertise</li>
          </ul>
        </div>
        <div>
          {" "}
          <h3 style={{ color: "#108be9" }}>Products on sale</h3>
          <ul>
            <li>Passenger cars</li>
            <li>Vans and light trucks</li>
            <li>Damaged vehicles</li>
            <li>Margin vehicles</li>
          </ul>
        </div>
        <div>
          <h3 style={{ color: "#108be9" }}>Let us help you</h3>
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
    </>
  );
};

export default Footer;
