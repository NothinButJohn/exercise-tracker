import React, { Component } from 'react' ;
import { Link } from 'react-router-dom';
import axios from 'axios';

// exercise component, functional react component
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"edit/"+props.exercise._id}>edit</Link> | <button type="submit" name="delete" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</button>
        </td>
    </tr>
)

// exercise list class component
export default class ExercisesList extends Component {
    constructor(props) {
        super(props);
        this.deleteExercise = this.deleteExercise.bind(this);
        this.state = {exercises: []}; // initialize state, empty array of exercises

    }

    // Add a list of exercises to the state, runs before render
    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
        .then(response => { // get exercises from database and put in array
            this.setState({ exercises: response.data}) // want all fields 
        })
        .catch((error) => {
            console.log(error);
        })
    }

    // Allow users to delete exercises
    // param obj id of exercise
    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/'+id) // exact route created in backend
        .then(res => console.log(res.data)); // log the delete, from backend
        // set state of exercises, react auto updates page with new state, mongoDB auto creates "_id" on obj creation
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id) // only return certain elements to exercises(the one not being deleted, remove it)
        })
    }

    //
    exerciseList() {
        // return exercise component for each ele in array, a row of the table, pass in three props
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() } 
                    </tbody>
                </table>
            </div>
        )
    }
}