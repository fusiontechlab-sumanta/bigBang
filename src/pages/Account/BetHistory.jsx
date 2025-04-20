import React, { useState } from 'react'
import '../../css/rollingcommision.css'
import { useQuery } from 'react-query';
import SmallLoading from '../../components/SmallLoading';
import { getApiWithToken } from '../../utils/api';

function BetHistory() {
    const baseUrl = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_BET_HISTORY}`;

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);

    // State for filters
    const [dataSource, setDataSource] = useState("");
    const [sportType, setSportType] = useState("");
    const [betType, setBetType] = useState("");
    const [dateRange, setDateRange] = useState({
        from: new Date().toISOString().split("T")[0],
        to: new Date().toISOString().split("T")[0],
    });
    const [filterData, setFilterData] = useState([])

    const isFormValid = dataSource && sportType && betType && dateRange.from && dateRange.to;


    // Fetch activity log with pagination
    const { data: BetHistory, isLoading, isError, refetch } = useQuery(
        ["getactivityLog", currentPage],
        () => getApiWithToken(`${baseUrl}?page=${currentPage}`)
    );

    const displayedData = BetHistory?.data?.data || [];
    // console.log("displayedData",displayedData);

    const { total, per_page, current_page, last_page } = BetHistory?.data || {};

    // Filter logic
    const filter = () => {
        return displayedData.filter(item => {
            const isDataSourceMatch = !dataSource || item.data_source === dataSource;
            const isSportTypeMatch = !sportType || item.sports_name === sportType;
            const isBetTypeMatch = !betType || item.bet_type === betType;
            const isDateMatch =
                (!dateRange.from || new Date(item.match_time) >= new Date(dateRange.from)) &&
                (!dateRange.to || new Date(item.match_time) <= new Date(dateRange.to));

            return isDataSourceMatch && isSportTypeMatch && isBetTypeMatch && isDateMatch;
        });
    };

    const filteredData = filter();
    const HandleHistory = () => {
        const filteredData = filter();
        // console.log(filteredData, "filteredData");

        setFilterData(filteredData)
    }

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= last_page) {
            setCurrentPage(newPage);
            refetch();
        }
    };

    if (isLoading) return <SmallLoading />;
    if (isError) return <div>Error loading data. Please try again later.</div>;
    return (
        <div className='mb-36 lg:mb-2'>
            {/* <div className='gap-y-2 max-md:grid-cols-1 my-3 border border-black rounded-md p-3 border-t-4 border-l-gray-400 border-r-gray-400 bg-[#E0E6E6]'>
                <div className="col-span-2 flex gap-3 text-[0.875rem] text-[#5c6873]">
                    <select
                        className="p-1 py-2 border border-gray-250 rounded-md focus:border-4 focus:border-blue-200 w-full"
                        onChange={(e) => setDataSource(e.target.value)}
                        value={dataSource}
                    >
                        <option value="" disabled>All Data Sources</option>
                        <option value="LIVE DATA">LIVE DATA</option>
                        <option value="BACKUP DATA">BACKUP DATA</option>
                        <option value="OLD DATA">OLD DATA</option>
                    </select>
                    <select
                        className="p-1 py-2 border border-gray-250 rounded-md focus:border-4 focus:border-blue-200 w-full"
                        onChange={(e) => setSportType(e.target.value)}
                        value={sportType}
                    >
                        <option value="" disabled>All Sports</option>
                        <option value="Cricket">Cricket</option>
                        <option value="Tennis">Tennis</option>
                        <option value="Football">Football</option>
                    </select>
                </div>  <br />
                <div className='text-[0.875rem] text-[#5c6873] '>
                    <select
                        className="p-1 py-2 border border-gray-300 rounded-md focus:border-4 focus:border-blue-200 w-full"
                        onChange={(e) => setBetType(e.target.value)}
                        value={betType}
                    >
                        <option value="" disabled>All Bet Types</option>
                        <option value="Settle">Settle</option>
                        <option value="Void">Void</option>
                        <option value="Unsettled">Unsettled</option>
                    </select>
                </div> <br />
                <div className="flex flex-col gap-y-3 w-full text-[0.875rem]">
                    <input
                        type="date"
                        className="appearance-none w-full rounded py-2 px-3 bg-[#e5e7ea] border border-[#d5d5d5] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={dateRange.from}
                        onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                    />
                    <input
                        type="date"
                        className="appearance-none w-full bg-[#e5e7ea] border border-[#d5d5d5] rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={dateRange.to}
                        onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                    />
                </div>
                <br />
                <div className="flex justify-start">
                    <button
                        onClick={HandleHistory}
                       className="bg-[#697C87] text-white font-bold flex items-center justify-center h-[33px] w-[130px] rounded-sm"
                    >
                        Get History
                    </button>
                </div>
            </div> */}


            <div className='gap-y-2 max-md:grid-cols-1 my-6 border border-black rounded-md p-3 border-t-2 border-l-gray-400 border-r-gray-400 bg-[#E0E6E6]'>
                <div className="col-span-2 flex gap-6  mb-3 text-[0.875rem] text-[#5c6873]">
                    <select
                        className="p-1 py-2 border border-gray-250 rounded-md focus:border-4 focus:border-blue-200 w-full"
                        onChange={(e) => setDataSource(e.target.value)}
                        value={dataSource}
                    >
                        <option value="" disabled>All Data Sources</option>
                        <option value="LIVE DATA">LIVE DATA</option>
                        <option value="BACKUP DATA">BACKUP DATA</option>
                        <option value="OLD DATA">OLD DATA</option>
                    </select>
                    <select
                        className="p-1 py-2 border border-gray-250 rounded-md focus:border-4 focus:border-blue-200 w-full"
                        onChange={(e) => setSportType(e.target.value)}
                        value={sportType}
                    >
                        <option value="" disabled>All Sports</option>
                        <option value="Cricket">Cricket</option>
                        <option value="Tennis">Tennis</option>
                        <option value="Football">Football</option>
                    </select>
                </div>
            
                <div className='text-[0.875rem]  mb-3 text-[#5c6873]'>
                    <select
                        className="p-1 py-2 border border-gray-300 rounded-md focus:border-4 focus:border-blue-200 w-full"
                        onChange={(e) => setBetType(e.target.value)}
                        value={betType}
                    >
                        <option value="" disabled>All Bet Types</option>
                        <option value="Settle">Settle</option>
                        <option value="Void">Void</option>
                        <option value="Unsettled">Unsettled</option>
                    </select>
                </div>
                
                <div className="flex flex-col gap-y-3  mb-3 w-full text-[0.875rem]">
                    <input
                        type="date"
                        className="appearance-none w-full rounded py-2 px-3 bg-[#e5e7ea] border border-[#d5d5d5] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={dateRange.from}
                        onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                    />
                    <input
                        type="date"
                        className="appearance-none w-full bg-[#e5e7ea] border border-[#d5d5d5] rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={dateRange.to}
                        onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                    />
                </div>
                
                <div className="flex justify-start">
                    <button
                        onClick={HandleHistory}
                        disabled={!isFormValid}
                        className={`text-white font-bold flex items-center justify-center h-[33px] w-[180px] rounded-sm ${isFormValid ? 'bg-[#264151]' : 'bg-[#697C87]'}`}
                    >
                        Get History
                    </button>
                </div>
            </div>




            <div className=' bg-white  rounded-md  border-l-gray-400 border-r-gray-400'>
                <h1 className='bg-[#294253] text-sm text-white p-2'>Bet History</h1>
                <div className=' px-2 w-full overflow-x-scroll'>
                    <div className='w-[190vw] mt-3'>
                        <div className="font-normal ml-[124px] sm:ml-[0] flex  items-center md:justify-start">
                            Show
                            <select className="mx-1 py-1 rounded-md border w-[75px]">
                                <option value="10" selected>10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            entries
                        </div>


                        <table className="w-full overflow-scroll text-[0.875rem] my-3 border border-gray-400  text-left rtl:text-right  dark:text-gray-400">
                            <thead className="text-black bg-gray-300 border-b border-gray-500">
                                <tr className="border border-gray-400">
                                    <th scope="col" className="border-r border-slate-400 py-3 text-center">
                                        Sport Name
                                    </th>
                                    <th scope="col" className="border-r border-gray-400 py-3 text-center">
                                        Event Name
                                    </th>
                                    <th scope="col" className="border-r border-gray-400 py-3 text-center">
                                        Market Name
                                    </th>
                                    <th scope="col" className="border-r border-gray-400 py-3 text-center">
                                        Selection
                                    </th>
                                    <th scope="col" className="border-r border-gray-400 py-3 text-center">
                                        Odd Reqs.
                                    </th>
                                    <th scope="col" className="border-r border-gray-400 py-3 text-center">
                                        Stack
                                    </th>
                                    <th scope="col" className="border-r border-gray-400 py-3 text-center">
                                        Type
                                    </th>
                                    <th scope="col" className="border-r border-gray-400 py-3 text-center">
                                        Place Time
                                    </th>
                                    <th scope="col" className="border-r border-gray-400 py-3 text-center">
                                        Matched Time
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {displayedData?.length > 0 ? (
                                    displayedData.map((item, index) => (
                                        <tr key={index} className="bg-white border-b border-gray-300">
                                            <td className="border border-gray-400 py-3 px-4 text-center">{item?.sports_name}</td>
                                            <td className="border border-gray-400 py-3 px-4 text-center">{item?.event_name}</td>
                                            <td className="border border-gray-400 py-3 px-4 text-center">{item?.market_name}</td>
                                            <td className="border border-gray-400 py-3 px-4 text-center">{item?.selection}</td>
                                            <td className="border border-gray-400 py-3 px-4 text-center">{item?.odd_req}</td>
                                            <td className="border border-gray-400 py-3 px-4 font-bold text-center">{item?.stack}</td>
                                            {/* <td className="border border-gray-400 py-3 px-4 font-bold text-center">{item?.type}</td> */}
                                            <td
                                                className={`border border-gray-400 py-3 px-4 font-bold text-center ${item?.type === "Back" ? "text-blue-500" : item?.type === "Lay" ? "text-red-500" : ""
                                                    }`}
                                            >
                                                {item?.type}
                                            </td>
                                            <td className="border border-gray-400 py-3 px-4 text-center">{item?.place_time}</td>
                                            <td className="border border-gray-400 py-3 px-4 text-center">{item?.match_time}</td>
                                        </tr>

                                    ))
                                ) : (
                                    <tr className="bg-white border-b border-gray-300">
                                        <td colSpan={8} className="text-center py-3">
                                            No data!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className='flex flex-col sm:flex-row   font-normal text-sm ml-[124px] sm:ml-[0px]'>
                            <div className='sm:mr-[300px]'>
                                <p>Showing {current_page} to {last_page} of {total} entries</p>
                            </div> <br />
                            <div className='flex gap-5 text-gray-500 '>
                                <button
                                    onClick={() => handlePageChange(1)}
                                    disabled={current_page === 1}
                                >First</button>
                                <button
                                    onClick={() => handlePageChange(current_page - 1)}
                                    disabled={current_page === 1}
                                >
                                    Previous

                                </button>
                                <button
                                    onClick={() => handlePageChange(current_page + 1)}
                                    disabled={current_page === last_page}
                                >
                                    Next
                                </button>
                                <button
                                    onClick={() => handlePageChange(last_page)}
                                    disabled={current_page === last_page}
                                >
                                    Last
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BetHistory