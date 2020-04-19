export const getPlanState = store => store.plans;
export const getViewState = store => store.views;
export const getExerciseState = store => store.exercises;
export const getTagState = store => store.tags;

export const getPlanList = store =>
    getPlanState(store) ? getPlanState(store).allIds : [];

export const getTodoById = (store, id) =>
    getPlanState(store) ? { ...getPlanState(store).byIds[id], id } : {};

export const getLogin = store => getPlanState(store).login;

export const getTags = store => getTagState(store).tags;

export const getPlanById = (store, id) =>
    getPlanState(store) ? { ...getPlanState(store).byIds[id], id } : {};

export const getPlans = store =>
     getPlanList(store).map(id => getPlanById(store, id));

export const getPlansByView = (store, view) => {
    const allPlans = getPlans(store);
    var viewPlans = allPlans.filter(plan => plan.view === view);
    viewPlans.sort(function(a, b){
        return a.index - b.index;
    });
    return viewPlans;
}

export const getExerciseList = store =>
    getExerciseState(store) ? getExerciseState(store).allIds : [];

export const getExerciseById = (store, id) =>
    getExerciseState(store) ? { ...getExerciseState(store).byIds[id], id } : {};

export const getExercises = store => {
    const allExs = getExerciseList(store).map(id => getExerciseById(store, id));
    allExs.sort(function(a, b){
        return a.index - b.index;
    });
    return allExs;
}

export const getViewCfg = (store, view) =>
    getViewState(store) ? getViewState(store).viewCfgs[view] : {};
