import React, { useEffect, useContext, useState } from "react";
import UserContext from "../../../context/user/userContext";
import AuthContext from "../../../context/auth/authContext";
import { FaCheck } from "react-icons/fa";

const AdDetailsSave = ({ ad, decrementSavedCount, incrementSavedCount }) => {
  const userContext = useContext(UserContext);
  const { saveAd, removeAd, savedAds, loading } = userContext;

  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  const [isSaved, setIsSaved] = useState(false);
  const [savedButtonText, setSavedButtonText] = useState("Saved");

  useEffect(() => {
    // Set initial  save state
    if (!loading && savedAds && savedAds.length > 0) {
      if (savedAds.some((adv) => adv._id === ad._id)) {
        setIsSaved(true);
      }
    }
  }, [ad, loading, savedAds]);
  const onSaveAd = () => {
    saveAd(ad._id);
    incrementSavedCount(ad._id);
    setIsSaved(true);
  };
  // Remove ad from saved ads list
  const onRemoveAd = () => {
    removeAd(ad._id);
    decrementSavedCount(ad._id);
    setIsSaved(false);
  };

  const onMouseOverSavedButton = () => {
    setSavedButtonText("Remove");
  };

  const onMouseLeaveSavedButton = () => {
    setSavedButtonText("Saved");
  };
  return (
    <>
      {isAuthenticated && !loading ? (
        <div className="car-details__save shadow-min">
          {isSaved ? (
            <button
              className="btn btn-block  btn-success"
              onClick={onRemoveAd}
              onMouseOver={onMouseOverSavedButton}
              onMouseLeave={onMouseLeaveSavedButton}
            >
              <FaCheck />
              {savedButtonText}
            </button>
          ) : (
            <button className="btn btn-block btn-secondary" onClick={onSaveAd}>
              Save
            </button>
          )}
        </div>
      ) : null}
    </>
  );
};

export default AdDetailsSave;
