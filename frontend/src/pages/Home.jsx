import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="py-4 sm:py-10">
      <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
        Lost something? Found something?
      </h1>
      <p className="mt-3 max-w-xl text-gray-600">
        CampusFind is a simple board for SLIIT students to report lost or found items and help them get back to their owners.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link to="/report" className="btn btn-primary">Report an item</Link>
        <Link to="/search" className="btn btn-outline">Search listings</Link>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-3">
        <li className="card p-4">
          <h2 className="font-semibold">1. Report</h2>
          <p className="mt-1 text-sm text-gray-600">Post a lost or found item with location and contact details.</p>
        </li>
        <li className="card p-4">
          <h2 className="font-semibold">2. Search</h2>
          <p className="mt-1 text-sm text-gray-600">Filter listings by type, place, or category.</p>
        </li>
        <li className="card p-4">
          <h2 className="font-semibold">3. Resolve</h2>
          <p className="mt-1 text-sm text-gray-600">Contact the reporter and mark the item as returned or claimed.</p>
        </li>
      </ul>
    </section>
  );
};

export default Home;
