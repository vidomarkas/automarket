import { combineReducers } from "redux";
import adReducer from "./adReducer";
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import generalReducer from "./generalReducer";

export default combineReducers({
  ad: adReducer,
  alert: alertReducer,
  auth: authReducer,
  user: userReducer,
  general: generalReducer,
});
