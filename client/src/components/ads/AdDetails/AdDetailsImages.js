import React from "react";
import placeholderCar from "../../../assets/img/placeholder-car.png";

const AdDetailsImages = ({ imageURL, sold }) => {
  return (
    <div
      className="car-details__main-image"
      style={{
        backgroundImage: imageURL
          ? `url(${imageURL})`
          : `url(${placeholderCar})`,
      }}
    >
      <div className="car-details__main-image--overlay"></div>
      {sold && <div className="car-details__main-image--sold">Sold</div>}
    </div>
  );
};

export default AdDetailsImages;
