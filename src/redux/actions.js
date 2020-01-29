import { 
    ADD_TODO, TOGGLE_TODO, SET_FILTER, LOGIN, DELETE_ALL_COMPLETE, SWAP_PLAN,
    VIEW_ADD_ID, VIEW_MOVE_ID, VIEW_DELETE_ID, VIEW_SWAP_ID
} from "./actionTypes";

export const addTodo = (id, content) => ({
    type: ADD_TODO,
    payload: { id, content }
});

export const toggleTodo = id => ({
    type: TOGGLE_TODO,
    payload: { id }
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });

export const login = () => ({ type: LOGIN });

export const deleteAllComplete = () => ({ type: DELETE_ALL_COMPLETE });

export const swapPlan = (index1, index2) => ({
    type: SWAP_PLAN,
    payload: {index1, index2}
});

export const viewAddId = (id, view) => ({
    type: VIEW_ADD_ID,
    payload: {id, view}
});

export const viewMoveId = (id, from, to) => ({
    type: VIEW_MOVE_ID,
    payload: {id, from, to}
});

export const viewDeleteId = (id, view) => ({
    type: VIEW_DELETE_ID,
    payload: {id, view}
});

export const viewSwapId = (loc1, loc2, view) => ({
    type: VIEW_SWAP_ID,
    payload: {loc1, loc2, view}
});
