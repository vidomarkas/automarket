import React, { useEffect } from "react";
import AdGrid from "../AdGrid/AdGrid";
import "./SavedAds.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSavedAdsDetails } from "../../../actions/userActions";

const SavedAds = ({ getSavedAdsDetails, savedAdsDetails }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    getSavedAdsDetails();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="saved-cars__container ">
      {savedAdsDetails && savedAdsDetails.length > 0 ? (
        <>
          <div className="saved-cars__heading shadow-min">
            <h1>Saved ads</h1>
          </div>
          <AdGrid ads={savedAdsDetails} />
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
  getSavedAdsDetails: PropTypes.func.isRequired,
  savedAdsDetails: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  savedAdsDetails: state.user.savedAdsDetails,
});

export default connect(mapStateToProps, { getSavedAdsDetails })(SavedAds);
