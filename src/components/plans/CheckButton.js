import React from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { togglePlan } from "../../redux/actions";
import { API_URL } from '../../constants';

const CheckButton = ({ plan, togglePlan }) => {
    return (
        <i 
            onClick={(event) => {
                event.stopPropagation();
                const plan_id = plan.id
                const data = { plan_id }
                axios.post(API_URL + 'planner/toggle_plan', {data}, {withCredentials: true})
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    togglePlan(plan_id);
                });
            }}
            className="material-icons"
        >done</i>

    );
}

export default connect(
    null,
    { togglePlan }
)(CheckButton);
