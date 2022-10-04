const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name: {
        type: String, 
        required: true
    },

    Email: {
        type: String, 
        required: true
    },

    Password: {
        type: String, 
        required: true
    },

    uId: {
        type: String,
        default: Date.now(), 
        required: true
    }
})

module.exports = mongoose.model('users', userSchema);
