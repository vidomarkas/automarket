import React, { useState, useContext, useEffect } from "react";
import carMakes from "../../assets/carMakes.json";
import AdContext from "../../context/ad/adContext";

const AdSearch = () => {
  const adContext = useContext(AdContext);
  const { searchAds } = adContext;
  const initialState = {
    make: "",
    model: "",
    yearFrom: "",
    yearTo: "",
    bodyType: "",
    fuelType: "",
    priceFrom: "",
    priceTo: "",
  };
  const [criteria, setCriteria] = useState(initialState);

  const {
    make,
    model,
    yearFrom,
    yearTo,
    bodyType,
    fuelType,
    priceFrom,
    priceTo,
  } = criteria;

  const onChange = (e) => {
    setCriteria({ ...criteria, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    searchAds(criteria);
  };

  const calcYearFrom = () => {
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
  const calcYearTo = () => {
    const date = new Date();
    const thisYear = date.getFullYear();
    const years = [];
    for (let i = yearFrom; i <= thisYear; i++) {
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
      <h1 className="text-primary">Search</h1>
      <form className="adForm" onSubmit={onSubmit}>
        <div className="adForm__section">
          <div className="adForm-group">
            <label htmlFor="make" className="adForm-group--item1">
              Make
              <select name="make" onChange={onChange} value={make}>
                <option>--</option>
                {carMakes.map((brand) => (
                  <option key={brand.name}>{brand.name}</option>
                ))}
              </select>
            </label>
            <label htmlFor="model" className="adForm-group--item1">
              Model
              <select name="model" onChange={onChange} value={model}>
                <option>--</option>
                {carMakes.map((brand) =>
                  brand.name === make
                    ? brand.models.map((model) => (
                        <option key={model.name}>{model.name}</option>
                      ))
                    : null
                )}
              </select>
            </label>
          </div>
          <div className="adForm-group">
            <label htmlFor="yearFrom" className="adForm-group--item1">
              Year from
              <select onChange={onChange} value={yearFrom} name="yearFrom">
                <option value="">--</option>
                {calcYearFrom()}
              </select>
            </label>
            <label htmlFor="yearTo" className="adForm-group--item1">
              Year to
              <select onChange={onChange} value={yearTo} name="yearTo">
                <option value="">--</option>
                {calcYearTo()}
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
          </div>
          <div className="adForm-group">
            <label htmlFor="price" className="adForm-group--item2">
              Price from, £
              <input
                type="number"
                name="priceFrom"
                onChange={onChange}
                value={priceFrom}
              />
            </label>
            <label htmlFor="price" className="adForm-group--item2">
              Price to, £
              <input
                type="number"
                name="priceTo"
                onChange={onChange}
                value={priceTo}
              />
            </label>
          </div>
        </div>

        <input
          type="submit"
          className="btn btn-block btn-primary"
          value="Search"
        />
      </form>
    </>
  );
};

export default AdSearch;
