import { ADD_TAG, DELETE_TAG } from "../actionTypes";

const initialState = {
    tags: []
};

export default function(state = initialState, action) {
    switch (action.type) {

        case ADD_TAG: {
            const { tag, id } = action.payload;
            return {
                ...state,
                tags: [
                    ...state.tags,
                    { tag: tag, id: id }
                ]
            };
        }

        case DELETE_TAG: {
            const { tag } = action.payload;
            return {
                ...state,
                tags: state.tags.filter(item => item.tag !== tag)
            };
        }

        default:
            return state;
    }
}
