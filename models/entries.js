const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    image: String,
    notes: String,
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;