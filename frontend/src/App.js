import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Aos from "aos";
import "./App.css";
import Landing from "./components/UI/Landing"
import Login from "./components/Login/Login";
import Journal from "./components/Journal/Journal";
import Register from "./components/Login/Register";

function App() {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Register/>} />
        <Route path="/home" element={<Landing/>}/>
        <Route path="/journal" element={<Journal/>} />
            </Routes>
    </Router>
  );
}

export default App;