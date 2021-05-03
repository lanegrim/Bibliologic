# Bibliologic

## Technologies Used
- Bibliologic is a Node.JS app that leverages MongoDB Atlas, as well as the following npm modules:
  * Express
  * EJS
  * Mongoose
  * Method-override
  * Express-session
  * Express-session
  * dotenv
  * bcrypt
- Biblologic makes use of the Open Library Books API
  * https://openlibrary.org/dev/docs/api/books

## Approach 
I wanted to provide users with a way to create and edit a collection of notes and ratings on their libraries. After raching this goal, I implemented authentication, so each user could maintain a personal collection. To improve the experience of creating entries, I integrated the Open Library Books API so users could search books by ISBN and have titles, authors, and cover images sourced authomatically.

## Opportunities for Improvement
- Failed login attempts simply clear the inputs with no response message to inform users of the error.
- Users cannot search for specific entries in their libraries without finding and clicking on its cover.
- Users cannot chang the sorting of their entries from the default of oldest-to-newest.

## Visit the Live App
- https://bibliologic.herokuapp.com/