import React, { useState } from 'react'
import SmallLoading from '../../components/SmallLoading';
import { useQuery } from 'react-query';
import { getApiWithToken } from '../../utils/api';
import { formatDateTime } from '../../utils/getuserdata';

function PasswordHistory() {
    const baseUrl = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_PASSWORD_HISTORY}`;

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch activity log with pagination
    const { data: PasswordHistory, isLoading, isError, refetch } = useQuery(
        ["PasswordHistory", currentPage],
        () => getApiWithToken(`${baseUrl}?page=${currentPage}`)
    );

    const displayedData = PasswordHistory?.data?.data || [];
    const { total, per_page, current_page, last_page } = PasswordHistory?.data || {};
    // console.log(displayedData, "displayedData");

    if (isLoading) return <SmallLoading />;
    if (isError) return <div>Error loading data. Please try again later.</div>;
    const currentUserId = localStorage.getItem("username");
    return (
        <div className='bg-white mb-36 mt-7 pb-1 lg:mb-2 font-bold border  rounded-md  border-gray-400 '>
            <h1 className='bg-gradient-to-t from-[#243A48] to-[#243A48] text-white p-2 text-sm '>Password change History</h1>
            <div className=' px-2 w-full overflow-x-scroll'>
                <div className='w-full max-lg:w-[95vw] mt-3'>
                    <div className='font-normal text-center sm:text-left'>
                        Show
                        <select className='mx-1 py-1 rounded-md w-[75px] border border-grey'>
                            <option value="10" selected>10</option>
                            <option value="25" >25</option>
                            <option value="50" >50</option>
                            <option value="100" >100</option>
                        </select>
                        entries
                    </div>

                    <table className="w-full overflow-scroll my-3 border border-gray-400 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className=" text-black bg-gray-300 border-b border-gray-500 ">
                            <tr className='border border-gray-400'>
                                <th scope="col" className=" border-r border-slate-400 py-3 text-center ">
                                    Date/Time
                                </th>
                                <th scope="col" className="border-r border-gray-400  py-3 text-center">
                                    Remark
                                </th>

                            </tr>
                        </thead>
                        <tbody >
                            {displayedData?.length > 0 ? (
                                displayedData.map((item, index) => (
                                    <tr key={index} className="bg-white border-b border-gray-300 font-normal text-black">
                                        <td className='border-r border-gray-400  text-center py-3'>{formatDateTime(item?.created_at)}</td>
                                        <td className='border-r border-gray-400 text-center py-3'>{item?.changed_by.name ==currentUserId? "Password change by self" : item?.remarks} </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="bg-white border-b border-gray-300">
                                    <td colSpan={2} className="text-center py-3">
                                        No data!
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>
                    <div className='flex flex-col items-center font-normal text-sm'>
                        <div>
                            <p className='mb-[15px]'>Showing {current_page} to {last_page} of {total} entries</p>
                        </div>
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
                            {/* <div className='flex items-center'>
                                <p className='border border-gray-400 px-3 py-1'>{current_page}</p>
                            </div> */}
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
    )
}

export default PasswordHistory