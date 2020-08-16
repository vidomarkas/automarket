import React, { useContext, useEffect, useState } from "react";
import AdContext from "../../../context/ad/adContext";
import Spinner from "../../layout/Spinner";
import TopAdsTabs from "./TopAdsTabs";
import AdGrid from "../AdGrid/AdGrid";

const TopAds = () => {
  const adContext = useContext(AdContext);
  const {
    getAdGroup,
    loading,
    adGroup,
    adGroupType,
    setAdGroupType,
  } = adContext;
  const [currentTab, setCurrentTab] = useState(adGroupType);

  useEffect(() => {
    setAdGroupType(currentTab);
    getAdGroup({
      type: currentTab,
    });
    // eslint-disable-next-line
  }, [currentTab, setCurrentTab]);
  return (
    <div className="ad-grid__container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <TopAdsTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
          <AdGrid ads={adGroup} />
        </>
      )}
    </div>
  );
};

export default TopAds;
