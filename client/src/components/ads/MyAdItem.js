import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AdContext from "../../context/ad/adContext";
import placeholderCar from "../../assets/img/placeholder-car.png";

const MyAdItem = ({ myAd }) => {
  const adContext = useContext(AdContext);
  const { deleteAd, setCurrent, clearCurrent } = adContext;
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
  } = myAd;

  const onDelete = () => {
    deleteAd(_id);
    clearCurrent();
  };

  const displayPrice = () => {
    const priceFormatter = new Intl.NumberFormat("en-UK", {
      style: "currency",
      currency: "GBP",
    });

    return priceFormatter.format(price).slice(0, -3);
  };

  const displayDate = () => {
    return dateAdded.substring(0, 10);
  };

  return (
    <div className="my-ad">
      {imageURL ? (
        <div
          className="my-ad__image"
          style={{ backgroundImage: `url(${imageURL})` }}
        ></div>
      ) : (
        <div
          className="ad-item__image shadow-min"
          style={{ backgroundImage: `url(${placeholderCar})` }}
        ></div>
      )}

      <div className="my-ad__main">
        <div>
          {make} {model}
        </div>
        <span> {dateManufactured}</span>
        <span className="my-ad__main__featured">
          {" "}
          {featured ? "featured" : null}
        </span>
      </div>
      <div className="my-ad__date-added">
        Added on: {displayDate()}{" "}
        <div className="my-ad__status">
          Status:{" "}
          {sold ? (
            <span className="my-ad__sold">sold</span>
          ) : (
            <span className="my-ad__for-sale">for sale</span>
          )}
        </div>
      </div>
      <div className="my-ad__price">{displayPrice()}</div>
      <div className="my-ad__controls">
        <Link className="btn btn-secondary" to={`/ads/${_id}`}>
          Visit ad
        </Link>
        <Link
          to="/editing"
          onClick={() => setCurrent(myAd)}
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

export default MyAdItem;
