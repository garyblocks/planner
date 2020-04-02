import React, { useRef } from "react";
import { useDrag, useDrop } from 'react-dnd'
import { connect } from "react-redux";
import { swapExercise, addPlan } from "../../redux/actions";
import Card from 'react-bootstrap/Card'; 
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 
import Button from 'react-bootstrap/Button'; 
import axios from 'axios';
import { ItemTypes } from '../../dndConstants';
import { API_URL } from '../../constants';

const Exercise = ({ exercise, swapExercise, addPlan }) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: ItemTypes.EXERCISE,
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragId = item.id;
            const hoverId = exercise.id;
            const dragIndex = item.index;
            const hoverIndex = exercise.index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
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
            swapExercise(
                dragId,
                hoverId,
                dragIndex,
                hoverIndex
            );
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{isDragging}, drag] = useDrag({
        item: {
            type: ItemTypes.EXERCISE,
            index: exercise.index,
            id: exercise.id
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    const handleActiveEx = () => {
        const data = { id: exercise.id };
        // sets state back to empty string
        axios.post(API_URL + 'planner/exercise/activate', {data}, {withCredentials: true})
        .then(res => {
            console.log(res);
            console.log(res.data);
            const rows = res.data
            // dispatches actions to add plan
            rows.forEach(function(item) {
                addPlan(
                    item.id,
                    item.tag,
                    item.title,
                    item.data,
                    'back'
                );
            });
        });
    };

    drag(drop(ref));

    return (
        <Row 
            ref={ref}
            style={{
                opacity: isDragging ? 0 : 1,
                cursor: 'move',
                margin: '0 1px'
            }}
        >
            <Col xs={1}></Col>
            <Col xs={10}>
            <li
                className="todo-item"
            >
            <Card border="dark">
                <Card.Header>
                <Row>
                    <Button variant="info" className="exercise-button">
                        <span className="exercise-text">
                            Tag: {exercise.tag}
                        </span>
                    </Button>
                    <Button variant="info" className="exercise-button">
                        <span className="exercise-text">
                            Name: {exercise.name}
                        </span>
                    </Button>
                    <Button variant="info" className="exercise-button">
                        <span className="exercise-text">
                            Unit: {exercise.unit}
                        </span>
                    </Button>
                    <Button variant="info" className="exercise-button">
                        <span className="exercise-text">
                            Freqency: {exercise.freq}
                        </span>
                    </Button>
                    <Button
                        variant="danger"
                        className="exercise-button"
                        onClick={() => handleActiveEx()}
                    >
                        <span className="exercise-text">Active</span>
                    </Button>
                </Row>
                </Card.Header>
            </Card>
            </li>
            </Col>
            <Col xs={1}></Col>
        </Row>
    )
};

export default connect(
    null,
    { swapExercise, addPlan }
)(Exercise);