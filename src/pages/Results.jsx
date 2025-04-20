import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
function Results({Data}) {
    // console.log(Data?.data?.data?.results,"111111111111111111");
    return (
        <div>
            <div className=' bg-[#112533] text-white p-1'>
           <IoIosArrowBack />
                <p className='uppercase font-semibold '>Casino Result </p>
            </div>
            {/* <div className='grid grid-cols-2 justify-between'>
                <div className='flex gap-2'>
                    <select name="" id="">
                        <option value="">Bet Amount</option>
                    </select>

                </div>

            </div> */}

            {/* result show */}
            <div className='p-6'>
            <div className="grid grid-cols-4 max-md:grid-cols-2 ">

                {/* heading table */}
                <div className='col-span-1 max-md:col-span-1 border border-gray-400 p-2'><p className='font-bold'>Round ID</p></div>
                <div className='col-span-3 max-md:col-span-1 border border-gray-400 p-2 '><p className='font-bold'>Winner</p></div>

            </div>
                {/* table data */}
{
    Data?.data?.data?.results?.map((item,index)=>
            <div key={index} className="grid grid-cols-4 max-md:grid-cols-2 ">
                <div className='col-span-1 max-md:col-span-1 border border-gray-400 p-2'><p>{item?.mid}</p></div>
                <div className='col-span-3 max-md:col-span-1 border border-gray-400 p-2 '><p>{item?.result}</p></div>
            </div>
    )
}

            </div>
        </div>
    )
}

export default Results