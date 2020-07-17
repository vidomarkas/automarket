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
  GET_AD_DETAILS,
  CLEAR_AD_DETAILS,
  GET_AD_GROUP,
  COUNT_SEEN,
  COUNT_SEEN_ERROR,
  SET_AD_GROUP,
  INC_COUNT_SAVED,
  DEC_COUNT_SAVED,
  COUNT_SAVED_ERROR,
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
    adGroup: null,
    loading: true,
    adGroupType: "featured",
  };

  const [state, dispatch] = useReducer(AdReducer, initialState);

  // Get my ads
  const getMyAds = async () => {
    try {
      const res = await axios.get("/api/mycars");
      dispatch({ type: GET_MY_ADS, payload: res.data });
    } catch (err) {
      dispatch({ type: AD_ERROR, payload: err.response.msg });
    }
  };
  // Get ad details
  const getAdDetails = async (id) => {
    try {
      const res = await axios.get(`/api/cars/${id}`);
      dispatch({ type: GET_AD_DETAILS, payload: res.data });
    } catch (err) {
      dispatch({ type: AD_ERROR, payload: err.response.data.msg });
    }
  };
  // Post an ad
  const postAd = async (ad) => {
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post("/api/mycars", ad, config);
      dispatch({ type: POST_AD, payload: res.data });
    } catch (err) {
      dispatch({ type: AD_ERROR, payload: err.response.data.msg });
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
      dispatch({ type: AD_ERROR, payload: err.response.data.msg });
    }
  };

  // Delete ad
  const deleteAd = async (id) => {
    try {
      await axios.delete(`/api/mycars/${id}`);
      dispatch({ type: DELETE_AD, payload: id });
    } catch (err) {
      dispatch({ type: AD_ERROR, payload: err.response.data.msg });
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
      const res = await axios.put(`/api/mycars/${ad._id}`, ad, config);
      dispatch({ type: UPDATE_AD, payload: res.data });
    } catch (err) {
      dispatch({ type: AD_ERROR, payload: err.response.data.msg });
    }
  };
  // Search ads
  const searchAds = async (criteria) => {
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post("/api/search", criteria, config);
      dispatch({ type: SEARCH_ADS, payload: res.data });
    } catch (err) {
      dispatch({
        type: AD_ERROR,
        payload: err.response.data.msg,
      });
    }
  };
  // Set the type (featured, new, expensive, popular) of the ad group on the front page
  const setAdGroupType = (type) => {
    dispatch({ type: SET_AD_GROUP, payload: type });
  };
  // Get ad group (featured, recently added, most popular, new cars, most expensive )
  const getAdGroup = async (criteria) => {
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post("/api/getgroup", criteria, config);
      dispatch({ type: GET_AD_GROUP, payload: res.data });
    } catch (err) {
      dispatch({
        type: AD_ERROR,
        payload: err.response.data.msg,
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

  const clearAdDetails = () => {
    dispatch({ type: CLEAR_AD_DETAILS });
  };

  const countSeen = (id) => {
    try {
      axios.post(`/api/cars/${id}`);
      dispatch({ type: COUNT_SEEN });
    } catch (err) {
      dispatch({ type: AD_ERROR, payload: err.response.msg });
    }
  };
  const incrementSavedCount = async (id) => {
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post("/api/savedcars/inc", { id }, config);
      dispatch({ type: INC_COUNT_SAVED, payload: res.data });
    } catch (err) {
      dispatch({ type: AD_ERROR, payload: err.response.msg });
    }
  };
  const decrementSavedCount = async (id) => {
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post("/api/savedcars/dec", { id }, config);
      dispatch({ type: DEC_COUNT_SAVED, payload: res.data });
    } catch (err) {
      dispatch({ type: AD_ERROR, payload: err.response.msg });
    }
  };

  return (
    <AdContext.Provider
      value={{
        ads: state.ads,
        myAds: state.myAds,
        current: state.current,
        foundAds: state.foundAds,
        adGroup: state.adGroup,
        error: state.error,
        currentImg: state.currentImg,
        adDetails: state.adDetails,
        loading: state.loading,
        adGroupType: state.adGroupType,
        savedCount: state.savedCount,
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
        clearAdDetails,
        getAdGroup,
        countSeen,
        setAdGroupType,
        incrementSavedCount,
        decrementSavedCount,
      }}
    >
      {props.children}
    </AdContext.Provider>
  );
};

export default AdState;
