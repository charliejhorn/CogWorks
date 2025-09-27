// This file defines the data models used in the application, representing the Firestore collections and their structure.

const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number, // duration in hours
        required: true,
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    workshops: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workshop',
    }],
});

const Workshop = mongoose.model('Workshop', workshopSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
    Workshop,
    User,
};