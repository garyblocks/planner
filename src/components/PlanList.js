import React from "react";
import Col from 'react-bootstrap/Col'; 
import Plan from "./Plan";
import { connect } from "react-redux";

const mapStateToProps = state => {
    const { views } = state;
    return { views };
}

const PlanList = ({ views }) => {
    const back = views.back;

    return (
        <Col className="center">
            <ul className="plan-list">
                {back && back.length
                ? back.map((plan_id, index) => {
                    return <Plan key={`todo-${plan_id}`} view="back" index={index} plan_id={plan_id}/>;
                })
                : "No todos, yay!"}
            </ul>
        </Col>
    );
}

export default connect(mapStateToProps)(PlanList)
