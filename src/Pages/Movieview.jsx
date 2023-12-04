import React, { useEffect, useState } from 'react';
import './Movieview.css';
import Header from '../Components/Header';
import BackButton from '../Components/BackButton';
import MovieInfo from '../Components/MovieInfo';
import star from '../Images/Star.png';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

function MovieView() {

  const [movieInfo, setMovieInfo] = useState([]);
  const location = useLocation();
  var loginData = null;
  if (location.state != null) {
    loginData = location.state.loginData;
  }
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

  const synopsisContent = movieInfo.Synopsis;
  const imdbRating = movieInfo.Reviews;
  const director = movieInfo.Director;
  const producer = movieInfo.Producer;
  const moviepostersrc = movieInfo.TrailerImage;
  const cast = movieInfo.Cast;


  const navigate = useNavigate();
  const navigateBack = useNavigate();

  const handleGetTickets = async (e) => {
    e.preventDefault()

    navigate('/tickets', {state: {movieData: movieInfo, loginData}});
  }

  const handleBack = async (e) => {
    e.preventDefault()

    navigateBack(-1);
  }

  return (
    <div>
      <Header />
      <BackButton />
      <MovieInfo />
      <div class='movieContent'>
        <div id='movieContentLeftBox'>
        <div class='trailerBox'>
          <iframe id='window-for-trailer-movie' src={movieInfo.Trailer} title="Trailer" allowFullScreen></iframe>
        </div>
        <h3 class='movieContentHeading'>Synopsis</h3>
        <p className='synopsisContent'>{synopsisContent}</p>
        <h3 class='movieContentHeading'>Reviews</h3>
        <div class='reviews'>
            <div class='individualRating'>
                <p class='reviewType'>IMDb Rating</p>
                <img class="star" src={star} alt="Star Icon"/>
                <h2 class='ratingNumber'>{imdbRating}</h2>
            </div>

        </div>
        </div>
        <div class='rightContentBox'>
            <div class='rightContent'>
                <h2 class='movieDirectorHeading'>Director</h2>
                <p class='movieDirectorName'>{director}</p>
                <h2 class='movieDirectorHeading'>Producer</h2>
                <p class='movieDirectorName'>{producer}</p>
                <h2 class='movieDirectorHeading'>Cast</h2>
                <p class='movieDirectorName'>{cast}</p>
            </div>
        </div>
        <div class='overlay'>
            <img class="movieviewMoviePoster" src={moviepostersrc} alt="movie poster"/>
            <button class="getTicketsButton" type="button" onClick={handleGetTickets}>GET TICKETS</button>
        </div>
      </div>
    </div>
  );
}

export default MovieView;
