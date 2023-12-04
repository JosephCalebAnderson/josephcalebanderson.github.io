const express = require('express');
const showingRouter = express.Router();
const Showing = require('../../models/Showing');
module.exports = showingRouter;

// Need to add the routes here as soon as possible.

// Get Route filtered by movie
showingRouter.get('/movie/:movie', (req,res) => {
    Showing.find({movieNum: req.params.movie})
    .then((showing) => res.json(showing))
    .catch((err) => res.status(404).json({ noitemfound: 'No Showings found'}));
});

// Get Route filtered by date
showingRouter.get('/date/:date', (req,res) => {
    Showing.find({showDate: req.params.date})
    .then((showing) => res.json(showing))
    .catch((err) => res.status(404).json({ noitemfound: 'No Showings found'}));
});

// Get Route filtered by movie and date
showingRouter.get('/:movie/:date', (req,res) => {
    Showing.find({movieNum: req.params.movie, showDate: req.params.date})
    .then((showing) => res.json(showing))
    .catch((err) => res.status(404).json({ noitemfound: 'No Showings found'}));
});

// Get Route filtered by movie, date, and time
showingRouter.get('/:movie/:date/:time', (req,res) => {
    Showing.find({movieNum: req.params.movie, showDate: req.params.date, showTime: req.params.time})
    .then((showing) => res.json(showing))
    .catch((err) => res.status(404).json({ noitemfound: 'No Showings found'}));
});

// Adding a New Showing
showingRouter.post('/', (req,res) => {
    Showing.create(req.body)
    .then((showing) => res.json(showing))
    .catch((err) => res.status(400).json({ error: 'Unable to add this showing'}));
});

// Update Showing Route
showingRouter.put('/:movie/:date/:time', (req,res) => {
    Showing.findOneAndUpdate({movieNum: req.params.movie, showDate: req.params.date, showTime: req.params.time}, req.body)
    .then((showing) => res.json(showing))
    .catch((err) => res.status(400).json({ error: 'Unable to update this Showing'}));
});

// Delete Showing Route
showingRouter.delete('/:movie/:date/:time', (req,res) => {
    Showing.findOneAndRemove({movie: req.params.movie}&&{date: req.params.date}&&{time: req.params.time}, req.body)
    .then((showing) => res.json({ msg: 'Showing deleted successfully' }))
    .catch((err) => res.status(404).json({ error: 'No such Showing found'}));
});

// Delete Showing Route by Showing ID
showingRouter.delete('/:id', (req,res) => {
    Showing.findByIdAndRemove(req.params.id, req.body)
    .then((showing) => res.json({ msg: 'Showing deleted successfully' }))
    .catch((err) => res.status(404).json({ error: 'No such Showing found'}));
});

// Get Route filtered by showRoom, date, and time. Used for ensuring showings don't overlap
showingRouter.get('/RileysRoute/:showRoom/:date/:time', (req,res) => {
    Showing.find({showRoomNum: req.params.showRoom, showDate: req.params.date, showTime: req.params.time})
    .then((showing) => res.json(showing))
    .catch((err) => res.status(404).json({ noitemfound: 'No Showings found'}));
});