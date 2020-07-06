import React, { useContext } from "react";
import SearchResults from "../ads/SearchResults";
import Header from "../layout/Header";
import AdGrid from "../ads/AdGrid";
import AdContext from "../../context/ad/adContext";

const Main = () => {
  const adContext = useContext(AdContext);
  const { foundAds } = adContext;
  return (
    <div>
      <Header />

      {foundAds ? <SearchResults /> : <AdGrid />}
    </div>
  );
};

export default Main;
