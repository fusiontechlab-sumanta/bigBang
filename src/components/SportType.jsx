import React, { useEffect, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import aviatorimg from '../assets/aviator.png'
import cricket from '../assets/cricket.png'
import tennis from '../assets/tennis.png'
import soccer from '../assets/soccer.png'
import Modal from "react-modal";
import './css/games.css'
Modal.setAppElement("#root");
function SportType() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const location = useLocation();
    // useEffect(() => {
    //     const activeLink = document.querySelector('.slip');
    //     if (activeLink) {
    //         activeLink.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    //     }
    // }, [location.pathname]);
    return (
        <div className=' lg:hidden flex bg-gradient-to-b from-[#96dd5c] to-[#486622] '>
            <div className='overflow-x-auto scroll-smooth scrollbar-hidden' >
                <ul className='flex  bg-gradient-to-b from-[#96dd5c] to-[#486622] p-1 pb-0'>
                    <li className={`px-3  rounded-md border-r border-gray-500 p-1 bg-black`}>
                        <Link to='/cricket' className={`text-red-600 vimananimation flex items-center gap-1 font-bold text-[12px] w-20  hover:underline cursor-pointer ${location.pathname == '/cricket' && 'text-white'}`}>
                            <img src={aviatorimg} alt="" className='h-5' />
                            <span className=" block">
                                Viman
                            </span>
                        </Link>
                    </li>
                    {/* <li
                        className={`border-gray-500 px-3 rounded-lg py-1 ${location.pathname == "/cricket" && "text-white bg-[#2a4870] slip"
                            }`}
                    >
                        <Link
                            to="/cricket"
                            className={`text-black w-[80px] font-bold text-sm text-nowrap flex hover:underline cursor-pointer ${location.pathname == "/cricket" && "text-white"
                                }`}
                        >
                            <img
                                src={cricket}
                                alt="Cricket Icon"
                                className={`w-7 h-7 ${location.pathname == "/cricket" ? "filter invert" : ""
                                    }`}
                            />
                            <span className="flex items-center">Cricket</span>
                        </Link>
                    </li> */}

<li
                        className={`border-gray-500 px-3 rounded-lg py-1 ml-2 ${(location.pathname === "/" || location.pathname === "/cricket") &&
                            "text-white bg-gradient-to-b from-[#2E4D8F] to-[#162443] slip"
                            }`}
                    >
                        <Link
                            to="/cricket"
                            className={`text-black w-[80px] font-bold text-sm text-nowrap flex hover:underline cursor-pointer ${(location.pathname === "/" || location.pathname === "/cricket") &&
                                "text-white"
                                }`}
                        >
                            <img
                                src={cricket}
                                alt="Cricket Icon"
                                className={`w-7 h-7 ${location.pathname === "/" || location.pathname === "/cricket"
                                        ? "filter invert"
                                        : ""
                                    }`}
                            />
                            <span className="flex items-center">Cricket</span>
                        </Link>
                    </li>
                    <li
                        className={`border-gray-500 px-3 rounded-lg py-1 ${location.pathname == "/tennis" && "text-white bg-[#2a4870] slip"
                            }`}
                    >
                        <Link
                            to="/tennis"
                            className={`text-black w-[80px] font-bold flex text-sm text-nowrap hover:underline cursor-pointer ${location.pathname == "/tennis" && "text-white"
                                }`}
                        >
                            <img
                                src={tennis}
                                alt="Tennis Icon"
                                className={`w-8 h-8 ${location.pathname == "/tennis" ? "filter invert" : ""
                                    }`}
                            />
                            <span className="flex items-center">Tennis</span>
                        </Link>
                    </li>
                    <li
                        className={`border-gray-500 px-3 rounded-lg py-1 ${location.pathname == "/soccer" && "text-white bg-[#2a4870] slip"
                            }`}
                    >
                        <Link
                            to="/soccer"
                            className={`text-black w-[80px] font-bold flex text-sm text-nowrap hover:underline cursor-pointer ${location.pathname == "/soccer" && "text-white"
                                }`}
                        >
                            <img
                                src={soccer}
                                alt="Soccer Icon"
                                className={`w-7 h-7 ${location.pathname == "/soccer" ? "filter invert" : ""
                                    }`} />
                            <span className="flex items-center">Soccer</span> </Link>
                    </li>

                    <li className={`border-gray-500 px-3 rounded-lg py-1 ${location.pathname == '/horseracing' && 'text-white bg-[#2a4870] slip'}`}>
                        <Link to='/horseracing' className={`text-black font-bold text-sm text-nowrap hover:underline cursor-pointer ${location.pathname == '/horseracing' && 'text-white'}`}>Horse Racing</Link>
                    </li>
                    <li className={`border-gray-500 px-3 rounded-lg py-1 ${location.pathname == '/greyhoundracing' && 'text-white bg-[#2a4870] slip'}`}>
                        <Link to='/greyhoundracing' className={`text-black font-bold text-sm text-nowrap hover:underline cursor-pointer ${location.pathname == '/greyhoundracing' && 'text-white'}`}>Grayhound Racing</Link>
                    </li>
                    <li className={`border-gray-500 px-3 rounded-lg py-1 ${location.pathname == '/politics' && 'text-white bg-[#2a4870] slip'}`}>
                        <Link to='/politics' className={`text-black font-bold text-sm text-nowrap hover:underline cursor-pointer ${location.pathname == '/politics' && 'text-white'}`}>Politics</Link>
                    </li>
                    <li className={`border-gray-500 px-3 rounded-lg py-1 ${location.pathname == '/lottery' && 'text-white bg-[#2a4870] slip'}`}>
                        <Link to='/lottery' className={`text-black font-bold text-sm text-nowrap hover:underline cursor-pointer ${location.pathname == '/lottery' && 'text-white'}`}>Lottery</Link>
                    </li>
                    <li className={`border-gray-500 px-3 rounded-lg py-1 ${location.pathname == '/livecasino' && 'text-white bg-[#2a4870] slip'}`}>
                        <Link to='/livecasino' className={`text-black font-bold text-sm text-nowrap hover:underline cursor-pointer ${location.pathname == '/livecasino' && 'text-white'}`}>Live Casino</Link>
                    </li>
                    <li className={`border-gray-500 px-3 rounded-lg py-1 ${location.pathname == '/virtualsports' && 'text-white bg-[#2a4870] slip'}`}>
                        <Link to='/virtualsports' className={`text-black font-bold text-sm text-nowrap hover:underline cursor-pointer ${location.pathname == '/virtualsports' && 'text-white'}`}>Virtual Sports</Link>
                    </li>
                    <li className={`border-gray-500 px-3 rounded-lg py-1 ${location.pathname == '/tips' && 'text-white bg-[#2a4870] slip'}`}>
                        <Link to='/tips' className={`text-black font-bold text-sm text-nowrap hover:underline cursor-pointer ${location.pathname == '/tips' && 'text-white'}`}>Tips & Previews</Link>
                    </li>
                </ul>

            </div>


            <div
                className="flex items-center w-[60px] h-[43px] bg-gradient-to-t from-[#434343] to-[#323232] text-white px-4 cursor-pointer"
                onClick={openModal}
            >
                <FaSearch className="text-xl" />
            </div>

            {/* Modal Component */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Search Modal"
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.75)",
                        zIndex: 1000, // Ensures the overlay is above other elements
                    },
                    content: {
                        backgroundColor: "rgba(0, 0, 0, 0.75)",
                        color: 'white',
                        top: "10%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        marginRight: "-50%",
                        transform: "translate(-50%, 0%)",
                        zIndex: 1100, // Ensures modal content is above the overlay
                    },
                }}
            >
                <div className="flex flex-col items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>
            </Modal>


        </div>
    )
}

export default SportType