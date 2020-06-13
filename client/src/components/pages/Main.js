import React from "react";
import FoundAds from "../ads/FoundAds";
import AdSearch from "../ads/AdSearch";
import Header from "../layout/Header";

const Main = () => {
  return (
    <>
      <Header />
      <div className="container">
        <AdSearch />
        <FoundAds />
      </div>
    </>
  );
};

export default Main;
