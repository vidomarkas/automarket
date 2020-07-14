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
    loading: true,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  // Save ad
  const saveAd = async (AdID) => {
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post("/api/savedcars", { AdID: AdID }, config);
      dispatch({ type: SAVE_AD, payload: res.data });
    } catch (err) {
      dispatch({
        type: SAVE_AD_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Remove ad from saved
  const removeAd = async (AdID) => {
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const res = await axios.delete(`/api/savedcars/${AdID}`, config);
      dispatch({ type: REMOVE_AD_FROM_SAVED, payload: res.data });
    } catch (err) {
      console.log("Error deleting the ad from favorites", err);
    }
  };

  // Get saved ads
  const getSavedAds = async () => {
    try {
      const res = await axios.get("/api/savedcars");
      dispatch({ type: GET_SAVED_ADS, payload: res.data });
    } catch (err) {
      //todo error handling
      console.log("error getting the ads");
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
        loading: state.loading,
        // saveAdError: state.saveAdError,
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
