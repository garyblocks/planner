import React, {useState} from "react";
import axios from 'axios';
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 
import Card from 'react-bootstrap/Card'; 
import Collapse from 'react-bootstrap/Collapse'; 
import Button from 'react-bootstrap/Button'; 
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

    const [open, setOpen] = useState(true);

    return (
        <Col
            className="center" ref={drop}
            style={{ 'padding': '2px' }}
        >
            <Card
                style={{
                    'border': '3px solid #BDC0BA',
                    'borderRadius': '8px',
                    'margin': '0 12px'
                }}
            >
                <Card.Header
                    onClick={() => setOpen(!open)}
                    aria-controls={ "view_" + currentView }
                    aria-expanded={open}
                    style={{
                        'textAlign': 'left'
                    }}
                >
                    <Row>
                        <Col><h3>{currentView}</h3></Col>
                        <Col>
                            <Button
                                className="float-right"
                                variant="outline-danger"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    const filters = { 
                                        view: currentView,
                                        done: true
                                    };
                                    const updates = {
                                        view: 'archive'
                                    }
                                    const data = { filters, updates };
                                    axios.patch(API_URL + 'planner/plans', {data}, {withCredentials: true})
                                    .then(res => {
                                        console.log(res);
                                        res.data.forEach(function(plan) {
                                            changeView(
                                                plan.id,
                                                plan.view
                                            );
                                        });
                                    });
                                }}
                                style={{
                                    "padding": "0.5rem",
                                    "lineHeight": "1"
                                }}
                            >
                                <i
                                    className="material-icons"
                                    style={{
                                        "fontSize": '18px',
                                        "margin": "0"
                                    }}
                                >
                                    delete_outline
                                </i>
                            </Button>
                        </Col>
                    </Row>
                </Card.Header>
                <Collapse in={open} id={ "view_" + currentView }>
                    <div>
                        <Card.Body
                            style={{
                                'maxHeight': 'calc(100vh - 100px)',
                                'overflowY': 'auto'
                            }}
                        >
                            <ul className="plan-list">
                                { renderPlans(plans) }
                            </ul>
                        </Card.Body>
                    </div>
                </Collapse>
            </Card>
        </Col>
    );
}

export default connect(
    mapStateToProps,
    { changeView }
)(PlanList)
