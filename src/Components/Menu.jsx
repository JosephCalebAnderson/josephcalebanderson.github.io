import React from 'react';
import './Menu.css';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

function Menu({ onClose, loginData }) {
  const navigate = useNavigate();

  var changeLogStatus;
  const location = useLocation();
  var loginData = null;
  if (location.state == null || location.state.loginData == null) {
  } else {
    loginData = location.state.loginData;
  }

  if (loginData == null) {
    changeLogStatus = "Log In";
  } else {
    changeLogStatus = "Log Out";
  }
  console.log(loginData);

  const handleProfileClick = () => {
    navigate('/editprofile', { state: { loginData: loginData } });
    onClose();
  }

  const handleOrderHistoryClick = () => {
    navigate('/orderhistory', { state: { loginData: loginData } });
    onClose();
  }

  return (
    <div className="menuHeader">
      <button className="menuHeaderProf" onClick={handleProfileClick}>Profile</button>
      <button className="menuHeaderProf" onClick={handleOrderHistoryClick}>Order History</button>
        <div class="menuHeaderBreak"></div>
        <Link to="/login" class='menuHeaderOption'>{changeLogStatus}</Link>

    </div>
  );
}

export default Menu;