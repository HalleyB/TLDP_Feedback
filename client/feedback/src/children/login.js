import React, { useState, useEffect} from 'react'
import Modal from './modal';

function Login(props) {
    const [show, setShow] = useState(false);
    const [employeeError, setEmployeeError] = useState(false);
    const [managerError, setManagerError] = useState(false);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('')

    if (!props.show) {
        return null;
    }

    const handleEmployeeSubmit = (e) => {
        e.preventDefault()
        fetch('/api/getEmployeeID')
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(data => {
            console.log('Data ' + data)
            setEmployeeError(false)
            props.setUserId(data)
            props.setShowEmployee(true)
            props.setShowLogin(false)
        })
        .catch(err => {
            setEmployeeError(true)
            console.log(err)
        })
    }

    const handleManagerSubmit = (e) => {
        e.preventDefault()
        fetch('/api/getManagerID')
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
            setManagerError(false)
            props.setUserId(data)
            props.setShowManager(true)
            props.setShowLogin(false)
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
            <button onClick={() => setShow(true)}>Log In</button>
            <Modal show={show} onClose={() => setShow(false)}>
            <div className="form">
                <form className='employeeForm' onSubmit={(e) => handleEmployeeSubmit(e)}>
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
                        <button type='submit'>
                            Submit 
                        </button>
                        {employeeError ? 'Username or Email not recognized' : ''}
                    </div>
                </form>
                <form className='managerForm' onSubmit={(e) => handleManagerSubmit(e)}>
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
                        <button type='submit'>
                            Submit 
                        </button>
                        {managerError ? 'Username or Email not recognized' : ''}
                    </div>
                </form>
            </div>
            </Modal>
        </div>
        </div>
    )
}

export default Login