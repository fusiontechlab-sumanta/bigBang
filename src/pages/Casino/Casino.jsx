import React from 'react'
import cardback from '../../assets/cards/back.png'
function Casino() {
    return (
        <div>

            {/* iframe live video */}
            <div className='relative'>
                <iframe
                    className='w-full bg-black'
                    height="315"
                    src={""}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

                // onEnded={handleVideoEnded}
                ></iframe>


                <div className={`absolute top-0 bg-gray-500 p-1 bg-opacity-50 text-white text-xs  `}>
                    <p className='text-xs'>Rid: 5626521656559885</p>

                    <span>Player1</span>
                    {/* card1 img */}
                    <div className='flex gap-1'>
                        {
                            Array.from({ length: 3 }).map((_, ind) => (

                                <img src={cardback} alt="" className='w-7 h-10' />
                            ))
                        }


                    </div>
                    <span>Player2</span>
                    {/* card2 img */}
                    <div className='flex gap-1'>
                    {
                            Array.from({ length: 3 }).map((_, ind) => (

                                <img src={cardback} alt="" className='w-7 h-10' />
                            ))
                        }
                    </div>

                </div>

                {/* timer */}
                <div className='absolute flex gap-1 top-1 right-2 text-2xl font-extrabold  '>
                    <span className='text-white bg-[#000] border-2 text-center border-green-500 rounded-full px-3 py-1 '>7</span>
                    {/* <span className='text-white bg-[#112533] px-2'>2</span> */}
                </div>


            </div>
            {/* booking winner */}
            <div>
                <div className="flex text-white font-semibold p-1 justify-between bg-gradient-to-t from-[#253A49] to-[#253A49]">
                    <h1>WINNER</h1>
                    <p>Min/Max: 100-50000</p>
                </div>
                <div>
                    <div className="grid grid-cols-12 border-b border-gray-300">
                        <div className="col-span-10 px-1">Player A</div>
                        <div className="lg:col-span-1 col-span-2 bg-[#B8DDF8] text-center">
                            <p className=' px-1 rounded-lg text-lg'>56.6</p>
                            <p className=' px-1 rounded-lg font-normal text-xs'>1.3K</p>
                        </div>

                    </div>
                    <div className="grid grid-cols-12 border-b border-gray-300">
                        <div className="col-span-10 px-1">Player B</div>
                        <div className="lg:col-span-1 col-span-2 bg-[#B8DDF8] text-center">
                            <p className=' px-1 rounded-lg text-lg'>56.6</p>
                            <p className=' px-1 rounded-lg font-normal text-xs'>1.3K</p>
                        </div>
                    </div>

                </div>
     
                <div className='flex overflow-x-auto scrollbar-hidden gap-x-2 text-white bg-black p-1 items-center lg:mb-36 mb-24'>
                    <h2 className='font-extrabold whitespace-nowrap'>Recent Results:</h2>
                    <div className='flex  gap-2 '>
                        {
                            Array.from({ length: 10 }).map((_, index) => (

                                <p className={`${index % 2 == 0 ? 'bg-[#F9A9BA]' : 'bg-[#72E3A0]'} px-3 py-1 rounded-full font-semibold  text-black`}>A</p>
                            ))
                        }



                    </div>
                </div>
            </div>
        </div >
    )
}

export default Casino
