import {
  GET_MY_ADS,
  POST_AD,
  DELETE_AD,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_AD,
  FILTER_ADS,
  CLEAR_FILTER,
  SEARCH_ADS,
  AD_ERROR,
  CLEAR_AD_ERROR,
} from "../types";
import { multiPropsFilter } from "./multiPropsFilter";

export default (state, action) => {
  switch (action.type) {
    case GET_MY_ADS:
      return { ...state, myAds: action.payload, loading: false };
    case POST_AD:
      return { ...state, ads: [...state.ads, action.payload], loading: false };
    case UPDATE_AD:
      return {
        ...state,
        ads: state.ads.map((ad) =>
          ad.id === action.payload.id ? action.payload : ad
        ),
        myAds: state.myAds.map((ad) =>
          ad.id === action.payload.id ? action.payload : ad
        ),
        loading: false,
      };
    case SEARCH_ADS:
      console.log("action.payload", action.payload);
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
        ads: state.ads.filter((ad) => ad.id !== action.payload),
        myAds: state.myAds.filter((ad) => ad.id !== action.payload),
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
    default:
      return state;
  }
};
