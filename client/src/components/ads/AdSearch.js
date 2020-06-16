import React, { useState, useContext } from "react";
import carMakes from "../../assets/carMakes.json";
import AdContext from "../../context/ad/adContext";
import "./AdSearch.scss";

const AdSearch = () => {
  const adContext = useContext(AdContext);
  const { searchAds, clearFilter, foundAds } = adContext;
  const initialState = {
    exactFields: { make: "", model: "", bodyType: "", fuelType: "" },
    rangeFields: { yearFrom: "", yearTo: "", priceFrom: "", priceTo: "" },
  };
  const [criteria, setCriteria] = useState(initialState);

  const { make, model, bodyType, fuelType } = criteria.exactFields;
  const { yearFrom, yearTo, priceFrom, priceTo } = criteria.rangeFields;

  // onchange exact match fields
  const onChangeExact = (e) => {
    setCriteria({
      ...criteria,
      exactFields: { ...criteria.exactFields, [e.target.name]: e.target.value },
    });
  };

  //onchange range fields
  const onChangeRange = (e) => {
    setCriteria({
      ...criteria,
      rangeFields: { ...criteria.rangeFields, [e.target.name]: e.target.value },
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    searchAds({ criteria });
  };

  const onResetFilter = () => {
    setCriteria(initialState);
    clearFilter();
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
    <div className="search">
      <h2 className="text-primary">Search</h2>
      <form className="adForm" onSubmit={onSubmit}>
        <div className="adForm__section">
          <div className="adForm-group">
            <label htmlFor="make" className="adForm-group--item1">
              Make
              <select name="make" onChange={onChangeExact} value={make}>
                <option>--</option>
                {carMakes.map((brand) => (
                  <option key={brand.name}>{brand.name}</option>
                ))}
              </select>
            </label>
            <label htmlFor="model" className="adForm-group--item1">
              Model
              <select name="model" onChange={onChangeExact} value={model}>
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
              <select onChange={onChangeRange} value={yearFrom} name="yearFrom">
                <option value="">--</option>
                {calcYearFrom()}
              </select>
            </label>
            <label htmlFor="yearTo" className="adForm-group--item1">
              Year to
              <select onChange={onChangeRange} value={yearTo} name="yearTo">
                <option value="">--</option>
                {calcYearTo()}
              </select>
            </label>
          </div>
          <div className="adForm-group">
            <label htmlFor="bodyType" className="adForm-group--item2">
              Body type
              <select
                onChange={onChangeExact}
                value={bodyType}
                size="5"
                name="bodyType"
              >
                <option>--</option>
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
                onChange={onChangeExact}
                value={fuelType}
                size="5"
                name="fuelType"
              >
                <option>--</option>
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
            <label htmlFor="priceFrom" className="adForm-group--item2">
              Price from, £
              <input
                type="number"
                name="priceFrom"
                onChange={onChangeRange}
                value={priceFrom}
                min="0"
              />
            </label>
            <label htmlFor="priceTo" className="adForm-group--item2">
              Price to, £
              <input
                type="number"
                name="priceTo"
                onChange={onChangeRange}
                value={priceTo}
                min="0"
                className="input-field"
              />
            </label>
          </div>
        </div>

        <input
          type="submit"
          className="btn btn-block btn-primary"
          value="Search"
        />
        {foundAds && (
          <input
            type="button"
            className="btn btn-block btn-secondary "
            onClick={onResetFilter}
            value="Reset filter"
          />
        )}
      </form>
    </div>
  );
};

export default AdSearch;
