import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { CiMenuKebab } from "react-icons/ci";
import { FaArrowRight, FaGreaterThan } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { GetAllSportsAction } from '../redux/action/action';
import socket from '../socket';
import { IoIosArrowDown } from 'react-icons/io';

function LeftSidebar() {
    const navigate = useNavigate();
    const [sportList, setSportList] = useState([]);
    const [dropDown, setDropDown] = useState('');
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [matchData, setMatchData] = useState({});

    const Events = [
        { name: "Cricket" },
        { name: "Tennis" },
        { name: "Casino" },
        { name: "Football" },
        { name: "Lottery" },
    ];

    const [sport, setSport] = useState({
        "Cricket": false,
        "Tennis": false,
        "Casino": false,
        "Football": false,
        "Lottery": false,
    });


    const handleEventClick = (name) => {
        socket.emit("getSeriesList", { gameName: name });
        setSport(prev => ({ ...prev, [name]: !prev[name] }));
    };

    useEffect(() => {
        const handleSeriesData = (data) => {
            console.log(data, "----");

            setSportList(data);
        };
        const handleMatchData = (newData) => {
            setMatchData((prevData) => {
                const updatedData = { ...prevData };

                newData.forEach((newItem) => {
                    const seriesName = newItem.seriesName;

                    if (!updatedData[seriesName]) {
                        // New series group — just assign it
                        updatedData[seriesName] = [newItem];
                        console.log("New series added:", seriesName);
                    } else {
                        const alreadyExists = updatedData[seriesName].some(
                            (item) => item.eventId === newItem.eventId
                        );

                        if (!alreadyExists) {
                            updatedData[seriesName].push(newItem);
                            console.log(`New match added to '${seriesName}':`, newItem);
                        }
                    }
                });

                return updatedData;
            });
        };





        socket.on("seriesData", handleSeriesData);
        socket.on("getAllMatchesBySeriesIdAndGameName", handleMatchData);

        return () => {
            socket.off("seriesData", handleSeriesData);
            socket.off("seriesgetAllMatchesBySeriesIdAndGameNameData", handleMatchData);
        };
    }, []);

    const closeGameAction = () => {
        setSport(() => {
            const resetSportState = {};
            Object.keys(sport).forEach((key) => {
                resetSportState[key] = false;
            });
            setMatchData({})
            setDropDown('')
            return resetSportState;
        });
    };

    const handleDropdownToggle = (categoryName, gamename, id) => {
        console.log({ gameName: categoryName });

        socket.emit("getAllMatchesBySeriesIdAndGameName", { gameName: categoryName })
        setDropDown((prev) => ({
            ...prev,
            [categoryName]: !prev[categoryName], // Toggle the dropdown value
        }));
    };

    const handleBookie = (key, eventId) => {
        if (!key || !eventId) {
            console.error("Invalid key or eventId");
            return;
        }
        // Emit socket event
        if (key.toLowerCase() == 'cricket') {
            socket.emit("getoddByMatchId", { eventId });
        }
        else {
            socket.emit("getAllMarketListByMatchId", { eventId });
        }
        // console.log("Emitted getAllMarketListByMatchId event with eventId:", eventId);
        navigate(`/fullmarket/${key}/${eventId}`)

    };

    console.log(matchData, "matchdata");

    return (
        <div className="bg-white max-w-[17.5vw] h-screen box-border ml-[20px] fixed" >
            <div className="flex flex-col fixed w-[17.5vw] h-[100vh] p-0">
                <div className="transition duration-75 overflow-hidden relative flex-1 hover:overflow-y-auto">
                    <div className="flex justify-between py-1 bg-gradient-to-b from-[#2E4D8F] to-[#162443] text-white">
                        <CiMenuKebab onClick={closeGameAction} className="text-xl cursor-pointer" />
                        <p onClick={closeGameAction} className="text-sm font-semibold cursor-pointer">Sports</p>
                    </div>
                    <div className="relative h-[43.2vh]">
                        <div className="ps-3 pe-1 min-w-[17.5vw]">
                            {!Object.values(sport).some(value => value) &&
                                <div className="relative h-[142vh] mb-28">
                                    {Events.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleEventClick(item.name)}
                                            className="flex justify-between my-1 border-b p-1 cursor-pointer hover:text-[#80a536] hover:bg-opacity-40 hover:bg-[rgb(181,241,127)]"
                                        >
                                            <p className="text-sm">{item.name}</p>
                                            <div className="flex items-center">
                                                <p className="border rounded-md border-[#68c040] text-[#68c040] p-0.5">
                                                    <FaGreaterThan className="text-xs" />
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                            {Object.keys(sport)
                                .filter(key => sport[key])
                                .map(key => {
                                    if (key === "Casino") {
                                        navigate("/livecasino");
                                        closeGameAction();
                                        return null;
                                    }
                                    if (key === "Lottery") {
                                        navigate("/lottery");
                                        closeGameAction();
                                        return null;
                                    }
                                    return (
                                        <div key={key} className="relative h-[142vh]">
                                            {sportList.map((item, index) => (
                                                <div key={index}>
                                                    <div
                                                        onClick={() => handleDropdownToggle(item?.seriesName, key, item?.gameId)}
                                                        className="flex justify-between my-1 cursor-pointer border-b p-1 hover:text-[#80a536] hover:bg-opacity-40 hover:bg-[#b5f17f]"
                                                    >
                                                        <p className="text-sm">{item?.seriesName}</p>
                                                        <div className="flex items-center justify-center">
                                                            <p className="border rounded-md border-[#68c040] text-[#68c040] p-0.5">
                                                                {dropDown[item?.seriesName]
                                                                    ? <IoIosArrowDown className="text-xs" />
                                                                    : <FaGreaterThan className="text-xs" />}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {dropDown[item?.seriesName] &&
                                                        matchData[item?.seriesName]?.map((dropdownItem, idx) => (
                                                            <button
                                                                key={idx}
                                                                onClick={() => handleBookie(key, dropdownItem?.eventId)}
                                                                // to={`/fullmarket/${key}/${dropdownItem?.event?.id}`}
                                                                className="cursor-pointer hover:text-[#68c040] hover:bg-[#abda95] ps-3 py-1 border-b flex"
                                                            >
                                                                <div className="flex ">
                                                                    <FaArrowRight className="text-xs mt-1" />
                                                                    <p className="text-sm ms-2 text-left ">{dropdownItem?.eventName}</p>
                                                                </div>
                                                            </button>
                                                        ))}

                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftSidebar;
