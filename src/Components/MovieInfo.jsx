import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import './MovieInfo.css';


function MovieInfo() {

    const [movieInfo, setMovieInfo] = useState([]);
    const location = useLocation();

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
    /* Runtime not required */

    return (
        <div class='movieInfo'>
            <div class='movieDetails'>
                <p class='movieDetailsItem'>{movieInfoRating}</p>
                <p class='movieDetailsItem'>{movieInfoCategory}</p>
            </div>
            <div class='movieViewLine'></div>
            <h1 class='movieTitle'>{movieInfoTitle}</h1>
      </div> 
    );
  }
  
  export default MovieInfo;

