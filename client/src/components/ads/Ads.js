import React, { useContext, useEffect } from "react";
import AdContext from "../../context/ad/adContext";
import AdItem from "./AdItem";

// change this component to featured ads
const Ads = () => {
  const adContext = useContext(AdContext);
  const { foundAds } = adContext;

  useEffect(() => {
    if (foundAds && foundAds.length > 0) {
      return;
    }
  }, [foundAds]);
  return (
    <>
      {foundAds && foundAds.length > 0 ? (
        foundAds.map((ad) => <AdItem key={ad.id} ad={ad} />)
      ) : (
        <h2>Nothing found matching your criteria</h2>
      )}
    </>
  );
};

export default Ads;
