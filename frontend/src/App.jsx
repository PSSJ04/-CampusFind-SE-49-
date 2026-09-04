import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ReportItem from './pages/ReportItem';
import SearchItems from './pages/SearchItems';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<ReportItem />} />
          <Route path="/search" element={<SearchItems />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
