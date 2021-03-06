import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdPublished.scss";
import { FaArrowAltCircleRight } from "react-icons/fa";

const AdPublished = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="ad-published">
      <div className="success-checkmark">
        <div className="check-icon">
          <span className="icon-line line-tip"></span>
          <span className="icon-line line-long"></span>
          <div className="icon-circle"></div>
          <div className="icon-fix"></div>
        </div>
      </div>
      <h2 className="ad-published__heading">Your ad is now published</h2>
      <p className="ad-published__text">Redirecting to your cars page...</p>
      <Link className="btn btn-primary" to="/mycars">
        My cars
        <FaArrowAltCircleRight
          style={{ marginBottom: "-2px", marginLeft: "4px" }}
        />
      </Link>
    </div>
  );
};

export default AdPublished;
