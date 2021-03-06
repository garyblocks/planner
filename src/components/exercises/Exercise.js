import React, { useState, useRef } from "react";
import { useDrag, useDrop } from 'react-dnd'
import { connect } from "react-redux";
import { swapExercise } from "../../redux/actions";
import Card from 'react-bootstrap/Card'; 
import Collapse from 'react-bootstrap/Collapse'; 
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 
import Button from 'react-bootstrap/Button'; 
import axios from 'axios';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { ItemTypes } from '../../dndConstants';
import ExerciseButtons from './ExerciseButtons';
import { API_URL } from '../../constants';

const Exercise = ({ exercise, swapExercise }) => {
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

    drag(drop(ref));

    const [open, setOpen] = useState(false);
    const [logData, setLogData] = useState([]);

    return (
        <Row 
            ref={ref}
            style={{
                opacity: isDragging ? 0 : 1,
                cursor: 'move',
                margin: '1px 1px'
            }}
        >
            <Col xs={1}></Col>
            <Col xs={10}>
            <li><Card border="dark">
                <Card.Header
                    onClick={() => {
                        setOpen(!open);
                        axios.get(API_URL + 'planner/get_exercise_log_counts/' + exercise.id, {withCredentials: true})
                        .then(res => {
                            console.log(res);
                            console.log(res.data);
                            setLogData(res.data);
                        })
                    }}
                    aria-controls={ "ex_" + exercise.id }
                    aria-expanded={open}
                >
                <Row>
                    <Col xs={1}>
                    <Button
                        className="plan-header-tag"
                        variant="outline-primary" 
                    >{exercise.tag}</Button>
                    </Col>
                    <Col
                        xs={9}
                        text="primary"
                        style={{
                            textAlign: "left",
                            fontSize: "18px"
                        }}
                    >
                        {exercise.name}
                    </Col>
                    <Col xs={2}>
                        <ExerciseButtons exercise={exercise} />
                    </Col>
                </Row>
                </Card.Header>
                <Collapse in={open} id={ "ex_" + exercise.id }>
                    <div>
                        <Card.Body>
                        <CalendarHeatmap
                            values={logData}
                            classForValue={(value) => {
                                if (!value) {
                                    return 'color-empty';
                                }
                                return `color-scale-${value.count}`;
                            }}
                        />
                        </Card.Body>
                    </div>
                </Collapse>
                
            </Card></li>
            </Col>
            <Col xs={1}></Col>
        </Row>
    )
};

export default connect(
    null,
    { swapExercise }
)(Exercise);
