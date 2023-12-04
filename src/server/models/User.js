const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        unique: true,
        trim: true,
    },
    password: {
        required: true,
        type: String,
        minLength: 6,  
    },
    username: {
        required: true,
        type: String,
        trim: true,
    },
    fullName: {
        type: String,
    },
    phoneNumber: {
        required: true,
        type: String,
        trim: true,
    },
    dob: {
        type: String
    },
    admin: {
        required: true,
        type: Boolean,
    },
    userStatus: {
        type: String,
        enum : ['ACTIVE','INACTIVE','SUSPENDED'],
        default: 'INACTIVE',
    },
    promotions: {
        required: true,
        type: Boolean,
    },
});

module.exports = User = mongoose.model('user', userSchema);