import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <span>CampusFind — SLIIT lost and found</span>
        <nav className="flex gap-4">
          <Link to="/" className="hover:text-gray-900">Home</Link>
          <Link to="/search" className="hover:text-gray-900">Search</Link>
          <Link to="/report" className="hover:text-gray-900">Report</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
