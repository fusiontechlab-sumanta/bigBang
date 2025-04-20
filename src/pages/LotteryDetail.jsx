import React from 'react'
import { BiInfoCircle } from 'react-icons/bi'

function LotteryDetail() {
    return (
        <div>
            <div className='relative'>
                <h1 className='p-1 text-white text-sm font-bold items-center px-2 bg-gradient-to-t uppercase flex gap-1 from-[#253A49] to-[#2F4B5E]'>single figure [ank] close (bahar) <BiInfoCircle /></h1>
                <div className='grid grid-cols-10 gap-1 relative'>
                    {Array.from({ length: 100 }).map((_, index) => (
                        <p className={`bg-[#72BBEF] ${index % 2 == 0 ? 'bg-[#72BBEF]' : 'bg-[#FAA9BA] '} py-1 px-3 text-center`}>{index <= 9 ? `0${index}` : index}</p>

                    ))}

                    <div className="absolute bg-slate-100 bg-opacity-45 border border-red-600 flex items-center justify-center h-full w-full">
                        <h1 className='uppercase text-3xl text-red-600 font-extrabold'>Suspended</h1>

                    </div>
                </div>
            </div>
            <div className='relative my-2'>
                <h1 className='p-1 text-white text-sm font-bold items-center px-2 bg-gradient-to-t uppercase flex gap-1 from-[#253A49] to-[#2F4B5E]'>single figure [ank] close (bahar)<BiInfoCircle /></h1>
                <div className='grid lg:grid-cols-10 grid-cols-5 gap-1 relative'>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <p className={`bg-[#72BBEF] ${index % 2 == 0 ? 'bg-[#72BBEF]' : 'bg-[#FAA9BA] '} py-1 px-3 text-center`}>{(index+1)== 10 ? 0 : (index+1)}</p>

                    ))}

                    <div className="absolute bg-slate-100 bg-opacity-45 border border-red-600 flex items-center justify-center h-full w-full">
                        <h1 className='uppercase text-3xl text-red-600 font-extrabold'>Suspended</h1>

                    </div>
                </div>
            </div>


        </div>
    )
}

export default LotteryDetail
