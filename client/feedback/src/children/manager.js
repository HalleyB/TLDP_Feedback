import React, { useState, useEffect} from 'react';
import ManagerResponse from './managerAddResponse';

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
        <button onClick={() => setShowModal(true)}>Add New Response</button>
        <ManagerResponse show={showModal} setShow={setShowModal} />
    </div>
    )
}

export default Manager