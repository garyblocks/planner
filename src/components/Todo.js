import React from "react";
import cx from "classnames";
import axios from 'axios';
import { connect } from "react-redux";
import { toggleTodo } from "../redux/actions";
import Col from 'react-bootstrap/Col'; 
import Row from 'react-bootstrap/Row'; 
import { API_URL } from '../constants';

const Todo = ({ todo, toggleTodo}) => (
    <Row>
    <Col></Col>
    <Col>
      <li
        className="todo-item"
        onClick={() => {
            const plan_id = todo.id
            const data = { plan_id }
            axios.post(API_URL + 'planner/toggle_plan', {data}, {withCredentials: true})
            .then(res => {
                console.log(res);
                console.log(res.data);
                // dispatches actions to add todo
                toggleTodo(plan_id);
            });
        }}
      >
            {todo && todo.completed ? "👌" : "👋"}{" "}
            <span
              className={cx(
                "todo-item__text",
                todo && todo.completed && "todo-item__text--completed"
              )}
            >
              {todo.content}
            </span>
        </li>
    </Col>
    <Col></Col>
    </Row>
);

export default connect(
    null,
    { toggleTodo }
)(Todo);
