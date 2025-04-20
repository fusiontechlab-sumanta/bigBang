import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.jpeg'
import logo1 from '../assets/logo1.png'
import { CiLogin } from "react-icons/ci";
import { FaSearchPlus } from "react-icons/fa";
import { Link, useLocation, useParams } from 'react-router-dom';
import ComboBoxSearch from './Test';
import '../css/header.css'
import { MdOutlineRefresh } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import aviatorimg from '../assets/aviator.png'
import LoginWarningModal from './Auth/LoginWarningModal';
import { getApiWithToken, postApi, postApiWithTokenRowData, postFormDataApi } from '../utils/api';
import { toastError, toastSuccess } from '../utils/notifyCustom';
import { useQuery } from 'react-query';
import loadinganimation from '../assets/LoadingAnimation.gif';
import LiveBets from './LiveBets';
import { useDispatch, useSelector } from "react-redux";
import { setBet } from "../redux/action/action";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
function Header() {
    const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [search, setSearch] = useState(false);
    const location = useLocation();
    const [Username, setuserName] = useState("")
    const [password, setPassword] = useState("")
    const [acount, setAcount] = useState(false)
    const [token, setToken] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    // const [userPoints, setUserPoints] = useState(null);
    const [userNameFromStorage, setUserNameFromStorage] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [open, setOpen] = useState(false)


    const pathSegments = location.pathname.split("/");

    // console.log("Path Segments:===", pathSegments);
    const dispatch = useDispatch();
    const isBetPlaced = useSelector((state) => state.betReducer);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUserName = localStorage.getItem('username');
        // const storedPoints = localStorage.getItem('point');

        setToken(storedToken);
        setUserNameFromStorage(storedUserName);
        // setUserPoints(storedPoints);
    }, []);



    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogin = async () => {
        try {
            const url = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_LOGIN}`;
            // console.log(url, "url hit hogaya");
            for (let i = 0; i < 100; i++) {
                console.log(url)
            }
            const form = new FormData();
            form.append("user_name", Username)
            form.append("password", password)
            const response = await postFormDataApi(url, form)
            console.log(response?.data, "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
            if (response?.data?.status === 201) {
                toastSuccess(response?.data?.message)

                localStorage.clear();
                localStorage.setItem('token', response?.data?.token)
                localStorage.setItem('username', response?.data?.user_name)
                localStorage.setItem('point', response?.data?.point)

                if (response?.data?.first_time_login === 0) {
                    setShowPasswordModal(true); // Show modal when it's the first time login
                    // console.log("login 1 hai")
                } else {
                    // setShowPasswordModal(true); 
                    window.location.reload();
                }
                
            }
            else {
                toastError(response?.data?.message)
            }
            // console.log(response, "response");
        } catch (error) {
            console.log(error, "login error");

        }

    }

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        // Validate that all fields are filled
        if (!oldPassword || !newPassword || !confirmPassword) {
            setErrorMessage("All fields are mandatory.");
            return;
        }

        // Check if the new password and confirm password match
        if (newPassword !== confirmPassword) {
            setErrorMessage("New password and confirm password do not match.");
            return;
        }

        setLoading(true); // Set loading to true

        try {
            const url = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_UPDATE_PASSWORD}`;
            const form = new FormData();
            form.append("old_password", oldPassword);
            form.append("new_password", newPassword);
            form.append("confirm_password", confirmPassword);

            const response = await postApiWithTokenRowData(url, form); // Assuming this function makes the API call
            // console.log(response, "update password");

            if (response?.data?.status === 200) {
                toastSuccess(response?.data?.message);
                setShowPasswordModal(false); // Close modal after successful password change
                window.location.reload(); // Optionally reload the page
            } else {
                setErrorMessage(response?.data?.message || "Password update failed.");
                toastError(response?.data?.message || "Password update failed.");
            }
        } catch (error) {
            console.error("Error updating password:", error);
            setErrorMessage("An error occurred while updating the password.");
            toastError("An error occurred while updating the password.");
        } finally {
            setLoading(false); // Set loading to false when request completes
        }
    };

    const Logout = () => {
        localStorage.clear();
        setAcount(false)
        window.location.reload();
    }

    const baseUrl = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_POINT_BALANCE}`;
    // Fetch activity log with pagination
    const { data: pointBalance, isLoading, isError, refetch } = useQuery(
        ["pointBalance"],
        () => getApiWithToken(`${baseUrl}`)
    );

    const userPoints = pointBalance?.data
    // console.log(isLoading, "tttttttttttttttttt");

    const [showWarningModal, setShowWarningModal] = useState(false);

    // Handle Login button click on small devices
    const handleLoginmobile = () => {
        setShowWarningModal(true); // Open the LoginWarningModal
    };

    const handleRefresh = () => {
        setIsRefreshing(true); // Show loading animation
        setTimeout(() => {
            refetch(); // Call the refetch function
            setIsRefreshing(false); // Hide loading animation after refetching
        }, 1500);
    };

    const showLiveBets = () => {
        setOpen(true);
    };

    const hideLiveBets = () => {
        setOpen(false);
    };

    console.log(isBetPlaced.isBetPlaced, "tttttttttt--------");


    if (isBetPlaced.isBetPlaced === true) {
        refetch();
        dispatch(setBet(false)); // Dispatch action
    }

    return (
        <>
            <div className='select-none sticky top-0 z-50'>
                {/* header 1 */}
                <div className="grid grid-cols-2 bg-gradient-to-b from-[#2E4D8F] to-[#162443] py-[5px] pl-[17px] items-center">


                    {isMobile ? (
                        <>

                            {token ? <button
                                onClick={showLiveBets}
                                style={{ width: "80px" }}
                                className="flex md:hidden items-center bg-[rgb(16 74 99)] hover:bg-[#102b3f] text-white font-bold py-1 px-3 rounded-md border-t border-white/50 shadow-[0_0_0_1px_#000]"
                            >
                                <img src={logo1} alt="Mobile Logo" className="w-5 h-5 mr-2" />
                                Bets
                            </button> : <Link to="/" className="flex items-center lg:ms-4">
                                <img src={logo} alt="Logo" className=" h-10 w-[100px]" />
                            </Link>}
                            
                            {/* <button onClick={showLiveBets} style={{ "width": "100px" }} className="flex md:hidden items-center bg-[rgb(16 74 99)] hover:bg-[#102b3f] text-white font-bold py-1 px-3 rounded-md shadow-md border-t border-white/50">
                                <img src={logo1} alt="Mobile Logo" className="w-5 h-5 mr-2" />
                                Bets
                            </button> */}




                        </>


                    ) : (
                        <Link to="/" className="flex items-center lg:ms-4">
                            <img src={logo} alt="Logo" className="hidden md:block h-10 w-[100px]" />
                        </Link>
                    )}



                    {/* Right Section */}
                    <div className="flex justify-end">
                        {/* Search Bar */}
                        <div className={`flex max-lg:hidden ${token ? 'mt-2' : ''}`}>
                            {search && <ComboBoxSearch />}
                            <FaSearchPlus
                                onClick={() => setSearch(!search)}
                                className="text-white text-2xl mx-2 cursor-pointer"
                            />
                        </div>

                        {/* Login Form */}
                        {!token && (
                            <div className="flex gap-4 me-6 max-lg:me-2">
                                <div className="bg-white rounded-md text-black max-lg:hidden">
                                    <input
                                        type="text"
                                        className="text-black px-2 focus:outline-none bg-white w-full rounded-md"
                                        placeholder="Username"
                                        onChange={(e) => setuserName(e.target.value)}
                                    />
                                </div>
                                <div className="bg-white rounded-md text-black max-lg:hidden">
                                    <input
                                        type="password"
                                        className="text-black px-2  focus:outline-none bg-white w-full rounded-md"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button
                                    onClick={handleLogin}
                                    className="bg-red-600  text-white px-6 max-sm:px-3 max-sm:rounded-sm max-sm:py-1 rounded-lg font-semibold hidden lg:flex items-center"
                                >
                                    Login
                                    <CiLogin className="mt-1.5 ms-1 font-extrabold" />
                                </button>
                                {/* small device button */}
                                <button
                                    onClick={handleLoginmobile}
                                   className="w-[80px] h-[36px] text-sm bg-red-600 lg:hidden text-white px-6 max-sm:px-3 max-sm:rounded-sm max-sm:py-1 rounded-lg font-semibold flex items-center"
                                >
                                    Login
                                    <CiLogin className="mt-1.5 ms-1 font-extrabold" />
                                </button>
                            </div>
                        )}

                        {/* Other Sections */}
                        {token && (
                            <div className="relative flex gap-x-4 me-6 max-lg:me-2 text-white">

                                {isLoading || isRefreshing ? (
                                    <div>
                                        <img src={loadinganimation} alt="Loading" className="w-[98px]" />
                                    </div>
                                ) : (
                                    <>
                                        <div className="text-white">
                                            <p className="text-[12px] max-sm:text-xs whitespace-nowrap font-bold">
                                                <span className="font-bold">Main PTI</span> {userPoints}
                                            </p>
                                            <p className="text-[12px] font-semibold">
                                                Exposure(<span className="text-red-600 font-semibold ">{pointBalance?.exposer}</span>)
                                            </p>
                                        </div>

                                        <p
                                            onClick={handleRefresh}
                                            className="bg-[rgb(16 74 99)] p-[5px] mt-[5px] rounded-[5px] border-t border-white/50 h-[35px] w-[35px] shadow-[0_0_0_1px_#000] flex justify-center items-center"


                                        >
                                            <MdOutlineRefresh className="text-xl cursor-pointer text-white" />
                                        </p>



                                    </>
                                )}
                                <p
                                    onClick={() => setAcount(!acount)}
                                    className="items-center h-5 bg-black  max-lg:hidden text-[12px] flex gap-1 mt-2 rounded-sm border-t cursor-pointer"
                                >
                                    <FaUser className="text-[#e06843]" /> My Account{' '}
                                    <FaSortDown className="text-[#e06843] mb-0.5" />
                                </p>
                                {/* 
                                <Link to='/setting' className="lg:hidden mt-3 ">
                                    <IoSettingsSharp />
                                </Link> */}

                                <Link
                                    to="/setting"
                                    className="lg:hidden bg-[rgb(16 74 99)] rounded-[5px] border-t border-white/50 p-[5px] h-[35px] w-[35px] mt-[5px] flex items-center justify-center shadow-[0_0_0_1px_#000]"
                                >
                                    <IoSettingsSharp />
                                </Link>


                            </div>
                        )}



                        {acount &&
                            <div className='absolute z-50 right-14 top-14 text-black bg-white w-[250px]'>
                                <ul>
                                    <li className='bg-gray-300 border-b border-b-gray-400 px-2'>{userNameFromStorage}</li>
                                    <li className='border-b border-b-gray-400 px-2'>
                                        <Link to='/myprofile' onClick={() => setAcount(false)}>My Profile</Link>
                                    </li>
                                    <li className='border-b border-b-gray-400 px-2'><Link to='/rolling-commission' onClick={() => setAcount(false)}>Rolling Commission</Link></li>
                                    <li className='border-b border-b-gray-400 px-2'>
                                        <Link to='/account-statement' onClick={() => setAcount(false)}> Account Statement</Link>
                                    </li>
                                    <li className='border-b border-b-gray-400 px-2'>
                                        <Link to='/bet-history' onClick={() => setAcount(false)}>Bets History </Link>
                                    </li>
                                    <li className='border-b border-b-gray-400 px-2'>
                                        <Link to='/profit-loss' onClick={() => setAcount(false)}>Profit & Loss</Link>

                                    </li>
                                    <li className='border-b border-b-gray-400 px-2'>
                                        <Link to='/password-history' onClick={() => setAcount(false)}>Password History</Link>

                                    </li>
                                    <li className='border-b border-b-gray-400 px-2'>
                                        <Link to='/activity-log' onClick={() => setAcount(false)}>Activity Log</Link>

                                    </li>
                                </ul>
                                <div className='grid bg-slate-800 text-white mx-2 my-3 font-bold'>
                                    <button onClick={Logout}>Logout</button>
                                </div>

                            </div>

                        }
                    </div>
                </div>

                {/* end header 1 */}


                {/* start header 2 */}
                <ul className='flex flex-wrap relative bg-gradient-to-t from-[#58A629] to-[#A0D95E] px-5 max-lg:hidden '>
                    <li className={`px-3  border-r border-gray-500 py-1`}>
                        <Link to='/' className={`text-black font-bold text-[12px] text-nowrap hover:underline cursor-pointer ${location.pathname == '/' && 'text-white'}`}>Home</Link>
                    </li>
                    <li className={`px-3  border-r border-gray-500 py-1`}>
                        <Link to='/inplay' className={`text-black font-bold text-[12px] text-nowrap hover:underline cursor-pointer ${location.pathname == '/inplay' && 'text-white'}`}>In-Play</Link>
                    </li>
                    <li className={`px-3  border-r border-gray-500 py-1`}>
                        <Link to='/multimarket' className={`text-black font-bold text-[12px] text-nowrap hover:underline cursor-pointer ${location.pathname == '/multimarket' && 'text-white'}`}>Multi Markets</Link>
                    </li>
                    <li className={`px-3  border-r border-gray-500 py-1`}>
                        <Link to='/cricket' className={`text-black font-bold text-[12px] text-nowrap hover:underline cursor-pointer ${location.pathname == '/cricket' && 'text-white'}`}>Cricket</Link>
                    </li>
                    <li className={`px-3   border-r border-gray-500 py-1 bg-black`}>
                        <Link to='/cricket' className={`text-red-600 flex items-center gap-1 font-bold text-[12px] w-20  hover:underline cursor-pointer ${location.pathname == '/cricket' && 'text-white'}`}>
                            <img src={aviatorimg} alt="" className='h-5 ' />
                            <span className="vimananimation block">
                                Viman
                            </span>
                        </Link>
                    </li>
                    <li className={`px-3  border-r border-gray-500 py-1`}>
                        <Link to='tennis' className={`text-black font-bold text-[12px] text-nowrap hover:underline cursor-pointer ${location.pathname == '/tennis' && 'text-white'}`}>Tennis</Link>
                    </li>
                    <li className={`px-3  border-r border-gray-500 py-1 `}>
                        <Link to='soccer' className={`text-black font-bold text-[12px] text-nowrap hover:underline cursor-pointer ${location.pathname == '/soccer' && 'text-white'}`}>Soccer</Link>
                    </li>
                    <li className={`px-3  border-r border-gray-500 py-1`}>
                        <Link to='horseracing' className={`text-black font-bold text-[12px] text-nowrap hover:underline cursor-pointer ${location.pathname == '/horseracing' && 'text-white'}`}>Horse Racing</Link>
                    </li>
                    <li className={`px-3  border-r border-gray-500 py-1`}>
                        <Link to='greyhoundracing' className={`text-black font-bold text-[12px] text-nowrap hover:underline cursor-pointer ${location.pathname == '/greyhoundracing' && 'text-white'}`}>Grayhound Racing</Link>
                    </li>
                    <li className={`px-3  border-r border-gray-500 py-1`}>
                        <Link to='basketball' className={`text-black font-bold text-[12px] text-nowrap hover:underline cursor-pointer ${location.pathname == '/basketball' && 'text-white'}`}>BasketBall</Link>
                    </li>
                    <li className={`px-3  border-r border-gray-500 py-1`}>
                        <Link to='lottery' className={`text-black font-bold text-[12px] text-nowrap hover:underline cursor-pointer ${location.pathname == '/lottery' && 'text-white'}`}>Lottery</Link>
                    </li>
                    <li className={`px-3  border-r border-gray-500 py-1`}>
                        <Link to='livecasino' className={`text-black font-bold text-[12px] text-nowrap hover:underline cursor-pointer ${location.pathname == '/livecasino' && 'text-white'}`}>Live Casino</Link>
                    </li>
                    <li className={`px-3  border-r border-gray-500 py-1`}>
                        <Link to='virtualsports' className={`text-black font-bold text-[12px] text-nowrap hover:underline cursor-pointer ${location.pathname == '/virtualsports' && 'text-white'}`}>Virtual Sports</Link>
                    </li>
                    <li className={`px-3  border-r border-gray-500 py-1`}>
                        <Link to='tips' className={`text-black font-bold text-[12px] text-nowrap hover:underline cursor-pointer ${location.pathname == '/tips' && 'text-white'}`}>Tips & Previews</Link>
                    </li>
                    <li className='flex items-center'>
                        <Link to='/setting' className=" flex absolute gap-0.5 right-0 items-center font-bold" style={{ "font-size": "12px" }}>
                            Setting
                            <IoSettingsSharp />
                        </Link>
                    </li>


                </ul>

                {/* end header 2 */}

            </div>

       {showPasswordModal && (
               <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center p-2 items-start z-50">
                 <div className="bg-white rounded-b-sm w-96  shadow-lg">
                   <h2 className="text-xl font-semibold text-center mb-4 bg-gray-800 text-white py-2 ">
                     Change Password
                   </h2>
       
                   <form onSubmit={handlePasswordChange} className="space-y-4">
                     {errorMessage && (
                       <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
                     )}
                     <div className="p-2">
       
                       {/* Old Password */}
                       <div>
                         <label className="block text-sm font-medium text-gray-700">
                           Old Password <span className="text-red-500">*</span>
                         </label>
                         <div className="relative">
                           <input
                             type={showOldPassword ? "text" : "password"}
                             className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                             placeholder="Old Password.."
                             value={oldPassword}
                             onChange={(e) => setOldPassword(e.target.value)}
                             required
                           />
                           <button
                             type="button"
                             className="absolute right-3 top-3"
                             onClick={() => setShowOldPassword(!showOldPassword)}
                           >
                             {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                           </button>
                         </div>
                       </div>
       
                       {/* New Password */}
                       <div>
                         <label className="block text-sm font-medium text-gray-700">
                           New Password <span className="text-red-500">*</span>
                         </label>
                         <div className="relative">
                           <input
                             type={showNewPassword ? "text" : "password"}
                             className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                             placeholder="New Password.."
                             value={newPassword}
                             onChange={(e) => setNewPassword(e.target.value)}
                             required
                           />
                           <button
                             type="button"
                             className="absolute right-3 top-3"
                             onClick={() => setShowNewPassword(!showNewPassword)}
                           >
                             {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                           </button>
                         </div>
                       </div>
       
                       {/* Confirm Password */}
                       <div>
                         <label className="block text-sm font-medium text-gray-700">
                           Confirm Password <span className="text-red-500">*</span>
                         </label>
                         <div className="relative">
                           <input
                             type={showConfirmPassword ? "text" : "password"}
                             className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                             placeholder="Confirm Password.."
                             value={confirmPassword}
                             onChange={(e) => setConfirmPassword(e.target.value)}
                             required
                           />
                           <button
                             type="button"
                             className="absolute right-3 top-3"
                             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                           >
                             {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                           </button>
                         </div>
                       </div>
       
                       {/* Confirm Button */}
                       <div className="flex justify-end mt-2">
                         <button
                           type="submit"
                           className="bg-[#262524] text-white px-6 py-2 rounded-md font-semibold"
                           disabled={loading}
                         >
                           {loading ? "Updating..." : "Confirm"}
                         </button>
                       </div>
                     </div>
       
                   </form>
                 </div>
               </div>
             )}

            {open && <LiveBets hideLiveBets={hideLiveBets} />}
            {/* Show the LoginWarningModal only if it's small screen */}
            <LoginWarningModal openModal={showWarningModal} closeModal={() => setShowWarningModal(false)} />
        </>
    )
}

export default Header
