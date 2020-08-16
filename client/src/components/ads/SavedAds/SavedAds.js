import React, { useContext, useEffect } from "react";
import UserContext from "../../../context/user/userContext";
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
      {savedAds && savedAds.length > 0 ? (
        <>
          <div className="saved-cars__heading shadow-min">
            <h1>Saved ads</h1>
          </div>
          <AdGrid ads={savedAds} />
        </>
      ) : (
        <div className="saved-cars__heading shadow-min">
          <h1>There are no saved ads</h1>
        </div>
      )}
    </div>
  );
};

export default SavedAds;
