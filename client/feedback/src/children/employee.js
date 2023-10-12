import React, { useState, useEffect} from 'react'
import EmployeeFeedback from './employeeAddFeedback';

function Employee(props) {
    const [showModal, setShowModal] = useState(false)
    
    if (!props.show) {
        return null;
    }

    return (<div>
        <h1>Employee Page</h1>
        {props.userId}
        <EmployeeFeedback show={showModal} setShow={setShowModal} />
    </div>
    )
}

export default Employee