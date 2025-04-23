import React, { useEffect, useState } from 'react';
import { MdOutlinePushPin, MdOutlineWatchLater } from 'react-icons/md';
import Games from '../components/Games';
import '../css/inplay.css';
import socket from '../socket';
import { formatDateTime } from '../utils/getuserdata';
import { Link } from 'react-router-dom';
import SmallLoading from '../components/SmallLoading';

function InPlay() {

  const [SportData, setSportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liveEventId, setLiveId] = useState([]);
  const [activeTab, setActiveTab] = useState('inplay'); // Store the active tab state

  const handleInplay = () => {
    socket.emit('getLiveData', { type: 'live' });
    setActiveTab('inplay')
    setLoading(true)
  };
  const handleToday = () => {
    socket.emit('getLiveData', { type: 'today' });
    setActiveTab('today')
    setLoading(true)
  };
  const handleTomorrow = () => {
    socket.emit('getLiveData', { type: 'tomorrow' });
    setActiveTab('tomorrow')
    setLoading(true)
  };

  useEffect(() => {
    socket.emit('getLiveData', { type: 'live' });
    // Register the event listener for live data updates
    const handleLiveDataMatch = (data) => {
      console.log(data, "gggggggggg");
      setSportData(data?.matches || [])
      setLoading(false)
    };

    socket.on('getLiveDataMatch', handleLiveDataMatch);
    socket.on('liveEventIds', (data) => {
      // console.log(data, "live event it");
      setLiveId(data?.eventIds)

    });

    return () => {
      socket.off('getLiveDataMatch', handleLiveDataMatch); // Cleanup event listener
      socket.off('liveEventIds',); // Cleanup event listener
    };
  }, []);
  const matchLive = (id) => {
    return liveEventId && liveEventId?.includes(id);
  }

  // console.log(liveEventId, "liveeventid");


  // Render the data based on the activeTab
  const renderData = () => {
    if (loading) {
      return <SmallLoading />;
    }

    if (SportData.length === 0) {
      return <div className="text-center py-5">No matches available.</div>;
    }

    return Object.entries(SportData).map(([category, matches]) => (
      <div key={category}>
        <h2 className="text-sm font-bold bg-gradient-to-b from-[#2E4D8F] to-[#162443] px-2 py-1 text-white">
          {category.toUpperCase()}
        </h2>
        <div className="border border-b-0">

          <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-black bg-gray-300 uppercase">
              <tr>
                <th scope="col" className="px-6 py-0 text-center"></th>
                <th scope="col" className="px-6 py-0 text-center"></th>
                <th scope="col" className="hidden sm:table-cell px-6 py-1 text-center">1</th>
                <th scope="col" className="hidden sm:table-cell px-6 py-1 text-center">X</th>
                <th scope="col" className="hidden sm:table-cell px-6 py-1 text-center">2</th>
                <th scope="col" className="hidden sm:table-cell px-6 py-0 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {matches?.map((item, index) => (
                <tr key={index} className="bg-white border-b text-sm">
                  {/* Name and Link */}
                  <td className="px-2 py-2 text-nowrap text-center">
                    <Link
                      to={`/fullmarket/${category}/${item?.matchDetails?.eventId}`}
                      className="flex gap-x-2 flex-wrap text-[#3a8dc5] font-semibold cursor-pointer text-[4vw] lg:text-[12px]">
                      {item?.matchDetails?.eventName}
                      {matchLive(item?.matchDetails?.eventId) ? (
                        <span className="animate-color-change text-gray-400 font-bold text-sm">
                          In Play
                        </span>
                      )
                        :
                        <span className="text-gray-400 font-normal text-sm">
                          {category == "Cricket" ? formatDateTime(item?.matchDetails?.eventTime) : formatDateTime(item?.matchDetails?.eventDate)}
                        </span>
                      }
                    </Link>
                  </td>

                  <td className="text-white italic font-semibold text-center">
                  </td>

                  {/* Scores */}

                  {/* Score Columns */}
                  {(item?.oddDatas?.slice(0, 3).concat(Array(3).fill({})).slice(0, 3)).map((oddItem, idx) => {
                    return (
                      <td
                        key={idx}
                        className="text-black text-[12px] lg:text-[11px] hidden sm:table-cell px-2 py-2 font-[700] text-center"
                      >
                        <span className="px-2 py-1 bg-[#72BBEF]">
                          {oddItem?.b1 ?? "0.0"}
                        </span>
                        <span className="px-2 py-1 bg-[#FAA9BA]">
                          {oddItem?.l1 ?? "0.0"}
                        </span>
                      </td>
                    );
                  })}

                  {/* Pin Icon */}
                  <td className="px-2 py-2 text-center">
                    <MdOutlinePushPin className="hidden sm:table-cell text-xl border rounded-full border-gray-500 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ));
  };

  return (
    <>
      <ul className=" w-[100%] md:w-[50%] flex text-center justify-center md:justify-start py-[2px] md:mt-2 md:mb-5 text-[#3B5160] ">
        <li
          onClick={handleInplay}
          className={`w-[32.5%] text-md md:text-sm  border py-2 md:py-1 cursor-pointer rounded-l-md border-black border-r-0 font-semibold ${activeTab === "inplay" && "bg-[#3B5160] text-white"
            }`}
        >
          In-Play
        </li>
        <li
          onClick={handleToday}
          className={`w-[32.5%] text-md md:text-sm py-2 md:py-1 border cursor-pointer border-black border-r-0  font-semibold ${activeTab === "today" && "bg-[#3B5160] text-white"
            }`}
        >
          Today
        </li>
        <li
          onClick={handleTomorrow}
          className={`w-[33%] text-md md:text-sm py-2 md:py-1 border cursor-pointer rounded-r-md border-black  font-semibold ${activeTab === "tomorrow" && "bg-[#3B5160] text-white"
            }`}
        >
          Tomorrow
        </li>
      </ul>

      {renderData()}

      <Games />
    </>
  );
}

export default InPlay;
