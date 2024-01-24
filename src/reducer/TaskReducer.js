import AllTasks from "../data/tasks.json";

export const initialState = AllTasks.tasks;

export const taskReducer = (state, action) => {
    switch (action.type) {
        case "ADD_&_EDIT_TASK":
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

        case "DELETE_A_TASK":
            return state.filter((t) => t.id !== action.taskId);

        case "DELETE_ALL_TASK":
            state.length = 0;
            return [...state];

        case "FAVORITE":
            return state.map((task) => {
                if (task.id === action.taskId) {
                    return { ...task, isFavorite: !task.isFavorite };
                } else {
                    return task;
                }
            });

        case "SEARCH":
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
