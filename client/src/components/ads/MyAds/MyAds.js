import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import MyAdItem from "./MyAdItem";
import Spinner from "../../layout/Spinner";
import "./MyAds.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMyAds } from "../../../actions/adActions";

const MyAds = ({ getMyAds, ad: { myAds, loading } }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    getMyAds();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="my-cars">
      <div className="my-cars__container shadow-md">
        <div className="my-cars__heading">
          <h1>My cars for sale</h1>
        </div>
        <div className="my-cars__cars">
          {loading ? (
            <Spinner />
          ) : !loading && myAds && myAds.length > 0 ? (
            myAds.map((ad) => <MyAdItem key={ad._id} ad={ad} />)
          ) : (
            <div className="my-cars__no-cars">
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

MyAds.propTypes = {
  ad: PropTypes.object.isRequired,
  getMyAds: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ad: state.ad,
});

export default connect(mapStateToProps, { getMyAds })(MyAds);
