import React, { useContext, useEffect } from "react";
import Ads from "../ads/Ads";
import AdSearch from "../ads/AdSearch";
import AuthContext from "../../context/auth/authContext";

const Main = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <AdSearch />
      <Ads />
    </div>
  );
};

export default Main;
