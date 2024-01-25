import { useReducer } from "react";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import TaskBoard from "./components/Tasks/TaskBoard";
import { TaskContext, TaskToEditContext } from "./context/TaskContexts";
import { taskReducer, initialState } from "./reducer/TaskReducer";
import { taskToEditReducer, taskToEdit } from "./reducer/TaskToEdit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const [tasks, dispatch] = useReducer(taskReducer, initialState);
    const [task, editDispatch] = useReducer(taskToEditReducer, taskToEdit);

    return (
        <TaskContext.Provider value={{ tasks, dispatch }}>
            <TaskToEditContext.Provider value={{ task, editDispatch }}>
                <Navbar />
                <Hero />
                <TaskBoard />
                <Footer />
                <ToastContainer />
            </TaskToEditContext.Provider>
        </TaskContext.Provider>
    );
}

export default App;
