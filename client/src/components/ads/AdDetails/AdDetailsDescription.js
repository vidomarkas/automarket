import React from "react";

const AdDetailsDescription = ({ description }) => {
  return (
    <>
      {description ? (
        <div className="car-details__section">
          <div className="car-details__description">
            <h2> Description</h2>
            <p>{description}</p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AdDetailsDescription;
