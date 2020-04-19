import React, { useState } from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { addPlan } from '../../redux/actions';
import { API_URL } from '../../constants';
import { getTags } from '../../redux/selectors';

const mapStateToProps = (state) => {
    const tags = getTags(state);
    return { tags }
}

const AddPlan = ({ tags, addPlan }) => {
    // set name of the plan
    const [planName, setPlanName] = useState("");
    const handlePlanNameChange = (event) => {
        setPlanName(event.target.value);
    }

    // choose a tag
    var defaultTag = "";
    const [tagName, setTagName] = useState(defaultTag);
    const handleTagNameChange = (event) => {
        setTagName(event.target.value);
    }

    const handleAddPlan = () => {
        if (tags && tags.length !== 0) {
            defaultTag = tags[0].tag;
        }
        const data = {
            tag: tagName.length !== 0 ? tagName : defaultTag,
            plan: planName,
            view: 'back'
        };
        console.log(data);
        // sets state back to empty string
        axios.post(API_URL + 'planner/plans', {data}, {withCredentials: true})
        .then(res => {
            console.log(res);
            // dispatches actions to add plan
            addPlan(
                res.data,
                data.tag,
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
                <option key={item.id}>
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
    mapStateToProps,
    { addPlan }
)(AddPlan);
