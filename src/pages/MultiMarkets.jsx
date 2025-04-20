// import React from 'react'

// function MultiMarkets() {
//   return (
//     <div className=''>
//       <div className='border border-gray-400 rounded-lg p-2 my-6 bg-white'>
//         <h1 className='py-4 text-center text-gray-400 font-bold'>There are currently no followed multi markets</h1>
//         <div className='bg-gray-400 py-[.3px]'></div>
//         <p className='py-4 text-center font-semibold text-gray-400'>Please add some markets from events</p>
//       </div>
//     </div>
//   )
// }

// export default MultiMarkets

// import React from 'react';

// function MultiMarkets() {
//   return (
//     <div className="flex justify-center items-center px-4 mt-5">
//       <div className="border border-gray-400 rounded-lg p-6 bg-white w-full max-w-lg md:max-w-xl lg:max-w-2xl">
//         <div className="flex items-center space-x-3">
//           <div className="w-6 h-6 bg-gray-300 rounded-full"></div> {/* Placeholder for the icon */}
//           <h1 className="text-center text-gray-400 font-bold text-base md:text-lg">
//             There are currently no followed multi markets.
//           </h1>
//         </div>
//         <div className="border-t border-gray-300 my-4"></div>
//         <p className="text-center font-medium text-gray-400 text-sm md:text-base">
//           Please add some markets from events.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default MultiMarkets;



import React from 'react';

function MultiMarkets() {
  return (
    <div className="flex justify-center items-center px-4 mt-5">
      <div className="border border-gray-400 rounded-lg p-6 bg-white w-full max-w-lg md:max-w-xl lg:max-w-2xl">
        <div className="flex items-center space-x-3 pt-2">
          {/* Dotted Grid Icon */}
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, index) => (
              <span key={index} className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
            ))}
          </div>

          <h1 className="text-center text-gray-400 font-bold text-base md:text-lg">
            There are currently no followed multi markets.
          </h1>
        </div>
        <div className="border-t border-gray-300 my-5"></div>
        <p className="text-center font-medium text-gray-400 text-sm md:text-base">
          Please add some markets from events.
        </p>
      </div>
    </div>
  );
}

export default MultiMarkets;





