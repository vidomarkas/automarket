import React, { useReducer } from "react";
import AdContext from "./adContext";
import AdReducer from "./adReducer";
import axios from "axios";
import {
  POST_AD,
  DELETE_AD,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_AD,
  SEARCH_ADS,
  CLEAR_FILTER,
  AD_ERROR,
  CLEAR_AD_ERROR,
  GET_MY_ADS,
  CLEAR_MY_ADS,
  UPLOAD_IMAGES,
  ERROR_UPLOADING_IMAGES,
  GET_AD_DETAILS,
} from "../types";

const AdState = (props) => {
  const initialState = {
    ads: [],
    myAds: null,
    current: null,
    foundAds: null,
    error: null,
    currentImg: null,
    adDetails: null,
  };

  const [state, dispatch] = useReducer(AdReducer, initialState);

  // Get my ads
  const getMyAds = async () => {
    try {
      const res = await axios.get("api/myads");
      dispatch({ type: GET_MY_ADS, payload: res.data });
    } catch (err) {
      dispatch({ type: AD_ERROR, payload: err.response.msg });
    }
  };
  //! Get ad details
  const getAdDetails = async (id) => {
    try {
      console.log("from getAdDetails");
      const res = await axios.get(`${id}`);
      console.log("res", res);

      dispatch({ type: GET_AD_DETAILS, payload: res.data });
    } catch (err) {
      console.log("error");
      dispatch({ type: AD_ERROR, payload: err.response.msg });
    }
  };
  // Post ad
  const postAd = async (ad) => {
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post("api/myads", ad, config);
      dispatch({ type: POST_AD, payload: res.data });
    } catch (err) {
      dispatch({ type: AD_ERROR, payload: err.response.msg });
    }
  };

  // Upload Image
  const uploadImage = async (image) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    try {
      const formData = new FormData();
      formData.append("image", image);
      const res = await axios.post("api/images", formData, config);
      dispatch({ type: UPLOAD_IMAGES, payload: res.data.data[0].url });
    } catch (err) {
      dispatch({ type: ERROR_UPLOADING_IMAGES, payload: err.response.message });
      console.log(err);
    }
  };

  // Delete ad
  const deleteAd = async (id) => {
    try {
      await axios.delete(`api/myads/${id}`);
      dispatch({ type: DELETE_AD, payload: id });
    } catch (err) {
      dispatch({ type: AD_ERROR, payload: err.response.msg });
    }
  };
  // Set current ad
  const setCurrent = (ad) => {
    dispatch({ type: SET_CURRENT, payload: ad });
  };
  // Clear current ad
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  // Update ad
  const updateAd = async (ad) => {
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const res = await axios.put(`api/myads/${ad._id}`, ad, config);
      dispatch({ type: UPDATE_AD, payload: res.data });
    } catch (err) {
      dispatch({ type: AD_ERROR, payload: err.response.msg });
    }
  };
  // Search ads
  const searchAds = async (criteria) => {
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post("api/search", criteria, config);
      dispatch({ type: SEARCH_ADS, payload: res.data });
    } catch (err) {
      dispatch({
        type: AD_ERROR,
        payload: err.response,
      });
    }
  };
  // Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  // Clear errors
  const clearAdError = () => {
    dispatch({ type: CLEAR_AD_ERROR });
  };

  // Clear my ads
  const clearMyAds = () => {
    dispatch({ type: CLEAR_MY_ADS });
  };

  return (
    <AdContext.Provider
      value={{
        ads: state.ads,
        myAds: state.myAds,
        current: state.current,
        foundAds: state.foundAds,
        error: state.error,
        currentImg: state.currentImg,
        adDetails: state.adDetails,
        getMyAds,
        postAd,
        deleteAd,
        updateAd,
        setCurrent,
        clearCurrent,
        searchAds,
        clearFilter,
        clearAdError,
        clearMyAds,
        uploadImage,
        getAdDetails,
      }}
    >
      {props.children}
    </AdContext.Provider>
  );
};

export default AdState;
