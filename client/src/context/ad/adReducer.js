import {
  POST_AD,
  DELETE_AD,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_AD,
  FILTER_ADS,
  CLEAR_FILTER,
  SEARCH_ADS,
} from "../types";
import { multiPropsFilter } from "./multiPropsFilter";

export default (state, action) => {
  switch (action.type) {
    case POST_AD:
      return { ...state, ads: [...state.ads, action.payload] };
    case UPDATE_AD:
      return {
        ...state,
        ads: state.ads.map((ad) =>
          ad.id === action.payload.id ? action.payload : ad
        ),
        myAds: state.myAds.map((ad) =>
          ad.id === action.payload.id ? action.payload : ad
        ),
      };
    case SEARCH_ADS:
      return {
        ...state,
        foundAds: multiPropsFilter(state.ads, action.payload),
      };
    case CLEAR_FILTER:
      return { ...state, foundAds: null };
    case DELETE_AD:
      return {
        ...state,
        ads: state.ads.filter((ad) => ad.id !== action.payload),
        myAds: state.myAds.filter((ad) => ad.id !== action.payload),
      };
    case SET_CURRENT:
      return { ...state, current: action.payload };
    case CLEAR_CURRENT:
      return { ...state, current: null };
    default:
      return state;
  }
};
