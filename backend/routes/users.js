const router = require('express').Router(); // need express router, creating routes
let User = require('../models/user.model'); // require the mongoose model

//root local host 5000


// http get requests handler on ../users/ path
router.route('/').get((req, res) => {
    User.find() // mongoose methd to get a list of all users in db, this is a promise, result returned in json format
    .then(users => res.json(users)) // returns in json, the users
    .catch(err => res.status(400).json('Error ' + err)); // error and message
});

// http post requests handler on ../users/ path
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({username});
    newUser.save() // saved to the DB
    .then(() => res.json('User added!'))// return message or error message
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;