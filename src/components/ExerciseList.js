import React from "react";
import Col from 'react-bootstrap/Col'; 
import Exercise from "./Exercise";
import { connect } from "react-redux";
import { getExercises } from '../redux/selectors';


const mapStateToProps = state => {
    const exercises = getExercises(state);
    return { exercises }
}

const ExerciseList = ({ exercises }) => {

    return (
        <Col className="center">
            <ul className="plan-list">
                <h2>Exercises</h2>
                {exercises && exercises.length
                ? exercises.map((ex, idx) => {
                    return <Exercise key={`ex-${ex.id}`} exercise={ex} />;
                })
                : "No todos, yay!"}
            </ul>
        </Col>
    );
}

export default connect(
    mapStateToProps, null
)(ExerciseList)
