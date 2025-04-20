import React from 'react'
import '../../css/rollingcommision.css'
import { useState } from 'react';

function RollingCommision() {
    const [dataSource, setDataSource] = useState('');
    const [selectedSport, setSelectedSport] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Check if all fields are filled
    const isFormValid = dataSource && selectedSport && startDate && endDate;

    return (
        <div className='mb-36 lg:mb-2'>
            <div className='grid grid-cols-3 gap-x-3 gap-y-4 max-md:grid-cols-1 my-6 border border-black rounded-md p-3 border-t-[2px] border-b-2 border-b-[#030303a3] border-l-gray-400 border-r-gray-400'>
            {/* For Mobile View */}
            <div className='lg:hidden flex gap-6 w-full'>
                <div className='w-[48%]'>
                    <select
                        className='p-1 py-2 border border-gray-300 rounded-md focus:border-4 focus:border-blue-300 w-full text-gray-400'
                        value={dataSource}
                        onChange={(e) => setDataSource(e.target.value)}
                    >
                        <option value="" disabled>Data Source</option>
                        <option value="LIVE DATA">LIVE DATA</option>
                        <option value="BACKUP DATA">BACKUP DATA</option>
                        <option value="OLD DATA">OLD DATA</option>
                    </select>
                </div>
                <div className='w-[48%]'>
                    <select
                        className='p-1 py-2 border border-gray-300 rounded-md focus:border-4 focus:border-blue-300 w-full text-gray-400'
                        value={selectedSport}
                        onChange={(e) => setSelectedSport(e.target.value)}
                    >
                        <option value="" disabled>Selected Sports</option>
                        <option value="Cricket">Cricket</option>
                        <option value="Tennis">Tennis</option>
                        <option value="Casino">Casino</option>
                        <option value="Soccer">Soccer</option>
                    </select>
                </div>
            </div>

            {/* For Larger Screens */}
            <div className='max-lg:hidden ml-[20px]'>
                <select
                    className='p-1 py-2 border border-gray-300 rounded-md focus:border-4 focus:border-blue-300 w-full text-gray-400'
                    value={dataSource}
                    onChange={(e) => setDataSource(e.target.value)}
                >
                    <option value="" disabled>Data Source</option>
                    <option value="LIVE DATA">LIVE DATA</option>
                    <option value="BACKUP DATA">BACKUP DATA</option>
                    <option value="OLD DATA">OLD DATA</option>
                </select>
            </div>
            <div className='max-lg:hidden'>
                <select
                    className='p-1 py-2 border border-gray-300 rounded-md focus:border-4 focus:border-blue-300 w-full text-gray-400'
                    value={selectedSport}
                    onChange={(e) => setSelectedSport(e.target.value)}
                >
                    <option value="" disabled>Selected Sports</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Casino">Casino</option>
                    <option value="Soccer">Soccer</option>
                </select>
            </div>

            {/* Date Pickers */}
            <div className="w-full">
                <input
                    type="date"
                    className="bg-[#e5e7ea] appearance-none w-full border border-[#ccc] rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div className="w-full">
                <input
                    type="date"
                    className="bg-[#e5e7ea] appearance-none w-full border border-[#ccc] rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>

            {/* Button */}
            <div
                className={`${
                    isFormValid ? 'bg-[#264151]' : 'bg-[#697C87]'
                } text-white font-bold flex items-center justify-center h-[33px] w-[175px] rounded-sm`}
            >
                <button disabled={!isFormValid}>Get Commission</button>
            </div>
        </div>

            <div className=' font-bold rounded-md bg-[#fff] border-l-gray-400 border-r-gray-400'>
                <h1 className='bg-[#294253] text-white p-2 text-sm'>Rolling Commision</h1>
                <div className='pt-5 pb-7 px-3'>

                    <table className="w-full   border border-gray-400 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className=" text-black bg-gray-300 border-b border-gray-500 ">
                            <tr className='border border-gray-400'>
                                <th scope="col" className=" border-r border-slate-400 py-3 text-center ">
                                    Type
                                </th>
                                <th scope="col" className="border-r border-gray-400  py-3 text-center">

                                    Total Stack

                                </th>

                                <th scope="col" className="  py-3 text-center">
                                    Total Commision
                                </th>


                            </tr>
                        </thead>

                        <tbody >

                            <tr className="bg-white border-b border-gray-300">
                                <td colSpan={3} className='text-center py-3'>no data!</td>
                            </tr>

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default RollingCommision