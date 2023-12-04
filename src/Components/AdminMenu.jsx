import React from 'react';
import './AdminMenu.css';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

function AdminMenu({ onClose, loginData }) {
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


  return (
    <div className="adminMenuHeader">
        <Link to="/login" class='adminMenuHeaderOption'>{changeLogStatus}</Link>

    </div>
  );
}

export default AdminMenu;