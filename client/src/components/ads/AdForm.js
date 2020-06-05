import React, { useState, useContext, useEffect } from "react";
import carMakes from "../../assets/carMakes.json";
import AdContext from "../../context/ad/adContext";
import "./AdForm.scss";

const AdForm = () => {
  const adContext = useContext(AdContext);
  const { postAd, current, updateAd } = adContext;

  const initialState = {
    make: "",
    model: "",
    dateManufactured: "",
    bodyType: "saloon",
    fuelType: "diesel",
    gearbox: "manual",
    doors: "4/5",
    damage: "noDamage",
    steeringWheel: "RHD",
    color: "",
    price: "",
    engineCapacity: "",
    power: "",
    powerUnit: "hp",
    VINnumber: "",
    mileage: "",
    mileageUnit: "",
    dateAdded: "",
    description: "",
    phoneNumber: "",
    featured: false,
    sold: false,
    postcode: "",
  };

  useEffect(() => {
    if (current !== null) {
      setAd(current);
    } else {
      setAd(initialState);
    }
  }, [adContext, current]);

  const [ad, setAd] = useState(initialState);

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
    dateAdded,
    featured,
    sold,
    description,
    phoneNumber,
    powerUnit,
    mileageUnit,
    postcode,
  } = ad;

  const onChange = (e) => {
    setAd({ ...ad, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (current === null) {
      postAd(ad);
    } else {
      updateAd(ad);
    }
    setAd(initialState);
  };

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
    <>
      <h1 className="text-primary">
        {current ? "Advert editing" : "New advert"}
      </h1>
      <form className="adForm" onSubmit={onSubmit}>
        <div className="adForm__section">
          <h2 className="adForm__heading">Main information</h2>
          <div className="adForm-group">
            <label htmlFor="make" className="adForm-group--item1">
              Make
              <select name="make" onChange={onChange} value={make}>
                <option value="">--</option>
                {carMakes.map((brand) => (
                  <option key={brand.name} value={brand.name}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="model" className="adForm-group--item1">
              Model
              <select name="model" onChange={onChange} value={model}>
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
            <label htmlFor="dateManufactured" className="adForm-group--item1">
              Date of manufacture
              <select
                onChange={onChange}
                value={dateManufactured}
                name="dateManufactured"
              >
                <option value="">--</option>
                {yearManufactured()}
              </select>
            </label>
          </div>
          <div className="adForm-group">
            <label htmlFor="bodyType" className="adForm-group--item2">
              Body type
              <select
                onChange={onChange}
                value={bodyType}
                size="5"
                name="bodyType"
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
            <label htmlFor="fuelType" className="adForm-group--item2">
              Fuel type
              <select
                onChange={onChange}
                value={fuelType}
                size="5"
                name="fuelType"
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
            <label htmlFor="gearbox" className="adForm-group--item2">
              Gearbox
              <select
                onChange={onChange}
                value={gearbox}
                size="2"
                name="gearbox"
              >
                <option value="manual">Manual</option>
                <option value="auto">Auto</option>
              </select>
            </label>
            <label htmlFor="doors" className="adForm-group--item2">
              Number of doors
              <select name="doors" onChange={onChange} value={doors} size="3">
                <option value="4/5">4/5</option>
                <option value="2/3">2/3</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>
          <div className="adForm-group">
            <label htmlFor="damage" className="adForm-group--item2">
              Damage
              <select name="damage" onChange={onChange} value={damage}>
                <option value="noDamage">No damage</option>
                <option value="crashedDamage">Crashed</option>
                <option value="fireDamage">Fire / burn</option>
                <option value="gearboxDamage">Gearbox damage</option>
                <option value="hailDamage">Damage by hail</option>
                <option value="waterDamage">Water / flood</option>
                <option value="hailDamage">Engine damage</option>
                <option value="otherDamage">Other major damage</option>
              </select>
            </label>
            <label htmlFor="steeringWheel" className="adForm-group--item2">
              Steering wheel
              <select
                name="steeringWheel"
                onChange={onChange}
                value={steeringWheel}
              >
                <option value="RHD">Right hand drive (RHD)</option>
                <option value="LHD">Left hand drive (LHD)</option>
              </select>
            </label>
            <label htmlFor="color" className="adForm-group--item2">
              Color
              <select name="color" onChange={onChange} value={color}>
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
            <label htmlFor="price" className="adForm-group--item2">
              Price, £
              <input
                type="number"
                name="price"
                onChange={onChange}
                value={price}
              />
            </label>
          </div>
          <div className="adForm-group">
            <label htmlFor="engineCapacity" className="adForm-group--item2">
              Engine capacity, cc
              <input
                type="number"
                name="engineCapacity"
                onChange={onChange}
                placeholder="E.g. 1400"
                value={engineCapacity}
              />
            </label>
            <label htmlFor="power" className="adForm-group--item2">
              Power
              <input
                type="number"
                name="power"
                onChange={onChange}
                value={power}
              />
              <select name="powerUnit" onChange={onChange} value={powerUnit}>
                <option value="hp">HP</option>
                <option value="kw">kW</option>
              </select>
            </label>
            <label htmlFor="VINnumber" className="adForm-group--item2">
              VIN number
              <input
                type="text"
                name="VINnumber"
                onChange={onChange}
                value={VINnumber}
              />
            </label>
            <label htmlFor="mileage" className="adForm-group--item2">
              Mileage
              <input
                type="number"
                name="mileage"
                onChange={onChange}
                value={mileage}
              />
              <select
                name="mileageUnit"
                onChange={onChange}
                value={mileageUnit}
              >
                <option value="mi">Mi</option>
                <option value="km">Km</option>
              </select>
            </label>
          </div>
        </div>
        <div className="adForm__section">
          <h2 className="adForm__heading">Description</h2>

          <textarea
            name="description"
            cols="20"
            rows="10"
            onChange={onChange}
          ></textarea>
          <div className="description-comments">
            <p>Detailed comment can attract more attention to your ad.</p>

            <p>
              The more informative your ad is, the less questions you will be
              asked.
            </p>
            <p>
              Adverts with interesting comments can be featured on automarket
              facebook page.
            </p>
          </div>
        </div>
        <div className="adForm__section">
          <h2 className="adForm__heading">Contact information</h2>
          <label htmlFor="phoneNumber">
            Phone number
            <input
              type="number"
              name="phoneNumber"
              value={phoneNumber}
              onChange={onChange}
            />
          </label>
          <label htmlFor="postcode">
            Postcode
            <input
              type="text"
              name="postcode"
              value={postcode}
              onChange={onChange}
            />
          </label>
        </div>

        <input
          type="submit"
          className="btn btn-block btn-primary"
          value={current ? "Update" : "Publish"}
        />
      </form>
    </>
  );
};

export default AdForm;
