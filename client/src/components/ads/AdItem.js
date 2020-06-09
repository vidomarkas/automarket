import React from "react";
import { Link } from "react-router-dom";

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
  } = ad;
  return (
    <div className="card bg-light" style={{ flexBasis: "25%" }}>
      {imageURL && (
        <div>
          {" "}
          <img src={imageURL} style={{ width: "200px" }} alt="" />
        </div>
      )}
      <div>
        {make} {model} {dateManufactured}
      </div>
      <div>
        {bodyType} {fuelType}
      </div>
      <div>{price}</div>
      <Link to={`/ads/${_id}`}>More details</Link>
      <br />
    </div>
  );
};

export default AdItem;
