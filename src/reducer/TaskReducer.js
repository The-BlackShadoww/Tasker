import { actionTypes } from "./actionTypes";
import AllTasks from "../data/tasks.json";

export const initialState = AllTasks.tasks;

export const taskReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.ADD_EDIT_TASK:
            if (action.isAdd) {
                return [...state, action.payload];
            } else {
                return state.map((task) => {
                    if (task.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return task;
                    }
                });
            }

        case actionTypes.DELETE_A_TASK:
            return state.filter((t) => t.id !== action.taskId);

        case actionTypes.DELETE_ALL_TASK:
            state.length = 0;
            return [...state];

        case actionTypes.FAVORITE:
            return state.map((task) => {
                if (task.id === action.taskId) {
                    return { ...task, isFavorite: !task.isFavorite };
                } else {
                    return task;
                }
            });

        case actionTypes.SEARCH:
            if (action.value.trim() === "") {
                return initialState;
            } else {
                const filtered = initialState.filter((task) =>
                    task.title
                        .toLowerCase()
                        .includes(action.value.toLowerCase())
                );

                return filtered;
            }

        default:
            return state;
    }
};
