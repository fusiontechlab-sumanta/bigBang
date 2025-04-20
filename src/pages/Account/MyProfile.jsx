import React, { useEffect, useRef, useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { PiNotePencilBold } from "react-icons/pi";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TEModalFooter,
} from "tw-elements-react";
import { getApiWithToken, postApiWithToken, postApiWithTokenRowData, postFormDataApi } from '../../utils/api';
import { useQuery } from 'react-query';
import Loading from '../../components/Loading';
import { toastError } from '../../utils/notifyCustom';
function MyProfile() {
    const [showModal, setShowModal] = useState(false);
    const [showEditModel, setShowEditModel] = useState(false);
    const [oldPasword, setoldPasword] = useState()
    const [newPasword, setnewPasword] = useState()
    const [confirmPasword, setconfirmPasword] = useState()
    const [errorMessage, setErrorMessage] = useState(""); // For login errors
    const [loading, setLoading] = useState(false)

    const [oldPassword, setOldPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const url = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_PROFILE_DETAIL}`;
    const { data: profile, isLoading, isError, refetch } = useQuery("getuserProfileDetails", () => getApiWithToken(url));
    if (isError) {
        return;
    }
    if (isLoading) {
        return <Loading />;
    }
    const userDetails = profile?.userDetails || {}
    // console.log(profile, "profile");
    const handleSubmit = async () => {
        if (!oldPasword || !newPasword || !confirmPasword) {
            setErrorMessage("all field are mandatory are required.");
            return;
        }
        setLoading(true); // Set loading to true
        try {
            const url = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_UPDATE_PASSWORD}`;
            const form = new FormData();
            form.append("old_password", oldPasword);
            form.append("new_password", newPasword);
            form.append("confirm_password", confirmPasword);

            const response = await postApiWithTokenRowData(url, form);
            // console.log(response, "update password");


            if (response?.data?.status === 201) {
                toastSuccess(response?.data?.message);

                setShowEditModel(false)
                window.location.reload();
            } else {
                setErrorMessage(response?.data?.message || "Login failed.");
                toastError(response?.data?.message || "Login failed.")
            }


        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("Something went wrong. Please try again.");
        } finally {
            setLoading(false); // Set loading to false
        }

    }

    return (
        <div className='mt-6 bg-white border rounded-lg pb-7 mb-36 lg:mb-2'>
            <h1 className='px-2 bg-[#243f4e] text-white  lg:font-semibold py-1 rounded-t-sm'>Account Details</h1>
            <div className="text-sm md:text-base">
                <div className="border-b border-[#ccc] md:grid md:grid-cols-2" style={{ "font-size": "14px" }}>
                    <p className="font-semibold py-[5px] pr-[12px] pl-[17px] border-b border-[#ccc] md:border-b-0 ">Name</p>
                    <p className="py-[5px] pr-[12px] pl-[17px]">{userDetails?.name}</p>
                </div>


                <div className="border-b border-[#ccc] md:grid md:grid-cols-2">
                    <p className="font-semibold py-[5px] pr-[12px] pl-[17px] border-b border-[#ccc] md:border-b-0">Commission</p>
                    <p className="py-[5px] pr-[12px] pl-[17px]">0</p>
                </div>

                <div className="border-b border-[#ccc] md:grid md:grid-cols-2">
                    <p className="font-semibold py-[5px] pr-[12px] pl-[17px] border-b border-[#ccc] md:border-b-0">Rolling Commission</p>
                    <p onClick={() => setShowModal(true)} className="cursor-pointer text-xl py-[5px] pr-[12px] pl-[17px]">
                        <FaRegEye />
                    </p>
                </div>

                <div className="border-b border-[#ccc] md:grid md:grid-cols-2">
                    <p className="font-semibold py-[5px] pr-[12px] pl-[17px] border-b border-[#ccc] md:border-b-0">Exposure Limit</p>
                    <p className="py-[5px] pr-[12px] pl-[17px]">6000</p>
                </div>

                <div className="border-b border-[#ccc] md:grid md:grid-cols-2">
                    <p className="font-semibold py-[5px] pr-[12px] pl-[17px] border-b border-[#ccc] md:border-b-0">Password</p>
                    <p className="flex items-center py-[5px] pr-[12px] pl-[17px]">
                        ********
                        <span onClick={() => setShowEditModel(true)} className="ml-3 cursor-pointer flex items-center gap-1 text-sm md:text-base">
                            Edit <PiNotePencilBold />
                        </span>
                    </p>
                </div>
            </div>
            {/* rolling commision model start */}
            <div>
                {/* <!-- Modal --> */}
                <TEModal show={showModal} setShow={setShowModal}>
                    <TEModalDialog>
                        <TEModalContent>
                            <TEModalHeader className='bg-[#213944] h-3'>
                                {/* <!--Modal title--> */}
                                <h5 className=" font-medium leading-normal text-white">
                                    Rolling Commision
                                </h5>
                                {/* <!--Close button--> */}
                                <button
                                    type="button"
                                    className="box-content font-bold  hover:opacity-75 focus:opacity-100 text-white"
                                    onClick={() => setShowModal(false)}
                                    aria-label="Close"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="5"
                                        stroke="currentColor"
                                        className="h-4 w-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </TEModalHeader>

                            {/* <!--Modal body--> */}
                            <TEModalBody>
                                <div className="grid grid-cols-2 gap-y-1 font-bold">
                                    {/* first row */}
                                    <div className='border  border-black border-r-0 px-4 py-1'>
                                        <p>Fancy</p>
                                    </div>
                                    <div className='border border-black border-l-0 px-4 py-1'>
                                        <p>0</p>
                                    </div>
                                    {/* end first row */}

                                    {/* second row */}
                                    <div className='border  border-black border-r-0 px-4 py-1'>
                                        <p>Matka</p>
                                    </div>
                                    <div className='border border-black border-l-0 px-4 py-1'>
                                        <p></p>
                                    </div>
                                    {/* end second row */}

                                    {/* third row */}
                                    <div className='border  border-black border-r-0 px-4 py-1'>
                                        <p>Lottery</p>
                                    </div>
                                    <div className='border border-black border-l-0 px-4 py-1'>
                                        <p></p>
                                    </div>
                                    {/* end third row */}

                                    {/* fourth row */}
                                    <div className='border  border-black border-r-0 px-4 py-1'>
                                        <p>Casino</p>
                                    </div>
                                    <div className='border border-black border-l-0 px-4 py-1'>
                                        <p>0</p>
                                    </div>
                                    {/* end fourth row */}


                                    {/* fifth row */}
                                    <div className='border  border-black border-r-0 px-4 py-1'>
                                        <p>Binary</p>
                                    </div>
                                    <div className='border border-black border-l-0 px-4 py-1'>
                                        <p></p>
                                    </div>
                                    {/* end fifth row */}

                                    {/* sixth row */}
                                    <div className='border  border-black border-r-0 px-4 py-1'>
                                        <p>Virtual</p>
                                    </div>

                                    <div className='border border-black border-l-0 px-4 py-1'>
                                        <p></p>
                                    </div>
                                    {/* end sixth row */}

                                    {/* seventh row */}
                                    <div className='border  border-black border-r-0 px-4 py-1'>
                                        <p>
                                            Sportbooks
                                        </p>
                                    </div>
                                    <div className='border border-black border-l-0 px-4 py-1'>
                                        <p>0</p>
                                    </div>
                                    {/* end seventh row */}


                                    {/* eight row */}
                                    <div className='border  border-black border-r-0 px-4 py-1'>
                                        <p>Bookmaker</p>
                                    </div>
                                    <div className='border border-black border-l-0 px-4 py-1'>
                                        <p>0</p>
                                    </div>
                                    {/* end eight row */}
                                </div>
                            </TEModalBody>
                        </TEModalContent>
                    </TEModalDialog>
                </TEModal>
            </div>
            {/* end rolling model */}

            {/* password model  start*/}
            <div>
                {/* <!-- Modal --> */}
                <TEModal show={showEditModel} setShow={setShowEditModel}>
                    <TEModalDialog>
                        <TEModalContent>
                            <TEModalHeader className='bg-[#213944] h-3'>
                                {/* <!--Modal title--> */}
                                <h5 className="text-lg text-white font-bold leading-normal ">
                                    Change Password
                                </h5>
                                {/* <!--Close button--> */}
                                <button
                                    type="button"
                                    className="box-content  hover:opacity-75 text-white"
                                    onClick={() => setShowEditModel(false)}
                                    aria-label="Close"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="5"
                                        stroke="currentColor"
                                        className="h-4 w-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </TEModalHeader>
                            {/* <!--Modal body--> */}
                            <TEModalBody>
                                <form action="">
                                    <div className='grid grid-cols-2 max-md:grid-cols-1 gap-3'>
                                        <div>
                                            <p>Old Password <sup className='text-red-600'>*</sup></p>
                                            <div className='border border-gray-500 rounded-md py-1.5 flex items-center px-3'>

                                                <input
                                                    name='oldPassword'
                                                    onChange={(e) => setoldPasword(e.target.value)}
                                                    type={showPassword ? "text" : "password"}
                                                    className='focus:outline-none mx-3 flex-1'
                                                    required
                                                />
                                                <span
                                                    className="mr-3 cursor-pointer -ml-7"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <p>New Password <sup className='text-red-600'>*</sup></p>
                                            <div className='border border-gray-500 rounded-md py-1.5 flex items-center px-3'>
                                                <input
                                                    name='newPassword'
                                                    onChange={(e) => setnewPasword(e.target.value)}
                                                    type={showNewPassword ? "text" : "password"}
                                                    className='focus:outline-none mx-3 flex-1'
                                                    required
                                                />
                                                <span
                                                    className="mr-3 cursor-pointer -ml-7"
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                >
                                                    {showNewPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <p>Confirm Password <sup className='text-red-600'>*</sup></p>
                                            <div className='border border-gray-500 rounded-md py-1.5 flex items-center px-3'>
                                                <input
                                                    name='confirmPassword'
                                                    onChange={(e) => setconfirmPasword(e.target.value)}
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    className='focus:outline-none mx-3 flex-1'
                                                    required
                                                />
                                                <span
                                                    className="mr-3 cursor-pointer -ml-7"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                >
                                                    {showConfirmPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </TEModalBody>
                            {/* <TEModalFooter>
                                <TERipple rippleColor="light">
                                    {errorMessage && (
                                        <p className="text-red-500 text-sm text-center">
                                            {errorMessage}
                                        </p>
                                    )}
                                </TERipple>
                                <TERipple rippleColor="light">
                                    <button
                                        type="button"
                                        className="inline-block rounded bg-gray-500 text-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  "
                                        onClick={handleSubmit}
                                        disabled={!oldPasword || !newPasword || !confirmPasword || loading}
                                    >
                                        Confirm
                                    </button>
                                </TERipple>
                                <TERipple rippleColor="light">
                                    <button
                                        type="button"
                                        className="ml-1 inline-block rounded bg-gray-400 text-gray-800  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal "
                                        onClick={() => setShowEditModel(false)}
                                    >
                                        No
                                    </button>
                                </TERipple>
                            </TEModalFooter> */}

                            <TEModalFooter>
                                <TERipple rippleColor="light">
                                    {errorMessage && (
                                        <p className="text-red-500 text-sm text-center">
                                            {errorMessage}
                                        </p>
                                    )}
                                </TERipple>
                                <TERipple rippleColor="light">
                                    <button
                                        type="button"
                                        className={`inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal
    ${oldPasword && newPasword && confirmPasword
                                                ? "bg-[#213944]"    // Use the dark color from the screenshot
                                                : "bg-gray-500"
                                            } text-white
  `}
                                        onClick={handleSubmit}
                                        disabled={!oldPasword || !newPasword || !confirmPasword || loading}
                                    >
                                        Confirm
                                    </button>

                                </TERipple>
                                <TERipple rippleColor="light">
                                    <button
                                        type="button"
                                        className="ml-1 inline-block rounded bg-gray-400 text-gray-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
                                        onClick={() => setShowEditModel(false)}
                                    >
                                        No
                                    </button>
                                </TERipple>
                            </TEModalFooter>


                        </TEModalContent>
                    </TEModalDialog>
                </TEModal>
            </div>
        </div>
    )
}
export default MyProfile
