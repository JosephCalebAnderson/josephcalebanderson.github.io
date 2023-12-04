const mongoose = require('mongoose');

const SeatSchema = new mongoose.Schema({
// This is a foreign key to the showRoom
showroomID: {
    type: String,
    required: true,
},
seatNum: {
    type: String,
    required: true,
},
handicap: {
    type: Boolean,
},
available: {
    type: Boolean,
},
});

module.exports = Seat = mongoose.model('seat', SeatSchema);