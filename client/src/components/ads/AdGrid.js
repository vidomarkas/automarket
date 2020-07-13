import React, { useContext, useEffect, useState } from "react";
import AdContext from "../../context/ad/adContext";
import AdGridItem from "./AdGridItem";
import Spinner from "../layout/Spinner";
import "./AdGrid.scss";

const AdGrid = () => {
  const adContext = useContext(AdContext);
  const { getAdGroup, loading, adGroup } = adContext;
  const [currentTab, setCurrentTab] = useState("featured");

  useEffect(() => {
    getAdGroup({
      type: currentTab,
    });
    console.log("adGroup", adGroup);
    console.log("currentTab", currentTab);

    // eslint-disable-next-line
  }, [currentTab, setCurrentTab]);

  return (
    <div className="ad-grid__container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <ul className="ad-grid__tabs shadow-min">
            <li
              className="ad-grid__tab ad-grid__tab--active"
              onClick={() => {
                setCurrentTab("featured");
              }}
            >
              Featured
            </li>
            <li
              className="ad-grid__tab"
              onClick={() => {
                setCurrentTab("popular");
              }}
            >
              Most popular
            </li>
            <li
              className="ad-grid__tab"
              onClick={() => {
                setCurrentTab("new");
              }}
            >
              Brand new
            </li>
            <li
              className="ad-grid__tab"
              onClick={() => {
                setCurrentTab("expensive");
              }}
            >
              Most expensive
            </li>
          </ul>
          <div className="ad-grid__grid">
            {adGroup && adGroup.length > 0 ? (
              adGroup.map((ad) => <AdGridItem key={ad._id} ad={ad} />)
            ) : (
              <h4>No ads found</h4>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdGrid;
