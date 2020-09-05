import {
  SAVE_AD,
  GET_SAVED_ADS,
  REMOVE_AD_FROM_SAVED,
  SAVE_AD_ERROR,
} from "../actions/types";

const initialState = {
  savedAds: null,
  loading: true,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_AD:
      return {
        ...state,
        savedAds: action.payload,
        loading: false,
      };
    case GET_SAVED_ADS:
      return { ...state, savedAds: action.payload, loading: false };
    case REMOVE_AD_FROM_SAVED:
      return {
        ...state,
        savedAds: action.payload,
        loading: false,
      };

    case SAVE_AD_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
