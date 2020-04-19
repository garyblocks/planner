import React, { useState } from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { deleteTag } from '../../redux/actions';
import { API_URL } from '../../constants';
import { getTags } from '../../redux/selectors';

const mapStateToProps = (state) => {
    const tags = getTags(state);
    return { tags }
}

const DeleteTag = ({ tags, deleteTag }) => {
    // choose a tag
    const [tagName, setTagName] = useState("");
    const [tagId, setTagId] = useState(0);
    const handleTagNameChange = (event) => {
        const tagValue = event.target.value;
        setTagName(tagValue);
        for (var i = 0; i < tags.length; i++) {
            if (tags[i].tag === tagValue) setTagId(tags[i].id);
        }
    }

    const handleDeleteTag = () => {
        // sets state back to empty string
        axios.delete(API_URL + 'planner/tags/' + tagId, {withCredentials: true})
        .then(res => {
            console.log(res);
            // dispatches actions to add plan
            deleteTag(tagName);
            setTagName("");
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
            <Button variant="outline-danger" onClick={() => handleDeleteTag()}>Delete</Button>
        </Form>
    )
}

export default connect(
    mapStateToProps,
    { deleteTag }
)(DeleteTag);
