import React, { useEffect, useState } from 'react';
import './SeatBooking.css';
import Header from '../Components/Header';
import BackButton from '../Components/BackButton';
import SmallMovieInfo from "../Components/SmallMovieInfo";
import Screen from '../Images/Screen.svg';
import Selected from '../Images/Selected.svg';
import Available from '../Images/Available.svg';
import Taken from '../Images/Taken.svg';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { set } from 'mongoose';

export default function Homescreen() {
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const loginData = location.state.loginData;
  const movieData = location.state.movieData;
  const bookingData = location.state.bookingData;
  const ticketAmounts = bookingData.ticketCounts;
  const totalNumTickets = ticketAmounts.Adult + ticketAmounts.Child + ticketAmounts.Senior;
  //This will need to be updated based on user selection
  
  // This contains the seats availibility in an array with 60 elements
  const seatAvailibilty = bookingData.showing.seats;

  const numRows = 6;
  const seatsPerRow = [10, 10, 10, 10, 10, 10];

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [numSeatsSelected, setNumSeatsSelected] = useState(0);

  const seatElements = [];

  const navigate = useNavigate();
  const navigateBack = useNavigate();

  const handleOrder = async (e) => {
    e.preventDefault()

    if (numSeatsSelected === totalNumTickets) {
      navigate('/order', { state: { movieData, loginData, bookingData, selectedSeats } });
    } else {
      console.error("Please select the correct number of seats.");
      setErrorMessage("Please select the correct number of seats.");
    }
  }

  const handleBack = async (e) => {
    e.preventDefault()
    navigateBack(-1);
  }

  for (let row = 0; row < numRows; row++) {
    const rowSeats = seatsPerRow[row];
    const rowLetter = String.fromCharCode(65 + row); // Convert 0 to 'A', 1 to 'B', etc.

    for (let seatNum = 1; seatNum <= rowSeats; seatNum++) {
      const seatId = `${rowLetter}${seatNum}`;
      const isSeatSelected = selectedSeats.includes(seatId);
      const seatIdDecimal = convertSeatStringToNumber(seatId);
      
      seatElements.push(
        <div
          className={`seat ${seatAvailibilty[seatIdDecimal] ? (isSeatSelected ? 'selectedSeat' : '') : 'takenSeat'}`}
          key={seatId}
          onClick={() => handleSeatClick(seatId, seatIdDecimal)}
        ></div>
      );
      
    }
  }

  const handleSeatClick = (seatId) => {
    const seatIdDecimal = convertSeatStringToNumber(seatId);
    
    const isSelected = selectedSeats.includes(seatId);
    const isAvailable = seatAvailibilty[seatIdDecimal];

    if (!isSelected && isAvailable && numSeatsSelected < totalNumTickets) {
      setSelectedSeats([...selectedSeats, seatId]);
      setNumSeatsSelected(numSeatsSelected + 1);

    } else if (isSelected) {
      const updatedSeats = selectedSeats.filter((seat) => seat !== seatId);
      setSelectedSeats(updatedSeats);
      setNumSeatsSelected(numSeatsSelected - 1);
    }
  };

  function convertSeatStringToNumber(seatString) {
    const letterToNumber = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5 };
    
    const letter = seatString.charAt(0);
    const number = parseInt(seatString.substring(1), 10);
  
    if (letterToNumber.hasOwnProperty(letter) && !isNaN(number) && number >= 1 && number <= 10) {
      return letterToNumber[letter] * 10 + (number - 1);
    } else {
      console.error("Invalid seat string");
      return null;
    }
  }

  return (
    <div>
      <Header />
      <BackButton />
      <SmallMovieInfo />
      <div className="bookingContainer">
        <h2 className='selectSeatsTitle'>Select Seats</h2>
        <img src={Screen} alt="Screen" className="screen-svg" />
        <h2 className='screenLabel'>SCREEN</h2>

        <div className="seats">
          {seatElements}
        </div>

        <div className="legend">
          <img src={Available} alt="Screen" className="occupancyIndicator" />
          <p className="occupancy">Available</p>
          <img src={Taken} alt="Screen" className="occupancyIndicator" />
          <p className="occupancy">Taken</p>
          <img src={Selected} alt="Screen" className="occupancyIndicator" />
          <p className="occupancy">Selected</p>
        </div>

        <div className="statement">
          <p>Selected: {selectedSeats.join(', ')}</p>
        </div>
        <div className="statement-two">
          <h3>{numSeatsSelected} Selected, {totalNumTickets - numSeatsSelected} Remaining</h3>
        </div>
        <button type="submit" className='bookingNextButton' onClick={handleOrder} disabled={numSeatsSelected !== totalNumTickets}>NEXT</button>
        {errorMessage && <p className="seating-error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}
