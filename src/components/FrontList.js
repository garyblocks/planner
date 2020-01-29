import React from "react";
import { useDrop } from 'react-dnd'
import Col from 'react-bootstrap/Col'; 
import Plan from "./Plan";
import { connect } from "react-redux";
import { viewMoveId } from "../redux/actions";
import { ItemTypes } from '../dndConstants';

const mapStateToProps = state => {
    const { views } = state;
    return { views };
}

const FrontList = ({ views, viewMoveId }) => {
    const front = views.front;
    const current_view = 'front';

    const [, drop] = useDrop({
        accept: ItemTypes.PLAN,
        drop: (item, monitor) => {
            const dragIndex = item.index;
            const from = item.view
            const id = views[from][dragIndex];
            if (from === current_view) {
                return
            }
            // Time to actually perform the action
            viewMoveId(id, from, current_view);
            item.index = front.length - 1;
        },
    })

    return (
        <Col className="center" ref={drop}>
            <ul className="plan-list">
                <h2>FrontLine</h2>
                {front && front.length
                ? front.map((plan_id, index) => {
                    return <Plan key={`todo-${plan_id}`} view="front" index={index} plan_id={plan_id}/>;
                })
                : "No todos, yay!"}
            </ul>
        </Col>
    );
}

export default connect(mapStateToProps, {viewMoveId})(FrontList)
