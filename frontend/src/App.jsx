import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ReportItem from './pages/ReportItem';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<ReportItem />} />
        <Route path="/search" element={<div className="p-8 text-center">Search Feature Coming Soon (Function 2)</div>} />
      </Routes>
    </Router>
  );
}

export default App;
