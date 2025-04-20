import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getApiWithToken } from '../../utils/api';
import SmallLoading from '../../components/SmallLoading';

function ActivityLog() {
    const baseUrl = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_ACTIVITY_LOG}`;

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch activity log with pagination
    const { data: activity, isLoading, isError, refetch } = useQuery(
        ["getactivityLog", currentPage],
        () => getApiWithToken(`${baseUrl}?page=${currentPage}`)
    );

    if (isError) {
        return <div>Error loading data. Please try again later.</div>;
    }
    if (isLoading) {
        return <SmallLoading />;
    }

    const displayedData = activity?.data?.data || [];
    const { total, per_page, current_page, last_page } = activity?.data || {};

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= last_page) {
            setCurrentPage(newPage);
            refetch();
        }
    };

    return (
        <div className='mb-36 lg:mb-2'>
            <div className='my-6 font-bold border rounded-md border-gray-400'>
                <h1 className='bg-gradient-to-t text-sm from-[#243A48] to-[#2D4A5D] text-white px-1 py-2'>Activity Log</h1>
                <div className='px-2 w-full overflow-x-scroll'>
                    <div className='w-full max-lg:w-[150vw] mt-3'>
                        <table className="w-full overflow-scroll my-3 border border-gray-400 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-black bg-gray-300 border-b border-gray-500">
                                <tr className='border border-gray-400'>
                                    <th className="border-r border-slate-400 py-2 text-center">Login Date & Time</th>
                                    <th className="border-r border-gray-400 py-2 text-center">Login Status</th>
                                    <th className="border-r border-gray-400 py-2 text-center">IP Address</th>
                                    <th className="border-r border-gray-400 py-2 text-center">ISP</th>
                                    <th className="border-r border-gray-400 py-2 text-center">City/State/Country</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedData.map((item, index) => (
                                    <tr key={index} className="bg-white border-b border-gray-300 text-[14px] font-[400] text-black">
                                        <td className='border-r border-gray-400 text-center py-3'>{item?.login_time}</td>
                                        <td className='border-r border-gray-400 text-center font-[700] text-wrap py-3 text-[#278B23]'>{item?.login_status}</td>
                                        <td className='border-r border-gray-400 text-center py-3'>{item?.ip_address}</td>
                                        <td className='border-r border-gray-400 text-center py-3'>{item?.isp}</td>
                                        <td className='border-r border-gray-400 text-center py-3 text-wrap'>{item?.city}/{item?.region}/{item?.country}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Pagination Controls */}
                <div className="flex justify-between items-center my-3">
                    <button
                        className={`px-3 py-1 border rounded ${current_page === 1 ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-gray-700 text-white'}`}
                        onClick={() => handlePageChange(current_page - 1)}
                        disabled={current_page === 1}
                    >
                        Previous
                    </button>
                    <span>
                        Page {current_page} of {last_page} ({total} total entries)
                    </span>
                    <button
                        className={`px-3 py-1 border rounded ${current_page === last_page ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-gray-700 text-white'}`}
                        onClick={() => handlePageChange(current_page + 1)}
                        disabled={current_page === last_page}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ActivityLog;
