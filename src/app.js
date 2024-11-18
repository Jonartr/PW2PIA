import React, { useState } from 'react';
import './app.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import Misc from
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Navbar from './pages/Components/Menu';
import Login from './pages/Users/Login';
import Register from './pages/Users/Register';

import MyComponent from './pages/Pruebas/Conexion';

import Nuevo from './pages/Manga/Nuevos';
import Destacados from './pages/Manga/Destacados';
import Incoming from './pages/Manga/Incoming';
import MangaViewer from './pages/Manga/MangaViewer';
import SelectorChapter from './pages/Manga/ChapterSelector';

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
    <Route path="/New" element = {<Nuevo/>}/>
    <Route path="/Outstanding" element = {<Destacados/>}/>
    <Route path="/Incoming" element = {<Incoming/>}/>
    <Route path="/Viewer" element = {<MangaViewer/>}/>
    <Route path="/Selector" element = {<SelectorChapter/>}/>

  </Routes>
</Router>


  )
}

export default App;
