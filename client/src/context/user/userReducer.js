import {
  SAVE_AD,
  GET_SAVED_ADS,
  REMOVE_AD_FROM_SAVED,
  SAVE_AD_ERROR,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SAVE_AD:
      return { ...state, savedAds: [...state.savedAds, ...action.payload] };
    case GET_SAVED_ADS:
      return { ...state, savedAds: action.payload, loading: false };
    case REMOVE_AD_FROM_SAVED:
      return {
        ...state,
        savedAds: state.savedAds.filter((ad) => ad._id !== action.payload),
        loading: false,
      };

    case SAVE_AD_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
