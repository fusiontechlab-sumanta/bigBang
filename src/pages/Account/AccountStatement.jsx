import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import SmallLoading from "../../components/SmallLoading";
import { getApiWithToken } from "../../utils/api";
import { toastError, toastSuccess } from '../../utils/notifyCustom';
import { formatDateTime } from "../../utils/getuserdata";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa"; // Import FontAwesome icons
import qr_Code from '../../assets/qr_Code.png'
import axios from "axios";

function AccountStatement() {
    const [dateRange, setDateRange] = useState({
        from: new Date().toISOString().split("T")[0],
        to: new Date().toISOString().split("T")[0],
    });
    const [amount, setAmount] = useState("");
    const [selectedDataSource, setSelectedDataSource] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
    const [userId, setUserId] = useState("")

    const baseUrl = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_ACCOUNT_STATEMENT}`;

    const { data: AccountStatement, isLoading, isError, refetch } = useQuery(
        ["getAccountStatement"],
        () => getApiWithToken(`${baseUrl}`)
    );

    // const displayedData = AccountStatement?.data || [];
    const displayedData = filteredData.length > 0 ? filteredData : AccountStatement?.data || [];

    // console.log(displayedData, "AccountStatement");
    const { total, per_page, current_page, last_page } = AccountStatement || {};

    // Sorting function
    const sortedData = [...displayedData].sort((a, b) => {
        if (!sortConfig.key) return 0; // No sorting by default
        const valueA = a[sortConfig.key];
        const valueB = b[sortConfig.key];

        if (sortConfig.direction === "asc") {
            return valueA > valueB ? 1 : -1;
        } else {
            return valueA < valueB ? 1 : -1;
        }
    });

    const handleSortDateTime = () => {
        setSortConfig((prev) => ({
            key: "created_at",
            direction: prev.key === "created_at" && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    const handleSortDeposit = () => {
        setSortConfig((prev) => ({
            key: "deposit",
            direction: prev.key === "deposit" && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    const handleSortWithdraw = () => {
        setSortConfig((prev) => ({
            key: "withdraw",
            direction: prev.key === "withdraw" && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    const handleSortBalance = () => {
        setSortConfig((prev) => ({
            key: "balance",
            direction: prev.key === "balance" && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    const handleSortRemarks = () => {
        setSortConfig((prev) => ({
            key: "remarks",
            direction: prev.key === "remarks" && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    const handleSortFromTo = () => {
        setSortConfig((prev) => ({
            key: "from_to",
            direction: prev.key === "from_to" && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <FaSort />;
        return sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />;
    };

    const filterData = () => {
        const data = AccountStatement?.data || [];
        // console.log("Original Data:", data);
        const filtered = data.filter((item) => {
            const itemDate = new Date(item.created_at).toISOString().split("T")[0];
            return itemDate >= dateRange.from && itemDate <= dateRange.to;
        });
        // console.log("Filtered Data:", filtered);
        setFilteredData(filtered);
    };

    const handleGetStatement = () => {
        refetch().then(() => {
            filterData(); // Ensure filtered data updates only after fetching
        });
    };


    // handel payement function for phonepe

    // https://bijoligrill.co/initiate-payment/?amount=1&user_id=3423423

    const handlePayment = async () => {
        const transactionId = `TXN${Date.now()}`;
        console.log(transactionId, amount, "Initiating payment...");

        try {
            // Hit the API using GET with amount in query
            const url = `https://bijoligrill.co/initiate-payment/?amount=${amount}&user_id=${userId}`;
            window.location.href = url; // let the browser handle it directly

        } catch (error) {
            console.error("Error:", error.message);
            toastError("Payment failed");
            // window.location.href = "/"; // Redirect to homepage on error
        }
    };



    //   const handlePayment = async () => {
    //     const transactionId = `TXN${Date.now()}`;
    //     console.log(transactionId, amount, "kkkkkkkkkkkk");

    //     try {
    //         const response = await axios.post("https://bijoligrill.co/wp-json/custom-phonepe/v1/initiate/", {
    //             amount: amount

    //         });

    //         console.log(response, "kkkkkkkkk");

    //         if (response?.data) {
    //             console.log("hiiiiiiiiiii");
    //             // Directly redirect to the URL from response.data
    //             const url = response.data;
    //             window.location.href = url;
    //         } else {
    //             toastError("Payment failed");
    //             window.location.reload()
    //            window.location.href = "/";
    //         }
    //     } catch (error) {
    //         console.error("Error:", error.message);
    //         toastError("Payment failed");
    //     }
    // };
    // const handlePayment = async () => {
    //     // const transactionId = TXN${Date.now()};
    //       const transactionId = `TXN${Date.now()}`;
    //     console.log(transactionId, amount, "kkkkkkkkkkkk");

    //     try {
    //         const response = await axios.post("https://bijoligrill.co/wp-json/custom-phonepe/v1/initiate/", {
    //             amount: amount
    //         });

    //         console.log(response.data, "response from WordPress");

    //         if (response?.data?.success && response.data.redirect_url) {
    //             // Redirect user to PhonePe payment page
    //             window.location.href = response.data.redirect_url;
    //         } else {
    //             toastError("Payment failed");
    //             window.location.reload();
    //         }
    //     } catch (error) {
    //         console.error("Error:", error.message);
    //         toastError("Payment failed");
    //     }
    // };


    //   function ends here

    // For Use Id
    useEffect(() => {
    const id = localStorage.getItem("user_id");
    setUserId(id);
    console.log(id, "from ac statement"); // logs correct value
}, []);

    useEffect(() => {
        if (AccountStatement?.data) {
            setFilteredData(AccountStatement.data);
        }
    }, [AccountStatement]);

    useEffect(() => {
        const today = new Date();
        let fromDate = "";

        if (selectedDataSource === "LIVE DATA") {
            fromDate = today.toISOString().split("T")[0];
        } else if (selectedDataSource === "BACKUP DATA") {
            const threeMonthsAgo = new Date(today);
            threeMonthsAgo.setMonth(today.getMonth() - 3);
            fromDate = threeMonthsAgo.toISOString().split("T")[0];
        } else if (selectedDataSource === "OLD DATA") {
            const oneYearAgo = new Date(today);
            oneYearAgo.setFullYear(today.getFullYear() - 1);
            fromDate = oneYearAgo.toISOString().split("T")[0];
        }

        setDateRange((prev) => ({ ...prev, from: fromDate }));
    }, [selectedDataSource]);


    return (
        <div className='mb-36 lg:mb-2'>
            <div className='grid grid-cols-4 gap-x-3 gap-y-2 max-md:grid-cols-1 mt-6 mb-[28px] border border-black rounded-md p-3 border-t-2 border-b-[#0000007d] border-l-gray-400 border-r-gray-400'>
                <div className="text-[0.875rem] text-[#5c6873]">
                    <select
                        className="p-1 py-2 border border-gray-300 rounded-md focus:border-4 focus:border-blue-200 w-full"
                        value={selectedDataSource}
                        onChange={(e) => setSelectedDataSource(e.target.value)}
                    >
                        <option value="" disabled>All Data Sources</option>
                        <option value="LIVE DATA">LIVE DATA</option>
                        <option value="BACKUP DATA">BACKUP DATA</option>
                        <option value="OLD DATA">OLD DATA</option>
                    </select>
                </div>
                <div className="w-full text-[0.875rem]">
                    <input
                        type="date"
                        className="appearance-none w-full bg-[#e5e7ea] border border-[#ccc] rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={dateRange.from}
                        onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                    />
                </div>
                <div className="w-full text-[0.875rem]">
                    <input
                        type="date"
                        className="appearance-none w-full bg-[#e5e7ea] border border-[#ccc] rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={dateRange.to}
                        onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                    />
                </div>
                <div className="bg-[#697C87] text-white font-bold flex items-center justify-center h-[33px] w-[175px] rounded-sm">
                    <button
                        onClick={handleGetStatement}
                        disabled={!selectedDataSource || !dateRange.from || !dateRange.to}
                        className={`${selectedDataSource && dateRange.from && dateRange.to
                            ? "bg-[#264151]" // Blue when all data is filled
                            : "bg-[#697C87]" // Gray when data is incomplete
                            } text-white font-bold px-3 py-1 rounded-sm text-sm w-[100%] h-[100%]`}
                    >
                        Get Statement
                    </button>
                </div>

            </div>

            <div className='bg-[#fff] rounded-md border-t-2 border-l-gray-400 border-r-gray-400'>
                <h1 className='bg-[#273f5a] text-white px-1 py-1'>Account Statement</h1>
                <div className='px-2 w-full overflow-x-scroll'>
                    <div className='w-[80vw] max-lg:w-[150vw] mt-3'>
                        <table className="w-full overflow-scroll my-3 border border-gray-400 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-black bg-gray-300 border-b border-gray-500">
                                <tr className="border border-gray-400">
                                    <th className="border-r border-slate-400 text-center cursor-pointer px-5" onClick={handleSortDateTime}>
                                        <div className="flex justify-between">
                                            <span className="flex-1 text-center">Date/Time</span>
                                            <span>{getSortIcon("created_at")}</span>
                                        </div>
                                    </th>
                                    <th className="border-r border-gray-400 text-center cursor-pointer" onClick={handleSortDeposit}>
                                        <div className="flex justify-between">
                                            <span className="flex-1 text-center">Deposit</span>
                                            <span>{getSortIcon("deposit")}</span>
                                        </div>
                                    </th>
                                    <th className="border-r border-gray-400 text-center cursor-pointer" onClick={handleSortWithdraw}>
                                        <div className="flex justify-between">
                                            <span className="flex-1 text-center">Withdraw</span>
                                            <span>{getSortIcon("withdraw")}</span>
                                        </div>
                                    </th>
                                    <th className="border-r border-gray-400 text-center cursor-pointer" onClick={handleSortBalance}>
                                        <div className="flex justify-between">
                                            <span className="flex-1 text-center">Balance</span>
                                            <span>{getSortIcon("balance")}</span>
                                        </div>
                                    </th>
                                    <th className="border-r border-gray-400 text-center cursor-pointer" onClick={handleSortRemarks}>
                                        <div className="flex justify-between">
                                            <span className="flex-1 text-center">Remarks</span>
                                            <span>{getSortIcon("remarks")}</span>
                                        </div>
                                    </th>
                                    <th className="border-r border-gray-400 py-3 text-center cursor-pointer" onClick={handleSortFromTo}>
                                        <div className="flex justify-between">
                                            <span className="flex-1 text-center">From/To</span>
                                            <span>{getSortIcon("from_to")}</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((item, index) => (

                                        <tr key={index} className="bg-white border-b border-gray-300">
                                            <td className="border border-gray-400 py-3 px-4 text-center">
                                                {formatDateTime(item?.created_at)}
                                            </td>
                                            <td className="font-bold border border-gray-400 py-3 px-4 text-center">
                                                {item?.type === "credit" ? (
                                                    item?.point ? (
                                                        <span className="text-blue-900">{item?.point}</span>
                                                    ) : (
                                                        <span className="text-blue-900">0</span>
                                                    )
                                                ) : null}
                                            </td>
                                            <td className="border border-gray-400 py-3 px-4 text-center">
                                                {item?.type === "debit" ? (
                                                    item?.point ? (
                                                        <span className="text-red-500">({item?.point})</span>
                                                    ) : (
                                                        <span className="text-red-500">-</span>
                                                    )
                                                ) : null}
                                            </td>
                                            <td className="border border-gray-400 py-3 px-4 text-center">
                                                {item?.balance}
                                            </td>
                                            <td className="border border-gray-400 py-3 px-4 text-center">
                                                {item?.remarks}
                                            </td>
                                            <td className="border border-gray-400 py-3 px-4 text-center">
                                                {item?.from_to}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="bg-white border-b border-gray-300">
                                        <td colSpan={6} className="text-center py-3">
                                            No data!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className='flex flex-col items-center font-normal text-sm'>
                            <div>
                                <p>Showing 0 to 0 of 0 entries</p>
                            </div> <br />
                            <div className='flex gap-5 text-gray-500 '>
                                <p>First</p>
                                <p>Previous</p>
                                <p>Next</p>
                                <p>Last</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* phonepe code  */}
            <div className="flex justify-center mt-6">
                {/* <h2>Add Money</h2> */}
                <input
                    type="number"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>
            <button
                onClick={handlePayment}
                className="w-full bg-blue-600 text-white py-2 rounded-md bg-blue-600 transition duration-300"
            >
                Pay with PhonePe
            </button>
            {/* qr page */}
            <div className="max-w-xl mx-auto m-10 space-y-4">
                {/* Pay QR Code */}
                <div className="flex items-center">
                    <label className="w-40 font-bold text-gray-700">Pay QR Code:</label>
                    <span className="text-gray-900">

                        <img className='w-[14rem]' src={qr_Code } alt="" />
                    </span>
                </div>

                {/* Pay UPI */}
                <div className="flex items-center">
                    <label className="w-40 font-bold text-gray-700">Pay UPI:</label>
                    <span className="text-gray-900">boim-407011110235@boi</span>
                </div>
            </div>

        </div>
    );

}

export default AccountStatement;
