import React, { useState } from "react";
import axios from 'axios';
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteAllComplete } from '../../redux/actions';
import { API_URL } from '../../constants';
import AddTag from './AddTag';
import DeleteTag from './DeleteTag';
import AddPlan from './AddPlan';

const TopBar = ({ deleteAllComplete }) => {
    const [dropdownTitle, setDropdownTitle] = useState("Add Plan");

    const handleRemoveComplete = () => {
        axios.post(API_URL + 'planner/delete_complete', {}, {withCredentials: true})
        .then(res => {
            console.log(res);
            console.log(res.data);
            deleteAllComplete();
        });
    };

    const renderForm = () => {
        switch (dropdownTitle) {
            case "Add Tag":
                return <AddTag />;
            case "Delete Tag":
                return <DeleteTag />;
            default:
                return <AddPlan />;
        }
    }

    return (
        <Navbar bg="light" expand="lg">
            <Link to='/home'>
                <Navbar.Brand>Planner</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link to='/exercise' className="nav-link">
                        Exercise
                    </Link>
                    <Link to='/exercise'>
                        <Nav.Item className="nav-link">Goal</Nav.Item>
                    </Link>
                    <NavDropdown title={dropdownTitle} id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1" onClick={() => setDropdownTitle("Add Tag")}>Add Tag</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2" onClick={() => setDropdownTitle("Add Plan")}>Add Plan</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.1" onClick={() => setDropdownTitle("Delete Tag")}>Delete Tag</NavDropdown.Item>
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
