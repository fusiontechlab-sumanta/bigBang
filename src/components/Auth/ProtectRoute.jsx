import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import LoginWarningModal from "./LoginWarningModal";

const ProtectRoute = ({ children, user, }) => {
   const [showWarningModal, setShowWarningModal] = useState(true);
  
  if (!user) return   <LoginWarningModal  openModal={showWarningModal} closeModal={() => setShowWarningModal(false)}/>;

  return children ? children : <Outlet />;
};

export default ProtectRoute;
