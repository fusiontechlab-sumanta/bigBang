import React, { useEffect, useState } from 'react'
import { BsStopwatch } from 'react-icons/bs'
import { FaArrowRight, FaGreaterThan } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { MdPushPin } from "react-icons/md";
import { BiSolidCricketBall } from "react-icons/bi";
import { GiSoccerBall } from "react-icons/gi";
import { IoTennisballSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux'
import { GetAllSportsAction, setCricket, setSoccer, setTennis } from '../redux/action/action';
import { getCricketLeagueAction, getSoccerLeagueAction, getTennisLeagueAction } from '../redux/action/leagueAction';
import { IoIosArrowDown } from 'react-icons/io';
import socket from '../socket';

function Sports() {
    const navigate = useNavigate();
    const [sportList, setSportList] = useState([]);
    const [dropDown, setDropDown] = useState('');
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

    const handleTabchange=(name)=>{
        setMatchData({})
        closeGameAction();
        handleEventClick(name);
    }

    const handleEventClick = (name) => {
        socket.emit("getSeriesList", { gameName: name });
        setSport(prev => ({ ...prev, [name]: !prev[name] }));
    };

    useEffect(() => {
        const handleSeriesData = (data) => {
            setSportList(data);
        };
        const handleMatchData = (data) => {

            // Create a copy of the existing match data to avoid direct state mutation
            setMatchData((prevData) => {
                // Create an updated object, using the previous data as a base
                const updatedData = { ...prevData };

                // Iterate through the incoming data and add/update the key-value pair
                data.forEach(item => {
                    const competitionName = item.competition.name;

                    // Check if the competition name exists
                    if (updatedData[competitionName]) {
                        // Check if the event is already in the list (using event ID as a unique identifier)
                        const isEventAlreadyAdded = updatedData[competitionName].some(
                            (existingItem) => existingItem.event.id === item.event.id
                        );

                        // Only add the event if it's not already in the list
                        if (!isEventAlreadyAdded) {
                            updatedData[competitionName].push(item);
                        }
                    } else {
                        // If the competition name doesn't exist, create a new key-value pair
                        updatedData[competitionName] = [item];
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
        socket.emit("getAllMatchesBySeriesIdAndGameName", { seriesId: id, gameName: gamename })
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

    // console.log(matchData, "matchdata");
    return (
        <div className='mb-56 bg-white  lg:hidden'>
            <h1 className='text-center bg-[#233c4d] text-white  font-semibold py-3 max-sm:py-1 max-sm:text-sm text-3xl'>Quick Links</h1>
            <div className='grid grid-cols-5 bg-[#0d1735]  ' >
                <div className='border-e border-e-gray-700 flex justify-center'>
                    <Link to='/inplay' className='text-white max-sm:text-sm p-3 '>
                        <div className='flex justify-center'>
                            <BsStopwatch className=' text-2xl' />

                        </div>

                        <p className='font-bold text-center leading-[13px] mt-1 text-sm'>In-Play</p>

                    </Link>
                </div>
                <div className='border-e border-e-gray-700 flex justify-center'>
                    <Link to='/multimarket' className='text-white p-3 max-sm:text-sm'>
                        <div className='flex justify-center'>
                            <MdPushPin className=' text-3xl' />

                        </div>

                        <p className='font-bold text-center leading-[13px] text-sm'>Multi Market</p>

                    </Link>
                </div>
                <div className='border-e border-e-gray-700 flex justify-center'>
                    <div onClick={() => handleTabchange('Cricket')} className='text-white p-3 max-sm:text-sm'>
                        <div className='flex justify-center'>
                            <BiSolidCricketBall className=' text-3xl' />

                        </div>

                        <p className='font-bold text-center text-sm'>Cricket</p>

                    </div>
                </div>
                <div className='border-e border-e-gray-700 flex justify-center'>
                    <div onClick={() => handleTabchange('Football')} className='text-white p-3 max-sm:text-sm'>
                        <div className='flex justify-center'>
                            <GiSoccerBall className=' text-3xl' />

                        </div>

                        <p className='font-bold text-center text-sm'>Soccer</p>

                    </div>
                </div>
                <div className='border-e border-e-gray-700 flex justify-center'>
                    <div onClick={() => handleTabchange('Tennis')} className='text-white p-3 max-sm:text-sm'>
                        <div className='flex justify-center'>
                            <IoTennisballSharp className=' text-3xl' />

                        </div>

                        <p className='font-bold text-center text-sm'>Tennis</p>

                    </div>
                </div>

            </div>
            <h1 onClick={closeGameAction} className='text-center bg-[#243d4e] text-white text-sm  font-bold py-2'>All Sports</h1>

            {/* scroll nav */}
            <div className='relative px-2 mb-56'>
                <div className="  min-w-[17.5vw]">

                    {!Object.values(sport).some(value => value) &&
                        <div className="relative h-[142vh] mb-28">
                            {Events.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleEventClick(item.name)}
                                    className='flex justify-between border-b border-gray-300 my-1 text-[#2889CE] font-extrabold p-1 cursor-pointer hover:py-2 '
                                >
                                    <p className='text-[4vw]'>{item.name}</p>
                                    <div className='flex items-center border border-gray-400 p-2 rounded-md'>
                                        <p className=' text-[#000] p-0.5'>
                                            <FaGreaterThan className='text-[10px] font-bold' />
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
                                <div key={key} className="relative">
                                    {sportList.map((item, index) => (
                                        <div key={index}>
                                            <div
                                                onClick={() => handleDropdownToggle(item?.competition?.name, key, item?.competition?.id)}
                                                className="flex  justify-between my-1  border-gray-300 cursor-pointer border-b p-1   text-[#2889CE] font-extrabold  hover:py-2 "
                                            >
                                                <p className="text-[4vw] ">{item?.competition?.name}</p>
                                                <div className="flex items-center justify-center border border-gray-400 p-2 rounded-md">
                                                    <p className="  text-[#000] p-0.5">
                                                        {dropDown[item?.competition?.name]
                                                            ? <IoIosArrowDown className="text-xl" />
                                                            : <FaGreaterThan className="text-xs" />}
                                                    </p>
                                                </div>
                                            </div>
                                            {dropDown[item?.competition?.name] &&
                                                matchData[item?.competition?.name]?.map((dropdownItem, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleBookie(key, dropdownItem?.event?.id)}
                                                        // to={`/fullmarket/${key}/${dropdownItem?.event?.id}`}
                                                        className=" text-[#2889CE] font-extrabold  ps-7 py-3 border-b border-gray-300 w-full"
                                                    >
                                                        <div className="flex   ">
                                                            <FaArrowRight className="text-xl" />
                                                            <p className="text-[4vw] ms-2 ">{dropdownItem?.event?.name}</p>
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
    )
}

export default Sports