import { ADD_TODO, TOGGLE_TODO, LOGIN, DELETE_ALL_COMPLETE } from "../actionTypes";

const initialState = {
    login: false,
    allIds: [],
    byIds: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { id, content } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            content,
            completed: false
          }
        }
      };
    }
    case TOGGLE_TODO: {
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
    default:
      return state;
  }
}
