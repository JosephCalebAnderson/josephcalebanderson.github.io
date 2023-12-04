const express = require('express');
const bookingRouter = express.Router();
const Booking = require('../../models/Booking');
module.exports = bookingRouter;

// Adding a new Booking
bookingRouter.post('/', (req,res) => {
    const {customerEmail, cardNum, cardName, cardCvv, cardExp, billingStreet, billingZipCode, billingCity, billingState} = req.body;
    if (!customerEmail || !cardNum || !cardName || !cardCvv || !cardExp || !billingStreet || !billingZipCode || !billingCity || !billingState) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }
    Booking.create(req.body)
    .then((booking) => res.json(booking))
    .catch((err) => res.status(400).json({ error: 'Unable to add this Booking'}));
});

// Finding Bookings by customerNum
bookingRouter.get('/:customerNum', (req,res) => {
    Booking.find({customerNum: req.params.customerNum})
    .then((booking) => res.json(booking))
    .catch((err) => res.status(404).json({ noitemfound: 'No Bookings found'}));
});

// Deleting a Booking
bookingRouter.delete('/:bookingID', (req,res) => {
    Booking.findByIdAndRemove({_id: req.params.bookingID}, req.body)
    .then((booking) => res.json({ msg: 'Card deleted successfully' }))
    .catch((err) => res.status(404).json({ error: 'No such Card found'}));
});

// The following are not useful now, but they could be useful for the future
bookingRouter.put('/:bookingID', (req,res) => {
    Booking.findByIdAndUpdate({_id: req.params.bookingID}, req.body)
    .then((booking) => res.json({ msg: 'Booking updated successfully' }))
    .catch((err) => res.status(400).json({ error: 'Unable to update this Booking'}));
});