import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Works from "./pages/Works/Works";
import WorkItem from "./components/WorkItem/WorkItem";
import Baholovchilar from "./baholovchilar/Baholovchilar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import View from "./pages/view";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/" exact element={<Login />} />
        <Route path="/work/:id" element={<Works />} />
        <Route path="/workItem" element={<WorkItem />} />
        <Route path="/baholovchi/:id" element={<Baholovchilar />} />
        <Route path="/baho" element={<View />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
