const express = require('express'); 
const cors = require('cors');
const mongoose = require('mongoose'); // helper to connect to mongo DB data base

require('dotenv').config(); // environment variables in the .env file

// create express server 
const app = express();
const port = process.env.PORT || 5000;

console.log(port)


// middleware 
// be able to parse json
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI; // Gets from mongo db dash (environment variable)

mongoose.connect(uri, {  useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true  }); // pass in uri(where database is store)
const connection = mongoose.connection; // Starting the connection
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
app.use('/exercises', exercisesRouter); // on access to folder load everything in the particular router 
app.use('/users', usersRouter);


// start the server, listens on a certain port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})