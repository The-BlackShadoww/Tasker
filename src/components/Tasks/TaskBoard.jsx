import TaskList from "./TaskList";
import { useContext, useState } from "react";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskModal from "./TaskModal";
import { toast } from "react-toastify";
import { TaskContext, TaskToEditContext } from "../../context/TaskContexts";

const TaskBoard = () => {
    const { tasks, dispatch } = useContext(TaskContext);
    const { setTaskToEdit } = useContext(TaskToEditContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    //* add and edit tasks
    const handleAddTask = (newTask, isAdd) => {
        dispatch({
            type: "ADD_&_EDIT_TASK",
            payload: newTask,
            isAdd: isAdd,
        });

        handleModal();
        setTaskToEdit(null);
    };

    //* delete a task
    const handleTaskDelete = (taskId, taskTitle) => {
        if (confirm(`Do you really want to delete ${taskTitle}?`)) {
            dispatch({
                type: "DELETE_A_TASK",
                taskId: taskId,
            });

            toast.error(`${taskTitle} has been deleted!`);
        }
    };

    //* delete all the tasks
    const handleDeleteAllTasks = () => {
        if (confirm("Do you really want to delete all the tasks?")) {
            dispatch({
                type: "DELETE_ALL_TASK",
            });
            toast.error("All tasks have been deleted!");
        }
    };

    //* make a task favorite
    const handelFavorite = (taskId) => {
        dispatch({
            type: "FAVORITE",
            taskId: taskId,
        });
    };

    //* search task
    const handleSearch = (value) => {
        dispatch({
            type: "SEARCH",
            value: value,
        });
    };

    return (
        <>
            {isModalOpen && (
                <TaskModal
                    onModalClose={handleModal}
                    onSubmit={handleAddTask}
                />
            )}
            <section className="mb-20" id="tasks">
                <div className="container">
                    <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                        <div className="mb-14 items-center justify-between sm:flex">
                            <h2 className="text-2xl font-semibold max-sm:mb-4">
                                Your Tasks
                            </h2>
                            <div className="flex items-center space-x-5">
                                <SearchTask onSearch={handleSearch} />
                                <TaskAction
                                    onModalOpen={handleModal}
                                    onDeleteAllTasks={handleDeleteAllTasks}
                                    taskNumber={tasks.length}
                                />
                            </div>
                        </div>
                        <div className="overflow-auto">
                            {tasks.length > 0 ? (
                                <TaskList
                                    tasks={tasks}
                                    onTaskDelete={handleTaskDelete}
                                    onFavorite={handelFavorite}
                                    onClickEdit={handleModal}
                                />
                            ) : (
                                <div className="w-full text-center p-4">
                                    <p className="text-xl font-medium text-red-500">
                                        Task List is empty !
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TaskBoard;

//! previous code
// import TaskList from "./TaskList";
// import { useContext, useState } from "react";
// import SearchTask from "./SearchTask";
// import TaskAction from "./TaskAction";
// import TaskModal from "./TaskModal";
// import { toast } from "react-toastify";
// import { TaskContext, TaskToEditContext } from "../../context/TaskContexts";

// const TaskBoard = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     //* context
//     const { tasks, dispatch } = useContext(TaskContext);
//     const { taskToEdit, setTaskToEdit } = useContext(TaskToEditContext);

//     const handleModalOpen = () => {
//         setIsModalOpen(true);
//     };

//     const handleModalClose = () => {
//         setIsModalOpen(false);
//         setTaskToEdit(null);
//     };

//     //* add and edit tasks
//     const handleAddTask = (newTask, isAdd) => {
//         dispatch({
//             type: "ADD_&_EDIT_TASK",
//             payload: newTask,
//             isAdd: isAdd,
//         });

//         handleModalClose();
//     };

//     //* delete a task
//     const handleTaskDelete = (taskId, taskTitle) => {
//         if (confirm(`Do you really want to delete ${taskTitle}?`)) {
//             dispatch({
//                 type: "DELETE_A_TASK",
//                 taskId: taskId,
//             });

//             toast.error(`${taskTitle} has been deleted!`);
//         }
//     };

//     //* delete all the tasks
//     const handleDeleteAllTasks = () => {
//         if (confirm("Do you really want to delete all the tasks?")) {
//             dispatch({
//                 type: "DELETE_ALL_TASK",
//             });
//             toast.error("All tasks have been deleted!");
//         }
//     };

//     //! Which task to edit?
//     const handleTaskEdit = (task) => {
//         setTaskToEdit(task);
//         setIsModalOpen(true);
//     };

//     //* make a task favorite
//     const handelFavorite = (taskId) => {
//         dispatch({
//             type: "FAVORITE",
//             taskId: taskId,
//         });
//     };

//     //* search task
//     const handleSearch = (value) => {
//         dispatch({
//             type: "SEARCH",
//             value: value,
//         });
//     };

//     return (
//         <>
//             {isModalOpen && (
//                 <TaskModal
//                     onModalClose={handleModalClose}
//                     onSubmit={handleAddTask}
//                     taskToEdit={taskToEdit}
//                 />
//             )}
//             <section className="mb-20" id="tasks">
//                 <div className="container">
//                     <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
//                         <div className="mb-14 items-center justify-between sm:flex">
//                             <h2 className="text-2xl font-semibold max-sm:mb-4">
//                                 Your Tasks
//                             </h2>
//                             <div className="flex items-center space-x-5">
//                                 <SearchTask onSearch={handleSearch} />
//                                 <TaskAction
//                                     onModalOpen={handleModalOpen}
//                                     onDeleteAllTasks={handleDeleteAllTasks}
//                                     taskNumber={tasks.length}
//                                 />
//                             </div>
//                         </div>
//                         <div className="overflow-auto">
//                             {tasks.length > 0 ? (
//                                 <TaskList
//                                     tasks={tasks}
//                                     onTaskDelete={handleTaskDelete}
//                                     onTaskEdit={handleTaskEdit}
//                                     onFavorite={handelFavorite}
//                                 />
//                             ) : (
//                                 <div className="w-full text-center p-4">
//                                     <p className="text-xl font-medium text-red-500">
//                                         Task List is empty !
//                                     </p>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// };

// export default TaskBoard;
