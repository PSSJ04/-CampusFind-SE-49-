import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { path: '/', label: 'Home' },
  { path: '/search', label: 'Search' },
  { path: '/report', label: 'Report' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="text-lg font-semibold text-gray-900">
          CampusFind
        </Link>

        <nav className="hidden gap-6 sm:flex">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={location.pathname === link.path ? 'font-semibold text-blue-600' : 'text-gray-600 hover:text-gray-900'}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="rounded border border-gray-300 px-3 py-1 text-sm sm:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          Menu
        </button>
      </div>

      {open && (
        <nav className="border-t border-gray-200 px-4 py-2 sm:hidden">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`block py-2 ${location.pathname === link.path ? 'font-semibold text-blue-600' : 'text-gray-600'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
