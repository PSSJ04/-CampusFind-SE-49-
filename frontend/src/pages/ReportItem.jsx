import React from 'react';
import ReportForm from '../components/ReportForm';

const ReportItem = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Report an item</h1>
      <p className="mt-1 text-sm text-gray-600">Add enough detail so someone can recognize it.</p>
      <div className="mt-6">
        <ReportForm />
      </div>
    </div>
  );
};

export default ReportItem;
