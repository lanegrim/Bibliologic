const express = require('express');
const Entry = require('../models/entries.js');
const entries = express.Router();


// NEW
entries.get('/new', (req, res) => {
    res.render('entries/new.ejs')
});

// EDIT
entries.get('/:id/edit', (req, res) => {
    Entry.findById(req.params.id, (error, foundEntry) => {
        res.render('entries/edit.ejs', {
            entry: foundEntry
        })
    })
});

// DELETE
entries.delete('/:id', (req, res) => {
    Entry.findByIdAndRemove(req.params.id, (err, deletedEntry) => {
        res.redirect('/entries')
    })
});

// SHOW
entries.get('/:id', (req, res) => {
    Entry.findById(req.params.id, (error, foundEntry) => {
        res.render('entries/show.ejs', {
            entry: foundEntry
        })
    })
});

// UPDATE
entries.put('/:id', (req, res) => {
    Entry.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (error, updatedModel) => {
            res.redirect('/entries')
        }
    )
});

// CREATE
entries.post('/', (req, res) => {
    Entry.create(req.body, (error, createdEntry) => {
        res.redirect('/entries')
    })
});

// INDEX
entries.get('/', (req, res) => {
    Entry.find({}, (error, allEntries) => {
        res.render('entries/index.ejs', {
            entries: allEntries
        })
    })
});

module.exports = entries;