import React, { useState } from "react";
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { connect } from 'react-redux';
import { deleteAllComplete } from '../redux/actions';
import { API_URL } from '../constants';
import AddTag from './AddTag';
import AddPlan from './AddPlan';

const TopBar = ({ deleteAllComplete }) => {
    const [dropdownTitle, setDropdownTitle] = useState("Add Plan");

    const handleRemoveComplete = () => {
        axios.post(API_URL + 'planner/delete_complete', {}, {withCredentials: true})
        .then(res => {
            console.log(res);
            console.log(res.data);
            // dispatches actions to add todo
            deleteAllComplete();
        });
    };

    const renderForm = () => {
        switch (dropdownTitle) {
            case "Add Plan":
                return <AddPlan />;
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
    { deleteAllComplete }
)(TopBar);
