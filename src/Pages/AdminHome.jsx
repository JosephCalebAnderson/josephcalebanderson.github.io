
import React, { useEffect, useState } from 'react';
import './AdminHome.css';
import AdminHeader from "../Components/AdminHeader";
import { useNavigate } from "react-router";
import { useLocation } from 'react-router-dom';

export const AdminHome = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [movieAmount, setMovieAmount] = useState('0');
    const [userAmount, setUserAmount] = useState('0');
    const [roomAmount, setRoomAmount] = useState('0');
    var loginData;
    useEffect(() => {
      if (location.state == null) {
        navigate('/login');
      } else {
        loginData = location.state.loginData;
      }

        const fetchData = async () => {
          let route = 'http://localhost:4000/api/';
          const movieResponse = await fetch(route+'movies', {
              method: 'Get',
              headers: {
                  'Content-Type': 'application/json'
              },
          });
          const movieData = await movieResponse.json();
          console.log(movieData);
          setMovieAmount(movieData.length);
          const userResponse = await fetch(route+'users', {
            method: 'Get',
              headers: {
                  'Content-Type': 'application/json'
              },
          });
          const userData = await userResponse.json();
          setUserAmount(userData.length);
          const roomResponse = await fetch(route+'showrooms', {
            method: 'Get',
              headers: {
                  'Content-Type': 'application/json'
              },
          });
          const roomData = await roomResponse.json();
          setRoomAmount(roomData.length);
        }
        fetchData()
        .catch(console.error);
    }, []);
    const handleManageMovies = async (e) => {
        e.preventDefault()
        navigate('/managemovies', {state: {loginData}});
    }

    const handleManageUsers = async (e) => {
        e.preventDefault()
        navigate('/manageusers', {state: {loginData}});
    }
    const handlePromos = async (e) => {
        e.preventDefault()
        navigate('/managepromos', {state: {loginData}});
    }

    const handleShowings = async (e) => {
        e.preventDefault()
        navigate('/manageshowtimes');
    }

    return (
        <div className="admin-dashboard">
          <AdminHeader />
            <div class="adminhome-title">
          <h1>Admin Dashboard</h1>
          </div>
          <div className="left-panel">
          <div className="admin-section">
          <button class="admin-home-panel-button" type="submit" onClick={handleManageMovies}>Manage Movies</button>
          </div>
          <div className="admin-section">
          <button class="admin-home-panel-button" type="submit" onClick={handleManageUsers}>Manage Users</button>
          </div>
          <div className="admin-section">
          <button class="admin-home-panel-button" type="submit" onClick={handlePromos}>Manage Promotions</button>
          </div>
          </div>
          <div className="summary-panel">
          <h2 className='summary-head'>Summary</h2>
        <ul id="admin-list">
        <li class ="stuff">
    <span class="label">Number of Rooms: </span>
    <span class="value">{roomAmount}</span>
  </li>
  <li class="stuff">
    <span class="label">Number of Movies: </span>
    <span class="value">{movieAmount}</span>
  </li>
  <li class="stuff">
    <span class="label">Number of Users: </span>
    <span class="value">{userAmount}</span>
  </li>
        </ul>
            </div>
        </div>
      );
    };


