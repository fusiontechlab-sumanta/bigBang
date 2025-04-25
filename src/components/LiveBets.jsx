import React, { useState } from "react";
import { getApiWithToken } from "../utils/api";
import { useQuery } from "react-query";
import { RxCross2 } from "react-icons/rx";
import { MdChevronRight, } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
function LiveBets({ hideLiveBets }) {
    const [selectedEventId, setSelectedEventId] = useState("");
    const [lastBetUrl, setLastBetUrl] = useState("");
    const [down, setdown] = useState()
    const [allBet, setallBet] = useState([])

    let baseUrl = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_BATED_SPORRS}`;

    // Fetch last bet data
    const { data, isLoading, isError } = useQuery(["BATED-SPORRS"], () =>
        getApiWithToken(baseUrl)
    );

    // Fetch last bet data dynamically based on selected event
    // const { data: allBet } = useQuery(
    //     ["ALL-BET-BY-EVENT", selectedEventId],
    //     () => getApiWithToken(lastBetUrl),
    //     {
    //         enabled: !!selectedEventId, // Only fetch when selectedEventId is set
    //     }
    // );

    // const handleChange = (event) => {
    //     const eventId = event.target.value;
    //     setLastBetUrl(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_ALL_BET_BY_EVENT}${eventId}`);
    //     setSelectedEventId(eventId);
    // };

    const handleChange = async (eventOrId) => {
        let eventId;
        setallBet([])
        if (typeof eventOrId === "string" || typeof eventOrId === "number") {
            // If it's a direct ID (from button click)
            eventId = eventOrId;
        } else if (eventOrId?.target?.value) {
            // If it's an event object (from <select>)
            eventId = eventOrId.target.value;
        } else {
            console.error("Invalid input to handleChange:", eventOrId);
            return;
        }

        // Set active dropdown ID
        setdown(eventId);

        try {
            const url = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_ALL_BET_BY_EVENT}${eventId}`;
            const data = await getApiWithToken(url);

            setallBet(data); // Corrected setallBet usage
        } catch (error) {
            console.error("Error fetching bet data:", error);
        }
    };


    console.log("uuuuuu", allBet);


    return (
        <div className="bg-white w-full h-screen box-border shadow-md border-l text-sm" style={{
            position: "fixed",
            width: "100%",
            height: "100vh",
            // top: 0,
            // bottom: 0,
            left: 0,
            right: 0,
            zIndex: '9999',
            overflow: "scroll", // Added missing comma

        }}>
            {/* Header Section */}

            {/* <div className="  bg-gradient-to-b from-blue-900 to-gray-950 text-white px-1 py-1 font-semibold">
                <div className="justify-between">
                    <h1>Open Bets</h1>
                    <RxCross2 onClick={hideLiveBets} />
                </div>
            </div> */}

            <div className="bg-gradient-to-b from-blue-900 to-gray-950 text-white px-3 py-2 font-semibold"
                style={{
                    position: "fixed",
                    width: "100%",
                    zIndex: '9999',

                }}>
                <div className="flex justify-between items-center">
                    {/* Left-aligned Title */}
                    <h1 className="text-lg">Open Bets</h1>

                    {/* Right-aligned Close Button */}
                    <button onClick={hideLiveBets} className="text-white text-xl">
                        <RxCross2 />
                    </button>
                </div>
            </div>


            {/* Dropdown for match selection */}
            <div className="border border-gray-300 px-2 py-1 text-sm"
                style={{
                    position: "relative",
                    width: '100%',
                    top: "72px",
                    overflow: 'scroll',
                    zIndex: '333',

                }}>
                {/* <select
                    className="w-full bg-white border border-gray-400 px-1 py-1"
                    onChange={handleChange}
                    value={selectedEventId}
                >
                    <option value="">Select an event</option>
                    {data?.data
                        ?.filter((item) => item.team_name) 
                        .map((item) => (
                            <option key={item.event_id} value={item.event_id} className="text-black">
                                {item.team_name}
                            </option>
                        ))}
                </select> */}
                <div className="p-0">
                    {data?.data?.filter((item) => item.team_name).map((item) => (
                        <div
                            key={item.event_id}
                            className="flex justify-between items-center border-b last:border-b-0 p-0 hover:bg-gray-100 cursor-pointer"
                        >

                            <span onClick={() => handleChange(item.event_id)} className="text-[#3a8dc5] font-semibold flex-1 truncate">
                                {item.team_name}
                            </span>
                            <button
                                className="p-2 rounded-md border border-gray-300 hover:bg-gray-200 flex items-center justify-center w-10 h-10"
                                onClick={() => handleChange(item.event_id)}
                            >
                                {down != item.event_id ? <> <MdChevronRight className="text-gray-500 text-xl transition-transform duration-300" /></> : <>
                                    <FaChevronDown size={12} className="text-gray-500 text-xl transition-transform duration-300" />
                                </>}

                            </button>
                        </div>
                    ))}
                </div>

            </div><br />

            {/* Matched Bets Section */}
            <div className="p-2" style={{ "margin-top": "60px" }}>
                <div className="bg-gray-100 w-full flex justify-start">
                    <h2 className="bg-white px-2 py-1 font-semibold" style={{ marginTop: "-1px" }}>Matched</h2>
                </div>

                {/* Back Bet Section */}
                <div className="rounded my-1 overflow-x-auto" style={{ backgroundColor: "#B7D5EB" }}>
                    <table className="w-full min-w-max h-full text-left">
                        {/* Back Bets Section */}
                        {allBet?.data?.filter((bet) => bet.type === "Back" || bet.type === "Yes").length > 0 && (
                            <thead className="bg-white text-black">
                                <tr style={{ fontSize: "11px" }}>
                                    <th className="px-2 py-1" style={{ width: "50%" }}>Back (Bet For)</th>
                                    <th className="px-2 py-1">Odds</th>
                                    <th className="px-2 py-1">Stake</th>
                                    <th className="px-2 py-1" style={{ textAlign: "right" }}>Profit</th>
                                </tr>
                            </thead>
                        )}
                        <tbody>
                            {allBet?.data
                                ?.filter((bet) => bet.type === "Back" || bet.type === "Yes") // Filter only Back bets
                                .map((bet, index) => (
                                    <React.Fragment key={bet.id}>
                                        {/* Time Row */}
                                        <tr className="bg-blue-200 text-xs text-gray-700 font-normal">
                                            <td colSpan="4" className="px-1 py-1 text-left">
                                                Ref: {bet.date}
                                            </td>
                                        </tr>
                                        <tr className="border-b text-xs bg-blue-300 border-blue-500">
                                            <td className="px-2 py-2 flex items-center">
                                                <button className="text-white px-1 py-1 rounded mr-2 bg-blue-600" style={{ fontSize: "10px" }}>
                                                    {bet.market_name === "FANCY_ODDS" ? "Back" : bet.type.toUpperCase()}
                                                </button>
                                                <div>
                                                    <p className="text-black font-bold" style={{ fontSize: "11px" }}>{bet.selection}</p>
                                                    <h5 className="text-gray-500 font-medium" style={{ fontSize: "10px" }}>{bet.market_name}</h5>
                                                </div>
                                            </td>
                                            <td className="py-2 text-center">{bet.odd_req}</td>
                                            <td className="py-2 text-center">{bet.stack}</td>
                                            {bet.market_name === "FANCY_ODDS" ? <td className="py-2 text-center">{(Number(bet.odd_req.split("/")[1]) / 100) * Number(bet.stack)}(-{bet.stack})</td> : <td className="py-2 text-center">{bet.odd_req * bet.stack - bet.stack}(-{bet.stack})</td>}
                                        </tr>
                                    </React.Fragment>
                                ))}
                        </tbody>

                        {/* Lay Bets Section */}
                        {allBet?.data?.filter((bet) => bet.type === "Lay" || bet.type === "No").length > 0 && (
                            <thead className="bg-white text-black">
                                <tr style={{ fontSize: "11px" }}>
                                    <th className="px-2 py-1" style={{ width: "50%" }}>Lay (Bet Against)</th>
                                    <th className="px-2 py-1">Odds</th>
                                    <th className="px-2 py-1">Stake</th>
                                    <th className="px-2 py-1" style={{ textAlign: "right" }}>Profit</th>
                                </tr>
                            </thead>
                        )}

                        <tbody>
                            {allBet?.data
                                ?.filter((bet) => bet.type === "Lay" || bet.type === "No") // Filter only Lay bets
                                .map((bet, index) => (
                                    <React.Fragment key={bet.id}>
                                        {/* Time Row */}
                                        <tr className="bg-red-200 text-xs text-gray-700 font-normal">
                                            <td colSpan="4" className="px-1 py-1 text-left">
                                                Ref: {bet.date}
                                            </td>
                                        </tr>
                                        <tr className="border-b text-xs bg-red-300 border-red-500">
                                            <td className="px-2 py-2 flex items-center">
                                                <button className="text-white px-1 py-1 rounded mr-2 bg-red-600" style={{ fontSize: "10px" }}>
                                                    {bet.market_name === "FANCY_ODDS" ? "Lay" : bet.type.toUpperCase()}
                                                </button>
                                                <div>
                                                    <p className="text-black font-bold" style={{ fontSize: "11px" }}>{bet.selection}</p>
                                                    <h5 className="text-gray-500 font-medium" style={{ fontSize: "10px" }}>{bet.market_name}</h5>
                                                </div>
                                            </td>
                                            <td className="py-2 text-center">{bet.odd_req}</td>
                                            <td className="py-2 text-center">{bet.stack}</td>
                                            {bet.market_name === "FANCY_ODDS" ? <td className="py-2 text-center">{bet.stack}(-{(Number(bet.odd_req.split("/")[1]) / 100) * Number(bet.stack)})</td> : <td className="py-2 text-center">{bet.stack}(-{bet.odd_req * bet.stack - bet.stack})</td>}
                                        </tr>
                                    </React.Fragment>
                                ))}
                        </tbody>
                    </table>
                </div>

            </div>

            {/* Bet Info Checkbox */}
            <div className="p-2 border-t flex items-center">
                <input type="checkbox" className="mr-2" checked readOnly />
                <span>Bet Info</span>
            </div>
        </div>
    );
}

export default LiveBets;
