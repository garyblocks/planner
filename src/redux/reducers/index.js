import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import plans from "./plans";
import exercises from "./exercises";

export default combineReducers({ plans, exercises, visibilityFilter });
