import React, { useContext, useEffect } from "react";
import AdContext from "../../context/ad/adContext";
import AdItem from "./AdItem";
import Spinner from "../layout/Spinner";

// change this component to featured ads
const Ads = () => {
  const adContext = useContext(AdContext);
  const { foundAds, getAds, loading } = adContext;

  if (foundAds === null) {
    return null;
  }
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {foundAds && foundAds.length > 0 ? (
            foundAds.map((ad) => <AdItem key={ad._id} ad={ad} />)
          ) : (
            <h4>Nothing found matching your criteria</h4>
          )}
        </>
      )}
    </>
  );
};

export default Ads;
