import React, { useEffect, useState } from 'react';
import './ManageMovies.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AdminHeader from "../Components/AdminHeader";
import BackButton from '../Components/BackButton';

export const ManageMovies = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    var loginData;

  if (location.state != null) {
    loginData = location.state.loginData;
  } else {
    navigate('/login');
  }
 

    useEffect(() => {
        const addMovies = () => {
          let movies = [];
            fetch(`http://localhost:4000/api/movies`, {
              method: "GET",
            })
            .then((res) => res.json())
            .then((data) => {
              console.log(data)
            for (let i = 0; i < data.length; i ++){
              const movieId = data[i]._id;
              const movieTitle = data[i].Title;
              const movieImageUrl = data[i].TrailerImage;
              const movieTrailer = data[i].Trailer;
              movies.push({id: movieId, title: movieTitle, imageUrl: movieImageUrl, trailer: movieTrailer});
            }
            setMovies(movies);
          });
        };
    
        addMovies(); 
      }, []);

    // Delete movie function
    const handleDelete = (id) => {
      console.log(id)
      console.log("delete movie clicked")
      //If the button is clicked, delete the movie with the id
      try {
        fetch(`http://localhost:4000/api/movies/deleteMovie/${id}`, {
          method: "DELETE",
        });
        // If the movie is deleted, alert the user and refresh the page
        window.location.reload();
      } catch (error) {
        setErrorMessage(error);
        console.error(error);
      }
    }
      
    const handleEdit = (movie) => {
      navigate(`/editmovie`, {state: {movieData: {id: movie.id}, loginData}});
  }
  
    const handleEditShowtimes = (movie) => {
      navigate(`/manageshowtimes`, {state: {movieData: {id: movie.id, title: movie.title}, loginData}});
  }
  

      return (
        <div>
            <AdminHeader/>
            <BackButton />
            <div className="admin-manage-movies">
                <div className="adminShowings">
                <h1 className="manageMoviesMainTitle">Manage Movies</h1>
                </div>
                <div className="adminMovieOverview">
                 <div className="admin-grid-container">
                {movies.map((movie, index) => (
                        <div className="movieOverviewAdmin" key={index}>
                          <img className="movieImageAdmin" src={movie.imageUrl} alt="Movie image" />
                          <div className="movieTitleDivAdmin"><h3 class='homePageMovieTitle'>{movie.title}</h3></div>
                          <div className="buttonContainerAdmin">
                            <button className='adminEditMovie' onClick={() => handleEdit(movie)}>Edit Movie</button>
                            <button className='adminEditShowings' onClick={() => handleEditShowtimes(movie)}>Manage Showings</button>
                            {/* Delete movie button */}
                            <button className='adminDeleteMovie' onClick = {() => handleDelete(movie.id)}>Delete Movie</button>
                          </div>
                        </div>
                      ))}
                </div>
                <button className='adminAddNewMovieButton' onClick={() => navigate(`/addmovies`, {state: {loginData}})}>Add New Movie</button>
                       {errorMessage && <p className="errorMessage-admineditu">{errorMessage}</p>}
                </div>
                </div>
        </div>
      );
} 
