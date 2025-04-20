import React, { useEffect, useState } from 'react'
import { GoDotFill } from "react-icons/go";
import { MdOutlineInfo, MdOutlinePushPin, MdOutlineWatchLater } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import { FaMinus, FaPlus } from "react-icons/fa";
import banner from '../../assets/booking/banner.jpg'
import soccer from '../../assets/booking/soccer.png'
import tennis from '../../assets/booking/tennis.png'
import '../../css/inplay.css'
import socket from '../../socket';
import { formatDateTime, formatServerTime } from '../../utils/getuserdata';
import { toastError, toastSuccess, toastWarn } from '../../utils/notifyCustom';
import { FaLongArrowAltRight } from "react-icons/fa";
import LoginWarningModal from '../../components/Auth/LoginWarningModal';
import axios from 'axios';
import { getApiWithToken, postApiWithToken } from '../../utils/api';
import { useQuery } from 'react-query';
import Loading from '../../components/Loading';
import bat from '../../assets/booking/bat.png'
import as from '../../assets/booking/as.png'
import ball from '../../assets/booking/ball.png'
import sr from '../../assets/booking/sr.png'
import { FaDesktop } from "react-icons/fa";
import { GiTrophy } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { setBet } from "../../redux/action/action";
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
const storedToken = localStorage.getItem('token');
function Booking() {
    const dispatch = useDispatch();
    const { name, eventId } = useParams();
    // console.log(name, eventId);
    const storedToken = localStorage.getItem('token');
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [previousBet, setPreviousBet] = useState(null);
    const handleLoginmobile = () => {
        setShowWarningModal(true); // Open the LoginWarningModal
    };

    const defaultData = [
        { nat: "-", b3: "0", b2: "0", b1: "0", bs3: "0", bs2: "0", bs1: "0", l1: "0", l2: "0", l3: "0", ls1: "0", ls2: "0", ls3: "0" },
        { nat: "-", b3: "0", b2: "0", b1: "0", bs3: "0", bs2: "0", bs1: "0", l1: "0", l2: "0", l3: "0", ls1: "0", ls2: "0", ls3: "0" },

    ];
    const [lay, setLay] = useState(false);
    const [back, setback] = useState(false);
    const [random, setRandom] = useState(false);

    //odd match data
    const [t1Data, sett1Data] = useState([]);
    // bookmaker data
    const [t2Data, sett2Data] = useState([]);
    //fancy data
    const [t3Data, sett3Data] = useState([]);

    const [t4Data, sett4Data] = useState([]);
    //meter data
    const [t5Data, sett5Data] = useState([]);
    //odd even data
    const [t6Data, sett6Data] = useState([]);
    //fancy
    const [t7Data, sett7Data] = useState([]);
    // Tide 
    const [t8Data, sett8Data] = useState([]);
    // Tennis
    const [runnersData, setRunnersData] = useState([]);
    // Double chance data

    const [marketName, setMarketName] = useState('')
    const [betType, setBetType] = useState('')
    const [matchDetail, setMatchdetail] = useState([])
    const [time, setTime] = useState({})
    const [serverTime, setServerTime] = useState()
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isRed, setIsRed] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("score");
    const [betIndx, setbetIndx] = useState();
    const [liveData, setliveData] = useState()
    const [cardmodel, setCardmodel] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            // Emit `getServerTime`
            socket.emit('getServerTime');

            if (name.toLowerCase() === 'cricket') {
                socket.emit("getoddByMatchId", { eventId });
                if (t1Data?.length > 0 && (time?.days === 0 && time?.hours === 0 && time?.minutes === 0 && time?.seconds === 0)) {
                    setback((prev) => !prev);
                    const randomValue = Math.floor(Math.random() * 10) + 1; // Generate a random number between 1 and 10
                    setRandom(randomValue); // Update random state
                    setLay((prevLay) => !prevLay); // Toggle lay state
                }
            } else if (name.toLowerCase() === 'tennis') {
                socket.emit("getoddByMatchId", { eventId });
                if (t1Data?.length > 0 && (time?.days === 0 && time?.hours === 0 && time?.minutes === 0 && time?.seconds === 0)) {
                    setback((prev) => !prev);
                    const randomValue = Math.floor(Math.random() * 10) + 1; // Generate a random number between 1 and 10
                    setRandom(randomValue); // Update random state
                    setLay((prevLay) => !prevLay); // Toggle lay state
                }
            } else if (name.toLowerCase() === 'soccer') {

                socket.emit("getoddByMatchId", { eventId });
                if (t1Data?.length > 0 && (time?.days === 0 && time?.hours === 0 && time?.minutes === 0 && time?.seconds === 0)) {
                    setback((prev) => !prev);
                    const randomValue = Math.floor(Math.random() * 10) + 1; // Generate a random number between 1 and 10
                    setRandom(randomValue); // Update random state
                    setLay((prevLay) => !prevLay); // Toggle lay state
                }
            } else {
                socket.emit("getAllMarketListByMatchId", { eventId });
            }
        }, 1000); // Interval of 1 second (1000 ms)

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [name, eventId, t1Data, time]); // Dependencies to ensure it re-runs when `name` or `eventId` changes


    useEffect(() => {
        // socket.on('getLiveDataByMatchId', (data) => {
        //     // console.log(data, 'market data');
        // })
        socket.on('getoddByMatchId', (data) => {
            // console.log(data
            //     , 'market data----');
            if (data?.match?.gameName === 'Cricket') {
                sett1Data(data?.data?.oddFancy?.t1 || []);
                sett2Data(data?.data?.oddFancy?.t2 || []);
                sett3Data(data?.data?.oddFancy?.t3 || []);
                sett4Data(data?.data?.oddFancy?.t4 || []);
                sett5Data(data?.data?.oddFancy?.t5 || []);
                sett6Data(data?.data?.oddFancy?.t6 || []);
                sett7Data(data?.data?.oddFancy?.t7 || []);
                sett8Data(data?.data?.oddFancy?.t8 || []);
            } else if (data?.match?.gameName === 'Tennis') {
                setRunnersData(data?.data?.oddFancy[0] || []);
            } else if (data?.match?.gameName === 'Football') {

                setRunnersData(data?.data?.oddFancy[0] || []);
            }
            setMatchdetail(data?.match);
            setTime(data?.countdown);
            setliveData(data?.cricketLiveData?.cricketLiveData?.data)
        });

        socket.on('getServerTime', (data) => {
            // console.log("getServerTime", data.serverTime);
            setServerTime(data?.serverTime);
        });

        return () => {
            // socket.off('getLiveDataByMatchId');
            socket.off('getoddByMatchId'); // Cleanup event listener
            socket.off('getServerTime'); // Cleanup event listener
        };

    }, []);

    // console.log(runnersData, "serverTime");

    let baseUrl = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_LAST_BET}${eventId}`;
    let baseFANCYUrl = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_LAST_BET_FANCY}${eventId}`;

    // Fetch last bet data
    const { data: lastBetData, isLoading: isLoadingLastBet, isError: isErrorLastBet, refetch: refetchLastBet } = useQuery(
        ["lastBet"],
        () => getApiWithToken(baseUrl)
    );

    const { data: lastBetFancyData, isLoading: isLoadingLastBetFancy, isError: isErrorLastBetFancy, refetch: refetchLastBetFancy } = useQuery(
        ["lastBetFANCY"],
        () => getApiWithToken(baseFANCYUrl)
    );

    // Ensure `data` is available before accessing `last_bet`
    const lastBetValue = lastBetData?.last_bet || {};
    const lastBetValueFANCY = lastBetFancyData || {};


    // console.log(lastBetValue, "+++++++++++++lastBetValue+++++++++");


    const userPointsbaseUrl = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_POINT_BALANCE}`;
    // Fetch activity log with pagination
    const { data: pointBalance, } = useQuery(
        ["pointBalance"],
        () => getApiWithToken(`${userPointsbaseUrl}`)
    );

    const userPoints = pointBalance?.data
    // console.log(pointBalance, "tttttttttttttttttt");

    // Store the "point" value in state when data is available
    useEffect(() => {
        if (lastBetValue) {
            setPreviousBet(lastBetValue); // Store 'point' value
        }

    }, [lastBetValue]);

    const handleRefresh = () => {
        refetchLastBet();
        refetchLastBetFancy()
    };
    // console.log(previousBet, "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")


    const [showBook, setShowBook] = useState({
        t1: { name: '', color: '', boxname: '', rate: 0, amount: 0, betAmount: 0, betName: "" },
        t2: { name: '', color: '', boxname: '', rate: 0, amount: 0, betAmount: 0, betName: "" },
        t3: { name: '', color: '', boxname: '', rate: 0, amount: 0, betAmount: 0, secondRate: 0, betName: "" },
        t4: { name: '', color: '', boxname: '', rate: 0, amount: 0, betAmount: 0, betName: "" },
        t5: { name: '', color: '', boxname: '', rate: 0, amount: 0, betAmount: 0, betName: "" },
        t6: { name: '', color: '', boxname: '', rate: 0, amount: 0, betAmount: 0, betName: "" },
        t7: { name: '', color: '', boxname: '', rate: 0, amount: 0, betAmount: 0, betName: "" },
        t8: { name: '', color: '', boxname: '', rate: 0, amount: 0, betAmount: 0, betName: "" },
    });


    const handleBookie = (type, teamName, color, rate, marketName, bettype, secondrate, betName, index) => {
        setBetType(bettype)
        setMarketName(marketName)

        console.log(type, teamName, color, rate, marketName, bettype, secondrate, "handle bookie", betName, "uuu", index);
        console.log(marketName, "yyyyyyyyyyppp");

        console.log(showBook[type],);
        setbetIndx(index)

        setShowBook((prev) => {
            let betAmount = prev[type].betAmount;
            if (secondrate) {
                betAmount = calculateBetAmount(prev[type].amount, rate / secondrate);
            }
            else {

                betAmount = calculateBetAmount(prev[type].amount, rate);
            }
            return {
                ...prev,
                [type]: {
                    ...prev[type], // Preserve other fields of the specified type
                    name: teamName,         // Update name
                    color,        // Update color
                    boxname: rate,
                    rate: rate,
                    secondRate: secondrate || 0,
                    betAmount,
                    betName
                },
            }

        }
        );
    };

    const RateIncrease = (type) => {
        console.log(type, "ooo");

        setShowBook((prev) => {
            const currentRate = prev[type].rate;
            const increment = getRateChange(currentRate); // Determine the increment value based on the current rate
            const newRate = parseFloat((currentRate + increment).toFixed(2))
            const betAmount = calculateBetAmount(prev[type].amount, newRate); // Update bet amount based on new rate
            return {
                ...prev,
                [type]: {
                    ...prev[type],
                    rate: newRate,
                    betAmount,
                },
            };
        });
    };

    const RateDecrease = (type) => {
        console.log(type, "ooo");
        setShowBook((prev) => {
            const currentRate = prev[type].rate;
            const decrement = getRateChange(currentRate); // Determine the decrement value based on the current rate
            const newRate = parseFloat(Math.max(currentRate - decrement, 0).toFixed(2));; // Ensure rate does not go below 0
            const betAmount = calculateBetAmount(prev[type].amount, newRate); // Update bet amount based on new rate
            return {
                ...prev,
                [type]: {
                    ...prev[type],
                    rate: newRate,
                    betAmount,
                },
            };
        });
    };

    const AmountIncrease = (type) => {
        console.log(type, "ooo");
        setShowBook((prev) => {
            const newAmount = capAmount(prev[type].amount * 2); // Double and cap amount
            const betAmount = calculateBetAmount(newAmount, prev[type].rate); // Calculate bet amount
            return {
                ...prev,
                [type]: {
                    ...prev[type],
                    amount: newAmount,
                    betAmount,
                },
            };
        });
    };

    const AmountDecrease = (type) => {
        console.log(type, "ooo");
        setShowBook((prev) => {
            const newAmount = Math.max(prev[type].amount - 50, 0); // Ensure amount is not negative
            const betAmount = calculateBetAmount(newAmount, prev[type].rate); // Recalculate bet amount
            return {
                ...prev,
                [type]: {
                    ...prev[type],
                    amount: newAmount,
                    betAmount, // Update bet amount
                },
            };
        });
    };

    // Utility functions
    const HandleCancel = (type) => {
        setBetType('')
        setMarketName('')
        setShowBook((prev) => ({
            ...prev,
            [type]: {
                name: '',
                color: '',
                boxname: '',
                rate: 0,
                amount: 0,
                betAmount: 0,
                secondRate: 0
            }, // Reset only the specific type
        }));
    };

    const handleBetAmountUpdate = (type, newAmount) => {
        setShowBook((prev) => {
            const { rate } = prev[type]; // Extract rate for the specific type
            const betAmount = newAmount > 0 && rate > 0 ? newAmount * rate - newAmount : 0; // Calculate betAmount based on newAmount
            return {
                ...prev,
                [type]: {
                    ...prev[type], // Preserve other fields
                    amount: newAmount, // Update amount
                    betAmount, // Update betAmount
                },
            };
        });
    };

    const handleChange = (type, field, value) => {
        setShowBook((prev) => {
            const updatedType = {
                ...prev[type],
                [field]: value
            };

            // Update betAmount only if the "amount" field is being updated
            if (field === "amount") {
                const { rate } = prev[type];
                updatedType.betAmount = value > 0 && rate > 0 ? value * rate - value : 0;
            }

            return {
                ...prev,
                [type]: updatedType,
            };
        });
    };


    useEffect(() => {
        const interval = setInterval(() => {
            setIsRed((prev) => !prev);
        }, 500); // 0.5s por por color toggle hobe
        return () => clearInterval(interval); // Clean up effect
    }, []);
    const togglePopup = () => {
        setIsOpen((prev) => !prev); // Proper toggle state update
    };

    // console.log(gameOdd,"oooooo");
    const filterData = (data, name, key) => {
        console.log(data, name, key, "ttttttttttt>>>>>>>>>>");

        const team = data.find((item) => item.nat === name);
        return team ? team[key] : null;
    };

    const handlePlaceBet = async (type, marketname, teamName, length) => {
        try {
            console.log("uuuuuuu", type, marketname, teamName, length);


            setIsRefreshing(true); // Show loading animation
            if (!userPoints || userPoints <= 0) {
                setIsRefreshing(false);
                return toastWarn("Insufficient points");
            }
            // Validate amount
            if (showBook[type].amount <= 0) {
                setIsRefreshing(false);
                return toastWarn("Please enter Amount");
            }

            // Validate user token
            if (!storedToken) {
                setIsRefreshing(false);
                HandleCancel(type);
                handleLoginmobile();
                return;
            }
            let oddreq = 0;
            if (matchDetail?.eventType?.name === "Cricket") {
                console.log("oooooooooooooooooooooo");

                const typeIndex = parseInt(type.replace('t', ''), 10); // Get the index from "t1", "t2", etc.
                const dataArray = [t1Data, t2Data, t3Data, t8Data]; // Array of data
                console.log(typeIndex, "-----------------------------", dataArray);
                if (marketname != "Fancy") {
                    if (typeIndex >= 1 && typeIndex <= 7) {
                        if (marketname == "Bookmaker") {
                            oddreq = filterData(dataArray[typeIndex - 1][0].bm1, showBook[type].name, showBook[type].betName);
                        } else {
                            oddreq = filterData(dataArray[typeIndex - 1][0], showBook[type].name, showBook[type].betName);
                        }
                    }

                }
            }

            console.log(marketname, "yyyyyyyyy---");
            const getBetData = (previousBet, showBook, betType) => {

                if (!previousBet || previousBet.pl === undefined || previousBet.pl === null) {
                    let betAmount
                    if (marketname === "Bookmaker") {
                        betAmount = showBook[type]?.rate * Number(showBook[type]?.amount) / 100 || 0;
                    }if (marketname === "Tied Match") {
                        betAmount = Number(showBook[type]?.rate * Number(showBook[type]?.amount));
                    } else {
                        betAmount = showBook[type]?.betAmount || 0;
                    }

                    const betStack = showBook[type]?.amount || 0;

                    if (betType === "Back") {
                        console.log("B");

                        if (betIndx === 0) {
                            console.log("0",betAmount,betStack);

                            return length === 3 ? {
                                betData1: betAmount,
                                betData2: -betStack,
                                betData3: -betStack
                            } : {

                                betData1: betAmount,
                                betData2: -betStack,
                                betData3: null
                            };
                        } else if (betIndx === 1) {
                            console.log("1", betAmount, betStack);
                            return length === 3 ? {
                                betData1: -betStack,
                                betData2: betAmount,
                                betData3: -betStack
                            } : {
                                betData1: -betStack,
                                betData2: betAmount,
                                betData3: null
                            }
                        } else if (betIndx === 2) {
                            console.log("2", betAmount, betStack);
                            return length === 3 ? {
                                betData1: -betStack,
                                betData2: -betStack,
                                betData3: betAmount,
                            } : {
                                betData1: betAmount,
                                betData2: -betStack,
                                betData3: null
                            }
                        }
                    } else if (betType === "Lay") {
                        console.log("L", betIndx);
                        if (betIndx === 0) {
                            return length === 3 ? {
                                betData1: -betAmount,
                                betData2: betStack,
                                betData3: betStack
                            } : {
                                betData1: -betAmount,
                                betData2: betStack,
                                betData3: null
                            }
                        } else if (betIndx === 1) {
                            return length === 3 ? {
                                betData1: betStack,
                                betData2: -betAmount,
                                betData3: betStack,
                            } : {
                                betData1: betStack,
                                betData2: -betAmount,
                                betData3: null
                            }
                        } else if (betIndx === 2) {
                            console.log("2", betAmount, betStack);
                            return length === 3 ? {
                                betData1: betStack,
                                betData2: betStack,
                                betData3: -betAmount,
                            } : {
                                betData1: betStack,
                                betData2: -betAmount,
                                betData3: null
                            }
                        }
                    }

                }

                let betAmt
                const prevPl = Number(previousBet?.previous_bet1); // Extract pl (-8)
                const previousBetstack = Number(previousBet?.previous_bet2); // Extract stack
                const previousBetstack3 = Number(previousBet?.previous_bet3); // Extract stack
                if (marketname === "Bookmaker") {
                    betAmt = Number(showBook[type]?.rate * Number(showBook[type]?.amount) / 100); // Extract betAmount (23)
                } if (marketname === "Tied Match") {
                    betAmt = Number(showBook[type]?.rate * Number(showBook[type]?.amount));
                } else {
                    betAmt = Number(showBook[type]?.betAmount); // Extract betAmount (23)
                }

                const betstack = Number(showBook[type]?.amount); // Extract betstack
                // const isMatchingSelection = showBook.t1.name === item;

                let betData1, betData2, betData3

                if (betType === "Back") {

                    if (length === 2) {
                        if (betIndx === 0) {


                            betData1 = prevPl + betAmt;
                            betData2 = previousBetstack - betstack;
                            betData3 = null
                        } else {
                            betData1 = prevPl - betstack;
                            betData2 = previousBetstack + betAmt
                            betData3 = null
                        }

                    } else if (length === 3) {
                        // console.log("ggggg");
                        if (betIndx === 0) {
                            betData1 = prevPl + betAmt;
                            betData2 = previousBetstack - betstack;
                            betData3 = previousBetstack3 - betstack;
                        } else if (betIndx === 1) {
                            // console.log("ggggg",prevPl,previousBetstack,previousBetstack3);
                            betData1 = prevPl - betstack;
                            betData2 = previousBetstack + betAmt
                            betData3 = previousBetstack3 - betstack;
                        } else if (betIndx === 2) {
                            betData1 = prevPl - betstack;
                            betData2 = previousBetstack - betstack;
                            betData3 = previousBetstack3 + betAmt
                        }
                    }

                } else { // Lay

                    if (length === 2) {
                        if (betIndx === 0) {
                            betData1 = prevPl - betAmt;
                            betData2 = previousBetstack + betstack;
                            betData3 = null
                        } else {
                            // console.log("LLLLLLLLLL", (prevPl + betstack ), (previousBetstack - betAmt));
                            betData1 = prevPl + betstack;
                            betData2 = previousBetstack - betAmt;
                            betData3 = null
                        }
                    } else if (length === 3) {
                        if (betIndx === 0) {
                            betData1 = prevPl - betAmt;
                            betData2 = previousBetstack + betstack;
                            betData3 = previousBetstack3 + betstack;
                        } else if (betIndx === 1) {
                            betData1 = prevPl + betstack;
                            betData2 = previousBetstack - betAmt
                            betData3 = previousBetstack3 + betstack;
                        } else if (betIndx === 2) {
                            betData1 = prevPl + betstack;
                            betData2 = previousBetstack + betstack;
                            betData3 = previousBetstack3 - betAmt
                        }
                    }

                }

                console.log(betData1, betData2, betData3, "ppp");


                return { betData1, betData2, betData3 };
            };

            function calculateBetData(betType, betIndx, lastBetValueFANCY, showBook, type) {
                let betData;

                const foundFancy = lastBetValueFANCY?.fancy?.find(fancy => Number(fancy.index_order) === betIndx);

                if (betType === "No") {
                    if (foundFancy) {
                        console.log(
                            `"cv: ${foundFancy.previous_bet1}", 
                             "s: ${Number(showBook[type]?.amount)}", 
                             "f: ${Number(showBook[type]?.secondRate)}"`
                        );
                        betData = - Math.abs(Number(foundFancy.previous_bet1)) -
                            ((Number(showBook[type]?.amount) * Number(showBook[type]?.secondRate) / 100));
                        console.log(betData, "nnn");
                    } else {
                        betData = -Number(showBook[type]?.secondRate);
                    }
                } else {
                    if (foundFancy) {
                        console.log(
                            `"cv: ${foundFancy.previous_bet1}", 
                             "s: ${Number(showBook[type]?.amount)}", 
                             "f: ${Number(showBook[type]?.secondRate)}"`
                        );
                        betData = Math.abs(Number(foundFancy.previous_bet1)) +
                            ((Number(showBook[type]?.amount) * Number(showBook[type]?.secondRate) / 100));
                        console.log(betData, "yyyy");
                    } else {
                        betData = Number(showBook[type]?.amount);
                    }
                }

                return {
                    betData1: betType === "No" ? betData : -betData
                };

            }



            const team1team2team3Bet = (showBook, betType) => {
                let team_bet1 = 0;
                let team_bet2 = 0;
                let team_bet3 = 0;

                let betAmount;
                if (marketname === "Bookmaker") {
                    betAmount = showBook[type]?.rate * Number(showBook[type]?.amount) / 100 || 0;
                } if (marketname === "Tied Match") {
                    betAmount = Number(showBook[type]?.rate * Number(showBook[type]?.amount));
                } else {
                    betAmount = showBook[type]?.betAmount || 0;
                }

                const betStack = showBook[type]?.amount || 0;

                if (betType === "Back") {
                    console.log("B");

                    if (betIndx === 0) {
                        console.log("0");

                        if (length === 3) {
                            team_bet1 = betAmount;
                            team_bet2 = -betStack;
                            team_bet3 = -betStack;
                        } else {
                            team_bet1 = betAmount;
                            team_bet2 = -betStack;
                            team_bet3 = 0;
                        }
                    } else if (betIndx === 1) {
                        console.log("1", betAmount, betStack);

                        if (length === 3) {
                            team_bet1 = -betStack;
                            team_bet2 = betAmount;
                            team_bet3 = -betStack;
                        } else {
                            team_bet1 = -betStack;
                            team_bet2 = betAmount;
                            team_bet3 = 0;
                        }
                    } else if (betIndx === 2) {
                        console.log("2", betAmount, betStack);

                        if (length === 3) {
                            team_bet1 = -betStack;
                            team_bet2 = -betStack;
                            team_bet3 = betAmount;
                        } else {
                            team_bet1 = betAmount;
                            team_bet2 = -betStack;
                            team_bet3 = 0;
                        }
                    }
                } else if (betType === "Lay") {
                    console.log("L", betIndx);

                    if (betIndx === 0) {
                        if (length === 3) {
                            team_bet1 = -betAmount;
                            team_bet2 = betStack;
                            team_bet3 = betStack;
                        } else {
                            team_bet1 = -betAmount;
                            team_bet2 = betStack;
                            team_bet3 = 0;
                        }
                    } else if (betIndx === 1) {
                        if (length === 3) {
                            team_bet1 = betStack;
                            team_bet2 = -betAmount;
                            team_bet3 = betStack;
                        } else {
                            team_bet1 = betStack;
                            team_bet2 = -betAmount;
                            team_bet3 = 0;
                        }
                    } else if (betIndx === 2) {
                        console.log("2", betAmount, betStack);

                        if (length === 3) {
                            team_bet1 = betStack;
                            team_bet2 = betStack;
                            team_bet3 = -betAmount;
                        } else {
                            team_bet1 = betStack;
                            team_bet2 = -betAmount;
                            team_bet3 = 0;
                        }
                    }
                }

                console.log(team_bet1, team_bet2, team_bet3, "kkkkkkkk");
                return { team_bet1, team_bet2, team_bet3 };
            };

            // Usage
            const { team_bet1, team_bet2, team_bet3 } = team1team2team3Bet(showBook, betType);



            // Call function to get betting data
            // console.log(previousBet[marketname],"ooooooorrr",type);
            let betData1, betData2, betData3;
            if (marketname !== "fancy1") {
                ({ betData1, betData2, betData3 } = getBetData(previousBet[marketname], showBook, betType));
            }
            if (marketname === "Fancy") {
                ({ betData1 } = calculateBetData(betType, betIndx, lastBetValueFANCY, showBook, type));
            }


            // const formattedBetData1 = betData1.toFixed(2);
            // const formattedBetData2 = betData2.toFixed(2);
            // const formattedBetData3 = betData3.toFixed(2);




            console.log(
                betData1, betData2, betData3
                , " bet");

            // console.log((oddreq > 2.1), "----iiioo--", showBook[type]?.rate, oddreq);

            if (name === "Cricket") {
                if (marketname != "Tied Match") {
                    console.log("hhhhhhhhhhhh>>>>>>");
                    
                    if (betType === "Back") {
                        const rate = showBook[type]?.rate;
    
                        if (
                          rate < oddreq ||                    // If rate went down
                          rate - oddreq > 0.02                // If rate increased too much
                        ) {
                          setIsRefreshing(false);
                          return toastWarn("Bet not placed because the rate has changed.");
                        }
                        
                          
                    } else {
                        const rate = showBook[type]?.rate;
    
                        if (
                          rate > oddreq ||                    // If rate went down
                          rate - oddreq > 0.02                // If rate increased too much
                        ) {
                          setIsRefreshing(false);
                          return toastWarn("Bet not placed because the rate has changed.");
                        }
                    }                    
                }
            }
            // Prepare data
            let data = {};
            // console.log(    betType === "Back" ? showBook[type]?.betAmount : -showBook[type]?.betAmount)
            // Prepare data
            data = {
                stack: showBook[type]?.amount || 0,
                profitloss: betType === "Back" ? showBook[type]?.betAmount : -showBook[type]?.betAmount,
                point: showBook[type]?.amount || 0,
                sports_name: matchDetail?.eventType?.name || "",
                event_name: matchDetail?.competition?.name || "",
                team_name: matchDetail?.event?.name || "",
                market_name: marketname || "",
                selection: teamName || "",
                type: betType || "",
                odd_req: showBook[type]?.rate || 0,
                place_time: serverTime || formatDateTime(),
                match_time: formatDateTime(matchDetail?.event?.openDate),
                event_id: matchDetail?.event?.id || "",

                // Conditionally add index if marketname is "fancy1" or "fancy"
                // ...(marketname === "fancy1" || marketname === "Fancy" ? { index: betIndx } : {}),
                index: betIndx,
                previous_bet1:
                    marketname === "fancy1"
                        ? (betType === "Back" ? showBook[type]?.betAmount : -showBook[type]?.betAmount)
                        : betData1?.toFixed(2),

                previous_bet2: marketname === "fancy1" ? null : betData2?.toFixed(2),
                previous_bet3: marketname === "fancy1" ? null : betData3?.toFixed(2),
                team_bet1: team_bet1,
                team_bet2: team_bet2,
                team_bet3: team_bet3,
                // Conditionally add previous_bet3 if marketname is "fancy1" and betData3 is not null
                // ...(marketname === "fancy1" && betData3 !== null && { previous_bet3: betData3?.toFixed(2) })
            };


            console.log(data, "tttttttttttttttttttttttttt------------");

            console.log(type, marketname, teamName, "iiiiiiiiii---");
            // API endpoint
            const url = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_PLACE_BET}`;

            // Make the API call
            const placeBet = async () => {
                try {
                    const response = await axios.post(url, data, {
                        headers: {
                            Authorization: `Bearer ${storedToken}`, // Add Authorization header if needed
                            'Content-Type': 'application/json' // Ensure proper content type
                        }
                    });

                    // Handle success
                    if (response.status === 200 || response.status === 201) {
                        toastSuccess("Bet placed successfully!");
                        HandleCancel(type);
                        handleRefresh();
                        dispatch(setBet(true)); // Dispatch action
                    } else {
                        toastError(response.data?.message || "Failed to place bet.");
                    }
                } catch (error) {
                    toastError(error.response?.data?.message || "An error occurred.");
                } finally {
                    setTimeout(() => {
                        setIsRefreshing(false); // Hide loading animation after refetching
                    }, 1000);
                }
            };

            // Immediate call for "Fancy"
            if (marketname === "Fancy") {
                await placeBet();
            } else {
                // Delayed call for other market types
                setTimeout(async () => {
                    await placeBet();
                }, 5000); // Call this API after 5 seconds
            }

        } catch (error) {
            // Handle errors
            setIsRefreshing(false);
            console.error("API Call Error:", error);
            toastError(error?.response?.data?.message || "An error occurred while placing the bet.");

        }
    };

    const [Fancy, setFancy] = useState({
        FancyBet: true,
        SportBook: false,
    });
    const [optionFancyBet, setOptionFancybet] = useState({
        All: true,
        Fancy: false,
        "Line Markets": false,
        "Ball by Ball": false,
        "Meter Markets": false,
        "Khado Markets": false,
    })
    const [optionSportsBet, setOptionSportsbet] = useState({
        All: true,
        Match: false,
        "Odd/Evens": false,
        "Batsmen": false,
        "Bowler": false,
        "Extra": false,
    })

    const handleOptionFancy = (name) => {
        setOptionFancybet((prev) => {
            const updatedState = Object.keys(prev).reduce((acc, key) => {
                acc[key] = key === name; // Set true for the selected name, false for others
                return acc;
            }, {});
            return updatedState;
        });
    };
    const handleSportsBet = (name) => {
        setOptionSportsbet((prev) => {
            const updatedState = Object.keys(prev).reduce((acc, key) => {
                acc[key] = key === name; // Set true for the selected name, false for others
                return acc;
            }, {});
            return updatedState;
        });
    };

    const handlefancy = (name) => {
        setFancy((prev) => ({
            FancyBet: name === "FancyBet",
            SportBook: name === "SportBook",
        }));
    }

    // console.log(matchDetail, "match");

    let matchData = { runners: [] }; // Define matchData with a runners array beforehand

    if (matchDetail && Array.isArray(matchDetail?.runners)) {
        matchData.runners = matchDetail?.runners.map((runner) => {
            const runnerData = runnersData?.runners?.find(r => r.selectionId === runner.selectionId);
            return {
                name: runner.runnerName,
                backPrices: runnerData?.ex?.availableToBack.map(priceData => ({
                    price: priceData.price,
                    size: priceData.size
                })) || [],
                layPrices: runnerData?.ex?.availableToLay.map(priceData => ({
                    price: priceData.price,
                    size: priceData.size
                })) || []
            };
        });
    }
    // console.log(
    //     matchData?.runners?.length,
    //     "--------------------------------",
    // );
    // console.log("PL Value:", previousBet.pl, typeof previousBet.pl);

    // console.log("Live data", liveData);


    const fours = liveData?.batsman && Array.isArray(liveData.batsman)
        ? liveData.batsman.reduce((acc, player) => acc + (player.fours || 0), 0)
        : 0;

    const sixes = liveData?.batsman && Array.isArray(liveData.batsman)
        ? liveData.batsman.reduce((acc, player) => acc + (player.sixes || 0), 0)
        : 0;

    const wides = liveData?.last4overs && Array.isArray(liveData.last4overs)
        ? liveData.last4overs.reduce((acc, over) =>
            acc + (Array.isArray(over.balls)
                ? over.balls.filter((ball) => ball === "W").length
                : 0),
            0
        )
        : 0;

    // console.log("Fours:", fours, "Sixes:", sixes, "Wides:", wides); // Debugging

    // console.log("t2Data---", t8Data.length);
    // console.log("liveData", showBook.t2.name)

    const [fancyData, setFancyData] = useState();

    const fancyBet = async (index) => {
        try {
            // Validate index and eventId
            if (index === undefined || index === null) {
                console.error("Invalid index:", index);
                toastError("Invalid selection.");
                return;
            }
            if (!eventId) {
                console.error("Missing eventId:", eventId);
                toastError("Event ID is missing.");
                return;
            }

            console.log("Betting initiated:", { index, eventId });

            // Construct URL safely
            const baseUrl = import.meta.env.VITE_BASE_URL;
            const casinoEndpoint = import.meta.env.VITE_Fancy_BET;

            if (!baseUrl || !casinoEndpoint) {
                console.error("API URL is missing.");
                toastError("Server configuration error.");
                return;
            }

            const url = `${baseUrl}${casinoEndpoint}`;
            if (!storedToken) {
                console.error("Authentication token missing.");
                toastError("User not authenticated.");
                return;
            }

            let data = new FormData();
            data.append('event_id', eventId);
            data.append('index_order', index)

            // Make API request
            const response = await axios.post(url, data, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                    "Content-Type": "application/json",
                },
            });

            // Handle success
            if (response.status === 200 || response.status === 201) {

                setFancyData(response?.data?.data?.bet_list);
                setCardmodel(true);
            } else {
                toastError(response.data?.message || "Failed to place bet.");
            }
        } catch (error) {
            console.error("Error in fancyBet:", error);

            // Extract error message
            const errorMessage =
                error.response?.data?.message || error.message || "Something went wrong.";

            toastError(errorMessage);
        }
    };



    // console.log("lastBetValueFANCY", t8Data,)

    // console.log(lastBetValueFANCY?.fancyBetListData, "+++++++++++++lastBetValue+++++++++");

    return (
        <div className='bg-white select-none lg:mb-1 mb-20'>

            {/* banner */}
            <div className='h-20 w-full relative '
                style={{
                    backgroundImage: `url(${(name.toLowerCase() === 'football' || name.toLowerCase() === 'soccer')
                        ? soccer
                        : name.toLowerCase() === 'tennis'
                            ? tennis
                            : banner
                        })`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className='flex justify-between p-2'>
                    <span className='font-bold text-white text-sm'>OPEN</span>
                    <div className='text-sm'>
                        <span className='text-[#FFFE27]'>Game time</span>
                        <span className='text-white'> {formatDateTime(matchDetail?.event?.openDate)}</span>
                    </div>
                </div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                    {
                        (time?.days == 0 && time?.hours == 0 && time?.minutes == 0 && time?.seconds == 0) ?
                            <span className="font-bold block text-sm transform  scale-animate transition-transform duration-300 scale-110">Bet Started</span> :

                            <div className='flex flex-col items-center'>
                                <p className='text-white'>Remaining Time</p>
                                <span className="font-bold block text-sm transform  scale-animate transition-transform duration-300 scale-110">{time?.days || '00'}:{time?.hours || '00'}:{time?.minutes || '00'}:{time?.seconds || '00'}</span>
                            </div>

                    }

                </div>
            </div>
            <div className="bg-[#0d2231] flex items-center justify-center p-1 relative">
                <h2 className="text-white font-semibold text-lg text-[15px]">{name}</h2>
                <FaDesktop
                    className={`absolute right-4 text-xl transition-colors duration-300 ${isRed ? "text-red-500" : "text-white"
                        }`} onClick={togglePopup}
                />
            </div>
            {/* Popup Modal */}
            {isOpen && (
                <div className="w-full bg-[#1a1a1a] text-white shadow-lg">

                    <div className="flex justify-between border-b ">
                        <button
                            className={`w-1/2 text-center py-1 border-r ${activeTab === "score" ? "bg-gray-800" : ""} text-[13px]`}
                            onClick={() => setActiveTab("score")}
                        >
                            Live Score
                        </button>
                        <button
                            className={`w-1/2 text-center py-1 ${activeTab === "video" ? "bg-gray-800" : ""} text-[13px]`}
                            onClick={() => setActiveTab("video")}
                        >
                            Watch Live
                        </button>
                    </div>
                    {activeTab === "score" ? (
                        <div className="mt-2 text-sm">
                            {/* Header */}

                            {liveData ? (
                                <>
                                    <div className="text-white text-sm px-4 md:px-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <p>Powered By Universe Score</p>
                                            <div className="flex gap-8">
                                                <p className=" text-center">SCORE</p>
                                                <p className=" text-center">OVS</p>
                                                <p className=" text-center">RR</p>
                                            </div>
                                        </div>

                                        {/* Batting Team */}
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center gap-1">
                                                <img src={bat} alt="bat" className="w-4 h-4 mr-1" />
                                                <img src={liveData.team_b_img} alt="team" className="w-4 h-4 mr-1" />
                                                <p>{liveData.team_b}</p>
                                            </div>
                                            <div className="flex gap-3">
                                                <p className="text-center">{liveData.team_b_scores || 0}</p>
                                                <p className="text-center">{liveData.team_b_over || 0}/{liveData.match_over || 0}</p>
                                                <p className="text-center">{liveData.curr_rate || "N/A"}</p>
                                            </div>
                                        </div>

                                        {/* Bowling Team */}
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center gap-1">
                                                <img src={ball} alt="ball" className="w-4 h-4 mr-1" />
                                                <img src={liveData.team_a_img} alt="team" className="w-4 h-4 mr-1" />
                                                <p>{liveData.team_a}</p>
                                            </div>
                                            <div className="flex gap-3">
                                                <p className="text-center">{liveData.c_team_score || 0}</p>
                                                <p className="text-center">{liveData.team_a_over || 0}/{liveData.match_over || 0}</p>
                                                <p className="text-center">{liveData.curr_rate || "N/A"}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Match Info */}
                                    <div className="overflow-hidden whitespace-nowrap w-full mt-2 px-6">
                                        <p className="text-gray-400 text-xs inline-block animate-marquee">
                                            Toss: {liveData.toss || "N/A"} | Last 6 balls:{" "}
                                            {liveData.last36ball && Array.isArray(liveData.last36ball)
                                                ? liveData.last36ball.map((ball, index) => <span key={index}>{ball} </span>)
                                                : "No Data"}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                // Placeholder when no data is available
                                <div className="flex items-center justify-center h-40 bg-black text-gray-400 text-lg">
                                    NO DATA FOUND
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-40 bg-black text-gray-400">
                            <p>Watch Live Video Placeholder</p>
                        </div>
                    )}
                </div>
            )}
            {/* filter contest */}
            <div className='overflow-x-auto lg:hidden py-2 px-1'>
                <div className='flex  gap-2 text-nowrap '>
                    <p className='py-1 px-2 bg-gradient-to-t from-[#50A023] to-[#A3DB5F] rounded-full border border-black'>All</p>
                    <p className='py-1 px-2 bg-gradient-to-t from-[#253B49] to-[#2B4658] rounded-full border border-black text-white font-bold'>Popular</p>
                    <p className='py-1 px-2 bg-gradient-to-t from-[#253B49] to-[#2B4658] rounded-full border border-black text-white font-bold'>Match Odd</p>
                    <p className='py-1 px-2 bg-gradient-to-t from-[#253B49] to-[#2B4658] rounded-full border border-gray-500 text-white font-bold '>Winner 2024/25</p>
                </div>
            </div>
            {/* heading */}

            {/* match Odd  */}
            <div>
                <div className='flex justify-between'>
                    <div className='flex'>
                        <p className='flex bg-gray-800 text-white font-bold rounded-tr-xl p-1 text-sm'>Match odds<MdOutlineInfo className='mt-1 ms-1' /></p>
                        <p className=' lg:flex hidden font-semibold items-center ms-3 text-sm'><span className='p-0.5 bg-yellow-300 '><GoDotFill className=' top-1 ' /></span>Cash Out</p>
                    </div>
                    <div className='flex text-sm items-center px-2'>
                        <p>Matched</p>
                        <p>€ {(matchDetail?.totalMatched / 1000).toFixed(1) + "K"}</p>
                    </div>
                </div>
                {/* table */}
                <div className="border border-b-0">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 relative">
                        <thead className="text-xs text-black bg-white border-b border-gray-500 ">
                            <tr>
                                <th colSpan={3} scope="col" className=" max-lg:hidden py-1 text-center ">

                                </th>
                                <th scope="col" className="px-2 lg:hidden py-1 ">
                                    <div className='bg-[#BED5D8] text-center'>
                                        <span className='text-[#6987B1]'>min/max</span> 100-1000
                                    </div>
                                </th>

                                <th scope="col" className="bg-[#72BBEF] lg:rounded-tl-lg py-2 px-6 text-center">
                                    Back
                                </th>
                                <th scope="col" className="bg-[#FAA9BA] lg:rounded-tr-lg py-2 px-6 text-center text-nowrap">
                                    Lay
                                </th>

                                <th colSpan={2} scope="col" className="px-2 max-lg:hidden py-1 ">
                                    <div className='bg-[#D7E8F4] text-center '>
                                        min/max  100-1000
                                    </div>
                                </th>

                            </tr>
                        </thead>

                        {isRefreshing ? (
                            <Loading />
                        ) : (
                            <>
                                {name === 'Cricket' ? (
                                    <>
                                        {(t1Data?.[0] || defaultData)?.map((item, index) =>
                                            <tbody key={index} className=''>

                                                <tr className="bg-white border-b border-gray-300">

                                                    <td className="px-2 py-0.5 text-nowrap">
                                                        <a className="flex gap-x-2 flex-wrap capitalize text-gray-900 font-semibold">
                                                            {item?.nat}
                                                        </a>
                                                        {!previousBet?.MATCH_ODDS ? (
                                                            showBook?.t1?.amount > 0 && (
                                                                <>
                                                                    {betType === "Back" ? (
                                                                        <p className={`${showBook.t1.name === item?.nat ? 'text-[#45A255]' : 'text-red-500'} font-[700]`}>
                                                                            {showBook.t1.name === item?.nat ? `(${Number(showBook.t1.betAmount).toFixed(2)})` : `(${Number(showBook.t1.amount).toFixed(2)})`}
                                                                        </p>
                                                                    ) : (
                                                                        <p className={`${showBook.t1.name === item?.nat ? 'text-red-500' : 'text-[#45A255]'} font-[700]`}>
                                                                            {showBook.t1.name === item?.nat ? `(${Number(showBook.t1.betAmount).toFixed(2)})` : `(${Number(showBook.t1.amount).toFixed(2)})`}
                                                                        </p>
                                                                    )}
                                                                </>
                                                            )
                                                        ) : (
                                                            <>
                                                                {previousBet?.MATCH_ODDS?.previous_bet1 !== undefined && previousBet?.MATCH_ODDS?.previous_bet1 !== null &&
                                                                    previousBet?.MATCH_ODDS?.previous_bet2 !== undefined && previousBet?.MATCH_ODDS?.previous_bet2 !== null && (
                                                                        <div className="flex items-center justify-start">
                                                                            {previousBet?.MATCH_ODDS?.type === "Back" ? (
                                                                                <div className="flex items-center">
                                                                                    <FaLongArrowAltRight
                                                                                        className={`mr-2 ${index === 0
                                                                                            ? Number(previousBet?.MATCH_ODDS?.previous_bet1) > 0
                                                                                                ? 'text-[#45A255]'
                                                                                                : 'text-red-500'
                                                                                            : index === 1
                                                                                                ? Number(previousBet?.MATCH_ODDS?.previous_bet2) > 0
                                                                                                    ? 'text-[#45A255] '
                                                                                                    : 'text-red-500'
                                                                                                : Number(previousBet?.MATCH_ODDS?.previous_bet3) > 0
                                                                                                    ? 'text-[#45A255]'
                                                                                                    : 'text-red-500'
                                                                                            }`}

                                                                                    />
                                                                                    {matchData?.runners?.length === 2 ? (
                                                                                        <p className={`font-[700] ${Number(index === 0 ? previousBet?.MATCH_ODDS?.previous_bet1 : previousBet?.MATCH_ODDS?.previous_bet2) > 0 ? 'text-[#45A255]' : 'text-red-500'}`}>
                                                                                            {Number(index === 0 ?
                                                                                                previousBet?.MATCH_ODDS?.previous_bet1
                                                                                                :
                                                                                                previousBet?.MATCH_ODDS?.previous_bet2).toFixed(2)}
                                                                                        </p>
                                                                                    ) : (
                                                                                        <p className={`font-[700] ${Number(index === 0 ? previousBet?.MATCH_ODDS?.previous_bet1 : (index === 1 ? previousBet?.MATCH_ODDS?.previous_bet2 : previousBet?.MATCH_ODDS?.previous_bet3)) > 0 ? 'text-[#45A255]' : 'text-red-500'}`}>
                                                                                            {Number(index === 0 ?
                                                                                                previousBet?.MATCH_ODDS?.previous_bet1
                                                                                                : index === 1 ?
                                                                                                    previousBet?.MATCH_ODDS?.previous_bet2
                                                                                                    :
                                                                                                    previousBet?.MATCH_ODDS?.previous_bet3).toFixed(2)}
                                                                                        </p>
                                                                                    )}
                                                                                </div>
                                                                            ) : (
                                                                                <div className="flex items-center">
                                                                                    <FaLongArrowAltRight
                                                                                        className={`mr-2 ${index === 0
                                                                                            ? Number(previousBet?.MATCH_ODDS?.previous_bet1) > 0
                                                                                                ? 'text-[#45A255]'
                                                                                                : 'text-red-500'
                                                                                            : index === 1
                                                                                                ? Number(previousBet?.MATCH_ODDS?.previous_bet2) > 0
                                                                                                    ? 'text-[#45A255] '
                                                                                                    : 'text-red-500'
                                                                                                : Number(previousBet?.MATCH_ODDS?.previous_bet3) > 0
                                                                                                    ? 'text-[#45A255]'
                                                                                                    : 'text-red-500'
                                                                                            }`}
                                                                                    />
                                                                                    {matchData?.runners?.length === 2 ? (
                                                                                        <p className={`font-[700] ${Number(index === 0 ? previousBet?.MATCH_ODDS?.previous_bet1 : previousBet?.MATCH_ODDS?.previous_bet2) > 0 ? 'text-[#45A255]' : 'text-red-500'}`}>
                                                                                            {Number(index === 0 ? previousBet?.MATCH_ODDS?.previous_bet1 : previousBet?.MATCH_ODDS?.previous_bet2).toFixed(2)}
                                                                                        </p>
                                                                                    ) : (
                                                                                        <p className={`font-[700] ${Number(index === 0 ? previousBet?.MATCH_ODDS?.previous_bet1 : (index === 1 ? previousBet?.MATCH_ODDS?.previous_bet2 : previousBet?.MATCH_ODDS?.previous_bet3)) > 0 ? 'text-[#45A255]' : 'text-red-500'}`}>
                                                                                            {Number(index === 0 ? previousBet?.MATCH_ODDS?.previous_bet1
                                                                                                : index === 1 ? previousBet?.MATCH_ODDS?.previous_bet2
                                                                                                    : previousBet?.MATCH_ODDS?.previous_bet3).toFixed(2)}
                                                                                        </p>
                                                                                    )}
                                                                                </div>
                                                                            )}


                                                                            {showBook.t1.amount > 0 && (
                                                                                <>
                                                                                    {betType === "Back" ? (
                                                                                        <>
                                                                                            {
                                                                                                matchData?.runners?.length === 2 ?
                                                                                                    <>
                                                                                                        {showBook.t1.name === item?.nat? (
                                                                                                            <p className={`${showBook.t1.name === item?.nat ? 'text-[#45A255]' : 'text-red-500'} font-[700]`}>
                                                                                                                {`(${index === 0 ? Number(previousBet?.MATCH_ODDS?.previous_bet1) : Number(previousBet?.MATCH_ODDS?.previous_bet2)} + ${Number(showBook.t1.betAmount)})`}
                                                                                                            </p>
                                                                                                        ) : (
                                                                                                            <p className={`${showBook.t1.name === item?.nat ? 'text-[#45A255]' : 'text-red-500'} font-[700]`}>
                                                                                                                {`(${index === 0 ? Number(previousBet?.MATCH_ODDS?.previous_bet1) : Number(previousBet?.MATCH_ODDS?.previous_bet2)} - ${Number(showBook?.t1?.amount)}) `}
                                                                                                            </p>
                                                                                                        )}
                                                                                                    </>
                                                                                                    :
                                                                                                    <>
                                                                                                        {showBook.t1.name === item?.nat? (
                                                                                                            <p className={`${showBook.t1.name === item?.nat? 'text-[#45A255]' : 'text-red-500'} font-[700]`}>
                                                                                                                {`(${Number(index === 0 ? previousBet?.MATCH_ODDS?.previous_bet1
                                                                                                                    : index === 1 ? previousBet?.MATCH_ODDS?.previous_bet2
                                                                                                                        : previousBet?.MATCH_ODDS?.previous_bet3).toFixed(2)} + ${Number(showBook.t1.betAmount)})`}
                                                                                                            </p>
                                                                                                        ) : (
                                                                                                            <p className={`${showBook.t1.name === item?.nat ? 'text-[#45A255]' : 'text-red-500'} font-[700]`}>
                                                                                                                {`(${Number(index === 0 ? previousBet?.MATCH_ODDS?.previous_bet1
                                                                                                                    : index === 1 ? previousBet?.MATCH_ODDS?.previous_bet2
                                                                                                                        : previousBet?.MATCH_ODDS?.previous_bet3).toFixed(2)} - ${Number(showBook?.t1?.amount)})`}
                                                                                                            </p>
                                                                                                        )}
                                                                                                    </>
                                                                                            }

                                                                                        </>
                                                                                    ) : (
                                                                                        <>
                                                                                            {
                                                                                                matchData?.runners?.length === 2 ?
                                                                                                    <>
                                                                                                        {showBook.t1.name === item?.nat ? (
                                                                                                            <p className={`${showBook.t1.name === item?.nat ? 'text-red-500' : 'text-[#45A255]'} font-[700]`}>
                                                                                                                {`(${index === 0 ? Number(previousBet?.MATCH_ODDS?.previous_bet1) : Number(previousBet?.MATCH_ODDS?.previous_bet2)} - ${Number(showBook.t1.betAmount)})`}
                                                                                                            </p>
                                                                                                        ) : (
                                                                                                            <p className={`${showBook.t1.name === item?.nat ? 'text-red-500' : 'text-[#45A255]'} font-[700]`}>
                                                                                                                {`(${index === 0 ? Number(previousBet?.MATCH_ODDS?.previous_bet1) : Number(previousBet?.MATCH_ODDS?.previous_bet2)} + ${Number(showBook?.t1?.amount)})`}
                                                                                                            </p>
                                                                                                        )}
                                                                                                    </>
                                                                                                    :
                                                                                                    <>
                                                                                                        {showBook.t1.name === item?.nat ? (
                                                                                                            <p className={`${showBook.t1.name === item?.nat? 'text-red-500' : 'text-[#45A255]'} font-[700]`}>
                                                                                                                {`(${Number(index === 0 ? previousBet?.MATCH_ODDS?.previous_bet1
                                                                                                                    : index === 1 ? previousBet?.MATCH_ODDS?.previous_bet2
                                                                                                                        : previousBet?.MATCH_ODDS?.previous_bet3).toFixed(2)} - ${Number(showBook.t1.betAmount)})`}
                                                                                                            </p>
                                                                                                        ) : (
                                                                                                            <p className={`${showBook.t1.name === item?.nat ? 'text-red-500' : 'text-[#45A255]'} font-[700]`}>
                                                                                                                {`(${Number(index === 0 ? previousBet?.MATCH_ODDS?.previous_bet1
                                                                                                                    : index === 1 ? previousBet?.MATCH_ODDS?.previous_bet2
                                                                                                                        : previousBet?.MATCH_ODDS?.previous_bet3).toFixed(2)} + ${Number(showBook?.t1?.amount)})`}
                                                                                                            </p>
                                                                                                        )}
                                                                                                    </>}

                                                                                        </>
                                                                                    )}
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                            </>
                                                        )}
                                                    </td>
                                                    {/* Back */}
                                                    <td
                                                        className={`
        ${showBook?.t1?.boxname === item?.b3 ? 'bg-[#2A8EE1] text-white' : 'bg-[#D7E8F4] text-gray-900'}
        hidden lg:table-cell font-semibold text-center w-[60px] lg:w-[100px] 
        ${back && [3, 4, 7].includes(random) ? "bg-[#efe8ae]" : "bg-[#D7E8F4]"}
    `}
                                                    >
                                                        <button
                                                            onClick={() => handleBookie("t1", item?.nat, "blue", item?.b3, item?.mname, "Back", "", "b3", index)}
                                                            className="py-[3px]"
                                                        >
                                                            <p className="px-1 leading-4 font-[700] text-[12px]">{item?.b3 || 0}</p>
                                                            <p className="px-1 leading-4 font-light text-gray-800 text-[11px]">{item?.bs3 || 0}</p>
                                                        </button>
                                                    </td>

                                                    <td
                                                        className={`
        ${showBook?.t1?.boxname === item?.b2 ? 'bg-[#2A8EE1] text-white' : 'bg-[#B7D5EA] text-gray-900'}
        hidden lg:table-cell font-semibold text-center w-[60px] lg:w-[100px]
        ${back && [2, 6, 4].includes(random) ? "bg-[#efe8ae]" : "bg-[#B7D5EA]"}
    `}
                                                    >
                                                        <button
                                                            onClick={() => handleBookie("t1", item?.nat, "blue", item?.b2, item?.mname, "Back", "", "b2", index)}
                                                            className="py-[3px]"
                                                        >
                                                            <p className="px-1 leading-4 font-[700] text-[12px]">{item?.b2 || 0}</p>
                                                            <p className="px-1 leading-4 font-light text-gray-800 text-[11px]">{item?.bs2 || 0}</p>
                                                        </button>
                                                    </td>

                                                    <td
                                                        className={`
        ${showBook?.t1?.boxname === item?.b1 ? 'bg-[#2A8EE1] text-white' : 'bg-[#72BBEF] text-gray-900'}
        font-semibold text-center w-[60px] lg:w-[100px]
        ${back && [9, 1, 7].includes(random) ? "bg-[#efe8ae]" : "bg-[#72BBEF]"}
    `}
                                                    >
                                                        <button
                                                            onClick={() => handleBookie("t1", item?.nat, "blue", item?.b1, item?.mname, "Back", "", "b1", index)}
                                                            className="py-[3px]"
                                                        >
                                                            <p className="px-1 leading-4 font-[700] text-[12px]">{item?.b1 || 0}</p>
                                                            <p className="px-1 leading-4 font-light text-gray-800 text-[11px]">{item?.bs1 || 0}</p>
                                                        </button>
                                                    </td>

                                                    {/* Lay */}
                                                    <td
                                                        className={`
        ${showBook?.t1?.boxname === item?.l1 ? 'bg-[#F4496D] text-white' : 'bg-[#FAA9BA] text-gray-900'}
        py-0.5 font-semibold text-center w-[60px] lg:w-[100px]
        ${lay && [8, 4, 10].includes(random) ? "bg-[#9ce0f3]" : "bg-[#FAA9BA]"}
    `}
                                                    >
                                                        <button
                                                            onClick={() => handleBookie("t1", item?.nat, "red", item?.l1, item?.mname, "Lay", "", "l1", index)}
                                                            className="py-[3px]"
                                                        >
                                                            <p className="px-1 leading-4 font-[700] text-[12px]">{item?.l1 || 0}</p>
                                                            <p className="px-1 leading-4 font-light text-gray-800 text-[11px]">{item?.ls1 || 0}</p>
                                                        </button>
                                                    </td>

                                                    <td
                                                        className={`
        ${showBook?.t1?.boxname === item?.l2 ? 'bg-[#F4496D] text-white' : 'bg-[#EFD3D9] text-gray-900'}
        hidden lg:table-cell py-0.5 font-semibold text-center w-[60px] lg:w-[100px]
        ${lay && [8, 5, 9].includes(random) ? "bg-[#9ce0f3]" : "bg-[#EFD3D9]"}
    `}
                                                    >
                                                        <button
                                                            onClick={() => handleBookie("t1", item?.nat, "red", item?.l2, item?.mname, "Lay", "", "l2", index)}
                                                            className="py-[3px]"
                                                        >
                                                            <p className="px-1 leading-4 font-[700] text-[12px]">{item?.l2 || 0}</p>
                                                            <span className="px-1 leading-4 font-light text-gray-800 text-[11px]">{item?.ls2 || 0}</span>
                                                        </button>
                                                    </td>


                                                    <td

                                                        className={`${showBook.t1.boxname == item?.l3 ? 'bg-[#F4496D] text-white' : 'bg-[#F6E6EA] text-gray-900'}   hidden lg:table-cell py-0.5 font-semibold text-center w-[60px] lg:w-[100px] ${(lay && [2, 4, 7,].includes(random)) ? "bg-[#9ce0f3]" : "bg-[#F6E6EA]"}`}
                                                    >
                                                        <button
                                                            onClick={() => handleBookie("t1", item?.nat, "red", item?.l3, item?.mname, "Lay", "", "l3", index)}
                                                            className='py-[3px]'
                                                        >
                                                            <p className="px-1 leading-4  text-[12px] font-[700]">{item?.l3 || 0}</p>
                                                            <p className="px-1 font-light text-gray-800 leading-4   text-[11px]">{item?.ls3 || 0}</p>
                                                        </button>
                                                    </td>
                                                </tr>

                                                {showBook.t1.name == item?.nat &&
                                                    <tr className={` ${showBook.t1.color == 'red' ? 'lg:bg-[#FAA9BA] bg-[#F1D5DC]' : 'lg:bg-[#72BBEF] bg-[#BEDDF4]'} border-b border-gray-300`}>
                                                        <td colSpan={7} className=' pt-1 '>
                                                            <div className="grid grid-cols-4 gap-2 lg:px-3 px-0.5 pb-0.5 border-b border-[#72BBEF] max-lg:grid-cols-2">
                                                                {/* Cancel Button */}
                                                                <button onClick={() => HandleCancel("t1")} className="flex max-lg:hidden bg-white  justify-center items-center h-full border rounded-md border-gray-600">
                                                                    <p className="px-7 py-1 text-center font-bold text-black">Cancel</p>
                                                                </button>

                                                                {/* rate control continer */}
                                                                <div className="flex text-center border rounded-lg border-gray-500 w-full"> {/* Full width for the container */}
                                                                    <button onClick={() => RateDecrease('t1')} className="px-2 w-16 py-1 border-r bg-gray-100 rounded-l-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                        <FaMinus className="text-[#347fc5]" />
                                                                    </button>
                                                                    <div className="border-l border-r border-gray-700 flex-grow">
                                                                        <input
                                                                            type="number"
                                                                            value={showBook.t1.rate} // Display rate for t1
                                                                            onChange={(e) => handleChange('t1', 'rate', Number(e.target.value))} // Update rate for t1
                                                                            min={0}
                                                                            className="text-center w-full h-full border-t border-b border-gray-300 text-black font-bold focus-within:outline-none"
                                                                        />
                                                                    </div>
                                                                    <button onClick={() => RateIncrease('t1')} className="px-2 w-16 py-1 bg-gray-100 rounded-r-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                        <FaPlus className="text-[#347fc5]" />
                                                                    </button>
                                                                </div>

                                                                {/* amount control */}
                                                                <div className="flex text-center border rounded-lg border-gray-500 w-full"> {/* Full width for the container */}
                                                                    <button onClick={() => AmountDecrease('t1')} className="px-2 w-16 py-1 border-r bg-gray-100 rounded-l-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                        <FaMinus className="text-[#347fc5]" />
                                                                    </button>
                                                                    <div className="border-l border-r border-gray-700 flex-grow">
                                                                        <input
                                                                            type="number"
                                                                            value={showBook.t1.amount} // Display amount for t1
                                                                            onChange={(e) => handleChange('t1', 'amount', Number(e.target.value))} // Update amount for t1
                                                                            min={0}
                                                                            max={10000}
                                                                            className="text-center w-full h-full border-t border-b border-gray-300 text-black font-bold focus-within:outline-none"
                                                                        />
                                                                    </div>
                                                                    <button onClick={() => AmountIncrease('t1')} className="px-2 w-16 py-1 bg-gray-100 rounded-r-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                        <FaPlus className="text-[#347fc5]" />
                                                                    </button>
                                                                </div>

                                                                {/* Place Bet Button */}
                                                                <button
                                                                    onClick={() => handlePlaceBet("t1", item?.mname, item?.nat, t1Data[0]?.length)}
                                                                    disabled={item?.mstatus !== "OPEN"}
                                                                    className={`flex max-lg:hidden justify-center items-center h-full border rounded-md border-gray-600 
                                                                        ${showBook.t1.amount
                                                                            ? 'bg-gradient-to-t from-[#1e714f] to-[#16a34a]'
                                                                            : 'bg-gradient-to-t from-[#626278] to-[#7380AD]'
                                                                        } `}>
                                                                    <p className="px-7 py-1 text-center font-extrabold text-white text-lg">Place Bet</p>
                                                                </button>
                                                            </div>


                                                            <div className={`grid grid-cols-8 max-lg:grid-cols-4 gap-2 lg:px-2 px-0.5 py-0.5 border-t border-t-blue-300  ${showBook.t1.color == 'red' ? 'border-t-red-300' : 'border-t-blue-300'} text-xs lg:text-sm`}>
                                                                <button onClick={() => handleBetAmountUpdate("t1", 100)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >100</button>
                                                                <button onClick={() => handleBetAmountUpdate("t1", 200)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >200</button>
                                                                <button onClick={() => handleBetAmountUpdate("t1", 500)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >500</button>
                                                                <button onClick={() => handleBetAmountUpdate("t1", 5000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >5000</button>
                                                                <button onClick={() => handleBetAmountUpdate("t1", 10000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >10000</button>
                                                                <button onClick={() => handleBetAmountUpdate("t1", 25000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >25000</button>
                                                                <button onClick={() => handleBetAmountUpdate("t1", 50000)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >50000</button>
                                                                <button onClick={() => handleBetAmountUpdate("t1", 100000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >100000</button>

                                                            </div>

                                                            <div className="grid grid-cols-2 my-1 lg:hidden gap-2">
                                                                <button onClick={() => HandleCancel("t1")} className='flex  justify-center items-center h-full border rounded-md border-gray-600 bg-white'>
                                                                    <p className='  px-7 py-1 text-center font-bold text-black'>Cancel</p>

                                                                </button>
                                                                <button
                                                                    onClick={() => handlePlaceBet("t1", item?.mname, item?.nat, t1Data[0]?.length)}
                                                                    disabled={item?.mstatus !== "OPEN"}
                                                                    className={`flex justify-center items-center h-full 
                                                                        ${showBook.t1.amount
                                                                            ? 'bg-gradient-to-t from-[#1e714f] to-[#16a34a]'
                                                                            : 'bg-gradient-to-t from-[#626278] to-[#7380AD]'
                                                                        }`}
                                                                >
                                                                    <p className="px-7 py-1 text-center font-extrabold text-white text-lg">
                                                                        Place Bet
                                                                    </p>
                                                                </button>

                                                            </div>
                                                        </td>


                                                    </tr>
                                                }
                                                {/* {
                                                    item?.mstatus == "OPEN" && (time?.days == 0 && time?.hours == 0 && time?.minutes == 0 && time?.seconds == 0) ? "" :
                                                        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white bg-opacity-30 z-10 border border-red-500">
                                                            <span className="text-red-600 text-3xl font-bold tracking-wide">SUSPENDED</span>
                                                        </div>
                                                } */}

                                            </tbody>
                                        )}
                                    </>
                                ) : name === 'Tennis' ? (
                                    <>
                                        {Array.isArray(matchData?.runners) && matchData?.runners.length > 0 ? (
                                            matchData.runners.map((item, index) => {
                                                const backPrices = item.backPrices || [];
                                                const layPrices = item.layPrices || [];

                                                return (
                                                    <tbody key={index}>
                                                        <tr className="bg-white border-b border-gray-300">
                                                            <td className="px-2 py-0.5 text-nowrap">
                                                                <a className="flex gap-x-2 flex-wrap capitalize text-gray-900 font-semibold">
                                                                    {item?.name} {/* Display runner name from matchData */}
                                                                </a>
                                                                {!previousBet?.["Match Odds"] ? (
                                                                    showBook?.t1?.amount > 0 && (
                                                                        <>
                                                                            {betType === "Back" ? (
                                                                                <p className={`${showBook.t1.name === item?.name ? 'text-[#45A255]' : 'text-red-500'} font-[700]`}>
                                                                                    {showBook.t1.name === item?.name ? `(${Number(showBook.t1.betAmount).toFixed(2)})` : `(${Number(showBook.t1.amount).toFixed(2)})`}
                                                                                </p>
                                                                            ) : (
                                                                                <p className={`${showBook.t1.name === item?.name ? 'text-red-500' : 'text-[#45A255]'} font-[700]`}>
                                                                                    {showBook.t1.name === item?.name ? `(${Number(showBook.t1.betAmount).toFixed(2)})` : `(${Number(showBook.t1.amount).toFixed(2)})`}
                                                                                </p>
                                                                            )}
                                                                        </>
                                                                    )
                                                                ) : (
                                                                    <>
                                                                        {!previousBet?.["Match Odds"]?.previous_bet1 !== undefined && !previousBet?.["Match Odds"]?.previous_bet1 !== null &&
                                                                            !previousBet?.["Match Odds"]?.previous_bet2 !== undefined && !previousBet?.["Match Odds"]?.previous_bet2 !== null && (
                                                                                <div className="flex items-center justify-start">
                                                                                    {previousBet?.["Match Odds"].type === "Back" ? (
                                                                                        <div className="flex items-center">
                                                                                            <FaLongArrowAltRight
                                                                                                className={`mr-2 ${Number(index === 0 ? previousBet?.["Match Odds"]?.previous_bet1 : previousBet?.["Match Odds"]?.previous_bet2) > 0 ? 'text-[#45A255]' : 'text-red-500'}`}
                                                                                            />
                                                                                            <p className={`font-[700] ${Number(index === 0 ? previousBet?.["Match Odds"]?.previous_bet1 : previousBet?.["Match Odds"]?.previous_bet2) > 0 ? 'text-[#45A255]' : 'text-red-500'}`}>
                                                                                                {Number(index === 0 ? previousBet?.["Match Odds"]?.previous_bet1 : previousBet?.["Match Odds"]?.previous_bet2).toFixed(2)}
                                                                                            </p>

                                                                                        </div>
                                                                                    ) : (
                                                                                        <div className="flex items-center">
                                                                                            <FaLongArrowAltRight
                                                                                                className={`mr-2 ${Number(index === 0 ? previousBet?.["Match Odds"]?.previous_bet1 : previousBet?.["Match Odds"]?.previous_bet2) > 0 ? 'text-[#45A255]' : 'text-red-500'}`}
                                                                                            />
                                                                                            <p className={`font-[700] ${Number(index === 0 ? previousBet?.["Match Odds"]?.previous_bet1 : previousBet?.["Match Odds"]?.previous_bet2) > 0 ? 'text-[#45A255]' : 'text-red-500'}`}>
                                                                                                {Number(index === 0 ? previousBet?.["Match Odds"]?.previous_bet1 : previousBet?.["Match Odds"]?.previous_bet2).toFixed(2)}
                                                                                            </p>
                                                                                        </div>
                                                                                    )}


                                                                                    {showBook.t1.amount > 0 && (
                                                                                        <>
                                                                                            {betType === "Back" ? (
                                                                                                <>
                                                                                                    {showBook.t1.name === item?.name ? (
                                                                                                        <p className={`${showBook.t1.name === item?.name ? 'text-[#45A255]' : 'text-red-500'} font-[700]`}>
                                                                                                            {`(${index === 0 ? Number(previousBet?.["Match Odds"]?.previous_bet1) : Number(previousBet?.["Match Odds"]?.previous_bet2)} + ${Number(showBook.t1.betAmount)})`}
                                                                                                        </p>
                                                                                                    ) : (
                                                                                                        <p className={`${showBook.t1.name === item?.name ? 'text-[#45A255]' : 'text-red-500'} font-[700]`}>
                                                                                                            {`(${index === 0 ? Number(!previousBet?.["Match Odds"]?.previous_bet1) : Number(previousBet?.["Match Odds"]?.previous_bet2)} - ${Number(showBook?.t1?.amount)})`}
                                                                                                        </p>
                                                                                                    )}
                                                                                                </>
                                                                                            ) : (
                                                                                                <>
                                                                                                    {showBook.t1.name === item?.name ? (
                                                                                                        <p className={`${showBook.t1.name === item?.name ? 'text-red-500' : 'text-[#45A255]'} font-[700]`}>
                                                                                                            {`(${index === 0 ? Number(previousBet?.["Match Odds"]?.previous_bet1) : Number(previousBet?.["Match Odds"]?.previous_bet2)} - ${Number(showBook.t1.betAmount)})`}
                                                                                                        </p>
                                                                                                    ) : (
                                                                                                        <p className={`${showBook.t1.name === item?.name ? 'text-red-500' : 'text-[#45A255]'} font-[700]`}>
                                                                                                            {`(${index === 0 ? Number(previousBet?.["Match Odds"]?.previous_bet1) : Number(previousBet?.["Match Odds"]?.previous_bet2)} + ${Number(showBook?.t1?.amount)})`}
                                                                                                        </p>
                                                                                                    )}
                                                                                                </>
                                                                                            )}
                                                                                        </>
                                                                                    )}
                                                                                </div>
                                                                            )}
                                                                    </>
                                                                )}
                                                            </td>



                                                            {/* Back Prices */}
                                                            <td className="bg-[#D7E8F4] text-gray-900 hidden lg:table-cell text-center w-[100px]">
                                                                <button className="py-[3px]" onClick={() => handleBookie("t1", item?.name, "blue", backPrices[2]?.price, item?.mname, "Back", "", "backPrices[2]?.price")}>
                                                                    <p className="px-1 font-[700] text-[12px]">{backPrices[2]?.price || 0}</p>
                                                                    <p className="px-1 font-light text-gray-800 text-[11px]">{backPrices[2]?.size || 0}</p>
                                                                </button>
                                                            </td>

                                                            <td className="bg-[#B7D5EA] text-gray-900 hidden lg:table-cell text-center w-[100px]">
                                                                <button className="py-[3px]" onClick={() => handleBookie("t1", item?.name, "blue", backPrices[1]?.price, item?.mname, "Back", "", "backPrices[1]?.price")}>
                                                                    <p className="px-1 font-[700] text-[12px]">{backPrices[1]?.price || 0}</p>
                                                                    <p className="px-1 font-light text-gray-800 text-[11px]">{backPrices[1]?.size || 0}</p>
                                                                </button>
                                                            </td>

                                                            <td className="bg-[#72BBEF] text-gray-900 text-center w-[100px]">
                                                                <button className="py-[3px]" onClick={() => handleBookie("t1", item?.name, "blue", backPrices[0]?.price, item?.mname, "Back", "", "backPrices[0]?.price", index)}>
                                                                    <p className="px-1 font-[700] text-[12px]">{backPrices[0]?.price || 0}</p>
                                                                    <p className="px-1 font-light text-gray-800 text-[11px]">{backPrices[0]?.size || 0}</p>
                                                                </button>
                                                            </td>

                                                            {/* Lay Prices */}
                                                            <td className="bg-[#FAA9BA] text-gray-900 text-center w-[100px]">
                                                                <button className="py-[3px]" onClick={() => handleBookie("t1", item?.name, "red", layPrices[0]?.price, item?.mname, "Lay", "", "layPrices[0]?.price", index)}>
                                                                    <p className="px-1 font-[700] text-[12px]">{layPrices[0]?.price || 0}</p>
                                                                    <p className="px-1 font-light text-gray-800 text-[11px]">{layPrices[0]?.size || 0}</p>
                                                                </button>
                                                            </td>

                                                            <td className="bg-[#EFD3D9] text-gray-900 hidden lg:table-cell text-center w-[100px]">
                                                                <button className="py-[3px]" onClick={() => handleBookie("t1", item?.name, "red", layPrices[1]?.price, item?.mname, "Lay", "", "layPrices[1]?.price",)}>
                                                                    <p className="px-1 font-[700] text-[12px]">{layPrices[1]?.price || 0}</p>
                                                                    <p className="px-1 font-light text-gray-800 text-[11px]">{layPrices[1]?.size || 0}</p>
                                                                </button>
                                                            </td>

                                                            <td className="bg-[#F6E6EA] text-gray-900 hidden lg:table-cell text-center w-[100px]">
                                                                <button className="py-[3px]" onClick={() => handleBookie("t1", item?.name, "red", layPrices[2]?.price, item?.mname, "Lay", "", "layPrices[1]?.price",)}>
                                                                    <p className="px-1 font-[700] text-[12px]">{layPrices[2]?.price || 0}</p>
                                                                    <p className="px-1 font-light text-gray-800 text-[11px]">{layPrices[2]?.size || 0}</p>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                        {showBook.t1.name == item?.name &&
                                                            <tr className={` ${showBook.t1.color == 'red' ? 'lg:bg-[#FAA9BA] bg-[#F1D5DC]' : 'lg:bg-[#72BBEF] bg-[#BEDDF4]'} border-b border-gray-300`}>
                                                                <td colSpan={7} className=' pt-1 '>
                                                                    <div className="grid grid-cols-4 gap-2 lg:px-3 px-0.5 pb-0.5 border-b border-[#72BBEF] max-lg:grid-cols-2">
                                                                        {/* Cancel Button */}
                                                                        <button onClick={() => HandleCancel("t1")} className="flex max-lg:hidden bg-white  justify-center items-center h-full border rounded-md border-gray-600">
                                                                            <p className="px-7 py-1 text-center font-bold text-black">Cancel</p>
                                                                        </button>

                                                                        {/* rate control continer */}
                                                                        <div className="flex text-center border rounded-lg border-gray-500 w-full"> {/* Full width for the container */}
                                                                            <button onClick={() => RateDecrease('t1')} className="px-2 w-16 py-1 border-r bg-gray-100 rounded-l-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                                <FaMinus className="text-[#347fc5]" />
                                                                            </button>
                                                                            <div className="border-l border-r border-gray-700 flex-grow">
                                                                                <input
                                                                                    type="number"
                                                                                    value={showBook.t1.rate} // Display rate for t1
                                                                                    onChange={(e) => handleChange('t1', 'rate', Number(e.target.value))} // Update rate for t1
                                                                                    min={0}
                                                                                    className="text-center w-full h-full border-t border-b border-gray-300 text-black font-bold focus-within:outline-none"
                                                                                />
                                                                            </div>
                                                                            <button onClick={() => RateIncrease('t1')} className="px-2 w-16 py-1 bg-gray-100 rounded-r-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                                <FaPlus className="text-[#347fc5]" />
                                                                            </button>
                                                                        </div>

                                                                        {/* amount control */}
                                                                        <div className="flex text-center border rounded-lg border-gray-500 w-full"> {/* Full width for the container */}
                                                                            <button onClick={() => AmountDecrease('t1')} className="px-2 w-16 py-1 border-r bg-gray-100 rounded-l-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                                <FaMinus className="text-[#347fc5]" />
                                                                            </button>
                                                                            <div className="border-l border-r border-gray-700 flex-grow">
                                                                                <input
                                                                                    type="number"
                                                                                    value={showBook.t1.amount} // Display amount for t1
                                                                                    onChange={(e) => handleChange('t1', 'amount', Number(e.target.value))} // Update amount for t1
                                                                                    min={0}
                                                                                    max={10000}
                                                                                    className="text-center w-full h-full border-t border-b border-gray-300 text-black font-bold focus-within:outline-none"
                                                                                />
                                                                            </div>
                                                                            <button onClick={() => AmountIncrease('t1')} className="px-2 w-16 py-1 bg-gray-100 rounded-r-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                                <FaPlus className="text-[#347fc5]" />
                                                                            </button>
                                                                        </div>

                                                                        {/* Place Bet Button */}
                                                                        <button
                                                                            onClick={() => handlePlaceBet("t1", matchDetail?.marketName, item?.name, matchData?.runners?.length)}
                                                                            // disabled={runnersData?.status != "OPEN"}
                                                                            className={`flex max-lg:hidden justify-center items-center h-full border rounded-md border-gray-600                                  
                                                                            ${showBook.t1.amount
                                                                                    ? 'bg-gradient-to-t from-[#1e714f] to-[#16a34a]'
                                                                                    : 'bg-gradient-to-t from-[#626278] to-[#7380AD]'
                                                                                } `}>
                                                                            <p className="px-7 py-1 text-center font-extrabold text-white text-lg">Place Bet</p>
                                                                        </button>
                                                                    </div>



                                                                    <div className={`grid grid-cols-8 max-lg:grid-cols-4 gap-2 lg:px-2 px-0.5 py-0.5 border-t border-t-blue-300  ${showBook.t1.color == 'red' ? 'border-t-red-300' : 'border-t-blue-300'} text-xs lg:text-sm`}>
                                                                        <button onClick={() => handleBetAmountUpdate("t1", 100)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >100</button>
                                                                        <button onClick={() => handleBetAmountUpdate("t1", 200)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >200</button>
                                                                        <button onClick={() => handleBetAmountUpdate("t1", 500)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >500</button>
                                                                        <button onClick={() => handleBetAmountUpdate("t1", 5000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >5000</button>
                                                                        <button onClick={() => handleBetAmountUpdate("t1", 10000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >10000</button>
                                                                        <button onClick={() => handleBetAmountUpdate("t1", 25000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >25000</button>
                                                                        <button onClick={() => handleBetAmountUpdate("t1", 50000)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >50000</button>
                                                                        <button onClick={() => handleBetAmountUpdate("t1", 100000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >100000</button>

                                                                    </div>

                                                                    <div className="grid grid-cols-2 my-1 lg:hidden gap-2">
                                                                        <button onClick={() => HandleCancel("t1")} className='flex  justify-center items-center h-full border rounded-md border-gray-600 bg-white'>
                                                                            <p className='  px-7 py-1 text-center font-bold text-black'>Cancel</p>

                                                                        </button>
                                                                        <button
                                                                            onClick={() => handlePlaceBet("t1", matchDetail?.marketName, item?.name, matchData?.runners?.length)}
                                                                            // disabled={item?.mstatus !== "OPEN"}
                                                                            className={`flex  justify-center items-center h-full bg-[#577094] border rounded-md border-gray-600
                                                                                ${showBook.t1.amount
                                                                                    ? 'bg-gradient-to-t from-[#1e714f] to-[#16a34a]'
                                                                                    : 'bg-gradient-to-t from-[#626278] to-[#7380AD]'
                                                                                }`}>
                                                                            <p className='px-7 py-1 text-center font-extrabold text-white text-lg'>Place Bet</p>

                                                                        </button>
                                                                    </div>
                                                                </td>


                                                            </tr>
                                                        }
                                                        {/* {
                                                            runnersData?.status == "OPEN" && (time?.days == 0 && time?.hours == 0 && time?.minutes == 0 && time?.seconds == 0) ? "" :
                                                                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-10 text-red-500 font-bold">
                                                                    Suspended
                                                                </div>
                                                        } */}
                                                    </tbody>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                {/* <td colSpan="7" className="text-center text-gray-600">
                                            No data available.
                                        </td> */}
                                            </tr>
                                        )}
                                    </>

                                ) : name === 'Soccer' ? (
                                    <>

                                        {Array.isArray(matchData?.runners) && matchData?.runners.length > 0 ? (
                                            matchData.runners.map((item, index) => {
                                                const backPrices = item.backPrices || [];
                                                const layPrices = item.layPrices || [];

                                                return (
                                                    <tbody key={index}>
                                                        <tr className="bg-white border-b border-gray-300">
                                                            <td className="px-2 py-0.5 text-nowrap">
                                                                <a className="flex gap-x-2 flex-wrap capitalize text-gray-900 font-semibold">
                                                                    {item.name} {/* Display runner name from matchData */}
                                                                </a>
                                                                {!previousBet?.["Match Odds"] ? (
                                                                    showBook?.t1?.amount > 0 && (
                                                                        <>
                                                                            {betType === "Back" ? (
                                                                                <p className={`${showBook.t1.name === item?.name ? 'text-[#45A255]' : 'text-red-500'} font-[700]`}>
                                                                                    {showBook.t1.name === item?.name ? `(${Number(showBook.t1.betAmount).toFixed(2)})` : `(${Number(showBook.t1.amount).toFixed(2)})`}
                                                                                </p>
                                                                            ) : (
                                                                                <p className={`${showBook.t1.name === item?.name ? 'text-red-500' : 'text-[#45A255]'} font-[700]`}>
                                                                                    {showBook.t1.name === item?.name ? `(${Number(showBook.t1.betAmount).toFixed(2)})` : `(${Number(showBook.t1.amount).toFixed(2)})`}
                                                                                </p>
                                                                            )}
                                                                        </>
                                                                    )
                                                                ) : (

                                                                    <>
                                                                        {previousBet?.["Match Odds"]?.previous_bet1 !== undefined && previousBet?.["Match Odds"]?.previous_bet1 !== null &&
                                                                            previousBet?.["Match Odds"]?.previous_bet2 !== undefined && previousBet?.["Match Odds"]?.previous_bet2 !== null && (
                                                                                <div className="flex items-center justify-start">
                                                                                    {previousBet?.["Match Odds"]?.type === "Back" ? (
                                                                                        <div className="flex items-center">
                                                                                            <FaLongArrowAltRight
                                                                                                className={`mr-2 ${index === 0
                                                                                                    ? Number(previousBet?.["Match Odds"]?.previous_bet1) > 0
                                                                                                        ? 'text-[#45A255]'
                                                                                                        : 'text-red-500'
                                                                                                    : index === 1
                                                                                                        ? Number(previousBet?.["Match Odds"]?.previous_bet2) > 0
                                                                                                            ? 'text-[#45A255] '
                                                                                                            : 'text-red-500'
                                                                                                        : Number(previousBet?.["Match Odds"]?.previous_bet3) > 0
                                                                                                            ? 'text-[#45A255]'
                                                                                                            : 'text-red-500'
                                                                                                    }`}

                                                                                            />
                                                                                            {matchData?.runners?.length === 2 ? (
                                                                                                <p className={`font-[700] ${Number(index === 0 ? previousBet?.["Match Odds"]?.previous_bet1 : previousBet?.["Match Odds"]?.previous_bet2) > 0 ? 'text-[#45A255]' : 'text-red-500'}`}>
                                                                                                    {Number(index === 0 ?
                                                                                                        previousBet?.["Match Odds"]?.previous_bet1
                                                                                                        :
                                                                                                        previousBet?.["Match Odds"]?.previous_bet2).toFixed(2)}
                                                                                                </p>
                                                                                            ) : (
                                                                                                <p className={`font-[700] ${Number(index === 0 ? previousBet?.["Match Odds"]?.previous_bet1 : (index === 1 ? previousBet?.["Match Odds"]?.previous_bet2 : previousBet?.["Match Odds"]?.previous_bet3)) > 0 ? 'text-[#45A255]' : 'text-red-500'}`}>
                                                                                                    {Number(index === 0 ?
                                                                                                        previousBet?.["Match Odds"]?.previous_bet1
                                                                                                        : index === 1 ?
                                                                                                            previousBet?.["Match Odds"]?.previous_bet2
                                                                                                            :
                                                                                                            previousBet?.["Match Odds"]?.previous_bet3).toFixed(2)}
                                                                                                </p>
                                                                                            )}
                                                                                        </div>
                                                                                    ) : (
                                                                                        <div className="flex items-center">
                                                                                            <FaLongArrowAltRight
                                                                                                className={`mr-2 ${index === 0
                                                                                                    ? Number(previousBet?.["Match Odds"]?.previous_bet1) > 0
                                                                                                        ? 'text-[#45A255]'
                                                                                                        : 'text-red-500'
                                                                                                    : index === 1
                                                                                                        ? Number(previousBet?.["Match Odds"]?.previous_bet2) > 0
                                                                                                            ? 'text-[#45A255] '
                                                                                                            : 'text-red-500'
                                                                                                        : Number(previousBet?.["Match Odds"]?.previous_bet3) > 0
                                                                                                            ? 'text-[#45A255]'
                                                                                                            : 'text-red-500'
                                                                                                    }`}
                                                                                            />
                                                                                            {matchData?.runners?.length === 2 ? (
                                                                                                <p className={`font-[700] ${Number(index === 0 ? previousBet?.["Match Odds"]?.previous_bet1 : previousBet?.["Match Odds"]?.previous_bet2) > 0 ? 'text-[#45A255]' : 'text-red-500'}`}>
                                                                                                    {Number(index === 0 ? previousBet?.["Match Odds"]?.previous_bet1 : previousBet?.["Match Odds"]?.previous_bet2).toFixed(2)}
                                                                                                </p>
                                                                                            ) : (
                                                                                                <p className={`font-[700] ${Number(index === 0 ? previousBet?.["Match Odds"]?.previous_bet1 : (index === 1 ? previousBet?.["Match Odds"]?.previous_bet2 : previousBet?.["Match Odds"]?.previous_bet3)) > 0 ? 'text-[#45A255]' : 'text-red-500'}`}>
                                                                                                    {Number(index === 0 ? previousBet?.["Match Odds"]?.previous_bet1
                                                                                                        : index === 1 ? previousBet?.["Match Odds"]?.previous_bet2
                                                                                                            : previousBet?.["Match Odds"]?.previous_bet3).toFixed(2)}
                                                                                                </p>
                                                                                            )}
                                                                                        </div>
                                                                                    )}


                                                                                    {showBook.t1.amount > 0 && (
                                                                                        <>
                                                                                            {betType === "Back" ? (
                                                                                                <>
                                                                                                    {
                                                                                                        matchData?.runners?.length === 2 ?
                                                                                                            <>
                                                                                                                {showBook.t1.name === item?.name ? (
                                                                                                                    <p className={`${showBook.t1.name === item?.name ? 'text-[#45A255]' : 'text-red-500'} font-[700]`}>
                                                                                                                        {`(${index === 0 ? Number(previousBet?.["Match Odds"]?.previous_bet1) : Number(previousBet?.["Match Odds"]?.previous_bet2)} + ${Number(showBook.t1.betAmount)})`}
                                                                                                                    </p>
                                                                                                                ) : (
                                                                                                                    <p className={`${showBook.t1.name === item?.name ? 'text-[#45A255]' : 'text-red-500'} font-[700]`}>
                                                                                                                        {`(${index === 0 ? Number(previousBet?.["Match Odds"]?.previous_bet1) : Number(previousBet?.["Match Odds"]?.previous_bet2)} - ${Number(showBook?.t1?.amount)}) `}
                                                                                                                    </p>
                                                                                                                )}
                                                                                                            </>
                                                                                                            :
                                                                                                            <>
                                                                                                                {showBook.t1.name === item?.name ? (
                                                                                                                    <p className={`${showBook.t1.name === item?.name ? 'text-[#45A255]' : 'text-red-500'} font-[700]`}>
                                                                                                                        {`(${Number(index === 0 ? previousBet?.["Match Odds"]?.previous_bet1
                                                                                                                            : index === 1 ? previousBet?.["Match Odds"]?.previous_bet2
                                                                                                                                : previousBet?.["Match Odds"]?.previous_bet3).toFixed(2)} + ${Number(showBook.t1.betAmount)})`}
                                                                                                                    </p>
                                                                                                                ) : (
                                                                                                                    <p className={`${showBook.t1.name === item?.name ? 'text-[#45A255]' : 'text-red-500'} font-[700]`}>
                                                                                                                        {`(${Number(index === 0 ? previousBet?.["Match Odds"]?.previous_bet1
                                                                                                                            : index === 1 ? previousBet?.["Match Odds"]?.previous_bet2
                                                                                                                                : previousBet?.["Match Odds"]?.previous_bet3).toFixed(2)} - ${Number(showBook?.t1?.amount)})`}
                                                                                                                    </p>
                                                                                                                )}
                                                                                                            </>
                                                                                                    }

                                                                                                </>
                                                                                            ) : (
                                                                                                <>
                                                                                                    {
                                                                                                        matchData?.runners?.length === 2 ?
                                                                                                            <>
                                                                                                                {showBook.t1.name === item?.name ? (
                                                                                                                    <p className={`${showBook.t1.name === item?.name ? 'text-red-500' : 'text-[#45A255]'} font-[700]`}>
                                                                                                                        {`(${index === 0 ? Number(previousBet?.["Match Odds"]?.previous_bet1) : Number(previousBet?.["Match Odds"]?.previous_bet2)} - ${Number(showBook.t1.betAmount)})`}
                                                                                                                    </p>
                                                                                                                ) : (
                                                                                                                    <p className={`${showBook.t1.name === item?.name ? 'text-red-500' : 'text-[#45A255]'} font-[700]`}>
                                                                                                                        {`(${index === 0 ? Number(previousBet?.["Match Odds"]?.previous_bet1) : Number(previousBet?.["Match Odds"]?.previous_bet2)} + ${Number(showBook?.t1?.amount)})`}
                                                                                                                    </p>
                                                                                                                )}
                                                                                                            </>
                                                                                                            :
                                                                                                            <>
                                                                                                                {showBook.t1.name === item?.name ? (
                                                                                                                    <p className={`${showBook.t1.name === item?.name ? 'text-red-500' : 'text-[#45A255]'} font-[700]`}>
                                                                                                                        {`(${Number(index === 0 ? previousBet?.["Match Odds"]?.previous_bet1
                                                                                                                            : index === 1 ? previousBet?.["Match Odds"]?.previous_bet2
                                                                                                                                : previousBet?.["Match Odds"]?.previous_bet3).toFixed(2)} - ${Number(showBook.t1.betAmount)})`}
                                                                                                                    </p>
                                                                                                                ) : (
                                                                                                                    <p className={`${showBook.t1.name === item?.name ? 'text-red-500' : 'text-[#45A255]'} font-[700]`}>
                                                                                                                        {`(${Number(index === 0 ? previousBet?.["Match Odds"]?.previous_bet1
                                                                                                                            : index === 1 ? previousBet?.["Match Odds"]?.previous_bet2
                                                                                                                                : previousBet?.["Match Odds"]?.previous_bet3).toFixed(2)} + ${Number(showBook?.t1?.amount)})`}
                                                                                                                    </p>
                                                                                                                )}
                                                                                                            </>}

                                                                                                </>
                                                                                            )}
                                                                                        </>
                                                                                    )}
                                                                                </div>
                                                                            )}
                                                                    </>
                                                                )}
                                                            </td>

                                                            {/* Back Prices */}
                                                            <td className="bg-[#D7E8F4] text-gray-900 hidden lg:table-cell text-center w-[100px]">
                                                                <button className="py-[3px]" onClick={() => handleBookie("t1", item?.name, "blue", backPrices[2]?.price, item?.mname, "Back")}>
                                                                    <p className="px-1 font-[700] text-[12px]">{backPrices[2]?.price || 0}</p>
                                                                    <p className="px-1 font-light text-gray-800 text-[11px]">{backPrices[2]?.size || 0}</p>
                                                                </button>
                                                            </td>

                                                            <td className="bg-[#B7D5EA] text-gray-900 hidden lg:table-cell text-center w-[100px]">
                                                                <button className="py-[3px]" onClick={() => handleBookie("t1", item?.name, "blue", backPrices[1]?.price, item?.mname, "Back")}>
                                                                    <p className="px-1 font-[700] text-[12px]">{backPrices[1]?.price || 0}</p>
                                                                    <p className="px-1 font-light text-gray-800 text-[11px]">{backPrices[1]?.size || 0}</p>
                                                                </button>
                                                            </td>

                                                            <td className="bg-[#72BBEF] text-gray-900 text-center w-[100px]">
                                                                <button className="py-[3px]" onClick={() => handleBookie("t1", item?.name, "blue", backPrices[0]?.price, item?.mname, "Back", "", "backPrices[0]?.price", index)}>
                                                                    <p className="px-1 font-[700] text-[12px]">{backPrices[0]?.price || 0}</p>
                                                                    <p className="px-1 font-light text-gray-800 text-[11px]">{backPrices[0]?.size || 0}</p>
                                                                </button>
                                                            </td>

                                                            {/* Lay Prices */}
                                                            <td className="bg-[#FAA9BA] text-gray-900 text-center w-[100px]">
                                                                <button className="py-[3px]" onClick={() => handleBookie("t1", item?.name, "red", layPrices[0]?.price, item?.mname, "Lay", "", "layPrices[0]?.price", index)}>
                                                                    <p className="px-1 font-[700] text-[12px]">{layPrices[0]?.price || 0}</p>
                                                                    <p className="px-1 font-light text-gray-800 text-[11px]">{layPrices[0]?.size || 0}</p>
                                                                </button>
                                                            </td>

                                                            <td className="bg-[#EFD3D9] text-gray-900 hidden lg:table-cell text-center w-[100px]">
                                                                <button className="py-[3px]" onClick={() => handleBookie("t1", item?.name, "red", layPrices[1]?.price, item?.mname, "Lay")}>
                                                                    <p className="px-1 font-[700] text-[12px]">{layPrices[1]?.price || 0}</p>
                                                                    <p className="px-1 font-light text-gray-800 text-[11px]">{layPrices[1]?.size || 0}</p>
                                                                </button>
                                                            </td>

                                                            <td className="bg-[#F6E6EA] text-gray-900 hidden lg:table-cell text-center w-[100px]">
                                                                <button className="py-[3px]" onClick={() => handleBookie("t1", item?.name, "red", layPrices[2]?.price, item?.mname, "Lay")}>
                                                                    <p className="px-1 font-[700] text-[12px]">{layPrices[2]?.price || 0}</p>
                                                                    <p className="px-1 font-light text-gray-800 text-[11px]">{layPrices[2]?.size || 0}</p>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                        {showBook.t1.name == item?.name &&
                                                            <tr className={` ${showBook.t1.color == 'red' ? 'lg:bg-[#FAA9BA] bg-[#F1D5DC]' : 'lg:bg-[#72BBEF] bg-[#BEDDF4]'} border-b border-gray-300`}>
                                                                <td colSpan={7} className=' pt-1 '>
                                                                    <div className="grid grid-cols-4 gap-2 lg:px-3 px-0.5 pb-0.5 border-b border-[#72BBEF] max-lg:grid-cols-2">
                                                                        {/* Cancel Button */}
                                                                        <button onClick={() => HandleCancel("t1")} className="flex max-lg:hidden bg-white  justify-center items-center h-full border rounded-md border-gray-600">
                                                                            <p className="px-7 py-1 text-center font-bold text-black">Cancel</p>
                                                                        </button>

                                                                        {/* rate control continer */}
                                                                        <div className="flex text-center border rounded-lg border-gray-500 w-full"> {/* Full width for the container */}
                                                                            <button onClick={() => RateDecrease('t1')} className="px-2 w-16 py-1 border-r bg-gray-100 rounded-l-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                                <FaMinus className="text-[#347fc5]" />
                                                                            </button>
                                                                            <div className="border-l border-r border-gray-700 flex-grow">
                                                                                <input
                                                                                    type="number"
                                                                                    value={showBook.t1.rate} // Display rate for t1
                                                                                    onChange={(e) => handleChange('t1', 'rate', Number(e.target.value))} // Update rate for t1
                                                                                    min={0}
                                                                                    className="text-center w-full h-full border-t border-b border-gray-300 text-black font-bold focus-within:outline-none"
                                                                                />
                                                                            </div>
                                                                            <button onClick={() => RateIncrease('t1')} className="px-2 w-16 py-1 bg-gray-100 rounded-r-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                                <FaPlus className="text-[#347fc5]" />
                                                                            </button>
                                                                        </div>

                                                                        {/* amount control */}
                                                                        <div className="flex text-center border rounded-lg border-gray-500 w-full"> {/* Full width for the container */}
                                                                            <button onClick={() => AmountDecrease('t1')} className="px-2 w-16 py-1 border-r bg-gray-100 rounded-l-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                                <FaMinus className="text-[#347fc5]" />
                                                                            </button>
                                                                            <div className="border-l border-r border-gray-700 flex-grow">
                                                                                <input
                                                                                    type="number"
                                                                                    value={showBook.t1.amount} // Display amount for t1
                                                                                    onChange={(e) => handleChange('t1', 'amount', Number(e.target.value))} // Update amount for t1
                                                                                    min={0}
                                                                                    max={10000}
                                                                                    className="text-center w-full h-full border-t border-b border-gray-300 text-black font-bold focus-within:outline-none"
                                                                                />
                                                                            </div>
                                                                            <button onClick={() => AmountIncrease('t1')} className="px-2 w-16 py-1 bg-gray-100 rounded-r-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                                <FaPlus className="text-[#347fc5]" />
                                                                            </button>
                                                                        </div>

                                                                        {/* Place Bet Button */}
                                                                        <button
                                                                            onClick={() => handlePlaceBet("t1", matchDetail?.marketName, item?.name, matchData?.runners?.length)}
                                                                            // disabled={runnersData?.status != "OPEN"}
                                                                            className={`flex max-lg:hidden justify-center items-center h-full border rounded-md border-gray-600 
                                                                            ${showBook.t1.amount
                                                                                    ? 'bg-gradient-to-t from-[#1e714f] to-[#16a34a]'
                                                                                    : 'bg-gradient-to-t from-[#626278] to-[#7380AD]'
                                                                                } `}>
                                                                            <p className="px-7 py-1 text-center font-extrabold text-white text-lg">Place Bet</p>
                                                                        </button>
                                                                    </div>


                                                                    <div className={`grid grid-cols-8 max-lg:grid-cols-4 gap-2 lg:px-2 px-0.5 py-0.5 border-t border-t-blue-300  ${showBook.t1.color == 'red' ? 'border-t-red-300' : 'border-t-blue-300'} text-xs lg:text-sm`}>
                                                                        <button onClick={() => handleBetAmountUpdate("t1", 100)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >100</button>
                                                                        <button onClick={() => handleBetAmountUpdate("t1", 200)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >200</button>
                                                                        <button onClick={() => handleBetAmountUpdate("t1", 500)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >500</button>
                                                                        <button onClick={() => handleBetAmountUpdate("t1", 5000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >5000</button>
                                                                        <button onClick={() => handleBetAmountUpdate("t1", 10000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >10000</button>
                                                                        <button onClick={() => handleBetAmountUpdate("t1", 25000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >25000</button>
                                                                        <button onClick={() => handleBetAmountUpdate("t1", 50000)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >50000</button>
                                                                        <button onClick={() => handleBetAmountUpdate("t1", 100000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >100000</button>

                                                                    </div>

                                                                    <div className="grid grid-cols-2 my-1 lg:hidden gap-2">
                                                                        <button onClick={() => HandleCancel("t1")} className='flex  justify-center items-center h-full border rounded-md border-gray-600 bg-white'>
                                                                            <p className='  px-7 py-1 text-center font-bold text-black'>Cancel</p>

                                                                        </button>
                                                                        <button
                                                                            onClick={() => handlePlaceBet("t1", matchDetail?.marketName, item?.name, matchData?.runners?.length)}
                                                                            // disabled={item?.mstatus !== "OPEN"}
                                                                            className={`flex  justify-center items-center h-full bg-[#577094] border rounded-md border-gray-600
                                                                                ${showBook.t1.amount
                                                                                    ? 'bg-gradient-to-t from-[#1e714f] to-[#16a34a]'
                                                                                    : 'bg-gradient-to-t from-[#626278] to-[#7380AD]'
                                                                                }`}>
                                                                            <p className='px-7 py-1 text-center font-extrabold text-white text-lg'>Place Bet</p>

                                                                        </button>
                                                                    </div>
                                                                </td>


                                                            </tr>
                                                        }
                                                        {/* {
                                                            runnersData?.status != "OPEN" && (time?.days == 0 && time?.hours == 0 && time?.minutes == 0 && time?.seconds == 0) ? "" :
                                                                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-10 text-red-500 font-bold">
                                                                    Suspended
                                                                </div>
                                                        } */}
                                                    </tbody>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                {/* <td colSpan="7" className="text-center text-gray-600">
                                            No data available.
                                        </td> */}
                                            </tr>
                                        )}
                                    </>
                                ) : null}
                            </>
                        )}


                    </table>
                </div>
            </div>
            {name === 'Cricket' ? (
                <>
                    {/* Tied Match */}

                    <div>
                        <div className='flex justify-between'>
                            <div className='flex'>
                                <p className='flex bg-gray-800 text-white font-bold rounded-tr-xl p-1 text-sm'>Tide Match<MdOutlineInfo className='mt-1 ms-1' /></p>
                                <p className=' lg:flex hidden font-semibold items-center ms-3 text-sm'><span className='p-0.5 bg-yellow-300 '><GoDotFill className=' top-1 ' /></span>Cash Out</p>
                            </div>
                            <div className='flex text-sm items-center px-2'>
                                <p>Matched</p>
                                <p>€ {(matchDetail?.totalMatched / 1000).toFixed(1) + "K"}</p>
                            </div>
                        </div>
                        {/* table */}
                        <div className="border border-b-0">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 relative">
                                <thead className="text-xs text-black bg-white border-b border-gray-500 ">
                                    <tr>
                                        <th colSpan={3} scope="col" className=" max-lg:hidden py-1 text-center ">

                                        </th>
                                        <th scope="col" className="px-2 lg:hidden py-1 ">
                                            <div className='bg-[#BED5D8] text-center'>
                                                <span className='text-[#6987B1]'>min/max</span>  {t8Data[0]?.min === 0 && t8Data[0]?.max === 0 ? "1-0" : `${t8Data[0]?.min} - ${t8Data[0]?.max}`}

                                            </div>
                                        </th>

                                        <th scope="col" className="bg-[#72BBEF] lg:rounded-tl-lg py-2 px-6 text-center">
                                            Back
                                        </th>
                                        <th scope="col" className="bg-[#FAA9BA] lg:rounded-tr-lg py-2 px-6 text-center text-nowrap">
                                            Lay
                                        </th>

                                        <th colSpan={2} scope="col" className="px-2 max-lg:hidden py-1 ">
                                            <div className='bg-[#D7E8F4] text-center '>
                                                min/max {t8Data[0]?.min === 0 && t8Data[0]?.max === 0 ? "1-0" : `${t8Data[0]?.min} - ${t8Data[0]?.max}`}


                                            </div>
                                        </th>

                                    </tr>
                                </thead>

                                {isRefreshing ? (
                                    <Loading />
                                ) : (


                                    <>
                                        {(t8Data || defaultData)?.map((item, index) =>
                                            <tbody key={index} className=''>

                                                <tr className="bg-white border-b border-gray-300">

                                                    <td className="px-2 py-0.5 text-nowrap">
                                                        <a className="flex gap-x-2 flex-wrap capitalize text-gray-900 font-semibold">
                                                            {item?.nat}
                                                        </a>

                                                        {!previousBet?.["Tied Match"] ? (
                                                            <>
                                                                {showBook.t8.amount > 0 && (
                                                                    <>
                                                                        {betType === "Back" ? (
                                                                            <p className={`${showBook.t8.name === item?.nat ? 'text-[#45A255]' : 'text-red-500'} font-[700]`}>
                                                                                {showBook.t8.name === item?.nat ? `(${Number(showBook.t8.rate).toFixed(2) * Number(showBook.t8.amount).toFixed(2)})` : `(${Number(showBook.t8.amount).toFixed(2)})`}
                                                                            </p>
                                                                        ) : (
                                                                            <p className={`${showBook.t8.name === item?.nat ? 'text-red-500' : 'text-[#45A255]'} font-[700]`}>
                                                                                {showBook.t8.name === item?.nat ? `(${Number(showBook.t8.rate).toFixed(2) * Number(showBook.t8.amount).toFixed(2)})` : `(${Number(showBook.t8.amount).toFixed(2)})`}
                                                                            </p>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <>
                                                                {previousBet?.["Tied Match"]?.previous_bet1 !== undefined &&
                                                                    // previousBet?.["Tied Match"]?.previous_bet1 !== null &&
                                                                    previousBet?.["Tied Match"]?.previous_bet2 !== undefined &&
                                                                    // previousBet?.["Tied Match"]?.previous_bet2 !== null
                                                                    (
                                                                        <div className="flex items-center justify-start">
                                                                            {previousBet?.["Tied Match"]?.type === "Back" ? (
                                                                                <div className="flex items-center">
                                                                                    <FaLongArrowAltRight
                                                                                        className={`mr-2 ${previousBet?.["Tied Match"]?.selection === item?.nat ? 'text-[#45A255]' : 'text-red-500'}`}
                                                                                    />
                                                                                    <p className={`font-[700] ${previousBet?.["Tied Match"]?.selection === item?.nat ? 'text-[#45A255]' : 'text-red-500'}`}>

                                                                                        {index === 0 ? Number(previousBet?.["Tied Match"]?.previous_bet1).toFixed(2) : Number(previousBet?.["Tied Match"]?.previous_bet2).toFixed(2)}

                                                                                    </p>
                                                                                </div>
                                                                            ) : (
                                                                                <div className="flex items-center">
                                                                                    <FaLongArrowAltRight
                                                                                        className={`mr-2 ${previousBet?.["Tied Match"]?.selection === item?.nat ? 'text-red-500' : 'text-[#45A255]'}`}
                                                                                    />
                                                                                    <p className={`font-[700] ${previousBet?.["Tied Match"]?.selection === item?.nat ? 'text-red-500' : 'text-[#45A255]'}`}>
                                                                                        {index === 0 ? Number(previousBet?.["Tied Match"]?.previous_bet1).toFixed(2) : Number(previousBet?.["Tied Match"]?.previous_bet2).toFixed(2)}

                                                                                    </p>
                                                                                </div>
                                                                            )}

                                                                            {showBook.t8.amount > 0 && (
                                                                                <>
                                                                                    {betType === "Back" ? (
                                                                                        <>
                                                                                            {showBook.t8.name === item?.nat ? (
                                                                                                <p className={`${showBook.t8.name === item?.nat ? 'text-[#45A255]' : 'text-red-500'} font-[700]`}>
                                                                                                    {`(${index === 0 ? Number(previousBet?.["Tied Match"]?.previous_bet1) : Number(previousBet?.["Tied Match"]?.previous_bet2)} + ${Number(showBook.t8.rate).toFixed(2) * Number(showBook.t8.amount).toFixed(2)})`}
                                                                                                </p>
                                                                                            ) : (
                                                                                                <p className={`${showBook.t8.name === item?.nat ? 'text-[#45A255]' : 'text-red-500'} font-[700]`}>
                                                                                                    {`(${index === 0 ? Number(previousBet?.["Tied Match"]?.previous_bet1) : Number(previousBet?.["Tied Match"]?.previous_bet2)} - ${Number(showBook?.t8?.amount)})`}
                                                                                                </p>
                                                                                            )}
                                                                                        </>
                                                                                    ) : (
                                                                                        <>
                                                                                            {showBook.t8.name === item?.nat ? (
                                                                                                <p className={`${showBook.t8.name === item?.nat ? 'text-red-500' : 'text-[#45A255]'} font-[700]`}>
                                                                                                    {`(${index === 0 ? Number(previousBet?.["Tied Match"]?.previous_bet1) : Number(previousBet?.["Tied Match"]?.previous_bet2)} - ${Number(showBook.t8.rate).toFixed(2) * Number(showBook.t8.amount).toFixed(2)})`}
                                                                                                </p>
                                                                                            ) : (
                                                                                                <p className={`${showBook.t8.name === item?.nat ? 'text-red-500' : 'text-[#45A255]'} font-[700]`}>
                                                                                                    {`(${index === 0 ? Number(previousBet?.["Tied Match"]?.previous_bet1) : Number(previousBet?.["Tied Match"]?.previous_bet2)} + ${Number(showBook?.t8?.amount)})`}
                                                                                                </p>
                                                                                            )}
                                                                                        </>
                                                                                    )}
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                            </>
                                                        )}
                                                    </td>
                                                    {/* back */}
                                                    <td
                                                        className={`${showBook.t8.boxname == item?.b3 ? 'bg-[#2A8EE1] text-white' : 'bg-[#D7E8F4] text-gray-900'} hidden lg:table-cell   font-semibold text-center w-[60px] lg:w-[100px] } ${(back && [3, 4, 7].includes(random)) ? "bg-[#efe8ae]" : "bg-[#D7E8F4]"} `}
                                                    >
                                                        <button
                                                            onClick={() => handleBookie("t8", item?.nat, "blue", item?.b3, item?.gtype, "Back", "", "b3", index)}
                                                            className='py-[3px]'>
                                                            <p className="px-1 leading-4  font-[700] text-[12px]">{item?.b3 || 0}</p>
                                                            <p className="px-1 leading-4  font-light text-gray-800 text-[11px]">{item?.bs3 || 0}</p>
                                                        </button>
                                                    </td>

                                                    <td

                                                        className={`${showBook.t8.boxname == item?.b2 ? 'bg-[#2A8EE1] text-white' : 'bg-[#B7D5EA] text-gray-900'} hidden lg:table-cell   font-semibold text-center  w-[60px] lg:w-[100px] ${(back && [2, 6, 4].includes(random)) ? "bg-[#efe8ae]" : "bg-[#B7D5EA]"}`}
                                                    >
                                                        <button
                                                            onClick={() => handleBookie("t8", item?.nat, "blue", item?.b2, item?.gtype, "Back", "", "b2", index)}
                                                            className='py-[3px]'>
                                                            <p className="px-1 leading-4   font-[700] text-[12px]">{item?.b2 || 0}</p>
                                                            <p className="px-1 leading-4  font-light text-gray-800 text-[11px]">{item?.bs2 || 0}</p>
                                                        </button>
                                                    </td>

                                                    <td

                                                        className={`${showBook.t8.boxname == item?.b1 ? 'bg-[#2A8EE1] text-white' : 'bg-[#72BBEF] text-gray-900'}   font-semibold text-center w-[60px] lg:w-[100px] ${(back && [9, 1, 7].includes(random)) ? "bg-[#efe8ae]" : "bg-[#72BBEF]"}`}
                                                    >
                                                        <button
                                                            onClick={() => handleBookie("t8", item?.nat, "blue", item?.b1, item?.gtype, "Back", "", "b1", index)}
                                                            className='py-[3px]'>
                                                            <p className="px-1 leading-4  font-[700] text-[12px]">{item?.b1 || 0}</p>
                                                            <p className="px-1 leading-4  font-light text-gray-800    text-[11px]">{item?.bs1 || 0}</p>
                                                        </button>
                                                    </td>


                                                    {/* lay */}
                                                    <td

                                                        className={`${showBook.t8.boxname == item?.l1 ? 'bg-[#F4496D] text-white' : 'bg-[#FAA9BA] text-gray-900'}    py-0.5 font-semibold text-center w-[60px] lg:w-[100px] ${(lay && [8, 4, 10].includes(random)) ? "bg-[#9ce0f3]" : "bg-[#FAA9BA]"}`}
                                                    >
                                                        <button
                                                            onClick={() => handleBookie("t8", item?.nat, "red", item?.l1, item?.gtype, "Lay", "", "l1", index)}
                                                            className='py-[3px]'>
                                                            <p className="px-1 leading-4 font-[700] text-[12px]">{item?.l1 || 0}</p>
                                                            <p className="px-1 leading-4 font-light text-gray-800   text-[11px]">{item?.ls1 || 0}</p>
                                                        </button>
                                                    </td>

                                                    <td

                                                        className={`${showBook.t8.boxname == item?.l2 ? 'bg-[#F4496D] text-white' : 'bg-[#EFD3D9] text-gray-900'}   hidden lg:table-cell  py-0.5 font-semibold text-center w-[60px] lg:w-[100px] ${(lay && [8, 5, 9].includes(random)) ? "bg-[#9ce0f3]" : "bg-[#EFD3D9]"}`}
                                                    >
                                                        <button
                                                            onClick={() => handleBookie("t8", item?.nat, "red", item?.l2, item?.gtype, "Lay", "", "l2", index)}
                                                            className='py-[3px]'>
                                                            <p className="px-1 leading-4  font-[700] text-[12px]">{item?.l2 || 0}</p>
                                                            <span className="px-1 leading-4  font-light text-gray-800  text-[11px]">{item?.ls2 || 0}</span>
                                                        </button>
                                                    </td>

                                                    <td

                                                        className={`${showBook.t8.boxname == item?.l3 ? 'bg-[#F4496D] text-white' : 'bg-[#F6E6EA] text-gray-900'}   hidden lg:table-cell py-0.5 font-semibold text-center w-[60px] lg:w-[100px] ${(lay && [2, 4, 7,].includes(random)) ? "bg-[#9ce0f3]" : "bg-[#F6E6EA]"}`}
                                                    >
                                                        <button
                                                            onClick={() => handleBookie("t8", item?.nat, "red", item?.l3, item?.gtype, "Lay", "", "l3", index)}
                                                            className='py-[3px]'
                                                        >
                                                            <p className="px-1 leading-4  text-[12px] font-[700]">{item?.l3 || 0}</p>
                                                            <p className="px-1 font-light text-gray-800 leading-4   text-[11px]">{item?.ls3 || 0}</p>
                                                        </button>
                                                    </td>


                                                </tr>

                                                {showBook.t8.name == item?.nat &&
                                                    <tr className={` ${showBook.t8.color == 'red' ? 'lg:bg-[#FAA9BA] bg-[#F1D5DC]' : 'lg:bg-[#72BBEF] bg-[#BEDDF4]'} border-b border-gray-300`}>
                                                        <td colSpan={7} className=' pt-1 '>
                                                            <div className="grid grid-cols-4 gap-2 lg:px-3 px-0.5 pb-0.5 border-b border-[#72BBEF] max-lg:grid-cols-2">
                                                                {/* Cancel Button */}
                                                                <button onClick={() => HandleCancel("t8")} className="flex max-lg:hidden bg-white  justify-center items-center h-full border rounded-md border-gray-600">
                                                                    <p className="px-7 py-1 text-center font-bold text-black">Cancel</p>
                                                                </button>

                                                                {/* rate control continer */}
                                                                <div className="flex text-center border rounded-lg border-gray-500 w-full"> {/* Full width for the container */}
                                                                    <button onClick={() => RateDecrease('t8')} className="px-2 w-16 py-1 border-r bg-gray-100 rounded-l-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                        <FaMinus className="text-[#347fc5]" />
                                                                    </button>
                                                                    <div className="border-l border-r border-gray-700 flex-grow">
                                                                        <input
                                                                            type="number"
                                                                            value={showBook.t8.rate} // Display rate for t1
                                                                            onChange={(e) => handleChange('t8', 'rate', Number(e.target.value))} // Update rate for t1
                                                                            min={0}
                                                                            className="text-center w-full h-full border-t border-b border-gray-300 text-black font-bold focus-within:outline-none"
                                                                        />
                                                                    </div>
                                                                    <button onClick={() => RateIncrease('t8')} className="px-2 w-16 py-1 bg-gray-100 rounded-r-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                        <FaPlus className="text-[#347fc5]" />
                                                                    </button>
                                                                </div>

                                                                {/* amount control */}
                                                                <div className="flex text-center border rounded-lg border-gray-500 w-full"> {/* Full width for the container */}
                                                                    <button onClick={() => AmountDecrease('t8')} className="px-2 w-16 py-1 border-r bg-gray-100 rounded-l-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                        <FaMinus className="text-[#347fc5]" />
                                                                    </button>
                                                                    <div className="border-l border-r border-gray-700 flex-grow">
                                                                        <input
                                                                            type="number"
                                                                            value={showBook.t8.amount} // Display amount for t1
                                                                            onChange={(e) => handleChange('t8', 'amount', Number(e.target.value))} // Update amount for t1
                                                                            min={0}
                                                                            max={10000}
                                                                            className="text-center w-full h-full border-t border-b border-gray-300 text-black font-bold focus-within:outline-none"
                                                                        />
                                                                    </div>
                                                                    <button onClick={() => AmountIncrease('t8')} className="px-2 w-16 py-1 bg-gray-100 rounded-r-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                        <FaPlus className="text-[#347fc5]" />
                                                                    </button>
                                                                </div>

                                                                {/* Place Bet Button */}
                                                                <button
                                                                    onClick={() => handlePlaceBet("t8", item?.gtype, item?.nat, t8Data.length)}
                                                                    // disabled={item?.mstatus !== "OPEN"}
                                                                    className={`flex max-lg:hidden justify-center items-center h-full border rounded-md border-gray-600 
                                                                    ${showBook.t8.amount
                                                                            ? 'bg-gradient-to-t from-[#1e714f] to-[#16a34a]'
                                                                            : 'bg-gradient-to-t from-[#626278] to-[#7380AD]'
                                                                        } `}>
                                                                    <p className="px-7 py-1 text-center font-extrabold text-white text-lg">Place Bet</p>
                                                                </button>
                                                            </div>


                                                            <div className={`grid grid-cols-8 max-lg:grid-cols-4 gap-2 lg:px-2 px-0.5 py-0.5 border-t border-t-blue-300  ${showBook.t1.color == 'red' ? 'border-t-red-300' : 'border-t-blue-300'} text-xs lg:text-sm`}>
                                                                <button onClick={() => handleBetAmountUpdate("t8", 100)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >100</button>
                                                                <button onClick={() => handleBetAmountUpdate("t8", 200)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >200</button>
                                                                <button onClick={() => handleBetAmountUpdate("t8", 500)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >500</button>
                                                                <button onClick={() => handleBetAmountUpdate("t8", 5000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >5000</button>
                                                                <button onClick={() => handleBetAmountUpdate("t8", 10000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >10000</button>
                                                                <button onClick={() => handleBetAmountUpdate("t8", 25000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >25000</button>
                                                                <button onClick={() => handleBetAmountUpdate("t8", 50000)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >50000</button>
                                                                <button onClick={() => handleBetAmountUpdate("t8", 100000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >100000</button>

                                                            </div>

                                                            <div className="grid grid-cols-2 my-1 lg:hidden gap-2">
                                                                <button onClick={() => HandleCancel("t8")} className='flex  justify-center items-center h-full border rounded-md border-gray-600 bg-white'>
                                                                    <p className='  px-7 py-1 text-center font-bold text-black'>Cancel</p>

                                                                </button>
                                                                <button
                                                                    onClick={() => handlePlaceBet("t8", item?.gtype, item?.nat, t8Data.length)}
                                                                    // disabled={item?.mstatus !== "OPEN"}
                                                                    className={`flex  justify-center items-center h-full bg-[#577094] border rounded-md border-gray-600
                                                                        ${showBook.t8.amount
                                                                            ? 'bg-gradient-to-t from-[#1e714f] to-[#16a34a]'
                                                                            : 'bg-gradient-to-t from-[#626278] to-[#7380AD]'
                                                                        }`}>
                                                                    <p className='   px-7 py-1 text-center font-extrabold text-white text-lg'>Place Bet</p>

                                                                </button>
                                                            </div>
                                                        </td>


                                                    </tr>
                                                }
                                                {/* {
                                                    item?.mstatus == "OPEN" && (time?.days == 0 && time?.hours == 0 && time?.minutes == 0 && time?.seconds == 0) ? "" :
                                                        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white bg-opacity-30 z-10 border border-red-500">
                                                            <span className="text-red-600 text-3xl font-bold tracking-wide">SUSPENDED</span>
                                                        </div>
                                                } */}

                                            </tbody>
                                        )}
                                    </>


                                )}

                            </table>
                        </div>
                    </div>


                    {/* bookmaker */}
                    {
                        t2Data?.length > 0 &&
                        <div className='my-2'>
                            <div className='flex justify-between'>
                                <div className='flex'>
                                    <p className='flex bg-gray-800 text-white font-bold rounded-tr-xl p-1 text-sm'>Bookmaker<MdOutlineInfo className='mt-1 ms-1' /></p>
                                    <p className=' lg:flex hidden font-semibold items-center ms-3 text-sm'><span className='p-0.5 bg-yellow-300 '><GoDotFill className=' top-1 ' /></span>Cash Out</p>
                                </div>
                                <div className='flex text-sm items-center px-2'>
                                    <p>Matched</p>
                                    <p>€ {(matchDetail?.totalMatched / 1000).toFixed(1) + "K"}</p>
                                </div>
                            </div>
                            {/* table */}
                            <div className="border border-b-0">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 relative">

                                    {/* table heading */}
                                    <thead className="text-xs text-black bg-white border-b border-gray-500 ">
                                        <tr>
                                            {/* hidden mobile device */}
                                            <th colSpan={3} scope="col" className=" hidden sm:table-cell py-1 text-center ">

                                            </th>
                                            {/* only small device  */}
                                            <th scope="col" className="px-2 table-cell lg:hidden py-1 ">
                                                <div className='bg-[#BED5D8] text-center'>
                                                    <span className='text-[#6987B1]'>min/max</span>  {t2Data?.[0]?.bm1?.[0]?.min === 0 && t2Data?.[0]?.bm1?.[0]?.max === 0
                                                        ? "1-0"
                                                        : `${t2Data?.[0]?.bm1?.[0]?.min} - ${t2Data?.[0]?.bm1?.[0]?.max}`}

                                                </div>
                                            </th>

                                            <th scope="col" className=" bg-[#72BBEF] lg:rounded-tl-lg  py-2 px-6 text-center">
                                                Back
                                            </th>
                                            <th scope="col" className=" bg-[#FAA9BA] lg:rounded-tr-lg py-2 px-6 text-center text-nowrap">
                                                Lay
                                            </th>
                                            {/* hidden in small device */}
                                            <th colSpan={2} scope="col" className="px-2 hidden sm:table-cell py-1 ">
                                                <div className='bg-[#D7E8F4] text-center '>
                                                    min/max  {t2Data?.[0]?.bm1?.[0]?.min === 0 && t2Data?.[0]?.bm1?.[0]?.max === 0
                                                        ? "1-0"
                                                        : `${t2Data?.[0]?.bm1?.[0]?.min} - ${t2Data?.[0]?.bm1?.[0]?.max}`}

                                                </div>
                                            </th>

                                        </tr>
                                    </thead>
                                    {t2Data?.[0]?.bm1?.map((item, index) =>
                                        <tbody key={index}>

                                            <tr className="bg-white border-b border-gray-300">

                                                <td className="px-2 py-0.5 text-nowrap ">
                                                    <a className="flex gap-x-2 flex-wrap capitalize text-gray-900 font-semibold ">
                                                        {item?.nat}
                                                    </a>
                                                    {!previousBet?.["Bookmaker"] ? (
                                                        <>
                                                            {showBook.t2.amount > 0 && (
                                                                <>

                                                                    {betType === "Back" ? (
                                                                        <p className={`${showBook.t2.name === item?.nat ? 'text-[#45A255]' : 'text-red-500'} font-[700]`}>
                                                                            {showBook.t2.name === item?.nat ? `(${(Number(showBook.t2.rate) * Number(showBook.t2.amount) / 100).toFixed(2)})`
                                                                                : `(${Number(showBook.t2.amount).toFixed(2)}) `}
                                                                        </p>
                                                                    ) : (
                                                                        <p className={`${showBook.t2.name === item?.nat ? 'text-red-500' : 'text-[#45A255]'} font-[700]`}>
                                                                            {showBook.t2.name === item?.nat ? `(${(Number(showBook.t2.rate) * Number(showBook.t2.amount) / 100).toFixed(2)})` : `(${Number(showBook.t2.amount).toFixed(2)}) `}
                                                                        </p>
                                                                    )}
                                                                </>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {previousBet?.["Bookmaker"]?.previous_bet1 !== undefined &&
                                                                // previousBet?.["Tied Match"]?.previous_bet1 !== null &&
                                                                previousBet?.["Bookmaker"]?.previous_bet2 !== undefined &&
                                                                // previousBet?.["Tied Match"]?.previous_bet2 !== null
                                                                (
                                                                    <div className="flex items-center justify-start">
                                                                        {previousBet?.["Bookmaker"]?.type === "Back" ? (
                                                                            <div className="flex items-center">
                                                                                <FaLongArrowAltRight
                                                                                    className={`mr-2 ${previousBet?.["Bookmaker"]?.selection === item?.nat ? 'text-[#45A255]' : 'text-red-500'}`}
                                                                                />
                                                                                <p className={`font-[700] ${previousBet?.["Bookmaker"]?.selection === item?.nat ? 'text-[#45A255]' : 'text-red-500'}`}>

                                                                                    {index === 0 ?
                                                                                        Number(previousBet?.["Bookmaker"]?.previous_bet1).toFixed(2)
                                                                                        :
                                                                                        Number(previousBet?.["Bookmaker"]?.previous_bet2).toFixed(2)}

                                                                                </p>
                                                                            </div>
                                                                        ) : (
                                                                            <div className="flex items-center">
                                                                                <FaLongArrowAltRight
                                                                                    className={`mr-2 ${previousBet?.["Bookmaker"]?.selection === item?.nat ? 'text-red-500' : 'text-[#45A255]'}`}
                                                                                />
                                                                                <p className={`font-[700] ${previousBet?.["Bookmaker"]?.selection === item?.nat ? 'text-red-500' : 'text-[#45A255]'}`}>
                                                                                    {index === 0 ?
                                                                                        Number(previousBet?.["Bookmaker"]?.previous_bet1).toFixed(2)
                                                                                        :
                                                                                        Number(previousBet?.["Bookmaker"]?.previous_bet2).toFixed(2)}

                                                                                </p>
                                                                            </div>
                                                                        )}

                                                                        {showBook.t2.amount > 0 && (
                                                                            <>
                                                                                {betType === "Back" ? (
                                                                                    <>
                                                                                        {showBook.t2.name === item?.nat ? (
                                                                                            <p className={`${showBook.t2.name === item?.nat ? 'text-[#45A255]' : 'text-red-500'} font-[700]`}>
                                                                                                {`(${index === 0 ? Number(previousBet?.["Bookmaker"]?.previous_bet1) : Number(previousBet?.["Bookmaker"]?.previous_bet2)} + ${Number(showBook.t2.rate)})`}
                                                                                            </p>
                                                                                        ) : (
                                                                                            <p className={`${showBook.t2.name === item?.nat ? 'text-[#45A255]' : 'text-red-500'} font-[700]`}>
                                                                                                {`(${index === 0 ? Number(previousBet?.["Bookmaker"]?.previous_bet1) : Number(previousBet?.["Bookmaker"]?.previous_bet2)} - ${Number(showBook?.t2?.amount)})`}
                                                                                            </p>
                                                                                        )}
                                                                                    </>
                                                                                ) : (
                                                                                    <>
                                                                                        {showBook.t2.name === item?.nat ? (
                                                                                            <p className={`${showBook.t2.name === item?.nat ? 'text-red-500' : 'text-[#45A255]'} font-[700]`}>

                                                                                                {`(${index === 0 ? Number(previousBet?.["Bookmaker"]?.previous_bet1) : Number(previousBet?.["Bookmaker"]?.previous_bet2)} - ${Number(showBook.t2.rate)})`}
                                                                                            </p>
                                                                                        ) : (
                                                                                            <p className={`${showBook.t2.name === item?.nat ? 'text-red-500' : 'text-[#45A255]'} font-[700]`}>
                                                                                                {`(${index === 0 ? Number(previousBet?.["Bookmaker"]?.previous_bet1) : Number(previousBet?.["Bookmaker"]?.previous_bet2)} + ${Number(showBook?.t2?.amount)})`}
                                                                                            </p>
                                                                                        )}
                                                                                    </>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                )}
                                                        </>
                                                    )}
                                                </td>

                                                <td
                                                    className={`${showBook.t2.boxname == item?.b3 ? 'bg-[#2A8EE1] text-white' : 'bg-[#D7E8F4] text-gray-900'} hidden lg:table-cell   font-semibold text-center w-[60px] lg:w-[100px]`}
                                                >
                                                    <button
                                                        onClick={() => handleBookie("t2", item?.nat, "blue", item?.b3, item?.mname, "Back", "", "b3", index)}
                                                        disabled={!item?.b3}

                                                    >
                                                        <div className='py-[3px]'>
                                                            <p className="px-1 leading-4  font-[700] text-[12px]">{item?.b3 || '-'}</p>
                                                            <p className="px-1 leading-4  font-light text-gray-800 text-[11px]">{item?.bs3 || ''}</p>
                                                        </div>

                                                    </button>
                                                </td>

                                                <td

                                                    className={`${showBook.t2.boxname == item?.b2 ? 'bg-[#2A8EE1] text-white' : 'bg-[#B7D5EA] text-gray-900'} hidden lg:table-cell  font-semibold text-center  w-[60px] lg:w-[100px]`}
                                                >
                                                    <button
                                                        onClick={() => handleBookie("t2", item?.nat, "blue", item?.b2, item?.mname, "Back", "", "b2", index)}
                                                        disabled={!item?.b2}
                                                    >
                                                        <div className='py-[3px]'>
                                                            <p className="px-1 leading-4   font-[700] text-[12px]">{item?.b2 || '-'}</p>
                                                            <p className="px-1 leading-4  font-light text-gray-800 text-[11px]">{item?.bs2 || ""}</p>
                                                        </div>

                                                    </button>
                                                </td>

                                                <td
                                                    onClick={() => handleBookie("t2", item?.nat, "blue", item?.b1, item?.mname, "Back", "", "b1", index)}
                                                    className={`${showBook.t2.boxname == item?.b1 ? 'bg-[#2A8EE1] text-white' : 'bg-[#72BBEF] text-gray-900'} relative font-semibold text-center w-[60px] lg:w-[100px]`}
                                                >
                                                    {item.s == "ACTIVE" ? (
                                                        <div className='py-[3px]'>
                                                            <p className="px-1 leading-4 font-[700] text-[12px]">{item?.b1 || '-'}</p>
                                                            <p className="px-1 leading-4 font-light text-gray-800 text-[11px]">{item?.bs1 || ''}</p>
                                                        </div>
                                                    ) : (
                                                        <div className="py-[3px] relative">
                                                            <p className="px-1 leading-4 font-[700] text-[12px]">{item?.b1 || '-'}</p>
                                                            <p className="px-1 leading-4 font-light text-gray-800 text-[11px]">{item?.bs1 || ''}</p>
                                                            {/* Suspended Overlay */}
                                                            <div className="absolute inset-0 flex items-center justify-center w-full h-full  bg-opacity-20  bg-[#b3ddf5)]">
                                                                <p className="text-red-300 text-[10px]  sm:text-xs md:text- py-4 px-4 font-bold">SUSPENDED</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </td>
                                                <td
                                                    className={`${showBook.t2.boxname == item?.l1 ? 'bg-[#F4496D] text-white' : 'bg-[#FAA9BA] text-gray-900'} relative py-0.5 font-semibold text-center w-[60px] lg:w-[100px]`}
                                                >
                                                    <button
                                                        onClick={() => handleBookie("t2", item?.nat, "red", item?.l1, item?.mname, "Lay", "", "l1", index)}
                                                        disabled={!item?.l1}
                                                    >
                                                        {item.s == "ACTIVE" ? (
                                                            <div className='py-[3px]'>
                                                                <p className="px-1 leading-4 font-[700] text-[12px]">{item?.l1 || '-'}</p>
                                                                <p className="px-1 leading-4 font-light text-gray-800 text-[11px]">{item?.ls1 || ''}</p>
                                                            </div>
                                                        ) : (
                                                            <div className="py-[3px] relative">
                                                                <p className="px-1 leading-4 font-[700] text-[12px]">{item?.l1 || '-'}</p>
                                                                <p className="px-1 leading-4 font-light text-gray-800 text-[11px]">{item?.ls1 || ''}</p>
                                                                {/* Suspended Overlay */}
                                                                <div className="absolute inset-0 flex items-center justify-center bg-red-500 bg-opacity-20">
                                                                    <p className="text-red-100 text-[10px] sm:text-xs md:text-sm font-bold">SUSPENDED</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </button>
                                                </td>

                                                <td
                                                    className={`${showBook.t2.boxname == item?.l2 ? 'bg-[#F4496D] text-white' : 'bg-[#EFD3D9] text-gray-900'} hidden lg:table-cell  py-0.5 font-semibold text-center w-[60px] lg:w-[100px]`}
                                                >
                                                    <button
                                                        onClick={() => handleBookie("t2", item?.nat, "red", item?.l2, item?.mname, "Lay", "", "l2", index)}
                                                        disabled={!item?.l2}>
                                                        <div className='py-[3px]'>
                                                            <p className="px-1 leading-4   font-[700] text-[12px]">{item?.l2 || '-'}</p>
                                                            <p className="px-1 leading-4  font-light text-gray-800  text-[11px]">{item?.ls2 || ''}</p>
                                                        </div>

                                                    </button>
                                                </td>

                                                <td

                                                    className={`${showBook.t2.boxname == item?.l3 ? 'bg-[#F4496D] text-white' : 'bg-[#F6E6EA] text-gray-900'}   hidden lg:table-cell py-0.5 font-semibold text-center w-[60px] lg:w-[100px]`}
                                                >
                                                    <button
                                                        onClick={() => handleBookie("t2", item?.nat, "red", item?.l3, item?.mname, "Lay", "", "l3", index)}
                                                        disabled={!item?.l3}
                                                    >
                                                        <div className='py-[3px]'>
                                                            <p className="px-1 leading-4   font-[700] text-[12px]">{item?.l3 || '-'}</p>
                                                            <p className="px-1 font-light text-gray-800 leading-4   text-[11px]">{item?.ls3 || ""}</p>
                                                        </div>

                                                    </button>
                                                </td>

                                            </tr>


                                            {showBook.t2.name == item?.nat &&
                                                <tr className={` ${showBook.t2.color == 'red' ? 'lg:bg-[#FAA9BA] bg-[#F1D5DC]' : 'lg:bg-[#72BBEF] bg-[#BEDDF4]'} border-b border-gray-300`}>
                                                    <td colSpan={7} className=' pt-1 '>
                                                        <div className="grid grid-cols-4 gap-2 lg:px-3 px-0.5 pb-0.5 border-b border-[#72BBEF] max-lg:grid-cols-2">
                                                            {/* Cancel Button */}
                                                            <button onClick={() => HandleCancel("t2")} className="flex max-lg:hidden bg-white  justify-center items-center h-full border rounded-md border-gray-600">
                                                                <p className="px-7 py-1 text-center font-bold text-black">Cancel</p>
                                                            </button>

                                                            {/* rate control continer */}
                                                            <div className="flex text-center border rounded-lg border-gray-500 w-full"> {/* Full width for the container */}
                                                                <button onClick={() => RateDecrease('t2')} className="px-2 w-16 py-1 border-r bg-gray-100 rounded-l-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                    <FaMinus className="text-[#347fc5]" />
                                                                </button>
                                                                <div className="border-l border-r border-gray-700 flex-grow">
                                                                    <input
                                                                        type="number"
                                                                        value={showBook.t2.rate} // Display rate for t2
                                                                        onChange={(e) => handleChange('t2', 'rate', Number(e.target.value))} // Update rate for t2
                                                                        min={0}
                                                                        className="text-center w-full h-full border-t border-b border-gray-300 text-black font-bold focus-within:outline-none"
                                                                    />
                                                                </div>
                                                                <button onClick={() => RateIncrease('t2')} className="px-2 w-16 py-1 bg-gray-100 rounded-r-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                    <FaPlus className="text-[#347fc5]" />
                                                                </button>
                                                            </div>

                                                            {/* amount control */}
                                                            <div className="flex text-center border rounded-lg border-gray-500 w-full"> {/* Full width for the container */}
                                                                <button onClick={() => AmountDecrease('t2')} className="px-2 w-16 py-1 border-r bg-gray-100 rounded-l-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                    <FaMinus className="text-[#347fc5]" />
                                                                </button>
                                                                <div className="border-l border-r border-gray-700 flex-grow">
                                                                    <input
                                                                        type="number"
                                                                        value={showBook.t2.amount} // Display amount for t2
                                                                        onChange={(e) => handleChange('t2', 'amount', Number(e.target.value))} // Update amount for t2
                                                                        min={0}
                                                                        max={10000}
                                                                        className="text-center w-full h-full border-t border-b border-gray-300 text-black font-bold focus-within:outline-none"
                                                                    />
                                                                </div>
                                                                <button onClick={() => AmountIncrease('t2')} className="px-2 w-16 py-1 bg-gray-100 rounded-r-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                    <FaPlus className="text-[#347fc5]" />
                                                                </button>
                                                            </div>

                                                            {/* Place Bet Button */}
                                                            <button
                                                                onClick={() => handlePlaceBet("t2", item?.mname, item?.nat, t2Data[0]?.bm1?.length)}
                                                                disabled={item?.s == "SUSPENDED"}
                                                                className={`flex max-lg:hidden justify-center items-center h-full border rounded-md border-gray-600 
                                                                ${showBook.t2.amount
                                                                        ? 'bg-gradient-to-t from-[#1e714f] to-[#16a34a]'
                                                                        : 'bg-gradient-to-t from-[#626278] to-[#7380AD]'
                                                                    } `}>
                                                                <p className="px-7 py-1 text-center font-extrabold text-white text-lg">Place Bet</p>
                                                            </button>
                                                        </div>


                                                        <div className={`grid grid-cols-8 max-lg:grid-cols-4 gap-2 lg:px-2 px-0.5 py-0.5 border-t border-t-blue-300  ${showBook.t2.color == 'red' ? 'border-t-red-300' : 'border-t-blue-300'} text-xs lg:text-sm`}>
                                                            <button onClick={() => handleBetAmountUpdate("t2", 100)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >100</button>
                                                            <button onClick={() => handleBetAmountUpdate("t2", 200)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >200</button>
                                                            <button onClick={() => handleBetAmountUpdate("t2", 500)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >500</button>
                                                            <button onClick={() => handleBetAmountUpdate("t2", 5000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >5000</button>
                                                            <button onClick={() => handleBetAmountUpdate("t2", 10000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >10000</button>
                                                            <button onClick={() => handleBetAmountUpdate("t2", 25000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >25000</button>
                                                            <button onClick={() => handleBetAmountUpdate("t2", 50000)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >50000</button>
                                                            <button onClick={() => handleBetAmountUpdate("t2", 100000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >100000</button>

                                                        </div>

                                                        <div className="grid grid-cols-2 my-1 lg:hidden gap-2">
                                                            <button onClick={() => HandleCancel("t2")} className='flex  justify-center items-center h-full border rounded-md border-gray-600 bg-white'>
                                                                <p className='  px-7 py-1 text-center font-bold text-black'>Cancel</p>

                                                            </button>
                                                            <button
                                                                onClick={() => handlePlaceBet("t2", item?.mname, item?.nat, t2Data[0]?.bm1?.length)}
                                                                className={`flex  justify-center items-center h-full bg-[#577094] border rounded-md border-gray-600
                                                                    ${showBook.t2.amount
                                                                        ? 'bg-gradient-to-t from-[#1e714f] to-[#16a34a]'
                                                                        : 'bg-gradient-to-t from-[#626278] to-[#7380AD]'
                                                                    }`}
                                                                disabled={item?.s == "SUSPENDED"}

                                                            >
                                                                <p className='   px-7 py-1 text-center font-extrabold text-white text-lg'>Place Bet</p>

                                                            </button>
                                                        </div>
                                                    </td>


                                                </tr>

                                            }
                                            {
                                                item?.s !== "SUSPENDED" ? "" :
                                                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-80 border-2 border-red-500">
                                                        <p className="text-red-500 text-3xl font-bold">SUSPENDED</p>
                                                    </div>
                                            }
                                        </tbody>
                                    )}

                                </table>


                            </div>
                        </div>
                    }

                    {/* Fancy1 */}
                    {/* {
                        t4Data?.length > 0 &&
                        <div className='my-4'>
                            <div className='flex justify-between'>
                                <div className='flex'>
                                    <p className='flex bg-gray-800 text-white font-bold rounded-tr-xl p-1 text-sm'>Fancy1<MdOutlineInfo className='mt-1 ms-1' /></p>
                                    <p className=' lg:flex hidden font-semibold items-center ms-3 text-sm'><span className='p-0.5 bg-yellow-300 '><GoDotFill className=' top-1 ' /></span>Cash Out</p>
                                </div>
                                <div className='flex text-sm items-center px-2'>
                                    <p>Matched</p>
                                    <p>€ 224.6K</p>
                                </div>
                            </div>
                          
                            <div className="border border-b-0">
                                <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 relative">
                                    <thead className="text-xs text-black bg-white border-b border-gray-500 ">
                                        <tr>
                                            <th scope="col" className="lg:table-column hidden  py-1 text-center ">

                                            </th>
                                            <th scope="col" className="px-2 lg:hidden  py-1 ">
                                                <div className='bg-[#BED5D8] text-center'>
                                                    <span className='text-[#6987B1]'>min/max</span>  1-0
                                                </div>
                                            </th>

                                            <th scope="col" className=" bg-[#72BBEF] lg:rounded-tl-lg  py-2 px-6 text-center">
                                                Back
                                            </th>
                                            <th scope="col" className=" bg-[#FAA9BA] lg:rounded-tr-lg py-2 px-6 text-center text-nowrap">
                                                Lay
                                            </th>
                                            <th
                                                scope="col"
                                                className="hidden sm:table-cell py-2 px-4 text-center lg:px-6 lg:rounded-tr-lg"
                                            >
                                                Min/Max
                                            </th>



                                        </tr>
                                    </thead>
                                    {t4Data?.map((item, index) =>
                                        <tbody key={index}>

                                            <tr className="bg-white border-b border-gray-300 relative">

                                                <td className="px-2 py-0.5 lg:text-nowrap ">
                                                    <a className="flex gap-x-2 flex-wrap capitalize text-gray-900 font-semibold ">
                                                        {item?.nat}
                                                    </a>
                                                    {lastBetValueFANCY?.fancy1?.length < 0 ? (
                                                        <>

                                                            {showBook.t2.amount > 0 && (
                                                                        <p className={`${showBook.t3.name === item?.nat ? 'text-[#45A255]' : 'text-red-500'} text-center font-[700]`}>
                                                                            {showBook.t3.name === item?.nat ? `(${showBook.t3.betAmount})` : null}
                                                                        </p>
                                                                    )}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="flex items-center justify-start">
                                                                {lastBetValueFANCY?.fancy1?.map((fancyitem, fancyindex) => (
                                                                    <div key={fancyindex} className="flex items-center">
                                                                        {Number(fancyitem.index_order) === index && (
                                                                            <FaLongArrowAltRight className="mr-2 text-red-500" />
                                                                        )}

                                                                        <p className={`font-[700] ${Number(fancyitem.index_order) === index ? 'text-red-500' : 'text-red-500'}`}>
                                                                            {Number(fancyitem.index_order) === index ? Number(fancyitem.previous_bet1).toFixed(2) : null}
                                                                        </p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </>

                                                    )}

                                                </td>

                                                <td
                                                    className={`${showBook.t4.boxname == item?.b1 ? 'bg-[#2A8EE1] text-white' : 'bg-[#72BBEF] text-gray-900'}   font-semibold text-center w-[60px] lg:w-[100px] relative`}
                                                >
                                                    <button
                                                        onClick={() => handleBookie("t4", item?.nat, "blue", item?.b1, item?.gtype, "Back", "", "b1", index)}
                                                        disabled={!item?.b1}
                                                        className='py-[3px]'
                                                    >
                                                        <p className="px-1 leading-4  font-[700] text-[12px]">{item?.b1}</p>
                                                        <p className="px-1 leading-4  font-light text-gray-800    text-[11px]">{item?.bs1}</p>
                                                    </button>

                                                    {item?.gstatus && (
                                                        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white sm:text-sm text-[11px] bg-opacity-70 text-red-500 font-bold">
                                                            {item?.gstatus}
                                                        </div>
                                                    )}
                                                </td>

                                                <td
                                                    className={`${showBook.t4.boxname == item?.l1 ? 'bg-[#F4496D] text-white' : 'bg-[#FAA9BA] text-gray-900'}  py-0.5 font-semibold text-center w-[60px] lg:w-[100px] relative`}
                                                >
                                                    <button
                                                        onClick={() => handleBookie("t4", item?.nat, "red", item?.l1, item?.gtype, "Lay", "", "l1", index)}
                                                        disabled={!item?.l1}
                                                    >
                                                        <div className='py-[3px]'>
                                                            <p className="px-1 leading-4 font-[700] text-[12px]">{item?.l1}</p>
                                                            <p className="px-1 leading-4 font-light text-gray-800   text-[11px]">{item?.ls1}</p>
                                                        </div>

                                                    </button>
                                                    {item?.gstatus && (
                                                        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white bg-opacity-70 sm:text-sm text-[11px] font-bold text-red-500">
                                                            {item?.gstatus}
                                                        </div>
                                                    )}
                                                </td>

                                                <td
                                                    className={`${showBook.t4.boxname == item?.l2 ? 'bg-[#F4496D] text-white' : 'bg-[] text-gray-900'} hidden lg:table-cell  py-0.5 font-semibold text-center w-[60px] lg:w-[100px]`}
                                                >
                                                    <div className='py-[3px]'>
                                                        <p className="px-1 leading-4 font-[700] text-[12px]">{item?.min}-{item?.max}</p>
                                                    </div>
                                                </td>
                                            </tr>


                                            {showBook.t4.name == item?.nat &&
                                                <tr className={` ${showBook.t4.color == 'red' ? 'lg:bg-[#FAA9BA] bg-[#F1D5DC]' : 'lg:bg-[#72BBEF] bg-[#BEDDF4]'} border-b border-gray-300`}>
                                                    <td colSpan={4} className=' pt-1 '>
                                                        <div className="grid grid-cols-4 gap-2 lg:px-3 px-0.5 pb-0.5 border-b border-[#72BBEF] max-lg:grid-cols-2">
                                                        
                                                            <div onClick={() => HandleCancel("t4")} className="flex max-lg:hidden bg-white  justify-center items-center h-full border rounded-md border-gray-600">
                                                                <p className="px-7 py-1 text-center font-bold text-black">Cancel</p>
                                                            </div>

                                                       
                                                            <div className="flex text-center border rounded-lg border-gray-500 w-full"> 
                                                                <p onClick={() => RateDecrease('t4')} className="px-2 w-16 py-1 border-r bg-gray-100 rounded-l-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                    <FaMinus className="text-[#347fc5]" />
                                                                </p>
                                                                <div className="border-l border-r border-gray-700 flex-grow">
                                                                    <input
                                                                        type="number"
                                                                        value={showBook.t4.rate} 
                                                                        onChange={(e) => handleChange('t4', 'rate', Number(e.target.value))} 
                                                                        min={0}
                                                                        className="text-center w-full h-full border-t border-b border-gray-300 text-black font-bold focus-within:outline-none"
                                                                    />
                                                                </div>
                                                                <p onClick={() => RateIncrease('t4')} className="px-2 w-16 py-1 bg-gray-100 rounded-r-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                    <FaPlus className="text-[#347fc5]" />
                                                                </p>
                                                            </div>

                                                            
                                                            <div className="flex text-center border rounded-lg border-gray-500 w-full">
                                                                <button onClick={() => AmountDecrease('t4')} className="px-2 w-16 py-1 border-r bg-gray-100 rounded-l-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                    <FaMinus className="text-[#347fc5]" />
                                                                </button>
                                                                <div className="border-l border-r border-gray-700 flex-grow">
                                                                    <input
                                                                        type="number"
                                                                        value={showBook.t4.amount} 
                                                                        onChange={(e) => handleChange('t4', 'amount', Number(e.target.value))} 
                                                                        min={0}
                                                                        max={10000}
                                                                        className="text-center w-full h-full border-t border-b border-gray-300 text-black font-bold focus-within:outline-none"
                                                                    />
                                                                </div>
                                                                <button onClick={() => AmountIncrease('t4')} className="px-2 w-16 py-1 bg-gray-100 rounded-r-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                    <FaPlus className="text-[#347fc5]" />
                                                                </button>
                                                            </div>
                                                          
                                                            <button
                                                                onClick={() => handlePlaceBet("t4", item?.gtype, item?.nat,)}
                                                                disabled={item?.gstatus}
                                                                className={`flex max-lg:hidden justify-center items-center h-full border rounded-md border-gray-600 
                                                                ${showBook.t4.amount
                                                                    ? 'bg-gradient-to-t from-[#1e714f] to-[#16a34a]'
                                                                    : 'bg-gradient-to-t from-[#626278] to-[#7380AD]'
                                                                }`}>
                                                                <p className="px-7 py-1 text-center font-extrabold text-white text-lg">Place Bet</p>
                                                            </button>
                                                        </div>

                                                        <div className={`grid grid-cols-8 max-lg:grid-cols-4 gap-2 lg:px-2 px-0.5 py-0.5 border-t border-t-blue-300  ${showBook.t4.color == 'red' ? 'border-t-red-300' : 'border-t-blue-300'} text-xs lg:text-sm`}>
                                                            <button onClick={() => handleBetAmountUpdate("t4", 100)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >100</button>
                                                            <button onClick={() => handleBetAmountUpdate("t4", 200)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >200</button>
                                                            <button onClick={() => handleBetAmountUpdate("t4", 500)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >500</button>
                                                            <button onClick={() => handleBetAmountUpdate("t4", 5000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >5000</button>
                                                            <button onClick={() => handleBetAmountUpdate("t4", 10000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >10000</button>
                                                            <button onClick={() => handleBetAmountUpdate("t4", 25000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >25000</button>
                                                            <button onClick={() => handleBetAmountUpdate("t4", 50000)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >50000</button>
                                                            <button onClick={() => handleBetAmountUpdate("t4", 100000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >100000</button>

                                                        </div>

                                                        <div className="grid grid-cols-2 my-1 lg:hidden gap-2">
                                                            <button onClick={() => HandleCancel("t4")} className='flex  justify-center items-center h-full border rounded-md border-gray-600 bg-white'>
                                                                <p className='  px-7 py-1 text-center font-bold text-black'>Cancel</p>

                                                            </button>


                                                            <button
                                                                onClick={() => handlePlaceBet("t4", item?.gtype, item?.nat,)}
                                                                disabled={item?.gstatus}
                                                                className={`flex  justify-center items-center h-full bg-[#577094] border rounded-md border-gray-600
                                                                    ${showBook.t4.amount
                                                                        ? 'bg-gradient-to-t from-[#1e714f] to-[#16a34a]'
                                                                        : 'bg-gradient-to-t from-[#626278] to-[#7380AD]'
                                                                    }`}>
                                                                <p className='   px-7 py-1 text-center font-extrabold text-white text-lg'>Place Bet</p>
                                                            </button>
                                                        </div>
                                                    </td>


                                                </tr>

                                            }

                                        </tbody>
                                    )}

                                </table>


                            </div>
                        </div>
                    } */}

                    <div className='my-4'>
                        <div className='flex'>
                            <div className='flex bg-gradient-to-t from-[#1C6A78] to-[#2990A2]  rounded-tr-full'>
                                <button onClick={() => handlefancy('FancyBet')} className='  text-white py-1 px-3 text-sm'>Fancy Bet </button>
                                <button className='bg-gradient-to-t from-[#34B0B6] to-[#34B0B6] py-1 px-3 rounded-tr-full'><MdOutlineInfo className='text-white' /></button>

                            </div>
                            <div className='flex bg-gradient-to-t from-[#D34401] to-[#F16D1B]  rounded-tr-full '>
                                <button onClick={() => handlefancy('SportBook')} className='  text-white py-1 px-3 text-sm'>SportsBook </button>
                                <button className='bg-gradient-to-t from-[#F58B30] to-[#F48B30] py-1 px-3 rounded-tr-full'><MdOutlineInfo className='text-white' /></button>
                            </div>

                        </div>

                        {
                            Fancy.FancyBet ?
                                <div className="flex justify-center bg-gradient-to-t from-[#1D6C7A] to-[#2A92A5] p-1">
                                    <ul className='flex overflow-x-auto items-center gap-2 text-[11px] lg:text-xs p-1  bg-gradient-to-t from-[#86B8C0] to-[#88C7D1] rounded-lg  text-nowrap'>
                                        <li>
                                            <button onClick={() => handleOptionFancy("All")} className={`font-semibold py-1 px-3 ${optionFancyBet['All'] && 'bg-white rounded-md'} `}>All</button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleOptionFancy("Fancy")} className={`font-semibold py-1 px-3 ${optionFancyBet['Fancy'] && 'bg-white rounded-md'} `}>Fancy</button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleOptionFancy("Line Markets")} className={`font-semibold py-1 px-3 ${optionFancyBet['Line Markets'] && 'bg-white rounded-md'} `}>Line Markets</button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleOptionFancy("Ball by Ball")} className={`font-semibold py-1 px-3 ${optionFancyBet['Ball by Ball'] && 'bg-white rounded-md'} `}>Ball by Ball</button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleOptionFancy("Meter Markets")} className={`font-semibold py-1 px-3 ${optionFancyBet['Meter Markets'] && 'bg-white rounded-md'} `}>Meter Markets</button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleOptionFancy("Khado Markets")} className={`font-semibold py-1 px-3 ${optionFancyBet['Khado Markets'] && 'bg-white rounded-md'} `}>Khado Markets</button>
                                        </li>
                                    </ul>
                                </div>
                                :
                                <div className="flex justify-center bg-gradient-to-t from-[#D44502] to-[#F26D1D] p-1">
                                    <ul className='flex overflow-x-auto items-center gap-2 text-[11px] lg:text-xs p-1  bg-gradient-to-t from-[#EBA689] to-[#EBA689] rounded-lg '>
                                        <li>
                                            <button
                                                onClick={() => handleSportsBet("All")}
                                                className={`font-semibold py-1 px-3 ${optionSportsBet['All'] && 'bg-white rounded-md'} `}
                                            >
                                                All
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => handleSportsBet("Match")}
                                                className={`font-semibold py-1 px-3 ${optionSportsBet['Match'] && 'bg-white rounded-md'} `}
                                            >
                                                Match
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => handleSportsBet("Odd/Evens")}
                                                className={`font-semibold py-1 px-3 ${optionSportsBet['Odd/Evens'] && 'bg-white rounded-md'} `}
                                            >
                                                Odd/Evens
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => handleSportsBet("Batsmen")}
                                                className={`font-semibold py-1 px-3 ${optionSportsBet['Batsmen'] && 'bg-white rounded-md'} `}
                                            >
                                                Batsmen
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => handleSportsBet("Bowler")}
                                                className={`font-semibold py-1 px-3 ${optionSportsBet['Bowler'] && 'bg-white rounded-md'} `}
                                            >
                                                Bowler
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => handleSportsBet("Extra")}
                                                className={`font-semibold py-1 px-3 ${optionSportsBet['Extra'] && 'bg-white rounded-md'} `}
                                            >
                                                Extra
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                        }

                        {/* Fancy data table  two option All and fancy*/}
                        {
                            t3Data?.length > 0 && (optionFancyBet['All'] || optionFancyBet['Fancy']) &&
                            <div className='my-4'>
                                {/* <div className='flex justify-between'>
                            <div className='flex'>
                                <p className='flex bg-gray-800 text-white font-bold rounded-tr-xl p-1 text-sm'>Fancy<MdOutlineInfo className='mt-1 ms-1' /></p>
                                <p className=' lg:flex hidden font-semibold items-center ms-3 text-sm'><span className='p-0.5 bg-yellow-300 '><GoDotFill className=' top-1 ' /></span>Cash Out</p>
                            </div>
                            <div className='flex text-sm items-center px-2'>
                                <p>Matched</p>
                                <p>€ 224.6K</p>
                            </div>
                        </div> */}
                                {/* table */}
                                <div className="border border-b-0">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 relative">
                                        <thead className="text-xs text-black bg-white border-b border-gray-500 ">
                                            <tr>
                                                <th scope="col" className="lg:table-column hidden  py-1 text-center ">

                                                </th>
                                                <th scope="col" className="px-2 lg:hidden  py-1 ">
                                                    <div className='bg-[#BED5D8] text-center'>
                                                        <span className='text-[#6987B1]'>min/max</span>  {t3Data[0]?.min}-{t3Data[0]?.max}
                                                    </div>
                                                </th>
                                                <th scope="col" className=" bg-[#FAA9BA] lg:rounded-tr-lg py-2 px-6 text-center text-nowrap">
                                                    NO
                                                </th>
                                                <th scope="col" className=" bg-[#72BBEF] lg:rounded-tl-lg  py-2 px-6 text-center">
                                                    YES
                                                </th>

                                                <th scope="col" className="lg:table-cell hidden px-2  py-1 ">
                                                    <div className='bg-[#BED5D8] text-center'>
                                                        <span className='text-[#6987B1]'>min/max</span>
                                                    </div>
                                                </th>

                                            </tr>
                                        </thead>
                                        {t3Data?.map((item, index) =>
                                            <tbody key={index}>
                                                <tr className="bg-white border-b border-gray-300 relative">
                                                    <td className="px-2 py-0.5 lg:text-nowrap">
                                                        <div className="flex justify-between items-center">
                                                            <div>
                                                                <a
                                                                    className="capitalize text-gray-900 font-semibold"
                                                                    onClick={() => fancyBet(index)}
                                                                >
                                                                    {item.nat.replace(/\([^)]*\)/, ' ').trim()}
                                                                </a>

                                                                {lastBetValueFANCY?.fancyBetListData?.length > 0 && (

                                                                    <div className="mt-0.1">
                                                                        {lastBetValueFANCY?.fancyBetListData?.map((fancyitem, fancyindex) => {
                                                                            const betList = typeof fancyitem?.bet_list === "string" ? JSON.parse(fancyitem.bet_list) : fancyitem.bet_list;

                                                                            return (
                                                                                <div key={fancyindex} className="flex items-center">
                                                                                    {Number(fancyitem.index_order) === index && (
                                                                                        <FaLongArrowAltRight className="mr-2 text-red-500" />
                                                                                    )}
                                                                                    <p className={`font-[700] ${Number(fancyitem.index_order) === index ? 'text-red-500' : 'text-red-500'}`}>
                                                                                        {Number(fancyitem.index_order) === index
                                                                                            ? Math.min(...betList.map(bet => bet.amount).filter(amount => amount < 0)).toFixed(2)
                                                                                            : null}
                                                                                    </p>
                                                                                </div>
                                                                            );
                                                                        })}

                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="relative group flex items-center">
                                                                <div className="absolute right-full mr-2 px-2 py-0.5 text-[10px] font-medium text-black bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity border border-gray-300 whitespace-nowrap">
                                                                    min/max {item?.min}-{item?.max}
                                                                </div>
                                                                <button className="p-1">
                                                                    <MdOutlineInfo className="text-black w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td
                                                        className={`${showBook.t3.boxname == item?.l1 ? 'bg-[#F4496D] text-white' : 'bg-[#FAA9BA] text-gray-900'}  py-0.5 font-semibold text-center w-[60px] lg:w-[100px] relative`}
                                                    >
                                                        <button
                                                            onClick={() => handleBookie("t3", item?.nat, "red", `${item?.l1}/${item?.ls1}`, item?.mname, "No", item?.ls1, "", index)}
                                                            disabled={!item?.l1}
                                                        >
                                                            <div className='py-[3px]'>
                                                                <p className="px-1 leading-4 font-[700] text-[12px]">{item?.l1}</p>
                                                                <p className="px-1 leading-4 font-light text-gray-800   sm:text-sm text-[11px]">{item?.ls1}</p>
                                                            </div>

                                                        </button>
                                                        {item?.gstatus && (
                                                            <div style={{ "z-index": "11" }} className="absolute w-[200%] md:[w-200%] top-[-1px] left-[-1px] md:top-[0px] md:left-[0px] right-0 bottom-0 flex items-center justify-center bg-[white] bg-opacity-70 sm:text-sm text-[11px]  font-bold text-red-500  sm:text-balance ">
                                                                <span className="break-words">
                                                                    {item?.gstatus}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </td>

                                                    <td
                                                        className={`${showBook.t3.boxname == item?.b1 ? 'bg-[#2A8EE1] text-white' : 'bg-[#72BBEF] text-gray-900'}   font-semibold text-center w-[60px] lg:w-[100px] relative`}
                                                    >
                                                        <button
                                                            onClick={() => handleBookie("t3", item?.nat, "blue", `${item?.b1}/${item?.bs1}`, item?.mname, "Yes", item?.bs1, "", index)}
                                                            disabled={!item?.b1}
                                                            className='py-[3px]'
                                                        >
                                                            <p className="px-1 leading-4  font-[700] text-[12px]">{item?.b1}</p>
                                                            <p className="px-1 leading-4  font-light text-gray-800   sm:text-sm text-[11px]">{item?.bs1}</p>
                                                        </button>
                                                        {/* 
                                                        {item?.gstatus && (
                                                            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white bg-opacity-70  text-red-500 font-bold break-words sm:text-sm text-[11px]">
                                                                {item?.gstatus}
                                                            </div>
                                                        )} */}
                                                    </td>






                                                    <td
                                                        className={` bg-[#f9f7f7] text-gray-900 hidden lg:table-cell  py-0.5 font-semibold text-center w-[60px] lg:w-[100px]`}
                                                    >

                                                        <div className='py-[3px]'>
                                                            <p className="px-1 leading-4   font-[700] text-[12px]">{item?.min} - {item?.max}</p>

                                                        </div>
                                                    </td>


                                                </tr>


                                                {showBook.t3.name == item?.nat &&
                                                    <tr className={` ${showBook.t3.color == 'red' ? 'lg:bg-[#FAA9BA] bg-[#F1D5DC]' : 'lg:bg-[#72BBEF] bg-[#BEDDF4]'} border-b border-gray-300`}>
                                                        <td colSpan={4} className=' pt-1 '>
                                                            <div className="grid grid-cols-4 gap-2 lg:px-3 px-0.5 pb-0.5 border-b border-[#72BBEF] max-lg:grid-cols-2">
                                                                {/* Cancel Button */}
                                                                <button onClick={() => HandleCancel("t3")} className="flex max-lg:hidden bg-white  justify-center items-center h-full border rounded-md border-gray-600">
                                                                    <p className="px-7 py-1 text-center font-bold text-black">Cancel</p>
                                                                </button>

                                                                {/* rate control continer */}
                                                                <div className="flex text-center border rounded-lg border-gray-500 w-full"> {/* Full width for the container */}
                                                                    <button disabled onClick={() => RateDecrease('t3')} className="px-2 w-16 py-1 border-r rounded-l-md flex items-center justify-center text-black font-bold text-2xl">
                                                                        <FaMinus className="text-[#347fc5]" />
                                                                    </button>
                                                                    <div className="border-l border-r border-gray-700 flex-grow">
                                                                        <input
                                                                            disabled
                                                                            type="number"
                                                                            placeholder={`${showBook.t3.rate}`}
                                                                            // value={showBook.t3.rate} // Display rate for t3
                                                                            // onChange={(e) => handleChange('t3', 'rate', Number(e.target.value))} // Update rate for t3
                                                                            min={0}
                                                                            className="text-center w-full h-full border-t border-b border-gray-300 text-black font-bold focus-within:outline-none"
                                                                        />
                                                                    </div>
                                                                    <button disabled onClick={() => RateIncrease('t3')} className="px-2 w-16 py-1  rounded-r-md flex items-center justify-center text-black font-bold text-2xl">
                                                                        <FaPlus className="text-[#347fc5]" />
                                                                    </button>
                                                                </div>

                                                                {/* amount control */}
                                                                <div className="flex text-center border rounded-lg border-gray-500 w-full"> {/* Full width for the container */}
                                                                    <button onClick={() => AmountDecrease('t3', item?.min)} className="px-2 w-16 py-1 border-r bg-gray-100 rounded-l-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                        <FaMinus className="text-[#347fc5]" />
                                                                    </button>
                                                                    <div className="border-l border-r border-gray-700 flex-grow">
                                                                        <input
                                                                            type="number"
                                                                            value={showBook.t3.amount} // Display amount for t3
                                                                            onChange={(e) => handleChange('t3', 'amount', Number(e.target.value))} // Update amount for t3
                                                                            min={item?.min}
                                                                            max={item?.max}
                                                                            className="text-center w-full h-full border-t border-b border-gray-300 text-black font-bold focus-within:outline-none"
                                                                        />
                                                                    </div>
                                                                    <button onClick={() => AmountIncrease('t3', item?.max)} className="px-2 w-16 py-1 bg-gray-100 rounded-r-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                        <FaPlus className="text-[#347fc5]" />
                                                                    </button>
                                                                </div>

                                                                {/* Place Bet Button */}
                                                                <button
                                                                    onClick={() => handlePlaceBet("t3", item?.gtype, item?.nat,)}
                                                                    disabled={item?.gstatus}
                                                                    className={`flex max-lg:hidden justify-center items-center h-full border rounded-md border-gray-600
                                                                    ${showBook.t3.amount
                                                                            ? 'bg-gradient-to-t from-[#1e714f] to-[#16a34a]'
                                                                            : 'bg-gradient-to-t from-[#626278] to-[#7380AD]'
                                                                        } `}>
                                                                    <p className="px-7 py-1 text-center font-extrabold text-white text-lg">Place Bet</p>
                                                                </button>
                                                            </div>


                                                            <div className={`grid grid-cols-8 max-lg:grid-cols-4 gap-2 lg:px-2 px-0.5 py-0.5 border-t border-t-blue-300  ${showBook.t3.color == 'red' ? 'border-t-red-300' : 'border-t-blue-300'} text-xs lg:text-sm`}>
                                                                <button onClick={() => handleBetAmountUpdate("t3", 100)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >100</button>
                                                                <button onClick={() => handleBetAmountUpdate("t3", 200)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >200</button>
                                                                <button onClick={() => handleBetAmountUpdate("t3", 500)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >500</button>
                                                                <button onClick={() => handleBetAmountUpdate("t3", 5000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >5000</button>
                                                                <button onClick={() => handleBetAmountUpdate("t3", 10000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >10000</button>
                                                                <button onClick={() => handleBetAmountUpdate("t3", 25000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >25000</button>
                                                                <button onClick={() => handleBetAmountUpdate("t3", 50000)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >50000</button>
                                                                <button onClick={() => handleBetAmountUpdate("t3", 100000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >100000</button>

                                                            </div>

                                                            <div className="grid grid-cols-2 my-1 lg:hidden gap-2">
                                                                <button onClick={() => HandleCancel("t3")} className='flex  justify-center items-center h-full border rounded-md border-gray-600 bg-white'>
                                                                    <p className='  px-7 py-1 text-center font-bold text-black'>Cancel</p>

                                                                </button>
                                                                <button
                                                                    onClick={() => handlePlaceBet("t3", item?.gtype, item?.nat,)}
                                                                    disabled={item?.gstatus}

                                                                    className={`flex  justify-center items-center h-full bg-[#577094] border rounded-md border-gray-600
                                                                        ${showBook.t3.amount
                                                                            ? 'bg-gradient-to-t from-[#1e714f] to-[#16a34a]'
                                                                            : 'bg-gradient-to-t from-[#626278] to-[#7380AD]'
                                                                        }`}>
                                                                    <p className='   px-7 py-1 text-center font-extrabold text-white text-lg'>Place Bet</p>

                                                                </button>
                                                            </div>
                                                        </td>


                                                    </tr>

                                                }

                                            </tbody>
                                        )}



                                        {/* card model */}
                                        {cardmodel && (
                                            <div className="fixed inset-0 top-0 left-0 h-screen w-full bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                                                <div className="fixed top-2 left-1.5 md:left-1/4 justify-center w-full px-1">
                                                    <div className="relative w-[40vw] max-h-[90vh] overflow-y-auto max-lg:w-[60vw] max-md:w-[75vw] max-sm:w-[95vw] max-sm:max-h-[95vh] bg-white rounded-lg shadow-lg">
                                                        {/* Header Section with Title and Close Button */}
                                                        <div className="w-full bg-gradient-to-b from-blue-900 to-gray-950 rounded-t-lg flex justify-between items-center p-2">
                                                            <h1 className="text-white font-semibold">Book</h1>
                                                            <p
                                                                onClick={() => setCardmodel(false)}
                                                                className="text-white text-xl cursor-pointer hover:text-red-400"
                                                            >
                                                                X
                                                            </p>
                                                        </div>

                                                        <div className="p-0">
                                                            <table className="border border-gray-400 w-full text-center">
                                                                <thead>
                                                                    <tr className="bg-gray-300">
                                                                        <th className="border border-gray-400 text-black px-4 w-1/2">Run</th>
                                                                        <th className="border border-gray-400 text-black px-4 w-1/2">Amount</th>
                                                                    </tr>
                                                                </thead>

                                                                <tbody>
                                                                    {fancyData.length > 0 &&
                                                                        fancyData.map((item, index) => (
                                                                            <tr
                                                                                key={index}
                                                                                className={`border border-gray-400 text-black ${item.amount > 0 ? "bg-[#72BBEF]" : "bg-[#FAA9BA]"
                                                                                    }`}
                                                                            >
                                                                                <td className="border border-gray-400 px-4">{item.run}</td>
                                                                                <td className="border border-gray-400 px-4">{Math.floor(item.amount)}</td>
                                                                            </tr>
                                                                        ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}





                                    </table>


                                </div>
                            </div>
                        }
                        {/* Odd Even */}
                        {/* {
                            t6Data?.length > 0 && (optionSportsBet['All'] || optionSportsBet['Odd/Evens']) &&
                            <div className='my-4'>
                                
                                <div className="border border-b-0 overflow-x-auto">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 relative">
                                        <thead className="text-xs text-black bg-white border-b border-gray-500 ">
                                            <tr>
                                                <th colSpan={1} scope="col" className=" max-lg:hidden py-1 text-center ">

                                                </th>
                                                <th scope="col" className="px-2 lg:hidden py-1 ">
                                                    <div className='bg-[#BED5D8] text-center'>
                                                        <span className='text-[#6987B1]'>min/max</span>  1-0
                                                    </div>
                                                </th>

                                                <th scope="col" className=" bg-[#72BBEF] lg:rounded-tl-lg  py-2 px-5 text-center">
                                                    Odd
                                                </th>
                                                <th scope="col" className=" bg-[#FAA9BA] lg:rounded-tr-lg py-2 px-5 text-center text-nowrap">
                                                    Even
                                                </th>
                                                <th scope="col" className="px-2 max-lg:hidden py-1 ">

                                                </th>

                                            </tr>
                                        </thead>
                                        {t6Data?.map((item, index) =>
                                            <tbody key={index}>

                                                <tr className="bg-white border-b border-gray-300 relative">

                                                    <td className="px-2 py-0.5 lg:text-nowrap ">
                                                        <a className="flex gap-x-2 flex-wrap capitalize text-gray-900 font-semibold ">
                                                            {item?.nat}
                                                        </a>
                                                        {
                                                            showBook.t6.amount > 0 &&
                                                            <p className={`${showBook.t6.name == item?.nat ? 'text-[#45A255]' : 'text-red-500'} text-center font-[700]`}>{showBook.t6.name == item?.nat ? `(${showBook.t6.betAmount})` : `(${showBook.t6.amount})`}</p>
                                                        }
                                                    </td>

                                                    <td
                                                        className={`${showBook.t6.boxname == item?.b1 ? 'bg-[#2A8EE1] text-white' : 'bg-[#72BBEF] text-gray-900'}   font-semibold text-center w-[60px] lg:w-[100px] relative`}
                                                    >
                                                        <button
                                                            onClick={() => handleBookie("t6", item?.nat, "blue", item?.b1, item?.mname, "Back")}
                                                            disabled={!item?.b1}
                                                            className='py-[3px]'
                                                        >
                                                            <p className="px-1 leading-4  font-[700] text-[12px]">{item?.b1}</p>
                                                            <p className="px-1 leading-4  font-light text-gray-800    text-[11px]">{item?.bs1}</p>
                                                        </button>

                                                        {(item?.gstatus !== "" || !(time?.days === 0 && time?.hours === 0 && time?.minutes === 0 && time?.seconds === 0)) && (
                                                            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white bg-opacity-70 sm:text-sm text-[11px] text-red-500 font-bold">
                                                                {item?.gstatus || 'SUSPENDED'}
                                                            </div>
                                                        )}

                                                    </td>

                                                    <td
                                                        className={`${showBook.t6.boxname == item?.l1 ? 'bg-[#F4496D] text-white' : 'bg-[#FAA9BA] text-gray-900'}  py-0.5 font-semibold text-center w-[60px] lg:w-[100px] relative`}
                                                    >
                                                        <button
                                                            onClick={() => handleBookie("t6", item?.nat, "red", item?.l1, item?.mname, "Lay")}
                                                            disabled={!item?.l1}
                                                        >
                                                            <div className='py-[3px]'>
                                                                <p className="px-1 leading-4 font-[700] text-[12px]">{item?.l1}</p>
                                                                <p className="px-1 leading-4 font-light text-gray-800   text-[11px]">{item?.ls1}</p>
                                                            </div>

                                                        </button>

                                                        {(item?.gstatus !== "" || !(time?.days === 0 && time?.hours === 0 && time?.minutes === 0 && time?.seconds === 0)) && (
                                                            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white bg-opacity-70 sm:text-sm text-[11px] text-red-500 font-bold">
                                                                {item?.gstatus || 'SUSPENDED'}
                                                            </div>
                                                        )}
                                                    </td>




                                                    <td
                                                        className={`${showBook.t6.boxname == item?.l2 ? 'bg-[#F4496D] text-white' : 'bg-[#EFD3D9] text-gray-900'} hidden lg:table-cell  py-0.5 font-semibold text-center w-[60px] lg:w-[100px]`}
                                                    >

                                                        <div className='py-[3px]'>
                                                            <p className="px-1 leading-4   font-[700] text-[12px]">min:{item?.min}</p>
                                                            <p className="px-1 leading-4  font-light text-gray-800  text-[11px]">max:{item?.max}</p>
                                                        </div>
                                                    </td>


                                                </tr>


                                                {showBook.t6.name == item?.nat &&
                                                    <tr className={` ${showBook.t6.color == 'red' ? 'lg:bg-[#FAA9BA] bg-[#F1D5DC]' : 'lg:bg-[#72BBEF] bg-[#BEDDF4]'} border-b border-gray-300`}>
                                                        <td colSpan={4} className=' pt-1 '>
                                                            <div className="grid grid-cols-4 gap-2 lg:px-3 px-0.5 pb-0.5 border-b border-[#72BBEF] max-lg:grid-cols-2">
                                                              
                                                                <button onClick={() => HandleCancel("t6")} className="flex max-lg:hidden bg-white  justify-center items-center h-full border rounded-md border-gray-600">
                                                                    <p className="px-7 py-1 text-center font-bold text-black">Cancel</p>
                                                                </button>

                                                                
                                                                <div className="flex text-center border rounded-lg border-gray-500 w-full"> 
                                                                    <button onClick={() => RateDecrease('t6')} className="px-2 w-16 py-1 border-r bg-gray-100 rounded-l-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                        <FaMinus className="text-[#347fc5]" />
                                                                    </button>
                                                                    <div className="border-l border-r border-gray-700 flex-grow">
                                                                        <input
                                                                            type="number"
                                                                            value={showBook.t6.rate} 
                                                                            onChange={(e) => handleChange('t6', 'rate', Number(e.target.value))} 
                                                                            min={0}
                                                                            className="text-center w-full h-full border-t border-b border-gray-300 text-black font-bold focus-within:outline-none"
                                                                        />
                                                                    </div>
                                                                    <button onClick={() => RateIncrease('t6')} className="px-2 w-16 py-1 bg-gray-100 rounded-r-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                        <FaPlus className="text-[#347fc5]" />
                                                                    </button>
                                                                </div>

                                                                
                                                                <div className="flex text-center border rounded-lg border-gray-500 w-full"> 
                                                                    <button onClick={() => AmountDecrease('t6')} className="px-2 w-16 py-1 border-r bg-gray-100 rounded-l-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                        <FaMinus className="text-[#347fc5]" />
                                                                    </button>
                                                                    <div className="border-l border-r border-gray-700 flex-grow">
                                                                        <input
                                                                            type="number"
                                                                            value={showBook.t6.amount} 
                                                                            onChange={(e) => handleChange('t6', 'amount', Number(e.target.value))} 
                                                                            min={0}
                                                                            max={10000}
                                                                            className="text-center w-full h-full border-t border-b border-gray-300 text-black font-bold focus-within:outline-none"
                                                                        />
                                                                    </div>
                                                                    <button onClick={() => AmountIncrease('t6')} className="px-2 w-16 py-1 bg-gray-100 rounded-r-md flex items-center justify-center text-black font-bold text-2xl ">
                                                                        <FaPlus className="text-[#347fc5]" />
                                                                    </button>
                                                                </div>

                                                                
                                                                <button
                                                                    onClick={() => handlePlaceBet("t6", item?.mname, item?.nat,)}
                                                                    disabled={item?.gstatus}
                                                                    className={`flex max-lg:hidden justify-center items-center h-full border rounded-md border-gray-600 ${showBook.t6.color == 'red' ? 'bg-gradient-to-t from-[#626278] to-[#7380AD]' : 'bg-gradient-to-t from-[#1e714f] to-[#16a34a]'} `}>
                                                                    <p className="px-7 py-1 text-center font-extrabold text-white text-lg">Place Bet</p>
                                                                </button>
                                                            </div>


                                                            <div className={`grid grid-cols-8 max-lg:grid-cols-4 gap-2 lg:px-2 px-0.5 py-0.5 border-t border-t-blue-300  ${showBook.t6.color == 'red' ? 'border-t-red-300' : 'border-t-blue-300'} text-xs lg:text-sm`}>
                                                                <button onClick={() => handleBetAmountUpdate("t6", 100)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >100</button>
                                                                <button onClick={() => handleBetAmountUpdate("t6", 200)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >200</button>
                                                                <button onClick={() => handleBetAmountUpdate("t6", 500)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >500</button>
                                                                <button onClick={() => handleBetAmountUpdate("t6", 5000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >5000</button>
                                                                <button onClick={() => handleBetAmountUpdate("t6", 10000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >10000</button>
                                                                <button onClick={() => handleBetAmountUpdate("t6", 25000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >25000</button>
                                                                <button onClick={() => handleBetAmountUpdate("t6", 50000)} className='text-center  bg-white border rounded-md  py-1 border-black text-black' >50000</button>
                                                                <button onClick={() => handleBetAmountUpdate("t6", 100000)} className='text-center  bg-white border rounded-md py-1 border-black text-black' >100000</button>

                                                            </div>

                                                            <div className="grid grid-cols-2 my-1 lg:hidden gap-2">
                                                                <button onClick={() => HandleCancel("t6")} className='flex  justify-center items-center h-full border rounded-md border-gray-600 bg-white'>
                                                                    <p className='  px-7 py-1 text-center font-bold text-black'>Cancel</p>

                                                                </button>
                                                                <button
                                                                    onClick={() => handlePlaceBet("t6", item?.mname, item?.nat,)}
                                                                    disabled={item?.gstatus}
                                                                    className='flex  justify-center items-center h-full bg-[#577094] border rounded-md border-gray-600'>
                                                                    <p className='   px-7 py-1 text-center font-extrabold text-white text-lg'>Place Bet</p>

                                                                </button>
                                                            </div>
                                                        </td>


                                                    </tr>

                                                }

                                            </tbody>
                                        )}

                                    </table>


                                </div>
                            </div>
                        } */}

                    </div>
                </>
            ) : ""
            }
            <LoginWarningModal openModal={showWarningModal} closeModal={() => setShowWarningModal(false)} />
        </div >
    )
}

export default Booking