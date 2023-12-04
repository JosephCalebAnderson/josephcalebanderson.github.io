const express = require("express");
const bcryptjs = require("bcryptjs");
const moviesRouter = express.Router();
const jwt = require("jsonwebtoken");
const movies = require('../../models/Movie');

module.exports = moviesRouter;

//Temp Post Route
moviesRouter.post('/', (req,res) => {
    Movie.create(req.body)
    .then((movie) => res.json({ msg: 'Movie added successfully' }))
    .catch((err) => res.status(400).json({ error: 'Unable to add this movie'}));
});


//Route to Add Movie to Database
//Title, Category,Director,Cast,Synopsis,Review,trailer,Rating,ShowDates,ShowTimes,CurrentlyPlaying
//Not Required: Review, Trailer, Rating
moviesRouter.post("/addMovie", async (req,res) => {
    try{
        //ensure all fields are entered
        const { Title, Category, Director,Producer, Cast, Synopsis, Reviews, Trailer, TrailerImage, Rating, CurrentlyPlaying } = req.body;
        //create new movie
        const newMovie = new movies({ Title, Category, Director, Producer, Cast, Synopsis, Reviews, Trailer, TrailerImage, Rating, CurrentlyPlaying });
        //save movie to database
        const savedMovie = await newMovie.save();
        console.log(savedMovie.Title);
        res.json(savedMovie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//Update Movie
//Update the information of a movie in the database
//Title, Category,Director,Cast,Synopsis,Review,trailer,Rating,ShowDates,ShowTimes,CurrentlyPlaying
//Not Required: Review, Trailer, Rating
//showingRouter.put('/:movie/:date/:time', (req,res) => {
//    Showing.findOneAndUpdate({movie: req.params.movie}&&{date: req.params.date}&&{time: req.params.time}, req.body)
moviesRouter.put("/updateMovie/:Title", async (req,res) => {
    console.log("Update Movie")
    try{
        const updatedMovie = await movies.findOneAndUpdate({Title: req.params.Title},req.body, {new: true});
        //If no movie with the inputted title, return error
        if (updatedMovie == null) {
            return res
                .status(400)
                .json({ msg: "Movie with the same title does not exist"});
        }
        //Return the updated movie
        console.log(updatedMovie.Title);
        res.json(updatedMovie);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
        
});

//Delete Movie from Database based on the ID
moviesRouter.delete("/deleteMovie/:id", async (req,res) => {
    console.log("Delete Movie by ID")
    try{
        //find movie with inputted id
        const existingMovie = await movies.findByIdAndDelete(req.params.id);
        //if no movie with inputted id, return error
        if (!existingMovie) {
            return res
                .status(400)
                .json({ msg: "Movie with the same id does not exist"});
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Delete Movie entry from the database
moviesRouter.delete("/deleteMovie", async (req,res) => {
    try{
        if (!movies.findOne(req.params.Title)) {
            return res
                .status(400)
                .json({ msg: "Movie with the same title does not exist"});
        }
        //find movie with inputted title
        const existingMovie = await movies.findOneAndDelete(req.params.Title);
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//Get Movies by Category
//Search Database for movies with inputted category and return them
moviesRouter.get("/getMovieCategory/:Category", async (req,res) => {
    try{
        //find movies with inputted category
        const moviesByCategory = await movies.find({Category: req.params.Category});
        //if no movies with inputted category, return error
        if (!moviesByCategory) {
            return res
            .status(404)
            .json({ msg: "No movies with this category"});
        }
        //Return the movies with the inputted category
        res.json(moviesByCategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Temp get movie by title route
moviesRouter.get('/:title', (req,res) => {
    Movie.find({title: req.params.Title})
    .then((movie) => res.json(movie))
    .catch((err) => res.status(404).json({ noitemfound: 'No Movies found'}));
});

//Get Movie Title
moviesRouter.get("/getMovieTitle/:Title", async (req,res) => {
    try{
        //find movie with inputted title
        const movieTitle = await movies.findOne({Title: req.params.Title});
        //if no movie with inputted title, return error
        if (!movieTitle) {
            return res
                .status(400)
                .json({ msg: "Movie with this title does not exist"});
        }
        //Return the movie with the inputted title
        res.json(movieTitle);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//Get Movies by Currently Playing
moviesRouter.get("/getMovieCurrentlyPlaying/:CurrentlyPlaying", async (req,res) => {
    try{
        //Currently Playing is a boolean value
        //Find movies based on the inputted boolean value
        const movieCurrentlyPlaying = await movies.find({CurrentlyPlaying: req.params.CurrentlyPlaying});
        //if no movie with inputted currently playing, return error
        if (!movieCurrentlyPlaying) {
            return res
                .status(400)
                .json({ msg: "Movie with this currently playing does not exist"});
        }
        //Return the movies with the inputted currently playing
        res.json(movieCurrentlyPlaying);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get movie by ID route
moviesRouter.get('/id/:id', (req,res) => {
    movies.findById(req.params.id)
    .then((movie) => res.json(movie))
    .catch((err) => res.status(404).json({ noitemfound: 'This Movie could not be found'}));
});

// Get all movies route
moviesRouter.get('/', (req,res) => {
    movies.find()
    .then((movies) => res.json(movies))
    .catch((err) => res.status(404).json({ noitemsfound: 'No Movie found'}));
});
