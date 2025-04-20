import React from 'react'
import ballbyballBanner from '../../assets/ballbyball/ballbyball.gif'
import '../../components/css/games.css'

export default function BallByBall() {
    return (
        <div>
            <div className="flex justify-between items-center text-white font-bold bg-gradient-to-b from-[#253A48] to-[#2E4A5D] p-2">
                <h1>BallByBall</h1>
                <p>3256412547896554</p>
            </div>
            <div>
                <img src={ballbyballBanner} alt="" />
            </div>
            {/* booking */}
            <div className='lg:mb-16 mb-4'>
                <div className='flex justify-between items-center text-white font-bold bg-gradient-to-b from-[#253A48] to-[#2D485B] p-2'>
                    <h1>Runs</h1>
                    <h1>Min/Max: 100 - 100000</h1>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-2  ">
                    {/** Left Column - 6 Rows */}
                    <div className="col-span-1 border-b border-gray-500 ">
                        <div className="grid grid-cols-2 border-b border-gray-500 ">
                            <h1></h1>
                            <h1 className="text-center text-[16px] font-bolder box-border bg-[#72E3A0] font-bold py-2">Back</h1>
                        </div>
                        {/** Data Rows */}
                        <div className="grid grid-cols-2">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="col-span-2 grid grid-cols-2 items-center border-b border-gray-300 last:border-none uppercase font-bold text-sm"
                                >
                                    <p className='px-2 font-[700] text-[12px]'>{index === 5 ? 6 : index} RUNS</p>
                                    <div className="text-center bg-[#2D5B40]">
                                        <p className="px-1 rounded-lg text-lg">12.4</p>
                                        <p className="px-1 rounded-lg font-normal text-xs">1.3K</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/** Right Column - 2 Rows */}
                    <div className="col-span-1 border-b border-gray-500">
                        <div className="grid grid-cols-2 max-lg:hidden border-b border-gray-500">
                            <h1></h1>
                            <h1 className="text-center text-[16px] bg-[#72E3A0] font-bolder box-border py-2">Back</h1>
                        </div>
                        {/** Data Rows */}
                        <div className="grid lg:grid-cols-2 grid-cols-1">
                            {Array.from({ length: 2 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="col-span-2 grid grid-cols-2 items-center uppercase font-bold border-b border-gray-300 last:border-none"
                                >
                                    <p className='text-[12px] px-2 font-[700]'>{index === 0 ? "Wicket" : "Extra Runs"}</p>
                                    <div className="text-center bg-[#2D5B40]">
                                        <p className="px-1 rounded-lg text-lg">12.4</p>
                                        <p className="px-1 rounded-lg font-normal text-xs">1.3K</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='bg-[#C2D5E4] text-[#3B5160] font-bold text-sm flex py-1 items-center border-t-2 border-[#3B5160]'>
                    <marquee behavior="" direction="">Results are based on stream only. Score board may be different or updated later</marquee>
                </div>


            </div>
            <div className='flex overflow-x-auto scrollbar-hidden gap-x-2 text-white bg-black p-1 items-center lg:mb-36 mb-24'>
                <h2 className='font-extrabold whitespace-nowrap'>Recent Results:</h2>
                <div className='flex  gap-2 '>
                    {
                        Array.from({length:10}).map((_,index)=>(

                            <p className='px-3 py-1 rounded-full font-semibold bg-[#72E3A0] text-black'>0</p>
                        ))
                    }
                  

                  
                </div>
            </div>
        </div>
    )
}
