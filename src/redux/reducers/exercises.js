import { ADD_EXERCISE, SWAP_EXERCISE, ACTIVATE_EXERCISE } from "../actionTypes";

const initialState = {
    allIds: [],
    byIds: {}
};

export default function(state = initialState, action) {
    switch (action.type) {

        case ADD_EXERCISE: {
            const { id, tag, title, level, frequency } = action.payload;
            console.log(action.payload);
            return {
                ...state,
                allIds: [...state.allIds, id],
                byIds: {
                    ...state.byIds,
                    [id]: {
                        tag: tag,
                        name: title,
                        level: level,
                        freq: frequency,
                        index: state.allIds.length
                    }
                }
            };
        }

        case SWAP_EXERCISE: {
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

        case ACTIVATE_EXERCISE: {
            const { id } = action.payload;
            return {
                ...state,
                byIds: {
                    ...state.byIds,
                    [id]: {
                        ...state.byIds[id],
                        active: true
                    }
                }
            };
        }

        default:
            return state;
    }
}
