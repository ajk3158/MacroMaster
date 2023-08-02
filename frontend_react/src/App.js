import React from 'react';
import { Home, Calculator } from './container';
import { Navbar } from './components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <Router>
    <div className="app">
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/calculator" element={<Calculator/>} />
      </Routes>

    </div>
    </Router>
  );
}

export default App;
