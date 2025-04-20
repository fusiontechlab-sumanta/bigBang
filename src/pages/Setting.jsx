import React, { useState } from "react";
import { IoSettings } from "react-icons/io5";

const SettingsPage = () => {
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [selectedQuickStake, setSelectedQuickStake] = useState(null);

    const themes = [
        { top: "bg-yellow-500", bottom: "bg-black" },
        { top: "bg-teal-500", bottom: "bg-black" },
        { top: "bg-orange-500", bottom: "bg-black" },
        { top: "bg-red-500", bottom: "bg-black" },
        { top: "bg-pink-500", bottom: "bg-black" },
        { top: "bg-green-500", bottom: "bg-black" },
        { top: "bg-blue-500", bottom: "bg-black" },
        { top: "bg-indigo-500", bottom: "bg-black" },
      ];
      

    const quickStakes = [100, 150, 200, 300, 400, 500, 1000, 1500];

    return (
        <div className="bg-gray-100 min-h-screen w-full p-4">
            <div className="bg-white rounded-lg shadow-lg w-full  ">
                {/* Header */}
                <div className="flex py-3 px-1 bg-gradient-to-t from-[#50A023] to-[#A3DB5F]  items-center mb-6 gap-1">
                    <IoSettings className="text-2xl" />
                    <h1 className="text-xl font-bold text-gray-800">Setting</h1>

                </div>
                <div className="flex justify-between items-center px-2 py-2  bg-gradient-to-t from-[#243948] to-[#2D495B] text-white">
                    <h2 className="text-lg font-semibold  ">Theme</h2>
                    <button className="text-sm font-semibold flex items-center">
                        Default <span className="ml-2">&#x21bb;</span>
                    </button>
                </div>

                {/* Theme Section */}
                <div className="mb-6">
                    <div className="grid grid-cols-4 gap-2 p-2">
                        {themes.map((theme, index) => (
                            <div
                                key={index}
                                className={`w-12 h-12 rounded-full relative overflow-hidden border-4 ${selectedTheme === index ? "border-blue-400" : "border-gray-300"} cursor-pointer`}
                                onClick={() => setSelectedTheme(index)}
                            >
                                {/* Top Half */}
                                <div className={`absolute top-0 left-0 w-full h-1/2 ${theme.top}`}></div>
                                {/* Bottom Half */}
                                <div className={`absolute bottom-0 left-0 w-full h-1/2 ${theme.bottom}`}></div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Stake Section */}
                <div className="mb-6">
                    <h2 className=" bg-gradient-to-t from-[#243948] to-[#2D495B] text-lg font-semibold text-white  py-2 px-1">Stake</h2>
                    <p className=" px-1 my-2 text-[#243A48] font-semibold">Quick Stakes</p>
                    <div className="grid grid-cols-4 gap-4 p-1">
                        {quickStakes.map((stake, index) => (
                            <button
                                key={index}
                                className={`border-2 border-t-[#2526BC] border-b-[#68A0E9] border-r-[#2526BC] border-l-[#68A0E9] py-2  text-gray-700 font-medium ${selectedQuickStake === stake
                                    ? "bg-blue-500 text-white border-blue-500"
                                    : "hover:bg-gray-200"
                                    }`}
                                onClick={() => setSelectedQuickStake(stake)}
                            >
                                {stake}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Save Button */}
                <button className="w-full bg-gradient-to-t from-[#bg-gradient-to-t from-[#243948] to-[#2D495B]] to-[#2E4D8D] text-white py-2 rounded-lg font-semibold ">
                    Save
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
