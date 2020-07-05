import React from "react";
import { Link } from "react-router-dom";
import "./AdPublished.scss";
import { FaArrowAltCircleRight } from "react-icons/fa";

const AdPublished = () => {
  return (
    <div className="ad-published">
      <div class="success-checkmark">
        <div class="check-icon">
          <span class="icon-line line-tip"></span>
          <span class="icon-line line-long"></span>
          <div class="icon-circle"></div>
          <div class="icon-fix"></div>
        </div>
      </div>
      <h2 className="ad-published__heading">Your ad is now published</h2>
      <p className="ad-published__text">Redirecting to your ads page...</p>
      <Link className="btn btn-primary" to="/myads">
        My ads
        <FaArrowAltCircleRight
          style={{ marginBottom: "-2px", marginLeft: "4px" }}
        />
      </Link>
    </div>
  );
};

export default AdPublished;
