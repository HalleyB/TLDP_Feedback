import React, { useState, useEffect} from 'react'
import EmployeeFeedback from './employeeAddFeedback';

function Employee(props) {
    const [showModal, setShowModal] = useState(false)
    const [pastFeedback, setPastFeedback] = useState([])

    const getPastFeedback = () => {
        fetch(`/api/${props.userId}/employeePreviousFeedback`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setPastFeedback(data)
        })
    }

    useEffect(() => {
        if (props.userId) {
            getPastFeedback()
        }
    }, [props.userId])

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
        <button onClick={() => setShowModal(true)}>Add New Feedback</button>
        <EmployeeFeedback show={showModal} setShow={setShowModal} />
    </div>
    )
}

export default Employee