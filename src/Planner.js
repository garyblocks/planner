import React from "react";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { connect } from "react-redux";

import TopBar from "./components/TopBar";
import BackList from "./components/BackList";
import FrontList from "./components/FrontList";
import Login from "./components/Login";
import "./styles.css";
import { API_URL } from './constants';
import { addPlan, togglePlan } from './redux/actions';
import { getLogin } from "./redux/selectors";

const mapStateToProps = state => {
    const login = getLogin(state);
    return { login }
}

class Planner extends React.Component {

    renderPlannerContent() {
        return (
            <DndProvider backend={HTML5Backend}>
                <Row><Col className="center">
                    <TopBar />
                </Col></Row>
                <Row>
                    <Col>
                        <Row><BackList /></Row>
                    </Col>
                    <Col>
                        <Row><FrontList /></Row>
                    </Col>
                </Row>
            </DndProvider>
        )
    }

    componentDidUpdate() {
        console.log(API_URL);
        console.log(process.env);
        if (this.props.login) {
            axios.post(API_URL + 'planner/get_plans', {}, {withCredentials: true})
            .then(res => {
                console.log(res);
                console.log(res.data);
                const saved_todos = res.data;
                saved_todos.forEach(function(item) {

                    this.props.addPlan(
                        item.id,
                        item.tag + ' - ' + item.data
                    );
                    if (item.done) {
                        this.props.togglePlan(item.id);
                    }
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
    { addPlan, togglePlan }
)(Planner);
