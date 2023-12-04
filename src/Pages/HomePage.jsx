import React, { useEffect, useState } from 'react';
import './HomePage.css';
import logo from '../Images/logo.png';
import searchIcon from '../Images/searchIconPhoto.png'
import menuButton from '../Images/menuButton.png'
import { useNavigate } from 'react-router-dom';

import Header from '../Components/Header';
import { useLocation } from 'react-router-dom';
import { set } from 'mongoose';


function HomePage() {
  const [username, setUsername] = useState('')
  const [isSearchMade, setIsSearchMade] = useState(false);
  const [isNowPlaying, setIsNowPlaying] = useState(true);
  const [movies, setMovies] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerURL, setTrailerURL] = useState('');
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const location = useLocation();
const [filter, setFilter] = useState('all');
  
  var loginData = null;
  if (location.state != null) {
    loginData = location.state.loginData;
    //setUsername(", "+loginData.user.username);
  }
  useEffect(() => {
    if (location.state != null) {
      setUsername(", "+loginData.user.username);
    }

    setIsSearchMade(false);
  }, [isNowPlaying]);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  const handleSearch = async () => {
if (filter == 'title') {
    const title = search;
    let movies = [];
    const response = await fetch(`http://localhost:4000/api/movies/getMovieTitle/${search}`, {
        method: "GET",
    })
    .then((res) => res.json())
    .then((data) => {
      //Store the Search Results
      if (data.Title != null) {
const movieID = data._id;
        const movieTitle = data.Title;
        const movieImageUrl = data.TrailerImage;
        const movieTrailer = data.Trailer;
        const movieRating = data.Rating;
          movies.push({id: movieID, title: movieTitle, rating: movieRating, imageUrl: movieImageUrl, trailer: movieTrailer});
        setErrorMessage('');
      } else {
        setErrorMessage('No results found');
      }
      setMovies(movies);
    });
}
    if (filter == 'category') {
      let movies = [];
      const response = await fetch(`http://localhost:4000/api/movies/getMovieCategory/${search}`, {
          method: "GET",
      })
      .then((res) => res.json())
      .then((data) => {
        //Store the Search Results
        console.log(data);
        for (let i=0; i<data.length; i ++) {
          const movieID = data[i]._id
          const movieTitle = data[i].Title;
          const movieImageUrl = data[i].TrailerImage;
          const movieTrailer = data[i].Trailer;
          const movieRating = data[i].Rating;
          movies.push({id: movieID, title: movieTitle, rating: movieRating, imageUrl: movieImageUrl, trailer: movieTrailer});
          setErrorMessage('');
        }
        if (data.length == 0){
          setErrorMessage('No results found');
        }
        setMovies(movies);
      });
    }
    if (filter == 'date') {
      let movies = [];
      let route = 'http://localhost:4000/api/showings/date/'+search
      await fetch(route, {
          method: "GET",
      })
      .then((res) => res.json())
      .then( async (data) => {
        //Store the Search Results
        console.log(data);
        for (let i=0; i<data.length; i ++) {
          var unique = true;
          for (let j=0; j<movies.length; j++) {
            if (data[i].movieNum == movies.id) {
              unique = false;
            }
          }
          if (unique == true) {
            const response = await fetch('http://localhost:4000/api/movies/id/'+data[i].movieNum,{
              method: "GET",
          });
          const movie = await response.json();
          console.log(movie)
            console.log("Made it here")
            const movieID = movie._id
            const movieTitle = movie.Title;
            const movieImageUrl = movie.TrailerImage;
            const movieTrailer = movie.Trailer;
            const movieRating = movie.Rating;
            movies.push({id: movieID, title: movieTitle, rating: movieRating, imageUrl: movieImageUrl, trailer: movieTrailer});
            setErrorMessage('');
          }
        }
        if (data.length == 0){
          setErrorMessage('No results found');
        }
        console.log(movies);
        setMovies(movies);
      });
    }
    if (filter == 'all') {
      setErrorMessage('Please select a field to search by.');
    }
    setShowTrailer(false);
    setIsSearchMade(true);
  };

  useEffect(() => {
    const addMovies = () => {
      let movies = [];
        fetch(`http://localhost:4000/api/movies/getMovieCurrentlyPlaying/${isNowPlaying}`, {
          method: "GET",
        })
        .then((res) => res.json())
        .then((data) => {
        for (let i = 0; i < data.length; i ++){
          const movieID = data[i]._id
          const movieTitle = data[i].Title;
          const movieImageUrl = data[i].TrailerImage;
          const movieTrailer = data[i].Trailer;
          const movieRating = data[i].Rating;
          movies.push({id: movieID, title: movieTitle, rating: movieRating, imageUrl: movieImageUrl, trailer: movieTrailer});
        }
        setMovies(movies);
      });
    };

    addMovies(); 
  }, [isNowPlaying]);

  useEffect(() => {
    const showingsButton = document.querySelectorAll('.showingsButton');

    showingsButton[0].addEventListener("click", () => {
      showingsButton[0].style.borderBottom = "2px solid white";
      showingsButton[0].style.fontWeight = "bold";
      showingsButton[1].style.borderBottom = "none";
      showingsButton[1].style.fontWeight = "400";
      setIsNowPlaying(true);
    });

    showingsButton[1].addEventListener("click", () => {
      showingsButton[1].style.borderBottom = "2px solid white";
      showingsButton[1].style.fontWeight = "bold";
      showingsButton[0].style.borderBottom = "none";
      showingsButton[0].style.fontWeight = "400";
      setIsNowPlaying(false);
    });

    return () => {
      // Clean up event listeners when component unmounts
      showingsButton[0].removeEventListener("click", setIsNowPlaying);
      showingsButton[1].removeEventListener("click", setIsNowPlaying);
    };
  }, []);

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === 'all') {
      setFilter('all');
    } else if (selectedValue === 'title') {
      setFilter('title');
    } else if (selectedValue === 'category') {
      setFilter('category');
    } else if (selectedValue === 'date') {
      setFilter('date');
    }

  };

  const handleReload = () => {
    window.location.reload();
  }

  return (
    
    <div>
      <Header />
      <div class='search-header'>
      <div class='search-head2'>
        <div class='search-searchContainer'>
          <div class='search-filter-div'>
            <select name="filteroptions" id="filteroptions" onChange={handleFilterChange}>
              <option value="all">Search By</option>
              <option value="title">Title</option>
              <option value="category">Category</option>
              <option value="date">Date</option>
            </select>
          </div>
          <input id='search-searchbar' type="text" placeholder="What do you want to watch?" value={search} onChange={(e) => setSearch(e.target.value)}/>
          <img id="search-searchIcon" src={searchIcon} alt="Search Icon" onClick= {handleSearch}/>
        </div>
        {errorMessage && <p className="homepage-error-message">{errorMessage}</p>}
        {searchResults.length > 0 && (
          <div class="search-results">"
          <h2 class ="h2-search-results">Search Results</h2>
          <ul className="results-ul-list">
            {searchResults.map((result,index) => (
              <li key={index}>
                <img class="search-results-image" src={result.TrailerImage} alt="Movie Image"/>
                <h3 class="search-results-title">{result.Title}</h3>
                <button class="search-results-button" type="button" onClick={() => window.open(result.Trailer)}>Watch Trailer</button>
              </li>
            ))}
          </ul>
      </div>
      )}
      </div>
          </div>
      <div className='showings'>
        <h1>Showings</h1>
        {isSearchMade ? (
          <>
          <h2 className='search-results-header'>Search Results</h2>
          <button className='handle-reload-button' onClick = {handleReload}>Clear Search</button>
          </>
        ) : (
        <>
        <button className="showingsButton" type="button">Now playing</button>
        <button className="showingsButton" type="button">Coming soon</button>
        </>
        )}
      </div>
      <div className='titles'>
        <div className='grid-container'>
          {movies.map((movie, index) => (
            <div className="movieOverview" key={index}>
              <img className="movieImage" src={movie.imageUrl} alt="Movie image" onClick={() => {navigate(`/movieview`, {state: {movieData: {_id: movie.id}, loginData}});}} />
              <div className="movieTitleDiv"><h3 class='homePageMovieTitle'>{movie.title}</h3></div>
              <div className="ratingboxhome"><p className="rating-on-homepage">{movie.rating}</p></div>
              <div className="trailerButtonDiv"><button className="trailerButton" type="button" onClick={() => {setShowTrailer(true); setTrailerURL(movie.trailer);}}>Play Trailer</button> </div>


            </div>
          ))}
        </div>
      </div>
      {showTrailer && (
        <div className="trailer">
          <div className="trailerContainer">
            <span className="closeTrailer" onClick={() => setShowTrailer(false)}>&times;</span>
            <iframe class='window-for-trailer' src={trailerURL} title="Trailer" allowFullScreen></iframe>
            </div>
    </div>
  )}
    </div>
  );
}

export default HomePage;
