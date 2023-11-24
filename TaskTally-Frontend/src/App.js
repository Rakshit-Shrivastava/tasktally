import './App.css';
import React, { useState } from "react";
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import About from './Components/About';
import TaskSate from './Context/task/TaskState';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import Signup from './Components/Signup';
import Alert from './Components/Alert';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
};
  return (
    <div className="App">
      <TaskSate>
      <Router>
        <Navbar />
        <Alert alert={alert}  id='container'/>
        <div className="container">
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/login' element={<Login showAlert={showAlert}/>} />
          <Route exact path='/signup' element={<Signup showAlert={showAlert}/>} />
        </Routes>
        </div>
      </Router>
      </TaskSate>
    </div>
  );
}

export default App;
