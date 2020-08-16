import React, { useContext, useEffect } from "react";
import AdContext from "../../../context/ad/adContext";
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

const AdDetails = (props) => {
  const adContext = useContext(AdContext);
  const {
    adDetails,
    clearAdDetails,
    getAdDetails,
    loading,
    countSeen,
    incrementSavedCount,
    decrementSavedCount,
  } = adContext;

  useEffect(() => {
    countSeen(props.match.params.id);
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getAdDetails(props.match.params.id);
    return () => {
      clearAdDetails();
    };
    // eslint-disable-next-line
  }, [props.match.params.id]);

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
                <AdDetailsSave
                  ad={adDetails}
                  incrementSavedCount={incrementSavedCount}
                  decrementSavedCount={decrementSavedCount}
                />
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
            <button className="btn btn-primary" onClick={props.history.goBack}>
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

export default AdDetails;
