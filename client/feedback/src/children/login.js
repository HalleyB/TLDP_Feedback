import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from './modal';
import SignUp from './signup';
import { FormControl } from '@mui/material';


function Login(props) {
    const [show, setShow] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [employeeError, setEmployeeError] = useState(false);
    const [managerError, setManagerError] = useState(false);
    const [userName, setUserName] = useState('');

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
        <div className='login'>
        <div className='header-home'>
            <div className='header-title'>
            <h1>FELLOWSHIP FEEDBACK</h1>
            </div>
            <div className='header-child'>
            <button className="logout-button" onClick={() => setShow(true)}>Log In</button>
            <button className="logout-button" onClick={() => setShowNew(true)}>Sign Up</button>
            </div>
        </div>
        <div className='login-body'>
        <h4>A PLACE TO ANONYMOUSLY SUBMIT FEEDBACK TO YOUR MANAGERS AND RECEIVE A PERSONAL RESPONSE</h4>
            <Modal styles={modalStyles} show={show} onClose={() => setShow(false)}>
            <div className="modal-body">
                <FormControl>
                    Employee Login
                    <TextField  onChange={(e) => setUserName(e.target.value)}
                            required
                            id="outlined-textarea"
                            label="Username"
                            placeholder="Placeholder"
                            multiline
                            name='username'
                        />
                        <TextField 
                            required
                            id="outlined-password-input"
                            label="Password"
                            placeholder="Password"
                            type="password"
                            name='password'
                        />
                        <button className='button' onClick={(e) => handleEmployeeSubmit(e)}>Submit</button>
                        {employeeError ? 'Username not found' : ''}
                </FormControl>
                <FormControl>
                    Manager Login
                    <TextField  onChange={(e) => setUserName(e.target.value)}
                            required
                            id="outlined-textarea"
                            label="Username"
                            placeholder="Placeholder"
                            multiline
                            name='username'
                        />
                        <TextField 
                            required
                            id="outlined-password-input"
                            label="Password"
                            placeholder="Password"
                            name='password'
                            type='password'
                        />
                        <button className='button' onClick={(e) => handleManagerSubmit(e)}>Submit</button>
                        {managerError ? 'Username not found' : ''}
                </FormControl>
            </div>
            </Modal>
            <SignUp show={showNew} setShow={setShowNew} setUserInfo={props.setUserInfo}
            setShowEmployee={props.setShowEmployee} setUserId={props.setUserId}
            setShowLogin={props.setShowLogin}/>
            </div>
        </div>
    )
}

export default Login