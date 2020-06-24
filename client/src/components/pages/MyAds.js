import React, { useContext, useEffect } from "react";
import AdContext from "../../context/ad/adContext";
import MyAdItem from "../ads/MyAdItem";
import "./MyAds.scss";

const MyAds = () => {
  const adContext = useContext(AdContext);
  const { myAds, getMyAds, loading } = adContext;

  useEffect(() => {
    getMyAds();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="my-ads">
      <div className="my-ads__container shadow-md">
        {" "}
        {!loading &&
          myAds &&
          myAds.map((ad) => <MyAdItem key={ad._id} myAd={ad} />)}
      </div>
    </div>
  );
};

export default MyAds;
