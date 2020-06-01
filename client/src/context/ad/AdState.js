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
  FILTER_ADS,
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
        price: "23000",
        phoneNumber: "07425858895",
      },
      {
        id: 2,
        make: "BMW",
        model: "320",
        dateManufactured: 2018,
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
        price: "13000",
        phoneNumber: "07425858895",
      },
      {
        id: 3,
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
        price: "14999",
        phoneNumber: "07425858895",
      },
    ],
  };

  const [state, dispatch] = useReducer(AdReducer, initialState);

  // Post ad

  // Delete ad

  // Set current ad

  // CLear current ad

  // Update ad

  // Filter ads

  // Clear filter

  return (
    <AdContext.Provider value={{ ads: state.ads }}>
      {props.children}
    </AdContext.Provider>
  );
};

export default AdState;
