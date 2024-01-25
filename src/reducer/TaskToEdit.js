import { actionTypes } from "./actionTypes";
export const taskToEdit = null;

export const taskToEditReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.TASK_TO_EDIT:
            return action.payload;

        default:
            return state;
    }
};
