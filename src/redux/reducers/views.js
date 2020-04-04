import { EXPAND_VIEW, COLLAPSE_VIEW } from "../actionTypes";

const initialState = {
    viewCfgs: {
        back: {collapse: false},
        front: {collapse: false},
        mon: {collapse: true},
        tue: {collapse: true},
        wed: {collapse: true},
        thr: {collapse: true},
        fri: {collapse: true},
        sat: {collapse: true},
        sun: {collapse: true}
    }
};

export default function(state = initialState, action) {
    switch (action.type) {

        case EXPAND_VIEW: {
            const { view } = action.payload;
            return {
                ...state,
                viewCfgs: {
                    ...state.viewCfgs,
                    [view]: {
                        ...state.viewCfgs[view],
                        collapse: false
                    }
                }
            };
        }

        case COLLAPSE_VIEW: {
            const { view } = action.payload;
            return {
                ...state,
                viewCfgs: {
                    ...state.viewCfgs,
                    [view]: {
                        ...state.viewCfgs[view],
                        collapse: true
                    }
                }
            };
        }

        default:
            return state;
    }
}
