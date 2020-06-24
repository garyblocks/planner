import React from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { addPlan } from "../../redux/actions";
import { API_URL } from '../../constants';

const CopyButton = ({ plan, addPlan }) => {
    return (
        <i 
            onClick={(event) => {
                event.stopPropagation();
                const data = {
                    tag: plan.tag,
                    plan: plan.title,
                    view: plan.view,
                    source: plan.source,
                    source_id: plan.source_id
                }
                axios.post(API_URL + 'planner/plans', {data}, {withCredentials: true})
                .then(res => {
                    console.log(res);
                    addPlan(
                        res.data,
                        data.tag,
                        data.plan,
                        data.plan,
                        data.view,
                        data.source,
                        data.source_id
                    );
                });
            }}
            className="material-icons"
        >add_circle</i>
    );
}

export default connect(
    null,
    { addPlan }
)(CopyButton);
