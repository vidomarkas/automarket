import React, { useContext, useEffect } from "react";
import Spinner from "../layout/Spinner";
import AdContext from "../../context/ad/adContext";
import MyAdItem from "../ads/MyAdItem";
import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";
import "./MyAds.scss";

const MyAds = () => {
  const adContext = useContext(AdContext);
  const { myAds, getMyAds, loading } = adContext;

  useEffect(() => {
    getMyAds();

    // eslint-disable-next-line
  }, []);
  return (
    <div className="my-ads">
      <div className="my-ads__container shadow-md">
        <div className="my-ads__heading">
          <h1>My cars for sale</h1>
        </div>
        <div className="my-ads__ads">
          {!loading && myAds && myAds.length > 0 ? (
            myAds.map((ad) => <MyAdItem key={ad._id} myAd={ad} />)
          ) : (
            <div className="my-ads__no-ads">
              <h2>You have no adverts at the moment. Please add new one</h2>

              <br />
              <Link className="btn btn-primary" to="/editing">
                <GoPlus style={{ marginBottom: "-2px", marginRight: "4px" }} />
                Post an ad
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAds;
