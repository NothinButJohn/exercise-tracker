import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
// import components
import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
// import logo from './logo.svg';
// import './App.css';
// react router helps route to diff  react components
import {BrowserRouter as Router, Route } from "react-router-dom";

function App() {// React router helps mapping url and components
  return (//router element for each route urls assigned, components need to be created they will load on the page
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact  component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
