import React, { useContext } from "react";
import AdContext from "../../context/ad/adContext";
import AdItem from "./AdItem";
import Spinner from "../layout/Spinner";
import "./FoundAds.scss";

// change this component to featured ads
const FoundAds = () => {
  const adContext = useContext(AdContext);
  const { foundAds, loading } = adContext;

  if (foundAds === null) {
    return null;
  }
  return (
    <div className="found-ads__container shadow-md">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="found-ads__heading">
            <h2>Search results</h2>
          </div>
          <div className="found-ads__list">
            {foundAds && foundAds.length > 0 ? (
              foundAds.map((ad) => <AdItem key={ad._id} ad={ad} />)
            ) : (
              <h4>Nothing found matching your criteria</h4>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FoundAds;
