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
    dateAdded: "",
    description: "",
    phoneNumber: "",
    featured: false,
    sold: false,
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
  } = ad;
  return (
    <form>
      <h2 className="text-primary">Main information</h2>
      <label htmlFor="make">
        Make
        <select>
          <option selected value="">
            --
          </option>
          {carMakes.map((brand) => (
            <option>{brand.name}</option>
          ))}
        </select>
      </label>
    </form>
  );
};

export default AdForm;
