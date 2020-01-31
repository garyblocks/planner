import { VISIBILITY_FILTERS } from "../constants";

export const getPlanState = store => store.plans;

export const getTodoList = store =>
    getPlanState(store) ? getPlanState(store).allIds : [];

export const getTodoById = (store, id) =>
    getPlanState(store) ? { ...getPlanState(store).byIds[id], id } : {};

export const getTodos = store =>
     getTodoList(store).map(id => getTodoById(store, id));

export const getTodosByVisibilityFilter = (store, visibilityFilter) => {
    const allTodos = getTodos(store);
    switch (visibilityFilter) {
        case VISIBILITY_FILTERS.COMPLETED:
            return allTodos.filter(todo => todo.completed);
        case VISIBILITY_FILTERS.INCOMPLETE:
            return allTodos.filter(todo => !todo.completed);
        case VISIBILITY_FILTERS.ALL:
        default:
            return allTodos;
    }
}

export const getLogin = store => getPlanState(store).login;


export const getPlanById = (store, id) =>
    getPlanState(store) ? { ...getPlanState(store).byIds[id], id } : {};


export const getPlans = store =>
     getTodoList(store).map(id => getTodoById(store, id));

export const getPlansByView = (store, view) => {
    const allPlans = getPlans(store);
    var viewPlans = allPlans.filter(plan => plan.view === view);
    viewPlans.sort(function(a, b){
        return a.index - b.index;
    });
    return viewPlans
}
