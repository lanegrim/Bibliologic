const express = require('express');
const Entry = require('../models/entries.js');
const entries = express.Router();

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next()
    } else {
        res.redirect('/sessions/new')
    }
}

// NEW
entries.get('/new', isAuthenticated, (req, res) => {
    res.render('entries/new.ejs',
        {
            currentUser: req.session.currentUser
        })
});

// EDIT
entries.get('/:id/edit', isAuthenticated, (req, res) => {
    Entry.findById(req.params.id, (error, foundEntry) => {
        res.render('entries/edit.ejs', {
            entry: foundEntry,
            currentUser: req.session.currentUser
        })
    })
});

// DELETE
entries.delete('/:id', isAuthenticated, (req, res) => {
    Entry.findByIdAndRemove(req.params.id, (err, deletedEntry) => {
        res.redirect('/entries')
    })
});

// SHOW
entries.get('/:id', isAuthenticated, (req, res) => {
    Entry.findById(req.params.id, (error, foundEntry) => {
        res.render('entries/show.ejs', {
            entry: foundEntry,
            currentUser: req.session.currentUser
        })
    })
});

// UPDATE
entries.put('/:id', (req, res) => {
    Entry.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            author: req.body.author,
            image: req.body.image,
            genre: req.body.genre,
            rating: req.body.rating,
            notes: req.body.notes,
            date: Date.now(),
            owner: req.session.currentUser.username
        },
        { new: true },
        (error, updatedModel) => {
            res.redirect('/entries/' + req.params.id)
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
entries.get('/', isAuthenticated, (req, res) => {
    Entry.find({ owner: req.session.currentUser.username }, (error, myEntries) => {
        res.render('entries/index.ejs', {
            entries: myEntries,
            currentUser: req.session.currentUser
        })
    })
});

// SEED
entries.get('/setup/seed', isAuthenticated, (req, res) => {
    Entry.create(
        [
            {
                title: "Of Mice and Men",
                author: "John Steinbeck",
                image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Of_Mice_and_Men_%281937_1st_ed_dust_jacket%29.jpg",
                genre: "Literary Fiction",
                rating: 4,
                notes: "sad :(",
                owner: req.session.currentUser.username
            },
            {
                title: "Ulysses",
                author: "James  Joyce",
                image: "https://upload.wikimedia.org/wikipedia/commons/a/ab/JoyceUlysses2.jpg",
                genre: "Literary Fiction",
                rating: 5,
                notes: "So hard to understand",
                owner: req.session.currentUser.username
            },
            {
                title: "The Catcher in the Rye",
                author: "J.D. Salinger",
                image: "https://images-na.ssl-images-amazon.com/images/I/81OthjkJBuL.jpg",
                genre: "Literary Fiction",
                rating: 4,
                notes: "Angsty, but actually really good",
                owner: req.session.currentUser.username
            }
        ],
        (error, data) => {
            res.redirect('/entries')
        }
    )
})

module.exports = entries;