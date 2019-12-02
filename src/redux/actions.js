import { ADD_TODO, TOGGLE_TODO, SET_FILTER, LOGIN, DELETE_ALL_COMPLETE } from "./actionTypes";

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
