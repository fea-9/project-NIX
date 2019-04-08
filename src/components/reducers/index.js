import { combineReducers } from "redux";

import auth from "./auth";
import resize from "./resize";
import sidebar from "./sidebar";

export default combineReducers({
  sidebar,
  resize,
  auth
});
