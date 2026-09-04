import React from 'react';
import ReportForm from '../components/ReportForm';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ReportItem = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 mb-6">
          <ArrowLeft size={16} className="mr-1" />
          Back to Home
        </Link>
        <ReportForm />
      </div>
    </div>
  );
};

export default ReportItem;
