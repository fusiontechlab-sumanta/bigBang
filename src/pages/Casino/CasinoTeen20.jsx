import { useEffect, useRef, useState } from 'react';
import { FaLock } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { GiTrophy } from "react-icons/gi";
// import video from './components/video/1.mp4'
import socket from '../../socket';
import { Link, Navigate } from 'react-router-dom';
import Results from '../../pages/Results';
import { useParams } from 'react-router-dom';
// import { fetchLoginData } from '../../api/casinoApi';
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
// import { calculateProfit } from "../utils/profite"
// import { betApi } from '../../api/casinoApi';
import { toastError, toastSuccess } from "../../utils/notifyCustom";
import cardImages from '../../utils/img';
import { FaMinus, FaPlus } from "react-icons/fa";
import axios from 'axios';


function Casino() {

  const { CA, CJ, CK, C2, C3, C4, C5, C6, C7, C8, C9, C10, CQ,
    DA, DJ, DK, D2, D3, D4, D5, D6, D7, D8, D9, D10, DQ,
    HA, HJ, HK, H2, H3, H4, H5, H6, H7, H8, H9, H10, HQ,
    SA, SJ, SK, S2, S3, S4, S5, S6, S7, S8, S9, S10, SQ,

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

  const [cardmodel, setCardmodel] = useState(false);

  const [liveCasino, setLiveCasino] = useState();
  const [showResults, setResults] = useState(false)

  useEffect(() => {

    setResults(false);

    // Emit event to request live data
    socket.emit('T20OddscasionLiveData');

    const handleLiveCasinoData = (data) => {
      setLiveCasino(data);
    };

    // Listen for live data updates
    socket.on('t20OddsData', handleLiveCasinoData);

    // Cleanup function to remove listener on unmount
    return () => {
      socket.off('t20OddsData', handleLiveCasinoData);
    };
  }, []); // Runs only once when component mounts

  const livevideo = liveCasino?.data?.data?.tv
  const playerData = liveCasino?.data?.data?.t2
  const casinoData = liveCasino?.data?.data?.t1?.[0]
  console.log("llll",liveCasino?.data?.data?.t2?.[2]);
  console.log('kjkjjjjj',liveCasino?.data?.data?.t2?.[1]?.rate);
  console.log('Teeen20',liveCasino);


  const videoRef = useRef(null);
  const [marketName, setMarketId] = useState('')
  const storedToken = localStorage.getItem('token');
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


  const handleBookie = (name, boxname, rate, amount, marketId, betName, color, secondrate) => {
    setMarketId(marketId);

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

  console.log(showBook, "yyyyy");


  const handlePlaceBet = async (market_id, type, bet_position,) => {

    let bet1 = 0;
    let bet2 = 0;

    if (showBook?.betName === "Player A") {
      bet1 = showBook.betAmount
      bet2 = showBook?.amount
    } else {
      bet1 = showBook?.amount
      bet2 = showBook.betAmount
    }

    let data = {
      team_name: showBook?.name,
      bet_position: bet_position,
      type: type,
      bet_type: showBook?.betName,
      rating: showBook?.rate,
      stack: showBook?.amount,
      market_id: market_id,
      bet1: bet1,
      bet2: bet2
    };

    console.log(data, "vsdvjkvhk");

    const url = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_CASION_T20}`;

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
      {showResults ?
        <Results Data={liveCasino} />
        :
        <>
          <div>

            {/* first columns */}
            <div className='col-span-2 max-md:col-span-3'>
              {/* header */}
              <div className='flex justify-between items-center bg-[#112533] text-white p-1'>
                <p className='uppercase font-semibold'>
                  {casinoData?.gtype} <span className='text-blue-600'>rules</span>
                </p>
                <div className='text-right  text-white px-2 py-1 text-xs font-semibold rounded inline-block mt-1'>
                  <p><span>Round ID:</span> <span>{casinoData?.mid}</span></p>
                </div>
              </div>

              {/* live video  */}
              <div className='relative'>
                <iframe
                  className='w-full bg-black'
                  height="315"
                  src={livevideo}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

                // onEnded={handleVideoEnded}
                ></iframe>


                <div className={`absolute top-0 ${!casinoData && 'hidden'}`}>

                  {/* player A */}
                  <p className='text-white'>{playerData?.[0]?.nation}</p>

                  {/* card img */}
                  <div className='flex gap-1 px-1'>
                    {[1, 2, 3].map(index => (
                      <img
                        key={index}
                        src={casinoData && cardMap[casinoData[`C${index}`]] ? cardMap[casinoData[`C${index}`]] : ""}
                        className='w-7 h-10'
                      />
                    ))}
                  </div>

                  {/* player B */}
                  <p className='text-white'>{playerData?.[2]?.nation}</p>
                  {/* card img */}
                  <div className='flex gap-1 px-1'>
                    {[4, 5, 6].map(index => (
                      <img
                        key={index}
                        src={casinoData && cardMap[casinoData[`C${index}`]] ? cardMap[casinoData[`C${index}`]] : ""}
                        className='w-7 h-10'
                      />
                    ))}
                  </div>


                </div>

                {/* timer */}
                <div className='absolute flex gap-1 bottom-1 right-2 text-4xl font-extrabold '>
                  <span className='text-white bg-[#112533]  px-2 first-letter:me-1 first-letter:border-l-2 first-letter:border-l-white'>{casinoData?.autotime}</span>
                  {/* <span className='text-white bg-[#112533] px-2'>2</span> */}
                </div>


              </div>


              {/* table */}
              {/* first row */}

              <div>
                <div
                  className="flex justify-between bg-gray-900 text-white p-1 rounded-tl-lg rounded-tr-lg"
                  style={{ backgroundColor: "#243e4d" }}
                >
                  <h5>Winner</h5>
                  <h1 className="col-span-2 text-left px-3 text-sm font-semibold text-white">
                    Min/Max: {casinoData?.min}-{casinoData?.max}
                  </h1>
                </div>

                <div
                  className="flex justify-around py-3"
                  style={{
                    background:
                      "linear-gradient(90deg, rgb(153, 199, 241) 0%, rgba(138, 189, 216, 0.5) 49%, rgb(146, 198, 246) 100%)",
                  }}
                >
                  {/* Player A Section */}
                  <div className="text-center">
                    <h2 className="mb-2.5">Player-A</h2>
                    <div
                      className="flex flex-col items-center w-[150px]  rounded-lg shadow-lg"
                      style={{ backgroundColor: "#72bbef" }}
                    >
                      <a
                        onClick={() =>
                          handleBookie(
                            casinoData?.gtype,
                            playerData?.[0]?.rate,
                            playerData?.[0]?.rate,
                            0,
                            casinoData?.mid,
                            playerData?.[0]?.nation
                          )
                        }
                        className="cursor-pointer font-bold text-black"
                      >
                        {playerData?.[0]?.rate || "N/A"}
                      </a>
                      <a className="cursor-pointer text-black">
                        {playerData?.[0]?.gstatus || "No Status"}
                      </a>
                    </div>

                    {showBook && (showBook.amount === 0 || showBook.betAmount === 0) ? null : (
                      showBook?.betName === "Player A" ? (
                        <a className="cursor-pointer text-black">
                          P: <span className='text-[#45A255]'>{showBook.betAmount}</span>
                        </a>
                      ) : (
                        <a className="cursor-pointer text-black">
                          L: <span className='text-red-500'>{showBook.amount}</span>
                        </a>
                      )
                    )}

                  </div>

                  {/* Player B Section */}
                  <div className="text-center">
                    <h2 className="mb-2.5">Player-B</h2>
                    <div
                      className="flex flex-col items-center w-[150px] rounded-lg shadow-lg"
                      style={{ backgroundColor: "#72bbef" }}
                    >
                      <a

                        onClick={() =>
                          handleBookie(
                            casinoData?.gtype,
                            playerData?.[0]?.rate,
                            playerData?.[0]?.rate,
                            0,
                            casinoData?.mid,
                            playerData?.[2]?.nation
                          )
                        }
                        className="cursor-pointer font-bold text-black"
                      >
                        {playerData?.[2]?.rate || "N/A"}
                      </a>
                      <a className="cursor-pointer text-black">
                        {playerData?.[2]?.gstatus || "No Status"}
                      </a>
                    </div>
                    {showBook && (showBook.amount === 0 || showBook.betAmount === 0) ? null : (
                      showBook?.betName === "Player B" ? (
                        <a className="cursor-pointer text-black">
                          P: <span className='text-[#45A255]'>{showBook.betAmount}</span>
                        </a>
                      ) : (
                        <a className="cursor-pointer text-black">
                          L: <span className='text-red-500'>{showBook.amount}</span>
                        </a>
                      )
                    )}
                  </div>
                </div>

                {/* Conditional Rendering Fixed */}
                {(showBook?.betName === "Player A" || showBook?.betName === "Player B") && (
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
                          onClick={() => handlePlaceBet(casinoData?.mid, "casino", 0)}
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
                          onClick={() => handlePlaceBet(casinoData?.mid, "casino", 0)}
                          // disabled={item?.mstatus !== "OPEN"}
                          className='flex  justify-center items-center h-full bg-[#577094] border rounded-md border-gray-600'>
                          <p className='   px-7 py-1 text-center font-extrabold text-white text-lg'>Place Bet</p>

                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </div>

              {/* first row */}
              <div>
                <div className="flex justify-between  bg-gray-900 text-white p-1 rounded-tl-lg rounded-tr-lg" style={{ "background-color": "#243e4d" }}>
                  <h5>Pair (Dubble)</h5>
                  <h1 className="col-span-2 text-left  px-3 text-sm font-semibold text-white">
                    Min/Max:{casinoData?.min}-{casinoData?.max}
                  </h1>
                </div>
                <div
                  className="flex justify-around py-3"
                  style={{
                    background:
                      "linear-gradient(90deg, rgb(153, 199, 241) 0%, rgba(138, 189, 216, 0.5) 49%, rgb(146, 198, 246) 100%)",
                  }}
                >
                  {/* Player A Section */}
                  <div className="text-center">
                    <h2 className="mb-2.5">PLayer-A (PAIR)</h2>
                    <div
                      className="flex flex-col items-center w-[150px] rounded-lg shadow-lg"
                      style={{ backgroundColor: "#72bbef" }}
                    >
                      <a
                        onClick={() => handleOpen('Player A', 'odds')}
                        className="cursor-pointer font-bold text-white"
                      >
                        {playerData?.[1]?.rate || "N/A"}
                      </a>
                      <a

                        onClick={() => handleOpen('Player A', 'player')}
                        className="cursor-pointer text-white"
                      >
                        {playerData?.[1]?.gstatus || "No Status"}
                      </a>
                    </div>

                    {showBook && (showBook.amount === 0 || showBook.betAmount === 0) ? null : (
                      showBook?.betName === "Player A" ? (
                        <a className="cursor-pointer text-black">
                          P: <span className='text-[#45A255]'>{showBook.betAmount}</span>
                        </a>
                      ) : (
                        <a className="cursor-pointer text-black">
                          L: <span className='text-red-500'>{showBook.amount}</span>
                        </a>
                      )
                    )}

                  </div>

                  {/* Player B Section */}
                  <div className="text-center">
                    <h2 className="mb-2.5">PLayer-B (PAIR)</h2>
                    <div
                      className="flex flex-col items-center w-[150px] rounded-lg shadow-lg"
                      style={{ backgroundColor: "#72bbef" }}
                    >
                      <a

                        onClick={() => handleOpen('Player B', 'odds')}
                        className="cursor-pointer font-bold text-white"
                      >
                        {playerData?.[3]?.rate || "N/A"}
                      </a>
                      <a

                        onClick={() => handleOpen('Player B', 'player')}
                        className="cursor-pointer text-white"
                      >
                        {playerData?.[3]?.gstatus || "No Status"}
                      </a>
                    </div>

                    {showBook && (showBook.amount === 0 || showBook.betAmount === 0) ? null : (
                      showBook?.betName === "Player B" ? (
                        <a className="cursor-pointer text-black">
                          P: <span className='text-[#45A255]'>{showBook.betAmount}</span>
                        </a>
                      ) : (
                        <a className="cursor-pointer text-black">
                          L: <span className='text-red-500'>{showBook.amount}</span>
                        </a>
                      )
                    )}

                  </div>


                  {(showBook?.betName === "Player A" || showBook?.betName === "Player B") && (
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
                            onClick={() => handlePlaceBet(casinoData?.mid, "casino", 0)}
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
                            onClick={() => handlePlaceBet(casinoData?.mid, "casino", 0)}
                            // disabled={item?.mstatus !== "OPEN"}
                            className='flex  justify-center items-center h-full bg-[#577094] border rounded-md border-gray-600'>
                            <p className='   px-7 py-1 text-center font-extrabold text-white text-lg'>Place Bet</p>

                          </button>
                        </div>
                      </td>
                    </tr>
                  )}


                </div>
              </div>



              {/* last result and view all result */}
              <div className='flex justify-between bg-[#112533] text-white p-1'>
                <div >
                  <p>Last Result</p>
                </div>
                <div onClick={() => setResults(true)}>
                  <p>View All</p>
                </div>
              </div>


              {/* card detail on click */}
              <div className='grid grid-cols-2 my-3'>
                <div></div>
                <div className='flex justify-end flex-wrap gap-2 max-sm:col-span-2'>
                  <p onClick={() => setCardmodel(true)} className='bg-[#2bac65] rounded-full px-2 py-0.5 border-2 font-bold text-yellow-200 border-gray-300'>A</p>
                  <p onClick={() => setCardmodel(true)} className='bg-[#2bac65] rounded-full px-2 py-0.5 border-2 font-bold text-yellow-200 border-gray-300'>A</p>
                  <p onClick={() => setCardmodel(true)} className='bg-[#2bac65] rounded-full px-2 py-0.5 border-2 font-bold text-yellow-200 border-gray-300'>A</p>
                  <p onClick={() => setCardmodel(true)} className='bg-[#2bac65] rounded-full px-2 py-0.5 border-2 font-bold text-yellow-200 border-gray-300'>A</p>
                  <p onClick={() => setCardmodel(true)} className='bg-[#2bac65] rounded-full px-2 py-0.5 border-2 font-bold text-yellow-200 border-gray-300'>A</p>
                  <p onClick={() => setCardmodel(true)} className='bg-[#2bac65] rounded-full px-2 py-0.5 border-2 font-bold text-yellow-200 border-gray-300'>A</p>
                  <p onClick={() => setCardmodel(true)} className='bg-[#2bac65] rounded-full px-2 py-0.5 border-2 font-bold text-yellow-200 border-gray-300'>A</p>
                  <p onClick={() => setCardmodel(true)} className='bg-[#2bac65] rounded-full px-2 py-0.5 border-2 font-bold text-yellow-200 border-gray-300'>B</p>
                  <p onClick={() => setCardmodel(true)} className='bg-[#2bac65] rounded-full px-2 py-0.5 border-2 font-bold text-yellow-200 border-gray-300'>A</p>
                  <p onClick={() => setCardmodel(true)} className='bg-[#2bac65] rounded-full px-2 py-0.5 border-2 font-bold text-yellow-200 border-gray-300'>B</p>

                </div>

              </div>

            </div>
          </div>
        </>
      }

      {/* card model */}
      {cardmodel &&
        <div className="fixed top-0 left-0 h-screen w-full bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex justify-center">
            <div className="relative w-[40vw] h-[90vh] max-md:w-[70%] max-md:h-[80%] bg-white rounded-lg shadow-lg">
              {/* Header Section with Title and Close Button */}
              <div className="w-full relative from-blue-950  rounded-t-lg flex justify-between items-center">
                <h1 className="bg-gradient-to-b w-[100%] from-blue-900 to-gray-950 text-white p-3 font-semibold">Casino Teen 20</h1>
                <p
                  onClick={() => setCardmodel(false)}
                  className="text-white absolute right-2 top-2 text-xl cursor-pointer hover:text-red-400"
                >
                  X
                </p>
              </div>
              <p className='bg-white font-bold text-right'>Round Id : <span className='font-normal'>1.545641321321</span></p>
              <div className='grid grid-cols-2 bg-white '>
                <div className='flex justify-center'>
                  <p>Player A</p>
                </div>
                <div className='flex justify-center'>
                  <p>Player B</p>
                </div>

              </div>
              <div className='grid grid-cols-2 bg-white '>
                {/* player a */}
                <div className='flex justify-center'>
                  <div className='flex gap-1 px-2'>
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
                <div className='flex justify-center mb-6 relative'>
                  <div className='flex gap-1 px-2'>
                    {[1, 2, 3].map(index => (
                      <img
                        key={index}
                        src={casinoData && cardMap[casinoData[`C${index}`]] ? cardMap[casinoData[`C${index}`]] : ""}
                        className='w-7 h-10'
                      />
                    ))}

                  </div>
                  <GiTrophy className='text-green-400 absolute bottom-0 text-xl right-2' />
                </div>

              </div>

            </div>

          </div>

        </div>
      }


      {/* end stack info model */}


    </div>
  )
}

export default Casino