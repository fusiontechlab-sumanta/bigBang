import React from 'react'
import Footer from '../components/Footer'
import { MdOutlinePushPin } from 'react-icons/md'
import Carousel from '../components/Carousel'
import Marque from '../components/Marque'
import SportType from '../components/SportType'

function Basketball() {
    const basketballData = [
        {
            name: "Cholet Basket v Le Mans Sarthe Basket",
            // s:true,
            // bm:false,
            // f:false,
            // tv:false,
            playani: false,
        },
        {
            name: "Le Portal v Sluc Nancy Basket",
            // s:false,
            // bm:true,
            // f:false,
            // tv:false,
            playani: false,
        },
        {
            name: "Basketball Lowen Braunschweig v EWE Baskets",
            // s:true,
            // bm:true,
            // f:true,
            // tv:true,
            playani: false,
        },


    ]
    return (
        <div>
            <Marque />    
            {/* carousel */}
            <Carousel />
            {/*end carousel */}

            {/* games type */}
            <SportType />

            {/* heading */}
            <div className='  bg-gradient-to-b from-[#96dd5c] to-[#486622]'>
                <p className='px-2 py-1  font-bold text-[14px]'>Highlights</p>
            </div>
            {/* end heading */}

            {/* table */}
            <div className="border border-b-0 mb-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-black bg-gray-300 uppercase ">
                        <tr>
                            <th scope="col" className="px-6 py-0 text-center">

                            </th>
                            <th scope="col" className="px-6 py-0 text-center">

                            </th>
                            <th scope="col" className="max-lg:hidden px-6 py-1 text-center">
                                1
                            </th>
                            <th scope="col" className="max-lg:hidden px-6 py-1 text-center">
                                x
                            </th>
                            <th scope="col" className="max-lg:hidden px-6 py-1 text-center">
                                2
                            </th>
                            <th scope="col" className="px-6 py-0 text-center">

                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            basketballData.map((item, index) => (
                                <tr key={index} className="bg-white border-b">
                                    <td className="px-2 py-2 text-nowrap text-center">
                                        <a className='flex gap-x-2 flex-wrap  text-[#3a8dc5] font-semibold cursor-pointer' >
                                            {item.name}
                                            {/* <MdOutlineWatchLater  className='mx-2 mt-1 text-lime-400 font-extrabold' /> */}
                                            <span className={`${item.playani ? "animate-color-change " : "hidden "}text-gray-400 font-bold`}>In Play</span>
                                            <span className='text-gray-400 font-normal'>07/12/23 07:58 AM</span>
                                        </a>
                                    </td>
                                    {/* <td className=" text-white italic font-semibold text-center">
                                                      <div className='flex gap-x-1'>
                                                          <p className='bg-[#1F345F] px-1 rounded-lg'>BM</p>
                                                          <p className='bg-[#258293] px-1 rounded-lg'>F</p>
                                                      </div>
                                                  </td> */}
                                    <td className="text-black max-lg:hidden px-2 py-2 text-center font-semibold"><span className='px-4 py-1 bg-[#72BBEF]'>4.4</span><span className='px-4  py-1 bg-[#FAA9BA]'>4.6</span></td>
                                    <td className="text-black max-lg:hidden px-2 py-2 text-center font-semibold"><span className='px-4 py-1 bg-[#72BBEF]'>4.4</span><span className='px-4  py-1 bg-[#FAA9BA]'>4.6</span></td>
                                    <td className="text-black max-lg:hidden px-2 py-2 text-center font-semibold"><span className='px-4 py-1 bg-[#72BBEF]'>4.4</span><span className='px-4  py-1 bg-[#FAA9BA]'>4.6</span></td>


                                    <td className="px-2 py-2 text-center"><MdOutlinePushPin className='text-xl border rounded-full  border-gray-500 cursor-pointer' /></td>
                                </tr>

                            ))
                        }

                    </tbody>
                </table>
            </div>
            {/* end table */}

            {/* footer */}
            <Footer />
            {/* end footer */}

        </div>
    )
}

export default Basketball
