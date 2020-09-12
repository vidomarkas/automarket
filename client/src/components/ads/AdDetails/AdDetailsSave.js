import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { saveAd, removeAd } from "../../../actions/userActions";
import { FaCheck } from "react-icons/fa";

const AdDetailsSave = (
  { id, saveAd, removeAd, loading, savedAdsList },
  isAuthenticated
) => {
  const [isSaved, setIsSaved] = useState(false);
  const [savedButtonText, setSavedButtonText] = useState("Saved");

  useEffect(() => {
    console.log("savedAdsList :>> ", savedAdsList);
    console.log("id :>> ", id);
  }, [savedAdsList, id]);

  // useEffect(() => {
  //   // Set initial  save state
  //   if (!loading && savedAdsList.length > 0) {
  //     console.log("triggered");
  //     if (savedAdsList.some((adv) => adv === id)) {
  //       setIsSaved(true);
  //     }
  //   }
  // }, [loading, savedAdsList]);

  const onSaveAd = () => {
    console.log("id", id);
    saveAd(id);
    setIsSaved(true);
  };
  // Remove ad from saved ads list
  const onRemoveAd = () => {
    removeAd(id);
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

AdDetailsSave.propTypes = {};

const mapStateToProps = (state) => ({
  id: state.ad.adDetails._id,
  savedAdsList: state.user.savedAdsList,
  loading: state.user.loading,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  saveAd,
  removeAd,
})(AdDetailsSave);
