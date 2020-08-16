import React, { useContext } from "react";
import AdContext from "../../context/ad/adContext";
import Header from "../layout/Header/Header";
import TopAds from "../ads/TopAds/TopAds";
import SearchResults from "../ads/SearchResults/SearchResults";

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
