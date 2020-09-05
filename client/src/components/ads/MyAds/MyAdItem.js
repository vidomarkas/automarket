import React from "react";
import { Link } from "react-router-dom";
import placeholderCar from "../../../assets/img/placeholder-car.png";
import displayPrice from "../../../utils/displayPrice";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAd, setCurrent, clearCurrent } from "../../../actions/adActions";

const MyAdItem = ({ deleteAd, setCurrent, clearCurrent, ad }) => {
  const {
    make,
    model,
    price,
    _id,
    imageURL,
    sold,
    featured,
    dateManufactured,
    dateAdded,
  } = ad;

  const onDelete = () => {
    deleteAd(_id);
    clearCurrent();
  };

  const displayDate = () => {
    return dateAdded.substring(0, 10);
  };

  return (
    <div className="my-car">
      <div className="my-car__container">
        <div
          className="my-car__image"
          style={{
            backgroundImage: imageURL
              ? `url(${imageURL})`
              : `url(${placeholderCar})`,
          }}
        ></div>

        <div className="my-car__main">
          <div>
            {make} {model}
          </div>
          <span> {dateManufactured}</span>
          <span className="my-car__main__featured">
            {" "}
            {featured ? "featured" : null}
          </span>
        </div>
        <div className="my-car__date-added">
          Added on: {displayDate()}{" "}
          <div className="my-car__status">
            Status:{" "}
            {sold ? (
              <span className="my-car__sold">sold</span>
            ) : (
              <span className="my-car__for-sale">for sale</span>
            )}
          </div>
        </div>
        <div className="my-car__price">{displayPrice(price)}</div>
      </div>
      <div className="my-car__controls">
        <Link className="btn btn-secondary" to={`/cars/${_id}`}>
          Visit ad
        </Link>
        <Link
          to="/editing"
          onClick={() => setCurrent(ad)}
          className="btn btn-edit"
        >
          Edit
        </Link>

        <button onClick={onDelete} className="btn btn-delete ">
          Delete
        </button>
      </div>
    </div>
  );
};

MyAdItem.propTypes = (state) => ({
  deleteAd: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired,
});

export default connect(null, { deleteAd, setCurrent, clearCurrent })(MyAdItem);
