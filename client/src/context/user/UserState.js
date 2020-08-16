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
    error: null,
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
      const res = axios.delete(`/api/savedcars/${AdID}`, config);
      dispatch({ type: REMOVE_AD_FROM_SAVED, payload: res.data });
    } catch (err) {
      dispatch({
        type: SAVE_AD_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Get saved ads list of the user
  const getSavedAds = async () => {
    try {
      const res = await axios.get("/api/savedcars");
      dispatch({ type: GET_SAVED_ADS, payload: res.data });
    } catch (err) {
      console.log("Error getSavedAds, message:", err.res.data.msg);
      dispatch({
        type: SAVE_AD_ERROR,
        payload: err.res.data.msg,
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        savedAds: state.savedAds,
        loading: state.loading,
        saveAd,
        getSavedAds,
        removeAd,
        // saveAdError: state.saveAdError,
        // clearSaveAdError,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
