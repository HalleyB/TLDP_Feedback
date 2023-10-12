import React, { useState, useEffect} from 'react'
import EmployeeFeedback from './employeeAddFeedback';

function Employee(props) {
    const [showModal, setShowModal] = useState(false)
    const [pastFeedback, setPastFeedback] = useState([])
    const [managerResponses, setManagerResponses] = useState([])
    const [newData, setNewData] = useState(false)

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

    return (<div>
        <h1>Welcome {props.userInfo.employee_info.name}</h1>
        <div className='past-feedback'>
            <h3>Past Feedback</h3>
            <ul className='feedback'>
            {pastFeedback.map((feedbackObject, index) => {
                return (
                    <li key={index}>
                        {feedbackObject.feedback}
                    </li>
                )
            })}
            </ul>
        </div>
        <div className='manager-responses'>
            <h3>Manager Responses</h3>
            <ul className='responses'>
                {managerResponses.map((responseObject, index) => {
                    return (
                        <li key={index}>
                            {responseObject.response}
                        </li>
                    )
                })}
            </ul>
        </div>
        <button onClick={() => setShowModal(true)}>Add New Feedback</button>
        <EmployeeFeedback show={showModal} setShow={setShowModal} 
        userInfo={props.userInfo} setNewData={setNewData}/>
    </div>
    )
}

export default Employee