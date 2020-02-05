import React from "react";
import { useDrop } from 'react-dnd'
import Col from 'react-bootstrap/Col'; 
import Plan from "./Plan";
import { connect } from "react-redux";
import { changeView } from "../redux/actions";
import { ItemTypes } from '../dndConstants';
import { getPlansByView } from '../redux/selectors';

const current_view = 'front';

const mapStateToProps = state => {
    const plans = getPlansByView(state, current_view);
    return { plans }
}

const FrontList = ({ plans, changeView }) => {

    const [, drop] = useDrop({
        accept: ItemTypes.PLAN,
        drop: (item, monitor) => {
            const from = item.view;
            const id = item.id;
            if (from === current_view) {
                return
            }
            // Time to actually perform the action
            changeView(id, current_view);
        },
    })

    return (
        <Col className="center" ref={drop}>
            <ul className="plan-list">
                <h2>FrontLine</h2>
                {plans && plans.length
                ? plans.map((plan, idx) => {
                    return <Plan key={`todo-${plan.id}-${plan.index}`} plan={plan} />;
                })
                : "No todos, yay!"}
            </ul>
        </Col>
    );
}

export default connect(
    mapStateToProps,
    { changeView }
)(FrontList)
