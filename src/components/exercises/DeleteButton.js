import React from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { deleteExercise } from "../../redux/actions";
import { API_URL } from '../../constants';

const DeleteButton = ({ exercise, deleteExercise }) => {
    return (
        <i 
            onClick={(event) => {
                event.stopPropagation();
                axios.delete(API_URL + 'planner/exercises/' + exercise.id, {withCredentials: true})
                .then(res => {
                    console.log(res);
                    deleteExercise(exercise.id);
                });
            }}
            className="material-icons"
        >remove_circle</i>
    );
}

export default connect(
    null,
    { deleteExercise }
)(DeleteButton);
