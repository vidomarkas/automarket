import React from "react";
import AdGridItem from "./AdGridItem";
import "./AdGrid.scss";

const AdGrid = ({ ads }) => {
  return (
    <div className="ad-grid__grid">
      {ads && ads.length > 0 ? (
        ads.map((ad) => <AdGridItem key={ad._id} ad={ad} />)
      ) : (
        <h4>No ads found</h4>
      )}
    </div>
  );
};

export default AdGrid;
