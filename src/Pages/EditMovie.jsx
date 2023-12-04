import React, { useEffect } from "react";
import './EditMovie.css';
import AdminHeader from "../Components/AdminHeader";
import BackButton from "../Components/BackButton";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import { useParams } from "react-router-dom";
import { set } from "mongoose";

export const EditMovie = (props) => {
// set up the variables to be populated by the backend and edited with the form
    const [errorMessage, setErrorMessage] = useState('')
    const [Title, setTitle] = useState('');
    const [Category, setCategory] = useState('');
    const [Cast, setCast] = useState('');
    const [Director, setDirector] = useState('');
    const [Producer, setProducer] = useState('');
    const [Synopsis, setSynopsis] = useState('');
    const [Rating, setRating] = useState('');
    const [Reviews, setReviews] = useState('');
    const [TrailerImage, setTrailerPhoto] = useState('');
    const [Trailer, setTrailerVideo] = useState('');
    // const [ShowTimes, setShowTimes] = useState('');
    const [CurrentlyPlaying, setIsPlaying] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const movieId = location.state.movieData.id;

// On instantiation, fetch the movie data from the backend and populate the form with it
    useEffect(() => {
        fetch (`http://localhost:4000/api/movies/id/${movieId}`)
        .then((res) => res.json())
        .then((data) => {
            setTitle(data.Title);
            setCategory(data.Category);
            setCast(data.Cast);
            setDirector(data.Director);
            setProducer(data.Producer);
            setSynopsis(data.Synopsis);
            setRating(data.Rating);
            setReviews(data.Reviews);
            setTrailerPhoto(data.TrailerImage);
            setTrailerVideo(data.Trailer);
            // setShowTimes(data.ShowTimes);
            setIsPlaying(data.CurrentlyPlaying);
        });
    }, []);
            // On submit, send the updated movie data to the backend
            const handleSubmit = async (e) => {
                e.preventDefault();
                // Error handling
                // Everything but Reviews, Trailer, trailer image, and rating is required
                if (!Title || !Category || !Cast || !Director || !Producer || !Synopsis) {
                    //alert('Please fill out all required fields');
                    setErrorMessage('Please fill out all required fields');
                    return;
                }
                const movieInfo = {
                    Title,
                    Category,
                    Director,
                    Producer,
                    Cast,
                    Synopsis,
                    Reviews,
                    Trailer,
                    TrailerImage,
                    Rating,
                    CurrentlyPlaying
                };
                try {
                    console.log(movieInfo)
                    //http://localhost:4000/api/movies/addMovie
                    // Push the updated movie data to the backend
                    // /updateMovie/:Title"
                    // update the movie with the given title
                    const response = await fetch(`http://localhost:4000/api/movies/updateMovie/${Title}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(movieInfo)
                    });
                    // Check the response for more error information
                    if (!response.ok) {
                        const errorMessage = await response.json();
                        console.log(errorMessage);
                        //alert("There was an error updating the movie");
                        setErrorMessage('There was an error updating the movie');
                        return;
                    }   
                    const data = await response.json();
                    console.log(data);
                    // Navigate back to the manage movies page
                    navigate(-1)
                } catch (error) {
                    // Alert the user that there was an error
                    //alert('There was an error updating the movie');
                    setErrorMessage('There was an error updating the movie');
                    console.error(error);
                }
            };

        
    return (
        <div id="AdminAddMovies">
           
        <AdminHeader />
        <BackButton />
        <form onSubmit={handleSubmit} className="adminAddMoviesForm">
            <h3 class="h3-admin">Edit Movie</h3>
            <label className='adminLabel'>
            Title:
            <input type="text" className="textInput" value={Title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label className='adminLabel'>
            Category:
            <input type="text" className="textInput" value={Category} onChange={(e) => setCategory(e.target.value)} />
            </label>
            <label className='adminLabel'>
            Cast:
            <input type="text" className="textInput" value={Cast} onChange={(e) => setCast(e.target.value)} />
            </label>
            <label className='adminLabel'>
            Director:
            <input type="text" className="textInput" value={Director} onChange={(e) => setDirector(e.target.value)} />
            </label>
            <label className='adminLabel'>
            Producer:
            <input type="text" className="textInput" value={Producer} onChange={(e) => setProducer(e.target.value)} />
            </label>
            <label className='adminLabel'>
            Synopsis:
            <input type="text" className="textInput" value={Synopsis} onChange={(e) => setSynopsis(e.target.value)} />
            </label>
            <label className='adminLabel'>
            Rating:
            <input type="text" className="textInput" value={Rating} onChange={(e) => setRating(e.target.value)} />
            </label>
            <label className='adminLabel'>
            Reviews:
            <input type="text" className="textInput" value={Reviews} onChange={(e) => setReviews(e.target.value)} />
            </label>
            <label className='adminLabel'>
            Trailer Photo:
            <input type="text" className="textInput" value={TrailerImage} onChange={(e) => setTrailerPhoto(e.target.value)}/>
            </label>
            <label className='adminLabel'>
            Trailer Video:
            <input type="text" className="textInput" value={Trailer} onChange={(e) => setTrailerVideo(e.target.value)} />
            </label>
           {/* <label className='adminLabel'>
            Show Times:
            <input type="text" className="textInput" value={showTimes} onChange={(e) => setShowTimes(e.target.value)} />
            </label>
            */}
            <label className='adminLabel'>
            Is Playing:
            <input type="checkbox" checked={CurrentlyPlaying} onChange={(e) => setIsPlaying(e.target.checked)} className="checkboxInput" />
            </label>
            <button type="submit" className="adminSubmitButton">Save Changes</button>
            {errorMessage && <p className="errors-editmovie">{errorMessage}</p>}
        </form>
        </div>

    );
};