import React, { useState } from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { API_URL } from '../constants';

const AddTag = () => {
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
        axios.post(API_URL + 'planner/create_tag', {data}, {withCredentials: true})
        .then(res => {
            console.log(res);
            console.log(res.data);
        });
    };

    return (
        <Form inline>
            <FormControl type="text" placeholder="Tag Name" className="mr-sm-2" onChange={handleTagNameChange} value={tagName}/>
            <Button variant="outline-success" onClick={handleAddTag}>Add</Button>
        </Form>
    )
}

export default AddTag;
