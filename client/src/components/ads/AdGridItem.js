import React from "react";
import { Link } from "react-router-dom";

const AdGridItem = ({ ad }) => {
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

  // Create our number formatter.
  const priceFormatter = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  });
  return (
    <div className="ad-grid__item">
      <Link to={`ads/${_id}`}>
        {imageURL && (
          <div className="ad-grid__item__image-wrapper">
            <img className="ad-grid__item__image" src={imageURL} alt={make} />
            <div className="ad-grid__item__price">
              {priceFormatter.format(price).slice(0, -3)}
            </div>
          </div>
        )}
        <div className="ad-grid__item__info">
          {make} {model} {dateManufactured}
          <div>
            {bodyType} {fuelType}
            {gearbox}
          </div>
          <div>{postcode}</div>
          {sold ? <div> sold</div> : null}
        </div>
      </Link>
    </div>
  );
};

export default AdGridItem;
