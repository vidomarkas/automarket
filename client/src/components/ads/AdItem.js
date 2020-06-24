import React from "react";
import { Link } from "react-router-dom";
import "./AdItem.scss";

const AdItem = ({ ad }) => {
  const {
    make,
    model,
    price,
    _id,
    dateManufactured,
    bodyType,
    fuelType,
    imageURL,
    gearbox,
    postcode,
    featured,
    sold,
  } = ad;
  return (
    <Link to={`ads/${_id}`}>
      <div className="ad-item">
        {imageURL && (
          <div className="ad-item__image-container">
            <img
              className={
                featured
                  ? "ad-item__image ad-item__image--featured"
                  : "ad-item__image"
              }
              src={imageURL}
              alt={make}
            />
          </div>
        )}
        <div className="ad-item__info">
          {make} {model} {dateManufactured}
        </div>
        <div>
          {bodyType} {fuelType}
          {gearbox}
        </div>
        <div>{postcode}</div>
        <div>{price}</div>
        {sold ? <div> sold</div> : null}
      </div>
    </Link>
  );
};

export default AdItem;
