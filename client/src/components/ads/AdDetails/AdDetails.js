import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAdDetails, clearAdDetails } from "../../../actions/adActions";
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
  adDetails,
  loading,
}) => {
  // Get ad details & scroll to the top of the window
  useEffect(() => {
    getAdDetails(match.params.id);
    window.scrollTo(0, 0);
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
  adDetails: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  adDetails: state.ad.adDetails,
  loading: state.ad.loading,
});

export default connect(mapStateToProps, {
  clearAdDetails,
  getAdDetails,
})(AdDetails);
