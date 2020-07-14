import { SAVE_AD, GET_SAVED_ADS, REMOVE_AD_FROM_SAVED } from "../types";

export default (state, action) => {
  switch (action.type) {
    //   todo create cases
    case SAVE_AD:
      return { ...state };
    case GET_SAVED_ADS:
      return { ...state, savedAds: action.payload, loading: false };
    case REMOVE_AD_FROM_SAVED:
      console.log(action.payload);
      return {
        ...state,
        savedAds: state.savedAds.filter((ad) => ad._id !== action.payload),
        loading: false,
      };
    default:
      return state;
  }
};
