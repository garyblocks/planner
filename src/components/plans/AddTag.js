import React, { useState } from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { API_URL } from '../../constants';
import { addTag } from '../../redux/actions';

const AddTag = ({ addTag }) => {
    const [tagName, setTagName] = useState("");
    // bind input value
    const handleTagNameChange = (event) => {
        event.persist();
        setTagName(event.target.value);
    }

    const handleAddTag = () => {
        const data = {
            tag: tagName
        };
        // sets state back to empty string
        setTagName('');
        axios.post(API_URL + 'planner/tags', {data}, {withCredentials: true})
        .then(res => {
            console.log(res);
            addTag(res.data.tag, res.data.id);
        });
    };

    return (
        <Form inline>
            <FormControl type="text" placeholder="Tag Name" className="mr-sm-2" onChange={handleTagNameChange} value={tagName}/>
            <Button variant="outline-success" onClick={handleAddTag}>Add</Button>
        </Form>
    )
}

export default connect(
    null,
    { addTag }
)(AddTag);
