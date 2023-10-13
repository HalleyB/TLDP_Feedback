import React, { useState, useEffect} from 'react'
import EmployeeFeedback from './employeeAddFeedback';
import Modal from './modal';
import { useTheme } from '@emotion/react';

function Employee(props) {
    const [showModal, setShowModal] = useState(false)
    const [pastFeedback, setPastFeedback] = useState([])
    const [managerResponses, setManagerResponses] = useState([])
    const [newData, setNewData] = useState(false)
    const [showResponse, setShowResponse] = useState(false)
    const [curResponse, setCurResponse] = useState({})
    const [showFDetails, setShowFDetails] = useState(false)
    const [curFeedback, setCurFeedback] = useState(false)

    const modalStyles = {
        position: 'fixed',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const getPastFeedback = () => {
        fetch(`/api/${props.userId}/employeePreviousFeedback`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setPastFeedback(data)
        })
    }

    const getManagerResponses = () => {
        fetch(`/api/${props.userId}/employeeManagerResponses`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setManagerResponses(data)
        })
    }

    const getManager = (managerId) => {
        if (managerId === 9001) {
            return "Jason Green"
        } else if (managerId === 9002) {
            return "Sharon Green"
        } else if (managerId === 9003) {
            return "Doris Martinez"
        } else if (managerId === 9004) {
            return "Vicki Green"
        } else if (managerId === 9005) {
            return "David Dennis"
        } else {
            return "Unknown Manager"
        }
    }

    useEffect(() => {
        if (props.userId) {
            getPastFeedback()
            getManagerResponses()
        }
    }, [props.userId])

    useEffect(() => {
        if(newData) {
            getPastFeedback()
            getManagerResponses()
            setNewData(false)
        }
    }, [newData])

    if (!props.show) {
        return null;
    }

    return (<div className='parent'>
        <div className='header'>
            <h1>Welcome {props.userInfo.employee_info.name}</h1>
                <button className='logout-button' onClick={() => {
                props.setShowEmployee(false)
                }}>Logout</button>
        </div>
        <div className='page-body'>
        <div className='past-feedback'>
            <h3>Past Feedback</h3>
            <div className='feedback'>
            {pastFeedback.map((feedbackObject, index) => {
                return (
                    <p key={index} onClick={() => {
                        setCurFeedback(feedbackObject)
                        setShowFDetails(true)
                    }}>
                        Feedback to Manager {getManager(feedbackObject.manager_id)}: {feedbackObject.feedback}
                    </p>
                )
            })}
            </div>
        </div>
        <div className='past-responses'>
            <h3>Manager Responses</h3>
            <div className='responses'>
                {managerResponses.map((responseObject, index) => {
                    return (
                        <p key={index} onClick={() => {
                            setCurResponse(responseObject)
                            setShowResponse(true)
                        }}>
                            Response from Manager {getManager(responseObject.manager_id)}: {responseObject.response}
                        </p>
                    )
                })}
            </div>
        </div>
        <button className='button' onClick={() => setShowModal(true)}>Add New Feedback</button>
        <EmployeeFeedback show={showModal} setShow={setShowModal} 
        userInfo={props.userInfo} setNewData={setNewData}/>
        <Modal show={showResponse} styles={modalStyles}>
            <div className='modal-body'>
                <h3>Feedback</h3>
                <p className='no-hover'>{curResponse.feedback}</p>
                <h3>Response</h3>
                <p className='no-hover'>{curResponse.response}</p>
                <button className='button' onClick={() => setShowResponse(false)}>Close</button>
            </div>
        </Modal>
        <Modal show={showFDetails} styles={modalStyles}>
            <div className='modal-body'>
                <h3>Feedback</h3>
                <p className='no-hover'>{curFeedback.feedback}</p>
                <h3>Date</h3>
                <p className='no-hover'>{curFeedback.date}</p>
                <h3>Manager</h3>
                <p className='no-hover'>{getManager(curFeedback.manager_id)}</p>
                <button className='button' onClick={() => setShowFDetails(false)}>Close</button>
            </div>
        </Modal>
        </div>
    </div>
    )
}

export default Employee