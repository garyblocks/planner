export const VISIBILITY_FILTERS = {
    ALL: "all",
    COMPLETED: "completed",
    INCOMPLETE: "incomplete"
};


export const API_URL = process.env.NODE_ENV === "production" ? 'http://wangjiayu.ninja/' : 'http://localhost:5000/';


export const BASE_URL = process.env.NODE_ENV === "production" ? 'apps/planner/' : '/';
