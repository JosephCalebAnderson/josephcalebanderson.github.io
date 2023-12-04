const express = require('express');
const theaterRouter = express.Router();
const Theater = require('../../models/Theater');
module.exports = theaterRouter;

// Add a new theater
theaterRouter.post('/', (req,res) => {
    Theater.create(req.body)
    .then((theater) => res.json({ msg: 'Theater added successfully' }))
    .catch((err) => res.status(400).json({ error: 'Unable to add this Theater'}));
});

// delete a theater, they are found by their id.
theaterRouter.delete('/:theaterID', (req,res) => {
    Theater.findByIdAndRemove({_id: req.params.theaterID}, req.body)
    .then((theater) => res.json({ msg: 'Theater deleted successfully' }))
    .catch((err) => res.status(404).json({ error: 'No such Theater found'}));
});

// get the theater associated with the given theaterID
theaterRouter.get('/:theaterID', (req,res) => {
    Theater.findById({_id: req.params.theaterID})
    .then((theater) => res.json(theater))
    .catch((err) => res.status(404).json({ noitemfound: 'No Theater found'}));
});

// get the theater associated with the given showroomID
theaterRouter.get('/showroom/:showroomNum', (req,res) => {
    Theater.find({showroomNum: req.params.showroomNum})
    .then((theater) => res.json(theater))
    .catch((err) => res.status(404).json({ noitemfound: 'No Bookings found'}));
});

// get the theater associated with the given showingID
theaterRouter.get('/showing/:showingNum', (req,res) => {
    Theater.find({showingNum: req.params.showingNum})
    .then((theater) => res.json(theater))
    .catch((err) => res.status(404).json({ noitemfound: 'No Bookings found'}));
});

// update a theater
theaterRouter.put('/:theaterID', (req,res) => {
    Theater.findByIdAndUpdate({_id: req.params.theaterID}, req.body)
    .then((theater) => res.json({ msg: 'Theater updated successfully' }))
    .catch((err) => res.status(400).json({ error: 'Unable to update this Theater'}));
});