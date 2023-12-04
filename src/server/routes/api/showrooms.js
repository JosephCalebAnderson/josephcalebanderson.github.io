const express = require('express');
const showroomRouter = express.Router();
const Showroom = require('../../models/Showroom');
module.exports = showroomRouter;

// Add a new showroom
showroomRouter.post('/', (req,res) => {
    Showroom.create(req.body)
    .then((showroom) => res.json({ msg: 'Showroom added successfully' }))
    .catch((err) => res.status(400).json({ error: 'Unable to add this Showroom'}));
});

// delete a showroom, they are found by their id.
showroomRouter.delete('/:showroomID', (req,res) => {
    Showroom.findByIdAndRemove({_id: req.params.showroomID}, req.body)
    .then((showroom) => res.json({ msg: 'Showroom deleted successfully' }))
    .catch((err) => res.status(404).json({ error: 'No such Showroom found'}));
});

// get the showroom associated with the given showroomID
showroomRouter.get('/:showroomID', (req,res) => {
    Showroom.findById({_id: req.params.showroomID})
    .then((showroom) => res.json(showroom))
    .catch((err) => res.status(404).json({ noitemfound: 'No Showroom found'}));
});

// update a showroom
showroomRouter.put('/:showroomID', (req,res) => {
    Showroom.findByIdAndUpdate({_id: req.params.showroomID}, req.body)
    .then((showroom) => res.json({ msg: 'Showroom updated successfully' }))
    .catch((err) => res.status(400).json({ error: 'Unable to update this Showroom'}));
});

// get all showrooms route
showroomRouter.get('/', (req,res) => {
    Showroom.find()
    .then((showroom) => res.json(showroom))
    .catch((err) => res.status(404).json({ noitemsfound: 'No Movie found'}));
});