import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import { BsInfoCircle } from "react-icons/bs";

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <BsInfoCircle /> {alert.msg}
      </div>
    ))
  );
};

export default Alerts;