import { combineReducers } from "redux";

import auth from "./auth";
import resize from "./resize";
import dashboardRange from "./dashboardRange"
import sidebar from "./sidebar";
import documents from "./documents"
import community from "./community"
import transDocGraph from "./transDocGraph"

export default combineReducers({
  sidebar,
  resize,
  auth,
  dashboardRange,
  documents,
  community,
  transDocGraph
});
