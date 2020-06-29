import React from "react";
import { Link } from "react-router-dom";
import fuelIcon from "../../assets/img/fuel.svg";
import speedIcon from "../../assets/img/speed.svg";
import wheelIcon from "../../assets/img/steering-wheel.svg";
import bodytypeIcon from "../../assets/img/coupe.svg";
import yearIcon from "../../assets/img/calendar.svg";
import gearboxIcon from "../../assets/img/gearbox.svg";

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
    sold,
    mileage,
    steeringWheel,
  } = ad;

  const displayPrice = () => {
    const priceFormatter = new Intl.NumberFormat("en-UK", {
      style: "currency",
      currency: "GBP",
    });

    return priceFormatter.format(price).slice(0, -3);
  };
  return (
    <div className="ad-grid__item">
      <Link to={`ads/${_id}`}>
        {imageURL && (
          <div className="ad-grid__item__image-wrapper">
            <img className="ad-grid__item__image" src={imageURL} alt={make} />
            <div
              className={
                sold
                  ? "ad-grid__item__price ad-grid__item__price--sold"
                  : "ad-grid__item__price"
              }
            >
              {sold ? (
                <span>Sold {displayPrice()}</span>
              ) : (
                <span>{displayPrice()}</span>
              )}
            </div>
          </div>
        )}
        <div className="ad-grid__item__info">
          <p className="ad-grid__item__info__heading">
            {make} {model}
          </p>
          <div className="ad-grid__item__info__specs">
            <ul className="ad-grid__item__info__specs--left">
              <li className="ad-grid__item__info__spec-item">
                <div className="ad-grid__item__info__spec-item__atribute">
                  <img src={yearIcon} alt="" />
                </div>
                <p className="ad-grid__item__info__spec-item--primary">
                  {dateManufactured}
                </p>
              </li>
              <li className="ad-grid__item__info__spec-item">
                <div className="ad-grid__item__info__spec-item__atribute">
                  <img src={speedIcon} alt="" />
                </div>
                <p className="ad-grid__item__info__spec-item--primary">
                  {mileage} miles
                </p>
              </li>
            </ul>
            <ul className="ad-grid__item__info__specs--right">
              <li className="ad-grid__item__info__spec-item">
                <div className="ad-grid__item__info__spec-item__atribute">
                  <img src={fuelIcon} alt="" />
                </div>
                <p className="ad-grid__item__info__spec-item--primary">
                  {fuelType}
                </p>
              </li>
              <li className="ad-grid__item__info__spec-item">
                <div className="ad-grid__item__info__spec-item__atribute">
                  <img src={gearboxIcon} alt="" />
                </div>
                <p className="ad-grid__item__info__spec-item--primary">
                  {gearbox}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AdGridItem;
