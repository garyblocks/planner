import React, { useState, useRef } from "react";
import cx from "classnames";
import { useDrag, useDrop } from 'react-dnd'
import { connect } from "react-redux";
import { swapPlan } from "../redux/actions";
import Card from 'react-bootstrap/Card'; 
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 
import Collapse from 'react-bootstrap/Collapse'; 
import Button from 'react-bootstrap/Button'; 
import { ItemTypes } from '../dndConstants';
import CheckButton from './CheckButton';
import PlanBody from './PlanBody';

const Plan = ({ plan, swapPlan }) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: ItemTypes.PLAN,
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            // don't swap if items are from different view
            if (item.view !== plan.view) {
                return;
            }
            const dragId = item.id;
            const hoverId = plan.id;
            const dragIndex = item.index;
            const hoverIndex = plan.index;
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
            swapPlan(
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
            type: ItemTypes.PLAN,
            index: plan.index,
            view: plan.view,
            id: plan.id
        },
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
                cursor: 'move',
                margin: '0 1px'
            }}
            className="plan"
        >
            <Col>
            <li
                className="todo-item"
            >
            <Card
                border="dark"
                className="plan-card"
            >
                <Card.Header
                    onClick={() => setOpen(!open)}
                    aria-controls={ "plan_" + plan.id }
                    aria-expanded={open}
                >
                <Row>
                <Col xs={10}>
                    <Button
                        className="plan-header-tag"
                        variant={plan.completed ? "outline-secondary" : "outline-success"}
                    >{plan.tag}</Button>
                    <span
                        className={cx(
                            "plan-header-text",
                            plan && plan.completed && "plan-header-text--completed"
                        )}
                    >
                        {plan.title}
                    </span>
                </Col>
                <Col xs={2}><CheckButton plan={plan}/></Col>
                </Row>
                </Card.Header>
                <Collapse in={open} id={ "plan_" + plan.id }>
                    <div>
                        <PlanBody plan={plan}/>
                    </div>
                </Collapse>
            </Card>
            </li>
            </Col>
        </Row>
    )
};

export default connect(
    null,
    { swapPlan }
)(Plan);
