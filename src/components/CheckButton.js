import React from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { toggleTodo } from "../redux/actions";
import { API_URL } from '../constants';

const CheckButton = ({ todo, toggleTodo }) => {
    return (
        <i 
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
            className="material-icons"
        >done</i>

    );
}

export default connect(
    null,
    { toggleTodo}
)(CheckButton);
