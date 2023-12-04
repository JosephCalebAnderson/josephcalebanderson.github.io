import React, { useEffect, useState } from 'react';
import './Confirmation.css';
import Header from '../Components/Header';
import SmallMovieInfo from '../Components/SmallMovieInfo';
import confirmationCheck from '../Images/confirmationCheck.png';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

function Confirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const loginData = location.state.loginData;
  const movieData = location.state.movieData;
  // Possibly include this in the confirmation screen.
  const cardNum = location.state.cardNum;
  //This will need to be updated based on user selection
  var bookingData = location.state.bookingData;
  var ticketString = '';
  if (bookingData.ticketCounts.Adult != 0) {
    ticketString = ticketString + 'Adults: ' + bookingData.ticketCounts.Adult + ', ';
  }
  if (bookingData.ticketCounts.Child != 0) {
    ticketString = ticketString + 'Children: ' + bookingData.ticketCounts.Child + ', ';
  }
  if (bookingData.ticketCounts.Senior != 0) {
    ticketString = ticketString + 'Seniors: ' + bookingData.ticketCounts.Senior + ', ';
  }

  const handleBackToHome = async (e) => {
    e.preventDefault()

    navigate('/homepage', {state: {loginData}});
  }

  return (
    <div>
      <Header />
      <div className='confirmationTopPart'>
        <img src={confirmationCheck} alt="confirmation check" className="confirmationCheckMark" />
        <h2 class='confirmThankYou'>Thank you for your order</h2>
        <p class='confirmSeeYou'>See you at the theater</p>
        <p class='confirmBookingNum'>Booking number: <span class="underlineBookingNum">{location.state.bookingID}</span></p>
      </div>
      <SmallMovieInfo />
      <div className='confirmationBottomPart'>
        <p class='confirmSeatSelection'>{ticketString} Seats: {location.state.seats}</p>
        <p class='confirmPrice'>Order Total: <span class="boldOrderPrice">${location.state.price}</span></p>
        <p class='confirmSentToEmail'>A confirmation of your order has been sent to your email.</p>
        <button class="confirmBackToHomeButton" type="button" onClick={handleBackToHome} >TAKE ME BACK TO THE HOME PAGE</button>
      </div>
    </div>
  );
}

export default Confirmation;
