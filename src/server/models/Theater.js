const mongoose = require('mongoose');
// Theater might need to be changed to an association class so it stores keys to show and showroom.
//TA said this might not be needed
const TheaterSchema = new mongoose.Schema({
    showingNum: {
        type: String,
    },
    showroomNum: {
        type: String,
    },
    name: {
        type: String,
    },
    brand: {
        type: String,
    },
});

module.exports = Theater = mongoose.model('theater', TheaterSchema);