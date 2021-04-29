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

entries.get('/setup/seed', (req, res) => {
    Entry.create(
        [
            {
                title: "Of Mice and Men",
                author: "John Steinbeck",
                image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Of_Mice_and_Men_%281937_1st_ed_dust_jacket%29.jpg",
                genre: "Literary Fiction",
                rating: 4,
                notes: "sad :("
            },
            {
                title: "Ulysses",
                author: "James  Joyce",
                image: "https://upload.wikimedia.org/wikipedia/commons/a/ab/JoyceUlysses2.jpg",
                genre: "Literary Fiction",
                rating: 5,
                notes: "So hard to understand"
            },
            {
                title: "The Catcher in the Rye",
                author: "J.D. Salinger",
                image: "https://images-na.ssl-images-amazon.com/images/I/81OthjkJBuL.jpg",
                genre: "Literary Fiction",
                rating: 4,
                notes: "Angsty, but actually really good"
            }
        ],
        (error, data) => {
            res.redirect('/entries')
        }
    )
})

module.exports = entries;