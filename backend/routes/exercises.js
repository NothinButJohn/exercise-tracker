const router = require('express').Router(); // need express router, creating routes
let Exercise = require('../models/exercise.model'); // require the mongoose model

//root local host 5000


// http get requests handler on ../exercise/ path
router.route('/').get((req, res) => {
    Exercise.find() // mongoose methd to get a list of all exercises in db, this is a promise, result returned in json format
    .then(exercises => res.json(exercises)) // returns in json, the exercises
    .catch(err => res.status(400).json('Error ' + err)); // error and message
});

// http post requests handler on ../exercise/ path
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error '+ err));
});

//id from url, returning json
 
// get request

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;