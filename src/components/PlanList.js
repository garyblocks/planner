import React from "react";
import axios from 'axios';
import Col from 'react-bootstrap/Col'; 
import Plan from "./Plan";
import { connect } from "react-redux";
import { changeView } from "../redux/actions";
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../dndConstants';
import { API_URL } from '../constants';
import { getPlansByView } from '../redux/selectors';

const mapStateToProps = (state, ownProps) => {
    const { currentView } = ownProps; 
    const plans = getPlansByView(state, currentView);
    return { plans }
}

const PlanList = ({ currentView, plans, changeView }) => {

    const [, drop] = useDrop({
        accept: ItemTypes.PLAN,
        drop: (item, monitor) => {
            const from = item.view;
            const id = item.id;
            if (from === currentView) {
                return
            }
            const data = { 
                plan_id: item.id,
                fields: { 
                    view: currentView
                }
            }
            axios.post(API_URL + 'planner/plan/update', {data}, {withCredentials: true})
            .then(res => {
                console.log(res);
                console.log(res.data);
                // drop id into a current view
                changeView(id, currentView);
            });
        }
    })

    const renderPlans = (plans) => {
        if (plans && plans.length) {
             return plans.map((plan, idx) => {
                        return <Plan key={`todo-${plan.id}`} plan={plan}/>;
                    })
        } else {
            return <div></div>
        }
    }

    return (
        <Col className="center" ref={drop}>
            <ul
                className="plan-list" 
                style={{'max-height': 'calc(100vh - 100px)', 'overflow-y': 'auto'}}
            >
                <h2>{currentView}</h2>
                { renderPlans(plans) }
            </ul>
        </Col>
    );
}

export default connect(
    mapStateToProps,
    { changeView }
)(PlanList)
