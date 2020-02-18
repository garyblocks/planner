import { 
    ADD_PLAN, TOGGLE_PLAN, SET_FILTER, LOGIN, DELETE_ALL_COMPLETE, SWAP_PLAN,
    CHANGE_VIEW, CHANGE_DATA, ADD_EXERCISE
} from "./actionTypes";

export const addPlan = (id, header, content) => ({
    type: ADD_PLAN,
    payload: { id, header, content }
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

export const changeView = (id, view) => ({
    type: CHANGE_VIEW,
    payload: { id, view }
});

export const changeData = (id, data) => ({
    type: CHANGE_DATA,
    payload: { id, data }
});

export const addExercise = (id, tag, name, unit, freq, active) => ({
    type: ADD_EXERCISE,
    payload: { id, tag, name, unit, freq, active }
});
