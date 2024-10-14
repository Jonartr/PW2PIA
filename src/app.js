import React, { useState } from 'react';
import './app.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import Misc from
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from  './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './pages/Menu';
import MyComponent from './pages/Conexion';

function App() {
return (
 
  <Router>
    <Navbar/>
  <Routes>
    <Route path="/" element={<Home/>} />
    {/* Otras rutas aquí */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/Conexion" element={<MyComponent />} />
  </Routes>
</Router>


  
  )
}

export default App;
