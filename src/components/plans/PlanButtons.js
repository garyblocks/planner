import React from "react";
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 
import CheckButton from './CheckButton';
import DeleteButton from './DeleteButton';
import CopyButton from './CopyButton';

const PlanButtons = ({ plan }) => {
    return (
        <Row>
            <Col xs={1} style={{ color: "#53a451", cursor: "pointer" }}>
                <CheckButton plan={plan}/>
            </Col>

            <Col xs={1} style={{ color: "#f5c344", cursor: "pointer" }}>
                <CopyButton plan={plan}/>
            </Col>

            <Col xs={1} style={{ color: "#cb444a", cursor: "pointer" }}>
                <DeleteButton plan={plan}/>
            </Col>
        </Row>
    )
};

export default PlanButtons;
