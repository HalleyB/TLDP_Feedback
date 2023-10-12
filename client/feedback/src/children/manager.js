import React, { useState, useEffect} from 'react';
import ManagerResponse from './managerAddResponse';
import Stack from '@mui/material/Stack';


function Manager(props) {
    const [showModal, setShowModal] = useState(false)
    const [pastFeedback, setPastFeedback] = useState([])
    
    const getPastFeedback = () => {
        fetch(`/api/${props.userId}/managerGetFeedback`)
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
            <h3>Feedback Received</h3>
            <div className='feedback'>
            {pastFeedback.map((feedbackObject, index) => {
                return (
                    <p key={index}>
                    Feedback #{feedbackObject.feedback_id}: {feedbackObject.feedback}
                    </p>
                )
            })}
            </div>
        </div>
        <button onClick={() => setShowModal(true)}>Add New Response</button>
        <ManagerResponse show={showModal} setShow={setShowModal} />
    </div>
    )
}

export default Manager