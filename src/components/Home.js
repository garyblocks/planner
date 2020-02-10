import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import TopBar from "./TopBar";
import BackList from "./BackList";
import FrontList from "./FrontList";


const Home = () => {
    return (
        <>
        <Row><Col className="center">
            <TopBar />
        </Col></Row>
        <Row>
            <Col>
                <Row><BackList /></Row>
            </Col>
            <Col>
                <Row><FrontList /></Row>
            </Col>
        </Row>
        </>
    )
}

export default Home;
