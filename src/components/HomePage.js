import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import TopBar from "./plans/TopBar";
import PlanList from "./plans/PlanList";


const HomePage = () => {
    return (
        <>
        <Row><Col className="center">
            <TopBar />
        </Col></Row>
        <Row className="plan-lists">
            <Col>
                <Row><PlanList currentView="back"/></Row>
                <Row><PlanList currentView="front"/></Row>
            </Col>
            <Col>
                <Row><PlanList currentView="mon"/></Row>
                <Row><PlanList currentView="tue"/></Row>
                <Row><PlanList currentView="wed"/></Row>
                <Row><PlanList currentView="thr"/></Row>
                <Row><PlanList currentView="fri"/></Row>
                <Row><PlanList currentView="sat"/></Row>
                <Row><PlanList currentView="sun"/></Row>
            </Col>
        </Row>
        </>
    )
}

export default HomePage;
