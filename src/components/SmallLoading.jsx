import React from 'react';
import loading from '../assets/Loading.gif';
const SmallLoading = () => {
    return (
        <div>
            <div className="bg-white text-black p-4 flex flex-col items-center justify-center rounded shadow-md">
                <img src={loading} alt="Loading..." className="h-28 w-36 mb-2" />
                <p>Loading...</p>
            </div>
        </div>
    );
}

export default SmallLoading;
