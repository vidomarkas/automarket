import {
  SAVE_AD,
  GET_SAVED_ADS_DETAILS,
  GET_SAVED_ADS_LIST,
  REMOVE_AD_FROM_SAVED,
  SAVE_AD_ERROR,
} from "../actions/types";

const initialState = {
  savedAdsList: [],
  savedAdsDetails: [],
  loading: true,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_AD:
      return {
        ...state,
        savedAdsList: action.payload,
        loading: false,
      };

    case REMOVE_AD_FROM_SAVED:
      return {
        ...state,
        savedAdsList: state.savedAdsList.filter((id) => id !== action.payload),
        loading: false,
      };

    case GET_SAVED_ADS_DETAILS:
      return { ...state, savedAdsDetails: action.payload, loading: false };

    case GET_SAVED_ADS_LIST:
      return { ...state, savedAdsList: action.payload, loading: false };

    case SAVE_AD_ERROR:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};
