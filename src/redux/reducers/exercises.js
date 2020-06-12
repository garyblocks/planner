import { ADD_EXERCISE, SWAP_EXERCISE, DELETE_EXERCISE} from "../actionTypes";

const initialState = {
    allIds: [],
    byIds: {}
};

export default function(state = initialState, action) {
    switch (action.type) {

        case ADD_EXERCISE: {
            const { id, tag, title } = action.payload;
            console.log(action.payload);
            return {
                ...state,
                allIds: [...state.allIds, id],
                byIds: {
                    ...state.byIds,
                    [id]: {
                        tag: tag,
                        name: title,
                        index: state.allIds.length
                    }
                }
            };
        }

        case DELETE_EXERCISE: {
            const { id } = action.payload;
            return {
                ...state,
                allIds: state.allIds.filter((ex_id, index) => ex_id !== id)
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

        default:
            return state;
    }
}
