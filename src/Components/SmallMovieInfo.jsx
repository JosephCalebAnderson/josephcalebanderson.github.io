import React, { useEffect, useState } from 'react';
import './SmallMovieInfo.css';
import Oppenheimer from '../Images/Oppenheimer.jpg';
import { useLocation } from "react-router-dom";

function SmallMovieInfo() {
    const location = useLocation();
    const [movieInfo, setMovieInfo] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          let route = 'http://localhost:4000/api/movies/id/'+location.state.movieData._id;
          const Response = await fetch(route, {
              method: 'Get',
              headers: {
                  'Content-Type': 'application/json'
              },
          });
          const Data = await Response.json();
          setMovieInfo(Data);
        }
        fetchData()
        .catch(console.error);
      }, []);


    const movieInfoTitle = movieInfo.Title;
    const movieInfoRating = movieInfo.Rating;
    const movieInfoCategory = movieInfo.Category;
    // This needs to be passed from the previous screen
    const dateString = location.state.bookingData.showing.showDate.substring(0,3)+' '+location.state.bookingData.showing.showDate.substring(3);
    const movieInfoShowtime = dateString + ' at ' + location.state.bookingData.showing.showTime;

    return (
        <div class='small-movieInfo'>
            <img src={movieInfo.TrailerImage} alt="Oppenheimer" className="small-moviePoster" />
            <div class='small-movieDetails'>
                <p class='small-movieDetailsItem'>{movieInfoRating}</p>
                <p class='small-movieDetailsItem'>{movieInfoCategory}</p>
            </div>
            <div class='small-movieViewLine'></div>
            <h1 class='small-movieTitle'>{movieInfoTitle}</h1>
            <p className="small-movieShowtime">{movieInfoShowtime}</p>
      </div> 
    );
  }
  
  export default SmallMovieInfo;

