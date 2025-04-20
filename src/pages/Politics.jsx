import React from 'react'
import Footer from '../components/Footer'
import { MdOutlinePushPin } from 'react-icons/md'
import Carousel from '../components/Carousel'
import '../css/inplay.css'
import Marque from '../components/Marque'
import SportType from '../components/SportType'
function Politics() {
  return (
    <div>
      <div>
        <Marque/>
        {/* carousel */}
        <Carousel />
        {/*end carousel */}

         {/* games type */}
         <SportType />

        {/* heading */}
        <div className=' bg-gradient-to-b from-[#96dd5c] to-[#486622]'>
          <p>Highlight</p>
        </div>
        {/* end heading */}

        {/* table */}
        <div className="border border-b-0 mb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-black bg-gray-300 uppercase ">
              <tr>
                <th scope="col" className="px-6 py-1 text-center">

                </th>
                {/* <th scope="col" className="px-6 py-1 text-center">

              </th> */}
                <th scope="col" className="px-6 py-1 text-center ">
                  1
                </th>
                <th scope="col" className="px-6 py-1 text-center">
                  x
                </th>
                <th scope="col" className="px-6 py-1 text-center">
                  2
                </th>
                <th scope="col" className="px-6 py-1 text-center">

                </th>

              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">


                <td className="px-2 py-2 text-nowrap text-center">
                  <a className='flex gap-x-2 flex-wrap uppercase text-[#3a8dc5] font-semibold cursor-pointer' >
                    lok sabha election 2024
                    {/* <MdOutlineWatchLater className=' mt-1 text-lime-400 font-extrabold' /> */}
                    <span className='text-gray-400 animate-color-change font-bold'>In Play</span>
                  </a>
                </td>

                <td className="text-black px-2 py-2 font-semibold text-center"><span className='px-4 bg-cyan-500'>4.4</span><span className='px-4 bg-[#f3a96d]'>4.6</span></td>
                <td className="text-black px-2 py-2 font-semibold text-center"><span className='px-4 bg-cyan-500'>4.4</span><span className='px-4 bg-[#f3a96d]'>4.6</span></td>
                <td className="text-black px-2 py-2 font-semibold text-center"><span className='px-4 bg-cyan-500'>4.4</span><span className='px-4 bg-[#f3a96d]'>4.6</span></td>


                <td className="px-2 py-2 text-center "><MdOutlinePushPin className='text-xl border rounded-full  border-gray-500 cursor-pointer' /></td>
              </tr>

            </tbody>
          </table>
        </div>
        {/* end table */}

        {/* footer */}
        <Footer />
        {/* end footer */}
      </div>
    </div>
  )
}

export default Politics