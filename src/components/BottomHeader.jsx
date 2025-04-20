import React, { useState } from 'react';
import { IoClose, IoHome } from "react-icons/io5";
import { BsStopwatch, BsTrophy } from "react-icons/bs";
import { MdPushPin } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { Link, useLocation } from 'react-router-dom';
import chiprotate from '../assets/ChipRotate.gif';
import bgdashboard from '../assets/bottomheader/dashboardbg.webp'
import LoginWarningModal from './Auth/LoginWarningModal';

function BottomHeader() {
    const location = useLocation();
    const [casino, setCasino] = useState(false)
    const [showWarningModal, setShowWarningModal] = useState(false);
    const storedToken = localStorage.getItem('token');
    return (
        <div className="fixed bottom-0 bg-[#19333d] w-full z-[999]">
            <div
                className={`w-full transition-all  duration-1000 ease-in-out bg-black rounded-t-xl overflow-hidden`}
                style={{
                    maxHeight: casino ? '1000px' : '0', // Set maxHeight to a large value for transition
                }}
            >
                {/* Header Section */}
                <div className="flex justify-between py-2 px-4">
                    <div className="flex items-center bg-black">
                        {/* Lobby Text Section */}
                        <div className="flex items-center border-s-2 border-red-600 bg-black text-white font-bold px-3">
                            <span className="text-sm">Lobby</span>
                        </div>
                        {/* Red Badge */}
                        <div className="flex items-center bg-red-600 -skew-x-12 text-white font-bold text-sm px-3">
                            <span>2</span>
                        </div>
                        {/* Slanted Divider */}
                        <div className="px-0.5 h-full ms-5 bg-red-600 -skew-x-12"></div>
                    </div>

                    <IoClose onClick={() => setCasino(false)} className="text-red-600 cursor-pointer text-xl font-extrabold" />
                </div>

                {/* Background Image Section */}
                <div
                    className="relative bg-cover bg-center h-52 flex items-center justify-center"
                    style={{
                        backgroundImage: `url(${bgdashboard})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {/* Buttons */}
                    <div className="flex space-x-4">
                        <button className="bg-red-600 text-white px-4 py-2 rounded-md font-bold shadow-md hover:bg-red-700 transition text-sm">
                            Live Casino
                        </button>
                        <button className="bg-white px-4 py-2 rounded-md font-bold shadow-md hover:bg-gray-200 transition text-sm text-red-600">
                            Virtual Casino
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-5">
                {/* Home */}
                <Link to="/" className={`flex flex-col items-center pt-2 ${location.pathname === '/' ? 'bg-gradient-to-tr from-[#1E4157] to-[#32627F]' : ''}`}>
                    <IoHome className="text-2xl text-white" />
                    <p className="font-semibold text-white text-xs sm:text-sm">Home</p>
                </Link>
                {/* In-Play */}
                <Link to="/inplay" className={`flex flex-col items-center pt-2 ${location.pathname === '/inplay' ? 'bg-gradient-to-tr from-[#1E4157] to-[#32627F]' : ''}`}>
                    <BsStopwatch className="text-2xl text-white" />
                    <p className="font-semibold text-white text-xs sm:text-sm">In-Play</p>
                </Link>
                {/* Sports */}
                <Link to='/sports' className={`${location.pathname == '/sports' && 'bg-[#32627F]'} `}>
                    <div className={` ${location.pathname == '/sports' ? 'bg-[#32627F]' : 'bg-[#19333d]'} relative bottom-7 flex  justify-center  rounded-t-full `}>
                        <div className='text-white  relative top-8 '>
                            <div className="flex justify-center">
                                <BsTrophy className=' text-2xl' />

                            </div>

                            <p className='font-semibold max-sm:text-xs'>Sports</p>


                        </div>
                    </div>


                </Link>
                {/* Multi-Market */}
                <Link onClick={() => setCasino(true)} className={`flex flex-col items-center pt-2 ${casino ? 'bg-gradient-to-tr from-[#1E4157] to-[#32627F]' : ''}`}>
                    <img src={chiprotate} alt="Casino" className="w-8 h-8" />
                    <p className="font-semibold text-white text-xs sm:text-sm truncate max-w-[4rem]">Casino</p>
                </Link>
                {/* Account */}
                {storedToken ? (
                    <Link
                        to="/account"
                        className={`flex flex-col items-center pt-2 ${location.pathname === '/account' ? 'bg-gradient-to-tr from-[#1E4157] to-[#32627F]' : ''}`}
                    >
                        <FaCircleUser className="text-2xl text-white" />
                        <p className="font-semibold text-white text-xs sm:text-sm">Account</p>
                    </Link>
                ) : (
                    <>
                        <button
                            onClick={() => setShowWarningModal(true)}
                            className={`flex flex-col items-center pt-2 ${location.pathname === '/account' ? 'bg-gradient-to-tr from-[#1E4157] to-[#32627F]' : ''}`}
                        >
                            <FaCircleUser className="text-2xl text-white" />
                            <p className="font-semibold text-white text-xs sm:text-sm">Account</p>
                        </button>
                        <LoginWarningModal openModal={showWarningModal} closeModal={() => setShowWarningModal(false)} />
                    </>
                )}


            </div>
        </div>
    );
}

export default BottomHeader;
