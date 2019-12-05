import React, { useRef } from "react";
import cx from "classnames";
import axios from 'axios';
import { connect } from "react-redux";
import { toggleTodo, swapPlan } from "../redux/actions";
import Card from 'react-bootstrap/Card'; 
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 
import { API_URL } from '../constants';
import { ItemTypes } from '../dndConstants'
import { useDrag, useDrop } from 'react-dnd'

const Todo = ({ todo, index, toggleTodo, swapPlan}) => {
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
            swapPlan(dragIndex, hoverIndex)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{isDragging}, drag] = useDrag({
        item: { type: ItemTypes.PLAN, index },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    drag(drop(ref));

    return (
        <Row 
            ref={ref}
            style={{
                opacity: isDragging ? 0 : 1,
                cursor: 'move'
            }}
        >
            <Col></Col>
            <Col>
            <li
                className="todo-item"
                onClick={() => {
                    const plan_id = todo.id
                    const data = { plan_id }
                    axios.post(API_URL + 'planner/toggle_plan', {data}, {withCredentials: true})
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                        // dispatches actions to add todo
                        toggleTodo(plan_id);
                    });
                }}
            >
            <Card border="dark" style={{ width: '18rem' }}>
                <Card.Header>
                <span
                    className={cx(
                        "todo-item__text",
                        todo && todo.completed && "todo-item__text--completed"
                    )}
                >
                    {todo.content}
                </span>
                </Card.Header>
            </Card>
            </li>
            </Col>
        <Col> </Col>
    </Row>
)};

export default connect(
    null,
    { toggleTodo, swapPlan }
)(Todo);
