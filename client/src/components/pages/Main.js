import React, { useContext } from "react";
import FoundAds from "../ads/FoundAds";
import AdSearch from "../ads/AdSearch";
import AuthContext from "../../context/auth/authContext";

const Main = () => {
  const authContext = useContext(AuthContext);

  return (
    <div>
      <AdSearch />
      <FoundAds />
    </div>
  );
};

export default Main;
