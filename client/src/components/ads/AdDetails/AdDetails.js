import React, { useContext, useEffect } from "react";
import ReactTimeAgo from "react-time-ago";
import AdContext from "../../../context/ad/adContext";
import AdDetailsMap from "./AdDetailsMap";
import Spinner from "../../layout/Spinner";
import "./AdDetails.scss";
import fuelIcon from "../../../assets/img/fuel.svg";
import gearboxIcon from "../../../assets/img/gearbox.svg";
import bodytypeIcon from "../../../assets/img/coupe.svg";
import speedIcon from "../../../assets/img/speed.svg";
import damageIcon from "../../../assets/img/smoke.svg";
import wheelIcon from "../../../assets/img/steering-wheel.svg";
import powerIcon from "../../../assets/img/turbo.svg";
import colorIcon from "../../../assets/img/paint.svg";
import doorIcon from "../../../assets/img/car.svg";
import yearIcon from "../../../assets/img/calendar.svg";
import placeholderCar from "../../../assets/img/placeholder-car.png";

const AdDetails = (props) => {
  const adContext = useContext(AdContext);
  const {
    adDetails,
    clearAdDetails,
    getAdDetails,
    loading,
    countSeen,
  } = adContext;

  const displayPrice = (price) => {
    const priceFormatter = new Intl.NumberFormat("en-UK", {
      style: "currency",
      currency: "GBP",
    });

    return priceFormatter.format(price).slice(0, -3);
  };

  useEffect(() => {
    countSeen(props.match.params.id);
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
                <div
                  className="car-details__main-image"
                  style={{
                    backgroundImage: adDetails.imageURL
                      ? `url(${adDetails.imageURL})`
                      : `url(${placeholderCar})`,
                  }}
                >
                  <div className="car-details__main-image--overlay"></div>
                  {adDetails.sold && (
                    <div className="car-details__main-image--sold">Sold</div>
                  )}
                </div>
                <div className="car-details__section">
                  <div className="car-details__section--split">
                    <div>
                      <h1 className="car-details__heading">
                        {adDetails.make} {adDetails.model}
                      </h1>
                      <div className="car-details__subheading">
                        {adDetails.dateManufactured} &bull; {adDetails.mileage}
                        <span style={{ textTransform: "lowercase" }}>
                          mi
                        </span>{" "}
                        &bull; {adDetails.fuelType} &bull; {adDetails.bodyType}
                      </div>
                    </div>
                    <div className="car-details__price">
                      {displayPrice(adDetails.price)}
                    </div>
                  </div>
                </div>
                {adDetails.description ? (
                  <div className="car-details__section">
                    <div className="car-details__description">
                      <h2> Description</h2>
                      <p>{adDetails.description}</p>
                    </div>
                  </div>
                ) : null}

                <div className="car-details__section">
                  <div className="car-details__technical-specs">
                    <h2>Technical Specs</h2>
                    <div className="car-details__specs">
                      <ul className="car-details__specs--left">
                        <li className="car-details__spec-item">
                          <div className="car-details__spec-item__atribute">
                            <img src={fuelIcon} alt="" />
                            <p className="car-details__spec-item--secondary">
                              Fuel type
                            </p>
                          </div>
                          <p className="car-details__spec-item--primary">
                            {adDetails.fuelType}
                          </p>
                        </li>
                        <li className="car-details__spec-item">
                          <div className="car-details__spec-item__atribute">
                            <img src={gearboxIcon} alt="" />
                            <p className="car-details__spec-item--secondary">
                              Gearbox
                            </p>
                          </div>
                          <p className="car-details__spec-item--primary">
                            {adDetails.gearbox}
                          </p>
                        </li>
                        <li className="car-details__spec-item">
                          <div className="car-details__spec-item__atribute">
                            <img src={speedIcon} alt="" />
                            <p className="car-details__spec-item--secondary">
                              Mileage
                            </p>
                          </div>
                          <p className="car-details__spec-item--primary">
                            {adDetails.mileage} miles
                          </p>
                        </li>
                        <li className="car-details__spec-item">
                          <div className="car-details__spec-item__atribute">
                            <img src={bodytypeIcon} alt="" />
                            <p className="car-details__spec-item--secondary">
                              Body type
                            </p>
                          </div>
                          <p className="car-details__spec-item--primary">
                            {adDetails.bodyType}
                          </p>
                        </li>
                        <li className="car-details__spec-item">
                          <div className="car-details__spec-item__atribute">
                            <img src={wheelIcon} alt="" />
                            <p className="car-details__spec-item--secondary">
                              Steering wheel
                            </p>
                          </div>
                          <p className="car-details__spec-item--primary">
                            {adDetails.steeringWheel === "LHD"
                              ? "Left"
                              : "Right"}
                          </p>
                        </li>
                      </ul>
                      <div className="car-details__specs--right">
                        <li className="car-details__spec-item">
                          <div className="car-details__spec-item__atribute">
                            <img src={damageIcon} alt="" />
                            <p className="car-details__spec-item--secondary">
                              Damage
                            </p>
                          </div>
                          <p className="car-details__spec-item--primary">
                            {adDetails.damage}
                          </p>
                        </li>
                        <li className="car-details__spec-item">
                          <div className="car-details__spec-item__atribute">
                            <img src={colorIcon} alt="" />
                            <p className="car-details__spec-item--secondary">
                              Color
                            </p>
                          </div>
                          <p className="car-details__spec-item--primary">
                            {adDetails.color}
                          </p>
                        </li>
                        <li className="car-details__spec-item">
                          <div className="car-details__spec-item__atribute">
                            <img src={powerIcon} alt="" />
                            <p className="car-details__spec-item--secondary">
                              Power
                            </p>
                          </div>
                          <p className="car-details__spec-item--primary">
                            {adDetails.power} hp
                          </p>
                        </li>
                        <li className="car-details__spec-item">
                          <div className="car-details__spec-item__atribute">
                            <img src={doorIcon} alt="" />
                            <p className="car-details__spec-item--secondary">
                              Doors
                            </p>
                          </div>
                          <p className="car-details__spec-item--primary">
                            {adDetails.doors}
                          </p>
                        </li>
                        <li className="car-details__spec-item">
                          <div className="car-details__spec-item__atribute">
                            <img src={yearIcon} alt="" />
                            <p className="car-details__spec-item--secondary">
                              Year
                            </p>
                          </div>
                          <p className="car-details__spec-item--primary">
                            {adDetails.dateManufactured}
                          </p>
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="car-details__aside">
                <div className="car-details__contact shadow-min">
                  <h2>Contact seller</h2>
                  <p>
                    {adDetails.coords
                      ? "Location: " + adDetails.coords.locationName
                      : null}
                  </p>
                  <p></p>
                  <div className="car-details__contact__action-buttons">
                    <a
                      className="btn btn-primary btn-block"
                      value={adDetails.phoneNumber}
                      href={"tel:" + adDetails.phoneNumber}
                    >
                      Call {adDetails.phoneNumber}
                    </a>
                  </div>
                </div>
                <AdDetailsMap coords={adDetails.coords} />
                <div className="car-details__info shadow-min">
                  <h2>Statistics</h2>
                  <p>{adDetails.seenCount} views</p>

                  <p>
                    Ad created:{" "}
                    <ReactTimeAgo date={Date.parse(adDetails.dateAdded)} />{" "}
                  </p>
                  <p>
                    Last updated:{" "}
                    <ReactTimeAgo date={Date.parse(adDetails.dateUpdated)} />
                  </p>
                </div>
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
