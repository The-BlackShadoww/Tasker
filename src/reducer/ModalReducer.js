import { actionTypes } from "./actionTypes";

export const modalReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.ON_CHANGE:
            if (action.name === "tags" && typeof action.value === "string") {
                action.value = action.value.split(",");
            }

            return {
                ...state,
                [action.name]: action.value,
            };

        default:
            return state;
    }
};
