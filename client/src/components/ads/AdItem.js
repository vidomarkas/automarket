import React from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import fuelIcon from "../../assets/img/fuel.svg";
import gearboxIcon from "../../assets/img/gearbox.svg";
import bodytypeIcon from "../../assets/img/coupe.svg";
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
    dateAdded,
  } = ad;

  const displayPrice = () => {
    const priceFormatter = new Intl.NumberFormat("en-UK", {
      style: "currency",
      currency: "GBP",
    });

    return priceFormatter.format(price).slice(0, -3);
  };

  return (
    <Link to={`ads/${_id}`}>
      <div className={featured ? "ad-item ad-item--featured" : "ad-item"}>
        {imageURL && (
          <div
            className="ad-item__image shadow-min"
            style={{ backgroundImage: `url(${imageURL})` }}
          ></div>
        )}

        <div className="ad-item__main">
          <div>
            {make} {model}
          </div>
          <span> {dateManufactured}</span>
          <span className="ad-item__main__featured">
            {" "}
            {featured ? "featured" : null}
          </span>
        </div>
        <div className="ad-item__features">
          <div className="ad-item__features__item">
            <img src={fuelIcon} alt="" />
            {fuelType}
          </div>

          <div className="ad-item__features__item">
            {" "}
            <img src={gearboxIcon} alt="" /> {gearbox}
          </div>

          <div className="ad-item__features__item">
            {" "}
            <img src={bodytypeIcon} alt="" /> {bodyType}
          </div>
        </div>

        <div className="ad-item__date-added">
          <ReactTimeAgo date={Date.parse(dateAdded)} />
        </div>

        <div className="ad-item__price">{displayPrice()}</div>
      </div>
    </Link>
  );
};

export default AdItem;
