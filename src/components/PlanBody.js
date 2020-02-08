import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import Card from 'react-bootstrap/Card'; 
import { connect } from "react-redux";
import { changeData } from "../redux/actions";
import { API_URL } from '../constants';
import TextareaAutosize from 'react-textarea-autosize';

const PlanBody = ({ plan, changeData }) => {
    // set ref and states
    const inputRef = useRef(null);
    const [planContent, setPlanContent] = useState(plan.content);
    const [editable, setEditable] = useState(false);

    const handleClick = (event) => {
        // Check if user is clicking outside of <input>
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            const data = { 
                plan_id: plan.id,
                fields: { 
                    data: planContent
                }
            }
            axios.post(API_URL + 'planner/plan/update', {data}, {withCredentials: true})
            .then(res => {
                console.log(res);
                console.log(res.data);
                setEditable(false);
            });
        }
    }

    // add listener for click
    useEffect(() => {
        if (editable) {
            document.addEventListener("mousedown", handleClick);
        }
        // This is a necessary step to "dismount" unnecessary events when we destroy the component
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    });

    const handlePlanContentChange = (event) => {
        setPlanContent(event.target.value);
    }

    return (
        <Card.Body>
            {editable?
                <TextareaAutosize
                    inputRef={inputRef}
                    value={planContent}
                    onChange={handlePlanContentChange}
                    className='plan-content-textarea'
                /> : <Card.Text onClick={() => setEditable(true)}>
                    {planContent}
                </Card.Text>
            }
        </Card.Body>
    );
}

export default connect(
    null,
    { changeData }
)(PlanBody);
