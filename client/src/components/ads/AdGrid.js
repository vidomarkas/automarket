import React, { useContext, useEffect } from "react";
import AdContext from "../../context/ad/adContext";
import AdGridItem from "./AdGridItem";
import Spinner from "../layout/Spinner";
import "./AdGrid.scss";

const AdGrid = () => {
  const adContext = useContext(AdContext);
  const { getAdGroup, loading, featuredAds } = adContext;

  useEffect(() => {
    getAdGroup({
      featured: true,
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="ad-grid__container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="ad-grid__">
            <h2>Featured </h2>
          </div>
          <div className="ad-grid__grid">
            {featuredAds && featuredAds.length > 0 ? (
              featuredAds.map((ad) => <AdGridItem key={ad._id} ad={ad} />)
            ) : (
              <h4>No featured ads</h4>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdGrid;
