import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getAdDetails,
  clearAdDetails,
  countSeen,
  clearCurrent,
} from "../../../actions/adActions";
import AdDetailsMap from "./AdDetailsMap";
import AdDetailsContact from "./AdDetailsContact";
import AdDetailsOverview from "./AdDetailsOverview";
import AdDetailsDescription from "./AdDetailsDescription";
import AdDetailsImages from "./AdDetailsImages";
import AdDetailsStats from "./AdDetailsStats";
import AdDetailsSave from "./AdDetailsSave";
import Spinner from "../../layout/Spinner";
import AdDetailsSpecification from "./AdDetailsSpecification";
import "./AdDetails.scss";

const AdDetails = ({
  match,
  history,
  getAdDetails,
  clearAdDetails,
  countSeen,
  adDetails,
  loading,
}) => {
  useEffect(() => {
    console.log("____________________");
    console.log("loading", loading);
    console.log("adDetails", adDetails);
    console.log("____________________");
  }, [loading, adDetails]);

  // Increase the views counter & scroll to the top of the window
  useEffect(() => {
    if (adDetails) {
      countSeen(adDetails._id);
    }
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!adDetails) {
      getAdDetails(match.params.id);
    }
    return () => {
      clearAdDetails();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {!loading && adDetails ? (
        <>
          <div className="car-details__container ">
            <div className="car-details__content ">
              <div className="car-details__main shadow-min">
                <AdDetailsImages
                  imageURL={adDetails.imageURL}
                  sold={adDetails.sold}
                />
                <AdDetailsOverview ad={adDetails} />
                <AdDetailsSpecification ad={adDetails} />
                <AdDetailsDescription description={adDetails.description} />
              </div>
              <div className="car-details__aside">
                <AdDetailsSave ad={adDetails} />
                <AdDetailsContact
                  coords={adDetails.coords}
                  phoneNumber={adDetails.phoneNumber}
                />
                <AdDetailsMap coords={adDetails.coords} />
                <AdDetailsStats ad={adDetails} />
              </div>
            </div>
          </div>
          <div className="car-details__back-button-container">
            <button className="btn btn-primary" onClick={history.goBack}>
              Back
            </button>
          </div>
        </>
      ) : (
        <div className="car-details__container ">
          <Spinner />
        </div>
      )}
    </>
  );
};

AdDetails.propTypes = {
  clearAdDetails: PropTypes.func.isRequired,
  getAdDetails: PropTypes.func.isRequired,
  countSeen: PropTypes.func.isRequired,
  adDetails: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  state,
  adDetails: state.ad.adDetails,
  loading: state.ad.loading,
  current: state.ad.current,
});

export default connect(mapStateToProps, {
  clearAdDetails,
  getAdDetails,
  countSeen,
  clearCurrent,
})(AdDetails);
