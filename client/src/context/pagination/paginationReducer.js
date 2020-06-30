import { SET_CURRENT_PAGE, REMOVE_CURRENT_PAGE } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return action.payload;
    case REMOVE_CURRENT_PAGE:
      return 1;
    default:
      return state;
  }
};
