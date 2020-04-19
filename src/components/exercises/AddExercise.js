import React, { useState } from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { API_URL } from '../../constants';
import { addExercise } from '../../redux/actions';
import { getTags } from '../../redux/selectors';

const mapStateToProps = (state) => {
    const tags = getTags(state);
    return { tags }
}

const AddExercise = ({ tags, addExercise }) => {
    // set name of the exercise
    const [exerciseName, setExerciseName] = useState("");
    const handleExerciseNameChange = (event) => {
        setExerciseName(event.target.value);
    }

    // choose a tag
    var defaultTag = "";
    const [tagName, setTagName] = useState(defaultTag);
    const handleTagNameChange = (event) => {
        setTagName(event.target.value);
    }

    // set the frequency of the exercise
    const [exerciseFreq, setExerciseFreq] = useState("");
    const handleExerciseFreqChange = (event) => {
        setExerciseFreq(event.target.value);
    }

    const handleAddExercise = () => {
        if (tags && tags.length !== 0) {
            defaultTag = tags[0].tag;
        }
        const data = {
            tag: tagName.length !== 0 ? tagName : defaultTag,
            title: exerciseName,
            data: exerciseName,
            frequency: exerciseFreq
        };
        console.log(data);
        // sets state back to empty string
        axios.post(API_URL + 'planner/exercises', {data}, {withCredentials: true})
        .then(res => {
            console.log(res);
            // dispatches actions to add exercise
            addExercise(
                res.data.id,
                res.data.tag,
                res.data.title,
                res.data.level,
                res.data.frequency
            );
            setExerciseName("");
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
            <FormControl type="text" placeholder="Exercise Name" className="mr-sm-2" onChange={handleExerciseNameChange} value={exerciseName}/>
            <FormControl type="text" placeholder="Freq" className="mr-sm-2" onChange={handleExerciseFreqChange} value={exerciseFreq}/>
            <Button variant="outline-success" onClick={() => handleAddExercise()}>Add</Button>
        </Form>
    )
}

export default connect(
    mapStateToProps,
    { addExercise }
)(AddExercise);
