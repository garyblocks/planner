import { ADD_EXERCISE } from "../actionTypes";

const initialState = {
    allIds: [],
    byIds: {}
};

export default function(state = initialState, action) {
    switch (action.type) {

        case ADD_EXERCISE: {
            const { id, tag, name, unit, freq, active } = action.payload;
            return {
                ...state,
                allIds: [...state.allIds, id],
                byIds: {
                    ...state.byIds,
                    [id]: {
                        tag: tag,
                        name: name,
                        unit: unit,
                        freq: freq,
                        active: active
                    }
                }
            };
        }

        default:
            return state;
    }
}
