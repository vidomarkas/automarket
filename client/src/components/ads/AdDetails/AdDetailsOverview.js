import React from "react";
import displayPrice from "../../../utils/displayPrice";

const AdDetailsOverview = ({ ad }) => {
  const {
    make,
    model,
    dateManufactured,
    mileage,
    fuelType,
    bodyType,
    price,
  } = ad;
  return (
    <div className="car-details__section">
      <div className="car-details__section--split">
        <div>
          <h1 className="car-details__heading">
            {make} {model}
          </h1>
          <ul className="car-details__subheading">
            <li className="car-details__subheading--bullet">
              {dateManufactured}
            </li>
            <li className="car-details__subheading--bullet">{mileage} mi</li>
            <li className="car-details__subheading--bullet">{fuelType}</li>
            <li className="car-details__subheading--bullet">{bodyType}</li>
          </ul>
        </div>
        <div className="car-details__price">{displayPrice(price)}</div>
      </div>
    </div>
  );
};

export default AdDetailsOverview;
