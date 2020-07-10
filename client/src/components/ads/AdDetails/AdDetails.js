import React, { useContext, useEffect } from "react";
import AdContext from "../../../context/ad/adContext";
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
import AdDetailsMap from "./AdDetailsMap";

const AdDetails = (props) => {
  const adContext = useContext(AdContext);
  const {
    adDetails,
    clearAdDetails,
    getAdDetails,
    loading,
    countSeen,
  } = adContext;

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
      {!loading && adDetails && (
        <>
          <div className="car-details__container ">
            <div className="car-details__info shadow-min">
              Seen by {adDetails.seenCount}
              Saved by {adDetails.savedCount}
            </div>
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
                  <h1>{adDetails.make}</h1>
                  <h2>{adDetails.model}</h2>
                  <h3>{adDetails.dateManufactured}</h3>

                  <h1>£{adDetails.price}</h1>

                  {/* todo conditional description */}
                  <h2> Description</h2>
                  <p>{adDetails.description}</p>
                </div>
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
                  <div className="car-details__contact__action-buttons">
                    <a
                      className="btn btn-primary btn-block"
                      value={adDetails.phoneNumber}
                      href={"tel:" + adDetails.phoneNumber}
                    >
                      Call seller
                    </a>
                    <button
                      className="btn-block btn btn-secondary"
                      value={adDetails.user}
                    >
                      Message seller
                    </button>
                  </div>
                </div>
                <AdDetailsMap coords={adDetails.coords} />
              </div>
            </div>
          </div>
          <div className="car-details__back-container">
            <button className="btn btn-primary" onClick={props.history.goBack}>
              Back
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default AdDetails;
