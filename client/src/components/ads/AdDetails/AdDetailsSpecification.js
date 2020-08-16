import React from "react";
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

const AdDetailsSpecification = ({ ad }) => {
  const {
    fuelType,
    gearbox,
    mileage,
    bodyType,
    steeringWheel,
    damage,
    color,
    power,
    doors,
    dateManufactured,
  } = ad;
  return (
    <div className="car-details__section">
      <div className="car-details__technical-specs">
        <h2>Specification</h2>
        <div className="car-details__specs">
          <ul className="car-details__specs--left">
            <li className="car-details__spec-item">
              <div className="car-details__spec-item__atribute">
                <img src={fuelIcon} alt="" />
                <p className="car-details__spec-item--secondary">Fuel type</p>
              </div>
              <p className="car-details__spec-item--primary">{fuelType}</p>
            </li>
            <li className="car-details__spec-item">
              <div className="car-details__spec-item__atribute">
                <img src={gearboxIcon} alt="" />
                <p className="car-details__spec-item--secondary">Gearbox</p>
              </div>
              <p className="car-details__spec-item--primary">{gearbox}</p>
            </li>
            <li className="car-details__spec-item">
              <div className="car-details__spec-item__atribute">
                <img src={speedIcon} alt="" />
                <p className="car-details__spec-item--secondary">Mileage</p>
              </div>
              <p className="car-details__spec-item--primary">{mileage} miles</p>
            </li>
            <li className="car-details__spec-item">
              <div className="car-details__spec-item__atribute">
                <img src={bodytypeIcon} alt="" />
                <p className="car-details__spec-item--secondary">Body type</p>
              </div>
              <p className="car-details__spec-item--primary">{bodyType}</p>
            </li>
            <li className="car-details__spec-item">
              <div className="car-details__spec-item__atribute">
                <img src={wheelIcon} alt="" />
                <p className="car-details__spec-item--secondary">
                  Steering wheel
                </p>
              </div>
              <p className="car-details__spec-item--primary">
                {steeringWheel === "LHD" ? "Left" : "Right"}
              </p>
            </li>
          </ul>
          <div className="car-details__specs--right">
            <li className="car-details__spec-item">
              <div className="car-details__spec-item__atribute">
                <img src={damageIcon} alt="" />
                <p className="car-details__spec-item--secondary">Damage</p>
              </div>
              <p className="car-details__spec-item--primary">
                {damage === "noDamage" ? "No damage" : damage}
              </p>
            </li>
            <li className="car-details__spec-item">
              <div className="car-details__spec-item__atribute">
                <img src={colorIcon} alt="" />
                <p className="car-details__spec-item--secondary">Color</p>
              </div>
              <p className="car-details__spec-item--primary">{color}</p>
            </li>
            {power ? (
              <li className="car-details__spec-item">
                <div className="car-details__spec-item__atribute">
                  <img src={powerIcon} alt="" />
                  <p className="car-details__spec-item--secondary">Power</p>
                </div>
                <p className="car-details__spec-item--primary">{power} hp</p>
              </li>
            ) : null}

            <li className="car-details__spec-item">
              <div className="car-details__spec-item__atribute">
                <img src={doorIcon} alt="" />
                <p className="car-details__spec-item--secondary">Doors</p>
              </div>
              <p className="car-details__spec-item--primary">{doors}</p>
            </li>
            <li className="car-details__spec-item">
              <div className="car-details__spec-item__atribute">
                <img src={yearIcon} alt="" />
                <p className="car-details__spec-item--secondary">Year</p>
              </div>
              <p className="car-details__spec-item--primary">
                {dateManufactured}
              </p>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdDetailsSpecification;
