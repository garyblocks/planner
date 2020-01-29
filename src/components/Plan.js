import React, { useState, useRef } from "react";
import cx from "classnames";
import { useDrag, useDrop } from 'react-dnd'
import { connect } from "react-redux";
import { viewSwapId } from "../redux/actions";
import { getPlanById } from '../redux/selectors';
import Card from 'react-bootstrap/Card'; 
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 
import Collapse from 'react-bootstrap/Collapse'; 

import { ItemTypes } from '../dndConstants';
import CheckButton from './CheckButton';

const mapStateToProps = (state, ownProps) => {
    const { plan_id } = ownProps;
    const plan = getPlanById(state, plan_id);
    return { plan };
}

const Plan = ({ view, index, plan_id, plan, viewSwapId }) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: ItemTypes.PLAN,
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            viewSwapId(dragIndex, hoverIndex, view)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{isDragging}, drag] = useDrag({
        item: { type: ItemTypes.PLAN, index, view },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    drag(drop(ref));

    const [open, setOpen] = useState(false);

    return (
        <Row 
            ref={ref}
            style={{
                opacity: isDragging ? 0 : 1,
                cursor: 'move'
            }}
        >
            <Col xs={1}></Col>
            <Col xs={10}>
            <li
                className="todo-item"
            >
            <Card border="dark">
                <Card.Header
                    onClick={() => setOpen(!open)}
                    aria-controls={ "plan_" + plan_id }
                    aria-expanded={open}
                >
                <Row>
                <Col xs={10}>
                    <span
                        className={cx(
                            "todo-item__text",
                            plan && plan.completed && "todo-item__text--completed"
                        )}
                    >
                        {plan.content}
                    </span>
                </Col>
                <Col xs={2}><CheckButton todo={plan}/></Col>
                </Row>
                </Card.Header>
                <Collapse in={open}>
                    <Card.Body id={ "plan_" + plan_id }>
                        <Card.Text>
                            {plan.content}
                        </Card.Text>
                    </Card.Body>
                </Collapse>
            </Card>
            </li>
            </Col>
            <Col xs={1}></Col>
        </Row>
    )
};

export default connect(
    mapStateToProps,
    { viewSwapId }
)(Plan);
