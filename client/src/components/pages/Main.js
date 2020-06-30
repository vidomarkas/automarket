import React, { useContext } from "react";
import FoundAds from "../ads/FoundAds";
import Header from "../layout/Header";
import AdGrid from "../ads/AdGrid";
import AdContext from "../../context/ad/adContext";

const Main = () => {
  const adContext = useContext(AdContext);
  const { foundAds } = adContext;
  return (
    <div>
      <Header />

      {foundAds ? <FoundAds /> : <AdGrid />}
    </div>
  );
};

export default Main;
