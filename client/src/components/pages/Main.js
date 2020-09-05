import React from "react";
import Header from "../layout/Header/Header";
import TopAds from "../ads/TopAds/TopAds";
import SearchResults from "../ads/SearchResults/SearchResults";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Main = ({ foundAds }) => {
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

export default connect(mapStateToProps)(Main);
