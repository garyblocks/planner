import React, { useState, useEffect } from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { addPlan } from '../../redux/actions';
import { API_URL } from '../../constants';

const AddPlan = ({ addPlan }) => {
    // set name of the plan
    const [planName, setPlanName] = useState("");
    const handlePlanNameChange = (event) => {
        setPlanName(event.target.value);
    }

    // choose a tag
    const [tagName, setTagName] = useState("");
    const handleTagNameChange = (event) => {
        setTagName(event.target.value);
    }

    // get a list of tags
    const [tags, setTags] = useState([]);
    useEffect(() => {
        axios.post(API_URL + 'planner/get_tags', {}, {withCredentials: true})
        .then(res => {
            console.log(res);
            console.log(res.data);
            setTags(res.data);
            setTagName(res.data ? res.data[0].tag : "");
        });
    }, [])

    const handleAddPlan = () => {
        const data = {
            tag: tagName,
            plan: planName,
            view: 'back'
        };
        // sets state back to empty string
        axios.post(API_URL + 'planner/plans', {data}, {withCredentials: true})
        .then(res => {
            console.log(res);
            console.log(res.data);
            // dispatches actions to add plan
            addPlan(
                res.data,
                tagName,
                planName,
                planName,
                "back"
            );
            setPlanName("");
        });
    };

    const renderTags = () => {
        const options = tags.map( item => {
            return (
                <option key={item.tag}>
                    {item.tag}
                </option>
            );
        });
        return options;
    }

    return (
        <Form inline>
            <Form.Control as="select" placeholder="Tag" onChange={handleTagNameChange} value={tagName} id="topbar-addplan-select-tag">
                {renderTags()}
            </Form.Control>
            <FormControl type="text" placeholder="Plan Name" className="mr-sm-2" onChange={handlePlanNameChange} value={planName}/>
            <Button variant="outline-success" onClick={() => handleAddPlan()}>Add</Button>
        </Form>
    )
}

export default connect(
    null,
    { addPlan }
)(AddPlan);
