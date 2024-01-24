import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import TaskBoard from "./components/Tasks/TaskBoard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TaskContext, TaskToEditContext } from "./context/TaskContexts";
import { taskReducer, initialState } from "./reducer/TaskReducer";
import { useReducer, useState } from "react";

function App() {
    const [tasks, dispatch] = useReducer(taskReducer, initialState);
    const [taskToEdit, setTaskToEdit] = useState(null);

    return (
        <TaskContext.Provider value={{ tasks, dispatch }}>
            <TaskToEditContext.Provider value={{ taskToEdit, setTaskToEdit }}>
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
