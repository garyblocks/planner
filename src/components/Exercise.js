import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ExerciseBar from "./ExerciseBar";


const Exercise = () => {
    return (
        <>
        <Row><Col className="center">
            <ExerciseBar />
        </Col></Row>
        </>
    )
}

export default Exercise;
