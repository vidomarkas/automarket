import React, { useReducer } from "react";
import axios from "axios";
import GeneralContext from "./generalContext";
import generalReducer from "./generalReducer";
import { SET_CURRENT_PAGE, REMOVE_CURRENT_PAGE } from "../types";

const GeneralState = (props) => {
  const initialState = {
    currentPage: 1,
  };
  const [state, dispatch] = useReducer(generalReducer, initialState);

  // Set current page
  const setCurrentPage = (page) => {
    dispatch({ type: SET_CURRENT_PAGE, payload: page });
  };

  // Clear current page
  const clearCurrentPage = () => {
    dispatch({ type: REMOVE_CURRENT_PAGE });
  };

  // Validate postcode

  const postcodeValidation = async (postcode) => {
    try {
      const res = await axios.get(`/api/mycars/postcodeValidation/${postcode}`);
      return res.data.result;
    } catch (err) {
      console.log("Error determining postcode validity", err);
      return err.data;
    }
  };

  return (
    <GeneralContext.Provider
      value={{
        currentPage: state.currentPage,
        postcodeValid: state.postcodeValid,
        setCurrentPage,
        clearCurrentPage,
        postcodeValidation,
      }}
    >
      {props.children}
    </GeneralContext.Provider>
  );
};

export default GeneralState;
