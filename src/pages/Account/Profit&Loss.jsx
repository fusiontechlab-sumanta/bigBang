import React, { useState } from 'react'
import { getApiWithToken } from "../../utils/api";
import { useQuery } from "react-query";
import ProfitLossTable from '../../components/ProfitLossTable';

function ProfitLoss() {

    const [formData, setFormData] = useState({
        dataSource: "",
        startDate: "",
        endDate: "",
    });

    const [steps, setsteps] = useState(1)

    // Handle changes for select and inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle button click to get P&L
    const handleGetPL = () => {
        console.log("Form Data:", formData);
        // You can make an API call here using formData
    };

    let baseUrl = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_PROFIT_LOSS}`;
    // Fetch last bet data
    const { data, isLoading, isError } = useQuery(["PROFIT-LOSS"], () =>
        getApiWithToken(baseUrl)
    );


    console.log(data, "tttttttttttttt");

    const updateStep = (no) => {
        setsteps(no+1)
        console.log(no, "tttttttttttttt");
      };
      
    return (
        <div className='mb-36 lg:mb-2'>
            <div className="grid grid-cols-4 gap-x-3 gap-y-4 max-md:grid-cols-1 my-6 border border-black rounded-md p-3 border-t-2 border-b-[#0000007d] border-l-gray-400 border-r-gray-400">
                {/* Select Data Source */}
                <div>
                    <select
                        name="dataSource"
                        value={formData.dataSource}
                        onChange={handleChange}
                        className="p-1 py-2 border border-gray-300 rounded-md focus:border-4 focus:border-blue-300 w-full text-gray-400"
                    >
                        <option value="" disabled>
                            Data Source
                        </option>
                        <option value="LIVE DATA">LIVE DATA</option>
                        <option value="BACKUP DATA">BACKUP DATA</option>
                        <option value="OLD DATA">OLD DATA</option>
                    </select>
                </div>

                {/* Start Date */}
                <div className="w-full">
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="appearance-none w-full bg-[#e5e7ea] border border-[#ccc] rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* End Date */}
                <div className="w-full">
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="appearance-none w-full bg-[#e5e7ea] border border-[#ccc] rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* Get P&L Button */}
                <div className="flex justify-start">
                    <button
                        onClick={handleGetPL}
                        disabled={!formData.dataSource || !formData.startDate || !formData.endDate}
                        className={`${formData.dataSource && formData.startDate && formData.endDate
                                ? "bg-[#233d4b]" // Blue when all data is filled
                                : "bg-[#66767f]" // Gray when data is incomplete
                            } text-white font-bold px-12 py-1 text-sm md:text-base w-[180px] ${!formData.dataSource || !formData.startDate || !formData.endDate
                                ? "cursor-not-allowed"
                                : ""
                            }`}
                    >
                        Get P&L
                    </button>

                </div>
            </div>

        <ProfitLossTable data={data}/>
        </div>
    )
}

export default ProfitLoss






