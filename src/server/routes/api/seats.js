const express = require('express');
const seatRouter = express.Router();
const Seat = require('../../models/Seat');
module.exports = seatRouter;

// Add a new seat
seatRouter.post('/', (req,res) => {
    Seat.create(req.body)
    .then((seat) => res.json({ msg: 'Seat added successfully' }))
    .catch((err) => res.status(400).json({ error: 'Unable to add this Seat'}));
});

// delete a seat, they are found by their id.
seatRouter.delete('/:seatID', (req,res) => {
    Seat.findByIdAndRemove({_id: req.params.seatID}, req.body)
    .then((seat) => res.json({ msg: 'Seat deleted successfully' }))
    .catch((err) => res.status(404).json({ error: 'No such Seat found'}));
});

// get the seat associated with the given showroomID
seatRouter.get('/:showroomID', (req,res) => {
    Seat.find({showroomID: req.params.showroomID})
    .then((seat) => res.json(seat))
    .catch((err) => res.status(404).json({ noitemfound: 'No Seat found'}));
});

// update a seat
seatRouter.put('/:seatID', (req,res) => {
    Seat.findByIdAndUpdate({_id: req.params.seatID}, req.body)
    .then((seat) => res.json({ msg: 'Seat updated successfully' }))
    .catch((err) => res.status(400).json({ error: 'Unable to update this Seat'}));
});