import React, { useState } from "react";
import carMakes from "../../assets/carMakes.json";

const AdForm = () => {
  const [ad, setAd] = useState({
    make: "",
    model: "",
    dateManufactured: "",
    bodyType: "",
    fuelType: "",
    gearbox: "",
    doors: "",
    damage: "",
    steeringWheel: "",
    color: "",
    price: "",
    engineCapacity: "",
    power: "",
    VINnumber: "",
    mileage: "",
    mileageUnit: "",
    dateAdded: "",
    description: "",
    phoneNumber: "",
    featured: false,
    sold: false,
    powerUnit: "",
  });

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
  } = ad;

  const onChange = (e) => {
    setAd({ ...ad, [e.target.name]: e.target.value });
    console.log(ad);
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
    <form>
      <h2 className="text-primary">Main information</h2>
      <label htmlFor="make">
        Make
        <select name="make" onChange={onChange} defaultValue="">
          <option value="">--</option>
          {carMakes.map((brand) => (
            <option key={brand.name} value={brand.name}>
              {brand.name}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="model">
        Model
        <select name="model" onChange={onChange} defaultValue="">
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
      <label htmlFor="dateManufactured">
        Date of manufacture
        <select onChange={onChange} defaultValue="" name="dateManufactured">
          <option value="">--</option>
          {yearManufactured()}
        </select>
      </label>

      <label htmlFor="bodyType">
        Body type
        <select onChange={onChange} defaultValue="" size="5" name="bodyType">
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
      <label htmlFor="fuelType">
        Fuel type
        <select onChange={onChange} defaultValue="" size="5" name="fuelType">
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
      <label htmlFor="gearbox">
        Gearbox
        <select onChange={onChange} defaultValue="" size="2" name="gearbox">
          <option value="manual">Manual</option>
          <option value="auto">Auto</option>
        </select>
      </label>
      <label htmlFor="gearbox">
        Number of doors
        <select name="doors" onChange={onChange} defaultValue="" size="3">
          <option value="4/5">4/5</option>
          <option value="2/3">2/3</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label htmlFor="damage">
        Damage
        <select name="damage" onChange={onChange} defaultValue="">
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
      <label htmlFor="steeringWheel">
        Steering wheel
        <select name="steeringWheel" onChange={onChange} defaultValue="">
          <option value="LHD">Left hand drive (LHD)</option>
          <option value="RHD">Right hand drive (RHD)</option>
        </select>
      </label>
      <label htmlFor="color">
        Steering wheel
        <select name="color" onChange={onChange} defaultValue="">
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
      <label htmlFor="price">
        Price, £
        <input type="number" name="price" onChange={onChange} value="" />
      </label>
      <label htmlFor="engineCapacity">
        Engine capacity, cc
        <input
          type="number"
          name="engineCapacity"
          onChange={onChange}
          placeholder="E.g. 1400"
          value=""
        />
      </label>
      <label htmlFor="power">
        Power
        <input type="number" name="power" onChange={onChange} value="" />
        <select name="powerUnit" onChange={onChange} value="kw">
          <option value="kw">kW</option>
          <option value="hp">HP</option>
        </select>
      </label>
      <label htmlFor="VINnumber">
        VIN number
        <input type="text" name="VINnumber" onChange={onChange} value="" />
      </label>
      <label htmlFor="mileage">
        Mileage
        <input type="number" name="mileage" onChange={onChange} value="" />
        <select name="mileageUnit" onChange={onChange} value="mi">
          <option value="mi">Mi</option>
          <option value="km">Km</option>
        </select>
      </label>
    </form>
  );
};

export default AdForm;
