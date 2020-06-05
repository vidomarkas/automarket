import React, { useReducer } from "react";
import AdContext from "./adContext";
import AdReducer from "./adReducer";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {
  POST_AD,
  DELETE_AD,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_AD,
  SEARCH_ADS,
  CLEAR_FILTER,
  AD_ERROR,
  GET_ADS,
  CLEAR_ADS,
} from "../types";

const AdState = (props) => {
  const initialState = {
    ads: [
      {
        id: 1,
        make: "Honda",
        model: "Civic",
        dateManufactured: 1970,
        bodyType: "hatchback",
        fuelType: "petrol",
        gearbox: "auto",
        doors: "2/3",
        damage: "none",
        steeringWheel: "right",
        color: "green",
        mileage: 12300,
        dateAdded: "2020-05-31",
        description: "Great car, sad to see it go",
        price: 23000,
        phoneNumber: "07425858895",
      },
      {
        id: 2,
        make: "BMW",
        model: "114",
        dateManufactured: 2010,
        bodyType: "hatchback",
        fuelType: "petrol",
        gearbox: "auto",
        doors: "2/3",
        damage: "none",
        steeringWheel: "right",
        color: "black",
        mileage: 12300,
        dateAdded: "2020-05-31",
        description: "Great car, sad to see it go",
        price: 153000,
        phoneNumber: "07425858895",
      },
      {
        id: 3,
        make: "BMW",
        model: "114",
        dateManufactured: 2008,
        bodyType: "saloon",
        fuelType: "diesel",
        price: 1000,
      },
      {
        id: 4,
        make: "BMW",
        model: "114",
        dateManufactured: 2018,
        bodyType: "saloon",
        fuelType: "diesel",
        price: 14000,
      },
      {
        id: 5,
        make: "BMW",
        model: "114",
        dateManufactured: 2020,
        bodyType: "hatchback",
        fuelType: "diesel",
        price: 1200,
      },
      {
        id: 6,
        make: "Toyota",
        model: "Land Cruiser",
        dateManufactured: 2016,
        bodyType: "SUV",
        fuelType: "diesel",
        gearbox: "manual",
        doors: "4/5",
        damage: "none",
        steeringWheel: "left",
        color: "black",
        mileage: 12300,
        dateAdded: "2020-05-31",
        description: "Great car, sad to see it go",
        price: 14999,
        phoneNumber: "07425858895",
      },
    ],
    myAds: [
      {
        id: 7,
        make: "BMW",
        model: "114",
        dateManufactured: 2014,
        bodyType: "hatchback",
        fuelType: "petrol",
        gearbox: "auto",
        doors: "2/3",
        damage: "none",
        steeringWheel: "right",
        color: "black",
        mileage: 12300,
        dateAdded: "2020-05-31",
        description: "Great car, sad to see it go",
        price: 13000,
        phoneNumber: "07425858895",
        engineCapacity: 1596,
        power: 300,
        powerUnit: "hp",
        VINnumber: "",
        postcode: "",
      },
    ],
    current: null,
    foundAds: null,
  };

  const [state, dispatch] = useReducer(AdReducer, initialState);

  // Post ad
  const postAd = (ad) => {
    ad.id = uuidv4();
    dispatch({ type: POST_AD, payload: ad });
  };

  // Delete ad
  const deleteAd = (id) => {
    dispatch({ type: DELETE_AD, payload: id });
  };

  // Set current ad
  const setCurrent = (ad) => {
    dispatch({ type: SET_CURRENT, payload: ad });
  };
  // CLear current ad
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  // Update ad
  const updateAd = (ad) => {
    dispatch({ type: UPDATE_AD, payload: ad });
  };
  // Search ads
  const searchAds = (criteria) => {
    dispatch({ type: SEARCH_ADS, payload: criteria });
  };
  // Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <AdContext.Provider
      value={{
        ads: state.ads,
        myAds: state.myAds,
        current: state.current,
        foundAds: state.foundAds,
        postAd,
        deleteAd,
        updateAd,
        setCurrent,
        clearCurrent,
        searchAds,
        clearFilter,
      }}
    >
      {props.children}
    </AdContext.Provider>
  );
};

export default AdState;
