import React from "react";
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 
import LaunchButton from './LaunchButton';
import DeleteButton from './DeleteButton';

const ExerciseButtons = ({ exercise }) => {
    return (
        <Row>
            <Col xs={4}></Col>
            <Col xs={4} style={{ color: "#f5c344", cursor: "pointer" }}>
                <LaunchButton exercise={exercise}/>
            </Col>

            <Col xs={4} style={{ color: "#cb444a", cursor: "pointer" }}>
                <DeleteButton exercise={exercise}/>
            </Col>
        </Row>
    )
};

export default ExerciseButtons;
