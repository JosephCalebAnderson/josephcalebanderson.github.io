const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    // userID is a foreign key to match this address to its user.
    userID: {
        type: String,
        required: true,
    },
    street: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    zipCode: {
        type: String,
    },
});

module.exports = Address = mongoose.model('address', AddressSchema);