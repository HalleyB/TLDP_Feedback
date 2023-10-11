import React, { useState, useEffect} from 'react'

import Employee from './employee';
import Manager from './manager';
import Modal from './modal';

function Login() {

    const [show, setShow] = useState(false);
    const [userId, setUserId] = useState();
    const [employeeError, setEmployeeError] = useState(false);
    const [managerError, setManagerError] = useState(false);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('')

    const handleEmployeeSubmit = () => {
        fetch('localhost:3000/api/getEmployeeId')
        .then(response => response.json())
        .then(data => {
            setEmployeeError(false)
            setUserId(data.employeeId)
        })
        .catch(err => {
            setEmployeeError(true)
            console.log(err)
        })
    }

    const handleManagerSubmit = () => {
        fetch('localhost:3000/api/getManagerId')
        .then(response => response.json())
        .then(data => {
            setManagerError(false)
            setUserId(data.managerId)
        })
        .catch(err => {
            setManagerError(true)
            console.log(err)
        })
    }

    return (
        <div>
        <h1>Login Page/ home page</h1>

        <div>
            <button onClick={() => setShow(true)}>Click Here</button>
            <Modal show={show} onClose={() => setShow(false)}>
            <div className="form">
                <form className='employeeForm'>
                    <div className="input-container">
                        <label>Username </label>
                        <input type="text" name="uname" required
                        onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input type="password" name="pass" required 
                        onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="button-container">
                        <input type="submit" />
                    </div>
                </form>
                <form className='managerForm'>
                    <div className="input-container">
                        <label>Username </label>
                        <input type="text" name="uname" required 
                        onChange={(e) => setUserName(e.target.value)}/>
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input type="password" name="pass" required
                        onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="button-container">
                        <input type="submit" />
                    </div>
                </form>
            </div>
            </Modal>
        </div>
        </div>
    )
}

export default Login