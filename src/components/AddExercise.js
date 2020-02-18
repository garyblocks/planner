import React, { useState, useEffect } from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { API_URL } from '../constants';

const AddExercise = () => {
    // set name of the exercise
    const [exerciseName, setExerciseName] = useState("");
    const handleExerciseNameChange = (event) => {
        setExerciseName(event.target.value);
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

    // set the frequency of the exercise
    const [exerciseFreq, setExerciseFreq] = useState("");
    const handleExerciseFreqChange = (event) => {
        setExerciseFreq(event.target.value);
    }

    const handleAddExercise = () => {
        const data = {
            tag: tagName,
            title: exerciseName,
            data: exerciseName,
            frequency: exerciseFreq
        };
        // sets state back to empty string
        axios.post(API_URL + 'planner/exercise/create', {data}, {withCredentials: true})
        .then(res => {
            console.log(res);
            console.log(res.data);
            // dispatches actions to add plan
            // addPlan(
            //     res.data,
            //     tagName + ' - ' + planName,
            //     planName
            // );
            setExerciseName("");
        });
    };

    const renderTags = () => {
        const options = tags.map( item => {
            return (
                <option>
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
            <FormControl type="text" placeholder="Exercise Name" className="mr-sm-2" onChange={handleExerciseNameChange} value={exerciseName}/>
            <FormControl type="text" placeholder="Freq" className="mr-sm-2" onChange={handleExerciseFreqChange} value={exerciseFreq}/>
            <Button variant="outline-success" onClick={() => handleAddExercise()}>Add</Button>
        </Form>
    )
}

export default connect()(AddExercise);
