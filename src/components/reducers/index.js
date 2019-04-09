import { combineReducers } from "redux";

import auth from "./auth";
import resize from "./resize";
import dashboardRange from "./dashboardRange"

export default combineReducers({
  resize,
  auth,
  dashboardRange
});
