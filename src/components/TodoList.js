import React from "react";
import Col from 'react-bootstrap/Col'; 
import Todo from "./Todo";
import { connect } from "react-redux";
import { getTodosByVisibilityFilter } from "../redux/selectors";

const mapStateToProps = state => {
  const { visibilityFilter } = state
  const todos = getTodosByVisibilityFilter(state, visibilityFilter)
  return { todos }
}

class TodoList extends React.Component {

    render() {
        return (
            <Col className="center">
                <ul className="todo-list">
                    {this.props.todos && this.props.todos.length
                    ? this.props.todos.map((todo, index) => {
                        return <Todo key={`todo-${todo.id}`} todo={todo} />;
                    })
                    : "No todos, yay!"}
                </ul>
            </Col>
        );
    }
}

export default connect(mapStateToProps)(TodoList)
