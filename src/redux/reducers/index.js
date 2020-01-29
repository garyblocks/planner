import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import todos from "./todos";
import views from "./views";

export default combineReducers({ todos, views, visibilityFilter });
