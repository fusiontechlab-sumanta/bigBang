import React, { useEffect, useRef, useState } from 'react'


import { MdOutlineWatchLater, MdTv } from "react-icons/md";
import { MdOutlinePushPin } from "react-icons/md";
import Games from '../components/Games';
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';
import Marque from '../components/Marque';

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import { FaSearch } from 'react-icons/fa';
import SportType from '../components/SportType';
import '../css/inplay.css'
import Cricket from './Cricket';
import Soccer from './Soccer';
import Tennis from './Tennis';


function Home() {
    const [cricket, setCricket] = useState(true)
    const [soccer, setSoccer] = useState(false)
    const [tennis, setTennis] = useState(false)
    const handleCricket = () => {
        setCricket(true)
        setSoccer(false)
        setTennis(false)
    }
    const handleSoccer = () => {
        setCricket(false)
        setSoccer(true)
        setTennis(false)
    }
    const handleTennis = () => {
        setCricket(false)
        setSoccer(false)
        setTennis(true)
    }




    return (
        <div className=' w-full ' >
            <div className=' mb-5'>
                <Marque />
                {/* carousel card */}
                <Carousel />
                {/* end carousel card */}
                {/* match section */}
                <div>
                    <div className='  bg-gradient-to-b from-[#96dd5c] to-[#486622]'>

                        <SportType />

                        <div className='max-md:hidden '>
                            <p className='px-2 py-1  font-bold text-[14px] '>Highlights</p>
                            <ul className='flex text-sm'>
                                <li onClick={handleCricket} className={` cursor-pointer text-sm  px-5  font-semibold capitalize ${cricket ? 'bg-gray-300 rounded-sm text-black' : 'bg-green-950 text-white rounded-full '}`}>cricket</li>
                                <li onClick={handleSoccer} className={` cursor-pointer px-5  font-semibold capitalize ${soccer ? 'bg-gray-300 text-black rounded-sm' : 'bg-green-950 text-white rounded-full '} `}>soccer</li>
                                <li onClick={handleTennis} className={`cursor-pointer px-5  font-semibold capitalize ${tennis ? 'bg-gray-300 text-black rounded-sm' : 'bg-green-950 text-white rounded-full'} `}>tennis</li>
                            </ul>

                        </div>
                        {/* table */}
                    </div>
                    {cricket &&
                        <Cricket banner={true}/>

                    }
                    {soccer &&
                        <Soccer banner={true}/>

                    }
                    {tennis &&
                        <Tennis    banner={true} />
                    }

                </div>
                {/* end match section */}

            </div>
            {/* all casino games */}
            <div className='border-b border-black border-l border-l-white mt-[-19px] mb-4'>
                <Games />

            </div>
            {/* end casino games */}

            {/* footer */}
            <Footer />
            {/* end footer */}
        </div >
    )
}

export default Home