import { combineReducers } from "redux";
import plans from "./plans";
import exercises from "./exercises";
import views from "./views";
import tags from "./tags";

export default combineReducers({ plans, exercises, views, tags });
