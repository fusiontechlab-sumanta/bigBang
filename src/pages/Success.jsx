import React from 'react';
// import { CheckCircle } from 'lucide-react'; // Optional: install `lucide-react` or use an SVG

const Success = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
       <span className="text-green-600 text-5xl">✅</span>
        <h2 className="text-2xl font-bold text-green-700 mt-4">Payment Successful!</h2>
        <p className="mt-2 text-gray-600">Thank you for your payment. Your transaction has been completed successfully.</p>
        <button
          onClick={() => window.location.href = '/'}
          className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Success;
