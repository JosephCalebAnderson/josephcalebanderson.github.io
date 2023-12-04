import React, { useEffect } from "react";
import BackButton from "../Components/BackButton";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../Components/AdminHeader";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import './ManageShowtimes.css';
import { set } from "mongoose";

export const ManageShowtimes = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showtimes, setShowtimes] = useState([]);
    const [indvShowTime, setIndvShowTime] = useState('');
    const [showDate, setShowDate] = useState('');
    const [roomNum, setRoomNum] = useState('');
    const [duration, setDuration] = useState('');
    const [bookingFee, setBookingFee] = useState('');
    const [adultPrice, setAdultPrice] = useState('');
    const [childPrice, setChildPrice] = useState('');
    const [seniorPrice, setSeniorPrice] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieID, setMovieID] = useState(location.state.movieData.id);

    // On instantiation, fetch all showings for the movie
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:4000/api/showings/movie/`+location.state.movieData.id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const Data = await response.json();
            setShowtimes(Data);
        }
        fetchData()
            .catch(console.error);

    }, []);

    // Add a new showing
  const addNewShowing = async (e) => {
    e.preventDefault();
    let route = 'http://localhost:4000/api/showings/'
    const showingData = {
        movieNum: movieID,
        showRoomNum: roomNum,
        duration: duration,
        showTime: indvShowTime,
        showDate: showDate,
        adultPrice: adultPrice,
        childPrice: childPrice,
        seniorPrice: seniorPrice,
        bookingFee: bookingFee
    };

    // Make a backend call to check and see if the showtime conflicts with another showtime
    // If it does, alert the user and don't add the showing
    // If it doesn't, add the showing
    // RileysRoute/:showRoom/:date/:time
    if(showDate == '' || roomNum == '' || duration == '' || bookingFee == '' || adultPrice == '' || childPrice == '' || seniorPrice == ''){
        setErrorMessage('Please fill out all fields');
        return;
    }
    else {
    try{
        const response = await fetch(`http://localhost:4000/api/showings/RileysRoute/${roomNum}/${showDate}/${indvShowTime}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const Data = await response.json();

        // Data is an array of objects. If the array is empty, then there is no conflict
        // If the array is not empty, then there is a conflict
        if(Data.length > 0){
            console.log("The showtime already exists")
            setErrorMessage("The showtime already exists");
            return;
        }
        // If the array is empty, then there is no conflict
        if(Data.length == 0){
            console.log(indvShowTime)
            console.log(showingData);
            const response = await fetch(route, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(showingData)
        });
        const Data = await response.json();
        console.log(Data);
        // If there is an error, alert the user
        if (Data.error) {
            setErrorMessage(Data.message);
        } 
        // If there is no error, reload the page
        else { 
            window.location.reload();
        }
    }
    } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
    }
    }
}

    // Delete a showing
    const deleteShowing = async (id) => {
        // Based on the past in id, delete the showing
        console.log(id);
        try {
            const response = await fetch(`http://localhost:4000/api/showings/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const Data = await response.json();
            console.log(Data);
            if (Data.error) {
                setErrorMessage(Data.message);
            } 
            else { 
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        }
    }

    return (
        <div>
            <AdminHeader />
            <BackButton />
            <div className="manage-showings">
            <h2 className="manageSowingsTitle">Manage Showtimes</h2>
            <div className="showings-list">
                <h3 class='showingListHeading'>Showing List for {location.state.movieData.title}</h3>
                {showtimes.map((showing, index) => (
                    <div key={index} className="showing">
                        <div className="showing-instance">
                        <p className="showingTime">Time: {showing.showTime}</p>
                        <p className="showingDate">Date: {showing.showDate}</p>
                        <p className="showingRoom">Showroom: {showing.showRoomNum}</p>
                        <p className="showingSeats">{showing.seats}</p>
                        <button className="user-edit" onClick={() => navigate('/editshowtimes', { state: { showingData: showing, movieTitle: location.state.movieData.title, movieID:location.state.movieData._id} })}>Edit Showing</button> 
                        <button className="user-delete" onClick={() => deleteShowing(showing._id)}>Delete</button>
                    </div>
                    </div>
                ))}

                </div>
                <div className="add-showing">
                    <h3 className="addShowingHeading">Add Showing</h3>
                    <form className="addShowingForm" onSubmit={addNewShowing}>
                        <div className="inputGroup">
                        <label className="addShowingLabel" htmlFor="showTime">Show Time</label>
                        <select className="textInput dropdownManage" value={indvShowTime} onChange={(e) => setIndvShowTime(e.target.value)}>
                            <option value="" disabled selected hidden>Select a time</option>
                            <option value="12:00">12:00</option>
                            <option value="3:00">3:00</option>
                            <option value="6:00">6:00</option>
                            <option value="9:00">9:00</option>
                        </select>
                        
                        </div>
                        <div className="inputGroup">
                        <label className="addShowingLabel" htmlFor="showDate">Show Date</label>
                        <input className="addShowingInput" type="text" id="showDate" name="showDate" value={showDate}onChange={(e) => setShowDate(e.target.value)} />
                        </div>
                        <div className="inputGroup">
                        <label className="addShowingLabel" htmlFor="showRoomNum">Show Room Number</label>
                        <input className="addShowingInput" type="text" id="showRoomNum" name="showRoomNum" value={roomNum} onChange={(e) => setRoomNum(e.target.value)} />
                        </div>
                        <div className="inputGroup">
                        <label className="addShowingLabel" htmlFor="duration">Duration</label>
                        <input className="addShowingInput" type="text" id="duration" name="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
                        </div>
                        <div className="inputGroup">
                        <label className="addShowingLabel" htmlFor="bookingFee">Booking Fee</label>
                        <input className="addShowingInput" type="text" id="bookingFee" name="bookingFee" value={bookingFee} onChange={(e) => setBookingFee(e.target.value)} />
                        </div>
                        <div className="inputGroup">
                        <label className="addShowingLabel" htmlFor="adultPrice">Adult Price</label>
                        <input className="addShowingInput" type="text" id="adultPrice" name="adultPrice" value={adultPrice} onChange={(e) => setAdultPrice(e.target.value)} />
                        </div>
                        <div className="inputGroup">
                        <label className="addShowingLabel" htmlFor="childPrice">Child Price</label>
                        <input className="addShowingInput" type="text" id="childPrice" name="childPrice" value={childPrice} onChange={(e) => setChildPrice(e.target.value)} />
                        </div>
                        <div className="inputGroup">
                        <label className="addShowingLabel" htmlFor="seniorPrice">Senior Price</label>
                        <input className="addShowingInput" type="text" id="seniorPrice" name="seniorPrice" value={seniorPrice} onChange={(e) => setSeniorPrice(e.target.value)} />
                        </div>
                        <button className="addShowingButton" type="submit">Save New Showing</button>
                        {errorMessage && <p className="error-manage-shows">{errorMessage}</p>}
                    </form>
                    </div>  
    </div>
    </div>
    );
};