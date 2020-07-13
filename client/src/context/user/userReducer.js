import {
  SAVE_AD,
  GET_SAVED_ADS,
  REMOVE_AD_FROM_SAVED,
  SAVE_AD_ERROR,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    //   todo create cases
    case SAVE_AD:
      return { ...state };
    case GET_SAVED_ADS:
      return { ...state, savedAds: action.payload };
    // case SAVE_AD_ERROR:
    //   return { ...state, saveAdError: action.payload };
    // case REMOVE_AD_FROM_SAVED:
    //   return { ...state, currentPage: 1 };
    default:
      return state;
  }
};
