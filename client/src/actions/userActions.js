import axios from "axios";
import {
  GET_SAVED_ADS_LIST,
  GET_SAVED_ADS_DETAILS,
  SAVE_AD,
  REMOVE_AD_FROM_SAVED,
  SAVE_AD_ERROR,
} from "./types";

// Get saved ads list of ids of the user
export const getSavedAdsList = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/savedcars/list");
    console.log("savedAdsList: ", res.data);
    dispatch({ type: GET_SAVED_ADS_LIST, payload: res.data });
  } catch (err) {
    console.log("Error getSavedAds, message:", err.response.data.msg);
    dispatch({
      type: SAVE_AD_ERROR,
      payload: err.response.data.msg,
    });
  }
};

// Get saved ads list with details
export const getSavedAdsDetails = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/savedcars/details");
    console.log("savedAdsDetails: ", res.data);
    dispatch({ type: GET_SAVED_ADS_DETAILS, payload: res.data });
  } catch (err) {
    console.log("Error getSavedAds, message:", err.response.data.msg);
    dispatch({
      type: SAVE_AD_ERROR,
      payload: err.response.data.msg,
    });
  }
};

// Save ad
export const saveAd = (id) => async (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  try {
    const res = await axios.post("/api/savedcars", { id }, config);
    console.log("on save Ad, result from server: ", res.data);
    dispatch({ type: SAVE_AD, payload: res.data });
  } catch (err) {
    dispatch({
      type: SAVE_AD_ERROR,
      payload: err.response.data.msg,
    });
  }
};

// Remove ad from saved
export const removeAd = (id) => async (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  try {
    const res = axios.delete(`/api/savedcars/${id}`, config);
    dispatch({ type: REMOVE_AD_FROM_SAVED, payload: res.data });
  } catch (err) {
    dispatch({
      type: SAVE_AD_ERROR,
      payload: err.response.data.msg,
    });
  }
};
