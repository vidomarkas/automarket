import React from "react";
import { Link } from "react-router-dom";

const AdItem = ({ ad }) => {
  const { make, model, price, id } = ad;
  return (
    <div className="card bg-light">
      <div>
        {ad.make} {ad.model}
      </div>
      <div>{ad.price}</div>
      <Link to={`/ads/${id}`}>More details</Link>
      <br />
    </div>
  );
};

export default AdItem;
