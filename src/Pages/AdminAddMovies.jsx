import React from "react";
import './AdminAddMovies.css';
import AdminHeader from "../Components/AdminHeader";
import { useState } from "react";
import BackButton from '../Components/BackButton';
import {useNavigate} from 'react-router-dom';
import { set } from "mongoose";

export const AdminAddMovies = (props) => {

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
    const [ShowTimes, setShowTimes] = useState('');
    const [CurrentlyPlaying, setIsPlaying] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


            const handleSubmit = async (e) => {
                e.preventDefault();
                if (!Title || !Category || !Director || !Producer || !Cast || !Synopsis || CurrentlyPlaying == null ) {
                  // alert('Please fill out all fields');
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
                    // Send the movie data to the backend
                    console.log(movieInfo)
                    //http://localhost:4000/api/movies/addMovie
                    const response = await fetch('http://localhost:4000/api/movies/addMovie', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(movieInfo)
                    });
                    const data = await response.json();
                    console.log(data);
                    // Return to the admin home page
                    navigate(-1)
                } catch (error) {
                    // If the movie is not added, alert the user
                    console.error(error);
                    setErrorMessage(error);
                    //alert(error);
                }
            };

        
    return (
        <div id="AdminAddMovies">
        <AdminHeader />
        <BackButton />
        <form onSubmit={handleSubmit} className="adminAddMoviesForm">
            <h3 class="h3-admin">Add Movie</h3>
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
            <label className='adminLabel'>
            Is Playing:
            <input type="checkbox" checked={CurrentlyPlaying} onChange={(e) => setIsPlaying(e.target.checked)} className="checkboxInput" />
            </label>
            <button type="submit" className="adminSubmitButton">Add Movie</button>
            {errorMessage && <p className="addmov-error-message">{errorMessage}</p>}
        </form>
        </div>

    );
};