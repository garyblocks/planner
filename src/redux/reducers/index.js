import { combineReducers } from "redux";
import plans from "./plans";
import exercises from "./exercises";
import views from "./views";

export default combineReducers({ plans, exercises, views });
