import React, { useEffect } from "react";
import AdGrid from "../AdGrid/AdGrid";
import "./SavedAds.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSavedAds } from "../../../actions/userActions";

const SavedAds = ({ getSavedAds, savedAds }) => {
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

SavedAds.propTypes = {
  getSavedAds: PropTypes.func.isRequired,
  savedAds: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  savedAds: state.user.savedAds,
});

export default connect(mapStateToProps, { getSavedAds })(SavedAds);
