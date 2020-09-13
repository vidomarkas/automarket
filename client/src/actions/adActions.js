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
  SET_AD_GROUP,
} from "./types";

// Get my ads
export const getMyAds = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/mycars");
    dispatch({ type: GET_MY_ADS, payload: res.data });
  } catch (err) {
    dispatch({ type: AD_ERROR, payload: err.response.msg });
  }
};

// Get ad details
export const getAdDetails = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/cars/${id}`);

    dispatch({ type: GET_AD_DETAILS, payload: res.data });
  } catch (err) {
    dispatch({ type: AD_ERROR, payload: err.response.data.msg });
  }
};
// Post an ad
export const postAd = (ad) => async (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  try {
    const res = await axios.post("/api/mycars", ad, config);

    dispatch({ type: POST_AD, payload: res.data });
  } catch (err) {
    dispatch({ type: AD_ERROR, payload: err.response.data.msg });
  }
};

// Upload Image
export const uploadImage = (image) => async (dispatch) => {
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
export const deleteAd = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/mycars/${id}`);
    dispatch({ type: DELETE_AD, payload: id });
  } catch (err) {
    dispatch({ type: AD_ERROR, payload: err.response.data.msg });
  }
};
// Set current ad
export const setCurrent = (id) => (dispatch) => {
  dispatch({ type: SET_CURRENT, payload: id });
};
// Clear current ad
export const clearCurrent = () => {
  return { type: CLEAR_CURRENT };
};
// Update ad
export const updateAd = (ad) => async (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  try {
    const res = await axios.put(`/api/mycars/${ad._id}`, ad, config);
    dispatch({ type: UPDATE_AD, payload: res.data });
  } catch (err) {
    dispatch({ type: AD_ERROR, payload: err.response.data.msg });
  }
};
// Search ads
export const searchAds = (criteria) => async (dispatch) => {
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
export const setAdGroupType = (type) => (dispatch) => {
  dispatch({ type: SET_AD_GROUP, payload: type });
};
// Get ad group (featured, recently added, most popular, new cars, most expensive )
export const getAdGroup = (criteria) => async (dispatch) => {
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
export const clearFilter = () => {
  return { type: CLEAR_FILTER };
};
// Clear errors
export const clearAdError = () => {
  return { type: CLEAR_AD_ERROR };
};

// Clear my ads
export const clearMyAds = () => {
  return { type: CLEAR_MY_ADS };
};

export const clearAdDetails = () => {
  return { type: CLEAR_AD_DETAILS };
};

// export const incrementSavedCount = (id) => async (dispatch) => {
//   const config = { headers: { "Content-Type": "application/json" } };
//   try {
//     const res = await axios.post("/api/savedcars/inc", { id }, config);
//     dispatch({ type: INC_COUNT_SAVED, payload: res.data });
//   } catch (err) {
//     dispatch({ type: AD_ERROR, payload: err.response.msg });
//   }
// };
// export const decrementSavedCount = (id) => async (dispatch) => {
//   const config = { headers: { "Content-Type": "application/json" } };
//   try {
//     const res = await axios.post("/api/savedcars/dec", { id }, config);
//     dispatch({ type: DEC_COUNT_SAVED, payload: res.data });
//   } catch (err) {
//     dispatch({ type: AD_ERROR, payload: err.response.msg });
//   }
// };
