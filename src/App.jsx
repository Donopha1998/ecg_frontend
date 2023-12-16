import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Nav from './nav';
import { Form } from './form';
import ImageUpload  from './image';
import JsonSubmit  from './jsonSubmit';
const App = () => {
  return (
    <Router>
      <Nav/>
      <Routes>
        <Route path='/'  element={<ImageUpload/>} />
        <Route path='/form' element={<Form/>} />
        <Route path='/json' element={<JsonSubmit/>} />
        
      </Routes>
    </Router>
  );
};

export default App;
