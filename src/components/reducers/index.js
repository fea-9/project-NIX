import { combineReducers } from "redux";

import auth from "./auth";
import resize from "./resize";

export default combineReducers({
  resize,
  auth
});
