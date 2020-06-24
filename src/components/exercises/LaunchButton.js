import React from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { addPlan } from "../../redux/actions";
import { API_URL } from '../../constants';

const LaunchButton = ({ exercise, addPlan }) => {
    return (
        <i 
            onClick={(event) => {
                event.stopPropagation();
                const data = {
                    tag: exercise.tag,
                    plan: exercise.name,
                    view: 'back',
                    source: 'ex',
                    source_id: exercise.id
                };
                console.log(data);
                // sets state back to empty string
                axios.post(API_URL + 'planner/plans', {data}, {withCredentials: true})
                .then(res => {
                    console.log(res);
                    // dispatches actions to add plan
                    addPlan(
                        res.data,
                        data.tag,
                        data.plan,
                        data.plan,
                        "back",
                        data.source,
                        data.source_id
                    );
                });
            }}
            className="material-icons"
        >launch</i>
    );
}

export default connect(
    null,
    { addPlan }
)(LaunchButton);
