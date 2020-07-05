import React from "react";
import carMakes from "../../../assets/carMakes.json";

const FormMainInfo = ({ emptyFields, onChange, ad }) => {
  const {
    make,
    model,
    dateManufactured,
    bodyType,
    fuelType,
    gearbox,
    doors,
    damage,
    steeringWheel,
    color,
    price,
    engineCapacity,
    power,
    VINnumber,
    mileage,
    powerUnit,
    mileageUnit,
    regNo,
  } = ad;

  const yearManufactured = () => {
    const date = new Date();
    const thisYear = date.getFullYear();
    const years = [];
    for (let i = 1900; i <= thisYear; i++) {
      years.unshift(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return years;
  };

  return (
    <div className="ad-form__section">
      <h2 className="ad-form__section__heading">Main information</h2>
      <div className="ad-form__group">
        <div className="ad-form__field">
          <label htmlFor="make" className="ad-form__field__label">
            <span>
              Make
              <span className="ad-form__field__label--required">*</span>
            </span>
            <select
              name="make"
              onChange={onChange}
              value={make}
              className={
                emptyFields.indexOf("make") === -1
                  ? "ad-form__field__input"
                  : "ad-form__field__input ad-form__field__input--failed"
              }
            >
              <option value="">--</option>
              {carMakes.map((brand) => (
                <option key={brand.name} value={brand.name}>
                  {brand.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="ad-form__field">
          <label htmlFor="model" className="ad-form__field__label">
            <span>
              Model
              <span className="ad-form__field__label--required">*</span>
            </span>
            <select
              name="model"
              onChange={onChange}
              value={model}
              className={
                emptyFields.indexOf("model") === -1
                  ? "ad-form__field__input"
                  : "ad-form__field__input ad-form__field__input--failed"
              }
            >
              <option value="">--</option>
              {carMakes.map((brand) =>
                brand.name === make
                  ? brand.models.map((model) => (
                      <option key={model.name} value={model.name}>
                        {model.name}
                      </option>
                    ))
                  : null
              )}
            </select>
          </label>
        </div>
        <div className="ad-form__field">
          <label htmlFor="dateManufactured" className="ad-form__field__label">
            <span>
              Date of manufacture
              <span className="ad-form__field__label--required">*</span>
            </span>
            <select
              onChange={onChange}
              value={dateManufactured}
              name="dateManufactured"
              className={
                emptyFields.indexOf("dateManufactured") === -1
                  ? "ad-form__field__input"
                  : "ad-form__field__input ad-form__field__input--failed"
              }
            >
              <option value="">--</option>
              {yearManufactured()}
            </select>
          </label>
        </div>
        <div className="ad-form__field">
          <label htmlFor="regNo" className="ad-form__field__label">
            <span>
              Registration number
              <span className="ad-form__field__label--required">*</span>
            </span>
            <input
              type="text"
              onChange={onChange}
              value={regNo}
              name="regNo"
              className={
                emptyFields.indexOf("regNo") === -1
                  ? "ad-form__field__input"
                  : "ad-form__field__input ad-form__field__input--failed"
              }
            />
          </label>
        </div>
      </div>
      <div className="ad-form__group">
        <div className="ad-form__field">
          <label htmlFor="bodyType" className="ad-form__field__label">
            Body type
            <select
              onChange={onChange}
              value={bodyType}
              size="5"
              name="bodyType"
              className="ad-form__field__input ad-form__field__input--multi"
            >
              <option value="saloon">Saloon</option>
              <option value="estate">Estate</option>
              <option value="hatchback">Hatchback</option>
              <option value="mpv">MPV / minivan</option>
              <option value="suv">SUV / off-road</option>
              <option value="coupe">Coupe</option>
              <option value="commercial">Commercial</option>
              <option value="convertible">Convertible</option>
              <option value="limousine">Limousine</option>
              <option value="pickUp">Pick-up</option>
              <option value="passengerVan">Passenger van</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>
        <div className="ad-form__field">
          <label htmlFor="fuelType" className="ad-form__field__label">
            Fuel type
            <select
              onChange={onChange}
              value={fuelType}
              size="5"
              name="fuelType"
              className="ad-form__field__input ad-form__field__input--multi"
            >
              <option value="diesel">Diesel</option>
              <option value="petrol">Petrol</option>
              <option value="petrol/lpg">Petrol / LPG</option>
              <option value="petrol/electricity">Petrol / electricity</option>
              <option value="electricity">Electricity</option>
              <option value="diesel/electricity">Diesel / electricity</option>
              <option value="bioethanol">Bioethanol (E85)</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>
        <div className="ad-form__field">
          <label htmlFor="gearbox" className="ad-form__field__label">
            Gearbox
            <select
              onChange={onChange}
              value={gearbox}
              size="2"
              name="gearbox"
              className="ad-form__field__input ad-form__field__input--multi"
            >
              <option value="manual">Manual</option>
              <option value="auto">Auto</option>
            </select>
          </label>
        </div>
        <div className="ad-form__field">
          <label htmlFor="doors" className="ad-form__field__label">
            Number of doors
            <select
              name="doors"
              onChange={onChange}
              value={doors}
              size="3"
              className="ad-form__field__input ad-form__field__input--multi"
            >
              <option value="4/5">4/5</option>
              <option value="2/3">2/3</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>
      </div>
      <div className="ad-form__group">
        <div className="ad-form__field">
          <label htmlFor="damage" className="ad-form__field__label">
            Damage
            <select
              name="damage"
              onChange={onChange}
              value={damage}
              className="ad-form__field__input"
            >
              <option value="No damage">No damage</option>
              <option value="Crashed">Crashed</option>
              <option value="Fire damage">Fire / burn</option>
              <option value="Gearbox damage">Gearbox damage</option>
              <option value="Damage by hail">Damage by hail</option>
              <option value="Water damage">Water / flood</option>
              <option value="Engine damage">Engine damage</option>
              <option value="Other damage">Other major damage</option>
            </select>
          </label>
        </div>
        <div className="ad-form__field">
          <label htmlFor="steeringWheel" className="ad-form__field__label">
            Steering wheel
            <select
              name="steeringWheel"
              onChange={onChange}
              value={steeringWheel}
              className="ad-form__field__input"
            >
              <option value="RHD">Right hand drive (RHD)</option>
              <option value="LHD">Left hand drive (LHD)</option>
            </select>
          </label>
        </div>
        <div className="ad-form__field">
          <label htmlFor="color" className="ad-form__field__label">
            <span>
              Color
              <span className="ad-form__field__label--required">*</span>
            </span>
            <select
              name="color"
              onChange={onChange}
              value={color}
              className={
                emptyFields.indexOf("color") === -1
                  ? "ad-form__field__input"
                  : "ad-form__field__input ad-form__field__input--failed"
              }
            >
              <option value="">--</option>
              <option value="white">White</option>
              <option value="yellow">Yellow / gold</option>
              <option value="black">Black</option>
              <option value="varied">Varied</option>
              <option value="blue">Blue</option>
              <option value="orange">Orange</option>
              <option value="gray">Gray</option>
              <option value="red">Red / crimson</option>
              <option value="brown">Brown / beige</option>
              <option value="violet">Violet</option>
              <option value="green">Green / olive</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>
        <div className="ad-form__field">
          <label htmlFor="price" className="ad-form__field__label">
            <span>
              Price, £<span className="ad-form__field__label--required">*</span>
            </span>
            <input
              type="number"
              name="price"
              onChange={onChange}
              value={price}
              className={
                emptyFields.indexOf("price") === -1
                  ? "ad-form__field__input"
                  : "ad-form__field__input ad-form__field__input--failed"
              }
            />
          </label>
        </div>
      </div>
      <div className="ad-form__group">
        <div className="ad-form__field">
          <label htmlFor="engineCapacity" className="ad-form__field__label">
            Engine capacity, cc
            <input
              type="number"
              name="engineCapacity"
              onChange={onChange}
              placeholder="E.g. 1400"
              value={engineCapacity}
              className="ad-form__field__input"
            />
          </label>
        </div>
        <div className="ad-form__field">
          <label htmlFor="power" className="ad-form__field__label">
            Power
            <div className="ad-form__field__input--split">
              <input
                type="number"
                name="power"
                onChange={onChange}
                value={power}
                className="ad-form__field__input"
              />
              <select
                name="powerUnit"
                onChange={onChange}
                value={powerUnit}
                className="ad-form__field__input"
              >
                <option value="hp">HP</option>
                <option value="kw">kW</option>
              </select>
            </div>
          </label>
        </div>
        <div className="ad-form__field">
          <label htmlFor="VINnumber" className="ad-form__field__label">
            VIN number
            <input
              type="text"
              name="VINnumber"
              onChange={onChange}
              value={VINnumber}
              className="ad-form__field__input"
              placeholder="E.g. WAUZZZF49HA036784"
            />
          </label>
        </div>
        <div className="ad-form__field">
          <label htmlFor="mileage" className="ad-form__field__label">
            <span>
              Mileage
              <span className="ad-form__field__label--required">*</span>
            </span>
            <div className="ad-form__field__input--split">
              <input
                type="number"
                name="mileage"
                onChange={onChange}
                value={mileage}
                className={
                  emptyFields.indexOf("mileage") === -1
                    ? "ad-form__field__input"
                    : "ad-form__field__input ad-form__field__input--failed"
                }
              />
              <select
                name="mileageUnit"
                onChange={onChange}
                value={mileageUnit}
                className="ad-form__field__input"
              >
                <option value="mi">Mi</option>
                <option value="km">Km</option>
              </select>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FormMainInfo;
