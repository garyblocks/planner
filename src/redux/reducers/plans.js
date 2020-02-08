import {
    ADD_PLAN, TOGGLE_PLAN, LOGIN, DELETE_ALL_COMPLETE,
    SWAP_PLAN, CHANGE_VIEW, CHANGE_DATA
} from "../actionTypes";

const initialState = {
    login: false,
    allIds: [],
    byIds: {}
};

export default function(state = initialState, action) {
    switch (action.type) {

        case ADD_PLAN: {
            const { id, header, content } = action.payload;
            return {
                ...state,
                allIds: [...state.allIds, id],
                byIds: {
                    ...state.byIds,
                    [id]: {
                        header: header,
                        content: content,
                        completed: false,
                        view: 'back',
                        index: state.allIds.length
                    }
                }
            };
        }

        case TOGGLE_PLAN: {
            const { id } = action.payload;
            return {
                ...state,
                byIds: {
                    ...state.byIds,
                    [id]: {
                        ...state.byIds[id],
                        completed: !state.byIds[id].completed
                    }
                }
            };
        }

        case LOGIN: {
            return {
                ...state,
                login: true
            };
        }

        case DELETE_ALL_COMPLETE: {
            return {
                ...state,
                allIds: state.allIds.filter((plan_id, index) => !state.byIds[plan_id].completed)
            };
        }

        case CHANGE_VIEW: {
            const { id, view } = action.payload;
            return {
                ...state,
                byIds: {
                    ...state.byIds,
                    [id]: {
                        ...state.byIds[id],
                        view: view
                    }
                }
            };
        }

        case SWAP_PLAN: {
            const { id1, id2, index1, index2 } = action.payload;
            return {
                ...state,
                byIds: {
                    ...state.byIds,
                    [id1]: {
                        ...state.byIds[id1],
                        index: index2
                    },
                    [id2]: {
                        ...state.byIds[id2],
                        index: index1
                    }
                }
            };
        }

        case CHANGE_DATA: {
            const { id, data } = action.payload;
            return {
                ...state,
                byIds: {
                    ...state.byIds,
                    [id]: {
                        ...state.byIds[id],
                        content: data
                    }
                }
            };
        }

        default:
            return state;
    }
}
