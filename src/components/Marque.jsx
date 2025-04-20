import React from 'react'
import { FaMicrophone } from 'react-icons/fa'

function Marque() {
    return (
        <div className='flex bg-slate-700 text-white capitalize text-sm font-semibold'>
            <p className='bg-lime-950 px-2 text-sm flex gap-1 '>
                <FaMicrophone className='mt-1' />News
            </p>
            <marquee>Play universe casino for best odds</marquee>
        </div>
    )
}

export default Marque