import React, { useEffect } from "react";
import './EditShowtimes.css';
import AdminHeader from "../Components/AdminHeader";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import BackButton from '../Components/BackButton';
import {useNavigate} from 'react-router-dom';
import { useParams } from "react-router-dom";
import { set } from "mongoose";

export const EditShowtimes = (props) => {

    const [errorMessage, setErrorMessage] = useState('')
    const [movieNum, setMovieNumber] = useState('');
    const [showRoomNum, setShowRoomNumber] = useState('');
    const [duration, setDuration] = useState('');
    const [showTime, setShowTime] = useState('');
    const [showDate, setShowDate] = useState('');
    const [adultPrice, setAdultPrice] = useState('');
    const [childPrice, setChildPrice] = useState('');
    const [seniorPrice, setSeniorPrice] = useState('');
    const [bookingFee, setBookingFee] = useState('');
    const [noShowtime, setNoShowtime] = useState(false);
    const location = useLocation();
    const movieID = location.state.movieID;
    const showing = location.state.showingData;
    const navigate = useNavigate();


    useEffect(() => {
        setMovieNumber(showing.movieNum);
        setShowRoomNumber(showing.showRoomNum);
        setDuration(showing.duration);
        setShowTime(showing.showTime);
        setShowDate(showing.showDate);
        setAdultPrice(showing.adultPrice);
        setSeniorPrice(showing.seniorPrice);
        setChildPrice(showing.childPrice);
        setBookingFee(showing.bookingFee);
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!movieNum || !showRoomNum || !duration || !showTime || !showDate || !adultPrice || !seniorPrice || !bookingFee) {
           // alert('Please fill out all required fields');
            setErrorMessage('Please fill out all required fields');
            return;
        }
        const showtimeInfo = {
            movieNum,
            showRoomNum,
            duration,
            showTime,
            showDate,
            adultPrice,
            seniorPrice,
            childPrice,
            bookingFee
        };
        try {
            // First check the backend to make sure that there are no conflicts with the showtime
            const response = await fetch(`http://localhost:4000/api/showings/RileysRoute/${showRoomNum}/${showDate}/${showTime}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const Data = await response.json();
            if(Data.error){
                setErrorMessage(Data.error);
                return;
            }
            // If there is a conflict, alert the user and don't add the showtime
            if(Data.length > 0){
                if (Data[0]._id != showing._id) {
                    setErrorMessage('There is already a showing at this time');
                    return;
                }
            }

            // Send the movie data to the backend
            if(Data.length >= 0){
                const response = await fetch(`http://localhost:4000/api/showings/${movieNum}/${showDate}/${showTime}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(showtimeInfo)
                });
                const data = await response.json();
                console.log(data);
                // If the movie is added, Go back one page
                navigate(-1)
        }
        } catch (error) {
            // If the movie is not added, alert the user
            setErrorMessage(error);
        }
  
    }


    return (
        <div id="AdminEditShowtimes">
        <AdminHeader />
        <BackButton />
        <form onSubmit={handleSubmit} className="adminEditShowtimesForm">
            <h3 class="h3-admin-editshow">Edit Showtime Info</h3>
            <label className='adminLabel'>
            Movie Title: {location.state.movieTitle}
            </label>
            <label className='adminLabel'>
            Showroom Number:
            <input type="text" className="textInput" value={showRoomNum} onChange={(e) => setShowRoomNumber(e.target.value)} />
            </label>
            <label className='adminLabel'>
            Duration:
            <input type="text" className="textInput" value={duration} onChange={(e) => setDuration(e.target.value)} />
            </label>
            <label className='adminLabel'>
            Showtimes:
            <select className="textInput dropdown" value={showTime} onChange={(e) => setShowTime(e.target.value)}>
                <option value="12:00">12:00</option>
                <option value="3:00">3:00</option>
                <option value="6:00">6:00</option>
                <option value="9:00">9:00</option>
            </select>
            </label>
            <label className='adminLabel'>
            Show Date:
            <input type="text" className="textInput" value={showDate} onChange={(e) => setShowDate(e.target.value)} />
            </label>
            <label className='adminLabel'>
            Adult Price:
            <input type="text" className="textInput" value={adultPrice} onChange={(e) => setAdultPrice(e.target.value)} />
            </label>
            <label className='adminLabel'>
            Child Price:
            <input type="text" className="textInput" value={childPrice} onChange={(e) => setChildPrice(e.target.value)} />
            </label>
            <label className='adminLabel'>
            Senior Price:
            <input type="text" className="textInput" value={seniorPrice} onChange={(e) => setSeniorPrice(e.target.value)} />
            </label>
            <label className='adminLabel'>
            Booking Fee:
            <input type="text" className="textInput" value={bookingFee} onChange={(e) => setBookingFee(e.target.value)} />
            </label>
            
            <button type="submit" className="adminEditSubmitButton">Save</button>
            {errorMessage && <p className="errorMessage-editShow">{errorMessage}</p>}
        </form>
        </div>
      

    );
};
  