const mongoose = require('mongoose');

const PaymentCardSchema = new mongoose.Schema({
    // userID is a foreign key to match this payment card to its user.
    userID: {
        type: String,
        required: true,
    },
    cardNum: {
        type: String,
        required: true,
    },
    expiration: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    nameOnCard: {
        type: String,
        required: true,
    },
    cvv: {
        type: String,
        defualt: "0",
    },
    ending: {
        type: String,
    }
});

module.exports = PaymentCard = mongoose.model('paymentCard', PaymentCardSchema);