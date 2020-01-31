import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import plans from "./plans";
import views from "./views";

export default combineReducers({ plans, views, visibilityFilter });
