import React, { useState } from "react";
import carMakes from "../../../assets/carMakes.json";
import { connect } from "react-redux";
import { searchAds, clearFilter } from "../../../actions/adActions";
import { clearCurrentPage } from "../../../actions/generalActions";
import "./AdSearch.scss";
import PropTypes from "prop-types";

const AdSearch = ({
  searchAds,
  clearFilter,
  clearCurrentPage,
  ad: { foundAds },
}) => {
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
    clearCurrentPage();
    searchAds({ criteria });
  };

  const onResetFilter = () => {
    setCriteria(initialState);
    clearCurrentPage();
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

    for (let i = yearFrom < 1900 ? 1900 : yearFrom; i <= thisYear; i++) {
      years.unshift(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return years;
  };
  return (
    <div className="search shadow-md">
      <h2 className="search__heading">Find your perfect car</h2>
      <form className="search__form" onSubmit={onSubmit}>
        <div className="search__section">
          <div className="search__field">
            <label htmlFor="make" className="search__field__label">
              Make
              <select
                className=" search__input shadow-aa"
                name="make"
                onChange={onChangeExact}
                value={make}
              >
                <option value="">--</option>
                {carMakes.map((brand) => (
                  <option key={brand.name}>{brand.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="search__field">
            <label htmlFor="model" className="search__field__label">
              Model
              <select
                name="model"
                onChange={onChangeExact}
                value={model}
                className=" search__input shadow-aa"
              >
                <option value="">--</option>
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
        </div>

        <div className="search__section">
          <div className=" search__field--half">
            <label htmlFor="yearFrom" className="search__field__label">
              Year from
              <select
                onChange={onChangeRange}
                value={yearFrom}
                name="yearFrom"
                className=" search__input shadow-aa"
              >
                <option value="">--</option>
                {calcYearFrom()}
              </select>
            </label>
            <label htmlFor="yearTo" className="search__field__label">
              Year to
              <select
                onChange={onChangeRange}
                value={yearTo}
                name="yearTo"
                className=" search__input shadow-aa"
              >
                <option value="">--</option>
                {calcYearTo()}
              </select>
            </label>
          </div>

          <div className=" search__field--half">
            <label htmlFor="priceFrom" className="search__field__label">
              Min price
              <input
                type="number"
                name="priceFrom"
                onChange={onChangeRange}
                value={priceFrom}
                min="0"
                className="search__field__number search__input shadow-aa"
              />
            </label>
            <label htmlFor="priceTo" className="search__field__label">
              Max price
              <input
                type="number"
                name="priceTo"
                onChange={onChangeRange}
                value={priceTo}
                min="0"
                className="search__field__number search__input shadow-aa"
              />
            </label>
          </div>
        </div>
        <div className="search__section">
          <div className="search__field">
            <label htmlFor="bodyType" className="search__field__label">
              Body type
              <select
                onChange={onChangeExact}
                value={bodyType}
                name="bodyType"
                className=" search__input shadow-aa"
              >
                <option value="">--</option>
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
          <div className="search__field">
            <label htmlFor="fuelType" className="search__field__label">
              Fuel type
              <select
                onChange={onChangeExact}
                value={fuelType}
                name="fuelType"
                className=" search__input shadow-aa"
              >
                <option value="">--</option>
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
        </div>
        <div className="search__section">
          <input
            type="submit"
            className="btn btn-primary search__btn"
            value="Search"
          />
          {foundAds && (
            <input
              type="button"
              className="btn btn-secondary search__btn"
              onClick={onResetFilter}
              value="Reset filter"
            />
          )}
        </div>
      </form>
    </div>
  );
};

AdSearch.propTypes = {
  searchAds: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  clearCurrentPage: PropTypes.func.isRequired,
  ad: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  ad: state.ad,
});

export default connect(mapStateToProps, {
  searchAds,
  clearFilter,
  clearCurrentPage,
})(AdSearch);
