import React, { useEffect, useState, useRef, useCallback } from 'react'
import Carousel from '../components/Carousel'
import { MdOutlinePushPin, MdOutlineWatchLater, MdTv } from 'react-icons/md'
import Footer from '../components/Footer'
import Marque from '../components/Marque'
import SportType from '../components/SportType'
import { Link } from 'react-router-dom'
import socket from '../socket'
import { formatDateTime } from '../utils/getuserdata'
import loadingimg from '../assets/Loading.gif'
import SmallLoading from '../components/SmallLoading'
import BM from "../assets/BM.png";
import F from "../assets/F.png";
import S from "../assets/S.png";
function Cricket({ banner }) {
  const [cricketData, setCricketData] = useState([]);
  const [liveEventId, setLiveId] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef(null);

  useEffect(() => {
    const fetchData = (pageNum) => {
      socket.emit('getMatchDataByType', { type: 'cricket', page: pageNum, limit: 20 });
    };

    const handleData = (data) => {
      console.log(data,"===========");
      
      if (data?.matches?.length) {
        setCricketData((prev) => [...prev, ...data.matches]);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    };

    socket.on('getMatchByType', handleData);
    socket.on('liveEventIds', (data) => setLiveId(data?.eventIds));

    fetchData(page);

    return () => {
      socket.off('getMatchByType', handleData);
      socket.off('liveEventIds');
    };
  }, [page]);

  const lastElementRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const matchLive = (id) => {
    return liveEventId && liveEventId?.includes(id);
  }

  // console.log(cricketData,"iiii");


  return (
    <div>
      {
        !banner ?
          <div>
            <Marque />
            {/* carousel */}
            <Carousel />
            {/*end carousel */}
            {/* games type */}
            <SportType />
            {/* heading */}
            <div className=' bg-gradient-to-b from-[#96DD5C] to-[#486622]'>
              <p className='px-2 py-1  font-bold text-[14px]'>Highlights</p>
            </div>
            {/* end heading */}
            {/* table */}
            <div className="border border-b-0">
              {loading ? (
                <SmallLoading />
              ) : cricketData.length === 0 ? (
                <div className="text-center py-5">No Cricket matches available.</div>
              ) : (
                <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-black bg-gray-300 uppercase">
                    <tr>
                      <th scope="col" className="px-6 py-1 text-center"></th>
                      {/* <th scope="col" className="px-6 py-1 text-center"></th> */}
                      <th scope="col" className="max-lg:hidden px-6 py-1 text-center">1</th>
                      <th scope="col" className="max-lg:hidden px-6 py-1 text-center">X</th>
                      <th scope="col" className="max-lg:hidden px-6 py-1 text-center">2</th>
                      <th scope="col" className="px-6 py-1 text-center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cricketData?.map((item, index) => (
                      <tr key={index}
                        ref={index === cricketData.length - 1 ? lastElementRef : null}
                        className="bg-white border-b text-sm">
                        {/* Name and Link */}
                        <td className="px-2 py-2 text-nowrap text-center">
                          <Link
                            to={`/fullmarket/${item?.gameName}/${item.event.id}`}
                            className="flex gap-x-2 flex-wrap text-[#3A8DC5] font-semibold cursor-pointer text-[4vw] lg:text-[12px]">
                            {item?.event?.name}
                            {matchLive(item?.event?.id) ? (
                              <span className="animate-color-change text-gray-400 font-bold text-sm">
                                In Play
                              </span>
                            )
                              :
                              <span className="text-gray-400 font-normal text-sm">
                                {formatDateTime(item?.event?.openDate)}
                              </span>
                            }
                          </Link>
                        </td>
                        {/* <td className="text-white italic font-semibold text-center">
                        </td> */}
                        {/* Scores */}
                        {/* Score Columns */}
                        {Array.from({ length: 3 }).map((_, idx) => {
                          const oddItem = item?.oddFancy?.oddFancy?.t1?.[0]?.[idx]; // Renamed to oddItem
                          return (
                            <td key={idx} className="text-black text-[12px] lg:text-[11px] hidden sm:table-cell px-2 py-2 font-[700] text-center">
                              <span className="px-2 py-1 bg-[#72BBEF]">{oddItem ? oddItem.b1 : "0.0"}</span>
                              <span className="px-2 py-1 bg-[#FAA9BA]">{oddItem ? oddItem.l1 : "0.0"}</span>
                            </td>
                          );
                        })}
                        {/* Pin Icon */}
                        <td className="px-2 py-2 text-center">
                          <MdOutlinePushPin className="text-xl border rounded-full border-gray-500 cursor-pointer" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            {/* end table */}
            {/* footer */}
            <Footer />
            {/* end footer */}
          </div>
          :
          <div style={{ "overflow-y": "scroll",  }} className="h-[33vh] md:h-[45vh] border border-b-0">
            {loading ? (
              <SmallLoading />
            ) : cricketData?.length === 0 ? (
              <div className="text-center py-5">No Cricket matches available.</div>
            ) : (
              <table className="w-full text-left rtl:text-right">
                <thead className="text-xs text-black bg-gray-300 uppercase">
                  <tr>
                    <th scope="col" className="px-6 py-0 text-center"></th>
                    <th scope="col" className="py-0 text-center"></th>
                    <th scope="col" className="hidden sm:table-cell px-6 py-1 text-center">1</th>
                    <th scope="col" className="hidden sm:table-cell px-6 py-1 text-center">X</th>
                    <th scope="col" className="hidden sm:table-cell px-6 py-1 text-center">2</th>
                    <th scope="col" className="hidden sm:table-cell px-6 py-0 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {cricketData?.map((item, index) => (
                    <tr key={index}
                      ref={index === cricketData.length - 1 ? lastElementRef : null}
                      className="bg-white border-b text-sm">
                      {/* Name and Link */}
                      <td className="relative px-2 py-2 text-center">
                        <Link
                          to={`/fullmarket/${item?.gameName}/${item.event.id}`}
                          className="flex gap-x-2 flex-wrap text-[#3A8DC5] font-semibold cursor-pointer text-[4vw] lg:text-[12px] max-w-[80vw] lg:max-w-none flex-col items-baseline"
                        >
                          <p className="break-words lg:whitespace-nowrap lg:truncate text-left max-w-full pr-[70px] md:pr-[0] ">
                            {item?.event?.name}
                          </p>
                          {matchLive(item?.event?.id) ? (
                            <span className="animate-color-change text-gray-400 font-bold text-sm">
                              In Play
                            </span>
                          ) : (
                            <span className="text-gray-400 font-normal text-sm break-words">
                              {formatDateTime(item?.event?.openDate)}
                            </span>
                          )}
                          <span className="absolute right-0 md:right-[0px] top-1/2 -translate-y-1/2 flex items-center gap-1">
                            {item?.oddFancy?.oddFancy?.t2?.length > 0 && (
                              <img src={BM} alt="BM" className="w-[33.17px] h-[21px] md:w-[23.95px] md:h-[14px]" />
                            )}
                            {/* {console.log("t4 length:", item?.oddFancy?.oddFancy?.t4?.length)} */}
                            {item?.oddFancy?.oddFancy?.t3?.length > 0 && (
                              <img src={F} alt="F" className="w-[21px] h-[22px] md:w-[16.98px] md:h-[14px]" />
                            )}
                            {item?.oddFancy?.oddFancy?.t2?.length > 0 &&
                              item.oddFancy.oddFancy.t2[0].bm1[0].s === "ACTIVE" && (
                                <img src={S} alt="F" className="w-[21px] h-[22px] md:w-[17.61px] md:h-[14px]" />
                              )}
                            {/* <img src={S} alt="S" className="w-[15px] h-[15px]" /> */}
                          </span>
                        </Link>
                      </td>
                      <td className="text-white italic font-semibold text-center hidden sm:table-cell"></td>
                      {/* Scores */}
                      {Array.from({ length: 3 }).map((_, idx) => {
                        const oddItem = item?.oddFancy?.oddFancy?.t1?.[0]?.[idx]; // Renamed to oddItem
                        return (
                          <td key={idx} className="text-black text-[12px] lg:text-[11px] hidden sm:table-cell px-2 py-2 font-[700] text-center">
                            <span className="px-2 py-1 bg-[#72BBEF]">{oddItem ? oddItem.b1 : "0.0"}</span>
                            <span className="px-2 py-1 bg-[#FAA9BA]">{oddItem ? oddItem.l1 : "0.0"}</span>
                          </td>
                        );
                      })}
                      {/* Pin Icon */}
                      <td className="px-2 py-2 text-center">
                        <MdOutlinePushPin className="text-xl border rounded-full border-gray-500 cursor-pointer" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
      }
    </div>
  )
}
export default Cricket





