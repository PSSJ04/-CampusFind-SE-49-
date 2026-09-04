import React from 'react';
import { Link } from 'react-router-dom';
import { Search, PlusCircle } from 'lucide-react';

const Hero = () => {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              CampusFind for SLIIT
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Losing valuables across our large campus can be incredibly stressful.
              With no reliable digital system, things like Student IDs, wallets, and lecture notes often go untracked.
              <strong> CampusFind</strong> solves this by providing a centralized platform to report, track, and recover your lost property seamlessly.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/report"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center gap-2"
              >
                <PlusCircle size={20} />
                Report an Item
              </Link>
              <Link
                to="/search"
                className="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-2"
              >
                <Search size={20} />
                Search Database <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
