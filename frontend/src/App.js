import { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Aos from "aos";
import "./App.css";
import Landing from "./components/UI/Landing";
import Login from "./components/Login/Login";
import Journal from "./components/Journal/Journal";
import Register from "./components/Login/Register";
import RefreshHandler from "./RefreshHandler";
import TextEditor from "./components/Document/TextEditor"
function App() {
  useEffect(() => {
    Aos.init();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="App">
        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Register />} />
  <Route path="/home" element={<PrivateRoute element={<Landing />} />} />
  <Route path="/journal" element={<PrivateRoute element={<Journal />} />} />
  <Route path="/document/:id" element={<TextEditor />}/>

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;