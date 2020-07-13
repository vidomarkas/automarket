import React, { useReducer } from "react";
import axios from "axios";
import UserContext from "./userContext";
import UserReducer from "./userReducer";
import {
  SAVE_AD,
  GET_SAVED_ADS,
  REMOVE_AD_FROM_SAVED,
  SAVE_AD_ERROR,
} from "../types";

const UserState = (props) => {
  const initialState = {
    savedAds: [],
    saveAdError: null,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  // Save ad
  const saveAd = async (AdID) => {
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post("/api/savedcars", { AdID: AdID }, config);

      console.log("response from API, saved ads", res.data);
      dispatch({ type: SAVE_AD, payload: res.data });
    } catch (err) {
      dispatch({
        type: SAVE_AD_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Remove ad from saved
  const removeAd = (id) => {
    // remove ad from saved
  };

  // Get saved ads
  const getSavedAds = async () => {
    try {
      const res = await axios.get("/api/savedcars");
      console.log("response from API, geting saved ads", res.data);
      dispatch({ type: GET_SAVED_ADS, payload: res.data });
    } catch (err) {
      //todo error handling
      // dispatch({
      //   type: SAVE_AD_ERROR,
      //   payload: err.response.data.msg,
      // });
    }
  };
  // Clear save ad error
  const clearSaveAdError = async () => {
    // todo clear save ad error
  };

  return (
    <UserContext.Provider
      value={{
        savedAds: state.savedAds,
        saveAdError: state.saveAdError,
        saveAd,
        getSavedAds,
        removeAd,
        // clearSaveAdError,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
