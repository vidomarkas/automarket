import React, { useEffect } from "react";

const AdDetailsMap = ({ postcode }) => {
  useEffect(() => {
    const fetchLocation = async () => {
      const locationObj = await fetch(
        `https://api.postcodes.io/postcodes/${postcode}`
      );
      console.log(locationObj);
    };
    fetchLocation();
  }, []);

  return (
    <div style={{ border: "1px solid pink", height: "200px", width: "200px" }}>
      Map
      <h1>{postcode}</h1>
    </div>
  );
};

export default AdDetailsMap;
