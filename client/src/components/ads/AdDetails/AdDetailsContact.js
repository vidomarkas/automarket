import React from "react";
import { IoIosCall } from "react-icons/io";

const AdDetailsContact = ({ coords, phoneNumber }) => {
  return (
    <div className="car-details__contact shadow-min">
      <h2>Contact seller</h2>
      <p>{coords ? "Location: " + coords.locationName : null}</p>
      <div className="car-details__contact__action-buttons">
        <a
          className="btn btn-primary btn-block"
          value={phoneNumber}
          href={"tel:" + phoneNumber}
        >
          <IoIosCall /> {phoneNumber}
        </a>
      </div>
    </div>
  );
};

export default AdDetailsContact;
