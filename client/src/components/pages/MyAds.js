import React, { useContext, useEffect } from "react";
import AdContext from "../../context/ad/adContext";
import MyAdItem from "../ads/MyAdItem";

const MyAds = () => {
  const adContext = useContext(AdContext);
  const { myAds, getMyAds, loading } = adContext;

  useEffect(() => {
    getMyAds();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      {!loading &&
        myAds &&
        myAds.map((ad) => <MyAdItem key={ad._id} myAd={ad} />)}
    </div>
  );
};

export default MyAds;
