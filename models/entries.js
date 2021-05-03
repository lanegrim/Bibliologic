const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
    genre: String,
    rating: { type: Number, min: 1, max: 5 },
    notes: String,
    date: { type: Date, default: Date.now },
    owner: { type: String, required: true }
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;