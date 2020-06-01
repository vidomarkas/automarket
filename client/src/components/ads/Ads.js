import React, { useContext } from "react";
import AdContext from "../../context/ad/adContext";
import AdItem from "./AdItem";

const Ads = () => {
  const adContext = useContext(AdContext);
  const { ads } = adContext;
  return (
    <div>
      {ads.map((ad) => (
        <AdItem key={ad.id} ad={ad} />
      ))}
    </div>
  );
};

export default Ads;
