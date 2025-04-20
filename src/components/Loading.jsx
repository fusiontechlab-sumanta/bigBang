import React from 'react';
import loading from '../assets/Loading.gif';

function Loading() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white text-black p-4 flex flex-col items-center justify-center rounded shadow-md">
        <img src={loading} alt="Loading..." className="h-28 w-36 mb-2" />
        <p>Loading...</p>
      </div>
    </div>
  );
}

export default Loading;
