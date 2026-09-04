import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ReportItem from './pages/ReportItem';
import SearchItems from './pages/SearchItems';
import './index.css';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<ReportItem />} />
            <Route path="/search" element={<SearchItems />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
