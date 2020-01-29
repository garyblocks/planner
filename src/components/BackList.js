import React from "react";
import Col from 'react-bootstrap/Col'; 
import Plan from "./Plan";
import { connect } from "react-redux";
import { viewMoveId } from "../redux/actions";
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../dndConstants';

const mapStateToProps = state => {
    const { views } = state;
    return { views };
}

const BackList = ({ views, viewMoveId }) => {
    const back = views.back;
    const current_view = 'back';

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
            item.index = back.length - 1;
        }
    })

    return (
        <Col className="center" ref={drop}>
            <ul className="plan-list">
                <h2>BackLog</h2>
                {back && back.length
                ? back.map((plan_id, index) => {
                    return <Plan key={`todo-${plan_id}`} view="back" index={index} plan_id={plan_id}/>;
                })
                : "No todos, yay!"}
            </ul>
        </Col>
    );
}

export default connect(mapStateToProps, {viewMoveId})(BackList)
