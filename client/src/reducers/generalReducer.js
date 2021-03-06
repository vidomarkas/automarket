import { SET_CURRENT_PAGE, REMOVE_CURRENT_PAGE } from "../actions/types";

const initialState = {
  currentPage: 1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case REMOVE_CURRENT_PAGE:
      return { ...state, currentPage: 1 };
    default:
      return state;
  }
};
