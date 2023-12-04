import React, { useState } from 'react';
import './Header.css';
import Menu from './Menu';
import logo from '../Images/logo.png';
import menuButton from '../Images/menuButton.png';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fullName, setFullName] = useState('')
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
    navigate('/homepage');
  }

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  return (
    <div>
      <div className='header'>
        <div className='head1'>
          <img className="headerLogo" src={logo} alt="Movie Logo" onClick={handleHome}/>
          <h1 className='webName' onClick={handleHome}>BigScreenBook</h1>
        </div>
        <div className='head2'>
        </div>
        <div className='head3'>
          <h2 className='hello'>Hello{fullName}!</h2>
          <button className="menuButton" type="button" onClick={handleMenuClick}>
            <img className="menuButtonImage" src={menuButton} alt="Menu Button"/>
          </button>    
        </div>
      </div>
      <div>
        {isMenuOpen && <Menu onClose={closeMenu} />}
      </div>
    </div>
  );
}

export default Header;
