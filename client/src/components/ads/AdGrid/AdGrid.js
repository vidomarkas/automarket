import React from "react";
import AdGridItem from "./AdGridItem";
import "./AdGrid.scss";

const AdGrid = ({ ads }) => {
  const filteredAds = ads.filter((ad) => {
    return ad !== null;
  });
  return (
    <div className="ad-grid__grid">
      {filteredAds && filteredAds.length > 0 ? (
        filteredAds.map((ad) => <AdGridItem key={ad._id} ad={ad} />)
      ) : (
        <h4>No ads found</h4>
      )}
    </div>
  );
};

export default AdGrid;
