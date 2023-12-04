import React from 'react';
import './AdminHeader.css';
import logo from '../Images/logo.png';
import menuButton from '../Images/menuButton.png'
import AdminMenu from './AdminMenu';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function AdminHeader() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [fullName, setFullName] = React.useState('')
  const location = useLocation();
    // User information is stored here in loginData.user
    useEffect(() => {
      var loginData = {user: {name: "Test"}};
      if (location.state == null || location.state.loginData == null) {
      } else {
        loginData = location.state.loginData;
        setFullName(', '+loginData.user.username);
      }
    }, []);

  const handleHome = (e) => {
    e.preventDefault();
    navigate('/adminhome');
  }

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  return (
    <div class='admin-header'>
        <div class='admin-head1'>
        <img class="admin-headerLogo" src={logo} alt="Movie Logo" onClick={handleHome}/>
        <h1 class='admin-webName' onClick={handleHome}>BigScreenBook</h1>
      </div>
      <div class='admin-head2'>
        <div class='admin-searchContainer'>
        </div>
      </div>
      <div class='admin-head3'>
        <h2 class='admin-hello'>Hello, Admin.</h2>
        <button class="admin-menuButton" type="button" onClick={handleMenuClick}>
            <img class="admin-menuButtonImage" src={menuButton} alt="Menu Button"/>
        </button>
        {isMenuOpen && <AdminMenu onClose={closeMenu} />}
      </div>
    </div>
  );
}

export default AdminHeader;
