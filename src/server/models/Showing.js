const mongoose = require('mongoose');

const ShowingSchema = new mongoose.Schema({
    // This is a foreign key to match this to a movie
    movieNum: {
        type: String,
        required: true,
    },
    // This is a foreign key to match this to a showroom.
    showRoomNum: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
    },
    showTime: {
        type: String,
        required: true,
    },
    showDate: {
        type: String,
        required: true,
    },
    adultPrice: {
        type: String,
    },
    childPrice: {
        type: String,
    },
    seniorPrice: {
        type: String,
    },
    bookingFee: {
        type: String,
    },
    //The following could be used for implementation if needed
    seats: {
        type: Array,
        default: [true, true, true, true, true, true, true, true, true, true,
            true, true, true, true, true, true, true, true, true, true,
            true, true, true, true, true, true, true, true, true, true,
            true, true, true, true, true, true, true, true, true, true,
            true, true, true, true, true, true, true, true, true, true,
            true, true, true, true, true, true, true, true, true, true],
    },
});

module.exports = Showing = mongoose.model('showing', ShowingSchema);