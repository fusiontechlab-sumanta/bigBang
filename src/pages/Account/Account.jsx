import React from 'react'
import { FaCircleUser, FaGreaterThan } from 'react-icons/fa6'
import { FiLogOut } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function Account() {
    const Logout = () => {
        const myHeaders = new Headers();
        const storedToken = localStorage.getItem('token');
        myHeaders.append("Authorization", `Bearer ${storedToken}`);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch("https://admin.bigbbang.com/api/user-logout", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Logout failed with status ${response.status}`);
                }
                return response.json(); // assuming the server returns JSON
            })
            .then((result) => {
                localStorage.clear();
                // setAcount(false)
                window.location.reload();
            })
            .catch((error) => {
                console.error("Logout error:", error);
            });
    }
    const storedToken = localStorage.getItem('token');
    const userName=localStorage.getItem("username")
    return (
        <div className='mb-16 bg-white  lg:hidden'>

            <h1 className=' bg-gradient-to-t from-[#243A48] to-[#2D495C] text-white   py-2 text-xl flex gap-1 ps-2 '><FaCircleUser className='mt-1' />{userName}</h1>

            <div>
                <div className=' px-2'>
                    <Link to='/myprofile' className='grid grid-cols-2 border-b border-gray-200 p-2  '>
                        <p className='text-[#2889CE] font-extrabold text-[4vw] '>My Profile</p>
                        <div className='flex justify-end items-center '>
                            <div className='border border-black h-[6.7vw] w-[6.7vw] rounded-md flex justify-center items-center'>
                                <FaGreaterThan className='text-[10px] m-0.5' />

                            </div>
                        </div>
                    </Link>

                    <Link to='/multimarket' className='grid grid-cols-2 border-b border-gray-200 py-2 px-2 '>
                        <p className='text-[#2889CE] font-extrabold text-[4vw]'>Multi Markets</p>
                        <div className='flex justify-end items-center '>
                            <div className='border border-black h-[6.7vw] w-[6.7vw] rounded-md flex justify-center items-center'>
                                <FaGreaterThan className='text-[10px] m-0.5' />

                            </div>
                        </div>
                    </Link>
                    <Link to='/rolling-commission' className='grid grid-cols-2 border-b border-gray-200 py-2 px-2 '>
                        <p className='text-[#2889CE] font-extrabold text-[4vw]'>Rolling Commission</p>
                        <div className='flex justify-end items-center '>
                            <div className='border border-black h-[6.7vw] w-[6.7vw] rounded-md flex justify-center items-center'>
                                <FaGreaterThan className='text-[10px] m-0.5' />

                            </div>
                        </div>
                    </Link>
                    <Link to='/account-statement' className='grid grid-cols-2 border-b border-gray-200 py-2 px-2 '>
                        <p className='text-[#2889CE] font-extrabold text-[4vw]'>Account Statement</p>
                        <div className='flex justify-end items-center '>
                            <div className='border border-black h-[6.7vw] w-[6.7vw] rounded-md flex justify-center items-center'>
                                <FaGreaterThan className='text-[10px] m-0.5' />

                            </div>
                        </div>
                    </Link>
                    <Link to='/bet-history' className='grid grid-cols-2 border-b border-gray-200 py-2 px-2 '>
                        <p className='text-[#2889CE] font-extrabold text-[4vw]'>Bets History</p>
                        <div className='flex justify-end items-center '>
                            <div className='border border-black h-[6.7vw] w-[6.7vw] rounded-md flex justify-center items-center'>
                                <FaGreaterThan className='text-[10px] m-0.5' />

                            </div>
                        </div>
                    </Link>
                    {/* <Link to='/profit-loss' className='grid grid-cols-2 border-b border-gray-200 py-2 px-2 '>
                        <p className='text-[#2889CE] font-extrabold text-[4vw]'>Profit & Loss</p>
                        <div className='flex justify-end items-center '>
                            <div className='border border-black h-[6.7vw] w-[6.7vw] rounded-md flex justify-center items-center'>
                                <FaGreaterThan className='text-[10px] m-0.5' />

                            </div>
                        </div>
                    </Link> */}
                    <Link to='/password-history' className='grid grid-cols-2 border-b border-gray-200 py-2 px-2 '>
                        <p className='text-[#2889CE] font-extrabold text-[4vw]'>Password History</p>
                        <div className='flex justify-end items-center '>
                            <div className='border border-black h-[6.7vw] w-[6.7vw] rounded-md flex justify-center items-center '>
                                <FaGreaterThan className='text-[10px] m-0.5' />

                            </div>
                        </div>
                    </Link>
                    <Link to='/activity-log' className='grid grid-cols-2 border-b border-gray-200 py-2 px-2 '>
                        <p className='text-[#2889CE] font-extrabold text-[4vw]'>Activity Log</p>
                        <div className='flex justify-end items-center '>
                            <div className='border border-black  h-[6.7vw] w-[6.7vw] rounded-md flex justify-center items-center'>
                                <FaGreaterThan className='text-[10px] m-0.5' />

                            </div>
                        </div>
                    </Link>


                </div>
            </div>

            {
                storedToken &&
                <div onClick={Logout} className='grid bg-gradient-to-b from-[#dd301f] to-[#c32615] text-white  py-3 mt-6 '>
                    <button className='flex gap-1 items-center justify-center uppercase tracking-[1px]  font-bold'>Logout <FiLogOut /></button>
                </div>
            }
        </div>
    )
}

export default Account