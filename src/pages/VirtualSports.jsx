import React from 'react'
import Footer from '../components/Footer'
import Marque from '../components/Marque'
import SportType from '../components/SportType'
import sport1 from '../assets/VirtulalSports/sports1.png'

function VirtualSports() {
  return (
    <div>
      <Marque />
      {/* games type */}
      <SportType />
      <div className=' grid grid-cols-2 gap-2 max-lg:w-full mb-6 mt-2'>
        {Array.from({ length: 2 }).map((_, index) => (
          <div>
            <img src={sport1} alt="" className='max-lg:w-full ' />
            <div className='grid bg-[#7BBF43] '>
              <button className='uppercase font-semibold'>universe t1 league 05/04/2024</button>
            </div>

          </div>

        ))}
      </div>

      <Footer />
    </div>
  )
}

export default VirtualSports