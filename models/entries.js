const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    image: String,
    genre: String,
    rating: { type: Number, min: 1, max: 5 },
    notes: String,
    date: { type: Date, default: Date.now },
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;