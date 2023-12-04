const mongoose = require('mongoose');


const promotionSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    code: {
        type: String,
        unique: true,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    }
});

module.exports = Promotion = mongoose.model('promotion', promotionSchema);