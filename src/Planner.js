import React from "react";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { connect } from "react-redux";
import { BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import "./styles.css";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import ExercisePage from "./components/ExercisePage";
import { API_URL, BASE_URL } from './constants';
import { addPlan, togglePlan, addExercise, addTag } from './redux/actions';
import { getLogin } from "./redux/selectors";

const mapStateToProps = state => {
    const login_status = getLogin(state);
    return { login_status }
}

class Planner extends React.Component {

    renderPlannerContent() {
        return (
            <DndProvider backend={HTML5Backend}>
                <Router basename={ BASE_URL }>
                    <Switch>
                        <Route path="/home">
                            <HomePage />
                        </Route>
                        <Route path="/exercise">
                            <ExercisePage />
                        </Route>
                        <Route path="/">
                            <HomePage />
                        </Route>
                    </Switch>
                </Router>
            </DndProvider>
        )
    }

    checkLogin() {
        if (this.props.login_status) {
            return true;
        } else {
            return false;
        }
    }

    componentDidUpdate() {
        console.log(API_URL);
        console.log(process.env);
        if (this.props.login_status) {
            // download plans
            axios.post(API_URL + 'planner/get_plans', {}, {withCredentials: true})
            .then(res => {
                console.log(res);
                const saved_todos = res.data;
                saved_todos.forEach(function(item) {

                    this.props.addPlan(
                        item.id,
                        item.tag,
                        item.title,
                        item.data,
                        item.view ? item.view : 'back',
                        item.source
                    );
                    if (item.done) {
                        this.props.togglePlan(item.id);
                    }
                }.bind(this));
            })

            // download exercises
            axios.get(API_URL + 'planner/exercises', {withCredentials: true})
            .then(res => {
                console.log(res);
                const exercises = res.data;
                exercises.forEach(function(item) {
                    console.log(item);
                    this.props.addExercise(
                        item.id,
                        item.tag,
                        item.name,
                    );
                }.bind(this));
            })

            // download tags
            axios.get(API_URL + 'planner/tags', {withCredentials: true})
            .then(res => {
                console.log(res);
                const tags = res.data;
                tags.forEach(function(tag) {
                    this.props.addTag(tag.tag, tag.id);
                }.bind(this));
            })
        }
    }

    render() {
        return (
            <Container className="planner-app">
                {this.checkLogin() ? this.renderPlannerContent() : <Login />}
            </Container>
        )
    };
}

export default connect(
    mapStateToProps,
    { addPlan, togglePlan, addExercise, addTag }
)(Planner);
