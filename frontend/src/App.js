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



  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Retrieve the authentication state from localStorage
    console.log("im here i ran")
    const savedAuthState = localStorage.getItem('isAuthenticated');
    return savedAuthState ? JSON.parse(savedAuthState) : false;
  });

  useEffect(() => {
    // Save the authentication state to localStorage whenever it changes
    console.log("im here")

    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

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