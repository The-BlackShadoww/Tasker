import TaskList from "./TaskList";
import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskModal from "./TaskModal";
import AllTasks from "../../data/tasks.json";
import { toast } from "react-toastify";

const TaskBoard = () => {
    const originalTaskList = AllTasks.tasks;
    const [tasks, setTasks] = useState(originalTaskList);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setTaskToEdit(null);
    };

    const handleAddTask = (newTask, isAdd) => {
        if (isAdd) {
            setTasks([...tasks, newTask]);
        } else {
            setTasks(
                tasks.map((task) => {
                    if (task.id === newTask.id) {
                        return newTask;
                    } else {
                        return task;
                    }
                })
            );
        }

        handleModalClose();
    };

    const handleTaskDelete = (taskId, taskTitle) => {
        if (confirm(`Do you really want to delete ${taskTitle}?`)) {
            const deletedTasks = tasks.filter((t) => t.id !== taskId);
            setTasks(deletedTasks);

            toast.error(`${taskTitle} has been deleted!`);
        }
    };

    const handleDeleteAllTasks = () => {
        if (confirm("Do you really want to delete all the tasks?")) {
            tasks.length = 0;
            setTasks([...tasks]);
            toast.error("All tasks have been deleted!");
        }
    };

    const handleTaskEdit = (task) => {
        setTaskToEdit(task);
        setIsModalOpen(true);
    };

    const handelFavorite = (taskId) => {
        setTasks(
            tasks.map((task) => {
                if (task.id === taskId) {
                    return { ...task, isFavorite: !task.isFavorite };
                } else {
                    return task;
                }
            })
        );
    };

    const handleSearch = (value) => {
        if (value.trim() === "") {
            setTasks(originalTaskList);
        } else {
            const filtered = originalTaskList.filter((task) =>
                task.title.toLowerCase().includes(value.toLowerCase())
            );
            setTasks([...filtered]);
        }
    };

    return (
        <>
            {isModalOpen && (
                <TaskModal
                    onModalClose={handleModalClose}
                    onSubmit={handleAddTask}
                    taskToEdit={taskToEdit}
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
                                    onModalOpen={handleModalOpen}
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
                                    onTaskEdit={handleTaskEdit}
                                    onFavorite={handelFavorite}
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
