import React, { useEffect, useState } from "react";

import Spinner from "../../layout/Spinner";
import TopAdsTabs from "./TopAdsTabs";
import AdGrid from "../AdGrid/AdGrid";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAdGroup, setAdGroupType } from "../../../actions/adActions";

const TopAds = ({
  getAdGroup,
  setAdGroupType,
  ad: { loading, adGroup, adGroupType },
}) => {
  const [currentTab, setCurrentTab] = useState(adGroupType);

  useEffect(() => {
    setAdGroupType(currentTab);
    getAdGroup({
      type: currentTab,
    });
    // eslint-disable-next-line
  }, [currentTab, setCurrentTab]);
  return (
    <div className="ad-grid__container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <TopAdsTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
          <AdGrid ads={adGroup} />
        </>
      )}
    </div>
  );
};

TopAds.propTypes = {
  ad: PropTypes.object.isRequired,
  getAdGroup: PropTypes.func.isRequired,
  setAdGroupType: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ad: state.ad,
});

export default connect(mapStateToProps, { getAdGroup, setAdGroupType })(TopAds);
