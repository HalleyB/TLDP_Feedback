import React, { useState, useEffect} from 'react'
import Modal from './modal';


function Login(props) {
    const [show, setShow] = useState(false);
    const [employeeError, setEmployeeError] = useState(false);
    const [managerError, setManagerError] = useState(false);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('')

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

    if (!props.show) {
        return null;
    }

    const handleEmployeeSubmit = (e) => {
        e.preventDefault()
        fetch(`/api/getEmployeeID/${userName}`)
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(data => {
            setEmployeeError(false)
            props.setUserId(data.employee_id)
            props.setUserInfo(data)
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
        fetch(`/api/getManagerID/${userName}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            if (data.is_manager) {
                setManagerError(false)
                props.setUserId(data.employee_id)
                props.setUserInfo(data)
                props.setShowManager(true)
                props.setShowLogin(false)
            } else {
                setManagerError(true)
            }
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
            <Modal styles={modalStyles} show={show} onClose={() => setShow(false)}>
            <div className="modal-body">
                <form className='employeeForm' onSubmit={(e) => handleEmployeeSubmit(e)}>
                    Employee Login
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
                    Manager Login
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