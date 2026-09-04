import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ReportItem from './pages/ReportItem';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<ReportItem />} />
          <Route
            path="/search"
            element={
              <div className="pt-24 flex items-center justify-center min-h-screen">
                <div className="glass-card rounded-2xl p-12 text-center max-w-md">
                  <p className="text-slate-400 text-lg">Search feature coming soon</p>
                  <p className="text-slate-600 text-sm mt-2">This will be implemented by another team member.</p>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
