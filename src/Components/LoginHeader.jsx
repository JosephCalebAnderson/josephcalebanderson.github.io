import React from "react";
import { useState } from "react"
import logo from '../Images/logo.png';
import './LoginHeader.css';
import { Link, useNavigate } from "react-router-dom";

function LoginHeader() {
    return (
        <div class='login-header'>
        <div class='login-head1'>
        
          <img class="login-headerLogo" src={logo} alt="Movie Logo"/>
        
          <h1 class='login-webName'>BigScreenBook</h1>
      </div>
        </div>
    );
}

export default LoginHeader;