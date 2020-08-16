import React, { useContext, useEffect } from "react";
import UserContext from "../../../context/user/userContext";
import "./SavedAds.scss";
import AdGrid from "../AdGrid";
import "./SavedAds.scss";

const SavedAds = () => {
  const userContext = useContext(UserContext);
  const { savedAds, removeAd, getSavedAds } = userContext;
  useEffect(() => {
    getSavedAds();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Remove ad from saved ads list
  const onRemoveAd = (id) => {
    console.log("REMOVING AD...", id);
    removeAd(id);
  };

  return (
    <div className="saved-cars__container ">
      <div className="saved-cars__heading shadow-min">
        <h1>Saved ads</h1>
      </div>
      {savedAds && savedAds.length > 0 ? (
        <AdGrid ads={savedAds} />
      ) : (
        <h4>There are no saved ads </h4>
      )}
    </div>
  );
};

export default SavedAds;
