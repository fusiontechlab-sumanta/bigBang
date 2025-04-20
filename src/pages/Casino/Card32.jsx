import React from "react";
import { useEffect, useRef, useState } from "react";
import { FaLock } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { GiTrophy } from "react-icons/gi";
// import video from './components/video/1.mp4'
import socket from '../../socket';
import { Link, Navigate } from "react-router-dom";
import Results from "../../pages/Results";
import { useParams } from "react-router-dom";
// import { betApi, fetchLoginData } from "../../api/casinoApi";
import { BsFillInfoCircleFill, BsInfoCircle } from "react-icons/bs";
// import { calculateProfit } from "../utils/profite";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { toastSuccess } from "../../utils/notifyCustom";
import cardImages from '../../utils/img';
import { FaMinus, FaPlus } from "react-icons/fa";
import axios from "axios";
function Card32() {

  const { CA, CJ, CK, C2, C3, C4, C5, C6, C7, C8, C9, C10, CQ,
    DA, DJ, DK, D2, D3, D4, D5, D6, D7, D8, D9, D10, DQ,
    HA, HJ, HK, H2, H3, H4, H5, H6, H7, H8, H9, H10, HQ,
    SA, SJ, SK, S2, S3, S4, S5, S6, S7, S8, S9, S10, SQ,

    back
  } = cardImages;


  const cardMap = {
    'ACC': CA,
    'JCC': CJ,
    'KCC': CK,
    '2CC': C2,
    '3CC': C3,
    '4CC': C4,
    '5CC': C5,
    '6CC': C6,
    '7CC': C7,
    '8CC': C8,
    '9CC': C9,
    '10CC': C10,
    'QCC': CQ,
    'ASS': DA,
    'JSS': DJ,
    'KSS': DK,
    '2SS': D2,
    '3SS': D3,
    '4SS': D4,
    '5SS': D5,
    '6SS': D6,
    '7SS': D7,
    '8SS': D8,
    '9SS': D9,
    '10SS': D10,
    'QSS': DQ,
    'ADD': HA,
    'JDD': HJ,
    'KDD': HK,
    '2DD': H2,
    '3DD': H3,
    '4DD': H4,
    '5DD': H5,
    '6DD': H6,
    '7DD': H7,
    '8DD': H8,
    '9DD': H9,
    '10DD': H10,
    'QDD': HQ,
    'AHH': SA,
    'JHH': SJ,
    'KHH': SK,
    '2HH': S2,
    '3HH': S3,
    '4HH': S4,
    '5HH': S5,
    '6HH': S6,
    '7HH': S7,
    '8HH': S8,
    '9HH': S9,
    '10HH': S10,
    'QHH': SQ,
    '1': back,
  };


  const [stackmodel, setStackModel] = useState(false);
  const [cardmodel, setCardmodel] = useState(false);

  const [liveCasino, setLiveCasino] = useState();
  const [showResults, setResults] = useState(false);

  const storedToken = localStorage.getItem('token');

  useEffect(() => {
    setResults(false);

    // Emit event to request live data
    socket.emit('card32aLiveData');

    const handleLiveCasinoData = (data) => {
      setLiveCasino(data);
    };

    // Listen for live data updates
    socket.on('card32aData', handleLiveCasinoData);

    // Cleanup function to remove listener on unmount
    return () => {
      socket.off('card32aData', handleLiveCasinoData);
    };
  }, []); // Runs only once when component mounts

  const livevideo = liveCasino?.data?.data?.tv;
  const playerData = liveCasino?.data?.data?.t2;
  const casinoData = liveCasino?.data?.data?.t1?.[0];
  console.log(liveCasino?.data?.data?.t2?.[2], "llll");
  console.log(liveCasino?.data?.data?.t2?.[1]?.rate, "kjkjjjjj");
  console.log(liveCasino, "Teeen20");

  // console.log("casinoData wasim==========", playerData)

  const videoRef = useRef(null);
  const [placebet, setPlacebet] = useState(false);
  const [marketName, setMarketId] = useState('')
  const [betType, setBetType] = useState();

  const capAmount = (amount) => Math.min(amount, 10000);
  const calculateBetAmount = (amount, rate) =>
    amount > 0 && rate > 0 ? amount * rate - amount : 0;
  // Utility function to calculate rate change based on current rate
  const getRateChange = (rate) => {
    if (rate >= 1 && rate < 2) return 0.01;
    if (rate >= 2 && rate < 3) return 0.02;
    if (rate >= 3 && rate < 4) return 0.05;
    return 1; // Default increment/decrement for rates 4 and above
  };
  const [showBook, setShowBook] = useState({
    // name: 'teen20',boxname: '1.9',rate: 1.9,amount: 100 ,betAmount: 90 ,betName: Player-A
    name: "",
    boxname: "",
    rate: 0,
    amount: 0,
    betAmount: 0,
    betName: "",
  });


  const handleBookie = (name, boxname, rate, amount, marketId, betName, color, secondrate, type) => {
    setMarketId(marketId);
    // console.log( type,"rtttttttttttttttttt");

    setBetType(type);
    setShowBook((prev) => {
      let betAmount = prev.betAmount;

      if (secondrate) {
        betAmount = calculateBetAmount(amount, rate / secondrate);
      } else {
        betAmount = calculateBetAmount(amount, rate);
      }

      return {
        ...prev,  // Preserve previous state
        name,     // Update fields with new values
        color,
        boxname,
        rate,
        secondRate: secondrate || 0,
        betAmount,
        betName,
      };
    });
  };

  console.log(showBook);



  const RateIncrease = () => {
    setShowBook((prev) => {
      const rate = Number(prev.rate) || 0; // Ensure rate is a valid number
      const increment = getRateChange(rate) || 0; // Ensure increment is a valid number
      const newRate = parseFloat((rate + increment).toFixed(2)); // Ensure result is a valid number
      const betAmount = calculateBetAmount(prev.amount, newRate);

      return {
        ...prev,
        rate: newRate,
        betAmount,
      };
    });
  };


  const RateDecrease = () => {
    setShowBook((prev) => {
      const decrement = getRateChange(prev.rate);
      const newRate = parseFloat(Math.max(prev.rate - decrement, 0).toFixed(2));
      const betAmount = calculateBetAmount(prev.amount, newRate);

      return {
        ...prev,
        rate: newRate,
        betAmount,
      };
    });
  };

  const AmountIncrease = () => {
    setShowBook((prev) => {
      const newAmount = capAmount(prev.amount * 2);
      const betAmount = calculateBetAmount(newAmount, prev.rate);

      return {
        ...prev,
        amount: newAmount,
        betAmount,
      };
    });
  };

  const AmountDecrease = () => {
    setShowBook((prev) => {
      const newAmount = Math.max(prev.amount - 50, 0);
      const betAmount = calculateBetAmount(newAmount, prev.rate);

      return {
        ...prev,
        amount: newAmount,
        betAmount,
      };
    });
  };


  // Utility functions
  const HandleCancel = () => {
    setMarketId('');

    setShowBook((prev) => ({
      ...prev,
      name: '',
      betName: '',
      boxname: '',
      rate: 0,
      amount: 0,
      betAmount: 0,
      secondRate: 0,
    }));
  };


  const handleBetAmountUpdate = (newAmount) => {
    setShowBook((prev) => {
      const { rate } = prev; // Extract rate for the specific type
      const betAmount = newAmount > 0 && rate > 0 ? newAmount * rate - newAmount : 0; // Calculate betAmount based on newAmount
      return {
        ...prev, // Preserve other fields
        amount: newAmount, // Update amount
        betAmount, // Update betAmount
      };
    });
  };

  const handleChange = (field, value) => {
    setShowBook((prev) => {
      const updatedState = {
        ...prev,
        [field]: value, // Dynamically update the field
      };

      // Update betAmount only if the "amount" field is being updated
      if (field === "amount") {
        const { rate } = prev; // Extract rate
        updatedState.betAmount = value > 0 && rate > 0 ? value * rate - value : 0;
      }

      return updatedState;
    });
  };


  const handlePlaceBet = async (market_id, bet_position,) => {

    let bet1 = 0;
    let bet2 = 0;
    let bet3 = 0;
    let bet4 = 0;

    if (betType === "B") {
      bet1 = showBook.betAmount
      bet2 = showBook?.amount
      bet3 = showBook?.amount
      bet4 = showBook?.amount
    } else {
      bet1 = -showBook.betAmount
      bet2 = showBook?.amount
      bet3 = showBook?.amount
      bet4 = showBook?.amount
    }

    let data = {
      team_name: showBook?.name,
      bet_position: bet_position,
      type: betType,
      bet_type: showBook?.betName,
      rating: showBook?.rate,
      stack: showBook?.amount,
      market_id: market_id,
      bet1: bet1,
      bet2: bet2,
      bet3: bet3,
      bet4: bet4
    };

    console.log(data, "vsdvjkvhk");

    const url = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_CASION_32CARDS}`;

    // Make the API call
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${storedToken}`, // Add Authorization header if needed
        'Content-Type': 'application/json' // Ensure proper content type
      }
    });

    // Handle success
    if (response.status === 200 || response.status === 201) {

      toastSuccess("Bet placed successfully!");

      // console.log("API Response:", response.data);
    } else {
      toastError(response.data?.message || "Failed to place bet.");
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
                {playerData && playerData.length > 0 && (
                  <p className="uppercase font-semibold">
                    {playerData[0]?.gtype}{" "}
                    <span className="text-blue-600">rules</span>
                  </p>
                )}
                <p>
                  <span>Round ID:</span> <span>{casinoData?.mid}</span>
                </p>
                <p>
                </p>
              </div>


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
                {casinoData && casinoData.C1 != 0 && (
                  <div className={`absolute top-0 ${!casinoData && "hidden"}`}>
                    {/* Render each player's data */}
                    {[1, 2, 3, 4].map((playerIndex) => (
                      <div key={playerIndex}>
                        {/* Player */}
                        <p className="text-white pl-2">PLAYER {7 + playerIndex}: {casinoData?.[`C${playerIndex}`]}</p>

                        {/* Card Image */}
                        <div className="flex gap-1 px-2">
                          {casinoData?.desc && casinoData.desc.split(',')[playerIndex - 1] !== '1' && (
                            <img src={cardMap[casinoData.desc.split(',')[playerIndex - 1]]} className="w-7 h-10" alt={`Player ${playerIndex} Card`} />
                          )}
                        </div>
                      </div>
                    ))}
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

              <div
                className="flex justify-between bg-gray-900 text-white p-1 rounded-tl-lg rounded-tr-lg"
                style={{ backgroundColor: "#243e4d" }}
              >
                <h5>Winner</h5>
                <h1 className="col-span-2 text-left px-3 text-sm font-semibold text-white">
                  Min/Max: {casinoData?.min}-{casinoData?.max}
                </h1>
              </div>

              <div className="w-full overflow-x-auto">

                <table className="min-w-full border border-gray-300">
                  <tbody>
                    {playerData?.map((player, index) => (
                      <React.Fragment key={player.sid}>
                        <tr className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                          <td className="px-4 py-0 border border-gray-300 font-bold" style={{ fontSize: "11px" }}>
                            <p>{player.nation}</p>

                            <p style={{ fontWeight: "400" }}>
                              {showBook?.betName === "" ? null : (
                                <>
                                  {betType === "B" ? (
                                    showBook?.betName === player?.nation ? (
                                      <>
                                        P : <span className="text-[#45A255]">{showBook?.betAmount}</span>
                                      </>
                                    ) : (
                                      <>
                                        L : <span className="text-red-500">{showBook?.amount}</span>
                                      </>
                                    )
                                  ) : showBook?.betName === player?.nation ? (
                                    <>
                                      L : <span className="text-red-500">{showBook?.betAmount}</span>
                                    </>
                                  ) : (
                                    <>
                                      P : <span className="text-[#45A255]">{showBook?.amount}</span>
                                    </>
                                  )}
                                </>
                              )}
                            </p>


                          </td>
                          <td onClick={() =>
                            handleBookie(
                              player?.gtype,
                              player?.b1,
                              player?.b1,
                              0,
                              player?.mid,
                              player?.nation,
                              "",
                              "",
                              "B"
                            )
                          } className="w-[100px] px-4 py-0 border border-gray-300 text-center bg-blue-400 font-bold" style={{ fontSize: "12px" }}>
                            <p>{parseFloat(player.b1).toFixed(2)}</p>
                            <p className="text-sm font-normal">{parseInt(player.bs1).toLocaleString()}</p>
                          </td>
                          <td onClick={() =>
                            handleBookie(
                              player?.gtype,
                              player?.l1,
                              player?.l1,
                              0,
                              player?.mid,
                              player?.nation,
                              "",
                              "",
                              "L"
                            )
                          } className="w-[100px] px-4 py-0 border border-gray-300 text-center bg-red-300 font-bold" style={{ fontSize: "12px" }}>
                            <p>{parseFloat(player.l1).toFixed(2)}</p>
                            <p className="text-sm font-normal">{parseInt(player.ls1).toLocaleString()}</p>
                          </td>
                          <td className="w-[110px] px-4 py-0 border border-gray-300 text-center font-bold">
                            {/* Additional Data or Buttons Can Be Added Here */}
                          </td>
                        </tr>

                        {(showBook?.betName === player?.nation) && (
                          <tr className={`lg:bg-[#72BBEF] bg-[#BEDDF4]border-b border-gray-300`}>
                            <td colSpan={7} className=' pt-1 '>
                              <div className="grid grid-cols-4 gap-2 lg:px-3 px-0.5 pb-0.5 border-b border-[#72BBEF] max-lg:grid-cols-2">
                                {/* Cancel Button */}
                                <button
                                  onClick={() => HandleCancel()}
                                  className="flex max-lg:hidden bg-white  justify-center items-center h-full border rounded-md border-gray-600">
                                  <p className="px-7 py-1 text-center font-bold text-black">Cancel</p>
                                </button>

                                {/* rate control continer */}
                                <div className="flex text-center border rounded-lg border-gray-500 w-full"> {/* Full width for the container */}
                                  <button
                                    onClick={() => RateDecrease()}
                                    className="px-2 w-16 py-1 border-r bg-gray-100 rounded-l-md flex items-center justify-center text-black font-bold text-2xl ">
                                    <FaMinus className="text-[#347fc5]" />
                                  </button>
                                  <div className="border-l border-r border-gray-700 flex-grow">
                                    <input
                                      type="number"
                                      value={showBook?.rate}
                                      onChange={(e) => handleChange('rate', Number(e.target.value))}
                                      min={0}
                                      className="text-center w-full h-full border-t border-b border-gray-300 text-black font-bold focus-within:outline-none"
                                    />
                                  </div>
                                  <button
                                    onClick={() => RateIncrease()}
                                    className="px-2 w-16 py-1 bg-gray-100 rounded-r-md flex items-center justify-center text-black font-bold text-2xl ">
                                    <FaPlus className="text-[#347fc5]" />
                                  </button>
                                </div>

                                {/* amount control */}
                                <div className="flex text-center border rounded-lg border-gray-500 w-full"> {/* Full width for the container */}
                                  <button
                                    onClick={() => AmountDecrease()}
                                    className="px-2 w-16 py-1 border-r bg-gray-100 rounded-l-md flex items-center justify-center text-black font-bold text-2xl ">
                                    <FaMinus className="text-[#347fc5]" />
                                  </button>
                                  <div className="border-l border-r border-gray-700 flex-grow">
                                    <input
                                      type="number"
                                      value={showBook.amount}
                                      onChange={(e) => handleChange('amount', Number(e.target.value))}
                                      min={0}
                                      max={10000}
                                      className="text-center w-full h-full border-t border-b border-gray-300 text-black font-bold focus-within:outline-none"
                                    />
                                  </div>
                                  <button
                                    onClick={() => AmountIncrease()}
                                    className="px-2 w-16 py-1 bg-gray-100 rounded-r-md flex items-center justify-center text-black font-bold text-2xl ">
                                    <FaPlus className="text-[#347fc5]" />
                                  </button>
                                </div>

                                {/* Place Bet Button */}
                                <button
                                  onClick={() => handlePlaceBet(casinoData?.mid, index)}
                                  // disabled={item?.mstatus !== "OPEN"}
                                  className={`flex max-lg:hidden justify-center items-center h-full border rounded-md border-gray-600  bg-gradient-to-t from-[#32497b] to-[#8da8e2] `}>
                                  <p className="px-7 py-1 text-center font-extrabold text-white text-lg">Place Bet</p>
                                </button>
                              </div>


                              <div className={`grid grid-cols-8 max-lg:grid-cols-4 gap-2 lg:px-2 px-0.5 py-0.5 border-t border-t-blue-300  text-xs lg:text-sm`}>
                                <button onClick={() => handleBetAmountUpdate(100)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >100</button>
                                <button onClick={() => handleBetAmountUpdate(200)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >200</button>
                                <button onClick={() => handleBetAmountUpdate(500)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >500</button>
                                <button onClick={() => handleBetAmountUpdate(5000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >5000</button>
                                <button onClick={() => handleBetAmountUpdate(10000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >10000</button>
                                <button onClick={() => handleBetAmountUpdate(25000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >25000</button>
                                <button onClick={() => handleBetAmountUpdate(50000)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >50000</button>
                                <button onClick={() => handleBetAmountUpdate(100000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >100000</button>

                              </div>

                              <div className="grid grid-cols-2 my-1 lg:hidden gap-2">
                                <button
                                  onClick={() => HandleCancel()}
                                  className='flex  justify-center items-center h-full border rounded-md border-gray-600 bg-white'>
                                  <p className='  px-7 py-1 text-center font-bold text-black'>Cancel</p>

                                </button>
                                <button
                                  onClick={() => handlePlaceBet(casinoData?.mid, index)}
                                  // disabled={item?.mstatus !== "OPEN"}
                                  className='flex  justify-center items-center h-full bg-[#577094] border rounded-md border-gray-600'>
                                  <p className='   px-7 py-1 text-center font-extrabold text-white text-lg'>Place Bet</p>

                                </button>
                              </div>
                            </td>


                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>



                {/* Lock Screen */}
                <div className="top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
                  <FaLock className="text-white text-2xl" />
                </div>
              </div>






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
                <h1 className=" bg-[#112533] text-white p-1 px-2">Place Bet</h1>
                {placebet && (
                  <div className='bg-blue-400 p-5'>
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
                          <td className='text-center py-2'>
                            <button className='text-red-700' onClick={() => setPlacebet(false)}>X</button>
                            <span className='ms-2 font-bold text-black'>{gameType}</span>
                          </td>
                          <td className='py-3 flex justify-center items-center'>
                            <p className="text-sm py-1 px-2 bg-white text-blue-gray-900" type="button">
                              {odds.toFixed(2)} {/* Display odds with two decimal places */}
                            </p>
                            <div className=''>
                              <button className="py-0.2 px-0.2 bg-white flex items-center gap-1" type="button" onClick={handleIncrease}>
                                <MdKeyboardArrowUp />
                              </button>
                              <button className="py-0.2 px-0.2 bg-white flex items-center gap-1" type="button" onClick={handleDecrease}>
                                <MdKeyboardArrowDown />
                              </button>
                            </div>
                          </td>


                          <td className='text-center py-2 ml-8'>
                            <input
                              type="tel"
                              className='w-20 sm:w-15 focus-within:outline-none placeholder-bold placeholder-black text-lg'
                              placeholder={price}
                            />
                          </td>
                          {/* <td className='text-center text-black font-bold py-2'>
                            {profit.toFixed(2)}
                          </td> */}


                        </tr>
                        <tr>
                          <td colSpan={4}>
                            <div className='grid grid-cols-5 gap-1 my-1'>
                              <p className='font-bold bg-gray-200 text-black text-center cursor-pointer' onClick={() => Bet(100)}>100</p>
                              <p className='font-bold bg-gray-200 text-black text-center cursor-pointer' onClick={() => Bet(1000)}>1000</p>
                              <p className='font-bold bg-gray-200 text-black text-center cursor-pointer' onClick={() => Bet(2000)}>2000</p>
                              <p className='font-bold bg-gray-200 text-black text-center cursor-pointer' onClick={() => Bet(5000)}>5000</p>
                              <p className='font-bold bg-gray-200 text-black text-center cursor-pointer' onClick={() => Bet(10000)}>10000</p>
                              <p className='font-bold bg-gray-200 text-black text-center cursor-pointer' onClick={() => Bet(25000)}>25000</p>
                              <p className='font-bold bg-gray-200 text-black text-center cursor-pointer' onClick={() => Bet(50000)}>50000</p>
                              <p className='font-bold bg-gray-200 text-black text-center cursor-pointer' onClick={() => Bet(100000)}>100000</p>
                              <p className='font-bold bg-gray-200 text-black text-center cursor-pointer' onClick={() => Bet(200000)}>200000</p>
                              <p className='font-bold bg-gray-200 text-black text-center cursor-pointer' onClick={() => Bet(500000)}>500000</p>
                              <p className='font-bold bg-gray-200 text-black text-center cursor-pointer' onClick={() => Bet(1000000)}>1000000</p>

                              {/* <p className='font-bold bg-gray-200 text-black text-center w-5'></p> */}

                            </div>
                          </td>
                        </tr>
                        <tr className=''>
                          <td colSpan={4} className='' >
                            <div className='flex justify-between mx-2 my-1'>
                              <div className='bg-red-700 text-white p-1 px-2 rounded-md cursor-pointer'>Reset </div>
                              <div className='bg-green-700 text-white  p-1 rounded-md cursor-pointer' onClick={handleBet}>Submit </div>

                            </div>

                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          </div>
        </>
      )}

      {/* stack info model */}


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
                    {[1, 2, 3].map(index => (
                      <img
                        key={index}
                        src={casinoData && cardMap[casinoData[`C${index}`]] ? cardMap[casinoData[`C${index}`]] : ""}
                        className='w-7 h-10'
                      />
                    ))}
                  </div>
                </div>
                {/* player b */}
                <div className="flex justify-center mb-6 relative">
                  <div className="flex gap-1 px-2">
                    {[1, 2, 3].map(index => (
                      <img
                        key={index}
                        src={casinoData && cardMap[casinoData[`C${index}`]] ? cardMap[casinoData[`C${index}`]] : ""}
                        className='w-7 h-10'
                      />
                    ))}
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

export default Card32;
