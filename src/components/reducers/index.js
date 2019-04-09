import { combineReducers } from "redux";

import auth from "./auth";
import resize from "./resize";
<<<<<<< HEAD
import dashboardRange from "./dashboardRange"
=======
import sidebar from "./sidebar";
>>>>>>> 166d5d26f41cb974a5ffa45e9bc4b035b21e8ab6

export default combineReducers({
  sidebar,
  resize,
  auth,
  dashboardRange
});
