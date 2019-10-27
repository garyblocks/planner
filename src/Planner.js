import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import VisibilityFilters from "./components/VisibilityFilters";
import "./styles.css";

export default function Planner() {
    return (
        <Container className="todo-app">
            <Row><h1>Planner</h1></Row>
            <Row><AddTodo /></Row>
            <Row><TodoList /></Row>
            <Row><VisibilityFilters /></Row>
        </Container>
    );
}
