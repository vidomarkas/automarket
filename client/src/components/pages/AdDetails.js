import React, { useContext, useEffect } from "react";
import AdContext from "../../context/ad/adContext";

const AdDetails = (props) => {
  const adContext = useContext(AdContext);
  const { adDetails, getAdDetails, loading } = adContext;
  //const { make, model } = adDetails;

  useEffect(() => {
    console.log("adDetails changed :>> ", adDetails);
    getAdDetails(props.match.params.id);
  }, []);

  return <>{!loading && adDetails && <h1>{adDetails.make}</h1>}</>;
};

export default AdDetails;
