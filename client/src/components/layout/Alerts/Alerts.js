import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BsInfoCircle } from "react-icons/bs";
import "./Alerts.scss";

const Alerts = ({ alerts }) => {
  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert__${alert.type}`}>
        <BsInfoCircle className="alert__icon" /> {alert.msg}
      </div>
    ))
  );
};

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alerts);
