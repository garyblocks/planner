import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { API_URL } from '../constants';

const TopBar = () => {
    const [dropdownTitle, setDropdownTitle] = useState("Add Plan");

    const [tagName, setTagName] = useState("");
    const handleTagNameChange = (event) => {
        event.persist();
        setTagName(event.target.value);
    }

    const [planName, setPlanName] = useState("");
    const handlePlanNameChange = (event) => {
        event.persist();
        setPlanName(event.target.value);
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

    const [tags, setTags] = useState([]);
    useEffect(() => {
        axios.post(API_URL + 'planner/get_tags', {}, {withCredentials: true})
        .then(res => {
            console.log(res);
            console.log(res.data);
            setTags(res.data);
        });
    }, [])

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
                        <Form.Control as="select" placeholder="Tag">
                            {renderTags()}
                        </Form.Control>
                        <FormControl type="text" placeholder="Plan Name" className="mr-sm-2" onChange={handlePlanNameChange} value={planName}/>
                        <Button variant="outline-success" onClick={handleAddTag}>Add</Button>
                    </Form>

                );
            default:
                return (
                    <Form inline>
                        <FormControl type="text" placeholder="Tag Name" className="mr-sm-2" onChange={handleTagNameChange} value={tagName}/>
                        <Button variant="outline-success" onClick={handleAddTag}>Add</Button>
                    </Form>
                );
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
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                {renderForm()}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default TopBar;
