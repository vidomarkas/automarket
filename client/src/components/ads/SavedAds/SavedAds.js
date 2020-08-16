import React, { useContext, useEffect } from "react";
import UserContext from "../../../context/user/userContext";
import "./SavedAds.scss";
import AdGrid from "../AdGrid/AdGrid";
import "./SavedAds.scss";

const SavedAds = () => {
  const userContext = useContext(UserContext);
  const { savedAds, getSavedAds } = userContext;
  useEffect(() => {
    getSavedAds();

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="saved-cars__container ">
      <div className="saved-cars__heading shadow-min">
        {savedAds && savedAds.length > 0 ? (
          <h1>Saved ads</h1>
        ) : (
          <h1>There are no saved ads</h1>
        )}
      </div>
      {savedAds && savedAds.length > 0 && <AdGrid ads={savedAds} />}
    </div>
  );
};

export default SavedAds;
