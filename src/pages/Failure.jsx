import React from 'react';
// import { XCircle } from 'lucide-react'; // Optional: install lucide-react or replace with emoji/SVG

const Failure = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        <span className="text-red-600 text-5xl">❌</span>
        <h2 className="text-2xl font-bold text-red-700 mt-4">Payment Failed</h2>
        <p className="mt-2 text-gray-600">Oops! Something went wrong with your payment. Please try again or contact support.</p>
        <button
          onClick={() => window.location.href = '/'}
          className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Failure;
