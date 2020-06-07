import { 
    ADD_PLAN, TOGGLE_PLAN, SET_FILTER, LOGIN, DELETE_ALL_COMPLETE, SWAP_PLAN, DELETE_PLAN,
    CHANGE_VIEW, CHANGE_DATA, ADD_EXERCISE, SWAP_EXERCISE, ACTIVATE_EXERCISE,
    EXPAND_VIEW, COLLAPSE_VIEW,
    ADD_TAG, DELETE_TAG
} from "./actionTypes";

export const addPlan = (id, tag, title, content, view, source) => ({
    type: ADD_PLAN,
    payload: { id, tag, title, content, view, source }
});

export const togglePlan = id => ({
    type: TOGGLE_PLAN,
    payload: { id }
});

export const deletePlan = id => ({
    type: DELETE_PLAN,
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

export const addExercise = (id, tag, title, level, frequency) => ({
    type: ADD_EXERCISE,
    payload: { id, tag, title, level, frequency }
});

export const swapExercise = (id1, id2, index1, index2) => ({
    type: SWAP_EXERCISE,
    payload: {id1, id2, index1, index2}
});

export const activateExercise = id => ({
    type: ACTIVATE_EXERCISE,
    payload: { id }
});

export const expandView = view => ({
    type: EXPAND_VIEW,
    payload: { view }
});

export const collapseView = view => ({
    type: COLLAPSE_VIEW,
    payload: { view }
});

export const addTag = (tag, id) => ({
    type: ADD_TAG,
    payload: { tag, id }
});

export const deleteTag = tag => ({
    type: DELETE_TAG,
    payload: { tag }
});
