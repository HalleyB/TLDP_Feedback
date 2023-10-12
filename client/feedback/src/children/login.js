import React, { useState, useEffect} from 'react'
import Box from '@mui/material/Box';
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
        <div>
        <h1>Login Page/ home page</h1>

        <div>
            <button onClick={() => setShow(true)}>Log In</button>
            <button onClick={() => setShowNew(true)}>Sign Up</button>
            <Modal styles={modalStyles} show={show} onClose={() => setShow(false)}>
            <div className="modal-body">
                <FormControl>
                    Employee login
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
                            id="outlined-textarea"
                            label="Password"
                            placeholder="Placeholder"
                            multiline
                            name='password'
                        />
                        <Button variant="outlined" onClick={(e) => handleEmployeeSubmit(e)}>Submit</Button>
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
                            id="outlined-textarea"
                            label="Password"
                            placeholder="Placeholder"
                            multiline
                            name='password'
                        />
                        <Button variant="outlined" onClick={(e) => handleManagerSubmit(e)}>Submit</Button>
                </FormControl>
            </div>
            </Modal>
            <SignUp show={showNew} setShow={setShowNew} />
        </div>
        </div>
    )
}

export default Login