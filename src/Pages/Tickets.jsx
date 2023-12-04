import React, { useEffect, useState } from 'react';
import './Tickets.css';
import Header from '../Components/Header';
import BackButton from '../Components/BackButton';
import MovieInfo from '../Components/MovieInfo';
import leftChevron from '../Images/leftChevron.png';
import rightChevron from '../Images/rightChevron.png';
import increaseTicket from '../Images/increaseTicket.png';
import decreaseTicket from '../Images/decreaseTicket.png';
import Oppenheimer from '../Images/Oppenheimer.jpg';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

function Tickets() {
  const location = useLocation();
    const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with the current date
    const [showings, setShowings] = useState([]);
    const [errorMessage, setErrorMessage] = useState('')
    const [selectedShowing, setSelectedShowing] = useState();
    const [ticketPriceArray, setTicketPriceArray] = useState(["$0.00", "$0.00", "$0.00"]);
    const navigate = useNavigate();
    const navigateBack = useNavigate();
    const loginData = location.state.loginData;
    const movieData = location.state.movieData;
    const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const monthOfYear = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    // This will need to be changed based on user selection
    var bookingData = {showing: null, ticketCounts: null};
    useEffect(() => {
        if (loginData == null) {
          navigate('/login');
        }
    }, []);

  // Function to handle date change, for example when clicking left or right chevrons
  const handleDateChange = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + increment);
    setSelectedDate(newDate);
    renderDateBoxes();
    clearDateBoxes();
  };

  // Function to handle getting tickets route to next page
  const handleGetTickets = async (e) => {
    e.preventDefault()
    if (ticketCounts.Adult == 0 && ticketCounts.Child == 0 && ticketCounts.Senior == 0) {
      setErrorMessage("At Least One Ticket must be Selected");
    } else if (selectedShowing != null){
    bookingData.ticketCounts = ticketCounts;
    bookingData.showing = selectedShowing;
    console.log(bookingData);
    // Error checking will need to be placed here in case tickets are not selected.
    navigate('/seatbooking', {state: {movieData, loginData, bookingData}});
    }
    if (selectedShowing == null) {
      setErrorMessage("Please Select a Showing")
    }
  }


  // Function to render the date boxes
  const renderDateBoxes = () => {
    //const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    //const monthOfYear = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    
    const handleDateBoxClick = (dateString, index) => {
      setErrorMessage('');
      clearDateBoxes();
      const dateBoxSelected = document.querySelectorAll('.dateBox');
      dateBoxSelected[index].style.background = "#BE123C";
      setMovieTimes(dateString);
      setTicketCounts({
        Adult: 0,
        Child: 0,
        Senior: 0,
      });
      setSelectedShowing(null);
      clearMovieShowtimeStyle();
    };

    const dateBoxes = [];
    
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() + i);
      // We might implement day later if needed, but for now we will ignore it.
      const day = dayOfWeek[newDate.getDay()];
      const month = monthOfYear[newDate.getMonth()];
      const date = newDate.getDate();

      const dateString = '' + month + date;

      dateBoxes.push(
        <div className="dateBox" key={i} onClick={() => handleDateBoxClick(dateString, i)}>
          <p className='day'>{day}</p>
          <p className='month'>{month}</p>
          <p className='date'>{date}</p>
        </div>
      );
    }
    return dateBoxes;
  };

  const clearDateBoxes = () => {
    const dateBoxes = document.querySelectorAll('.dateBox');
    for (let i = 0; i < 7; i++) {
      dateBoxes[i].style.background = "#4F4F52";
    }
  }

  const renderMovieTimes = (dateString) => {
    //const month = monthOfYear[selectedDate.getMonth()];
    //const date = selectedDate.getDate();
    //const dateString = '' + month + date;
    let movieTimes = [];
    let showingIDs = [];
    for (let j = 0; j < showings.length; j ++) {
      movieTimes.push(showings[j].showTime);
    }
    
    const movieTimeBoxes = [];

    if (movieTimes.length > 0) {
      movieTimeBoxes.push(<h2 class='ticketContentHeader'>Select Showtime</h2>);
    } else {
      movieTimeBoxes.push(<h2 class='ticketContentHeader nobold'>No Showtimes Available</h2>);
    }
    
    for (let i = 0; i < movieTimes.length; i++) {
      const movieTime = movieTimes[i];
      const showing = showings[i];
  
      movieTimeBoxes.push(
        <button class="selectTimeButton" type="button" onClick={() => handleShowtimeClick(showing, i)}>{movieTime}</button>
      );
    }
    return movieTimeBoxes;
  };

  const setMovieTimes = async (dateString) => {
    let route = 'http://localhost:4000/api/showings/' + movieData._id + '/' + dateString;
    const Response = await fetch(route, {
      method: 'Get',
      headers: {
          'Content-Type': 'application/json'
      },
  });
  const Data = await Response.json();
    console.log(Data);
    setShowings(Data);
    renderMovieTimes(dateString);
  }

  const handleShowtimeClick = (showing, i) => {
    console.log(showing)
    setErrorMessage('');
    setSelectedShowing(showing);
    setTicketPriceArray(['$' + showing.adultPrice, '$' + showing.childPrice, '$' + showing.seniorPrice]);
    clearMovieShowtimeStyle();
    const timeBoxSelected = document.querySelectorAll('.selectTimeButton');
    timeBoxSelected[i].style.background = "#BE123C";
  }

  const clearMovieShowtimeStyle = () => {
    const timeBoxSelected = document.querySelectorAll('.selectTimeButton');
    for (let i = 0; i < timeBoxSelected.length; i++) {
      timeBoxSelected[i].style.background = "#4F4F52";
    }
  }


    const [ticketCounts, setTicketCounts] = useState({
        Adult: 0,
        Child: 0,
        Senior: 0,
      });
    
      // Function to handle increasing ticket count
      const handleIncrease = (ticketType) => {
        setTicketCounts((prevCounts) => ({
          ...prevCounts,
          [ticketType]: prevCounts[ticketType] + 1,
        }));
      };
    
      // Function to handle decreasing ticket count
      const handleDecrease = (ticketType) => {
        if (ticketCounts[ticketType] > 0) {
          setTicketCounts((prevCounts) => ({
            ...prevCounts,
            [ticketType]: prevCounts[ticketType] - 1,
          }));
        }
      };

      const ticketTypeArray = ["Adult", "Child", "Senior"];

      const renderTicketPrices = () => {
        if (selectedShowing) {
          const ticketSelectionBoxes = ticketTypeArray.map((ticketType, index) => (
            <div id="numberOfTicketsBox" key={index}>
              <p className='ticketType'>{ticketType}</p>
              <p className='ticketPrice'>{ticketPriceArray[index]}</p>
              <button className="decreaseTicketButton" type="button" onClick={() => handleDecrease(ticketType)}>
                <img className="decreaseTicket" src={decreaseTicket} alt="Decrease Icon"/>
              </button>
              <h3 className='numberOfTickets'>{ticketCounts[ticketType]}</h3>
              <button className="increaseTicketButton" type="button" onClick={() => handleIncrease(ticketType)}>
                <img className="increaseTicket" src={increaseTicket} alt="Increase Icon"/>
              </button>
            </div>
          ));
          return (
            <div>
              <h2 class='ticketContentHeader'>Select Tickets</h2>
              {ticketSelectionBoxes}
              <button class="ticketNextButton" type="button" onClick={handleGetTickets} >NEXT</button>
            </div>
          );
        }
        // Return null if no time is selected
        return null;
      };
    
      
      


  return (
    <div>
      <Header />
      <BackButton />
      <MovieInfo />
      <div class='ticketWrap'>
      <div class='ticketContent'>
        <h2 class='ticketContentHeader firstticketheader'>Select Date</h2>
        <div class='dateCarousel'>
          <button class="leftChevronButton" type="button">
            <img class="leftChevron" src={leftChevron} alt="Left Chevron" onClick={() => handleDateChange(-7)}/>
          </button>
          <div class='dateCarouselBoxes'>
            {renderDateBoxes()}
          </div>
          <button class="rightChevronButton" type="button">
            <img class="rightChevron" src={rightChevron} alt="Right Chevron" onClick={() => handleDateChange(7)}/>
          </button>
        </div>

      
        <div id='movieTimes'>
            {renderMovieTimes()}
        </div>
  
        <div class='numberOfTicketsSection'>
            {renderTicketPrices()}
        </div>
        {errorMessage && <p className="tickets-error-message">{errorMessage}</p>}

      </div>
      <div class='ticketsOverlay'>
          <img class="ticketsMoviePoster" src={location.state.movieData.TrailerImage} alt="movie poster"/>
      </div>
    </div>
    </div>
  );
}

export default Tickets;

