const TaskAction = ({ onModalOpen, onDeleteAllTasks, taskNumber }) => {
    return (
        <>
            <button
                onClick={onModalOpen}
                className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold"
            >
                Add Task
            </button>
            <button
                onClick={onDeleteAllTasks}
                disabled={taskNumber === 0}
                className={`rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold ${
                    taskNumber === 0 ? "opacity-50" : "opacity-100"
                }`}
            >
                Delete All
            </button>
        </>
    );
};

export default TaskAction;
