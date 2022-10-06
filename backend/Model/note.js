const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    
    Title: {
        type: String,
        required: true
    },

    Description: {
        type: String, 
        required: true
    },

    lastUpdate: {
        type: String, 
        default: `${new Date().getDate()} ${new Date().toLocaleString('default', { month: 'short' })}, ${new Date().getFullYear()}`,
        required: true
    }
})

module.exports = mongoose.model('notes', noteSchema);