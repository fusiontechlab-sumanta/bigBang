import React from 'react'
import Footer from '../components/Footer'
import Carousel from '../components/Carousel'
import matkaimg from '../assets/lottery/matka.png'
import Marque from '../components/Marque'
import SportType from '../components/SportType'
import { Link } from 'react-router-dom'

function Lottery() {

  return (
    <div>
      <div>
        <Marque />
        {/* carousel */}
        <Carousel />
        {/*end carousel */}

        {/* games type */}
        <SportType />

        {/* games section */}
        <div className='grid grid-cols-4 gap-1 gap-y-0.5 justify-center m-3'>
          {
            Array.from({ length: 12 }).map((_, index) => (
              <Link to='/lottery/5556' key={index} className='cursor-pointer'>
                <img src={matkaimg} alt="" />
                <h1 className='uppercase text-black font-semibold  text-sm ms-8'>kalyan</h1>
              </Link>

            ))
          }

        </div>



        {/* footer */}
        <Footer />
        {/* end footer */}
      </div>
    </div>
  )
}

export default Lottery