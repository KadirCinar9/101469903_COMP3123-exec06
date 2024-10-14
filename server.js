const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/NoteRoutes.js');  // Correctly import the router

const app = express(); 

// Updated connection string with the specified database name
const DB_URL = "mongodb+srv://admin1:admin1@cluster0.zuqze.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// Connect to the MongoDB database
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,  // Helps avoid deprecation warnings related to indexes
    useFindAndModify: false // Avoids warnings about findOneAndUpdate
}).then(() => {
    console.log("Successfully connected to the database MongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note-taking application - Week06 Exercise</h1>");
});

// Use noteRoutes
app.use('/', noteRoutes);

app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});
