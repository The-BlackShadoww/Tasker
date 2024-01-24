import { useContext, useReducer, useState } from "react";
import { TaskToEditContext } from "../../context/TaskContexts";
import { modalReducer, actionTypes } from "../../reducer/ModalReducer";

const TaskModal = ({ onSubmit, onModalClose }) => {
    const { taskToEdit, setTaskToEdit } = useContext(TaskToEditContext);
    const [isAdd, setIsAdd] = useState(Object.is(taskToEdit, null));

    //* initial state
    const initialState = useState(
        taskToEdit || {
            id: crypto.randomUUID(),
            title: "",
            description: "",
            tags: [],
            priority: "",
            isFavorite: false,
        }
    );

    const [task, dispatch] = useReducer(modalReducer, initialState);

    const { title, description, tags, priority, isFavorite } = task;

    //* handle input change
    const handleChange = (e) => {
        dispatch({
            type: actionTypes.ON_CHANGE,
            event: e,
        });
    };

    //* submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch({
            type: actionTypes.ON_SUBMIT,
            title: title,
            description: description,
            tags: tags,
            priority: priority,
            isFavorite: isFavorite,
            isAdd: isAdd,
            onSubmit: onSubmit,
        });
    };
    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     if (!title && !description && !priority && tags.length === 0) {
    //         toast.warning("Please fill the form first");
    //     } else if (!title) {
    //         toast.warning("Please enter a title");
    //     } else if (!description) {
    //         toast.warning("Please enter a description.");
    //     } else if (priority === "") {
    //         toast.warning("Please select a priority.");
    //     } else if (tags.length === 0 || tags[0].trim() === "") {
    //         toast.warning("Please enter at least one tag.");
    //     } else {
    //         toast.success(
    //             `${task.title} has been ${
    //                 isAdd ? "added" : "edited"
    //             } to the task list.`
    //         );

    //         onSubmit(task, isAdd);
    //     }
    // };

    const handleTask = () => {
        setTaskToEdit(null);
        onModalClose();
    };

    return (
        <>
            <div className="bg-black bg-opacity-70 h-full w-full z-10 absolute top-0 left-0"></div>
            <form className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11 z-10 absolute top-1/4 left-1/3">
                <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
                    {isAdd ? "Add New Task" : "Edit Task"}
                </h2>
                {/* inputs */}
                <div className="space-y-9 text-white lg:space-y-10">
                    {/* title */}
                    <div className="space-y-2 lg:space-y-3">
                        <label htmlFor="title">Title</label>
                        <input
                            className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={handleChange}
                            // required
                        />
                    </div>
                    {/* description */}
                    <div className="space-y-2 lg:space-y-3">
                        <label htmlFor="description">Description</label>
                        <textarea
                            className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
                            type="text"
                            name="description"
                            id="description"
                            value={description}
                            // required
                            onChange={handleChange}
                            defaultValue={""}
                        />
                    </div>
                    {/* input group */}
                    <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
                        {/* tags */}
                        <div className="space-y-2 lg:space-y-3">
                            <label htmlFor="tags">Tags</label>
                            <input
                                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                                type="text"
                                name="tags"
                                id="tags"
                                value={tags}
                                onChange={handleChange}
                                // required
                            />
                        </div>
                        {/* priority */}
                        <div className="space-y-2 lg:space-y-3">
                            <label htmlFor="priority">Priority</label>
                            <select
                                className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                                name="priority"
                                id="priority"
                                value={priority}
                                onChange={handleChange}
                                // required
                            >
                                <option value="">Select Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* inputs ends */}
                <div className="mt-16 flex justify-between lg:mt-20">
                    <button
                        className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80"
                        onClick={handleTask}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
                        onClick={handleSubmit}
                    >
                        {isAdd ? "Create New Task" : "Edit Task"}
                    </button>
                </div>
            </form>
        </>
    );
};

export default TaskModal;

//? {{{{Previous code}}}}
// import { useContext, useState } from "react";
// import { toast } from "react-toastify";
// import { TaskToEditContext } from "../../context/TaskContexts";

