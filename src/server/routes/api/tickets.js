const express = require('express');
const ticketRouter = express.Router();
const Ticket = require('../../models/Ticket');
module.exports = ticketRouter;

// create a new ticket
ticketRouter.post('/', (req,res) => {
    Ticket.create(req.body)
    .then((ticket) => res.json({ msg: 'Ticket added successfully' }))
    .catch((err) => res.status(400).json({ error: 'Unable to add this Ticket'}));
});

// delete a ticket, they are found by their id.
ticketRouter.delete('/:ticketID', (req,res) => {
    Ticket.findByIdAndRemove({_id: req.params.ticketID}, req.body)
    .then((ticket) => res.json({ msg: 'Ticket deleted successfully' }))
    .catch((err) => res.status(404).json({ error: 'No such Ticket found'}));
});

// get the ticket associated with the given bookingNum
ticketRouter.get('/:bookingNum', (req,res) => {
    Ticket.findOne({bookingNum: req.params.bookingNum})
    .then((ticket) => res.json(ticket))
    .catch((err) => res.status(404).json({ noitemfound: 'No Ticket found'}));
});

// update a ticket
ticketRouter.put('/:ticketID', (req,res) => {
    Ticket.findByIdAndUpdate({_id: req.params.ticketID}, req.body)
    .then((ticket) => res.json({ msg: 'Ticket updated successfully' }))
    .catch((err) => res.status(400).json({ error: 'Unable to update this Ticket'}));
});