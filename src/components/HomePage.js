import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import TopBar from "./TopBar";
import PlanList from "./PlanList";


const HomePage = () => {
    return (
        <>
        <Row><Col className="center">
            <TopBar />
        </Col></Row>
        <Row>
            <Col>
                <Row><PlanList currentView="back"/></Row>
            </Col>
            <Col>
                <Row><PlanList currentView="front"/></Row>
            </Col>
        </Row>
        </>
    )
}

export default HomePage;
