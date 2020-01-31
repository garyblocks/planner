import { 
    ADD_PLAN, TOGGLE_PLAN, SET_FILTER, LOGIN, DELETE_ALL_COMPLETE, SWAP_PLAN,
    VIEW_ADD_ID, VIEW_MOVE_ID, VIEW_DELETE_ID, VIEW_SWAP_ID,
    CHANGE_VIEW
} from "./actionTypes";

export const addPlan = (id, content) => ({
    type: ADD_PLAN,
    payload: { id, content }
});

export const togglePlan = id => ({
    type: TOGGLE_PLAN,
    payload: { id }
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });

export const login = () => ({ type: LOGIN });

export const deleteAllComplete = () => ({ type: DELETE_ALL_COMPLETE });

export const swapPlan = (id1, id2, index1, index2) => ({
    type: SWAP_PLAN,
    payload: {id1, id2, index1, index2}
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

export const changeView = ( id, view) => ({
    type: CHANGE_VIEW,
    payload: { id, view }
});
