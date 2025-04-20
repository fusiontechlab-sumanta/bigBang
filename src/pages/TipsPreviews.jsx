import React from 'react'
import slide from '../assets/ronaldo.jpg'
import Marque from '../components/Marque'
import SportType from '../components/SportType'

function TipsPreviews() {
  return (
    <>
    <Marque/>
     {/* games type */}
     <SportType />
        <div className='border  border-gray-400 rounded-lg mt-2 p-2'>
      <h1 className='uppercase font-black text-xl mb-5'>news</h1>
      <div className='w-full flex  gap-2 border-b border-b-gray-400 pb-3 '>
        <div className='w-[60vw] h-[20vh] overflow-hidden rounded-lg hover:rounded-none'><img src={slide} alt="" className='   w-full hover:scale-[1.2]  transition-all duration-700' /></div>
        <div className=''>
          <h1 className='font-bold text-xl'>Lorem ipsum dolor sit amet.</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ullam laudantium perspiciatis rem doloremque quisquam eum temporibus vero atque  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique ullam alias placeat mollitia, !</p>
        </div>
      </div>
      
    </div>
    </>
  )
}

export default TipsPreviews