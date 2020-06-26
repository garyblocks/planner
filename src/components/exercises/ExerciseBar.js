import React, { useState } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AddExercise from './AddExercise';

const ExerciseBar = () => {
    const [dropdownTitle, setDropdownTitle] = useState("Add Exercise");

    const renderForm = () => {
        switch (dropdownTitle) {
            case "Add Exercise":
                return <AddExercise />;
            default:
                return <AddExercise />;
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
                        <NavDropdown.Item href="#action/3.1" onClick={() => setDropdownTitle("Add Exercise")}>Add Exercise</NavDropdown.Item>
                        <NavDropdown.Divider />
                    </NavDropdown>
                </Nav>
                {renderForm()}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default connect()(ExerciseBar);
