import React from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { togglePlan } from "../../redux/actions";
import { API_URL } from '../../constants';

const CheckButton = ({ plan, togglePlan }) => {

    const handleClick = (event) => {
        event.stopPropagation();
        const plan_id = plan.id
        console.log(plan);
        if (plan.completed) {
            const data = {
                fields: { done: false }
            }
            axios.patch(API_URL + 'planner/plans/' + plan_id, {data}, {withCredentials: true})
            .then(res => {
                console.log(res);
                console.log(res.data);
                togglePlan(plan_id);
            });
        } else {
            const data = { plan_id }
            axios.post(API_URL + 'planner/complete_plan', {data}, {withCredentials: true})
            .then(res => {
                console.log(res);
                console.log(res.data);
                togglePlan(plan_id);
            });
        }
    } 

    return (
        <i 
            onClick={handleClick}
            className="material-icons"
        >check_circle</i>
    );
}

export default connect(
    null,
    { togglePlan }
)(CheckButton);
