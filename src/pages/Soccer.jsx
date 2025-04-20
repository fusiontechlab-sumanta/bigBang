import React, { useEffect, useState, useRef, useCallback } from 'react';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import { MdOutlinePushPin } from 'react-icons/md';
import Marque from '../components/Marque';
import SportType from '../components/SportType';
import socket from '../socket';
import { Link } from 'react-router-dom';
import { formatDateTime } from '../utils/getuserdata';
import SmallLoading from '../components/SmallLoading';

function Soccer({ banner }) {
  const [soccerData, setSoccerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef(null);

  useEffect(() => {
    const fetchData = (pageNum) => {
      socket.emit('getMatchDataByType', { type: 'football', page: pageNum, limit: 20 });

      const handleData = (data) => {
        if (data?.matches?.length) {
          setSoccerData((prev) => [...prev, ...data.matches]);
        } else {
          setHasMore(false);
        }
        setLoading(false);
      };

      socket.on('getMatchByType', handleData);
      return () => socket.off('getMatchByType', handleData);
    };

    fetchData(page);
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

  return (
    <div>
      {!banner ? (
        <div>
          <Marque />
          <Carousel />
          <SportType />

          <div className='bg-gradient-to-b from-[#96dd5c] to-[#486622]'>
            <p className='px-2 py-1 font-bold text-[14px]'>Highlights</p>
          </div>

          <div className="border border-b-0">
            {loading && page === 1 ? (
              <SmallLoading />
            ) : soccerData.length === 0 ? (
              <div className="text-center py-5">No Soccer matches available.</div>
            ) : (
              <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-black bg-gray-300 uppercase">
                  <tr>
                    <th className="px-6 py-1 text-center"></th>
                    <th className="px-6 py-1 text-center"></th>
                    <th className="max-lg:hidden px-6 py-1 text-center">1</th>
                    <th className="max-lg:hidden px-6 py-1 text-center">X</th>
                    <th className="max-lg:hidden px-6 py-1 text-center">2</th>
                    <th className="px-6 py-1 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {soccerData.map((item, index) => (
                    <tr
                      key={index}
                      ref={index === soccerData.length - 1 ? lastElementRef : null}
                      className="bg-white border-b text-sm"
                    >
                      <td className="px-2 py-2 text-nowrap text-center">
                        <Link
                          to={`/fullmarket/Soccer/${item.event.id}`}
                          className="flex gap-x-2 flex-wrap text-[#3a8dc5] font-semibold cursor-pointer text-[4vw] lg:text-[12px]"
                        >
                          {item?.event?.name}
                          <span className="text-gray-400 font-normal text-sm">
                            {formatDateTime(item?.event?.openDate)}
                          </span>
                        </Link>
                      </td>

                      <td className="text-white italic font-semibold text-center"></td>

                      {Array.from({ length: 3 }).map((_, idx) => {
                        const oddItem = item?.oddFancy?.oddFancy?.[0]?.runners; // Get runners array
                        // console.log(oddItem, "ttttttt--");

                        return (
                          <td key={idx} className="text-black text-[12px] lg:text-[11px] hidden sm:table-cell px-2 py-2 font-[700] text-center">
                            {idx === 0 ? (
                              <>
                                <span className="px-2 py-1 bg-[#72BBEF]">
                                  {oddItem?.[0]?.ex?.availableToBack?.[0]?.price ?? "0.0"}
                                </span>
                                <span className="px-2 py-1 bg-[#FAA9BA]">
                                  {oddItem?.[0]?.ex?.availableToLay?.[0]?.price ?? "0.0"}
                                </span>
                              </>
                            ) : idx === 1 ? (
                              <>
                                <span className="px-2 py-1 bg-[#72BBEF]">
                                  {oddItem?.[1]?.ex?.availableToBack?.[0]?.price ?? "0.0"}
                                </span>
                                <span className="px-2 py-1 bg-[#FAA9BA]">
                                  {oddItem?.[1]?.ex?.availableToLay?.[0]?.price ?? "0.0"}
                                </span>
                              </>
                            ) : idx === 2 ? (<>
                              <span className="px-2 py-1 bg-[#72BBEF]">
                                {oddItem?.[2]?.ex?.availableToBack?.[0]?.price ?? "0.0"}
                              </span>
                              <span className="px-2 py-1 bg-[#FAA9BA]">
                                {oddItem?.[2]?.ex?.availableToLay?.[0]?.price ?? "0.0"}
                              </span>
                            </>) : null}
                          </td>
                        );
                      })}

                      <td className="px-2 py-2 text-center">
                        <MdOutlinePushPin className="text-xl border rounded-full border-gray-500 cursor-pointer" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <Footer />
        </div>
      ) : (
        <div className="border border-b-0"style={{"overflow-y":"scroll","height":"40vh"}}>
          {loading && page === 1 ? (
            <SmallLoading />
          ) : soccerData.length === 0 ? (
            <div className="text-center py-5">No Soccer matches available.</div>
          ) : (
            <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-black bg-gray-300 uppercase">
                <tr>
                  <th className="px-6 py-1 text-center"></th>
                  <th className="px-6 py-1 text-center"></th>
                  <th className="max-lg:hidden px-6 py-1 text-center">1</th>
                  <th className="max-lg:hidden px-6 py-1 text-center">X</th>
                  <th className="max-lg:hidden px-6 py-1 text-center">2</th>
                  <th className="px-6 py-1 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {soccerData.map((item, index) => (
                  <tr
                    key={index}
                    ref={index === soccerData.length - 1 ? lastElementRef : null}
                    className="bg-white border-b text-sm"
                  >
                    <td className="px-2 py-2 text-nowrap text-center">
                      <Link
                        to={`/fullmarket/Soccer/${item.event.id}`}
                        className="flex gap-x-2 flex-wrap text-[#3a8dc5] font-semibold cursor-pointer text-[4vw] lg:text-[12px]"
                      >
                        {item?.event?.name}
                        <span className="text-gray-400 font-normal text-sm">
                          {formatDateTime(item?.event?.openDate)}
                        </span>
                      </Link>
                    </td>

                    <td className="text-white italic font-semibold text-center"></td>

                    {Array.from({ length: 3 }).map((_, idx) => {
                      const oddItem = item?.oddFancy?.oddFancy?.[0]?.runners; // Get runners array
                      // console.log(oddItem, "ttttttt--");

                      return (
                        <td key={idx} className="text-black text-[12px] lg:text-[11px] hidden sm:table-cell px-2 py-2 font-[700] text-center">
                          {idx === 0 ? (
                            <>
                              <span className="px-2 py-1 bg-[#72BBEF]">
                                {oddItem?.[0]?.ex?.availableToBack?.[0]?.price ?? "0.0"}
                              </span>
                              <span className="px-2 py-1 bg-[#FAA9BA]">
                                {oddItem?.[0]?.ex?.availableToLay?.[0]?.price ?? "0.0"}
                              </span>
                            </>
                          ) : idx === 1 ? (
                            <>
                              <span className="px-2 py-1 bg-[#72BBEF]">
                                {oddItem?.[1]?.ex?.availableToBack?.[0]?.price ?? "0.0"}
                              </span>
                              <span className="px-2 py-1 bg-[#FAA9BA]">
                                {oddItem?.[1]?.ex?.availableToLay?.[0]?.price ?? "0.0"}
                              </span>
                            </>
                          ) : idx === 2 ? (<>
                            <span className="px-2 py-1 bg-[#72BBEF]">
                              {oddItem?.[2]?.ex?.availableToBack?.[0]?.price ?? "0.0"}
                            </span>
                            <span className="px-2 py-1 bg-[#FAA9BA]">
                              {oddItem?.[2]?.ex?.availableToLay?.[0]?.price ?? "0.0"}
                            </span>
                          </>) : null}
                        </td>
                      );
                    })}

                    <td className="px-2 py-2 text-center">
                      <MdOutlinePushPin className="text-xl border rounded-full border-gray-500 cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default Soccer;
