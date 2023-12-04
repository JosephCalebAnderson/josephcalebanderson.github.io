const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    // This is a foreign key to Showing
    showNum: {
        type: String,
    },
    // This is a foreign key to User
    customerNum: {
        type: String,
    },
    // This is a foreign key to Promotion
    promotionNum: {
        type: String,
    },
    showRoom: {
        type: String,
    },
    customerEmail: {
        type: String
    },
    cardNum: {
        type: String,
    },
    cardName: {
        type: String,
    },
    cardCvv: {
        type: String,
    },
    cardExp: {
        type: String,
    },
    movieTitle: {
        type: String,
    },
    showDateAndTime: {
        type: String,
    },
    finalPrice: {
        type: String,
    },
    seats: {
        type: String,
    },
    billingStreet: {
        type: String,
    },
    billingZipCode: {
        type: String,
    },
    billingCity: {
        type: String,
    },
    billingState: {
        type: String,
    },
});

module.exports = Booking = mongoose.model('booking', BookingSchema);