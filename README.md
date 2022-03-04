# my-games-site

Project to get familiar with and learn NodeJS, Express, and Mongoose.
This is a simple CRUD app that allows users to input video games, platforms, publishers, genres, and game instances into a library that is stored on MongoDB Atlas.
Users cannot delete database documents that reference other existing documents (ex: you cannot delete a genre if there exists a game in the library that references that genre).

to run the app...
from the base directory:
npm install
nodemon index.js
