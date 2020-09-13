import React, { useEffect } from "react";
import Header from "../layout/Header/Header";
import TopAds from "../ads/TopAds/TopAds";
import SearchResults from "../ads/SearchResults/SearchResults";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import setAuthToken from "../../utils/setAuthToken";
import { loadUser } from "../../actions/authActions";

const Main = ({ foundAds, loadUser }) => {
  useEffect(() => {
    // load token into global headers and load user
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      loadUser();
    }
  }, [loadUser]);
  return (
    <>
      <Header />
      {foundAds ? <SearchResults /> : <TopAds />}
    </>
  );
};

Main.propTypes = {
  foundAds: PropTypes.array,
};

const mapStateToProps = (state) => ({
  foundAds: state.ad.foundAds,
});

export default connect(mapStateToProps, { loadUser })(Main);