// const TaskModal = ({ onSubmit, onModalClose }) => {
//     const { taskToEdit, setTaskToEdit } = useContext(TaskToEditContext);
//     const [isAdd, setIsAdd] = useState(Object.is(taskToEdit, null));

//     const [task, setTask] = useState(
//         taskToEdit || {
//             id: crypto.randomUUID(),
//             title: "",
//             description: "",
//             tags: [],
//             priority: "",
//             isFavorite: false,
//         }
//     );

//     const { title, description, tags, priority } = task;

//     const handleTask = () => {
//         setTaskToEdit(null);
//         onModalClose();
//     };

//     const handleChange = (e) => {
//         const name = e.target.name;
//         let value = e.target.value;

//         if (name === "tags") {
//             value = value.split(",");
//         }

//         setTask({
//             ...task,
//             [name]: value,
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (!title && !description && !priority && tags.length === 0) {
//             toast.warning("Please fill the form first");
//         } else if (!title) {
//             toast.warning("Please enter a title");
//         } else if (!description) {
//             toast.warning("Please enter a description.");
//         } else if (priority === "") {
//             toast.warning("Please select a priority.");
//         } else if (tags.length === 0 || tags[0].trim() === "") {
//             toast.warning("Please enter at least one tag.");
//         } else {
//             toast.success(
//                 `${task.title} has been ${
//                     isAdd ? "added" : "edited"
//                 } to the task list.`
//             );

//             onSubmit(task, isAdd);
//         }
//     };

//     return (
//         <>
//             <div className="bg-black bg-opacity-70 h-full w-full z-10 absolute top-0 left-0"></div>
//             <form className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11 z-10 absolute top-1/4 left-1/3">
//                 <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
//                     {isAdd ? "Add New Task" : "Edit Task"}
//                 </h2>
//                 {/* inputs */}
//                 <div className="space-y-9 text-white lg:space-y-10">
//                     {/* title */}
//                     <div className="space-y-2 lg:space-y-3">
//                         <label htmlFor="title">Title</label>
//                         <input
//                             className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
//                             type="text"
//                             name="title"
//                             id="title"
//                             value={title}
//                             onChange={handleChange}
//                             // required
//                         />
//                     </div>
//                     {/* description */}
//                     <div className="space-y-2 lg:space-y-3">
//                         <label htmlFor="description">Description</label>
//                         <textarea
//                             className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
//                             type="text"
//                             name="description"
//                             id="description"
//                             value={description}
//                             // required
//                             onChange={handleChange}
//                             defaultValue={""}
//                         />
//                     </div>
//                     {/* input group */}
//                     <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
//                         {/* tags */}
//                         <div className="space-y-2 lg:space-y-3">
//                             <label htmlFor="tags">Tags</label>
//                             <input
//                                 className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
//                                 type="text"
//                                 name="tags"
//                                 id="tags"
//                                 value={tags}
//                                 onChange={handleChange}
//                                 // required
//                             />
//                         </div>
//                         {/* priority */}
//                         <div className="space-y-2 lg:space-y-3">
//                             <label htmlFor="priority">Priority</label>
//                             <select
//                                 className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
//                                 name="priority"
//                                 id="priority"
//                                 value={priority}
//                                 onChange={handleChange}
//                                 // required
//                             >
//                                 <option value="">Select Priority</option>
//                                 <option value="low">Low</option>
//                                 <option value="medium">Medium</option>
//                                 <option value="high">High</option>
//                             </select>
//                         </div>
//                     </div>
//                 </div>
//                 {/* inputs ends */}
//                 <div className="mt-16 flex justify-between lg:mt-20">
//                     <button
//                         className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80"
//                         onClick={handleTask}
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         type="submit"
//                         className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
//                         onClick={handleSubmit}
//                     >
//                         {isAdd ? "Create New Task" : "Edit Task"}
//                     </button>
//                 </div>
//             </form>
//         </>
//     );
// };

// export default TaskModal;
