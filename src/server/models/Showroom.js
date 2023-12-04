const mongoose = require('mongoose');

const ShowroomSchema = new mongoose.Schema({
    numberOfSeats: {
        type: Number
    },
    showroomNum: {
        type: String
    },
});

module.exports = Showroom = mongoose.model('showroom', ShowroomSchema);