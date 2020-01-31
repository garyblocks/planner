import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import plans from "./plans";

export default combineReducers({ plans, visibilityFilter });
