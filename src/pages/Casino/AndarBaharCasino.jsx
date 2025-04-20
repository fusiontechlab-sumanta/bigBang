import React from "react";
import { useEffect, useRef, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { FaLock } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { GiTrophy } from "react-icons/gi";
// import video from './components/video/1.mp4'
// import io from "socket.io-client";
import Results from "../../pages/Results";
// import socket from '../socket';
import { useParams } from "react-router-dom";
import socket from '../../socket';
// import { betApi, fetchLoginData } from "../../api/casinoApi";
// import { calculateProfit } from "../utils/profite";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { toastSuccess } from "../../utils/notifyCustom";
import cardImages from '../../utils/img';





function Andarbahar() {
  const { CA, CJ, CK, C2, C3, C4, C5, C6, C7, C8, C9, C10, CQ,
    DA, DJ, DK, D2, D3, D4, D5, D6, D7, D8, D9, D10, DQ,
    HA, HJ, HK, H2, H3, H4, H5, H6, H7, H8, H9, H10, HQ,
    SA, SJ, SK, S2, S3, S4, S5, S6, S7, S8, S9, S10, SQ,

    cardA, card2, card3, card4, card5, card6, card7, card8, card9,
    card10, cardJ1, cardK1, cardQ,

    back

  } = cardImages;
  const cardMap = {
    "ACC": CA,
    "JCC": CJ,
    "KCC": CK,
    "2CC": C2,
    "3CC": C3,
    "4CC": C4,
    "5CC": C5,
    "6CC": C6,
    "7CC": C7,
    "8CC": C8,
    "9CC": C9,
    "10CC": C10,
    "QCC": CQ,
    "ASS": DA,
    "JSS": DJ,
    "KSS": DK,
    "2SS": D2,
    "3SS": D3,
    "4SS": D4,
    "5SS": D5,
    "6SS": D6,
    "7SS": D7,
    "8SS": D8,
    "9SS": D9,
    "10SS": D10,
    "QSS": DQ,
    "ADD": HA,
    "JDD": HJ,
    "KDD": HK,
    "2DD": H2,
    "3DD": H3,
    "4DD": H4,
    "5DD": H5,
    "6DD": H6,
    "7DD": H7,
    "8DD": H8,
    "9DD": H9,
    "10DD": H10,
    "QDD": HQ,
    "AHH": SA,
    "JHH": SJ,
    "KHH": SK,
    "2HH": S2,
    "3HH": S3,
    "4HH": S4,
    "5HH": S5,
    "6HH": S6,
    "7HH": S7,
    "8HH": S8,
    "9HH": S9,
    "10HH": S10,
    "QHH": SQ,
    1: back,
  };
  const cardData = [
    {
      name1: "Ander A",
      name2: "Bahar A",
      value1: "1",
      value2: "21",
      image: cardA,
    },
    {
      name1: "Ander 2",
      name2: "Bahar 2",
      value1: "2",
      value2: "22",
      image: card2,
    },
    {
      name1: "Ander 3",
      name2: "Bahar 3",
      value1: "3",
      value2: "23",
      image: card3,
    },
    {
      name1: "Ander 4",
      name2: "Bahar 4",
      value1: "4",
      value2: "24",
      image: card4,
    },
    {
      name1: "Ander 5",
      name2: "Bahar 5",
      value1: "5",
      value2: "25",
      image: card5,
    },
    {
      name1: "Ander 6",
      name2: "Bahar 6",
      value1: "6",
      value2: "26",
      image: card6,
    },
    {
      name1: "Ander 7",
      name2: "Bahar 7",
      value1: "7",
      value2: "27",
      image: card7,
    },
    {
      name1: "Ander 8",
      name2: "Bahar 8",
      value1: "8",
      value2: "28",
      image: card8,
    },
    {
      name1: "Ander 9",
      name2: "Bahar 9",
      value1: "9",
      value2: "29",
      image: card9,
    },
    {
      name1: "Ander 10",
      name2: "Bahar 10",
      value1: "10",
      value2: "30",
      image: card10,
    },
    {
      name1: "Ander J",
      name2: "Bahar J",
      value1: "11",
      value2: "31",
      image: cardJ1,
    },
    {
      name1: "Ander Q",
      name2: "Bahar Q",
      value1: "12",
      value2: "32",
      image: cardQ,
    },
    {
      name1: "Ander K",
      name2: "Bahar K",
      value1: "13",
      value2: "33",
      image: cardK1,
    },
  ];
  const [stackmodel, setStackModel] = useState(false);
  const [cardmodel, setCardmodel] = useState(false);

  const [liveCasino, setLiveCasino] = useState();
  const [showResults, setResults] = useState(false);


  useEffect(() => {
    setResults(false);
    socket.emit('AndarbaharLiveData');
    const handleLiveCasinoData = (data) => {
      setLiveCasino(data);
    };
    socket.on('AndarbaharData', handleLiveCasinoData);
    // Clean up: Remove event listener when component unmounts
    return () => {
      socket.off('AndarbaharData', handleLiveCasinoData);
    };
  }, []); // Runs only once when component mounts


  const livevideo = liveCasino?.data?.data?.tv;
  const playerData = liveCasino?.data?.data?.t2;
  const casinoData = liveCasino?.data?.data?.t1?.[0];
  const casinoDataT3 = liveCasino?.data?.data?.t3?.[0];
  console.log(liveCasino?.data?.data?.t2?.[2], "llll");
  console.log(liveCasino?.data?.data?.t2?.[1]?.rate, "kjkjjjjj");
  console.log(liveCasino, "Teeen20");

  const videoRef = useRef(null);

  const handleVideoEnded = () => {
    // Restart the video when it ends
    videoRef.current.play();
  };
  const [odds, setOdds] = useState(2);
  const [Stake, setStake] = useState(0);
  const [price, setprice] = useState(0);
  const [gameType, setgameType] = useState("");
  // const profit = calculateProfit(odds, price);

  const handleOpen = (type) => {
    setgameType(type);
    setPlacebet(true);
  };

  const Bet = async (price) => {
    console.log(price);
    setprice(price);
  };

  const handleIncrease = () => {
    setOdds(odds + 0.01); // Increase odds by 0.01
  };

  const handleDecrease = () => {
    if (odds > 1.01) {
      setOdds(odds - 0.01); // Decrease odds by 0.01, ensuring it doesn't go below 1.01
    }
  };

  const [placebet, setPlacebet] = useState(false);

  const handleBet = async () => {
    try {
      // console.log(
      //   profit,
      //   odds,
      //   price,
      //   casinoData?.gtype,
      //   casinoData?.mid,
      //   gameType
      // );

      const formdata = new FormData();
      formdata.append("bet_position", "");
      formdata.append("type", gameType);
      formdata.append("odds", odds);
      formdata.append("stack", price);
      // formdata.append("profit", profit);
      formdata.append("liblity", "");
      formdata.append("user_id", "33");
      formdata.append("win_type", "win");
      formdata.append("market_id", casinoData?.mid);
      formdata.append("game_name", casinoData?.gtype);

      const res = await betApi(formdata);

      console.log(res, "gggggggggg");
      toastSuccess(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {showResults ? (
        <Results Data={liveCasino} />
      ) : (
        <>
          <div>
            {/* first columns */}
            <div className="col-span-2 max-md:col-span-3">
              {/* header */}
              <div className="flex justify-between bg-[#112533] text-white p-1">
                <p className="uppercase font-semibold ">
                  {casinoData?.gtype}{" "}
                  <span className="text-blue-600">rules</span>
                </p>
                <p>
                  <span>Round ID:</span> <span>{casinoData?.mid}</span>
                </p>
              </div>
              {/* <div className="flex justify-between bg-[#112533] text-white p-1">
                <span
                  className="text-white cursor-pointer"
                  onClick={() =>
                    window.open("https://mobomatch.com/", "_blank")
                  }
                >
                  Home
                </span>
              </div> */}

              {/* live video  */}
              <div className="relative">
                <iframe
                  className="w-full bg-black"
                  height="315"
                  src={livevideo}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

                // onEnded={handleVideoEnded}
                ></iframe>
                {casinoDataT3?.aall === "" || casinoDataT3?.ball === "" ? (
                  ""
                ) : (
                  <div className={`absolute top-0 ${!casinoData && "hidden"}`}>
                    <p className="text-white">{playerData?.[0]?.nation}</p>

                    <div>
                      <p className="text-white mt-2 pl-2">ANDAR</p>

                      <div className="container overflow-x-auto flex pl-2 w-48 max-[375px]:w-32">
                        <OwlCarousel
                          loop={true}
                          margin={2}
                          autoplay={false}
                          autoplayTimeout={2500}
                          autoplaySpeed={2000}
                          items={1}
                          dots={false}
                          nav={false}
                          dotsEach={true}
                          dotData={true}
                          responsive={{
                            0: {
                              items: 4,
                            },
                            600: {
                              items: 4,
                            },
                            1000: {
                              items: 4,
                            },
                          }}
                        >
                          {casinoDataT3 &&
                            casinoDataT3.aall
                              .split(",")
                              .map((cardName, index) => (
                                <p key={index}>
                                  <img
                                    src={
                                      cardMap[cardName] ? cardMap[cardName] : ""
                                    }
                                    className="h-6 md:h-8 my-1 pl-0.5 md:pl-1"
                                  />
                                </p>
                              ))}
                        </OwlCarousel>
                      </div>
                    </div>

                    <p className="text-white">{playerData?.[2]?.nation}</p>

                    <div>
                      <p className="text-white pl-2">BAHAR</p>
                    </div>
                    <div className="container overflow-x-auto flex pl-2 w-48 max-[375px]:w-32">
                      <OwlCarousel
                        loop={true}
                        margin={1}
                        autoplay={false}
                        autoplayTimeout={2500}
                        autoplaySpeed={2000}
                        items={1}
                        dots={false}
                        nav={false}
                        dotsEach={false}
                        dotData={false}
                        responsive={
                          {
                            0: {
                              items: 4
                            },
                            600: {
                              items: 4
                            },
                            1000: {
                              items: 4
                            }
                          }
                        }
                      >

                        {casinoDataT3 &&
                          casinoDataT3.ball.split(",").map((cardName, index) => (
                            <p key={index}>
                              <img
                                src={cardMap[cardName] ? cardMap[cardName] : ""}
                                className="h-6 md:h-8 my-1 pl-0.5 md:pl-1"
                              />
                            </p>
                          ))}
                      </OwlCarousel>


                    </div>
                  </div>
                )}

                {/* timer */}
                <div className="absolute flex gap-1 bottom-1 right-2 text-4xl font-extrabold ">
                  <span className="text-white bg-[#112533]  px-2 first-letter:me-1 first-letter:border-l-2 first-letter:border-l-white">
                    {casinoData?.autotime}
                  </span>
                  {/* <span className='text-white bg-[#112533] px-2'>2</span> */}
                </div>
              </div>

              {/* table */}
              {/* first row */}
              <table className="w-full sm:w-full bg-red-500 mt-1 mb-5 border border-black">
                <tbody className=" text-center ">
                  <tr className="">
                    <td className=" p-3 text-base font-medium border-r border-black ">
                      Andar
                    </td>
                    <td className="flex md:ml-32 ml-3 pt-1">
                      {casinoData?.autotime >= 4
                        ? cardData.map((card, index) => (
                          <div
                            key={index}
                            onClick={() => handleOpen(card.name1)}
                          >
                            <img
                              src={card.image}
                              className="h-6 md:h-8 my-3 pl-0.5 md:pl-2"
                              alt={card.name1}
                            />
                            <p className="text-xs">0</p>
                          </div>
                        ))
                        : cardData.map((card, index) => (
                          <div key={index}>
                            {casinoDataT3?.ar === "" ? (
                              <img
                                src={back}
                                className="h-6 md:h-8 my-3 pl-0.5 md:pl-2"
                                alt={card.name2}
                              />
                            ) : casinoDataT3?.ar.split(",")[index] === "0" ? (
                              <img
                                src={back}
                                className="h-6 md:h-8 my-3 pl-0.5 md:pl-2"
                                alt={card.name1}
                              />
                            ) : (
                              <img
                                src={card.image}
                                className="h-6 md:h-8 my-3 pl-0.5 md:pl-2"
                                alt={card.name1}
                              />
                            )}
                            <p className="text-xs">{index}</p>
                          </div>
                        ))}
                    </td>
                  </tr>
                  <tr className="border-t border-black mb-3 bg-emerald-500">
                    <td className=" p-3 text-base font-medium border-r border-black ">
                      Bahar
                    </td>
                    <td className="flex md:ml-32 ml-3 pt-1">
                      {casinoData?.autotime >= 4
                        ? cardData.map((card, index) => (
                          <div
                            key={index}
                            onClick={() => handleOpen(card.name2)}
                          >
                            <img
                              src={card.image}
                              className="h-6 md:h-8 my-3 pl-0.5 md:pl-2"
                              alt={card.name2}
                            />
                            <p className="text-xs">0</p>
                          </div>
                        ))
                        : cardData.map((card, index) => (
                          <div key={index}>
                            {casinoDataT3?.br == "" ? (
                              <img
                                src={back}
                                className="h-6 md:h-8 my-3 pl-0.5 md:pl-2"
                                alt={card.name2}
                              />
                            ) : casinoDataT3?.br.split(",")[index] === "0" ? (
                              <img
                                src={back}
                                className="h-6 md:h-8 my-3 pl-0.5 md:pl-2"
                                alt={card.name2}
                              />
                            ) : (
                              <img
                                src={card.image}
                                className="h-6 md:h-8 my-3 pl-0.5 md:pl-2"
                                alt={card.name2}
                              />
                            )}

                            <p className="text-xs">{index}</p>
                          </div>
                        ))}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* second row */}

              {/* last result and view all result */}
              <div className="flex justify-between bg-[#112533] text-white p-1">
                <div>
                  <p>Last Result</p>
                </div>
                <div onClick={() => setResults(true)}>
                  <p>View All</p>
                </div>
              </div>

              {/* card detail on click */}
              <div className="grid grid-cols-2 my-3">
                <div></div>

                <div className="flex justify-end flex-wrap gap-2 max-sm:col-span-2">
                  <p
                    onClick={() => setCardmodel(true)}
                    className="bg-[#2bac65] rounded-full px-2 py-0.5 border-2 font-bold text-yellow-200 border-gray-300 cursor-pointer"
                  >
                    A
                  </p>
                  <p
                    onClick={() => setCardmodel(true)}
                    className="bg-[#2bac65] rounded-full px-2 py-0.5 border-2 font-bold text-yellow-200 border-gray-300"
                  >
                    A
                  </p>
                  <p
                    onClick={() => setCardmodel(true)}
                    className="bg-[#2bac65] rounded-full px-2 py-0.5 border-2 font-bold text-yellow-200 border-gray-300"
                  >
                    A
                  </p>
                  <p
                    onClick={() => setCardmodel(true)}
                    className="bg-[#2bac65] rounded-full px-2 py-0.5 border-2 font-bold text-yellow-200 border-gray-300"
                  >
                    A
                  </p>
                  <p
                    onClick={() => setCardmodel(true)}
                    className="bg-[#2bac65] rounded-full px-2 py-0.5 border-2 font-bold text-yellow-200 border-gray-300"
                  >
                    A
                  </p>
                  <p
                    onClick={() => setCardmodel(true)}
                    className="bg-[#2bac65] rounded-full px-2 py-0.5 border-2 font-bold text-yellow-200 border-gray-300"
                  >
                    A
                  </p>
                  <p
                    onClick={() => setCardmodel(true)}
                    className="bg-[#2bac65] rounded-full px-2 py-0.5 border-2 font-bold text-yellow-200 border-gray-300"
                  >
                    A
                  </p>
                  <p
                    onClick={() => setCardmodel(true)}
                    className="bg-[#2bac65] rounded-full px-2 py-0.5 border-2 font-bold text-yellow-200 border-gray-300"
                  >
                    B
                  </p>
                  <p
                    onClick={() => setCardmodel(true)}
                    className="bg-[#2bac65] rounded-full px-2 py-0.5 border-2 font-bold text-yellow-200 border-gray-300"
                  >
                    A
                  </p>
                  <p
                    onClick={() => setCardmodel(true)}
                    className="bg-[#2bac65] rounded-full px-2 py-0.5 border-2 font-bold text-yellow-200 border-gray-300"
                  >
                    B
                  </p>
                </div>
              </div>
            </div>

            {/* left sidebar */}
            {/* second columns */}
            <div className="max-md:col-span-3">
              {/* place bet */}
              <div>
                {/* <h1 className=" bg-[#112533] text-white p-1 px-2">Place Bet</h1> */}
                {placebet && (
                  <div className="bg-blue-400 p-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-black bg-white uppercase ">
                        <tr>
                          <th scope="col" className="px-6 py-1 text-center">
                            (Bet for)
                          </th>
                          <th scope="col" className="px-6 py-1 text-center">
                            odds
                          </th>
                          <th scope="col" className="px-6 py-1 text-center">
                            Stake
                          </th>
                          <th scope="col" className="px-6 py-1 text-center">
                            Profit
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className=" border-b ">
                          <td className="text-center py-2">
                            <button
                              className="text-red-700"
                              onClick={() => setPlacebet(false)}
                            >
                              X
                            </button>
                            <span className="ms-2 font-bold text-black">
                              {gameType}
                            </span>
                          </td>
                          <td className="py-3 flex justify-center items-center">
                            <p
                              className="text-sm py-1 px-2 bg-white text-blue-gray-900"
                              type="button"
                            >
                              {odds.toFixed(2)}{" "}
                            
                            </p>
                            <div className="">
                              <button
                                className="py-0.2 px-0.2 bg-white flex items-center gap-1"
                                type="button"
                                onClick={handleIncrease}
                              >
                                <MdKeyboardArrowUp />
                              </button>
                              <button
                                className="py-0.2 px-0.2 bg-white flex items-center gap-1"
                                type="button"
                                onClick={handleDecrease}
                              >
                                <MdKeyboardArrowDown />
                              </button>
                            </div>
                          </td>

                          <td className="text-center py-2 ml-8">
                            <input
                              type="tel"
                              className="w-20 sm:w-15 focus-within:outline-none placeholder-bold placeholder-black text-lg"
                              placeholder={price}
                            />
                          </td>
                          
                        </tr>
                        <tr>
                          <td colSpan={4}>
                            <div className="grid grid-cols-5 gap-1 my-1">
                              <p
                                className="font-bold bg-gray-200 text-black text-center cursor-pointer"
                                onClick={() => Bet(100)}
                              >
                                100
                              </p>
                              <p
                                className="font-bold bg-gray-200 text-black text-center cursor-pointer"
                                onClick={() => Bet(1000)}
                              >
                                1000
                              </p>
                              <p
                                className="font-bold bg-gray-200 text-black text-center cursor-pointer"
                                onClick={() => Bet(2000)}
                              >
                                2000
                              </p>
                              <p
                                className="font-bold bg-gray-200 text-black text-center cursor-pointer"
                                onClick={() => Bet(5000)}
                              >
                                5000
                              </p>
                              <p
                                className="font-bold bg-gray-200 text-black text-center cursor-pointer"
                                onClick={() => Bet(10000)}
                              >
                                10000
                              </p>
                              <p
                                className="font-bold bg-gray-200 text-black text-center cursor-pointer"
                                onClick={() => Bet(25000)}
                              >
                                25000
                              </p>
                              <p
                                className="font-bold bg-gray-200 text-black text-center cursor-pointer"
                                onClick={() => Bet(50000)}
                              >
                                50000
                              </p>
                              <p
                                className="font-bold bg-gray-200 text-black text-center cursor-pointer"
                                onClick={() => Bet(100000)}
                              >
                                100000
                              </p>
                              <p
                                className="font-bold bg-gray-200 text-black text-center cursor-pointer"
                                onClick={() => Bet(200000)}
                              >
                                200000
                              </p>
                              <p
                                className="font-bold bg-gray-200 text-black text-center cursor-pointer"
                                onClick={() => Bet(500000)}
                              >
                                500000
                              </p>
                              <p
                                className="font-bold bg-gray-200 text-black text-center cursor-pointer"
                                onClick={() => Bet(1000000)}
                              >
                                1000000
                              </p>                             
                            </div>
                          </td>
                        </tr>
                        <tr className="">
                          <td colSpan={4} className="">
                            <div className="flex justify-between mx-2 my-1">
                              <div className="bg-red-700 text-white p-1 px-2 rounded-md cursor-pointer">
                                Reset{" "}
                              </div>
                              <div
                                className="bg-green-700 text-white  p-1 rounded-md cursor-pointer"
                                onClick={handleBet}
                              >
                                Submit{" "}
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* my bet */}
              {/* <div className="my-1 border border-gray-300 rounded-md">
                <h1 className=" bg-[#112533] text-white p-1 px-2 rounded-t-md">
                  My Bet
                </h1>

                <div className="grid grid-cols-3 bg-gray-300 my-8 mx-2 px-1">
                  <p>Match bet</p>
                  <p>Odds</p>
                  <p>Stake</p>
                </div>
              </div> */}

             
              {/* <div className="my-1 border border-gray-300 rounded-md">
                <h1 className=" bg-[#112533] text-white p-1 px-2 rounded-t-md">
                  Rules
                </h1>

                
                <div className="my-8 mx-2">
                 
                  <div className="grid grid-cols-2  ">
                    <p className="col-span-2 text-center border border-gray-300 py-2 font-bold">
                      Pair Plus
                    </p>
                   
                    <p className="border border-gray-400 py-1 px-2  ">
                      Pair (Double)
                    </p>
                    <p className="border border-gray-400 py-1 px-2 ">1 To 1</p>

                    
                    <p className="border border-gray-400 py-1 px-2 ">
                      Flush (Color)
                    </p>
                    <p className="border border-gray-400 py-1 px-2 ">1 To 4</p>

                    
                    <p className="border border-gray-400 py-1 px-2 ">
                      Straight (Rown)
                    </p>
                    <p className="border border-gray-400 py-1 px-2 ">1 To 6</p>
                   
                    <p className="border border-gray-400 py-1 px-2 ">
                      Trio (Teen)
                    </p>
                    <p className="border border-gray-400 py-1 px-2 ">1 To 35</p>
                  
                    <p className="border border-gray-400 py-1 px-2 ">
                      Straight Flush (Pakki Rown)
                    </p>
                    <p className="border border-gray-400 py-1 px-2 ">1 To 45</p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </>
      )}

      {/* stack info model */}

      {stackmodel && (
        <div className="fixed top-0 h-screen w-full bg-gray-600 bg-opacity-50">
          <div className="flex justify-center">
            <div className="w-72 max-md:w-full">
              <div className="flex   justify-between px-2 bg-blue-400 py-2">
                <h1 className="text-white text-2xl">Stacks</h1>
                <p onClick={() => setStackModel(false)}>x</p>
              </div>
              <div className="flex  justify-between bg-white px-3 py-2">
                <p>
                  Min Stack : <span>0</span>
                </p>
                <p>
                  Max Stack : <span>0</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* card model */}
      {cardmodel && (
        <div className="fixed top-0 left-0 h-screen w-full bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex justify-center">
            <div className="relative w-[40vw] h-[90vh] max-md:w-[70%] max-md:h-[80%] bg-white rounded-lg shadow-lg">
              {/* Header Section with Title and Close Button */}
              <div className="w-full relative from-blue-950  rounded-t-lg flex justify-between items-center">
                <h1 className="bg-gradient-to-b w-[100%] from-blue-900 to-gray-950 text-white p-3 font-semibold">ANDAR BAHAR</h1>
                <p
                  onClick={() => setCardmodel(false)}
                  className="text-white absolute right-2 top-2 text-xl cursor-pointer hover:text-red-400"
                >
                  X
                </p>
              </div>
              <p className="bg-white font-bold text-right">
                Round Id : <span className="font-normal">1.545641321321</span>
              </p>

              <div className="flex justify-center items-center mb-4">
                <p className="font-bold text-lg">Joker - </p>
                <span className="ml-2 text-red-600 text-xl font-bold">K ♦</span>
              </div>

              {/* Cards Display Section */}
              <div className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg">
                <div>
                  <p className="font-bold text-center text-green-600">BAHAR</p>
                  <div className="flex justify-center gap-2 mt-2">
                    {/* Cards for Bahar */}
                    <p>6♠</p><p>J♠</p><p>5♦</p><p>6♣</p><p>3♥</p><p>8♦</p><p>10♠</p><p>5♣</p>
                  </div>
                </div>
                <div>
                  <p className="font-bold text-center text-red-600">ANDAR</p>
                  <div className="flex justify-center gap-2 mt-2">
                    {/* Cards for Andar */}
                    <p>J♣</p><p>Q♥</p><p>7♦</p><p>9♠</p><p>A♣</p><p>K♠</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 bg-white ">
                <div className="flex justify-center">
                  <p>Player A</p>
                </div>
                <div className="flex justify-center">
                  <p>Player B</p>
                </div>
              </div>
              <div className="grid grid-cols-2 bg-white ">
                {/* player a */}
                <div className="flex justify-center">
                  <div className="flex gap-1 px-2">
                    <img
                      src={
                        casinoData?.C1 === "ACC"
                          ? CA
                          : casinoData?.C1 === "JCC"
                            ? CJ
                            : casinoData?.C1 === "KCC"
                              ? CK
                              : casinoData?.C1 === "2CC"
                                ? C2
                                : casinoData?.C1 === "3CC"
                                  ? C3
                                  : casinoData?.C1 === "4CC"
                                    ? C4
                                    : casinoData?.C1 === "5CC"
                                      ? C5
                                      : casinoData?.C1 === "6CC"
                                        ? C6
                                        : casinoData?.C1 === "7CC"
                                          ? C7
                                          : casinoData?.C1 === "8CC"
                                            ? C8
                                            : casinoData?.C1 === "9CC"
                                              ? C9
                                              : casinoData?.C1 === "10CC"
                                                ? C10
                                                : casinoData?.C1 === "QCC"
                                                  ? CQ
                                                  : casinoData?.C1 === "ADD"
                                                    ? DA
                                                    : //change
                                                    casinoData?.C1 === "JDD"
                                                      ? HJ
                                                      : casinoData?.C1 === "KDD"
                                                        ? DK
                                                        : casinoData?.C1 === "2DD"
                                                          ? D2
                                                          : casinoData?.C1 === "3DD"
                                                            ? D3
                                                            : casinoData?.C1 === "4DD"
                                                              ? D4
                                                              : casinoData?.C1 === "5DD"
                                                                ? D5
                                                                : casinoData?.C1 === "6DD"
                                                                  ? D6
                                                                  : casinoData?.C1 === "7DD"
                                                                    ? D7
                                                                    : casinoData?.C1 === "8DD"
                                                                      ? D8
                                                                      : casinoData?.C1 === "9DD"
                                                                        ? D9
                                                                        : casinoData?.C1 === "10DD"
                                                                          ? D10
                                                                          : casinoData?.C1 === "QDD"
                                                                            ? DQ
                                                                            : casinoData?.C1 === "AHH"
                                                                              ? HA
                                                                              : casinoData?.C1 === "JHH"
                                                                                ? HJ
                                                                                : casinoData?.C1 === "KHH"
                                                                                  ? HK
                                                                                  : casinoData?.C1 === "2HH"
                                                                                    ? H2
                                                                                    : casinoData?.C1 === "3HH"
                                                                                      ? H3
                                                                                      : casinoData?.C1 === "4HH"
                                                                                        ? H4
                                                                                        : casinoData?.C1 === "5HH"
                                                                                          ? H5
                                                                                          : //change
                                                                                          casinoData?.C1 === "6HH"
                                                                                            ? S6
                                                                                            : casinoData?.C1 === "7HH"
                                                                                              ? H7
                                                                                              : casinoData?.C1 === "8HH"
                                                                                                ? H8
                                                                                                : casinoData?.C1 === "9HH"
                                                                                                  ? H9
                                                                                                  : casinoData?.C1 === "10HH"
                                                                                                    ? H10
                                                                                                    : casinoData?.C1 === "QHH"
                                                                                                      ? HQ
                                                                                                      : casinoData?.C1 === "ASS"
                                                                                                        ? SA
                                                                                                        : casinoData?.C1 === "JSS"
                                                                                                          ? SJ
                                                                                                          : casinoData?.C1 === "KSS"
                                                                                                            ? SK
                                                                                                            : casinoData?.C1 === "2SS"
                                                                                                              ? S2
                                                                                                              : casinoData?.C1 === "3SS"
                                                                                                                ? S3
                                                                                                                : casinoData?.C1 === "4SS"
                                                                                                                  ? S4
                                                                                                                  : casinoData?.C1 === "5SS"
                                                                                                                    ? S5
                                                                                                                    : //change
                                                                                                                    casinoData?.C1 === "6SS"
                                                                                                                      ? D6
                                                                                                                      : casinoData?.C1 === "7SS"
                                                                                                                        ? S7
                                                                                                                        : casinoData?.C1 === "8SS"
                                                                                                                          ? S8
                                                                                                                          : casinoData?.C1 === "9SS"
                                                                                                                            ? S9
                                                                                                                            : casinoData?.C1 === "10SS"
                                                                                                                              ? S10
                                                                                                                              : casinoData?.C1 === "QSS"
                                                                                                                                ? SQ
                                                                                                                                : casinoData?.C1 === "1"
                                                                                                                                  ? back
                                                                                                                                  : ""
                      }
                      className="w-7 h-10"
                    />

                    <img
                      src={
                        casinoData?.C2 === "ACC"
                          ? CA
                          : casinoData?.C2 === "JCC"
                            ? CJ
                            : casinoData?.C2 === "KCC"
                              ? CK
                              : casinoData?.C2 === "2CC"
                                ? C2
                                : casinoData?.C2 === "3CC"
                                  ? C3
                                  : casinoData?.C2 === "4CC"
                                    ? C4
                                    : casinoData?.C2 === "5CC"
                                      ? C5
                                      : casinoData?.C2 === "6CC"
                                        ? C6
                                        : casinoData?.C2 === "7CC"
                                          ? C7
                                          : casinoData?.C2 === "8CC"
                                            ? C8
                                            : casinoData?.C2 === "9CC"
                                              ? C9
                                              : casinoData?.C2 === "10CC"
                                                ? C10
                                                : casinoData?.C2 === "QCC"
                                                  ? CQ
                                                  : casinoData?.C2 === "ADD"
                                                    ? DA
                                                    : //change
                                                    casinoData?.C2 === "JDD"
                                                      ? HJ
                                                      : casinoData?.C2 === "KDD"
                                                        ? DK
                                                        : casinoData?.C2 === "2DD"
                                                          ? D2
                                                          : casinoData?.C2 === "3DD"
                                                            ? D3
                                                            : casinoData?.C2 === "4DD"
                                                              ? D4
                                                              : casinoData?.C2 === "5DD"
                                                                ? D5
                                                                : casinoData?.C2 === "6DD"
                                                                  ? D6
                                                                  : casinoData?.C2 === "7DD"
                                                                    ? D7
                                                                    : casinoData?.C2 === "8DD"
                                                                      ? D8
                                                                      : casinoData?.C2 === "9DD"
                                                                        ? D9
                                                                        : casinoData?.C2 === "10DD"
                                                                          ? D10
                                                                          : casinoData?.C2 === "QDD"
                                                                            ? DQ
                                                                            : casinoData?.C2 === "AHH"
                                                                              ? HA
                                                                              : casinoData?.C2 === "JHH"
                                                                                ? HJ
                                                                                : casinoData?.C2 === "KHH"
                                                                                  ? HK
                                                                                  : casinoData?.C2 === "2HH"
                                                                                    ? H2
                                                                                    : casinoData?.C2 === "3HH"
                                                                                      ? H3
                                                                                      : casinoData?.C2 === "4HH"
                                                                                        ? H4
                                                                                        : casinoData?.C2 === "5HH"
                                                                                          ? H5
                                                                                          : //change
                                                                                          casinoData?.C2 === "6HH"
                                                                                            ? S6
                                                                                            : casinoData?.C2 === "7HH"
                                                                                              ? H7
                                                                                              : casinoData?.C2 === "8HH"
                                                                                                ? H8
                                                                                                : casinoData?.C2 === "9HH"
                                                                                                  ? H9
                                                                                                  : casinoData?.C2 === "10HH"
                                                                                                    ? H10
                                                                                                    : casinoData?.C2 === "QHH"
                                                                                                      ? HQ
                                                                                                      : casinoData?.C2 === "ASS"
                                                                                                        ? SA
                                                                                                        : casinoData?.C2 === "JSS"
                                                                                                          ? SJ
                                                                                                          : casinoData?.C2 === "KSS"
                                                                                                            ? SK
                                                                                                            : casinoData?.C2 === "2SS"
                                                                                                              ? S2
                                                                                                              : casinoData?.C2 === "3SS"
                                                                                                                ? S3
                                                                                                                : casinoData?.C2 === "4SS"
                                                                                                                  ? S4
                                                                                                                  : casinoData?.C2 === "5SS"
                                                                                                                    ? S5
                                                                                                                    : //change
                                                                                                                    casinoData?.C3 === "6SS"
                                                                                                                      ? D6
                                                                                                                      : casinoData?.C2 === "7SS"
                                                                                                                        ? S7
                                                                                                                        : casinoData?.C2 === "8SS"
                                                                                                                          ? S8
                                                                                                                          : casinoData?.C2 === "9SS"
                                                                                                                            ? S9
                                                                                                                            : casinoData?.C2 === "10SS"
                                                                                                                              ? S10
                                                                                                                              : casinoData?.C2 === "QSS"
                                                                                                                                ? SQ
                                                                                                                                : casinoData?.C2 === "1"
                                                                                                                                  ? back
                                                                                                                                  : ""
                      }
                      className="w-7 h-10"
                    />

                    <img
                      src={
                        casinoData?.C3 === "ACC"
                          ? CA
                          : casinoData?.C3 === "JCC"
                            ? CJ
                            : casinoData?.C3 === "KCC"
                              ? CK
                              : casinoData?.C3 === "2CC"
                                ? C2
                                : casinoData?.C3 === "3CC"
                                  ? C3
                                  : casinoData?.C3 === "4CC"
                                    ? C4
                                    : casinoData?.C3 === "5CC"
                                      ? C5
                                      : casinoData?.C3 === "6CC"
                                        ? C6
                                        : casinoData?.C3 === "7CC"
                                          ? C7
                                          : casinoData?.C3 === "8CC"
                                            ? C8
                                            : casinoData?.C3 === "9CC"
                                              ? C9
                                              : casinoData?.C3 === "10CC"
                                                ? C10
                                                : casinoData?.C3 === "QCC"
                                                  ? CQ
                                                  : casinoData?.C3 === "ADD"
                                                    ? DA
                                                    : //change
                                                    casinoData?.C3 === "JDD"
                                                      ? HJ
                                                      : casinoData?.C3 === "KDD"
                                                        ? DK
                                                        : casinoData?.C3 === "2DD"
                                                          ? D2
                                                          : casinoData?.C3 === "3DD"
                                                            ? D3
                                                            : casinoData?.C3 === "4DD"
                                                              ? D4
                                                              : casinoData?.C3 === "5DD"
                                                                ? D5
                                                                : casinoData?.C3 === "6DD"
                                                                  ? D6
                                                                  : casinoData?.C3 === "7DD"
                                                                    ? D7
                                                                    : casinoData?.C3 === "8DD"
                                                                      ? D8
                                                                      : casinoData?.C3 === "9DD"
                                                                        ? D9
                                                                        : casinoData?.C3 === "10DD"
                                                                          ? D10
                                                                          : casinoData?.C3 === "QDD"
                                                                            ? DQ
                                                                            : casinoData?.C3 === "AHH"
                                                                              ? HA
                                                                              : casinoData?.C3 === "JHH"
                                                                                ? HJ
                                                                                : casinoData?.C3 === "KHH"
                                                                                  ? HK
                                                                                  : casinoData?.C3 === "2HH"
                                                                                    ? H2
                                                                                    : casinoData?.C3 === "3HH"
                                                                                      ? H3
                                                                                      : casinoData?.C3 === "4HH"
                                                                                        ? H4
                                                                                        : casinoData?.C3 === "5HH"
                                                                                          ? H5
                                                                                          : //change
                                                                                          casinoData?.C3 === "6HH"
                                                                                            ? S6
                                                                                            : casinoData?.C3 === "7HH"
                                                                                              ? H7
                                                                                              : casinoData?.C3 === "8HH"
                                                                                                ? H8
                                                                                                : casinoData?.C3 === "9HH"
                                                                                                  ? H9
                                                                                                  : casinoData?.C3 === "10HH"
                                                                                                    ? H10
                                                                                                    : casinoData?.C3 === "QHH"
                                                                                                      ? HQ
                                                                                                      : casinoData?.C3 === "ASS"
                                                                                                        ? SA
                                                                                                        : casinoData?.C3 === "JSS"
                                                                                                          ? SJ
                                                                                                          : casinoData?.C3 === "KSS"
                                                                                                            ? SK
                                                                                                            : casinoData?.C3 === "2SS"
                                                                                                              ? S2
                                                                                                              : casinoData?.C3 === "3SS"
                                                                                                                ? S3
                                                                                                                : casinoData?.C3 === "4SS"
                                                                                                                  ? S4
                                                                                                                  : casinoData?.C3 === "5SS"
                                                                                                                    ? S5
                                                                                                                    : //change
                                                                                                                    casinoData?.C3 === "6SS"
                                                                                                                      ? D6
                                                                                                                      : casinoData?.C3 === "7SS"
                                                                                                                        ? S7
                                                                                                                        : casinoData?.C3 === "8SS"
                                                                                                                          ? S8
                                                                                                                          : casinoData?.C3 === "9SS"
                                                                                                                            ? S9
                                                                                                                            : casinoData?.C3 === "10SS"
                                                                                                                              ? S10
                                                                                                                              : casinoData?.C3 === "QSS"
                                                                                                                                ? SQ
                                                                                                                                : casinoData?.C3 === "1"
                                                                                                                                  ? back
                                                                                                                                  : ""
                      }
                      className="w-7 h-10"
                    />
                  </div>
                </div>
                {/* player b */}
                <div className="flex justify-center mb-6 relative">
                  <div className="flex gap-1 px-2">
                    <img
                      src={
                        casinoData?.C4 === "ACC"
                          ? CA
                          : casinoData?.C4 === "JCC"
                            ? CJ
                            : casinoData?.C4 === "KCC"
                              ? CK
                              : casinoData?.C4 === "2CC"
                                ? C2
                                : casinoData?.C4 === "3CC"
                                  ? C3
                                  : casinoData?.C4 === "4CC"
                                    ? C4
                                    : casinoData?.C4 === "5CC"
                                      ? C5
                                      : casinoData?.C4 === "6CC"
                                        ? C6
                                        : casinoData?.C4 === "7CC"
                                          ? C7
                                          : casinoData?.C4 === "8CC"
                                            ? C8
                                            : casinoData?.C4 === "9CC"
                                              ? C9
                                              : casinoData?.C4 === "10CC"
                                                ? C10
                                                : casinoData?.C4 === "QCC"
                                                  ? CQ
                                                  : casinoData?.C4 === "ADD"
                                                    ? DA
                                                    : //change
                                                    casinoData?.C4 === "JDD"
                                                      ? HJ
                                                      : casinoData?.C4 === "KDD"
                                                        ? DK
                                                        : casinoData?.C4 === "2DD"
                                                          ? D2
                                                          : casinoData?.C4 === "3DD"
                                                            ? D3
                                                            : casinoData?.C4 === "4DD"
                                                              ? D4
                                                              : casinoData?.C4 === "5DD"
                                                                ? D5
                                                                : casinoData?.C4 === "6DD"
                                                                  ? D6
                                                                  : casinoData?.C4 === "7DD"
                                                                    ? D7
                                                                    : casinoData?.C4 === "8DD"
                                                                      ? D8
                                                                      : casinoData?.C4 === "9DD"
                                                                        ? D9
                                                                        : casinoData?.C4 === "10DD"
                                                                          ? D10
                                                                          : casinoData?.C4 === "QDD"
                                                                            ? DQ
                                                                            : casinoData?.C4 === "AHH"
                                                                              ? HA
                                                                              : casinoData?.C4 === "JHH"
                                                                                ? HJ
                                                                                : casinoData?.C4 === "KHH"
                                                                                  ? HK
                                                                                  : casinoData?.C4 === "2HH"
                                                                                    ? H2
                                                                                    : casinoData?.C4 === "3HH"
                                                                                      ? H3
                                                                                      : casinoData?.C4 === "4HH"
                                                                                        ? H4
                                                                                        : casinoData?.C4 === "5HH"
                                                                                          ? H5
                                                                                          : //change
                                                                                          casinoData?.C4 === "6HH"
                                                                                            ? S6
                                                                                            : casinoData?.C4 === "7HH"
                                                                                              ? H7
                                                                                              : casinoData?.C4 === "8HH"
                                                                                                ? H8
                                                                                                : casinoData?.C4 === "9HH"
                                                                                                  ? H9
                                                                                                  : casinoData?.C4 === "10HH"
                                                                                                    ? H10
                                                                                                    : casinoData?.C4 === "QHH"
                                                                                                      ? HQ
                                                                                                      : casinoData?.C4 === "ASS"
                                                                                                        ? SA
                                                                                                        : casinoData?.C4 === "JSS"
                                                                                                          ? SJ
                                                                                                          : casinoData?.C4 === "KSS"
                                                                                                            ? SK
                                                                                                            : casinoData?.C4 === "2SS"
                                                                                                              ? S2
                                                                                                              : casinoData?.C4 === "3SS"
                                                                                                                ? S3
                                                                                                                : casinoData?.C4 === "4SS"
                                                                                                                  ? S4
                                                                                                                  : casinoData?.C4 === "5SS"
                                                                                                                    ? S5
                                                                                                                    : //change
                                                                                                                    casinoData?.C4 === "6SS"
                                                                                                                      ? D6
                                                                                                                      : casinoData?.C4 === "7SS"
                                                                                                                        ? S7
                                                                                                                        : casinoData?.C4 === "8SS"
                                                                                                                          ? S8
                                                                                                                          : casinoData?.C4 === "9SS"
                                                                                                                            ? S9
                                                                                                                            : casinoData?.C4 === "10SS"
                                                                                                                              ? S10
                                                                                                                              : casinoData?.C4 === "QSS"
                                                                                                                                ? SQ
                                                                                                                                : casinoData?.C4 === "1"
                                                                                                                                  ? back
                                                                                                                                  : ""
                      }
                      className="w-7 h-10"
                    />

                    <img
                      src={
                        casinoData?.C5 === "ACC"
                          ? CA
                          : casinoData?.C5 === "JCC"
                            ? CJ
                            : casinoData?.C5 === "KCC"
                              ? CK
                              : casinoData?.C5 === "2CC"
                                ? C2
                                : casinoData?.C5 === "3CC"
                                  ? C3
                                  : casinoData?.C5 === "4CC"
                                    ? C4
                                    : casinoData?.C5 === "5CC"
                                      ? C5
                                      : casinoData?.C5 === "6CC"
                                        ? C6
                                        : casinoData?.C5 === "7CC"
                                          ? C7
                                          : casinoData?.C5 === "8CC"
                                            ? C8
                                            : casinoData?.C5 === "9CC"
                                              ? C9
                                              : casinoData?.C5 === "10CC"
                                                ? C10
                                                : casinoData?.C5 === "QCC"
                                                  ? CQ
                                                  : casinoData?.C5 === "ADD"
                                                    ? DA
                                                    : //change
                                                    casinoData?.C5 === "JDD"
                                                      ? HJ
                                                      : casinoData?.C5 === "KDD"
                                                        ? DK
                                                        : casinoData?.C5 === "2DD"
                                                          ? D2
                                                          : casinoData?.C5 === "3DD"
                                                            ? D3
                                                            : casinoData?.C5 === "4DD"
                                                              ? D4
                                                              : casinoData?.C5 === "5DD"
                                                                ? D5
                                                                : casinoData?.C5 === "6DD"
                                                                  ? D6
                                                                  : casinoData?.C5 === "7DD"
                                                                    ? D7
                                                                    : casinoData?.C5 === "8DD"
                                                                      ? D8
                                                                      : casinoData?.C5 === "9DD"
                                                                        ? D9
                                                                        : casinoData?.C5 === "10DD"
                                                                          ? D10
                                                                          : casinoData?.C5 === "QDD"
                                                                            ? DQ
                                                                            : casinoData?.C5 === "AHH"
                                                                              ? HA
                                                                              : casinoData?.C5 === "JHH"
                                                                                ? HJ
                                                                                : casinoData?.C5 === "KHH"
                                                                                  ? HK
                                                                                  : casinoData?.C5 === "2HH"
                                                                                    ? H2
                                                                                    : casinoData?.C5 === "3HH"
                                                                                      ? H3
                                                                                      : casinoData?.C5 === "4HH"
                                                                                        ? H4
                                                                                        : casinoData?.C5 === "5HH"
                                                                                          ? H5
                                                                                          : //change
                                                                                          casinoData?.C5 === "6HH"
                                                                                            ? S6
                                                                                            : casinoData?.C5 === "7HH"
                                                                                              ? H7
                                                                                              : casinoData?.C5 === "8HH"
                                                                                                ? H8
                                                                                                : casinoData?.C5 === "9HH"
                                                                                                  ? H9
                                                                                                  : casinoData?.C5 === "10HH"
                                                                                                    ? H10
                                                                                                    : casinoData?.C5 === "QHH"
                                                                                                      ? HQ
                                                                                                      : casinoData?.C5 === "ASS"
                                                                                                        ? SA
                                                                                                        : casinoData?.C5 === "JSS"
                                                                                                          ? SJ
                                                                                                          : casinoData?.C5 === "KSS"
                                                                                                            ? SK
                                                                                                            : casinoData?.C5 === "2SS"
                                                                                                              ? S2
                                                                                                              : casinoData?.C5 === "3SS"
                                                                                                                ? S3
                                                                                                                : casinoData?.C5 === "4SS"
                                                                                                                  ? S4
                                                                                                                  : casinoData?.C5 === "5SS"
                                                                                                                    ? S5
                                                                                                                    : //change
                                                                                                                    casinoData?.C5 === "6SS"
                                                                                                                      ? D6
                                                                                                                      : casinoData?.C5 === "7SS"
                                                                                                                        ? S7
                                                                                                                        : casinoData?.C5 === "8SS"
                                                                                                                          ? S8
                                                                                                                          : casinoData?.C5 === "9SS"
                                                                                                                            ? S9
                                                                                                                            : casinoData?.C5 === "10SS"
                                                                                                                              ? S10
                                                                                                                              : casinoData?.C5 === "QSS"
                                                                                                                                ? SQ
                                                                                                                                : casinoData?.C5 === "1"
                                                                                                                                  ? back
                                                                                                                                  : ""
                      }
                      className="w-7 h-10"
                    />

                    <img
                      src={
                        casinoData?.C6 === "ACC"
                          ? CA
                          : casinoData?.C6 === "JCC"
                            ? CJ
                            : casinoData?.C6 === "KCC"
                              ? CK
                              : casinoData?.C6 === "2CC"
                                ? C2
                                : casinoData?.C6 === "3CC"
                                  ? C3
                                  : casinoData?.C6 === "4CC"
                                    ? C4
                                    : casinoData?.C6 === "5CC"
                                      ? C5
                                      : casinoData?.C6 === "6CC"
                                        ? C6
                                        : casinoData?.C6 === "7CC"
                                          ? C7
                                          : casinoData?.C6 === "8CC"
                                            ? C8
                                            : casinoData?.C6 === "9CC"
                                              ? C9
                                              : casinoData?.C6 === "10CC"
                                                ? C10
                                                : casinoData?.C6 === "QCC"
                                                  ? CQ
                                                  : casinoData?.C6 === "ADD"
                                                    ? DA
                                                    : //change
                                                    casinoData?.C6 === "JDD"
                                                      ? HJ
                                                      : casinoData?.C6 === "KDD"
                                                        ? DK
                                                        : casinoData?.C6 === "2DD"
                                                          ? D2
                                                          : casinoData?.C6 === "3DD"
                                                            ? D3
                                                            : casinoData?.C6 === "4DD"
                                                              ? D4
                                                              : casinoData?.C6 === "5DD"
                                                                ? D5
                                                                : casinoData?.C6 === "6DD"
                                                                  ? S6
                                                                  : casinoData?.C6 === "7DD"
                                                                    ? D7
                                                                    : casinoData?.C6 === "8DD"
                                                                      ? D8
                                                                      : casinoData?.C6 === "9DD"
                                                                        ? D9
                                                                        : casinoData?.C6 === "10DD"
                                                                          ? D10
                                                                          : casinoData?.C6 === "QDD"
                                                                            ? DQ
                                                                            : casinoData?.C6 === "AHH"
                                                                              ? HA
                                                                              : casinoData?.C6 === "JHH"
                                                                                ? HJ
                                                                                : casinoData?.C6 === "KHH"
                                                                                  ? HK
                                                                                  : casinoData?.C6 === "2HH"
                                                                                    ? H2
                                                                                    : casinoData?.C6 === "3HH"
                                                                                      ? H3
                                                                                      : casinoData?.C6 === "4HH"
                                                                                        ? H4
                                                                                        : casinoData?.C6 === "5HH"
                                                                                          ? H5
                                                                                          : //change
                                                                                          casinoData?.C6 === "6HH"
                                                                                            ? S6
                                                                                            : casinoData?.C6 === "7HH"
                                                                                              ? H7
                                                                                              : casinoData?.C6 === "8HH"
                                                                                                ? H8
                                                                                                : casinoData?.C6 === "9HH"
                                                                                                  ? H9
                                                                                                  : casinoData?.C6 === "10HH"
                                                                                                    ? H10
                                                                                                    : casinoData?.C6 === "QHH"
                                                                                                      ? HQ
                                                                                                      : casinoData?.C6 === "ASS"
                                                                                                        ? SA
                                                                                                        : casinoData?.C6 === "JSS"
                                                                                                          ? SJ
                                                                                                          : casinoData?.C6 === "KSS"
                                                                                                            ? SK
                                                                                                            : casinoData?.C6 === "2SS"
                                                                                                              ? S2
                                                                                                              : casinoData?.C6 === "3SS"
                                                                                                                ? S3
                                                                                                                : casinoData?.C6 === "4SS"
                                                                                                                  ? S4
                                                                                                                  : casinoData?.C6 === "5SS"
                                                                                                                    ? S5
                                                                                                                    : //change
                                                                                                                    casinoData?.C6 === "6SS"
                                                                                                                      ? D6
                                                                                                                      : casinoData?.C6 === "7SS"
                                                                                                                        ? S7
                                                                                                                        : casinoData?.C6 === "8SS"
                                                                                                                          ? S8
                                                                                                                          : casinoData?.C6 === "9SS"
                                                                                                                            ? S9
                                                                                                                            : casinoData?.C6 === "10SS"
                                                                                                                              ? S10
                                                                                                                              : casinoData?.C6 === "QSS"
                                                                                                                                ? SQ
                                                                                                                                : casinoData?.C6 === "1"
                                                                                                                                  ? back
                                                                                                                                  : ""
                      }
                      className="w-7 h-10"
                    />
                  </div>
                  <GiTrophy className="text-green-400 absolute bottom-0 text-xl right-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* end stack info model */}
    </div>
  );
}

export default Andarbahar;
