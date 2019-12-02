import React from "react";
import axios from 'axios';
import Col from 'react-bootstrap/Col'; 
import Button from 'react-bootstrap/Button'; 
import { connect } from 'react-redux';
import { addTodo, deleteAllComplete } from '../redux/actions';
import { API_URL } from '../constants';

class AddTodo extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            tag: "",
            plan: "" 
        };
    }

    updatePlan = plan => {
        this.setState({ plan });
    };

    updateTag = tag => {
        this.setState({ tag });
    };

    handleAddTodo = () => {
        const plan = this.state.plan;
        const tag = this.state.tag;
        // sets state back to empty string
        this.setState({
            tag: '',
            plan: ''
        });
        const data = {
            tag: tag,
            plan: plan
        };
        axios.post(API_URL + 'planner/create_plan', {data}, {withCredentials: true})
        .then(res => {
            console.log(res);
            console.log(res.data);
            // dispatches actions to add todo
            this.props.addTodo(
                res.data,
                tag + ' - ' + plan
            );
        });
    };

    handleRemoveComplete = () => {
        // sets state back to empty string
        axios.post(API_URL + 'planner/delete_complete', {}, {withCredentials: true})
        .then(res => {
            console.log(res);
            console.log(res.data);
            // dispatches actions to add todo
            this.props.deleteAllComplete();
        });
    };

    render() {
        return (
            <Col className="center">
            <input
                onChange={e => this.updateTag(e.target.value)}
                placeholder="plan tag"
                value={this.state.tag}
                size="15"
            />
            <input
                onChange={e => this.updatePlan(e.target.value)}
                placeholder="plan detail"
                value={this.state.plan}
                size="50"
            />
        <Button className="add-todo" onClick={this.handleAddTodo}>
          Add Plan
        </Button>
        <Button
            onClick={this.handleRemoveComplete}
            variant="danger"
        >
            Delete All Complete
        </Button>
      </Col>
    );
  }
}

export default connect(
    null,
    { addTodo, deleteAllComplete }
)(AddTodo);
