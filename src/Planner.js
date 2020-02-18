import React from "react";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { connect } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import "./styles.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Exercise from "./components/Exercise";
import { API_URL } from './constants';
import { addPlan, togglePlan, addExercise } from './redux/actions';
import { getLogin } from "./redux/selectors";

const mapStateToProps = state => {
    const login = getLogin(state);
    return { login }
}

class Planner extends React.Component {

    renderPlannerContent() {
        return (
            <DndProvider backend={HTML5Backend}>
                <Router>
                    <Switch>
                        <Route path="/home">
                            <Home />
                        </Route>
                        <Route path="/exercise">
                            <Exercise />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </Router>
            </DndProvider>
        )
    }

    componentDidUpdate() {
        console.log(API_URL);
        console.log(process.env);
        if (this.props.login) {
            // download plans
            axios.post(API_URL + 'planner/get_plans', {}, {withCredentials: true})
            .then(res => {
                console.log(res);
                console.log(res.data);
                const saved_todos = res.data;
                saved_todos.forEach(function(item) {

                    this.props.addPlan(
                        item.id,
                        item.tag + ' - ' + item.title,
                        item.data
                    );
                    if (item.done) {
                        this.props.togglePlan(item.id);
                    }
                }.bind(this));
            })

            // download exercises
            axios.post(API_URL + 'planner/exercises', {}, {withCredentials: true})
            .then(res => {
                console.log(res);
                console.log(res.data);
                const saved_todos = res.data;
                saved_todos.forEach(function(item) {

                    this.props.addExercise(
                        item.id,
                        item.tag,
                        item.title,
                        item.unit,
                        item.frequency,
                        item.active
                    );
                }.bind(this));
            })
        }
    }

    render() {
        return (
            <Container className="planner-app">
                {this.props.login ? this.renderPlannerContent() : <Login />}
            </Container>
        )
    };
}

export default connect(
    mapStateToProps,
    { addPlan, togglePlan, addExercise }
)(Planner);
