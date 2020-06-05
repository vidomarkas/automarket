import React, { useContext, useEffect } from "react";
import AdContext from "../../context/ad/adContext";
import AdItem from "./AdItem";

// change this component to featured ads
const Ads = () => {
  const adContext = useContext(AdContext);
  const { foundAds } = adContext;

  useEffect(() => {
    console.log("foundAds", foundAds);
  }, [foundAds]);

  if (foundAds === null) {
    return null;
  }
  return (
    <>
      {foundAds && foundAds.length > 0 ? (
        foundAds.map((ad) => <AdItem key={ad.id} ad={ad} />)
      ) : (
        <h4>Nothing found matching your criteria</h4>
      )}
    </>
  );
};

export default Ads;
