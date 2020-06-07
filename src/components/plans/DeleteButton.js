import React from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { deletePlan } from "../../redux/actions";
import { API_URL } from '../../constants';

const DeleteButton = ({ plan, deletePlan }) => {
    return (
        <i 
            onClick={(event) => {
                event.stopPropagation();
                axios.delete(API_URL + 'planner/plans/' + plan.id, {withCredentials: true})
                .then(res => {
                    console.log(res);
                    deletePlan(plan.id);
                });
            }}
            className="material-icons"
        >remove_circle</i>
    );
}

export default connect(
    null,
    { deletePlan }
)(DeleteButton);
