import {
  POST_AD,
  DELETE_AD,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_AD,
  SEARCH_ADS,
  CLEAR_FILTER,
  AD_ERROR,
  CLEAR_AD_ERROR,
  GET_MY_ADS,
  CLEAR_MY_ADS,
  UPLOAD_IMAGES,
  GET_AD_DETAILS,
  CLEAR_AD_DETAILS,
  GET_AD_GROUP,
  SET_AD_GROUP,
} from "../actions/types";

const initialState = {
  ads: [],
  myAds: null,
  current: null,
  foundAds: null,
  error: null,
  currentImg: null,
  adDetails: null,
  adGroup: null,
  loading: true,
  adGroupType: "featured",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_AD_DETAILS:
      return { ...state, adDetails: action.payload, loading: false };
    case GET_MY_ADS:
      return { ...state, myAds: action.payload, loading: false };
    case POST_AD:
      return { ...state, ads: [...state.ads, action.payload], loading: false };
    case UPLOAD_IMAGES:
      return {
        ...state,
        currentImg: action.payload,
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
    case GET_AD_GROUP:
      return {
        ...state,
        adGroup: action.payload,
        loading: false,
      };
    case SET_AD_GROUP:
      return {
        ...state,
        adGroupType: action.payload,
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
      return { ...state, current: null, currentImg: null };
    case AD_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_AD_ERROR:
      return { ...state, error: null };
    case CLEAR_AD_DETAILS:
      return { ...state, adDetails: null };
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
