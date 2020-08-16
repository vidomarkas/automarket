import React, { useContext } from "react";
import SearchResults from "../ads/SearchResults";
import Header from "../layout/Header";

import AdContext from "../../context/ad/adContext";
import TopAds from "../ads/TopAds/TopAds";

const Main = () => {
  const adContext = useContext(AdContext);
  const { foundAds } = adContext;
  return (
    <>
      <Header />
      {foundAds ? <SearchResults /> : <TopAds />}
    </>
  );
};

export default Main;
