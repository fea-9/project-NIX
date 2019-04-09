import { combineReducers } from "redux";

import auth from "./auth";
import resize from "./resize";
import dashboardRange from "./dashboardRange"
import sidebar from "./sidebar";
import documents from "./documents"

export default combineReducers({
  sidebar,
  resize,
  auth,
  dashboardRange,
  documents
});
