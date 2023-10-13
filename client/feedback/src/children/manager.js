import React, { useState, useEffect} from 'react';
import ManagerResponse from './managerAddResponse';
import Modal from './modal';



function Manager(props) {
    const [showModal, setShowModal] = useState(false)
    const [pastFeedback, setPastFeedback] = useState([])
    const [pastResponses, setPastResponses] = useState([])
    const [unansweredFeedback, setUnansweredFeedback] = useState([])
    const [newData, setNewData] = useState(false)
    const [showFeedback, setShowFeedback] = useState(false)
    const [currentFeedback, setCurrentFeedback] = useState({})
    const [showFDetails, setShowFDetails] = useState(false)

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
        fetch(`/api/${props.userId}/managerGetFeedback`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setPastFeedback(data)
        })
    }

    const getPastResponses = () => {
        fetch(`/api/${props.userId}/managerPreviousResponses`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setPastResponses(data)
        })
    }

    const getUnansweredFeedback = () => {
        let tempArray = []
        pastFeedback.map((oneFeedback) => {
            let found = pastResponses.some((oneResponse) => {
                return(oneResponse.feedback_id === oneFeedback.feedback_id)
            })
            if (!found) {
                tempArray.push(oneFeedback)
            }
        })
        setUnansweredFeedback(tempArray)
    }

    useEffect(() => {
        if (props.userId) {
            getPastFeedback()
            getPastResponses()
        }
    }, [props.userId])

    useEffect(() => {
        if (pastFeedback.length && pastResponses.length) {
            getUnansweredFeedback()
        }
    }, [pastFeedback, pastResponses])

    useEffect(() => {
        if (newData) {
            getPastFeedback()
            getPastResponses()
            setNewData(false)
        }
    }, [newData])
    
    useEffect(() => {}, [showFeedback])

    if (!props.show) {
        return null;
    }

    return (<div className='parent'>
        <div className='header'>
            <h1>Welcome {props.userInfo.employee_info.name}</h1>
        </div>
        <div className='page-body'>
        <div className='past-feedback'>
            <h3>Unanswered Feedback</h3>
            <div className='feedback'>
            {unansweredFeedback.map((feedbackObject, index) => {
                return (
                    <p key={index} onClick={() => {
                        setCurrentFeedback(feedbackObject)
                        setShowFDetails(true)
                    }}>
                    {feedbackObject.sentiment} Feedback #{feedbackObject.feedback_id}: {feedbackObject.feedback}
                    </p>
                )
            })}
            </div>
        </div>
        <div className='past-responses'>
            <h3>Responses Given</h3>
            <div className='responses'>
            {pastResponses.map((responseObject, index) => {
                return (
                    <p key={index} onClick={() => {
                        setShowFeedback(true)
                        setCurrentFeedback(responseObject)
                    }}>
                    Responded to Feedback #{responseObject.feedback_id}: {responseObject.response}
                    </p>
                )
            })}
            </div>
        </div>

        <Modal styles={modalStyles} show={showFeedback}>
            <div className='modal-body'>
                <h3>Feedback</h3>
                <p>{currentFeedback.feedback}</p>
                <h3>Response</h3>
                <p>{currentFeedback.response}</p>
                <button className='button' onClick={() => setShowFeedback(false)}>Close</button>
            </div>
        </Modal>
        <Modal styles={modalStyles} show={showFDetails}>
            <div className='modal-body'>
                <h3>Feedback</h3>
                <p>{currentFeedback.feedback}</p>
                <h3>Date</h3>
                <p>{currentFeedback.date}</p>
                <button className='button' onClick={() => setShowFDetails(false)}>Close</button>
            </div>
        </Modal>
        <button className="button" onClick={() => setShowModal(true)}>Add New Response</button>
        <ManagerResponse show={showModal} setShow={setShowModal} setNewData={setNewData}
        unansweredFeedback={unansweredFeedback} userId={props.userId}/>
        </div>
    </div>
    )
}

export default Manager