import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AdContext from "../../context/ad/adContext";

const MyAdItem = ({ myAd }) => {
  const adContext = useContext(AdContext);
  const { deleteAd, setCurrent, clearCurrent } = adContext;
  const { make, model, price, _id } = myAd;

  const onDelete = () => {
    deleteAd(_id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <div>
        {make} {model}
      </div>
      <div>{price}</div>
      <Link to={`/ads/${_id}`}>More details</Link>
      <br />
      <Link
        to="/editing"
        onClick={() => setCurrent(myAd)}
        className="btn btn-dark btn-sm"
      >
        Edit
      </Link>

      <button onClick={onDelete} className="btn btn-danger btn-sm">
        Delete
      </button>
    </div>
  );
};

export default MyAdItem;
