import axios from "axios";
import { SET_CURRENT_PAGE, REMOVE_CURRENT_PAGE } from "./types";

// Set current page
export const setCurrentPage = (page) => {
  return { type: SET_CURRENT_PAGE, payload: page };
};

// Clear current page
export const clearCurrentPage = () => {
  return { type: REMOVE_CURRENT_PAGE };
};

// Validate postcode

export const postcodeValidation = () => async (dispatch, postcode) => {
  try {
    const res = await axios.get(`/api/mycars/postcodeValidation/${postcode}`);
    return res.data.result;
  } catch (err) {
    console.log("Error determining postcode validity", err);
    return err.data;
  }
};
