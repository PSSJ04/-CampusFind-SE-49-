import React from 'react';
import ReportForm from '../components/ReportForm';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ReportItem = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-indigo-400 mb-6 transition-colors duration-300"
        >
          <ArrowLeft size={16} className="mr-1.5" />
          Back to Home
        </Link>
        <ReportForm />
      </div>
    </div>
  );
};

export default ReportItem;
