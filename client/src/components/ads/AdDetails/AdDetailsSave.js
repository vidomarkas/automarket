import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  incrementSavedCount,
  decrementSavedCount,
} from "../../../actions/adActions";
import { saveAd, removeAd } from "../../../actions/userActions";
import { FaCheck } from "react-icons/fa";

const AdDetailsSave = (
  {
    ad,
    decrementSavedCount,
    incrementSavedCount,
    saveAd,
    removeAd,
    user: { savedAds, loading },
  },
  isAuthenticated
) => {
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

AdDetailsSave.propTypes = {
  incrementSavedCount: PropTypes.func.isRequired,
  decrementSavedCount: PropTypes.func.isRequired,
  ad: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  ad: state.ad,
  user: state.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  incrementSavedCount,
  decrementSavedCount,
  saveAd,
  removeAd,
})(AdDetailsSave);
