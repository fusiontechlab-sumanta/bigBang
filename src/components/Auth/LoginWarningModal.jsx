import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import logo from "../../assets/logo.jpeg";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa6";
import { postApiWithTokenRowData, postFormDataApi } from "../../utils/api";
import { toastSuccess } from "../../utils/notifyCustom";
import { getApi } from "../../utils/api";

export default function LoginWarningModal({ openModal, closeModal }) {
  const [loading, setLoading] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(""); // State for username input
  const [password, setPassword] = useState(""); // State for password input
  const [errorMessage, setErrorMessage] = useState(""); // For login errors
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleBackdropClick = (e) => {
    if (e.target.id === "backdrop") {
      closeModal();
    }
  };

  const handleConfirmClick = () => {
    setShowLoginModal(true);
    closeModal();
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!username || !password) {
      setErrorMessage("Username and password are required.");
      return;
    }
    setLoading(true); // Set loading to true
    try {
      const url = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_LOGIN}`;
      const form = new FormData();
      form.append("user_name", username);
      form.append("password", password);

      const response = await postFormDataApi(url, form);
      if (response?.data?.status === 201) {
        toastSuccess(response?.data?.message);
        localStorage.clear();
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("username", response?.data?.user_name);
        localStorage.setItem("point", response?.data?.point);
        if (response?.data?.first_time_login === 0) {
          setShowPasswordModal(true); // Show modal when it's the first time login
          // console.log("login 1 hai")
        } else {
          // setShowPasswordModal(true);
          window.location.reload();
        }
      } else {
        setErrorMessage(response?.data?.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_BASE_URL; // Base URL
      const demoEndpoint = import.meta.env.VITE_DEMO_LOGIN; // API endpoint

      if (!baseUrl || !demoEndpoint) {
        console.error("API URL missing in .env file!");
        setErrorMessage("Configuration error. Please contact support.");
        return;
      }
      const url = `${baseUrl}${demoEndpoint}`;
      const response = await getApi(url);
      if (response?.data?.status === 201) {
        toastSuccess(response?.data?.message);
        localStorage.setItem("guest_name", response?.data?.guest_name);
        localStorage.setItem("token", response?.data?.token);
        setShowLoginModal(false);
        window.location.reload();
      } else {
        setErrorMessage(response?.data?.message || "Demo Login Failed.");
      }
    } catch (error) {
      console.error("Demo Login Error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


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
      console.log(response, "update password");

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


  return (
    <>
      {/* Warning Modal */}
      {openModal && (
        <div
          id="backdrop"
          onClick={handleBackdropClick}
          className="flex justify-center items-center h-screen fixed inset-0 bg-transparent z-50"
        >
          <div className="bg-gradient-to-t from-[#50A023] to-[#A3DB5F] p-6 text-white shadow-lg max-w-md w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 hover:text-gray-900 rounded-full"
            >
              <IoClose className="bg-[#F88F3B] rounded-full text-2xl text-black font-extrabold p-1" />
            </button>
            <h2 className="font-bold mb-4 text-center text-white border-b text-[16px] border-white py-2">
              Non-Gambling Territories.
            </h2>
            <p className="text-center text-sm font-bold">
              Connecting to our site from non-gambling countries, it will be
              User's responsibility to ensure that their use of the service is
              lawful.
            </p>
            <h1 className="font-bold mb-4 text-center text-white border-b text-[16px] border-white py-2 mt-6">
              Under gambling is prohibited.
            </h1>
            <p className="text-center text-sm mb-7 font-bold">
              Please confirm if you are 18 years old and above as of today.
            </p>
            <div className="flex justify-center gap-2">
              <button
                onClick={handleConfirmClick}
                className="bg-white px-7 py-1 text-black text-xs rounded-sm font-extrabold"
              >
                Confirm
              </button>
              <button
                onClick={closeModal}
                className="bg-black px-10 py-1 text-xs border rounded-sm font-extrabold"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="flex justify-center items-center h-screen z-50">
          <div className="fixed z-50 inset-0 bg-gradient-to-t from-[#000] to-[#525252] flex justify-center items-center">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-3 right-2 hover:text-gray-900 rounded-full m-[10px]"
            >
              <IoClose className="bg-gradient-to-t from-[#50A023] to-[#A3DB5F] rounded-md text-3xl text-black font-extrabold p-1" />
            </button>
            <div className="rounded-lg w-full h-screen flex items-center justify-center">
              <div className="max-w-xs">
                <div className="flex items-center justify-center mb-8">
                  <img src={logo} alt="Logo" className="h-16 w-[250px]" />
                </div>
                <form className="space-y-4" onSubmit={handleLogin}>
                  <div>
                    <div className="relative">
                      <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1  mb-[22px] block w-full px-2 py-2 pl-2 bg-white border border-white rounded-md focus:outline-none ring-1 ring-[#F87B03]"
                        placeholder="Username"
                      />
                      <FaUser className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black font-extrabold" />
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 mb-[22px] block w-full px-2 py-2 pl-2 pr-10 bg-white border border-white rounded-md focus:outline-none ring-1 ring-[#F87B03]"
                        placeholder="Password"
                      />
                      {showPassword ? (
                        <FaEye
                          onClick={togglePasswordVisibility}
                          className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-black font-extrabold"
                        />
                      ) : (
                        <FaEyeSlash
                          onClick={togglePasswordVisibility}
                          className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-black font-extrabold"
                        />
                      )}
                    </div>
                  </div>
                  {errorMessage && (
                    <p className="text-red-500 text-sm text-center">
                      {errorMessage}
                    </p>
                  )}
                  <div className="space-y-2">

                    <button
                      type="submit"
                      className="bg-gradient-to-t from-[#50A023] to-[#A3DB5F] font-extrabold text-white px-4 py-2 rounded w-full"
                      disabled={!username || !password || loading}
                    >
                      {loading ? "Logging in..." : "Login"}
                    </button>
                    {/* 
                    <button
                      type="button"
                      className="bg-gradient-to-t from-[#50A023] to-[#A3DB5F] text-white font-extrabold px-4 py-2 rounded w-full"
                    >
                      Login with Demo ID
                    </button> */}

                    <button
                      type="button"
                      onClick={handleDemoLogin}
                      className="bg-gradient-to-t from-[#50A023] to-[#A3DB5F] text-white font-extrabold px-4 py-2 rounded w-full"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Login with Demo ID"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

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

    </>
  );
}
