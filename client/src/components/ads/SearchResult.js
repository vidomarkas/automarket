import React from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import fuelIcon from "../../assets/img/fuel.svg";
import gearboxIcon from "../../assets/img/gearbox.svg";
import bodytypeIcon from "../../assets/img/coupe.svg";
import placeholderCar from "../../assets/img/placeholder-car.png";
import "./SearchResult.scss";

const SearchResult = ({ ad }) => {
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
    featured,
    dateUpdated,
  } = ad;

  const displayPrice = () => {
    const priceFormatter = new Intl.NumberFormat("en-UK", {
      style: "currency",
      currency: "GBP",
    });

    return priceFormatter.format(price).slice(0, -3);
  };

  return (
    <Link to={`/cars/${_id}`}>
      <div
        className={
          featured ? "search-result search-result--featured" : "search-result"
        }
      >
        {imageURL ? (
          <div
            className="search-result__image shadow-min"
            style={{ backgroundImage: `url(${imageURL})` }}
          ></div>
        ) : (
          <div
            className="search-result__image shadow-min"
            style={{ backgroundImage: `url(${placeholderCar})` }}
          ></div>
        )}

        <div className="search-result__main">
          <div className="search-result__info">
            <div className="search-result__info__make">
              {make} {model}
            </div>
            <div className="search-result__info__year">
              <span> {dateManufactured}</span>
              <span className="search-result__main__featured">
                {featured ? "featured" : null}
              </span>
            </div>
          </div>
          <div className="search-result__features">
            <div className="search-result__features__item">
              <img src={fuelIcon} alt="" />
              {fuelType}
            </div>

            <div className="search-result__features__item">
              {" "}
              <img src={gearboxIcon} alt="" /> {gearbox}
            </div>

            <div className="search-result__features__item">
              {" "}
              <img src={bodytypeIcon} alt="" /> {bodyType}
            </div>
          </div>
          {dateUpdated && (
            <div className="search-result__date-added">
              Updated <ReactTimeAgo date={Date.parse(dateUpdated)} />
            </div>
          )}
          <div className="search-result__price">{displayPrice()}</div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResult;
