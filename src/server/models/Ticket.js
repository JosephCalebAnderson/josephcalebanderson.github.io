const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    // This is a foreign key for booking
    bookingNum: {
        type: String,
        required: true,
    },
    // This is a foreign key for seat
    seatNum: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum : ['ADULT','CHILD','SENIOR'],
    },
});

module.exports = Ticket = mongoose.model('ticket', TicketSchema);