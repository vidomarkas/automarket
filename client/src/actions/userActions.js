import axios from "axios";
import {
  SAVE_AD,
  GET_SAVED_ADS,
  REMOVE_AD_FROM_SAVED,
  SAVE_AD_ERROR,
} from "./types";

// Save ad
export const saveAd = (AdID) => async (dispatch) => {
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
export const removeAd = (AdID) => async (dispatch) => {
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
export const getSavedAds = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/savedcars");
    dispatch({ type: GET_SAVED_ADS, payload: res.data });
  } catch (err) {
    console.log("Error getSavedAds, message:", err.response.data.msg);
    dispatch({
      type: SAVE_AD_ERROR,
      payload: err.response.data.msg,
    });
  }
};
