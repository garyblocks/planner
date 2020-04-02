import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ExerciseBar from "./exercises/ExerciseBar";
import ExerciseList from "./exercises/ExerciseList";


const ExercisePage = () => {
    return (
        <>
        <Row><Col className="center">
            <ExerciseBar />
        </Col></Row>
        <Row><Col><ExerciseList /></Col></Row>
        </>
    )
}

export default ExercisePage;
