import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import TaskBoard from "./components/Tasks/TaskBoard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <>
            <Navbar />
            <Hero />
            <TaskBoard />
            <Footer />
            <ToastContainer />
        </>
    );
}

export default App;
