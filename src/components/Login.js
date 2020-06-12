import React from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from "react-redux";

import { API_URL } from '../constants';
import { login } from "../redux/actions";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'csrf_token': '',
            'username': '',
            'password': '',
            'remember_me': false
        };
        this.initState = this.state;
    }

    componentDidMount() {
        axios.post(API_URL + 'auth/get_login_token', {}, {withCredentials: true})
        .then(res => {
            console.log(res);
            console.log(res.data);
            const csrf_token = res.data;
            this.setState({
                'csrf_token': csrf_token
            });
        })
        this.checkLogin();
    }

    checkLogin() {
        const url = API_URL + 'auth/check_login';
        console.log('GET: ' + url);
        axios.get(url, {withCredentials: true})
        .then(res => {
            console.log(res);
            if (res.data.login) {
                this.props.login();
            }
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        // sets state back to empty string
        this.setState(this.initState);
        const data = new FormData();
        const csrf_token = this.state.csrf_token;
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true
        };
        data.append("username", this.state.username);
        data.append("password", this.state.password);
        data.append("remember_me", this.state.remember_me);
        data.append("csrf_token", csrf_token);
        data.append("submit", "Sign In");
        console.log(API_URL + 'auth/api_login');
        for (var pair of data.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }

        axios.post(API_URL + 'auth/api_login', data, config)
        .then(res => {
            console.log(res);
            if (res.status === 200) {
                this.props.login();
            }
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
    };

    render() {
        return (
            <Row>
            <Col></Col>
            <Col>
            <h1 className="center">Please Sign In</h1>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        onChange={event => this.setState({username: event.target.value})}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Your password"
                        onChange={event => this.setState({password: event.target.value})}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                        type="checkbox"
                        label="Remember me"
                        onChange={event => this.setState({
                            remember_me: event.target.value === 'on' ? true : false
                        })}
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                >Submit</Button>
            </Form>
            </Col>
            <Col></Col>
            </Row>
        );
    }
}

export default connect(
    null,
    { login }
)(Login);
