import {
    VIEW_ADD_ID, VIEW_MOVE_ID, VIEW_DELETE_ID, VIEW_SWAP_ID
} from "../actionTypes";

const initialState = {
    back: [],
    front: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case VIEW_ADD_ID: {
      const { id, view } = action.payload;
      return {
        ...state,
        [view]: [...state[view], id]
      };
    }
    case VIEW_MOVE_ID: {
      const { id, from, to } = action.payload;
      return {
        ...state,
        [from]: state[from].filter(item => item !== id),
        [to]: [...state[to], id]
      };
    }
    case VIEW_DELETE_ID: {
      const { id, view } = action.payload;
      return {
        ...state,
        [view]: state[view].filter(item => item !== id),
      };
    }
    case VIEW_SWAP_ID: {
        const { loc1, loc2, view } = action.payload;
        const id1 = state[view][loc1];
        const id2 = state[view][loc2];
        return {
            ...state,
            [view]: state[view].map((id, idx) => {
                if (idx === loc1) {
                    return id2;
                } else if (idx === loc2) {
                    return id1;
                }
                return id;
            })
        };
    }
    default:
      return state;
  }
}
