import {
  GET_MY_ADS,
  POST_AD,
  DELETE_AD,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_AD,
  CLEAR_FILTER,
  SEARCH_ADS,
  AD_ERROR,
  CLEAR_AD_ERROR,
  CLEAR_MY_ADS,
  UPLOAD_IMAGES,
  ERROR_UPLOADING_IMAGES,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_MY_ADS:
      return { ...state, myAds: action.payload, loading: false };
    case POST_AD:
      return { ...state, ads: [...state.ads, action.payload], loading: false };
    case UPLOAD_IMAGES:
      return {
        ...state,
        current: [...state.current, action.payload],
        loading: false,
      };
    case UPDATE_AD:
      return {
        ...state,
        ads: state.ads.map((ad) =>
          ad._id === action.payload._id ? action.payload : ad
        ),
        myAds: state.myAds.map((ad) =>
          ad._id === action.payload._id ? action.payload : ad
        ),
        loading: false,
      };
    case SEARCH_ADS:
      return {
        ...state,
        foundAds: action.payload,
        loading: false,
      };
    case CLEAR_FILTER:
      return { ...state, foundAds: null };
    case DELETE_AD:
      return {
        ...state,
        ads: state.ads.filter((ad) => ad._id !== action.payload),
        myAds: state.myAds.filter((ad) => ad._id !== action.payload),
        loading: false,
      };
    case SET_CURRENT:
      return { ...state, current: action.payload };
    case CLEAR_CURRENT:
      return { ...state, current: null };
    case AD_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_AD_ERROR:
      return { ...state, error: null };
    case CLEAR_MY_ADS:
      return {
        ...state,
        myAds: null,
        current: null,
        foundAds: null,
        error: null,
      };
    default:
      return state;
  }
};
