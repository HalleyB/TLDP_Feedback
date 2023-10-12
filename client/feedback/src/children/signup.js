import React, { useState, useEffect } from 'react'
import Modal from './modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function SignUp(props) {
    const [newEmployee, setNewEmployee] = useState({
        employee_id: 0, employee_info: {
            username: '', name: '', sex: '', address: '', mail:''
        }, is_manager: false, manager_id: 0
    });

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


    const handleInput = (e) => {
        // setNewEmployee({...newEmployee, employee_info: 
        //     {...employee_info, [e.target.name]: e.target.value}})
    }

    const handleSignUp = () => {

    }

    return (
        <div>
            <Modal styles={modalStyles} show={props.show} onClose={() => props.setShow(false)}>
                <div className='modal-body'>
                    <form className='sign-up-form' onSubmit={(e) => handleSignUp(e)}>
                        <div className="input-container">
                            <label>Username </label>
                            <input type="text" name="username" required
                            onChange={(e) => handleInput(e)} />
                        </div>
                        <div className="input-container">
                            <label>Name </label>
                            <input type="text" name="name" required
                            onChange={(e) => handleInput(e)} />
                        </div>
                        <div className="input-container">
                            <label>Username </label>
                            <input type="text" name="uname" required
                            onChange={(e) => handleInput(e)} />
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default SignUp;