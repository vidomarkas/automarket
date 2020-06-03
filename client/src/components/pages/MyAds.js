import React, { useContext } from "react";
import AdContext from "../../context/ad/adContext";
import MyAdItem from "../ads/MyAdItem";

const MyAds = () => {
  const adContext = useContext(AdContext);
  const { myAds } = adContext;
  return (
    <div>
      {myAds.map((ad) => (
        <MyAdItem key={ad.id} myAd={ad} />
      ))}
    </div>
  );
};

export default MyAds;
