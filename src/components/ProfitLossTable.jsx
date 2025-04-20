import { useState } from "react";

const ProfitLossTable = ({ data }) => {
    const [step, setStep] = useState(1);
    const [i, seti] = useState()

    const updateStep = (nextStep, index) => {
        console.log(nextStep, index, "KKKKKKKKK");
        setStep(nextStep);
        if (nextStep === 3) {  // Update 'i' when step becomes 3
            seti(index);
        }
    };


    return (
        <div className="bg-white font-bold rounded-md border-l-gray-400 border-r-gray-400">
            <h1 className="bg-[#27404f] text-sm text-white p-2">Profit/Loss</h1>
            <div className="px-2 w-full overflow-x-scroll">
                <div className="flex justify-end mt-5">
                    <button className="bg-[#faa9ba] py-[5px] border-[#000] text-xs border px-2">Back</button>
                    <button className="bg-[#72bbef] py-[5px] border-[#000] text-xs border ml-1 px-2">Lay</button>
                    <button className="bg-[] py-[5px] border-[#000] text-xs border ml-1 px-2">Void</button>
                </div>
                <div className="w-full max-lg:w-[103vw] mt-3">
                    <table className="w-full my-3 border border-gray-400 text-sm text-gray-500">
                        <thead className="text-black bg-gray-300 border-b border-gray-500">
                            <tr className="border border-gray-400">
                                {step >= 1 && (
                                    <th className="border-r border-slate-400 py-3 text-center px-[40px]">Sport Name</th>
                                )}
                                {step >= 2 && (
                                    <th className="border-r border-gray-400 py-3 text-center px-[50px]">Event Name</th>
                                )}
                                {step === 3 && (
                                    <th className="border-r border-gray-400 py-3 text-center px-[50px]">MATCH ODDS</th>
                                )}
                                {step === 3 && (
                                    <th className="border-r border-gray-400 py-3 text-center px-[50px]">Result</th>
                                )}
                                <th className="border-r border-gray-400 py-3 text-center px-[50px]">Profit&Loss</th>
                                {step <= 3 && (
                                    <th className="border-r border-gray-400 py-3 text-center px-[50px]">Commission</th>
                                )}
                                {step <= 2 && (
                                    <th className="border-r border-gray-400 py-3 text-center px-[50px]">Total P&L</th>
                                )}
                                {step === 3 && (
                                    <th className="border-r border-gray-400 py-3 text-center px-[50px]">Time</th>
                                )}
                                {step === 4 && (
                                    <th className="border-r border-gray-400 py-3 text-center px-[50px]">Market Name</th>
                                )}
                                {step === 4 && (
                                    <th className="border-r border-gray-400 py-3 text-center px-[50px]">Selection Name</th>
                                )}
                                {step === 4 && (
                                    <th className="border-r border-gray-400 py-3 text-center px-[50px]">Bet Type</th>
                                )}
                                {step === 4 && (
                                    <th className="border-r border-gray-400 py-3 text-center px-[50px]">User Price</th>
                                )}
                                {step === 4 && (
                                    <th className="border-r border-gray-400 py-3 text-center px-[50px]">Place Date</th>
                                )}
                                {step === 4 && (
                                    <th className="border-r border-gray-400 py-3 text-center px-[50px]">Match Date</th>
                                )}
                                {step === 4 && (
                                    <th className="border-r border-gray-400 py-3 text-center px-[50px]">Amount</th>
                                )}

                            </tr>
                        </thead>
                        <tbody>
                            {step === 1 && (
                                <tr className="text-center border border-b">
                                    <td
                                        onClick={() => updateStep(2)}
                                        className="py-3 border-r border-slate-400 text-[#3591d1] cursor-pointer"
                                    >
                                        {data?.latest_bets[0]?.bet_data?.sports_name}
                                    </td>
                                    <td className="text-[#2e9229] py-3 border-r border-slate-400">
                                        {data?.summary?.net_profit}
                                    </td>
                                    <td className="py-3 border-r border-slate-400">{data?.summary?.commission}</td>
                                    <td className="py-3 border-r border-slate-400 text-[#2e9229]">
                                        {data?.summary?.net_profit}
                                    </td>
                                </tr>
                            )}
                            {step === 2 && (
                                <>
                                    {data?.latest_bets.map((item, index) => (
                                        <tr key={index} className="text-center border border-b-[#000]">
                                            <td className="py-3 border-r border-slate-400 text-[#3591d1]">
                                                {item?.bet_data?.sports_name}
                                            </td>
                                            <td
                                                onClick={() => updateStep(3, index)}
                                                className="py-3 border-r border-slate-400 text-[#3591d1] cursor-pointer"
                                            >
                                                {item?.bet_data?.team_name || "N/A"}
                                            </td>
                                            <td className="text-[#2e9229] py-3 border-r border-slate-400">
                                                {item?.profit}
                                            </td>
                                            <td className="py-3 border-r border-slate-400">{0}</td>
                                            <td className="py-3 border-r border-slate-400 text-[#2e9229]">
                                                {item?.net}
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            )}
                            {step === 3 && i !== null && (
                                <>
                                    {data?.latest_bets.length > i && (
                                        <tr key={i} className="text-center border border-b">
                                            <td className="py-3 border-r border-slate-400 text-[#3591d1]">
                                                {data.latest_bets[i]?.bet_data?.sports_name}
                                            </td>
                                            <td

                                                className="py-3 border-r border-slate-400 text-[#3591d1] "
                                            >
                                                {data.latest_bets[i]?.bet_data?.team_name || "N/A"}
                                            </td>
                                            <td onClick={() => updateStep(4, i)}
                                                className="text-[#2e9229] py-3 border-r border-slate-400 cursor-pointer">
                                                {data.latest_bets[i]?.bet_data?.market_name}
                                            </td>
                                            <td className="text-[#2e9229] py-3 border-r border-slate-400">
                                                {data.latest_bets[i]?.bet_data?.selection}
                                            </td>
                                            <td className="py-3 border-r border-slate-400 text-[#2e9229]">
                                                {data.latest_bets[i]?.net}
                                            </td>
                                            <td className="py-3 border-r border-slate-400">{0}</td>
                                            <td className="py-3 border-r border-slate-400">
                                                {data.latest_bets[i]?.bet_data?.date}
                                            </td>
                                        </tr>
                                    )}
                                </>
                            )}
                            {step === 4 && i !== null && data?.latest_bets.length > i && (
                                <>
                                    {data?.latest_bets.map((item, index) => (
                                        <tr key={index} className={`text-center border border-b ${item?.bet_data?.type === "Lay" ? "bg-[#faa9ba]" : "bg-[#72bbef]"} `}>
                                            <td className="py-3 border-r border-slate-400 font-[400] text-[#212529]">
                                                {item?.bet_data?.sports_name}
                                            </td>
                                            <td className="py-3 border-r border-slate-400 font-[400] text-[#212529]">
                                                {item?.bet_data?.team_name || "N/A"}
                                            </td>
                                            <td
    onClick={() => updateStep(4, index)}
    className="font-[400] py-3 border-r border-slate-400 cursor-pointer"
>
    {item?.bet_data?.type === "Lay" ? (
        <>
             <span className="text-[#198754]">{item?.bet_data?.odd_req * item?.bet_data?.stack - item?.bet_data?.stack}</span> 
            <span className="text-[#dc3545]"> (-{item?.bet_data?.stack})</span>
        </>
    ) : (
        <>
            <span className="text-[#198754]">{item?.bet_data?.stack}</span>
            <span className="text-[#dc3545]"> (-{item?.bet_data?.odd_req * item?.bet_data?.stack - item?.bet_data?.stack})</span>
        </>
    )}
</td>

                                            <td className="text-[#2e9229] py-3 border-r border-slate-400 font-[400] text-[#212529]" >
                                                {item?.bet_data?.market_name}
                                            </td>
                                            <td className="py-3 border-r border-slate-400 text-[#2e9229] font-[400] text-[#212529]">
                                                {item?.bet_data?.event_name
                                                }
                                            </td>
                                            <td className="py-3 border-r border-slate-400 font-[400] text-[#212529]"> {item?.bet_data.type}</td>
                                            <td className="py-3 border-r border-slate-400 font-[400] text-[#212529]">
                                                {item?.bet_data.odd_req}
                                            </td>
                                            <td className="py-3 border-r border-slate-400 font-[400] text-[#212529]">
                                                {item?.bet_data?.date}
                                            </td>
                                            <td className="py-3 border-r border-slate-400 font-[400] text-[#212529]">
                                                {item?.bet_data?.match_time}
                                            </td>
                                            <td className="py-3 border-r border-slate-400 font-[400] text-[#212529]">
                                                {item?.bet_data?.stack}
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            )}


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProfitLossTable;
