import { toast } from "react-toastify";

export const actionTypes = {
    ON_CHANGE: "ON_CHANGE",
    ON_SUBMIT: "ON_SUBMIT",
    RESET_TASK: "RESET_TASK",
};

let id = 0;
export const modalReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.ON_CHANGE:
            // console.log(state);

            const name = action.event.target.name;
            let value = action.event.target.value;

            if (name === "tags") {
                value = value.split(",");
            }

            return {
                ...state,
                id: id + 1,
                [name]: value,
            };

        case actionTypes.ON_SUBMIT:
            if (
                !action.title &&
                !action.description &&
                !action.priority &&
                action.tags.length === 0
            ) {
                toast.warning("Please fill the form first");
            } else if (!action.title) {
                toast.warning("Please enter a title");
            } else if (!action.description) {
                toast.warning("Please enter a description.");
            } else if (action.priority === "") {
                toast.warning("Please select a priority.");
            } else if (
                action.tags.length === 0 ||
                action.tags[0].trim() === ""
            ) {
                toast.warning("Please enter at least one tag.");
            } else {
                toast.success(
                    `${action.title} has been ${
                        action.isAdd ? "added" : "edited"
                    } to the task list.`
                );

                action.onSubmit(state, action.isAdd);
            }
            return state;

        default:
            return state;
    }
};
