import React, { useReducer } from "react";
import PaginationContext from "./paginationContext";
import paginationReducer from "./paginationReducer";
import { SET_CURRENT_PAGE, REMOVE_CURRENT_PAGE } from "../types";

const PaginationState = (props) => {
  const [state, dispatch] = useReducer(paginationReducer, 1);

  // Set current page
  const setCurrentPage = (page) => {
    dispatch({ type: SET_CURRENT_PAGE, payload: page });
  };

  // Clear current page
  const clearCurrentPage = () => {
    dispatch({ type: REMOVE_CURRENT_PAGE });
  };

  return (
    <PaginationContext.Provider
      value={{
        currentPage: state,
        setCurrentPage,
        clearCurrentPage,
      }}
    >
      {props.children}
    </PaginationContext.Provider>
  );
};

export default PaginationState;
