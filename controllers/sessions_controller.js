const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

sessions.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {
        currentUser: req.session.currentUser
    })
})

// on sessions form submit (log in)
sessions.post('/', (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        // Database error
        if (err) {
            console.log(err)
            res.redirect('/')
        } else if (!foundUser) {
            // if found user is undefined/null not found etc
            res.redirect('/');
        } else {
            // user is found
            // now let's check if passwords match
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                // add the user to our session
                req.session.currentUser = foundUser
                console.log(req.session);
                // redirect back to our home page
                res.redirect('/')
            } else {
                // passwords do not match
                res.redirect('/')
            }
        }
    })
})

sessions.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/entries')
    })
})


module.exports = sessions