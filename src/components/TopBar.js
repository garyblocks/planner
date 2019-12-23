import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { addTodo, deleteAllComplete } from '../redux/actions';
import { API_URL } from '../constants';
import AddTag from './AddTag';

const TopBar = ({ addTodo, deleteAllComplete }) => {
    const [dropdownTitle, setDropdownTitle] = useState("Add Plan");

    const [planName, setPlanName] = useState("");
    const handlePlanNameChange = (event) => {
        setPlanName(event.target.value);
    }

    const [tagName, setTagName] = useState("");
    const handleTagNameChange = (event) => {
        setTagName(event.target.value);
    }

    const handleAddPlan = () => {
        const data = {
            tag: tagName,
            plan: planName
        };
        // sets state back to empty string
        axios.post(API_URL + 'planner/create_plan', {data}, {withCredentials: true})
        .then(res => {
            console.log(res);
            console.log(res.data);
            // dispatches actions to add todo
            addTodo(
                res.data,
                tagName + ' - ' + planName
            );
        });
    };

    const [tags, setTags] = useState([]);
    useEffect(() => {
        axios.post(API_URL + 'planner/get_tags', {}, {withCredentials: true})
        .then(res => {
            console.log(res);
            console.log(res.data);
            setTags(res.data);
        });
    }, [])

    const handleRemoveComplete = () => {
        axios.post(API_URL + 'planner/delete_complete', {}, {withCredentials: true})
        .then(res => {
            console.log(res);
            console.log(res.data);
            // dispatches actions to add todo
            deleteAllComplete();
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

    const renderForm = () => {
        switch (dropdownTitle) {
            case "Add Plan":
                return (
                    <Form inline>
                        <Form.Control as="select" placeholder="Tag" onChange={handleTagNameChange} value={tagName}>
                            {renderTags()}
                        </Form.Control>
                        <FormControl type="text" placeholder="Plan Name" className="mr-sm-2" onChange={handlePlanNameChange} value={planName}/>
                        <Button variant="outline-success" onClick={() => handleAddPlan()}>Add</Button>
                    </Form>
                );
            default:
                return <AddTag />;
        }
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Planner</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title={dropdownTitle} id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1" onClick={() => setDropdownTitle("Add Tag")}>Add Tag</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2" onClick={() => setDropdownTitle("Add Plan")}>Add Plan</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4" onClick={() => handleRemoveComplete()}>Delete All Complete</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                {renderForm()}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default connect(
    null,
    { addTodo, deleteAllComplete }
)(TopBar);
