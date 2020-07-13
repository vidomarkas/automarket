import React, { useReducer } from "react";
import axios from "axios";
import UserContext from "./userContext";
import UserReducer from "./userReducer";
import { SAVE_AD, GET_SAVED_ADS, REMOVE_AD_FROM_SAVED } from "../types";

const UserState = (props) => {
  // Save ad

  // Remove ad from saved

  // Get saved ads

  return (
    <UserContext.Provider value={{}}>{props.children}</UserContext.Provider>
  );
};

export default UserState;
